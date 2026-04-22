# Supply Chain Security

This document describes how `valory-website` protects itself against npm supply chain attacks — specifically, the scenario where a dependency (direct or transitive) is compromised and a malicious version is published.

It complements [`SECURITY.md`](./SECURITY.md), which covers reporting vulnerabilities in our own code.

## Threat model

The attacks we care about:

1. **Malicious publish** — a maintainer account is compromised (or a maintainer goes rogue) and a bad version of a legitimate package is published. Recent examples: `ua-parser-js` (2021), `node-ipc` protestware (2022), various `@ctrl/*` / `rspack`-related worms (2024–2025), the `shai-hulud` npm worm (2025).
2. **Typosquatting / dependency confusion** — a look-alike name is installed instead of the intended package.
3. **Postinstall script abuse** — a compromised package runs arbitrary code during `yarn install`, exfiltrating env vars or tokens from the build environment.
4. **Transitive compromise** — a deep, rarely-audited dependency is the attack vector.

## Policies

### 1. Exact version pinning in `package.json`

All direct dependencies in [`package.json`](./package.json) are pinned to **exact versions** — no `^`, no `~`, no `>=`, no floating major (e.g. `"^18"`).

**Why:** `^` allows minor and patch updates; `~` allows patch updates. If a compromised patch is published and someone runs `yarn add <other-pkg>` or `yarn install` without a lockfile, the bad version can enter the tree silently. Exact pins make every version change an explicit, reviewable `package.json` diff.

**How to update a dependency:** bump the exact version in `package.json`, run `yarn install`, review the `yarn.lock` diff, and commit both files in the same PR. Never run `yarn upgrade` without pinning the result.

**Transitive overrides follow the same rule.** Entries under `"resolutions"` (Yarn) are a transitive-pinning mechanism, not an escape hatch for ranges. Use `"1.2.3"`, not `"^1.2.3"` or `">=1.2.3"`, so a compromised patch cannot silently enter the tree through an override. When adding a resolution to clear a CVE, reference the advisory in the PR/commit message so future readers understand why the override exists.

### 2. Single lockfile, treated as source of truth

[`yarn.lock`](./yarn.lock) is the canonical lockfile. The `packageManager` field in [`package.json`](./package.json) pins Yarn `1.22.22`; CI activates that version explicitly via `corepack enable` + `corepack prepare yarn@1.22.22 --activate` at the start of every Node job ([.github/workflows/main.yml](./.github/workflows/main.yml)), so installs don't fall back to whatever Yarn the runner happens to ship with. `package-lock.json` / `pnpm-lock.yaml` are in [`.gitignore`](./.gitignore) so a stray `npm install` / `pnpm install` can't land a second lockfile that conflicts with `yarn.lock`. CI and Vercel ([`vercel.json`](./vercel.json)) both install with `yarn install --frozen-lockfile`, which fails if `package.json` and `yarn.lock` disagree — catching any silent resolution drift at build time.

### 3. Lockfile review in PRs

Any PR that touches `yarn.lock` requires a reviewer to confirm:

- The diff is proportionate to the `package.json` change.
- No unexpected packages appear. Look for unfamiliar names, typos of known packages, or packages with very recent publish dates on high-traffic names.
- Resolved URLs point to the official registry (`registry.yarnpkg.com` / `registry.npmjs.org`), not a fork or mirror.

### 4. Cooldown window on updates

Prefer dependency versions that are **at least 7 days old**. Most malicious publishes are caught and unpublished within hours to days.

This is enforced by **manual discipline on every PR** — there is no Renovate or Dependabot bot on this repo. When a PR bumps a dependency, the reviewer checks `npm view <pkg> time` (or the npm page) and confirms the target version is at least 7 days old. If the bump is for a disclosed security advisory, the cooldown does not apply — note the advisory ID in the PR description so the override is auditable.

Vulnerability discovery does not depend on this rule. Already-disclosed CVEs are caught automatically by the `yarn audit` job in [.github/workflows/main.yml](./.github/workflows/main.yml) on every PR (see [§5](#5-audit-in-ci)), and GitHub sends passive Dependabot alerts (Security tab / email) for advisories affecting our lockfile regardless of any repo configuration.

**Known gap:** the GitHub Actions in [.github/workflows/main.yml](./.github/workflows/main.yml) are SHA-pinned and will not receive updates (including security fixes) without a human bumping the SHA. Audit the pins periodically — at minimum once per major release of each action.

### 5. Audit in CI

Run `yarn audit --groups dependencies` on every PR, with high/critical gating enforced via exit-code bitmask rather than `--level` (see the "Yarn 1.x audit quirk" note below and the `audit` job in [.github/workflows/main.yml](./.github/workflows/main.yml)). A high/critical advisory against a production dependency blocks merge unless explicitly acknowledged. `--groups dependencies` restricts the audit to the production tree — `devDependencies` (ESLint / TypeScript / Tailwind / types) generate substantial transitive-advisory noise and do not ship to users, so they are excluded by policy.

We also run [`lockfile-lint`](https://github.com/lirantal/lockfile-lint) on every PR to enforce that every `resolved` URL in `yarn.lock` points at `registry.yarnpkg.com` or `registry.npmjs.org`, uses HTTPS, and has an integrity hash — automating the registry-origin part of [§3](#3-lockfile-review-in-prs). The tool itself is pinned as a `devDependency` in [`package.json`](./package.json) (currently `5.0.0`) and invoked via the `yarn lint:lockfile` script, so the `lockfile-lint` binary used in CI is integrity-verified against `yarn.lock` rather than re-fetched on every run.

**Yarn 1.x audit quirk.** This repo uses Yarn `1.22.22`. Yarn 1.x `yarn audit` exits with a severity bitmask (`1`=info, `2`=low, `4`=moderate, `8`=high, `16`=critical) rather than a threshold comparison against `--level`, so `--level high` filters the *printed* output but does not affect the exit code. The workflow handles this by checking `exit_code & 24` (i.e. `high | critical`) and failing only when that bit is set — see the `audit` job in [.github/workflows/main.yml](./.github/workflows/main.yml). Revisit on a future Yarn Berry migration, which ships `yarn npm audit` with proper severity gating and makes the bitmask dance unnecessary.

### 6. Avoid postinstall-heavy dependencies

When adding a new dependency, check:

- Does it have a `postinstall` / `preinstall` / `install` script? (`yarn why <pkg>` + inspect its `package.json`)
- If yes, is the script necessary, and is the package well-known?
- Prefer alternatives with no install scripts for new additions.

### 7. Secrets hygiene in the build environment

#### What the app reads from the environment

The runtime and build environments for `valory-website` hold a deliberately small set of configuration. An auditor should be able to enumerate them exactly:

| Name | Purpose | Scope | Where read |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_CMS_URL` | CMS (Strapi) base URL | Inlined into client bundle (used for public image URLs) + read server-side by the proxy | [`pages/api/posts/index.ts`](./pages/api/posts/index.ts), [`pages/api/posts/[id].ts`](./pages/api/posts/[id].ts), [`components/Content/Post.tsx`](./components/Content/Post.tsx), [`components/Markdown.tsx`](./components/Markdown.tsx) |
| `CMS_API_KEY` | CMS API key | Server-only (not prefixed `NEXT_PUBLIC_`, never inlined into the client bundle) | [`pages/api/posts/index.ts`](./pages/api/posts/index.ts), [`pages/api/posts/[id].ts`](./pages/api/posts/[id].ts) |

`NEXT_PUBLIC_CMS_URL` is bundled into client-side JavaScript by Next.js and is visible to anyone who loads the site — treat it as public configuration. `CMS_API_KEY` is intentionally not prefixed with `NEXT_PUBLIC_`: it is only read by the server-side proxy routes under `pages/api/posts/*`, so it is not shipped to the browser. From a supply-chain-attack standpoint a compromised postinstall script could still read both at build time, so rotate the key if an install-time compromise is ever suspected.

#### General hygiene

- No long-lived secrets in CI env vars that a postinstall script could exfiltrate. The GitHub Actions workflow in [.github/workflows/main.yml](./.github/workflows/main.yml) does not export any repo or org secrets to the install step.
- Vercel **build-time** env vars should be limited to what the build actually needs; anything only the running server needs must be marked runtime-only in the Vercel project settings so it is not present when `yarn install` runs.
- Vercel deploy tokens, GitHub tokens, and cloud-provider credentials must never be available to the build environment.
- `.npmrc` / `.yarnrc` auth tokens: never committed.

## Response playbook: "a dependency we use was just disclosed as compromised"

1. **Identify exposure.** `yarn why <pkg>` — direct or transitive? Which version is in our lockfile?
2. **Check the window.** When was the bad version published vs. when we last ran `yarn install` / deployed? If our lockfile predates the bad version, we are not shipping it — but any developer running `yarn install` fresh could pull it.
3. **Pin to a safe version.** Edit `package.json` to a known-good version (or add a Yarn `resolutions` entry for transitive deps, following the exact-pinning rule in [§1](#1-exact-version-pinning-in-packagejson)). Commit lockfile.
4. **Rotate anything the build machine could have seen.** `NEXT_PUBLIC_API_*` values are client-visible anyway (see [§7](#7-secrets-hygiene-in-the-build-environment)), but still rotate Vercel deploy tokens, npm tokens, and any GitHub tokens attached to the build account.
5. **Redeploy.** Force a fresh build so production no longer serves any code influenced by the bad version.
6. **Post-mortem.** Record the incident: what package, which version, how we detected it, time-to-mitigate, what leaked (if anything).

## Current gaps / TODO

- [x] Pin all direct dependencies in `package.json` to exact versions.
- [x] Add `package-lock.json` and `pnpm-lock.yaml` to [`.gitignore`](./.gitignore) to prevent stray dual-lockfile creation.
- [x] Add a `packageManager` field to [`package.json`](./package.json) pinning `yarn@1.22.22`.
- [x] Add a [`SECURITY.md`](./SECURITY.md) with a vulnerability-disclosure policy.
- [x] Add `yarn audit --level high --groups dependencies` and `lockfile-lint` to CI — see [.github/workflows/main.yml](./.github/workflows/main.yml).
- [x] Enforce the 7-day cooldown via PR review + `yarn audit` in CI ([.github/workflows/main.yml](./.github/workflows/main.yml)). No Renovate/Dependabot bot; vulnerability discovery relies on the CI audit job plus GitHub's passive Dependabot alerts in the Security tab.
- [x] Declare Vercel install command as `yarn install --frozen-lockfile` in [`vercel.json`](./vercel.json) (overrides any dashboard setting).

## References

- [GitHub advisory database](https://github.com/advisories)
- [Socket.dev](https://socket.dev/) — supply chain scanner with postinstall script detection
- [Shai-Hulud Strikes Again (v2) — Socket, Nov 2025](https://socket.dev/blog/shai-hulud-strikes-again-v2) — representative of modern npm worm class (500+ packages, 700+ versions affected)

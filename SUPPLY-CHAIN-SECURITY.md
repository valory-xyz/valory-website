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

[`.github/CODEOWNERS`](./.github/CODEOWNERS) routes changes to the supply-chain surface (`yarn.lock`, `package.json`, `.yarnrc`, `.nvmrc`, `.supply-chain/`, the audit scripts, the workflows, this doc) to the security owners (`@Tanya-atatakai`, `@atepem`). **This only enforces review if branch protection on `main` has "Require review from Code Owners" enabled** — otherwise it merely suggests reviewers.

### 4. Cooldown window on updates

Prefer dependency versions that are **at least 7 days old**. Most malicious publishes are caught and unpublished within hours to days.

This is enforced by **manual discipline on every PR** — there is no Renovate or Dependabot bot on this repo. When a PR bumps a dependency, the reviewer checks `npm view <pkg> time` (or the npm page) and confirms the target version is at least 7 days old. If the bump is for a disclosed security advisory, the cooldown does not apply — note the advisory ID in the PR description so the override is auditable.

Vulnerability discovery does not depend on this rule. Already-disclosed CVEs are caught automatically by the `yarn audit` job in [.github/workflows/main.yml](./.github/workflows/main.yml) on every PR (see [§5](#5-audit-in-ci)), and GitHub sends passive Dependabot alerts (Security tab / email) for advisories affecting our lockfile regardless of any repo configuration.

**Known gap:** the GitHub Actions in [.github/workflows/main.yml](./.github/workflows/main.yml) are SHA-pinned and will not receive updates (including security fixes) without a human bumping the SHA. Audit the pins periodically — at minimum once per major release of each action.

### 5. Audit in CI

Every PR runs the `audit` job in [.github/workflows/main.yml](./.github/workflows/main.yml) via `yarn audit:prod`, a thin wrapper at [`scripts/audit.mjs`](./scripts/audit.mjs). The wrapper runs `yarn audit --groups dependencies --json`, parses the JSON, and **fails the build on any high/critical advisory in the production tree that is not allowlisted**. `--groups dependencies` restricts the audit to the production tree — `devDependencies` (ESLint / TypeScript / Tailwind / types) generate substantial transitive-advisory noise and do not ship to users, so they are excluded by policy.

Unfixable or not-yet-fixable high/critical advisories can be suppressed by adding an entry to [`.supply-chain/audit-allowlist.json`](./.supply-chain/audit-allowlist.json). Each entry requires `id` (numeric advisory id from `yarn audit --json`), `package`, `reason`, `added`, and `review` (both `YYYY-MM-DD`); the wrapper validates these and refuses to run on a malformed entry. A past `review` date emits a `::warning::` (it does not fail the build) so suppressions get re-evaluated rather than living forever. Keep the file even when `entries` is empty — the empty file is the running assertion that the gate exists and there is zero current debt.

We also run [`lockfile-lint`](https://github.com/lirantal/lockfile-lint) on every PR to enforce that every `resolved` URL in `yarn.lock` points at `registry.yarnpkg.com` or `registry.npmjs.org`, uses HTTPS, and has an integrity hash — automating the registry-origin part of [§3](#3-lockfile-review-in-prs). The tool itself is pinned as a `devDependency` in [`package.json`](./package.json) (currently `5.0.0`) and invoked via the `yarn lint:lockfile` script, so the `lockfile-lint` binary used in CI is integrity-verified against `yarn.lock` rather than re-fetched on every run.

**Yarn 1.x audit quirk (handled by the wrapper).** This repo uses Yarn `1.22.22`, whose `yarn audit` exits with a severity *bitmask* (`1`=info, `2`=low, `4`=moderate, `8`=high, `16`=critical) rather than a threshold comparison against `--level`, so `--level high` filters the *printed* output but not the exit code. `scripts/audit.mjs` sidesteps this entirely: it ignores the exit code and applies its own `high | critical` policy against the parsed `--json` output (which also lets it deduplicate per-advisory and apply the allowlist). The earlier inline workflow step did the equivalent with an `exit_code & 24` bitmask check; the wrapper supersedes it. Revisit on a future Yarn Berry migration, which ships `yarn npm audit` with native severity gating.

### 6. Avoid postinstall-heavy dependencies

When adding a new dependency, check:

- Does it have a `postinstall` / `preinstall` / `install` script? (`yarn why <pkg>` + inspect its `package.json`)
- If yes, is the script necessary, and is the package well-known?
- Prefer alternatives with no install scripts for new additions.

#### Install-hook diff gate (CI)

The `install-hooks` job in [.github/workflows/main.yml](./.github/workflows/main.yml) runs [`scripts/audit-install-hooks.mjs`](./scripts/audit-install-hooks.mjs) (`yarn audit:install-hooks`). It enumerates every package in `node_modules` that declares a non-trivial `preinstall`/`install`/`postinstall` script and diffs the set — names **and** the hook commands themselves — against the checked-in [`.supply-chain/install-hooks.allowlist`](./.supply-chain/install-hooks.allowlist). A new hook, a removed hook (drift), or a *changed* command on an already-listed package fails CI. This catches the case `yarn audit` cannot: a package quietly adding or mutating a postinstall script in a new version (the classic supply-chain compromise shape) before it is ever a published CVE.

It is a **review/diff gate — it does not execute or block scripts.** When a dependency change legitimately alters the hook surface, regenerate and review:

```bash
yarn install
yarn audit:install-hooks:update   # rewrites .supply-chain/install-hooks.allowlist
git add .supply-chain/install-hooks.allowlist   # review the diff before committing
```

Currently allowlisted (both legitimate native-binary builds):

- `sharp` — `install: node install/check.js || npm run build`. Pulled by `next` for `next/image` optimization.
- `unrs-resolver` — `postinstall: napi-postinstall …`. Pulled transitively by `eslint-config-next` (`eslint-import-resolver-typescript`); dev-only tooling.

#### Why we do **not** set a global `ignore-scripts`

A blanket `ignore-scripts=true` would be a stronger install-time defense, but this repo has native dependencies whose postinstall builds a platform binary — `sharp` (image optimization) and `pdfjs-dist` (PDF viewer). Globally ignoring scripts would break image optimization / PDF rendering, and there is no in-repo rebuild path. So [`.yarnrc`](./.yarnrc) deliberately sets only `--save-exact true` and leaves scripts enabled. Postinstall-abuse (threat #3) is instead defended in depth by: the install-hook diff gate above + the 7-day cooldown ([§4](#4-cooldown-window-on-updates)) + the frozen lockfile ([§2](#2-single-lockfile-treated-as-source-of-truth)). The CI `install-hooks` and `audit` jobs *do* use `--ignore-scripts` / skip `yarn install` for their own steps, where it is safe — that is the diff/audit tooling not running the scripts it inspects, not a repo-wide policy. **Do not flip `ignore-scripts` on without first adding a documented native-dep rebuild path**, or `sharp` will silently stop fetching its binary.

### 7. Secrets hygiene in the build environment

#### What the app reads from the environment

The runtime and build environments for `valory-website` hold a deliberately small set of configuration. An auditor should be able to enumerate them exactly:

| Name | Purpose | Scope | Where read |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_CMS_URL` | CMS (Strapi) base URL | Inlined into client bundle (used for fetches and public image URLs) | [`utils/api/index.tsx`](./utils/api/index.tsx), [`components/Content/Post.tsx`](./components/Content/Post.tsx), [`components/Markdown.tsx`](./components/Markdown.tsx) |

`NEXT_PUBLIC_CMS_URL` is bundled into client-side JavaScript by Next.js and is visible to anyone who loads the site — treat it as public configuration. The CMS is read anonymously: `Post.find`/`findOne` and `Upload.find` are granted to Strapi's Public role, so no API key is shipped from this repo.

#### General hygiene

- No long-lived secrets in CI env vars that a postinstall script could exfiltrate. The GitHub Actions workflow in [.github/workflows/main.yml](./.github/workflows/main.yml) does not export any repo or org secrets to the install step.
- Vercel **build-time** env vars should be limited to what the build actually needs; anything only the running server needs must be marked runtime-only in the Vercel project settings so it is not present when `yarn install` runs.
- Vercel deploy tokens, GitHub tokens, and cloud-provider credentials must never be available to the build environment.
- `.npmrc` / `.yarnrc` auth tokens: never committed.

### 8. Secret scanning (gitleaks)

[.github/workflows/secret-scan.yml](./.github/workflows/secret-scan.yml) runs [gitleaks](https://github.com/gitleaks/gitleaks) on every push to `main` and every PR (`gitleaks detect --redact`, full history via `fetch-depth: 0`). It fails the build if a committed secret is detected, catching accidentally-committed API keys/tokens before they reach the default branch — complementing [§7](#7-secrets-hygiene-in-the-build-environment), which is about *runtime* secret hygiene.

The workflow installs the **OSS gitleaks CLI as a checksum-verified binary** rather than using `gitleaks/gitleaks-action`, because that action requires a paid license for organisation-owned repos. Bump the `VERSION` and `SHA256` env vars together (the checksum is version-specific). If a legitimate high-entropy string ever trips a false positive (e.g. an example token in a fixture), add a `.gitleaks.toml` allowlist at the repo root to suppress it by regex.

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
- [x] Replace the inline audit step with the `yarn audit:prod` wrapper ([`scripts/audit.mjs`](./scripts/audit.mjs)) + allowlist ([`.supply-chain/audit-allowlist.json`](./.supply-chain/audit-allowlist.json)).
- [x] Add the install-hook diff gate ([`scripts/audit-install-hooks.mjs`](./scripts/audit-install-hooks.mjs) + [`.supply-chain/install-hooks.allowlist`](./.supply-chain/install-hooks.allowlist)), wired into `all-checks-passed`.
- [x] Add [`.nvmrc`](./.nvmrc) (Node `20.20.2`, consumed by CI via `node-version-file`) and [`.yarnrc`](./.yarnrc) (`--save-exact true`; no global `ignore-scripts`).
- [x] Add the gitleaks secret-scanning workflow ([.github/workflows/secret-scan.yml](./.github/workflows/secret-scan.yml)).
- [x] Add [`.github/CODEOWNERS`](./.github/CODEOWNERS) routing supply-chain paths to the security owners (`@Tanya-atatakai`, `@atepem`).
- [ ] Enable "Require review from Code Owners" in `main` branch protection so CODEOWNERS enforces (it only suggests reviewers otherwise).
- [ ] Add the gitleaks check and `all-checks-passed` as required status checks in `main` branch protection.

## References

- [GitHub advisory database](https://github.com/advisories)
- [Socket.dev](https://socket.dev/) — supply chain scanner with postinstall script detection
- [Shai-Hulud Strikes Again (v2) — Socket, Nov 2025](https://socket.dev/blog/shai-hulud-strikes-again-v2) — representative of modern npm worm class (500+ packages, 700+ versions affected)

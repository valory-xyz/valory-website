# Supply Chain Security

This document describes how `valory-website` protects itself against npm supply chain attacks — specifically, the scenario where a dependency (direct or transitive) is compromised and a malicious version is published.

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

### 2. Lockfile is the source of truth

- [`yarn.lock`](./yarn.lock) is committed and required.
- CI installs use `yarn install --frozen-lockfile` (or `--immutable` on Yarn Berry). This fails the build if `package.json` and `yarn.lock` disagree, preventing silent resolution drift.
- Vercel builds should also use frozen installs — verify in Vercel project settings that the install command is `yarn install --frozen-lockfile`.

### 3. Lockfile review in PRs

Any PR that touches `yarn.lock` requires a reviewer to confirm:

- The diff is proportionate to the `package.json` change.
- No unexpected packages appear. Look for unfamiliar names, typos of known packages, or packages with very recent publish dates on high-traffic names.
- Resolved URLs point to the official registry (`registry.yarnpkg.com` / `registry.npmjs.org`), not a fork or mirror.

### 4. Cooldown window on updates

Prefer dependency versions that are **at least 7 days old**. Most malicious publishes are caught and unpublished within hours to days.

For Renovate, use `minimumReleaseAge: "7 days"` in `renovate.json`. Dependabot does not natively support cooldown windows.

### 5. Audit in CI

Run `yarn audit --level high` on every PR. A high/critical advisory should block merge unless explicitly acknowledged.

### 6. Avoid postinstall-heavy dependencies

When adding a new dependency, check:

- Does it have a `postinstall` / `preinstall` / `install` script? (`yarn why <pkg>` + inspect its `package.json`)
- If yes, is the script necessary, and is the package well-known?
- Prefer alternatives with no install scripts for new additions.

### 7. Secrets hygiene in the build environment

- No long-lived secrets in CI env vars that a postinstall script could exfiltrate.
- Vercel build env vars scoped to what the build actually needs — no deploy keys, no cloud provider credentials.
- `.npmrc` / `.yarnrc` auth tokens: never committed.

### 8. Dependency review on every new addition

Before adding a new direct dependency:

- Weekly download count on npm — very low numbers on a "popular-sounding" name is a typosquat red flag.
- GitHub repo exists, is active, has reasonable star count and contributor history.
- Maintainer is the expected one (check publish history: `npm view <pkg> time`).
- No recently transferred ownership unless it's a known, announced transfer.

## Response playbook: "a dependency we use was just disclosed as compromised"

1. **Identify exposure.** `yarn why <pkg>` — direct or transitive? Which version is in our lockfile?
2. **Check the window.** When was the bad version published vs. when we last ran `yarn install` / deployed? If our lockfile predates the bad version, we are not shipping it — but any developer running `yarn install` fresh could pull it.
3. **Pin to a safe version.** Edit `package.json` to a known-good version (or add a Yarn `resolutions` entry for transitive deps). Commit lockfile.
4. **Rotate secrets.** If the bad version ran on any CI job or dev machine since it was published, rotate anything it could have seen: npm tokens, Vercel deploy tokens, GitHub tokens.
5. **Redeploy.** Force a fresh build so production no longer serves any code influenced by the bad version.
6. **Post-mortem.** Record the incident: what package, which version, how we detected it, time-to-mitigate, what leaked (if anything).

## Current gaps / TODO

- [x] Pin all direct dependencies in `package.json` to exact versions.
- [ ] Add a `SECURITY.md` with a vulnerability-disclosure policy.
- [ ] Add `yarn audit` to CI (GitHub Actions).
- [ ] Evaluate Renovate with `minimumReleaseAge: "7 days"`.
- [ ] Verify Vercel build uses `--frozen-lockfile`.

## References

- [GitHub advisory database](https://github.com/advisories)
- [Socket.dev](https://socket.dev/) — supply chain scanner with postinstall script detection

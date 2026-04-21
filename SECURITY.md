# Security Policy

This document outlines security procedures and general policies for the `valory-website` project. For supply-chain-specific policies (dependency pinning, lockfile review, audit in CI), see [`SUPPLY-CHAIN-SECURITY.md`](./SUPPLY-CHAIN-SECURITY.md).

## Supported Versions

`valory-website` is a marketing site deployed as a rolling latest-main. There are no versioned releases; security fixes land on `main` and are deployed on merge.

| Version | Supported |
| ------- | --------- |
| `main`  | :white_check_mark: |

## Reporting a Vulnerability

The `valory-website` team and community take all security bugs in `valory-website` seriously. Thank you for improving the security of `valory-website`. We appreciate your efforts and responsible disclosure and will make every effort to acknowledge your contributions.

Report security bugs by emailing `info@valory.xyz`.

The lead maintainer will acknowledge your email within 48 hours, and will send a more detailed response within 5 business days indicating the next steps in handling your report. After the initial reply to your report, the security team will endeavour to keep you informed of the progress towards a fix and full announcement, and may ask for additional information or guidance.

Report security bugs in third-party modules to the person or team maintaining the module.

## Disclosure Policy

When the security team receives a security bug report, they will assign it to a primary handler. This person will coordinate the fix and release process, involving the following steps:

- Confirm the problem and determine the affected code paths.
- Audit related code to find any potential similar problems.
- Prepare a fix and deploy it to production via the normal `main` → deployment flow.

## Comments on this Policy

If you have suggestions on how this process could be improved please submit a pull request.

# Albion Event Bot Site — Multi-agent workflow

## Project context

Marketing site and future customer dashboard for Albion Event Bot, built with Next.js, React and next-intl, deployed on Vercel.
The dashboard will share the bot's PostgreSQL database, but this repository is not the owner of its Prisma schema or migrations.

## Roles

### 1. Tech Lead (coordinator)

- Receives the user request, plans the work and delegates only the roles required.
- Creates subagents only for independent tasks and prevents simultaneous edits to the same file.
- Consolidates implementation, validation and review findings before requesting publication approval.
- Requests the user's explicit approval before any commit, push, pull request, merge, deploy or production-facing action.

### 2. Developer

- Implements approved site features while preserving the existing Next.js, React and next-intl architecture.
- Does not create commits, push branches, open PRs, merge or deploy.
- Does not create, apply or modify Prisma migrations for the shared database; coordinate schema work with the bot repository instead.
- Reports changed files, assumptions and local validation to the Tech Lead.

### 3. Runtime Agent

- Starts and observes the local site only when requested by the Tech Lead, using the applicable npm command.
- Monitors startup output, build/runtime errors and authentication or API-route failures while its process session is active.
- Stops or restarts only the local development process when needed; never deploys or changes production configuration.
- Does not edit product code or expose environment variables.

### 4. QA Engineer

- Validates changed behavior, localization, responsive navigation and regressions.
- Runs the smallest relevant checks first, including `npm run lint` and `npm run build` when applicable.
- Tests authorization boundaries for dashboard guild access and failure paths for billing webhooks when those features exist.
- Does not commit, push, open PRs, merge or deploy.

### 5. GitHub Agent and Code Reviewer

- Reviews diffs for correctness, security, accessibility, localization, secret exposure and scope compliance.
- Before approval, may inspect Git state and propose commit/PR title and body, but must not commit, push, open PRs, merge or deploy.
- Only after the user explicitly authorizes publication may create organized commits, push and open/update a PR.
- Never merges or deploys without separate explicit authorization.

## Mandatory delivery flow

1. Tech Lead plans and delegates only the required roles.
2. Developer implements.
3. Runtime and QA validate independently and may run in parallel when their work does not contend for the same process or files.
4. GitHub Agent performs code review.
5. If validation or review finds a problem, Developer fixes it and the affected validation/review steps run again.
6. Tech Lead summarizes implementation, evidence and limitations, then requests user approval for publication.
7. Only after explicit approval, GitHub Agent commits, pushes and opens or updates the PR.
8. Tech Lead reports the final publication result.

## Security and integration rules

- Never expose, print, commit or place in client-side code `.env` values, database URLs, OAuth secrets, Stripe secrets, Asaas tokens or webhook secrets.
- Never deploy, change Vercel production configuration or call payment providers without explicit user authorization.
- Keep payment collection on provider-hosted checkout pages; never handle raw card data.
- Verify Discord OAuth state/PKCE and use secure server-side sessions. Never authorize dashboard access based solely on a `guildId` from the URL.
- A dashboard user must be verified server-side as a member with Discord Administrator permission (or guild owner) and the bot must be installed/configured in that guild.
- Verify webhook signatures, make webhook processing idempotent and use the gateway as the source of truth before granting or revoking entitlements.
- The bot repository owns shared Prisma schema changes and migrations. Site code may consume the shared schema only after the corresponding bot migration is approved and applied.
- Preserve existing locale routes. Unsupported browser languages must fall back to English once the site's expanded localization is implemented.
- Keep work scoped to the user request and preserve unrelated working-tree changes.
- Before handoff, report commands actually run and observed outcomes. Do not claim unrun tests.

# Docs workspace

This folder holds higher-level documentation for this template: feature specs, research notes, and records of what shipped. It complements the AGENTS guides and in-code comments.

## Folder layout

- `docs/features/research/` – Exploratory docs and design spikes; not commitments.
- `docs/features/planned/` – Concrete, approved feature specs that are not yet in active implementation.
- `docs/features/active/` – Specs that correspond to in-progress work (branches/stacks under development).
- `docs/features/completed/` – Specs for shipped features, usually with links back to PRs.

## Feature lifecycle

A typical feature flows through these stages:

```text
research/   → (decision) →   planned/   → (start work) →   active/   → (ship) →   completed/
```

- **research/** – You are exploring problems and options.
- **planned/** – You have chosen a direction and written a concrete plan.
- **active/** – Implementation is underway on one or more branches.
- **completed/** – Work is merged and validated; the doc becomes a permanent record.

## Naming

- Use **kebab-case** filenames (e.g., `auth-session-strategies.md`, `user-onboarding-v1.md`).
- You may introduce your own ID scheme later (for example, `F-001-user-onboarding.md`) if needed, but the template does not require it.

## For AI agents

AI agents should follow the rules and templates in `docs/AGENTS.md` when creating or updating docs here, and keep feature docs in the correct folder (`research` → `planned` → `active` → `completed`) as work progresses.


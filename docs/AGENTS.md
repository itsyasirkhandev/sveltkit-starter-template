<coding_guidelines>
# AGENTS Guide – `docs/`

This guide explains how AI agents should use the `docs/` workspace for research, feature planning, and keeping documentation in sync with implementation, especially when running in spec mode and when Graphite MCP is available.

---

## 1. Spec mode in this repo

- In **spec mode**, you must **not** modify files or run mutating tools.
- Your job in spec mode is to:
  - Read root `AGENTS.md`, `src/lib/AGENTS.md`, `src/routes/AGENTS.md`, and any relevant docs under `docs/features/*`.
  - Understand the request and existing patterns.
  - Propose a concrete plan, including which docs under `docs/features/*` should be created or updated.
  - Describe (but do not execute) the Graphite stack structure you intend to use.
- Only after the user approves your spec and spec mode is turned off may you create or edit files under `docs/`.

---

## 2. Feature folders and when to use them

All feature docs live under `docs/features/` in four subfolders:

- `research/` – Use for **exploration**: design spikes, tradeoff analyses, investigations. These docs do not guarantee that a feature will be built.
- `planned/` – Use for **approved** features with a concrete implementation plan but no active coding yet.
- `active/` – Use for features that are currently being implemented (branches/stacks exist and work is in progress).
- `completed/` – Use for **shipped** features; these docs record what ultimately went live.

Move docs between folders as the lifecycle progresses: `research` → `planned` → `active` → `completed`.

---

## 3. Templates

Use these templates when creating new docs. Do not create example docs unless the user explicitly asks; instead, instantiate these templates only when there is a concrete request.

### 3.1 Research doc template (`docs/features/research/*.md`)

```md
# <Research Topic>

## Status
- Folder: research
- Last updated: <YYYY-MM-DD>
- Owner: <name or "agent">

## Problem / Question
What are we trying to understand or decide?

## Context
- Existing behavior or system
- Constraints, risks, assumptions

## Options Explored
- Option A: ...
- Option B: ...

## Findings
- Key insights
- Pros/cons of each option

## Recommendation / Next Steps
- Recommended direction (if any)
- Suggest a feature doc path under `docs/features/planned/` if we should proceed.
```

### 3.2 Feature doc template (`docs/features/{planned,active,completed}/*.md`)

```md
# <Feature Title>

## Status
- Folder: planned | active | completed
- Last updated: <YYYY-MM-DD>
- Owner: <name or "agent">
- Graphite: (optional) note or link if Graphite MCP is available

## Summary
Short 2–4 sentence description of the feature and why it exists.

## Context & Goals
- Problem statement
- Constraints or assumptions
- Success criteria (how we know this is done)

## Design / Approach
- Data model changes (e.g., Firestore collections/fields/rules)
- Affected resources and stores (`$lib/server/resources/*`, `$lib/stores/*`)
- Route / UI changes (`src/routes/*`)
- Any external dependencies (Firebase, etc.)

## Implementation Plan
- [ ] Step 1 …
- [ ] Step 2 …
- [ ] Step 3 …

## Validation
- [ ] `npm run check`
- [ ] `npm run lint`
- [ ] `npm run test`
- [ ] `npm run dev` + `npm run dev:check`
- [ ] (If available) Svelte MCP checks on modified `.svelte` files

## Notes / Follow-ups
- Future improvements, tech debt, or related features.
```

---

## 4. Graphite MCP-aware workflow

When the **Graphite MCP** is available, always prefer it over raw CLI commands for managing branches/stacks and PRs.

- Use Graphite MCP to:
  - Discover existing branches and stacks.
  - Create new feature branches/stacks aligned with your docs (e.g., branch names mirroring the feature title).
  - Submit stacks/PRs once implementation is complete.
- When updating a feature doc, populate the `Graphite` field in the Status section using information returned by Graphite MCP when appropriate (stack identifiers, PR URLs, etc.).
- If Graphite MCP is **not** available, you may describe the intended Graphite structure in the spec and assume a human will run the CLI, but avoid duplicating MCP behavior with raw shell commands when MCP exists.

---

## 5. Spec-mode → implementation flow for agents

1. **In spec mode (planning only):**
   - Read root and area-specific AGENTS guides, plus any relevant docs under `docs/features/*`.
   - Decide whether the request needs a **research** doc, a **planned** feature doc, or both.
   - In your spec response, clearly state:
     - Which doc(s) you intend to create or update (with paths).
     - How you expect the feature to move through `research` → `planned` → `active` → `completed`.
     - How you would integrate Graphite MCP (high-level stack structure) without actually running it.

2. **After user approval (spec mode off):**
   - Create or update the appropriate docs using the templates above, placing them in the correct folder.
   - If Graphite MCP is available and the user wants to proceed with implementation:
     - Use MCP to create the initial stack/branch for this feature.
     - Optionally note the stack or PR in the `Graphite` section of the feature doc.

3. **While implementing:**
   - Keep the Implementation Plan checklist in the feature doc in sync with real progress.
   - Update the folder (planned → active) when coding starts, and (active → completed) when the work is merged and validated.

4. **On completion:**
   - Ensure all validation steps are complete (checks, lint, tests, runtime checks, Svelte MCP if available).
   - Move the doc to `docs/features/completed/`.
   - Update the `Graphite` field with final PR URLs or stack references if available via MCP.

</coding_guidelines>


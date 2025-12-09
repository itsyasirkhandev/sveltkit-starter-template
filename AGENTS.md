# AGENTS Guide (Root)

> Lightweight entrypoint; nearest-folder AGENTS wins.

## Project Snapshot
- Single SvelteKit 2 app (Vite) with Svelte 5 runes, TypeScript strict, Tailwind CSS 4, Firebase (Auth/Firestore), Vitest.
- npm-based; Node >=20; SSR disabled via `src/routes/+layout.js`.
- Sub-guides below contain details per area.

## Root Setup Commands
- `npm install`
- `npm run dev`
- `npm run check`
- `npm run lint`
- `npm run test`
- `npm run build`

## Universal Conventions
- TypeScript strict; prefer `interface`; avoid `any`.
- Svelte 5 runes (`$state`, `$derived`, `$effect`, `$props`); stores live in `.svelte.ts`.
- Tailwind tokens from `src/routes/layout.css`; merge classes with `cn` (`src/lib/utils.ts`).
- Formatting: `prettier --check .`; lint: `eslint .`; tests: `npm run test`.
- Commits: concise conventional style (`feat:`, `fix:`, `chore:`); branches from `main` (feature/*).

## Security & Secrets
- Copy `.env.example` → `.env`; never commit secrets.
- PUBLIC_* Firebase keys still sensitive; restrict in Firebase console.
- Avoid logging PII; remove debug logs before merging.

## JIT Index (open these, don’t paste full files)
### Directory Map
- Library hub: `src/lib/` → [src/lib/AGENTS.md](src/lib/AGENTS.md)
- Firebase helpers: `src/lib/firebase/` → [src/lib/firebase/AGENTS.md](src/lib/firebase/AGENTS.md)
- Stores: `src/lib/stores/` → [src/lib/stores/AGENTS.md](src/lib/stores/AGENTS.md)
- Schemas: `src/lib/schemas/` → [src/lib/schemas/AGENTS.md](src/lib/schemas/AGENTS.md)
- Server utils: `src/lib/server/` → [src/lib/server/AGENTS.md](src/lib/server/AGENTS.md)
- Components/design tokens: `src/lib/components/` → [src/lib/components/AGENTS.md](src/lib/components/AGENTS.md)
- Tests: `src/lib/__tests__/` → [src/lib/__tests__/AGENTS.md](src/lib/__tests__/AGENTS.md)
- Routes/UI: `src/routes/` → [src/routes/AGENTS.md](src/routes/AGENTS.md)

### Quick Find Commands
- Find runes stores: `npm exec --yes ripgrep -n "\\$state" src/lib/stores`
- Firestore usage: `npm exec --yes ripgrep -n "getDocuments\\(|subscribeToCollection" src`
- Form handlers/schemas: `npm exec --yes ripgrep -n "handleForm" src`
- Token usage: `npm exec --yes ripgrep -n "bg-background|text-foreground" src/routes`

## Definition of Done
- `npm run check && npm run lint && npm run test && npm run build`
- No TODO/debug logs; env ready; tests updated for new/changed behavior.

## Optimization & Extended Thinking (LEVER)
- Philosophy: best code is no code; second-best is existing code. LEVER = Leverage patterns, Extend before creating, Verify via reactivity, Eliminate duplication, Reduce complexity.
- Decision flow: try to extend existing patterns first; only create new abstractions when reuse fails and is reusable.
- Pre-implementation checks: list similar code/queries/hooks/components; list reuse options; estimate new vs extended LOC/files/endpoints/tables; favor optimized path if <50% of new work.
- Anti-patterns: new tables/queries/hooks for similar data; duplicate query logic; UI-driven schemas; excessive font sizes/weights; arbitrary spacing/colors.
- Scoring: if reuse factors score >5, extend existing; < -5, create new; otherwise analyze deeper. Track success: code reduction >50%, reuse >70%, minimal new files/tables, no circular deps.




## 🐞 Debugging Console Logs

When debugging issues, the AI must follow these strict protocols:

1.  **Be specific about what logs are needed**
    *   Never say "check the console" or "expand the Object".
2.  **Add targeted `console.log` statements**
    *   Include clear labels showing exactly what values to look for.
3.  **Tell the user the exact log line to find**
    *   *Example:* "Look for `[ComponentName] State:`..."
4.  **List the specific properties needed**
    *   *Example:* "I need: `isLoading`, `hasCurrentImage`, `isInputDisabled`".
5.  **Add temporary debug logging**
    *   Output the exact data structure needed to diagnose the issue.

### ✅ Example of Good Debugging

**The Code:**
```javascript
console.log('[DEBUG] Input state:', {
  isDisabled: isInputDisabled,
  isLoading: isLoading,
  hasImage: hasCurrentImage,
});
```

**The Instruction to User:**
> "Look for the line that says `'[DEBUG] Input state:'` and tell me the values of `isDisabled`, `isLoading`, and `hasImage`."

### ❌ Never / ✅ Always

| ❌ Never ask user to... | ✅ Always... |
| :--- | :--- |
| "Check the console for errors" | Add specific logging code |
| "Expand the Object" | Tell them the exact log label to find |
| "Look at the console output" | List the exact properties you need to see |

---

## 🧹 Legacy Code Cleanup

When implementing new features or making changes, the AI must:

1.  **Always delete legacy code**
    *   Don't leave old code paths "just in case."
2.  **Remove backward compatibility**
    *   If migrating to a new pattern, remove the old pattern completely.
3.  **Delete unused imports**
    *   Remove any type imports or dependencies that are no longer used.
4.  **Clean up comments**
    *   Remove "backward compat", "legacy", or "deprecated" comments referring to deleted code.
5.  **No fallback logic**
    *   Avoid `oldPattern ?? newPattern` — choose one and commit.

> **Rationale:** Legacy code creates bugs, confusion, and maintenance burden. Clean breaks are better than dual-system support.

---

## 💰 Console Log Cost Convention

Use these prefixes in debug logs to instantly identify billed Firestore operations versus free local operations (React state, IndexedDB).

*   **Does it call Firebase/Google servers?** $\rightarrow$ `(IS $)`
*   **Does it run locally in the browser?** $\rightarrow$ `(NO $)`

**Example:**
```javascript
console.log('(IS $) Fetching user profile from Firestore...');
console.log('(NO $) Updating local React state...');
```

---

## 🚀 Development Philosophy

In software development, we follow this pattern. **Always state which step we are currently on.**

1.  **Make it work** (Fix the bug/logic)
2.  **Make it right** (Clean up the code/architecture)
3.  **Make it fast** (Optimize/Cache)


## Critical Final Instruction

- CRITICAL: When fixing a bug, identify the root cause, implement the fix, and verify with linting. ALWAYS end with a simple one-sentence summary using exactly 3 alarm emojis (🚨🚨🚨). This is mandatory and must be the very last sentence in your response.
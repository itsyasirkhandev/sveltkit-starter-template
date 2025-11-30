# AGENTS Guide - `src/lib/__tests__/`

> Vitest testing patterns.

## Navigation

| Guide | When to Use |
|-------|-------------|
| [../AGENTS.md](../AGENTS.md) | What to test |
| [../schemas/AGENTS.md](../schemas/AGENTS.md) | Schema tests |
| [../server/AGENTS.md](../server/AGENTS.md) | Form handler tests |

---

## Commands

```bash
npm run test        # Run once
npm run test:watch  # Watch mode
```

---

## Test Structure

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('ModuleName', () => {
  beforeEach(() => { /* setup */ });

  it('should do something', () => {
    const result = doSomething('input');
    expect(result).toBe('expected');
  });
});
```

---

## Common Assertions

```typescript
expect(value).toBe(expected);          // Strict equal
expect(value).toEqual(expected);       // Deep equal
expect(value).toBeTruthy();
expect(value).toBeNull();
expect(arr).toContain(item);
expect(arr).toHaveLength(3);
expect(obj).toHaveProperty('key');
expect(() => fn()).toThrow('error');
await expect(promise).resolves.toBe(value);
await expect(promise).rejects.toThrow();
```

---

## Schema Testing

```typescript
import { loginSchema } from '../schemas';

describe('loginSchema', () => {
  it('validates correct data', () => {
    const result = loginSchema.safeParse({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(result.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const result = loginSchema.safeParse({
      email: 'invalid',
      password: 'password123',
    });
    expect(result.success).toBe(false);
  });
});
```

---

## Mocking

```typescript
// Mock function
const callback = vi.fn();
doSomething(callback);
expect(callback).toHaveBeenCalledWith('arg');

// Mock return value
const mockFn = vi.fn().mockReturnValue('value');

// Mock module
vi.mock('$lib/firebase/firestore', () => ({
  getDocument: vi.fn().mockResolvedValue({ id: '1', name: 'Test' }),
}));
```

---

## Async Tests

```typescript
it('fetches data', async () => {
  const result = await fetchData();
  expect(result).toBeDefined();
});

it('rejects on error', async () => {
  await expect(failingFn()).rejects.toThrow('Error');
});
```

---

## Rules

| DO | DON'T |
|----|-------|
| Test behavior | Test implementation details |
| One focus per test | Multiple unrelated assertions |
| Mock external deps | Make real API calls |
| Test edge cases | Only test happy path |

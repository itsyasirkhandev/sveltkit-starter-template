# AGENTS Guide - `src/lib/firebase/`

> Firestore database operations.

## Navigation

| Guide | When to Use |
|-------|-------------|
| [../AGENTS.md](../AGENTS.md) | Library overview |
| [../stores/AGENTS.md](../stores/AGENTS.md) | State with Firestore |
| [../schemas/AGENTS.md](../schemas/AGENTS.md) | Data validation |
| [../server/AGENTS.md](../server/AGENTS.md) | Server-side resources |

---

## Available Helpers

```typescript
import {
  getDocument, getDocuments,        // Read
  addDocument, updateDocument,      // Write
  deleteDocument,                   // Delete
  subscribeToCollection,            // Real-time (collection)
  subscribeToDocument,              // Real-time (single doc)
  where, orderBy, limit,            // Query constraints
} from '$lib/firebase/firestore';
```

---

## CRUD Operations

```typescript
// Create (auto-adds createdAt, updatedAt)
const id = await addDocument('users', { name: 'John', email: 'john@example.com' });

// Read single
const user = await getDocument<User>('users', 'user-123');

// Read multiple with query
const admins = await getDocuments<User>('users', [
  where('role', '==', 'admin'),
  orderBy('createdAt', 'desc'),
  limit(10),
]);

// Update (auto-updates updatedAt)
await updateDocument('users', 'user-123', { name: 'John Updated' });

// Delete
await deleteDocument('users', 'user-123');
```

---

## Real-Time Subscriptions

```typescript
// In component or store
let users = $state<User[]>([]);

$effect(() => {
  const unsubscribe = subscribeToCollection<User>(
    'users',
    (docs) => { users = docs; },
    [where('active', '==', true)]
  );
  return () => unsubscribe();
});
```

---

## Query Constraints

```typescript
where('status', '==', 'active')       // Equality
where('price', '>=', 100)             // Comparison
where('tags', 'array-contains', 'featured')
where('category', 'in', ['a', 'b'])
orderBy('createdAt', 'desc')
limit(20)
```

---

## Type Your Documents

```typescript
interface User {
  id: string;
  email: string;
  role: 'admin' | 'member';
  createdAt: Timestamp;
}

const user = await getDocument<User>('users', id);
```

---

## Security Rules

Update `firestore.rules` for each collection:

```javascript
match /users/{userId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}
```

---

## Cost Tracking

```typescript
console.log('(IS $) [users] query:', { filter }); // Firestore = costs
console.log('(NO $) [store] update');              // Local = free
```

---

## Rules

| DO | DON'T |
|----|-------|
| Use helpers from `$lib/firebase/firestore` | Import SDK directly |
| Type documents with interfaces | Use `any` |
| Clean up subscriptions | Leave dangling listeners |
| Update security rules | Use default open rules |

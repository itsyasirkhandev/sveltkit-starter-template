# AGENTS Guide - `src/lib/stores/`

> Svelte 5 runes-based state management.

## Navigation

| Guide | When to Use |
|-------|-------------|
| [../AGENTS.md](../AGENTS.md) | Library overview |
| [../firebase/AGENTS.md](../firebase/AGENTS.md) | Firestore integration |
| [../components/AGENTS.md](../components/AGENTS.md) | Using stores in UI |
| [../../routes/AGENTS.md](../../routes/AGENTS.md) | Page-level state |

---

## Auth Store (Ready)

```typescript
import { authStore } from '$lib';

// Actions
await authStore.signIn(email, password);
await authStore.signInWithGoogle();
await authStore.signUp(email, password, displayName);
await authStore.signOut();

// State
authStore.user           // User | null
authStore.loading        // boolean
authStore.error          // string | null
authStore.isAuthenticated // boolean (computed)
authStore.displayName    // string (computed)
```

---

## Class-Based Store (Recommended)

```typescript
// stores/cart.svelte.ts
class CartStore {
  items = $state<CartItem[]>([]);
  
  // Computed
  count = $derived(this.items.length);
  total = $derived(this.items.reduce((sum, i) => sum + i.price * i.qty, 0));
  isEmpty = $derived(this.items.length === 0);
  
  // Actions
  add(item: CartItem) { this.items.push(item); }
  remove(id: string) { this.items = this.items.filter(i => i.id !== id); }
  clear() { this.items = []; }
}

export const cartStore = new CartStore();
```

---

## Data Store with Firestore

```typescript
// stores/products.svelte.ts
import { getDocuments, subscribeToCollection, type Unsubscribe } from '$lib/firebase/firestore';

class ProductsStore {
  items = $state<Product[]>([]);
  loading = $state(false);
  private unsub: Unsubscribe | null = null;
  
  // One-time fetch
  async load() {
    this.loading = true;
    this.items = await getDocuments<Product>('products');
    this.loading = false;
  }
  
  // Real-time
  subscribe() {
    this.cleanup();
    this.unsub = subscribeToCollection<Product>('products', (docs) => {
      this.items = docs;
    });
  }
  
  cleanup() { this.unsub?.(); }
}

export const productsStore = new ProductsStore();
```

---

## Usage in Components

```svelte
<script lang="ts">
  import { cartStore } from '$lib/stores/cart.svelte';
  import { productsStore } from '$lib/stores/products.svelte';
  
  // Subscribe on mount
  $effect(() => {
    productsStore.subscribe();
    return () => productsStore.cleanup();
  });
</script>

<p>Cart: {cartStore.count} items (${cartStore.total})</p>

{#each productsStore.items as product}
  <button onclick={() => cartStore.add(product)}>{product.name}</button>
{/each}
```

---

## Runes Reference

```typescript
$state(value)       // Reactive state
$derived(expr)      // Computed (use for all computed values)
$effect(() => {})   // Side effects, cleanup with return
$props()            // Component props
```

---

## Rules

| DO | DON'T |
|----|-------|
| Use `$state` for reactive data | Use plain `let` |
| Use `$derived` for computed | Recalculate in templates |
| Use `.svelte.ts` extension | Use `.ts` for runes |
| Clean up subscriptions | Leave dangling listeners |
| Export singleton instance | Export class directly |

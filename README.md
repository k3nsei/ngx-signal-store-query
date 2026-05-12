# ngx-signal-store-query

Signal Store feature that bridges with Angular Query

## Usage Example

### 1) Setup Angular Query

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';

export const appConfig: ApplicationConfig = {
  providers: [provideTanStackQuery(new QueryClient())],
};
```

### 2) Create a mocked API service

```typescript
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MockApiService {
  async fetchNumber(id: number): Promise<number> {
    return Promise.resolve(id * 10);
  }

  async add(value: number, current: number): Promise<number> {
    return Promise.resolve(current + value);
  }
}
```

### 3) Use `withQuery`

```typescript
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { signalStore, withState } from '@ngrx/signals';
import { withQuery } from '@ngx-signal-store-query/core';

export const QueryStore = signalStore(
  withState({ id: 1 }),
  withQuery('number', (store) => {
    const api = inject(MockApiService);

    return () => ({
      queryKey: ['number', store.id()],
      queryFn: () => api.fetchNumber(store.id()),
    });
  }),
);

@Component({
  selector: 'app-query-example',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button (click)="store.numberQuery.refetch()">Refetch</button>
    <p>pending: {{ store.numberQuery.isPending() }}</p>
    <p>data: {{ store.numberQuery.data() }}</p>
  `,
})
export class QueryExampleComponent {
  readonly store = inject(QueryStore);
}
```

### 4) Use `withMutation`

```typescript
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { patchState, signalStore, withState } from '@ngrx/signals';
import { withMutation } from '@ngx-signal-store-query/core';

export const MutationStore = signalStore(
  withState({ total: 0 }),
  withMutation('add', (store) => {
    const api = inject(MockApiService);

    return () => ({
      mutationFn: (value: number) => api.add(value, store.total()),
      onSuccess: (nextTotal: number) => patchState(store, { total: nextTotal }),
    });
  }),
);

@Component({
  selector: 'app-mutation-example',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button (click)="store.addMutation.mutate(1)">Add 1</button>
    <p>pending: {{ store.addMutation.isPending() }}</p>
    <p>total: {{ store.total() }}</p>
  `,
})
export class MutationExampleComponent {
  readonly store = inject(MutationStore);
}
```

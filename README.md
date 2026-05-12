# ngx-signal-store-query

Signal Store feature that bridges with Angular Query

## Minimal setup (once)

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';

export const appConfig: ApplicationConfig = {
  providers: [provideTanStackQuery(new QueryClient())],
};
```

## Minimal `withQuery`

```typescript
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { signalStore, withState } from '@ngrx/signals';
import { withQuery } from '@ngx-signal-store-query/core';

export const QueryStore = signalStore(
  withState({ id: 1 }),
  withQuery('number', (store) => () => ({
    queryKey: ['number', store.id()],
    queryFn: async () => store.id() * 10,
  })),
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

## Minimal `withMutation`

```typescript
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { patchState, signalStore, withState } from '@ngrx/signals';
import { withMutation } from '@ngx-signal-store-query/core';

export const MutationStore = signalStore(
  withState({ total: 0 }),
  withMutation('add', (store) => () => ({
    mutationFn: async (value: number) => store.total() + value,
    onSuccess: (nextTotal: number) => patchState(store, { total: nextTotal }),
  })),
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

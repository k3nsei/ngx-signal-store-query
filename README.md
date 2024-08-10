# ngx-signal-store-query

Signal Store feature that bridges with Angular Query

## Simple Example

#### Create Store

```typescript
import { signalStore, withState } from '@ngrx/signals';
import { withQuery } from '@ngx-signal-store-query/core';
import { lastValueFrom } from 'rxjs';

import { ApiService } from './api.service';

export const ExampleStore = signalStore(
  withState({ categoryId: 1 }),
  withQuery('example', (store) => {
    const apiService = inject(ApiService);

    return () => {
      const categoryId = store.categoryId();

      return {
        enabled: !!categoryId,
        queryKey: ['category', { id: categoryId }],
        queryFn: () =>
          lastValueFrom(apiService.getCategory$(categoryId)).catch((error) => {
            console.error(error);

            return null;
          }),
      };
    };
  }),
);
```

#### Use it in component

```typescript
import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ExampleStore } from './example.store.ts';

@Component({
  standalone: true,
  selector: 'app-example',
  template: `
    <pre>
      Loading: {{ store.exampleQuery().isLoading() }}
      Fetching: {{ store.exampleQuery().isFetching() }}
      Data:
      {{ store.exampleQuery().data() | json }}
    </pre>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe],
})
export class ExampleComponent {
  public readonly store = inject(ExampleStore);
}
```

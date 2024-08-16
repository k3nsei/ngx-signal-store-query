import { DestroyRef, inject } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { patchState, signalStore, withState } from '@ngrx/signals';
import { withMutation } from '@ngx-signal-store-query/core';

export const CounterStore = signalStore(
  withState({ count: 0 }),
  withMutation('increase', (store) => () => {
    const destroyRef = inject(DestroyRef);
    const snackBar = inject(MatSnackBar);

    let timer: ReturnType<typeof setTimeout> | null = null;

    destroyRef.onDestroy(() => timer != null && clearTimeout(timer));

    return {
      mutationFn(amount: number): Promise<CounterResponse> {
        const count = store.count();

        return new Promise((resolve, reject) => {
          if (count >= 5) {
            return reject(new RangeError('Count is too high'));
          }

          timer = setTimeout(() => resolve({ count: count + amount }), 250);
        });
      },
      onSuccess({ count }: CounterResponse): void {
        return patchState(store, { count });
      },
      onError(error: Error): void {
        snackBar.open(error.message, '', {
          panelClass: 'popover-error',
          duration: 5000,
        });
      },
    };
  }),
  withMutation('decrease', (store) => () => {
    const destroyRef = inject(DestroyRef);
    const snackBar = inject(MatSnackBar);

    let timer: ReturnType<typeof setTimeout> | null = null;

    destroyRef.onDestroy(() => timer != null && clearTimeout(timer));

    return {
      mutationFn: (amount: number): Promise<CounterResponse> => {
        const count = store.count();

        return new Promise((resolve, reject) => {
          if (count <= 0) {
            return reject(new RangeError('Count is too low'));
          }

          timer = setTimeout(() => resolve({ count: count - amount }), 250);
        });
      },
      onSuccess: ({ count }: CounterResponse): void => {
        return patchState(store, { count });
      },
      onError: (error: Error): void => {
        snackBar.open(error.message, '', {
          panelClass: 'popover-error',
          duration: 5000,
        });
      },
    };
  }),
);

interface CounterResponse {
  count: number;
}

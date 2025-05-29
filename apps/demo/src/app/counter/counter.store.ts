import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MatSnackBar } from '@angular/material/snack-bar';

import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { withMutation } from '@ngx-signal-store-query/core';
import { lastValueFrom } from 'rxjs';

import { CounterApiService } from './counter-api.service';

export const CounterStore = signalStore(
  withState({ count: 0 }),
  withMutation('counter', (store) => () => {
    const destroyRef = inject(DestroyRef);
    const snackBar = inject(MatSnackBar);
    const api = inject(CounterApiService);

    return {
      mutationFn(amount: number) {
        return lastValueFrom(api.increaseBy$(amount, store.count()).pipe(takeUntilDestroyed(destroyRef)));
      },
      onSuccess({ count }): void {
        return patchState(store, { count });
      },
      onError(error: Error): void {
        snackBar.open(error.message, '', {
          panelClass: 'toast--error',
          duration: 5000,
        });
      },
    };
  }),
  withMethods(({ counterMutation }) => ({
    increaseBy(amount: number): void {
      return counterMutation.mutate(amount);
    },
  })),
);

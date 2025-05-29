import { isPlatformBrowser } from '@angular/common';
import { type HttpErrorResponse } from '@angular/common/http';
import { DestroyRef, inject, PLATFORM_ID } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MatSnackBar } from '@angular/material/snack-bar';

import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { withQuery } from '@ngx-signal-store-query/core';
import { lastValueFrom } from 'rxjs';

import { GithubApiService } from './github-api.service';

export const GithubStore = signalStore(
  withState(() => {
    const platformId = inject(PLATFORM_ID);

    return {
      organization: 'google',
      delay: isPlatformBrowser(platformId) ? 2000 : 0,
    };
  }),
  withMethods((store) => ({
    changeOrganization(organization: string) {
      return patchState(store, { organization });
    },
  })),
  withQuery('github', (store) => {
    const destroyRef = inject(DestroyRef);
    const snackBar = inject(MatSnackBar);
    const api = inject(GithubApiService);

    return () => {
      const organization = store.organization();
      const delay = store.delay();

      return {
        enabled: !!organization,
        queryKey: ['github', 'orgs', { organization }, 'repos'],
        queryFn: () =>
          lastValueFrom(
            api.fetchOrganizationRepositoryList$(organization, delay).pipe(takeUntilDestroyed(destroyRef)),
          ).catch((error: HttpErrorResponse | Error) => {
            snackBar.open(error.message, '', {
              panelClass: 'toast--error',
              duration: 5000,
            });

            return [];
          }),
        staleTime: 5 * 60 * 1000,
      };
    };
  }),
);

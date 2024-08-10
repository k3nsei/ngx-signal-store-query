import { isPlatformBrowser } from '@angular/common';
import { type HttpErrorResponse } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { patchState, signalStore, withHooks, withState } from '@ngrx/signals';
import { withQuery } from '@ngx-signal-store-query/core';
import { lastValueFrom } from 'rxjs';

import { GitHubApiService } from './github-api.service';

export const AppStore = signalStore(
  withState({ organization: 'google', delay: 3000 }),
  withQuery('github', (store) => {
    const snackBar = inject(MatSnackBar);
    const api = inject(GitHubApiService);

    return () => {
      const organization = store.organization();
      const delay = store.delay();

      return {
        enabled: !!organization,
        queryKey: ['github', 'orgs', { organization }, 'repos'],
        queryFn: () =>
          lastValueFrom(api.fetchOrganizationRepositoryList$(organization, delay)).catch(
            (error: HttpErrorResponse | Error) => {
              snackBar.open(error.message, '', {
                panelClass: 'popover-error',
                duration: 5000,
              });

              return [];
            },
          ),
        staleTime: 5 * 60 * 1000,
      };
    };
  }),
  withHooks((store) => {
    const platformId = inject(PLATFORM_ID);

    return {
      onInit() {
        if (!isPlatformBrowser(platformId)) {
          return;
        }

        setTimeout(() => patchState(store, { organization: 'angular' }), store.delay() + 5000);
      },
    };
  }),
);

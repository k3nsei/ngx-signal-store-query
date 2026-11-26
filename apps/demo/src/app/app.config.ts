import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { type ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { provideTanStackQuery, QueryClient, withNoQueryHydration } from '@tanstack/angular-query';
import { withDevtools } from '@tanstack/angular-query-devtools';

import { githubApiInterceptor } from './gh-repos';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([githubApiInterceptor])),
    provideTanStackQuery(
      () =>
        new QueryClient({
          defaultOptions: {
            queries: {
              refetchOnWindowFocus: false,
              retry: false,
              staleTime: 0,
            },
          },
        }),
      withNoQueryHydration(),
      withDevtools(),
    ),
  ],
};

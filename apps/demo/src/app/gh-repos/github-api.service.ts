import { HttpClient, type HttpEvent, type HttpHandlerFn, type HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { type Endpoints } from '@octokit/types';
import { type Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class GithubApiService {
  protected httpClient = inject(HttpClient);

  public fetchOrganizationRepositoryList$(
    organization: string,
    delayInMs = 0,
  ): Observable<GitHubOrganizationRepositoryList> {
    return this.httpClient
      .get<GitHubOrganizationRepositoryList>(`https://api.github.com/orgs/${organization}/repos`)
      .pipe(delay(delayInMs));
  }
}

export function githubApiInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const organization =
    new RegExp('^https?:\\/\\/api.github.com\\/orgs\\/(?<organization>angular|google)\\/repos$', 'i')
      .exec(req.url)
      ?.groups?.['organization']?.toLowerCase() ?? '';

  if (req.method !== 'GET' || !organization) {
    return next(req);
  }

  return next(
    req.clone({
      url: `/assets/data/gh-org-repos-${organization}.json`,
    }),
  );
}

export type GitHubOrganizationRepositoryList = Endpoints['GET /orgs/{org}/repos']['response']['data'];

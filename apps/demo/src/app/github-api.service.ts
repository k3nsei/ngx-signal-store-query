import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { type Endpoints } from '@octokit/types';
import { type Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GitHubApiService {
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

export type GitHubOrganizationRepositoryList = Endpoints['GET /orgs/{org}/repos']['response']['data'];

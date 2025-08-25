import { isPlatformBrowser, NgTemplateOutlet, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  type OnInit,
  PLATFORM_ID,
} from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { SkeletonText } from '../skeleton-text';

import { GithubApi } from './github-api';
import { GithubStore } from './github.store';

@Component({
  selector: 'ssq-github-repos',
  templateUrl: './github-repos.html',
  styleUrl: './github-repos.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GithubApi, GithubStore],
  imports: [NgTemplateOutlet, TitleCasePipe, MatIconModule, MatListModule, MatProgressBarModule, SkeletonText],
})
export class GithubRepos implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  private readonly platformId = inject(PLATFORM_ID);

  private readonly store = inject(GithubStore);

  protected readonly organization = computed(() => this.store.organization());

  protected readonly isBusy = computed(() => {
    const isFetching = this.store.githubQuery.isFetching();
    const isLoading = this.store.githubQuery.isLoading();

    return isFetching || isLoading;
  });

  protected readonly data = computed(() => this.store.githubQuery.data() ?? []);

  public ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const timer = setTimeout(() => this.store.changeOrganization('angular'), this.store.delay() + 3000);

    this.destroyRef.onDestroy(() => clearTimeout(timer));
  }
}

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

import { SkeletonTextComponent } from '../skeleton-text';

import { GithubApiService } from './github-api.service';
import { GithubStore } from './github.store';

@Component({
  selector: 'ssq-github-repos',
  templateUrl: './github-repos.component.html',
  styleUrl: './github-repos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GithubApiService, GithubStore],
  imports: [NgTemplateOutlet, TitleCasePipe, MatIconModule, MatListModule, MatProgressBarModule, SkeletonTextComponent],
})
export class GithubReposComponent implements OnInit {
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

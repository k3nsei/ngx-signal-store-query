import { NgTemplateOutlet, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { SkeletonTextComponent } from '../skeleton-text';

import { GithubApiService } from './github-api.service';
import { GithubStore } from './github.store';

@Component({
  standalone: true,
  selector: 'ssq-github-repos',
  templateUrl: './github-repos.component.html',
  styleUrl: './github-repos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GithubApiService, GithubStore],
  imports: [NgTemplateOutlet, TitleCasePipe, MatIconModule, MatListModule, MatProgressBarModule, SkeletonTextComponent],
})
export class GithubReposComponent {
  private readonly store = inject(GithubStore);

  protected readonly organization = this.store.organization;

  protected readonly isFetching = this.store.githubQuery.isFetching;

  protected readonly isLoading = this.store.githubQuery.isLoading;

  protected readonly data = computed(() => this.store.githubQuery.data() ?? []);
}

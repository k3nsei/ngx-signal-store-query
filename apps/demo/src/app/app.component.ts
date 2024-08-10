import { NgTemplateOutlet, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental';

import { AppStore } from './app.store';
import { SkeletonTextComponent } from './skeleton-text.component';

@Component({
  standalone: true,
  selector: 'ssq-app',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AppStore],
  imports: [
    TitleCasePipe,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    AngularQueryDevtools,
    SkeletonTextComponent,
    NgTemplateOutlet,
  ],
})
export class AppComponent {
  protected readonly store = inject(AppStore);

  protected organization = this.store.organization;

  protected githubQuery = this.store.githubQuery;

  protected isFetching = computed(() => {
    const githubQuery = this.githubQuery();

    return githubQuery.isFetching();
  });

  protected isLoading = computed(() => {
    const githubQuery = this.githubQuery();

    return githubQuery.isLoading();
  });

  protected data = computed(() => {
    const githubQuery = this.githubQuery();

    return githubQuery.data() ?? [];
  });
}

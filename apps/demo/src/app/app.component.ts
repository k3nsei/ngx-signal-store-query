import { ChangeDetectionStrategy, Component, isDevMode } from '@angular/core';

import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental';

import { CounterComponent } from './counter';
import { GithubReposComponent } from './gh-repos';
import { SkeletonTextComponent } from './skeleton-text';

@Component({
  standalone: true,
  selector: 'ssq-app',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AngularQueryDevtools, CounterComponent, GithubReposComponent, SkeletonTextComponent],
})
export class AppComponent {
  protected readonly isDevMode = isDevMode();
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CounterComponent } from './counter';
import { GithubReposComponent } from './gh-repos';

@Component({
  selector: 'ssq-app',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CounterComponent, GithubReposComponent],
})
export class AppComponent {}

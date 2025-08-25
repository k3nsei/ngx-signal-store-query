import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Counter } from './counter';
import { GithubRepos } from './gh-repos';

@Component({
  selector: 'ssq-app',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Counter, GithubRepos],
})
export class App {}

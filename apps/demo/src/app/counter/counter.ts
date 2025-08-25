import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CounterApi } from './counter-api';
import { CounterStore } from './counter.store';

@Component({
  selector: 'ssq-counter',
  templateUrl: './counter.html',
  styleUrl: './counter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CounterApi, CounterStore],
  imports: [MatButtonModule, MatIconModule],
})
export class Counter {
  private readonly store = inject(CounterStore);

  protected readonly value = computed(() => this.store.count());

  protected readonly isBusy = computed(() => this.store.counterMutation.isPending());

  protected increaseBy(amount: number): void {
    this.store.increaseBy(amount);
  }
}

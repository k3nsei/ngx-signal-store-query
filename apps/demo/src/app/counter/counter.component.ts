import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CounterApiService } from './counter-api.service';
import { CounterStore } from './counter.store';

@Component({
  selector: 'ssq-counter',
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CounterApiService, CounterStore],
  imports: [MatButtonModule, MatIconModule],
})
export class CounterComponent {
  private readonly store = inject(CounterStore);

  protected readonly value = computed(() => this.store.count());

  protected readonly isBusy = computed(() => this.store.counterMutation.isPending());

  protected increaseBy(amount: number): void {
    this.store.increaseBy(amount);
  }
}

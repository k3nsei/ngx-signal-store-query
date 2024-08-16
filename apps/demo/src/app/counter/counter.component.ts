import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CounterStore } from './counter.store';

@Component({
  standalone: true,
  selector: 'ssq-counter',
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CounterStore],
  imports: [MatButtonModule, MatIconModule],
})
export class CounterComponent {
  private readonly store = inject(CounterStore);

  protected readonly value = this.store.count;

  public readonly isBusy = computed(() => {
    const increase = this.store.increaseMutation.isPending();
    const decrease = this.store.decreaseMutation.isPending();

    return increase || decrease;
  });

  public increase(): void {
    this.store.increaseMutation.mutate(1);
  }

  public decrease(): void {
    this.store.decreaseMutation.mutate(1);
  }
}

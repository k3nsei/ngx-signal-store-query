import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ssq-skeleton-text',
  template: `&nbsp;`,
  styleUrl: './skeleton-text.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--ssq-skeleton-text-size-x]': 'inlineSize()',
    '[style.--ssq-skeleton-text-size-y]': 'blockSize()',
    '[class.skeleton-text-animated]': 'animated()',
  },
})
export class SkeletonTextComponent {
  public inlineSize = input<string>();

  public blockSize = input<string>();

  public animated = input(true, { transform: booleanAttribute });
}

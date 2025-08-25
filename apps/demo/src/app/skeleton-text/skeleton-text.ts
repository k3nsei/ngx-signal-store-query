import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ssq-skeleton-text',
  template: `&nbsp;`,
  styleUrl: './skeleton-text.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--ssq-skeleton-text-size-x]': 'inlineSize()',
    '[style.--ssq-skeleton-text-size-y]': 'blockSize()',
    '[class.skeleton-text-animated]': 'animated()',
  },
})
export class SkeletonText {
  public inlineSize = input<string>();

  public blockSize = input<string>();

  public animated = input(true, { transform: booleanAttribute });
}

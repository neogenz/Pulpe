import {trigger, transition, style, animate, state} from "@angular/animations";

/**
 * Class Animations which includes triggers animations for a component.
 */
export class Animations {

  constructor() {
  }

  /**
   * FadeIn animation.
   * @returns {AnimationEntryMetadata}
   */
  static fadeIn() {
    return trigger(
      'fadeIn', [
        transition(':enter', [
          style({opacity: 0}),
          animate(300, style({opacity: 1}))
        ]),
        transition(':leave', [
          animate(300, style({opacity: 0}))
        ])
      ]
    );
  }

  /**
   * FadeIn animation.
   * @returns {AnimationEntryMetadata}
   */
  static isVisibleChanged() {
    return trigger('isVisibleChanged', [
      state('true', style({opacity: 1, transform: 'scale(1.0)', display: 'initial'})),
      state('false', style({opacity: 0, transform: 'scale(0.0)', display: 'none'})),
      transition('1 => 0', animate('300ms')),
      transition('0 => 1', animate('300ms'))
    ]);
  }
}






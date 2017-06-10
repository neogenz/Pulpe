import {trigger, transition, style, animate, state} from "@angular/core";

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
}






import {Color} from "ng2-charts/index";

export class ColorConfiguration {
    // Property (public by default)
    background: string;
    border: string;



    // Constructor
    // (accepts a value so you can initialize engine)
    constructor(background: string, border: string) {
        this.background = background;
        this.border = border;
    }
}
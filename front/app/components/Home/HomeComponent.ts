import { Component, VERSION } from '@angular/core';
import { MdProgressSpinner } from '../../../node_modules/@angular/material/progress-spinner/progress-spinner'
@Component({
    selector: 'pulpe-home-cmp',
    templateUrl: './app/components/Home/HomeView.html'
})
export class HomeComponent {
    folders = [
        {
            name: 'Séance du Mercredi',
            updated: new Date('1/1/16'),
            value: 100
        },
        {
            name: 'Séance du Lundi',
            updated: new Date('1/17/16'),
            value: 98
        },
        {
            name: 'Séance du Vendredi',
            updated: new Date('1/28/16'),
            value: 79
        }
    ];

    color = 'accent';
    mode = 'determinate';
    value = 45;
    showText: boolean = true;

}

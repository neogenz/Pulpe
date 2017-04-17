import { Component, VERSION } from '@angular/core';

@Component({
    selector: 'pulpe-home-cmp',
    templateUrl: './HomeView.html',
    styleUrls: ['./home.component.css']
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

    pecDisplayed = false;

    public displayPec():void{
        this.pecDisplayed = true;
    }

    public hidePec():void{
        this.pecDisplayed = false;
    }
}

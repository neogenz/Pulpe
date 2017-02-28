import { Component } from '@angular/core';

@Component({
    selector: 'pulpe-cmp',
    template: `
    <pulpe-menu-bar-cmp></pulpe-menu-bar-cmp>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
    `,
})
export class PulpeAppComponent {
}

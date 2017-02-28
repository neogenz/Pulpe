import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PulpeAppComponent } from './app.component';
import { HomeComponent } from './components/Home/HomeComponent';
import { MenuBarComponent } from './components/MenuBar/MenuBarComponent';
@NgModule({
    imports: [BrowserModule],
    declarations: [
        PulpeAppComponent,
        MenuBarComponent,
        HomeComponent
    ],
    bootstrap: [PulpeAppComponent]
})
export class PulpeModule {
}

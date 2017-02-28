import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PulpeAppComponent } from './app.component';
import { PulpeMenuBarComponent } from './components/MenuBar/PulpeMenuBarComponent';
@NgModule({
    imports: [BrowserModule],
    declarations: [
        PulpeAppComponent,
        PulpeMenuBarComponent
    ],
    bootstrap: [PulpeAppComponent]
})
export class PulpeModule {
}
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ToyComponent } from './toy/toy.component';
import { InterfaceComponent } from './interface/interface.component';

@NgModule({
    declarations: [
        AppComponent,
        ToyComponent,
        InterfaceComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

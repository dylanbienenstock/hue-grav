import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SimulationComponent } from './simulation/simulation.component';
import { InterfaceComponent } from './interface/interface.component';

@NgModule({
    declarations: [
        AppComponent,
        SimulationComponent,
        InterfaceComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

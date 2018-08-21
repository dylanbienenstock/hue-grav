import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SimulationComponent } from './simulation/simulation.component';
import { InterfaceComponent } from './interface/interface.component';
import { FullscreenService } from './fullscreen.service';

@NgModule({
    declarations: [
        AppComponent,
        SimulationComponent,
        InterfaceComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [
        FullscreenService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

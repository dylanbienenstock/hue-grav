import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Ng2SlideDownModule } from "ng2-slide-down";

import { AppComponent } from './app.component';
import { SimulationComponent } from './simulation/simulation.component';
import { InterfaceComponent } from './interface/interface.component';
import { FullscreenService } from './fullscreen.service';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
    declarations: [
        AppComponent,
        SimulationComponent,
        InterfaceComponent,
        SettingsComponent
    ],
    imports: [
        BrowserModule,
        Ng2SlideDownModule
    ],
    providers: [
        FullscreenService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

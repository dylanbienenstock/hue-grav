import { Component, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { FullscreenService } from '../fullscreen.service';

@Component({
    selector: 'app-interface',
    templateUrl: './interface.component.html',
    styleUrls: ['./interface.component.scss']
})
export class InterfaceComponent implements AfterViewInit {

    constructor(public fullscreen: FullscreenService) { }

    @Input() playing: boolean;
    @Input() config: SimulationConfig;

    @Output() playOrPause = new EventEmitter<any>();
    @Output() reset = new EventEmitter<any>();
    @Output() configChanged = new EventEmitter<SimulationConfig>();

    public initialized: boolean = false;
        
    public settingsShown: boolean = false;

    public labelText: string;
    public labelShown: boolean;
    public labelTimeout: any;

    ngAfterViewInit() {
        setTimeout(() => {
            this.initialized = true;
        });
    }

    public toggleSettings() {
        this.settingsShown = !this.settingsShown;
    }
    
    public showLabel(text: string) {
        clearTimeout(this.labelTimeout);

        this.labelText = text;
        this.labelShown = true;
    }

    public hideLabel() {
        clearTimeout(this.labelTimeout);

        this.labelTimeout = 
            setTimeout(() => {
                this.labelShown = false;
            }, 1000);    
    }
}

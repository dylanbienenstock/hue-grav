import { Component, HostListener, EventEmitter } from '@angular/core';
import { FullscreenService } from './fullscreen.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    constructor(private fullscreen: FullscreenService) { }

    public playing: boolean = false;

    public reset = new EventEmitter<any>();

    public config: SimulationConfig = {
        showCursor: true,
        clearRectOpacity: 0.9,
        velocityDampening: 0.005,
        gravitationalConstant: 0.01,
        particleCount: 1024,
        particleSize: 6,
        particleOpacity: 0.85,
        explosionTriggerRadius: 100,
        explosionVelocity: 20,
        explosionSpread: 1
    };

    onConfigChanged(newConfig: SimulationConfig) {
        this.config = newConfig;
    }

    @HostListener("window:keypress", ["$event"])
    onKeyPress(e: KeyboardEvent) {
        switch (e.key) {
            case " ":
                this.playing = !this.playing;
                    break;
            case "r":
            case "R":
                this.reset.emit();
                    break;
            case "f":
            case "F":
                this.fullscreen.toggle();
                    break;
        }

    }
}

import { Component, HostListener, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    public playing: boolean = true;

    public reset = new EventEmitter<any>();

    public config: SimulationConfig = {
        showCursor: true,
        clearRectOpacity: 0.2,
        velocityDampening: 0.005,
        gravitationalConstant: 0.01,
        particles: {
            count: 1024,
            size: 8,
            opacity: 0.5
        },
        explosion: {
            triggerRadius: 100,
            velocity: 17.5,
            spread: 1
        }
    };

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
        }
    }
}

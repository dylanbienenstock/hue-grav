import { Component, HostListener } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    public playing: boolean = true;

    public config: SimulationConfig = {
        showCursor: true,
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
        if (e.key == " ") {
            this.playing = !this.playing;
        }
    }
}

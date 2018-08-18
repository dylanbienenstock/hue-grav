import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    public config: SimulationConfig = {
        showCursor: true,
        velocityDampening: 0.001,
        gravitationalConstant: 0.01,
        particles: {
            count: 1024,
            size: 8,
            opacity: 0.5
        },
        explosion: {
            triggerRadius: 100,
            velocity: 20,
            spread: 1
        }
    };
}

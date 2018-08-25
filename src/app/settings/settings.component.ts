import { Component, AfterViewInit, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, AfterViewInit {

    constructor() { }

    @Input() visible: boolean;
    @Input() config: SimulationConfig;

    public initialized: boolean = false;

    public booleanSettings: BooleanSetting[];
    
    public numberSettings: NumberSetting[];
    
    ngOnInit() {
        this.booleanSettings = [
            {
                name: "Show Cursor",
                model: this.config.showCursor,
                default: true
            }
        ];

        // make config object flat then
        // give property name as string instead
        // of model

        this.numberSettings = [
            {
                name: "Trails",
                model: this.config.clearRectOpacity,
                min: 0.15,
                max: 1,
                default: 0.5,
            },
            {
                name: "Velocity Dampening",
                model: this.config.velocityDampening,
                min: 0.0025,
                max: 1,
                default: 0.0075
            },
            {
                name: "Gravitational Constant",
                model: this.config.gravitationalConstant,
                min: 0.0025,
                max: 0.5,
                default: 0.01
            },
            {
                name: "Particle Count",
                model: this.config.particles.count,
                min: 1,
                max: 2048,
                default: 1024
            },
            {
                name: "Particle Size",
                model: this.config.particles.size,
                min: 1,
                max: 16,
                default: 6 
            },
            {
                name: "Particle Opacity",
                model: this.config.particles.opacity,
                min: 1,
                max: 2048,
                default: 1024
            },
            {
                name: "Explosion Trigger Radius",
                model: this.config.explosion.triggerRadius,
                min: 8,
                max: 256,
                default: 128
            },
            {
                name: "Explosion Velocity",
                model: this.config.explosion.velocity,
                min: 8,
                max: 256,
                default: 16
            },
            {
                name: "Explosion Spread",
                model: this.config.explosion.spread,
                min: 0,
                max: 1,
                default: 1
            }
        ];
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.initialized = true;

            for (let x of this.numberSettings) {
                x.model
                
            }
        });
    }
}

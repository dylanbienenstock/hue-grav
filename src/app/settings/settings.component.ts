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

    public percentage: { [key: string]: number } = {};
    public leadingZeros: { [key: string]: string } = {};
    
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
                binding: "clearRectOpacity",
                min: 0.15,
                max: 1,
                default: 0.5,
            },
            {
                name: "Velocity Dampening",
                binding: "velocityDampening",
                min: 0.0025,
                max: 0.02,
                default: 0.0075
            },
            {
                name: "Gravitational Constant",
                binding: "gravitationalConstant",
                min: 0.0025,
                max: 0.02,
                default: 0.01
            },
            {
                name: "Particle Count",
                binding: "particles.count",
                min: 1,
                max: 2048,
                default: 1024
            },
            {
                name: "Particle Size",
                binding: "particles.size",
                min: 1,
                max: 16,
                default: 6 
            },
            {
                name: "Particle Opacity",
                binding: "particles.opacity",
                min: 1,
                max: 2048,
                default: 1024
            },
            {
                name: "Explosion Trigger Radius",
                binding: "explosionTriggerRadius",
                min: 8,
                max: 256,
                default: 128
            },
            {
                name: "Explosion Velocity",
                binding: "explosionVelocity",
                min: 8,
                max: 48,
                default: 16
            },
            {
                name: "Explosion Spread",
                binding: "explosionSpread",
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

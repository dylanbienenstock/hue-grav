import { Component, AfterViewInit, Input, OnInit, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, AfterViewInit {

    constructor() { }

    @Input() visible: boolean;
    @Input() config: SimulationConfig;

    @Output() configChanged = new EventEmitter<SimulationConfig>();

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
        for (let setting of this.numberSettings) {
            this.percentage[setting.name] = this.toPercent(setting);
            this.leadingZeros[setting.name] = this.getLeadingZeros(setting);
        }

        setTimeout(() => {

            this.initialized = true;
        });
    }

    toPercent(setting: NumberSetting): number {
        let range = setting.max - setting.min;
        let ratio = 1 - (setting.max - setting.default) / range;
        let percent = ratio * 100;
        let percentRounded = Math.round(percent);

        return percentRounded;
    }

    getLeadingZeros(setting: NumberSetting): string {
        switch (this.toPercent(setting).toString().length) {
            case 0: return "000";
            case 1: return "00";
            case 2: return "0";
        }

        return "";
    }
}

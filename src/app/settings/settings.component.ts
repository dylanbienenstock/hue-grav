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
    
    public selectedBarContainer: HTMLElement; 

    ngOnInit() {
        this.booleanSettings = [
            {
                name: "Show Cursor",
                model: this.config.showCursor,
                default: true
            }
        ];

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
                max: 0.035,
                default: 0.0075
            },
            {
                name: "Gravitational Constant",
                binding: "gravitationalConstant",
                min: 0.0025,
                max: 0.035,
                default: 0.01
            },
            {
                name: "Particle Count",
                binding: "particleCount",
                min: 8,
                max: 2048,
                default: 1024
            },
            {
                name: "Particle Size",
                binding: "particleSize",
                min: 1,
                max: 16,
                default: 6 
            },
            {
                name: "Particle Opacity",
                binding: "particleOpacity",
                min: 0,
                max: 1,
                default: 0.75
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
            setting.value = setting.default;
            
            this.percentage[setting.name] = this.toPercent(setting);
            this.leadingZeros[setting.name] = this.getLeadingZeros(setting);
        }

        setTimeout(() => {
            this.initialized = true;
        });
    }

    toPercent(setting: NumberSetting): number {
        let range = setting.max - setting.min;
        let ratio = 1 - (setting.max - setting.value) / range;
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

    // Thanks! https://stackoverflow.com/users/3183756/caub
    getSignificantDigits(n) {
        var x = Math.abs(n);
        if (x===0) return 0;
        var p = Math.floor(Math.log10(x));
        if (p>0) x = x / (10**p); 
        else if (p<0) x = x * (10**-p);
        return (x+'').length-1||1;
    }

    mouseXToRatio(barContainer: HTMLElement, mouseX: number) {
        let clientRect = barContainer.getBoundingClientRect();
        let relativeX = mouseX - clientRect.left;
        let ratio = relativeX / clientRect.width;
        let ratioConstrained = Math.max(0, Math.min(1, ratio));

        return ratioConstrained;
    }

    onMouseDownBarContainer(barContainer: HTMLElement, mouseX: number) {
        this.selectedBarContainer = barContainer;
        this.adjustNumberSetting(mouseX);        
    }

    adjustNumberSetting(mouseX: number) {
        if (this.selectedBarContainer) {
            let settingName = 
                this.selectedBarContainer.getAttribute("data-setting-name");

            let ratio = 
                this.mouseXToRatio(this.selectedBarContainer, mouseX);
                
            let setting = 
                this.numberSettings.find(setting => setting.name == settingName);

            let range = setting.max - setting.min;

            let value = setting.min + range * ratio;

            let significantDigits = 
                this.getSignificantDigits(setting.default);

            let valueTruncatedString = value.toPrecision(significantDigits);

            let valueTruncated = parseFloat(valueTruncatedString);

            let newConfig = Object.assign({}, this.config);
            
            newConfig[setting.binding] = valueTruncated;
            setting.value = valueTruncated;

            this.configChanged.emit(newConfig);

            this.percentage[settingName] = Math.round(ratio * 100);
            this.leadingZeros[settingName] = this.getLeadingZeros(setting);
        }
    }
 
    @HostListener("window:mouseup")
    onMouseUp() {
        this.selectedBarContainer = null;
    }

    @HostListener("window:mousemove", ["$event"])
    onMouseMove(e: MouseEvent) {
        this.adjustNumberSetting(e.clientX);
    }
}

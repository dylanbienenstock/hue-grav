import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FullscreenService } from '../fullscreen.service';

@Component({
    selector: 'app-interface',
    templateUrl: './interface.component.html',
    styleUrls: ['./interface.component.scss']
})
export class InterfaceComponent {

    constructor(public fullscreen: FullscreenService) { }

    @Input() playing: boolean;

    @Output() playOrPause = new EventEmitter<any>();
    @Output() reset = new EventEmitter<any>();
}

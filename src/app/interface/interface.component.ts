import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-interface',
    templateUrl: './interface.component.html',
    styleUrls: ['./interface.component.scss']
})
export class InterfaceComponent {

    constructor() { }

    @Input() playing: boolean;

    @Output() playOrPause = new EventEmitter<any>();
}

import { Injectable } from '@angular/core';
import * as screenfull from "screenfull";

@Injectable({
    providedIn: 'root'
})

export class FullscreenService {

    constructor() { }

    public get active(): boolean {
        return screenfull.isFullscreen;
    }

    public request(): void {
        if (screenfull.enabled) {
            screenfull.request();
        }
    }

    public exit(): void {
        screenfull.exit();
    }

    public toggle(): void {
        screenfull.toggle();
    }
}

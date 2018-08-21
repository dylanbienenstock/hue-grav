import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class FullscreenService {

    constructor() { }

    public request() {
        /// @ts-ignore
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        }
        /// @ts-ignore
        else if (document.documentElement.mozRequestFullScreen) {
        /// @ts-ignore
            document.documentElement.mozRequestFullScreen();
        }
        else if (document.documentElement.webkitRequestFullscreen) {
        /// @ts-ignore
            document.documentElement.webkitRequestFullscreen();
        }
        /// @ts-ignore
        else if (document.documentElement.msRequestFullscreen) {
        /// @ts-ignore
            document.documentElement.msRequestFullscreen();
        }
    }
}

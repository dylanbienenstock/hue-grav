/** Two-dimensional vector */
declare interface Vector2D {
    /** X component */
    x: number,

    /** Y component */
    y: number
}

declare interface Particle {
    hue: number;
    position: Vector2D;
    velocity: Vector2D;
}

/** Configuration for the simulation */
declare interface SimulationConfig {
    /** Shows or hides the mouse cursor */
    showCursor: boolean;

    /** 
     * Opacity of the rect used to clear the screen,
     * lower opactity = longer trails
     */
    clearRectOpacity: number;

    /** Decrease in velocity per frame */
    velocityDampening: number;

    /** Gravitational constant (arbitrary) */
    gravitationalConstant: number;

    /** Particle properties */
    particles: {
        /** Amount of particles to simulate */
        count: number;
        
        /** Particle radius */
        size: number;

        /** Particle opacity */
        opacity: number;
    };

    /** Explosion properties */
    explosion: {
        /**
         * Radius in which all particles must be
         * in order to trigger an explosion
         */
        triggerRadius: number;

        /** Explosion velocity */
        velocity: number;

        /** Probably doesn't do what you expect */
        spread: number;
    };
}

declare interface NumberSetting {
    name: string;
    model: any;
    min: number;
    max: number;
    default: number;

    value?: number;
}

declare interface BooleanSetting {
    name: string;
    model: any;
    default: boolean;

    value?: boolean;
}
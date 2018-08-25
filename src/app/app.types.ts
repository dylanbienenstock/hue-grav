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

    /** Amount of particles to simulate */
    particleCount: number;
    
    /** Particle radius */
    particleSize: number;

    /** Particle opacity */
    particleOpacity: number;


    /**
     * Radius in which all particles must be
     * in order to trigger an explosion
     */
    explosionTriggerRadius: number;

    /** Explosion velocity */
    explosionVelocity: number;

    /** Probably doesn't do what you expect */
    explosionSpread: number;
}

declare interface NumberSetting {
    name: string;
    binding: any;
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
import { Component, AfterViewInit, ElementRef, ViewChild, Input, HostListener } from '@angular/core';

@Component({
    selector: 'app-simulation',
    templateUrl: './simulation.component.html',
    styleUrls: ['./simulation.component.scss']
})

export class SimulationComponent implements AfterViewInit {

    constructor() { }
    
    /** Simulation parameters */
    @Input() config: SimulationConfig;

    /** ViewChild reference to the main canvas element */
    @ViewChild("canvas")
    public canvasRef: ElementRef;

    /** Main canvas element */
    public get canvas(): HTMLCanvasElement {
        return this.canvasRef.nativeElement;
    }
    
    /** Canvas rendering context */
    public ctx: CanvasRenderingContext2D;

    /** Dimensions of the canvas / viewport */
    public clientRect: ClientRect;

    /** Device pixel ratio */
    public dpr: number;
    
    /** Cursor coordinates */
    public mouse: Vector2D;

    /** Simulated particles */
    public particles: Particle[] = [];

    /** If an explosion can happen */
    public canExplode: boolean = false;

    /** How many times an explosion has happened */
    public timesExploded: number = 0;


    /** Prepares the canvas for rendering */
    ngAfterViewInit() {
        this.ctx = this.canvas.getContext("2d");
        this.dpr = window.devicePixelRatio || 1;        

        this.mouse = {
            x: window.innerWidth / 2, 
            y: window.innerHeight / 2
        };

        this.adjustCanvasSize();
        this.createParticles();
        this.render();
    }

    @HostListener("window:resize")
    onResized() {
        this.adjustCanvasSize();
    }

    @HostListener("window:mousemove", ["$event"])
    onMouseMove(e: MouseEvent) {
        this.mouse = {
            x: e.clientX,
            y: e.clientY
        };
    }

    @HostListener("window:touchmove", ["$event"])
    ontouchmove(e: TouchEvent) {
        this.mouse = {
            x: e.touches.item(0).clientX,
            y: e.touches.item(0).clientY,
        };
    }
    
    /** Fixes canvas dimensions, adjusts for high-dpi screens */
    adjustCanvasSize() {
        this.clientRect = this.canvas.getBoundingClientRect();

        this.canvas.width = this.clientRect.width * (1 / this.dpr);
        this.canvas.height = this.clientRect.height * (1 / this.dpr);

        this.ctx.scale(1 / this.dpr, 1 / this.dpr);
    }

    /** Creates the particles */
    createParticles() {
        for (let i = 0; i < this.config.particles.count; i++) {
            let lesserDimension = Math.min(this.clientRect.width, this.clientRect.height);
            let spawnRadius = lesserDimension / 3;

            // Polar to cartesian conversion
            let theta = i * ((2 * Math.PI) / this.config.particles.count);
            let x = spawnRadius * Math.cos(theta);
            let y = spawnRadius * Math.sin(theta);

            this.particles.push(<Particle> {
                hue: i,
                position: {
                    x: x + this.clientRect.width / 2,
                    y: y + this.clientRect.height / 2
                },
                velocity: {
                    x: 0,
                    y:0
                }
            });
        }
    }

    /** Clears the screen to black */
    clearScreen() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.clientRect.width, this.clientRect.height);
    }

    /** Renders a single particle */
    drawParticle(particle: Particle) {
        let color = `hsla(${ particle.hue }, 100%, 50%, ${ this.config.particles.opacity })`;
    
        if (this.timesExploded == 0) {
            color = "rgba(255, 255, 255, 0.2)";
        }

        this.ctx.fillStyle = color;
        this.ctx.beginPath();

        this.ctx.arc(
            particle.position.x,
            particle.position.y,
            this.config.particles.size, 
            0, 
            Math.PI * 2, 
            true
        );

        this.ctx.fill();
    }

    /** Gets the difference between two Vector2D's */
    getDiff2D(a: Vector2D, b: Vector2D): Vector2D {
        return {
            x: a.x - b.x,
            y: a.y - b.y
        }
    }

    /** Sends the particles off in random directions */
    explode() {
        let offset = ((Math.random() - 0.5) * 2) * Math.PI * 2;

        for (let particle of this.particles) {
            let velocity = Math.random() * this.config.explosion.velocity;
            let angle = offset 
                      + (particle.hue * this.config.explosion.spread)
                      / this.timesExploded
                      * (Math.PI / 180);
                      
            particle.velocity.x += Math.cos(angle) * velocity;
            particle.velocity.y += Math.sin(angle) * velocity;
        }
    }

    /** The main render loop */
    render() {
        this.clearScreen();

        // Two opposite points of the smallest possible
        // rectangle that contains all the particles
        let particleBounds = {
            min: <Vector2D> {
                x: Infinity,
                y: Infinity 
            },
            max: <Vector2D> {
                x: -Infinity,
                y: -Infinity
            }
        }

        for (let particle of this.particles) {
            // Difference between mouse and particle position
            let mpDiff = this.getDiff2D(this.mouse, particle.position);

            let G = this.config.gravitationalConstant;
            let r = Math.sqrt(mpDiff.x ** 2 + mpDiff.y ** 2);
            
            // Do I need to do this?
            let angle = Math.atan2(mpDiff.y, mpDiff.x);
            let headingVector = <Vector2D> {
                x: Math.cos(angle),
                y: Math.sin(angle)
            }

            // If you want actual Newtonian gravity:
            // change the last * to a /
            particle.velocity.x += headingVector.x * G * Math.sqrt(r);
            particle.velocity.y += headingVector.y * G * Math.sqrt(r);

            particle.position.x += particle.velocity.x;
            particle.position.y += particle.velocity.y;

            // Velocity dampening
            particle.velocity.x *= 1 - this.config.velocityDampening;
            particle.velocity.y *= 1 - this.config.velocityDampening;
        
            // Party mode
            particle.hue += 5;

            // Draw the particle
            this.drawParticle(particle);

            // Calculate particleBounds
            particleBounds.min.x = Math.min(particleBounds.min.x, particle.position.x);
            particleBounds.min.y = Math.min(particleBounds.min.y, particle.position.y);
            particleBounds.max.x = Math.max(particleBounds.max.x, particle.position.x);
            particleBounds.max.y = Math.max(particleBounds.max.y, particle.position.y);
        }

        // Length of bounds' diagonal
        let pbDiff = this.getDiff2D(particleBounds.min, particleBounds.max);
        let maxDist = Math.sqrt(pbDiff.x ** 2 + pbDiff.y ** 2);        

        // Decide if it's time for an explosion
        if (maxDist < this.config.explosion.triggerRadius && this.canExplode) {
            this.canExplode = false;
            this.timesExploded++;

            this.explode();
        } else if (maxDist > this.config.explosion.triggerRadius && !this.canExplode) {
            this.canExplode = true;
        }
        
        window.requestAnimationFrame(this.render.bind(this));
    }
}

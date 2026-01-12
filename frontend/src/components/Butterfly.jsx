import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Butterfly = ({ id, sizeClasses = "w-12 h-12 md:w-16 md:h-16", className = "" }) => {
    const containerRef = useRef(null);
    const butterflyRef = useRef(null);

    useGSAP(() => {
        if (!butterflyRef.current || !containerRef.current) return;

        // 1. Initial State
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        gsap.set(containerRef.current, { x: startX, y: startY, scale: 0 });
        gsap.to(containerRef.current, { scale: 1, duration: 1, ease: "back.out" });

        // 2. Wing Flapping (Continuous but adjustable speed)
        const wingTween = gsap.to(butterflyRef.current, {
            scaleY: 0.2,
            yoyo: true,
            repeat: -1,
            duration: 0.1, // Fast flap default
            ease: "power1.inOut",
            paused: false
        });

        // 3. Gentle Wobble (Continuous)
        gsap.to(containerRef.current, {
            rotation: "random(-10, 10)",
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });

        // 4. Fly & Sit Logic
        const fly = () => {
            // Randomize duration between 1s and 2s
            const flightDuration = 1 + Math.random();

            // Pick a new random spot on screen
            // Adding buffer so they don't fly off screen entirely, stay visible
            const nextX = Math.random() * (window.innerWidth - 100) + 50;
            const nextY = Math.random() * (window.innerHeight - 100) + 50;

            // Face the direction (simple check)
            const currentX = gsap.getProperty(containerRef.current, "x");
            const isMovingRight = nextX > currentX;
            gsap.to(containerRef.current, { scaleX: isMovingRight ? -1 : 1, duration: 0.5 }); // Flip horizontally

            // Fast wings
            gsap.to(wingTween, { timeScale: 1.5, duration: 0.5 });

            // Move
            gsap.to(containerRef.current, {
                x: nextX,
                y: nextY,
                duration: flightDuration,
                ease: "power1.inOut",
                onComplete: sit
            });
        };

        const sit = () => {
            // Slow down flight
            // Slow wings to simulate resting/perching
            gsap.to(wingTween, { timeScale: 0.2, duration: 0.5 });

            // Wait 3 seconds then fly again
            gsap.delayedCall(3, fly);
        };

        // Start the cycle
        fly();

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className={`absolute pointer-events-none z-50 ${className}`}>
            <div ref={butterflyRef} className={sizeClasses}>
                <img
                    src={`/svgs/${id}.svg`}
                    alt="Butterfly"
                    className="w-full h-full object-contain drop-shadow-lg"
                />
            </div>
        </div>
    );
};

export default Butterfly;

import React, { useEffect, useRef } from 'react';

interface SnowEffectProps {
  enabled: boolean;
  intensity?: number; // 1-10 scale, where 10 is heaviest
}

interface Snowflake {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  sway: number;
  swaySpeed: number;
  swayAmount: number;
}

const SnowEffect: React.FC<SnowEffectProps> = ({ enabled, intensity = 5 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const snowflakesRef = useRef<Snowflake[]>([]);

  useEffect(() => {
    if (!enabled || !canvasRef.current) {
      // Clean up animation if disabled
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clamp intensity to 1-10 range
    const clampedIntensity = Math.max(1, Math.min(10, intensity));

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize snowflakes with intensity-based parameters
    const initSnowflakes = () => {
      // Density: Scale from 1 (light) to 10 (heavy)
      // Intensity 1: ~1 per 20000 pixels, Intensity 10: ~1 per 3000 pixels
      const densityDivisor = 23000 - (clampedIntensity * 2000);
      const count = Math.floor((canvas.width * canvas.height) / densityDivisor);
      
      // Size: Slightly larger at higher intensity (1: 1-2px, 10: 1-3px)
      const maxSize = 1 + (clampedIntensity / 10) * 2;
      const minSize = 1;
      
      // Speed: Faster at higher intensity (1: 0.3-0.8, 10: 1-3)
      const minSpeed = 0.2 + (clampedIntensity / 10) * 0.8;
      const maxSpeed = 0.5 + (clampedIntensity / 10) * 2.5;
      
      // Opacity: More visible at higher intensity (1: 0.3-0.6, 10: 0.6-1.0)
      const minOpacity = 0.2 + (clampedIntensity / 10) * 0.4;
      const maxOpacity = 0.5 + (clampedIntensity / 10) * 0.5;
      
      // Sway: More movement at higher intensity
      const minSwaySpeed = 0.005 + (clampedIntensity / 10) * 0.015;
      const maxSwaySpeed = 0.01 + (clampedIntensity / 10) * 0.03;
      const maxSwayAmount = 0.2 + (clampedIntensity / 10) * 0.6;

      snowflakesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * (maxSize - minSize) + minSize,
        speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
        opacity: Math.random() * (maxOpacity - minOpacity) + minOpacity,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * (maxSwaySpeed - minSwaySpeed) + minSwaySpeed,
        swayAmount: maxSwayAmount, // Store sway amount for animation
      }));
    };
    initSnowflakes();

    // Animation loop
    const animate = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      snowflakesRef.current.forEach((flake) => {
        // Update position
        flake.y += flake.speed;
        flake.sway += flake.swaySpeed;
        flake.x += Math.sin(flake.sway) * flake.swayAmount; // Intensity-based side-to-side movement

        // Reset if off screen
        if (flake.y > canvas.height) {
          flake.y = -5;
          flake.x = Math.random() * canvas.width;
        }
        if (flake.x < -5) flake.x = canvas.width + 5;
        if (flake.x > canvas.width + 5) flake.x = -5;

        // Draw snowflake
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [enabled, intensity]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
      style={{ background: 'transparent' }}
    />
  );
};

export default SnowEffect;


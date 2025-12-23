import React, { useEffect, useRef } from 'react';

interface SnowEffectProps {
  enabled: boolean;
}

interface Snowflake {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  sway: number;
  swaySpeed: number;
}

const SnowEffect: React.FC<SnowEffectProps> = ({ enabled }) => {
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

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize snowflakes
    const initSnowflakes = () => {
      const count = Math.floor((canvas.width * canvas.height) / 15000); // Adaptive count based on screen size
      snowflakesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1, // 1-4px
        speed: Math.random() * 1 + 0.5, // 0.5-1.5
        opacity: Math.random() * 0.5 + 0.5, // 0.5-1.0
        sway: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.01,
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
        flake.x += Math.sin(flake.sway) * 0.5; // Gentle side-to-side movement

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
  }, [enabled]);

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


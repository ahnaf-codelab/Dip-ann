import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

export default function InteractiveHearts() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Heart drawing helper function
    const drawHeart = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      opacity: number,
      rotation: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate((rotation * Math.PI) / 180);
      context.globalAlpha = opacity;
      context.fillStyle = color;

      context.beginPath();
      context.moveTo(0, -size / 4);
      // Beautiful parametric heart curves
      context.bezierCurveTo(size / 2, -size, size, -size / 3, 0, size);
      context.bezierCurveTo(-size, -size / 3, -size / 2, -size, 0, -size / 4);
      context.closePath();
      context.fill();
      context.restore();
    };

    // Color choices
    const pinkShades = [
      '#f43f5e', // rose-500
      '#fb7185', // rose-400
      '#fda4af', // rose-300
      '#ffe4e6', // rose-100
      '#ec4899', // pink-500
      '#f472b6', // pink-400
      '#d946ef', // fuchsia-500
    ];

    const createParticle = (x: number, y: number, isRising = false): Particle => {
      const idx = Math.floor(Math.random() * pinkShades.length);
      return {
        x,
        y,
        size: Math.random() * 15 + (isRising ? 8 : 6),
        speedX: isRising ? (Math.random() - 0.5) * 1.5 : (Math.random() - 0.5) * 3,
        speedY: isRising ? -(Math.random() * 1.5 + 0.8) : (Math.random() - 0.5) * 3,
        color: pinkShades[idx],
        opacity: 1,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
      };
    };

    // Touch/Mouse event handlers
    const handleMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;

      if (e instanceof MouseEvent) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else if (e.touches && e.touches[0]) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }

      // Add a couple particles
      for (let i = 0; i < 2; i++) {
        particles.push(createParticle(clientX, clientY, false));
      }
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove, { passive: true });

    // Periodically spawn floating background hearts rising from the bottom
    const spawnTimer = setInterval(() => {
      const xPos = Math.random() * window.innerWidth;
      const yPos = window.innerHeight + 30;
      particles.push(createParticle(xPos, yPos, true));
    }, 450);

    // Main animation loop
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Filter and progress particles
      particles = particles.filter((p) => p.opacity > 0.01);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.007; // Fade out slowly

        drawHeart(ctx, p.x, p.y, p.size, p.color, Math.max(0, p.opacity), p.rotation);
      });

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      clearInterval(spawnTimer);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40 transition-opacity duration-700"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}

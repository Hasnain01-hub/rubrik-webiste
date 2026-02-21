'use client';

import { useRef, useEffect } from 'react';

interface MicroCanvasProps {
  type: 'pulse' | 'sparkline' | 'orbit' | 'radial' | 'heatmap' | 'bar' | 'wave' | 'trigger';
  className?: string;
  color?: string;
}

export function MicroCanvas({ type, className = '', color = '#00C2FF' }: MicroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const centerX = width / 2;
    const centerY = height / 2;
    let time = 0;

    const animate = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      switch (type) {
        case 'pulse': {
          // Pulsing concentric circles
          for (let i = 0; i < 3; i++) {
            const radius = ((time + i * 0.5) % 1.5) * (Math.min(width, height) / 2);
            const alpha = 1 - (radius / (Math.min(width, height) / 2));
            ctx.strokeStyle = `${color}${Math.floor(alpha * 100).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(centerX, centerY, Math.max(0, radius), 0, Math.PI * 2);
            ctx.stroke();
          }
          // Center dot
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
          ctx.fill();
          break;
        }

        case 'sparkline': {
          // Animated sparkline
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          for (let x = 0; x < width; x++) {
            const y = centerY + Math.sin((x * 0.1) + time * 3) * (height * 0.3) +
                      Math.sin((x * 0.05) + time * 2) * (height * 0.1);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();

          // Gradient fill under line
          const gradient = ctx.createLinearGradient(0, 0, 0, height);
          gradient.addColorStop(0, `${color}30`);
          gradient.addColorStop(1, `${color}00`);
          ctx.lineTo(width, height);
          ctx.lineTo(0, height);
          ctx.fillStyle = gradient;
          ctx.fill();
          break;
        }

        case 'orbit': {
          // Orbiting particle
          const orbitRadius = Math.min(width, height) * 0.35;

          // Draw orbit path
          ctx.strokeStyle = `${color}30`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(centerX, centerY, orbitRadius, 0, Math.PI * 2);
          ctx.stroke();

          // Draw particle
          const angle = time * 2;
          const px = centerX + Math.cos(angle) * orbitRadius;
          const py = centerY + Math.sin(angle) * orbitRadius;

          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(px, py, 5, 0, Math.PI * 2);
          ctx.fill();

          // Trail
          for (let i = 1; i <= 5; i++) {
            const trailAngle = angle - i * 0.15;
            const tx = centerX + Math.cos(trailAngle) * orbitRadius;
            const ty = centerY + Math.sin(trailAngle) * orbitRadius;
            ctx.fillStyle = `${color}${Math.floor((1 - i / 5) * 100).toString(16).padStart(2, '0')}`;
            ctx.beginPath();
            ctx.arc(tx, ty, 5 - i * 0.8, 0, Math.PI * 2);
            ctx.fill();
          }

          // Center body
          ctx.fillStyle = '#FF8A3A';
          ctx.beginPath();
          ctx.arc(centerX, centerY, 6, 0, Math.PI * 2);
          ctx.fill();
          break;
        }

        case 'radial': {
          // Radial flare burst
          const numRays = 12;
          for (let i = 0; i < numRays; i++) {
            const angle = (i / numRays) * Math.PI * 2;
            const length = Math.min(width, height) * 0.3 * (0.5 + 0.5 * Math.sin(time * 3 + i));

            const gradient = ctx.createLinearGradient(
              centerX, centerY,
              centerX + Math.cos(angle) * length,
              centerY + Math.sin(angle) * length
            );
            gradient.addColorStop(0, '#FF8A3A');
            gradient.addColorStop(1, '#FF8A3A00');

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(
              centerX + Math.cos(angle) * length,
              centerY + Math.sin(angle) * length
            );
            ctx.stroke();
          }

          // Center sun
          ctx.fillStyle = '#FF8A3A';
          ctx.beginPath();
          ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
          ctx.fill();
          break;
        }

        case 'heatmap': {
          // Animated heatmap grid
          const gridSize = 6;
          const cellWidth = width / gridSize;
          const cellHeight = height / gridSize;

          for (let x = 0; x < gridSize; x++) {
            for (let y = 0; y < gridSize; y++) {
              const intensity = Math.sin(time + x * 0.5 + y * 0.3) * 0.5 + 0.5;
              const hue = 200 - intensity * 30;
              ctx.fillStyle = `hsla(${hue}, 100%, 50%, ${0.2 + intensity * 0.6})`;
              ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth - 1, cellHeight - 1);
            }
          }
          break;
        }

        case 'bar': {
          // Animated bar meter
          const barCount = 8;
          const barWidth = (width - 20) / barCount - 2;

          for (let i = 0; i < barCount; i++) {
            const barHeight = (0.3 + 0.7 * Math.sin(time * 2 + i * 0.5)) * (height - 10);
            const x = 10 + i * (barWidth + 2);
            const y = height - 5 - barHeight;

            const gradient = ctx.createLinearGradient(0, height, 0, 0);
            gradient.addColorStop(0, color);
            gradient.addColorStop(1, '#00E5FF');

            ctx.fillStyle = gradient;
            ctx.fillRect(x, y, barWidth, barHeight);
          }
          break;
        }

        case 'wave': {
          // Wave disturbance
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;

          for (let wave = 0; wave < 3; wave++) {
            ctx.globalAlpha = 1 - wave * 0.3;
            ctx.beginPath();
            for (let x = 0; x < width; x++) {
              const y = centerY +
                Math.sin((x * 0.08) + time * 2 + wave * 0.5) * (height * 0.2) *
                Math.exp(-Math.pow((x - width / 2) / (width / 3), 2));
              if (x === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.stroke();
          }
          ctx.globalAlpha = 1;
          break;
        }

        case 'trigger': {
          // Trigger pulse indicator
          const triggerLevel = 0.6;
          const currentLevel = 0.3 + Math.sin(time) * 0.4;

          // Background bar
          ctx.fillStyle = `${color}20`;
          ctx.fillRect(10, height - 15, width - 20, 10);

          // Current level
          ctx.fillStyle = currentLevel > triggerLevel ? '#FF8A3A' : color;
          ctx.fillRect(10, height - 15, (width - 20) * currentLevel, 10);

          // Trigger line
          ctx.strokeStyle = '#FF8A3A';
          ctx.lineWidth = 2;
          ctx.setLineDash([4, 2]);
          ctx.beginPath();
          ctx.moveTo(10 + (width - 20) * triggerLevel, height - 20);
          ctx.lineTo(10 + (width - 20) * triggerLevel, height - 5);
          ctx.stroke();
          ctx.setLineDash([]);

          // Flash when triggered
          if (currentLevel > triggerLevel) {
            ctx.fillStyle = `#FF8A3A${Math.floor(Math.sin(time * 10) * 30 + 30).toString(16).padStart(2, '0')}`;
            ctx.fillRect(0, 0, width, height - 20);
          }

          // Label
          ctx.fillStyle = '#ffffff80';
          ctx.font = '10px Space Mono';
          ctx.textAlign = 'right';
          ctx.fillText('TRIGGER', width - 12, height - 22);
          break;
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationRef.current);
  }, [type, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ background: 'transparent' }}
    />
  );
}

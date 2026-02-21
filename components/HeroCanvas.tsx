'use client';

import { useRef, useEffect, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vy: number;
  speed: number;
  life: number;
  maxLife: number;
  size: number;
}

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  const make = useCallback((W: number, H: number, stagger = false): Particle => {
    const lanes = 18;
    const lane = Math.floor(Math.random() * lanes);
    return {
      x: stagger ? Math.random() * W * 0.55 : -10,
      y: (H / (lanes + 2)) * (lane + 1) + (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.5) * 0.08,
      speed: 0.7 + Math.random() * 0.9,
      life: stagger ? Math.random() * 200 : 0,
      maxLife: 220 + Math.random() * 120,
      size: 0.7 + Math.random() * 1.1,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
      particlesRef.current = Array.from({ length: 110 }, () => make(W, H, true));
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let t = 0;

    const draw = () => {
      t += 0.014;
      ctx.clearRect(0, 0, W, H);

      // ── Positions ──
      // Earth: right-center
      const earthX = W * 0.62;
      const earthY = H * 0.5;
      const earthR = Math.min(W, H) * 0.22;
      const shieldR = earthR * 1.75;

      // Sun: off-canvas left, implied by glow
      const sunX = -W * 0.05;
      const sunY = H * 0.48;

      // ── Solar wind — particles stream left to right ──
      particlesRef.current.forEach((p, i) => {
        p.x += p.speed;
        p.y += p.vy;
        p.life++;

        const dx = p.x - earthX;
        const dy = p.y - earthY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Deflect around magnetosphere
        if (dist < shieldR * 1.2 && p.x < earthX + shieldR * 0.4) {
          const pressure = Math.max(0, (shieldR * 1.15 - dist) / (shieldR * 0.8));
          p.vy += (dy / (dist || 1)) * pressure * 0.22;
          p.speed = Math.max(0.3, p.speed * 0.988);
        }

        const prog = p.life / p.maxLife;
        const alpha = (prog < 0.12 ? prog / 0.12 : prog > 0.78 ? (1 - prog) / 0.22 : 1) * 0.55;

        // Color: near sun edge = amber, far out = soft cyan
        const warmth = Math.max(0, 1 - p.x / (W * 0.5));
        const hue = 200 - warmth * 175; // ~25 (amber) → 200 (cyan)
        const sat = 70 + warmth * 20;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, ${sat}%, 68%, ${alpha})`;
        ctx.fill();

        if (p.life >= p.maxLife || p.x > W + 20 || p.y < -30 || p.y > H + 30) {
          particlesRef.current[i] = make(W, H);
        }
      });

      // ── Magnetosphere bow-shock arc (sunward side) ──
      // A gentle compressed arc on the left side of Earth
      const bowDepth = shieldR * 0.85; // how far forward the bow extends
      ctx.save();
      ctx.beginPath();
      // Draw a squashed ellipse arc facing the sun
      const arcW = shieldR * 0.78;
      const arcH = shieldR * 1.3;
      const bowX = earthX - bowDepth;
      for (let a = -Math.PI * 0.72; a <= Math.PI * 0.72; a += 0.02) {
        const px = bowX + Math.cos(a) * arcW * 0.5;
        const py = earthY + Math.sin(a) * arcH;
        if (a === -Math.PI * 0.72) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      // Faint gradient stroke for the bow shock
      const bowGrad = ctx.createLinearGradient(bowX - arcW, earthY, earthX, earthY);
      bowGrad.addColorStop(0, 'rgba(0,194,255,0)');
      bowGrad.addColorStop(0.4, 'rgba(0,194,255,0.18)');
      bowGrad.addColorStop(1, 'rgba(0,194,255,0.04)');
      ctx.strokeStyle = bowGrad;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();

      // Second outer arc (magnetopause tail hinting)
      ctx.save();
      ctx.beginPath();
      const outerBow = shieldR * 1.05;
      const obX = earthX - outerBow;
      const obW = shieldR * 0.65;
      const obH = shieldR * 1.55;
      for (let a = -Math.PI * 0.6; a <= Math.PI * 0.6; a += 0.02) {
        const px = obX + Math.cos(a) * obW * 0.5;
        const py = earthY + Math.sin(a) * obH;
        if (a === -Math.PI * 0.6) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = 'rgba(0,160,240,0.07)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // ── Magnetosphere ambient fill ──
      const mfill = ctx.createRadialGradient(earthX, earthY, earthR * 1.1, earthX, earthY, shieldR * 1.3);
      mfill.addColorStop(0, 'rgba(0,170,255,0.055)');
      mfill.addColorStop(0.5, 'rgba(0,120,220,0.025)');
      mfill.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = mfill;
      ctx.beginPath();
      ctx.arc(earthX, earthY, shieldR * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // ── Earth glow ──
      const eglow = ctx.createRadialGradient(earthX, earthY, earthR * 0.8, earthX, earthY, earthR * 1.45);
      eglow.addColorStop(0, 'rgba(60,160,255,0.12)');
      eglow.addColorStop(0.5, 'rgba(40,110,220,0.06)');
      eglow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = eglow;
      ctx.beginPath();
      ctx.arc(earthX, earthY, earthR * 1.45, 0, Math.PI * 2);
      ctx.fill();

      // ── Earth body ──
      const ebody = ctx.createRadialGradient(
        earthX - earthR * 0.22, earthY - earthR * 0.25, earthR * 0.04,
        earthX, earthY, earthR
      );
      ebody.addColorStop(0, '#8DCFFF');
      ebody.addColorStop(0.3, '#3A8ED4');
      ebody.addColorStop(0.7, '#1A5499');
      ebody.addColorStop(1, '#0A2040');
      ctx.fillStyle = ebody;
      ctx.beginPath();
      ctx.arc(earthX, earthY, earthR, 0, Math.PI * 2);
      ctx.fill();

      // Soft land masses (impressionistic blobs)
      const lands = [
        { ox: -0.12, oy: -0.28, rx: 0.28, ry: 0.22 }, // North America ish
        { ox: 0.22,  oy: -0.18, rx: 0.16, ry: 0.3  }, // Europe/Africa
        { ox: -0.3,  oy: 0.2,   rx: 0.18, ry: 0.14 }, // South America
        { ox: 0.3,   oy: 0.1,   rx: 0.22, ry: 0.2  }, // Asia
      ];
      lands.forEach(({ ox, oy, rx, ry }) => {
        const lx = earthX + ox * earthR;
        const ly = earthY + oy * earthR;
        const lg = ctx.createRadialGradient(lx, ly, 0, lx, ly, earthR * rx);
        lg.addColorStop(0, 'rgba(60,160,80,0.32)');
        lg.addColorStop(0.6, 'rgba(40,110,55,0.14)');
        lg.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(lx, ly, earthR * rx, earthR * ry, 0, 0, Math.PI * 2);
        ctx.clip();
        ctx.fillStyle = lg;
        ctx.fillRect(lx - earthR * rx, ly - earthR * ry, earthR * rx * 2, earthR * ry * 2);
        ctx.restore();
      });

      // Atmosphere rim
      const atm = ctx.createRadialGradient(earthX, earthY, earthR * 0.9, earthX, earthY, earthR * 1.1);
      atm.addColorStop(0, 'rgba(100,190,255,0)');
      atm.addColorStop(0.55, 'rgba(100,190,255,0.12)');
      atm.addColorStop(1, 'rgba(60,130,255,0)');
      ctx.fillStyle = atm;
      ctx.beginPath();
      ctx.arc(earthX, earthY, earthR * 1.1, 0, Math.PI * 2);
      ctx.fill();

      // Subtle specular highlight
      ctx.save();
      ctx.beginPath();
      ctx.arc(earthX, earthY, earthR, 0, Math.PI * 2);
      ctx.clip();
      const spec = ctx.createRadialGradient(
        earthX - earthR * 0.3, earthY - earthR * 0.35, 0,
        earthX - earthR * 0.1, earthY - earthR * 0.1, earthR * 0.7
      );
      spec.addColorStop(0, 'rgba(255,255,255,0.14)');
      spec.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = spec;
      ctx.fillRect(earthX - earthR, earthY - earthR, earthR * 2, earthR * 2);
      ctx.restore();

      // ── Sun implied: soft warm glow from left edge ──
      const sunGlow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, W * 0.55);
      sunGlow.addColorStop(0, 'rgba(255,160,40,0.14)');
      sunGlow.addColorStop(0.5, 'rgba(255,100,10,0.04)');
      sunGlow.addColorStop(1, 'rgba(255,80,0,0)');
      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(sunX, sunY, W * 0.55, 0, Math.PI * 2);
      ctx.fill();

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(animRef.current);
    };
  }, [make]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ background: 'transparent' }}
    />
  );
}
"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Ambient drifting particles ─── */
function AmbientParticles() {
  const ref = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = 0,
      H = 0;
    type Dot = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      a: number;
      hue: number;
    };
    let dots: Dot[] = [];
    const mk = (): Dot => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.14,
      vy: -0.04 - Math.random() * 0.09,
      r: 0.5 + Math.random() * 0.85,
      a: 0.05 + Math.random() * 0.14,
      hue:
        Math.random() < 0.65
          ? 200 + Math.random() * 15
          : 28 + Math.random() * 18,
    });
    const resize = () => {
      const dpr = devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
      dots = Array.from({ length: 140 }, mk);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      dots.forEach((d, i) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.y < -4 || d.x < -4 || d.x > W + 4)
          dots[i] = { ...mk(), y: H + 2 };
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${d.hue},70%,62%,${d.a})`;
        ctx.fill();
      });
      animRef.current = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      ro.disconnect();
      cancelAnimationFrame(animRef.current);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

/* ─── Main illustrative canvas ─── */
function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = 0,
      H = 0;

    type P = {
      x: number;
      y: number;
      vy: number;
      spd: number;
      life: number;
      maxLife: number;
      r: number;
    };
    let stream: P[] = [];

    const mkP = (stagger = false): P => {
      const n = 22,
        lane = Math.floor(Math.random() * n);
      return {
        x: stagger ? Math.random() * W * 0.55 : -6,
        y: stagger
          ? Math.random() * H
          : (H / (n + 1)) * (lane + 1) + (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.5) * 0.09,
        spd: 0.7 + Math.random() * 0.85,
        life: stagger ? Math.random() * 200 : 0,
        maxLife: 200 + Math.random() * 110,
        r: 0.75 + Math.random() * 1.05,
      };
    };

    const resize = () => {
      const dpr = devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
      stream = Array.from({ length: 130 }, () => mkP(true));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* ── Draw Earth: detailed with continents, ocean, atmosphere ── */
    const drawEarth = (cx: number, cy: number, R: number) => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      // Deep ocean base
      const ocean = ctx.createRadialGradient(
        cx - R * 0.2,
        cy - R * 0.25,
        R * 0.1,
        cx,
        cy,
        R,
      );
      ocean.addColorStop(0, "#5BB8E8");
      ocean.addColorStop(0.3, "#2A85C8");
      ocean.addColorStop(0.65, "#1260A8");
      ocean.addColorStop(1, "#0A3870");
      ctx.fillStyle = ocean;
      ctx.fillRect(cx - R, cy - R, R * 2, R * 2);

      // ── Continent shapes (recognizable silhouettes) ──
      ctx.fillStyle = "rgba(72,148,80,0.88)";

      // North America
      ctx.save();
      ctx.translate(cx, cy);
      ctx.beginPath();
      ctx.moveTo(-R * 0.52, -R * 0.42);
      ctx.bezierCurveTo(
        -R * 0.58,
        -R * 0.28,
        -R * 0.62,
        -R * 0.1,
        -R * 0.52,
        R * 0.05,
      );
      ctx.bezierCurveTo(
        -R * 0.48,
        R * 0.18,
        -R * 0.36,
        R * 0.22,
        -R * 0.28,
        R * 0.08,
      );
      ctx.bezierCurveTo(
        -R * 0.22,
        R * 0.18,
        -R * 0.18,
        R * 0.3,
        -R * 0.24,
        R * 0.38,
      );
      ctx.bezierCurveTo(
        -R * 0.3,
        R * 0.28,
        -R * 0.42,
        R * 0.14,
        -R * 0.44,
        R * 0.02,
      );
      ctx.bezierCurveTo(
        -R * 0.54,
        -R * 0.08,
        -R * 0.62,
        -R * 0.18,
        -R * 0.58,
        -R * 0.32,
      );
      ctx.bezierCurveTo(
        -R * 0.46,
        -R * 0.38,
        -R * 0.42,
        -R * 0.45,
        -R * 0.52,
        -R * 0.42,
      );
      ctx.fill();
      ctx.restore();

      // South America
      ctx.save();
      ctx.translate(cx, cy);
      ctx.beginPath();
      ctx.moveTo(-R * 0.22, R * 0.14);
      ctx.bezierCurveTo(
        -R * 0.14,
        R * 0.1,
        -R * 0.08,
        R * 0.14,
        -R * 0.1,
        R * 0.28,
      );
      ctx.bezierCurveTo(
        -R * 0.12,
        R * 0.48,
        -R * 0.18,
        R * 0.58,
        -R * 0.22,
        R * 0.62,
      );
      ctx.bezierCurveTo(
        -R * 0.28,
        R * 0.58,
        -R * 0.34,
        R * 0.44,
        -R * 0.3,
        R * 0.28,
      );
      ctx.bezierCurveTo(
        -R * 0.28,
        R * 0.18,
        -R * 0.28,
        R * 0.12,
        -R * 0.22,
        R * 0.14,
      );
      ctx.fill();
      ctx.restore();

      // Europe + Africa (connected)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.fillStyle = "rgba(78,155,85,0.88)";
      ctx.beginPath();
      // Europe
      ctx.moveTo(R * 0.04, -R * 0.44);
      ctx.bezierCurveTo(
        R * 0.12,
        -R * 0.48,
        R * 0.22,
        -R * 0.42,
        R * 0.24,
        -R * 0.32,
      );
      ctx.bezierCurveTo(
        R * 0.28,
        -R * 0.22,
        R * 0.22,
        -R * 0.18,
        R * 0.14,
        -R * 0.2,
      );
      ctx.bezierCurveTo(
        R * 0.08,
        -R * 0.22,
        R * 0.06,
        -R * 0.18,
        R * 0.08,
        -R * 0.12,
      );
      // Africa
      ctx.bezierCurveTo(
        R * 0.16,
        -R * 0.06,
        R * 0.26,
        R * 0.02,
        R * 0.24,
        R * 0.18,
      );
      ctx.bezierCurveTo(
        R * 0.22,
        R * 0.38,
        R * 0.14,
        R * 0.54,
        R * 0.08,
        R * 0.58,
      );
      ctx.bezierCurveTo(
        R * 0.02,
        R * 0.52,
        -R * 0.04,
        R * 0.38,
        -R * 0.02,
        R * 0.22,
      );
      ctx.bezierCurveTo(
        -R * 0.04,
        R * 0.04,
        R * 0.0,
        -R * 0.1,
        R * 0.02,
        -R * 0.12,
      );
      ctx.bezierCurveTo(
        -R * 0.02,
        -R * 0.22,
        -R * 0.04,
        -R * 0.38,
        R * 0.04,
        -R * 0.44,
      );
      ctx.fill();
      ctx.restore();

      // Asia (large eastern mass)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.fillStyle = "rgba(68,145,75,0.82)";
      ctx.beginPath();
      ctx.moveTo(R * 0.28, -R * 0.52);
      ctx.bezierCurveTo(
        R * 0.44,
        -R * 0.56,
        R * 0.66,
        -R * 0.44,
        R * 0.72,
        -R * 0.28,
      );
      ctx.bezierCurveTo(
        R * 0.78,
        -R * 0.12,
        R * 0.74,
        R * 0.0,
        R * 0.64,
        R * 0.08,
      );
      ctx.bezierCurveTo(
        R * 0.72,
        R * 0.12,
        R * 0.78,
        R * 0.22,
        R * 0.72,
        R * 0.3,
      );
      ctx.bezierCurveTo(
        R * 0.62,
        R * 0.38,
        R * 0.5,
        R * 0.32,
        R * 0.44,
        R * 0.22,
      );
      ctx.bezierCurveTo(
        R * 0.36,
        R * 0.28,
        R * 0.28,
        R * 0.24,
        R * 0.24,
        R * 0.14,
      );
      ctx.bezierCurveTo(
        R * 0.18,
        R * 0.04,
        R * 0.2,
        -R * 0.08,
        R * 0.26,
        -R * 0.14,
      );
      ctx.bezierCurveTo(
        R * 0.2,
        -R * 0.24,
        R * 0.2,
        -R * 0.4,
        R * 0.28,
        -R * 0.52,
      );
      ctx.fill();
      // Australia
      ctx.beginPath();
      ctx.moveTo(R * 0.58, R * 0.38);
      ctx.bezierCurveTo(
        R * 0.66,
        R * 0.34,
        R * 0.74,
        R * 0.4,
        R * 0.72,
        R * 0.5,
      );
      ctx.bezierCurveTo(
        R * 0.7,
        R * 0.6,
        R * 0.62,
        R * 0.64,
        R * 0.56,
        R * 0.58,
      );
      ctx.bezierCurveTo(
        R * 0.5,
        R * 0.52,
        R * 0.52,
        R * 0.42,
        R * 0.58,
        R * 0.38,
      );
      ctx.fill();
      ctx.restore();

      // Ice caps
      ctx.fillStyle = "rgba(230,245,255,0.75)";
      // North pole
      ctx.save();
      ctx.translate(cx, cy);
      ctx.beginPath();
      ctx.ellipse(0, -R * 0.82, R * 0.38, R * 0.22, 0, 0, Math.PI * 2);
      ctx.fill();
      // South pole
      ctx.beginPath();
      ctx.ellipse(0, R * 0.85, R * 0.3, R * 0.16, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Ocean shimmer / depth variation
      ctx.fillStyle = "rgba(30,120,200,0.14)";
      ctx.beginPath();
      ctx.ellipse(
        cx + R * 0.15,
        cy + R * 0.2,
        R * 0.55,
        R * 0.35,
        -0.3,
        0,
        Math.PI * 2,
      );
      ctx.fill();

      ctx.restore(); // end clip

      // Atmosphere glow (outside clip)
      const atm1 = ctx.createRadialGradient(cx, cy, R * 0.92, cx, cy, R * 1.18);
      atm1.addColorStop(0, "rgba(100,195,255,0)");
      atm1.addColorStop(0.45, "rgba(100,195,255,0.18)");
      atm1.addColorStop(0.75, "rgba(60,160,255,0.09)");
      atm1.addColorStop(1, "rgba(30,120,255,0)");
      ctx.fillStyle = atm1;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.18, 0, Math.PI * 2);
      ctx.fill();

      // Thin bright limb on atmosphere
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.06, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(140,210,255,0.22)";
      ctx.lineWidth = R * 0.045;
      ctx.stroke();
      ctx.restore();

      // Specular highlight
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();
      const spec = ctx.createRadialGradient(
        cx - R * 0.32,
        cy - R * 0.36,
        0,
        cx - R * 0.1,
        cy - R * 0.1,
        R * 0.8,
      );
      spec.addColorStop(0, "rgba(255,255,255,0.18)");
      spec.addColorStop(0.5, "rgba(255,255,255,0.05)");
      spec.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = spec;
      ctx.fillRect(cx - R, cy - R, R * 2, R * 2);
      ctx.restore();
    };

    /* ── Draw Sun: detailed with granulation, flares, corona ── */
    const drawSun = (cx: number, cy: number, R: number, t: number) => {
      // Outer corona
      const corona = ctx.createRadialGradient(cx, cy, R * 0.8, cx, cy, R * 6);
      corona.addColorStop(0, "rgba(255,200,60,0.18)");
      corona.addColorStop(0.2, "rgba(255,150,30,0.1)");
      corona.addColorStop(0.5, "rgba(255,100,10,0.04)");
      corona.addColorStop(1, "rgba(255,60,0,0)");
      ctx.fillStyle = corona;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 6, 0, Math.PI * 2);
      ctx.fill();

      // Pulsing corona rings
      for (let i = 0; i < 3; i++) {
        const ph = (t * 0.45 + i / 3) % 1;
        ctx.beginPath();
        ctx.arc(cx, cy, R * (1.05 + ph * 2.4), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,160,40,${(1 - ph) * 0.14})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Solar flares (8 spikes)
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + t * 0.18;
        const len = R * (0.22 + Math.sin(t * 1.8 + i * 1.2) * 0.1);
        const x1 = cx + Math.cos(angle) * R * 0.96;
        const y1 = cy + Math.sin(angle) * R * 0.96;
        const x2 = cx + Math.cos(angle) * (R + len);
        const y2 = cy + Math.sin(angle) * (R + len);
        const fg = ctx.createLinearGradient(x1, y1, x2, y2);
        fg.addColorStop(0, "rgba(255,200,60,0.55)");
        fg.addColorStop(1, "rgba(255,130,20,0)");
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = fg;
        ctx.lineWidth = 1.5 + Math.sin(t + i) * 0.5;
        ctx.stroke();
      }

      // Sun body
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      // Base gradient
      const base = ctx.createRadialGradient(
        cx - R * 0.3,
        cy - R * 0.3,
        R * 0.05,
        cx,
        cy,
        R,
      );
      base.addColorStop(0, "#FFF5C0");
      base.addColorStop(0.25, "#FFD44A");
      base.addColorStop(0.55, "#FFA020");
      base.addColorStop(0.85, "#E86000");
      base.addColorStop(1, "#C04000");
      ctx.fillStyle = base;
      ctx.fillRect(cx - R, cy - R, R * 2, R * 2);

      // Granulation — subtle cell texture
      for (let i = 0; i < 22; i++) {
        const gx =
          cx +
          (Math.cos(i * 2.4 + t * 0.05) * 0.7 + Math.cos(i * 1.1) * 0.3) *
            R *
            0.72;
        const gy =
          cy +
          (Math.sin(i * 2.4 + t * 0.05) * 0.7 + Math.sin(i * 1.7) * 0.3) *
            R *
            0.72;
        const gr = ctx.createRadialGradient(gx, gy, 0, gx, gy, R * 0.22);
        gr.addColorStop(0, "rgba(255,230,120,0.22)");
        gr.addColorStop(0.5, "rgba(255,180,50,0.1)");
        gr.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gr;
        ctx.beginPath();
        ctx.arc(gx, gy, R * 0.22, 0, Math.PI * 2);
        ctx.fill();
      }

      // Dark sunspots (2-3)
      [
        { ox: 0.18, oy: -0.22, r: 0.1 },
        { ox: -0.25, oy: 0.14, r: 0.08 },
        { ox: 0.08, oy: 0.3, r: 0.06 },
      ].forEach(({ ox, oy, r }) => {
        const sx = cx + ox * R + Math.sin(t * 0.12 + ox * 10) * R * 0.04;
        const sy = cy + oy * R + Math.cos(t * 0.1 + oy * 10) * R * 0.03;
        // Penumbra
        const pen = ctx.createRadialGradient(sx, sy, 0, sx, sy, R * r * 1.8);
        pen.addColorStop(0, "rgba(80,20,0,0.55)");
        pen.addColorStop(0.5, "rgba(120,40,0,0.28)");
        pen.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = pen;
        ctx.beginPath();
        ctx.arc(sx, sy, R * r * 1.8, 0, Math.PI * 2);
        ctx.fill();
        // Umbra
        const umb = ctx.createRadialGradient(sx, sy, 0, sx, sy, R * r);
        umb.addColorStop(0, "rgba(30,5,0,0.75)");
        umb.addColorStop(1, "rgba(60,15,0,0.3)");
        ctx.fillStyle = umb;
        ctx.beginPath();
        ctx.arc(sx, sy, R * r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Limb darkening
      const limb = ctx.createRadialGradient(cx, cy, R * 0.4, cx, cy, R);
      limb.addColorStop(0, "rgba(0,0,0,0)");
      limb.addColorStop(0.75, "rgba(0,0,0,0.05)");
      limb.addColorStop(1, "rgba(0,0,0,0.38)");
      ctx.fillStyle = limb;
      ctx.fillRect(cx - R, cy - R, R * 2, R * 2);

      // Highlight
      const hi = ctx.createRadialGradient(
        cx - R * 0.28,
        cy - R * 0.32,
        0,
        cx - R * 0.1,
        cy - R * 0.1,
        R * 0.75,
      );
      hi.addColorStop(0, "rgba(255,255,220,0.2)");
      hi.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = hi;
      ctx.fillRect(cx - R, cy - R, R * 2, R * 2);

      ctx.restore();
    };

    /* ── Asset icon drawers ── */
    const drawSat = (cx: number, cy: number, s: number, glow: number) => {
      if (glow > 0) {
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, s * 2.2);
        g.addColorStop(0, `rgba(255,130,40,${glow * 0.22})`);
        g.addColorStop(1, "rgba(255,100,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, s * 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(0.42);
      ctx.fillStyle = "#B8D4EE";
      ctx.beginPath();
      rrect(ctx, -s * 0.3, -s * 0.2, s * 0.6, s * 0.4, s * 0.07);
      ctx.fill();
      ctx.fillStyle = "#2E7BB8";
      ctx.fillRect(-s * 0.88, -s * 0.1, s * 0.5, s * 0.2);
      ctx.fillRect(s * 0.38, -s * 0.1, s * 0.5, s * 0.2);
      ctx.strokeStyle = "rgba(90,180,230,0.6)";
      ctx.lineWidth = 0.7;
      [1, 2].forEach((j) => {
        let px = -s * 0.88 + ((s * 0.5) / 3) * j;
        ctx.beginPath();
        ctx.moveTo(px, -s * 0.1);
        ctx.lineTo(px, s * 0.1);
        ctx.stroke();
        px = s * 0.38 + ((s * 0.5) / 3) * j;
        ctx.beginPath();
        ctx.moveTo(px, -s * 0.1);
        ctx.lineTo(px, s * 0.1);
        ctx.stroke();
      });
      ctx.strokeStyle = "#A0C8E8";
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.2);
      ctx.lineTo(s * 0.14, -s * 0.48);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(s * 0.14, -s * 0.48, s * 0.055, 0, Math.PI * 2);
      ctx.fillStyle = "#78B8E8";
      ctx.fill();
      ctx.restore();
    };

    const drawTower = (cx: number, cy: number, h: number, glow: number) => {
      if (glow > 0) {
        const g = ctx.createRadialGradient(
          cx,
          cy - h * 0.4,
          0,
          cx,
          cy - h * 0.4,
          h * 1.1,
        );
        g.addColorStop(0, `rgba(255,130,40,${glow * 0.2})`);
        g.addColorStop(1, "rgba(255,100,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy - h * 0.4, h * 1.1, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.save();
      ctx.strokeStyle = "rgba(130,165,210,0.85)";
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(cx - h * 0.18, cy);
      ctx.lineTo(cx, cy - h);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx + h * 0.18, cy);
      ctx.lineTo(cx, cy - h);
      ctx.stroke();
      [0.28, 0.5, 0.7].forEach((frac) => {
        const y = cy - h * frac,
          arm = h * 0.22 * (1.1 - frac * 0.5);
        ctx.strokeStyle = "rgba(130,165,210,0.85)";
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.moveTo(cx - arm, y);
        ctx.lineTo(cx + arm, y);
        ctx.stroke();
        ctx.strokeStyle = "rgba(110,145,190,0.5)";
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(cx - arm, y);
        ctx.quadraticCurveTo(
          cx - arm * 0.4,
          y + h * 0.09,
          cx - arm * 0.1,
          y + h * 0.14,
        );
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx + arm, y);
        ctx.quadraticCurveTo(
          cx + arm * 0.4,
          y + h * 0.09,
          cx + arm * 0.1,
          y + h * 0.14,
        );
        ctx.stroke();
      });
      ctx.restore();
    };

    const drawDataCenter = (
      cx: number,
      cy: number,
      s: number,
      glow: number,
    ) => {
      if (glow > 0) {
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, s * 2.0);
        g.addColorStop(0, `rgba(255,130,40,${glow * 0.22})`);
        g.addColorStop(1, "rgba(255,100,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, s * 2.0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.save();
      const rW = s * 1.1,
        rH = s * 1.6,
        rx = cx - rW / 2,
        ry = cy - rH / 2;
      ctx.fillStyle = "rgba(40,70,110,0.7)";
      ctx.beginPath();
      rrect(ctx, rx, ry, rW, rH, s * 0.08);
      ctx.fill();
      ctx.strokeStyle = "rgba(100,160,220,0.35)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      rrect(ctx, rx, ry, rW, rH, s * 0.08);
      ctx.stroke();
      for (let u = 0; u < 5; u++) {
        const uy = ry + s * 0.14 + (u * (rH - s * 0.28)) / 5;
        const uh = (rH - s * 0.28) / 5 - s * 0.06;
        ctx.fillStyle =
          u % 2 === 0 ? "rgba(55,95,145,0.8)" : "rgba(45,80,128,0.7)";
        ctx.beginPath();
        rrect(ctx, rx + s * 0.1, uy, rW - s * 0.2, uh, s * 0.04);
        ctx.fill();
        const cols = [
          glow > 0.3 ? "#FF6B35" : "#22DD88",
          glow > 0.3 ? "#FF9520" : "#00BBFF",
        ];
        cols.forEach((col, li) => {
          ctx.beginPath();
          ctx.arc(
            rx + rW - s * 0.22 - li * s * 0.16,
            uy + uh / 2,
            s * 0.055,
            0,
            Math.PI * 2,
          );
          ctx.fillStyle = col;
          ctx.fill();
        });
      }
      ctx.font = `bold ${s * 0.26}px 'SF Mono',ui-monospace,monospace`;
      ctx.fillStyle = "rgba(100,180,255,0.55)";
      ctx.textAlign = "center";
      ctx.fillText("AI", cx, cy + rH / 2 + s * 0.32);
      ctx.restore();
    };

    let t = 0;
    const draw = () => {
      t += 0.014;
      ctx.clearRect(0, 0, W, H);

      const sunX = W * 0.08;
      const sunY = H * 0.48;
      const sunR = Math.min(W, H) * 0.11;

      const earthX = W * 0.56;
      const earthY = H * 0.5;
      const earthR = Math.min(W, H) * 0.175;
      const shieldR = earthR * 1.85;

      const orbit = shieldR * 1.42;
      const assets = [
        {
          angle: -0.62,
          draw: (x: number, y: number, g: number) =>
            drawSat(x, y, earthR * 0.32, g),
        },
        {
          angle: -1.9,
          draw: (x: number, y: number, g: number) =>
            drawTower(x, y + earthR * 0.3, earthR * 0.55, g),
        },
        {
          angle: 0.55,
          draw: (x: number, y: number, g: number) =>
            drawDataCenter(x, y, earthR * 0.3, g),
        },
      ];
      const glows = assets.map(
        (_, i) => 0.5 + 0.5 * Math.sin(t * 1.1 + i * 1.57),
      );

      // ── Solar wind particles ──
      stream.forEach((p, i) => {
        p.x += p.spd;
        p.y += p.vy;
        p.life++;
        const dx = p.x - earthX,
          dy = p.y - earthY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < shieldR * 1.15 && p.x < earthX + shieldR * 0.35) {
          const pres = Math.max(0, (shieldR * 1.1 - dist) / (shieldR * 0.72));
          p.vy += (dy / (dist || 1)) * pres * 0.25;
          p.spd = Math.max(0.22, p.spd * 0.983);
        }
        const prog = p.life / p.maxLife;
        const a =
          (prog < 0.1 ? prog / 0.1 : prog > 0.78 ? (1 - prog) / 0.22 : 1) *
          0.55;
        const w = Math.max(0, 1 - p.x / (W * 0.5));
        const hue = 200 - w * 172;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue},85%,68%,${a})`;
        ctx.fill();
        if (p.life >= p.maxLife || p.x > W + 15 || p.y < -25 || p.y > H + 25)
          stream[i] = mkP();
      });

      // ── Sun ──
      drawSun(sunX, sunY, sunR, t);

      // ── Magnetosphere ──
      const mf = ctx.createRadialGradient(
        earthX,
        earthY,
        earthR * 1.1,
        earthX,
        earthY,
        shieldR * 1.5,
      );
      mf.addColorStop(0, "rgba(0,170,255,0.05)");
      mf.addColorStop(0.5, "rgba(0,110,220,0.018)");
      mf.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = mf;
      ctx.beginPath();
      ctx.arc(earthX, earthY, shieldR * 1.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(earthX, earthY, shieldR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0,194,255,${0.14 + Math.sin(t * 1.3) * 0.05})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      [0, 1].forEach((arc) => {
        const fac = 0.82 + arc * 0.22;
        ctx.save();
        ctx.beginPath();
        const bx = earthX - shieldR * fac * 0.76,
          bW = shieldR * 0.52,
          bH = shieldR * 1.28;
        for (let a = -Math.PI * 0.68; a <= Math.PI * 0.68; a += 0.018) {
          const px = bx + Math.cos(a) * bW,
            py = earthY + Math.sin(a) * bH;
          if (a === -Math.PI * 0.68) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.strokeStyle =
          arc === 0
            ? `rgba(0,194,255,${0.13 + Math.sin(t * 1.3) * 0.04})`
            : "rgba(0,150,240,0.05)";
        ctx.lineWidth = arc === 0 ? 1.1 : 0.7;
        ctx.stroke();
        ctx.restore();
      });

      // ── Earth ──
      drawEarth(earthX, earthY, earthR);

      // ── Connector lines + Assets ──
      assets.forEach((asset, i) => {
        const ax = earthX + Math.cos(asset.angle) * orbit;
        const ay = earthY + Math.sin(asset.angle) * orbit;
        ctx.save();
        const lg = ctx.createLinearGradient(earthX, earthY, ax, ay);
        lg.addColorStop(0, "rgba(0,194,255,0)");
        lg.addColorStop(0.45, "rgba(0,194,255,0.12)");
        lg.addColorStop(1, "rgba(0,194,255,0.04)");
        ctx.strokeStyle = lg;
        ctx.lineWidth = 0.7;
        ctx.setLineDash([3, 7]);
        ctx.beginPath();
        ctx.moveTo(earthX, earthY);
        ctx.lineTo(ax, ay);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
        asset.draw(ax, ay, glows[i]);
      });

      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      ro.disconnect();
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        width: "100%",
        height: "100%",
        background: "transparent",
        display: "block",
      }}
    />
  );
}

function rrect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/* ─── Hero Section ─── */
export function Hero() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 60);
    return () => clearTimeout(t);
  }, []);
  const anim = (delay: number): React.CSSProperties => ({
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(16px)",
    transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
  });

  return (
    <section
      id="hero"
      style={{
        minHeight: "100svh",
        background: "rgb(var(--background))",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <AmbientParticles />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(var(--foreground),0.052) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: "8%",
          right: "8%",
          height: "1px",
          zIndex: 1,
          background:
            "linear-gradient(90deg,transparent,rgba(0,194,255,0.32),transparent)",
        }}
      />

      <div
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "6.5rem 2rem 4rem",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.3fr",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          {/* Copy */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}
          >
            <div style={anim(0)}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  fontSize: 10.5,
                  fontFamily:
                    "'JetBrains Mono','SF Mono',ui-monospace,monospace",
                  fontWeight: 600,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  color: "var(--accent-cyan)",
                  background: "rgba(0,194,255,0.07)",
                  border: "1px solid rgba(0,194,255,0.16)",
                  borderRadius: 100,
                  padding: "5px 13px",
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "#00C2FF",
                    flexShrink: 0,
                    animation: "dotpulse 2.4s ease-in-out infinite",
                  }}
                />
                Space weather risk platform
              </span>
            </div>
            <h1
              style={{
                ...anim(80),
                fontSize: "clamp(2rem,3.8vw,3.1rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.028em",
                color: "rgb(var(--foreground))",
                margin: 0,
              }}
            >
              Protect assets.{" "}
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(90deg,#0096CC 0%,#00C2FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Predict risk.
              </span>
              <br />
              Price confidently.
            </h1>
            <p
              style={{
                ...anim(160),
                fontSize: "1rem",
                lineHeight: 1.75,
                color: "rgb(var(--muted-foreground))",
                margin: 0,
                maxWidth: "38ch",
              }}
            >
              Space weather events threaten satellites, power grids, data
              centers, and cities. We help you monitor, trigger, and underwrite
              that risk.
            </p>
          </div>

          {/* Canvas */}
          <div style={{ ...anim(100), height: "clamp(320px,46vw,580px)" }}>
            <HeroCanvas />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dotpulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.4;transform:scale(0.75);}}
        @media(max-width:720px){.hero-grid{grid-template-columns:1fr!important;}}
      `}</style>
    </section>
  );
}

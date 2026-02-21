"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Logo from "./rubrik-logo.png";

function LogoWatermark() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const draw = () => {
      const dpr = devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, W, H);

      const S = Math.min(H * 1.1, W * 0.5);
      const cx = W - S * 0.38;
      const cy = H * 0.5;
      const half = S / 2;

      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.fillStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth = S * 0.042;
      ctx.lineCap = "square";
      ctx.lineJoin = "miter";

      // Corner brackets — top-left and bottom-right open corners
      const gap = S * 0.3;
      ctx.beginPath();
      ctx.moveTo(cx - half + gap, cy - half);
      ctx.lineTo(cx - half, cy - half);
      ctx.lineTo(cx - half, cy - half + gap);
      ctx.moveTo(cx + half - gap, cy + half);
      ctx.lineTo(cx + half, cy + half);
      ctx.lineTo(cx + half, cy + half - gap);
      ctx.stroke();

      // Two diagonal arrows across center
      const pad = S * 0.16;
      const head = S * 0.1;

      const drawArrow = (x1: number, y1: number, x2: number, y2: number) => {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        const angle = Math.atan2(y2 - y1, x2 - x1);
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(
          x2 - head * Math.cos(angle - 0.45),
          y2 - head * Math.sin(angle - 0.45),
        );
        ctx.lineTo(
          x2 - head * Math.cos(angle + 0.45),
          y2 - head * Math.sin(angle + 0.45),
        );
        ctx.closePath();
        ctx.fill();
      };

      // Top-right arrow
      drawArrow(
        cx - pad * 0.5,
        cy + pad * 0.5,
        cx + half - pad,
        cy - half + pad,
      );
      // Bottom-left arrow
      drawArrow(
        cx + pad * 0.5,
        cy - pad * 0.5,
        cx - half + pad,
        cy + half - pad,
      );
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => ro.disconnect();
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
      }}
    />
  );
}

const productLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "API Docs", href: "#" },
  { label: "Integrations", href: "#" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const scroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#080F1E",
      }}
    >
      {/* Top gradient line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0,194,255,0.22) 40%, rgba(0,194,255,0.22) 60%, transparent 100%)",
        }}
      />

      {/* Watermark */}
      <LogoWatermark />

      {/* Soft vignette over watermark */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(8,15,30,0) 0%, rgba(8,15,30,0.6) 70%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 2rem",
        }}
      >
        {/* ── Main content ── */}
        <div
          style={{
            padding: "4.5rem 0 3.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "3rem",
            flexWrap: "wrap",
          }}
        >
          {/* Brand side */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              maxWidth: 340,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Image
                src={Logo}
                alt="Rubrik"
                style={{
                  width: 38,
                  height: 38,
                  objectFit: "contain",
                  filter: "brightness(0) invert(1)",
                  opacity: 0.95,
                }}
              />
              <span
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "rgba(255,255,255,0.95)",
                }}
              >
                Rubrik
              </span>
            </div>

            <p
              style={{
                fontSize: "0.88rem",
                lineHeight: 1.72,
                color: "rgba(255,255,255,0.38)",
                margin: 0,
              }}
            >
              Space weather intelligence for insurers, reinsurers, and critical
              infrastructure operators.
            </p>

            <a
              href="mailto:contact@rubrik.space"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: "0.85rem",
                color: "rgba(0,194,255,0.8)",
                textDecoration: "none",
                width: "fit-content",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00C2FF")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(0,194,255,0.8)")
              }
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                style={{ opacity: 0.7 }}
              >
                <rect
                  x="0.75"
                  y="2.5"
                  width="11.5"
                  height="8"
                  rx="1.1"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <path
                  d="M1 3l5.5 4.2L12 3"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
              contact@rubrik.space
            </a>
          </div>

          {/* Product links */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}
          >
            <p
              style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.22)",
                margin: "0 0 0.5rem",
                fontFamily: "ui-monospace, monospace",
              }}
            >
              Product
            </p>
            {productLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scroll(e, link.href)}
                style={{
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.85)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.45)")
                }
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

        {/* ── Bottom bar ── */}
        <div
          style={{
            padding: "1.5rem 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <span
            style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.22)" }}
          >
            © {new Date().getFullYear()} Rubrik Space Intelligence
          </span>
          <div style={{ display: "flex", gap: "1.75rem" }}>
            {["Privacy Policy", "Terms", "Security"].map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  fontSize: "0.78rem",
                  color: "rgba(255,255,255,0.22)",
                  textDecoration: "none",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.55)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.22)")
                }
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          footer > div > div:first-of-type {
            flex-direction: column;
          }
        }
      `}</style>
    </footer>
  );
}

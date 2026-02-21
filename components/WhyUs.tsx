'use client';

import { useRef, useEffect, useState } from 'react';

const comparisonData = [
  {
    feature: 'Dynamic pricing updates',
    rubrik: { status: true, text: 'Real-time, event-driven' },
    traditional: { status: false, text: 'Annual or quarterly' },
    inHouse: { status: false, text: 'Resource-intensive' },
  },
  {
    feature: 'Parametric trigger structuring',
    rubrik: { status: true, text: 'Built-in, configurable' },
    traditional: { status: false, text: 'Limited or custom' },
    inHouse: { status: false, text: 'Requires expertise' },
  },
  {
    feature: 'Model granularity',
    rubrik: { status: true, text: 'Sub-hourly resolution' },
    traditional: { status: false, text: 'Daily aggregates' },
    inHouse: { status: false, text: 'Varies widely' },
  },
  {
    feature: 'Integration speed',
    rubrik: { status: true, text: 'Days, not months' },
    traditional: { status: false, text: 'Weeks to months' },
    inHouse: { status: false, text: 'Months to years' },
  },
  {
    feature: 'Contract flexibility',
    rubrik: { status: true, text: 'No long-term lock-in' },
    traditional: { status: false, text: 'Multi-year contracts' },
    inHouse: { status: true, text: 'Fully controlled' },
  },
];

function AnimatedCheck({ delay = 0 }: { delay?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimated(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!animated) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 20;
    canvas.width = size * 2;
    canvas.height = size * 2;
    ctx.scale(2, 2);

    let progress = 0;
    const animate = () => {
      ctx.clearRect(0, 0, size, size);

      // Background circle
      ctx.fillStyle = '#00C2FF20';
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2);
      ctx.fill();

      // Checkmark
      if (progress < 1) {
        progress += 0.08;
      }

      ctx.strokeStyle = '#00C2FF';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();

      const checkPath = [
        { x: 5, y: 10 },
        { x: 8, y: 13 },
        { x: 15, y: 6 },
      ];

      const totalLength = 2; // Two segments
      const currentLength = progress * totalLength;

      if (currentLength > 0) {
        ctx.moveTo(checkPath[0].x, checkPath[0].y);
        if (currentLength <= 1) {
          const t = currentLength;
          ctx.lineTo(
            checkPath[0].x + (checkPath[1].x - checkPath[0].x) * t,
            checkPath[0].y + (checkPath[1].y - checkPath[0].y) * t
          );
        } else {
          ctx.lineTo(checkPath[1].x, checkPath[1].y);
          const t = currentLength - 1;
          ctx.lineTo(
            checkPath[1].x + (checkPath[2].x - checkPath[1].x) * t,
            checkPath[1].y + (checkPath[2].y - checkPath[1].y) * t
          );
        }
        ctx.stroke();
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [animated]);

  return <canvas ref={canvasRef} className="w-5 h-5" />;
}

function StatusIndicator({ status, text, isRubrik, index }: { status: boolean; text: string; isRubrik: boolean; index: number }) {
  return (
    <div className="flex items-start gap-3">
      {status ? (
        isRubrik ? (
          <AnimatedCheck delay={index * 150} />
        ) : (
          <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
            <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )
      ) : (
        <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center">
          <svg className="w-3 h-3 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      )}
      <span className={`text-sm ${isRubrik && status ? 'text-white' : 'text-white/70'}`}>{text}</span>
    </div>
  );
}

export function WhyUs() {
  return (
    <section className="py-24 gradient-navy relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#00C2FF] opacity-5 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FF8A3A] opacity-5 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why choose <span className="text-gradient">Rubrik</span>?
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            See how we compare to traditional providers and building in-house solutions.
          </p>
        </div>

        {/* Comparison table */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="text-white/40 text-sm font-medium uppercase tracking-wider">Feature</div>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00C2FF]/20 border border-[#00C2FF]/30">
                  <span className="text-[#00C2FF] font-bold">Rubrik</span>
                </div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5">
                  <span className="text-white/60 font-medium">Traditional</span>
                </div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5">
                  <span className="text-white/60 font-medium">In-house</span>
                </div>
              </div>
            </div>

            {/* Rows */}
            {comparisonData.map((row, index) => (
              <div
                key={row.feature}
                className="grid grid-cols-4 gap-4 py-5 border-t border-white/10"
              >
                <div className="text-white font-medium">{row.feature}</div>
                <div className="flex justify-center">
                  <StatusIndicator status={row.rubrik.status} text={row.rubrik.text} isRubrik={true} index={index} />
                </div>
                <div className="flex justify-center">
                  <StatusIndicator status={row.traditional.status} text={row.traditional.text} isRubrik={false} index={index} />
                </div>
                <div className="flex justify-center">
                  <StatusIndicator status={row.inHouse.status} text={row.inHouse.text} isRubrik={false} index={index} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { MicroCanvas } from './MicroCanvas';

const models = [
  {
    title: 'Solar cycle analytics',
    description: 'Our models track the 11-year solar cycle and sub-cycle variations to forecast periods of elevated solar activity and coronal mass ejection likelihood.',
    canvas: 'radial' as const,
  },
  {
    title: 'Magnetospheric disturbance modeling',
    description: 'We map how disturbances in Earth\'s magnetic field propagate to ground-level impacts, enabling precise geographic risk assessment.',
    canvas: 'wave' as const,
  },
  {
    title: 'Radiation belt forecasting',
    description: 'Advanced particle physics models predict high-energy electron and proton fluxes that affect satellite electronics and aviation crew dosimetry.',
    canvas: 'orbit' as const,
  },
  {
    title: 'Statistical loss correlation',
    description: 'Decades of insurance loss data correlated with space weather indices reveal hidden patterns in claims frequency and severity.',
    canvas: 'sparkline' as const,
  },
  {
    title: 'Machine learning enhancement',
    description: 'Neural networks continuously calibrate physical models against real-world outcomes, improving accuracy and detecting emerging anomalies.',
    canvas: 'heatmap' as const,
  },
];

export function ModelsAndMethods() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00C2FF] opacity-[0.02] blur-[150px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left column - Intro */}
          <div className="lg:sticky lg:top-32">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#182848]/5 text-[#182848] text-sm font-medium mb-4">
              Scientific Foundation
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1220] mb-6">
              Models & Methods
            </h2>
            <p className="text-lg text-[#0B1220]/60 leading-relaxed mb-8">
              Our platform is built on decades of space physics research, translated into practical tools for financial decision-making. Each model is rigorously validated against historical data and continuously updated with real-time observations.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-[#F5F7FA]">
                <p className="mono text-3xl font-bold text-[#182848]">25+</p>
                <p className="text-sm text-[#0B1220]/60">Years of data</p>
              </div>
              <div className="p-4 rounded-xl bg-[#F5F7FA]">
                <p className="mono text-3xl font-bold text-[#182848]">99.7%</p>
                <p className="text-sm text-[#0B1220]/60">Uptime SLA</p>
              </div>
              <div className="p-4 rounded-xl bg-[#F5F7FA]">
                <p className="mono text-3xl font-bold text-[#00C2FF]">&lt;5min</p>
                <p className="text-sm text-[#0B1220]/60">Alert latency</p>
              </div>
              <div className="p-4 rounded-xl bg-[#F5F7FA]">
                <p className="mono text-3xl font-bold text-[#182848]">12</p>
                <p className="text-sm text-[#0B1220]/60">Data sources</p>
              </div>
            </div>
          </div>

          {/* Right column - Model list */}
          <div className="space-y-6">
            {models.map((model, index) => (
              <div
                key={model.title}
                className="group flex gap-5 p-5 rounded-2xl bg-[#F5F7FA] hover:bg-[#182848] transition-all duration-300"
              >
                {/* Canvas indicator */}
                <div className="w-16 h-16 flex-shrink-0 rounded-xl bg-[#182848]/5 group-hover:bg-white/10 overflow-hidden transition-colors">
                  <MicroCanvas type={model.canvas} color="#00C2FF" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="mono text-xs text-[#00C2FF] opacity-60">
                      0{index + 1}
                    </span>
                    <h3 className="font-bold text-[#0B1220] group-hover:text-white transition-colors">
                      {model.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[#0B1220]/60 group-hover:text-white/70 leading-relaxed transition-colors">
                    {model.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

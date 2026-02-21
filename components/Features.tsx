'use client';

import { MicroCanvas } from './MicroCanvas';

const features = [
  {
    title: 'Solar cycle analytics',
    description: 'Track and predict solar activity cycles to anticipate event probability windows.',
    canvas: 'radial' as const,
    color: '#FF8A3A',
  },
  {
    title: 'Magnetospheric disturbance modeling',
    description: 'Map field disturbances to ground-level impacts with high spatial precision.',
    canvas: 'wave' as const,
    color: '#00C2FF',
  },
  {
    title: 'Radiation belt forecasting',
    description: 'Forecast high-energy particle activity affecting satellite and aviation assets.',
    canvas: 'orbit' as const,
    color: '#00C2FF',
  },
  {
    title: 'Asset vulnerability scoring',
    description: 'Score individual assets based on exposure, sensitivity, and historical correlation.',
    canvas: 'heatmap' as const,
    color: '#00C2FF',
  },
  {
    title: 'Parametric trigger structuring',
    description: 'Define and monitor automated payout triggers based on environmental thresholds.',
    canvas: 'trigger' as const,
    color: '#00C2FF',
  },
  {
    title: 'Tail-risk stress testing',
    description: 'Simulate extreme scenarios to understand portfolio-level exposure and capital needs.',
    canvas: 'bar' as const,
    color: '#00C2FF',
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-[#F5F7FA] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#00C2FF]/10 text-[#00C2FF] text-sm font-medium mb-4">
            Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1220] mb-4">
            What makes us <span className="text-gradient">shine</span>
          </h2>
          <p className="text-lg text-[#0B1220]/60 max-w-2xl mx-auto">
            A comprehensive suite of tools designed for insurers, reinsurers, and risk managers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-[#E2E8F0]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Canvas visual */}
              <div className="w-full h-24 mb-6 rounded-xl bg-[#182848]/5 overflow-hidden">
                <MicroCanvas type={feature.canvas} color={feature.color} />
              </div>

              <h3 className="text-lg font-bold text-[#0B1220] mb-2 group-hover:text-[#182848] transition-colors">
                {feature.title}
              </h3>

              <p className="text-[#0B1220]/60 text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Hover indicator */}
              <div className="mt-4 flex items-center gap-2 text-[#00C2FF] opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm font-medium">Learn more</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { MicroCanvas } from "./MicroCanvas";

const explainerItems = [
  {
    icon: "pulse" as const,
    title: "Real-time alerts & decision support",
    description: "Instant, actionable notifications before events escalate.",
  },
  {
    icon: "sparkline" as const,
    title: "Predictive risk analytics",
    description:
      "Scientific models translated into risk scores and pricing signals.",
  },
  {
    icon: "orbit" as const,
    title: "API & portfolio insights",
    description:
      "Integrate outputs into underwriting workflows and dashboards.",
  },
];

export function QuickExplainer() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1220] mb-4">
            Space weather intelligence,{" "}
            <span className="text-gradient">simplified</span>
          </h2>
          <p className="text-lg text-[#0B1220]/60 max-w-2xl mx-auto">
            Our platform translates complex space environment dynamics into
            actionable insights for enterprise decision-making.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {explainerItems.map((item, index) => (
            <div
              key={item.title}
              className="group relative bg-[#F5F7FA] rounded-2xl p-8 transition-all duration-300 hover:bg-[#182848] hover:shadow-2xl hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Micro canvas */}
              <div className="w-16 h-16 mb-6 rounded-xl bg-[#182848]/5 group-hover:bg-white/10 overflow-hidden transition-colors">
                <MicroCanvas type={item.icon} color="#00C2FF" />
              </div>

              <h3 className="text-xl font-bold text-[#0B1220] group-hover:text-white mb-3 transition-colors">
                {item.title}
              </h3>

              <p className="text-[#0B1220]/60 group-hover:text-white/70 transition-colors leading-relaxed">
                {item.description}
              </p>

              {/* Corner accent */}
              <div className="absolute top-4 right-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg viewBox="0 0 32 32" className="w-full h-full">
                  <path
                    d="M8 4H28V24H22V10H8V4Z"
                    fill="#00C2FF"
                    fillOpacity="0.3"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

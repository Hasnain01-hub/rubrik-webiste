'use client';

const partnerLogos = [
  { name: 'Munich Re', initials: 'MR' },
  { name: 'Swiss Re', initials: 'SR' },
  { name: 'Lloyd\'s', initials: 'LL' },
  { name: 'AXA', initials: 'AX' },
  { name: 'Allianz', initials: 'AL' },
  { name: 'NOAA', initials: 'NO' },
];

export function Trust() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Partner logos */}
        <div className="mb-16">
          <p className="text-center text-sm text-[#0B1220]/40 uppercase tracking-wider mb-8">
            Trusted by leading insurers and space agencies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {partnerLogos.map((partner) => (
              <div
                key={partner.name}
                className="group flex items-center justify-center w-20 h-20 rounded-xl bg-[#F5F7FA] hover:bg-[#182848] transition-all duration-300 cursor-default"
                title={partner.name}
              >
                <span className="text-xl font-bold text-[#0B1220]/20 group-hover:text-white/40 transition-colors">
                  {partner.initials}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-[#F5F7FA] rounded-3xl p-8 md:p-12">
            {/* Quote mark */}
            <div className="absolute -top-4 left-8 w-12 h-12 rounded-full bg-[#00C2FF] flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            <blockquote className="text-xl md:text-2xl text-[#0B1220] leading-relaxed mb-8 pt-4">
              Rubrik transformed how we think about space weather risk. Their real-time analytics and parametric triggers have given us confidence to underwrite risks we previously avoided entirely.
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#182848] to-[#102040] flex items-center justify-center">
                <span className="text-white font-bold text-lg">JD</span>
              </div>
              <div>
                <p className="font-bold text-[#0B1220]">James Davidson</p>
                <p className="text-sm text-[#0B1220]/60">Head of Specialty Lines, Global Reinsurance Partners</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

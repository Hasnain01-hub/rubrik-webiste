"use client";

const plans = [
  {
    name: "Starter",
    description: "For teams exploring space weather risk",
    features: [
      "Real-time monitoring dashboard",
      "Basic risk scores",
      "Email alerts",
      "Standard support",
    ],
    cta: "Request demo",
    accent: false,
  },
  {
    name: "Professional",
    description: "For active underwriting teams",
    features: [
      "Everything in Starter",
      "Predictive analytics",
      "Full API access",
      "Custom alert thresholds",
      "Priority support",
    ],
    cta: "Request demo",
    accent: true,
  },
  {
    name: "Enterprise",
    description: "For portfolio-level risk management",
    features: [
      "Everything in Professional",
      "Portfolio aggregation",
      "Tail-risk stress testing",
      "Custom model calibration",
      "Dedicated SLAs",
      "On-premises option",
    ],
    cta: "Contact sales",
    accent: false,
  },
];

const CheckIcon = ({ highlight }: { highlight: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
    <circle cx="8" cy="8" r="7.5" stroke={highlight ? "#00C2FF" : "rgba(0,194,255,0.35)"} strokeWidth="1"/>
    <path d="M5 8l2.2 2.2L11 6" stroke={highlight ? "#00C2FF" : "rgba(0,194,255,0.5)"} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export function Pricing() {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="pricing"
      style={{
        padding: "7rem 0",
        background: "linear-gradient(180deg, #080F1E 0%, #0B1424 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background glows */}
      <div style={{
        position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)",
        width: 600, height: 300, borderRadius: "50%",
        background: "rgba(0,194,255,0.04)",
        filter: "blur(80px)", pointerEvents: "none",
      }} />

      {/* Top separator line */}
      <div style={{
        position: "absolute", top: 0, left: "8%", right: "8%", height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(0,194,255,0.15), transparent)",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontSize: 10.5,
            fontFamily: "'JetBrains Mono','SF Mono',ui-monospace,monospace",
            fontWeight: 600, letterSpacing: "0.13em", textTransform: "uppercase",
            color: "#0077A8",
            background: "rgba(0,194,255,0.07)",
            border: "1px solid rgba(0,194,255,0.15)",
            borderRadius: 100, padding: "5px 14px",
            marginBottom: "1.25rem",
          }}>
            Pricing
          </span>
          <h2 style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
            fontWeight: 800, letterSpacing: "-0.025em",
            color: "rgba(255,255,255,0.93)",
            margin: "0 0 1rem",
            lineHeight: 1.15,
          }}>
            Simple. Transparent. Built for scale.
          </h2>
          <p style={{
            fontSize: "1rem", lineHeight: 1.7,
            color: "rgba(255,255,255,0.42)",
            maxWidth: "44ch", margin: "0 auto",
          }}>
            No lengthy contracts, no hidden fees. One platform to assess risk,
            price coverage, and manage claims.
          </p>
        </div>

        {/* Cards */}
        <div
          className="pricing-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.25rem",
            alignItems: "stretch",
          }}
        >
          {plans.map((plan) => (
            <div
              key={plan.name}
              style={{
                position: "relative",
                borderRadius: 16,
                padding: plan.accent ? "2.25rem 2rem" : "2rem",
                display: "flex",
                flexDirection: "column",
                gap: 0,
                background: plan.accent
                  ? "linear-gradient(160deg, rgba(0,194,255,0.1) 0%, rgba(0,100,180,0.08) 100%)"
                  : "rgba(255,255,255,0.03)",
                border: plan.accent
                  ? "1px solid rgba(0,194,255,0.22)"
                  : "1px solid rgba(255,255,255,0.07)",
                boxShadow: plan.accent
                  ? "0 0 40px rgba(0,194,255,0.08), inset 0 1px 0 rgba(0,194,255,0.12)"
                  : "none",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
            >
              {/* Popular badge */}
              {/* {plan.accent && (
                <div style={{
                  position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                  background: "linear-gradient(90deg, #0070A8, #00C2FF)",
                  color: "#fff",
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "4px 14px", borderRadius: 100,
                  fontFamily: "ui-monospace, monospace",
                  whiteSpace: "nowrap",
                }}>
                  Most Popular
                </div>
              )} */}

              {/* Plan header */}
              <div style={{ marginBottom: "1.5rem" }}>
                <h3 style={{
                  fontSize: "1.2rem", fontWeight: 700,
                  color: plan.accent ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.82)",
                  margin: "0 0 0.4rem",
                  letterSpacing: "-0.015em",
                }}>
                  {plan.name}
                </h3>
                <p style={{
                  fontSize: "0.845rem", lineHeight: 1.55,
                  color: "rgba(255,255,255,0.38)",
                  margin: 0,
                }}>
                  {plan.description}
                </p>
              </div>

              {/* Divider */}
              <div style={{
                height: "1px",
                background: plan.accent ? "rgba(0,194,255,0.15)" : "rgba(255,255,255,0.06)",
                marginBottom: "1.5rem",
              }} />

              {/* Features */}
              <ul style={{
                listStyle: "none", margin: "0 0 auto", padding: 0,
                display: "flex", flexDirection: "column", gap: "0.75rem",
                flex: 1,
              }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <CheckIcon highlight={plan.accent} />
                    <span style={{
                      fontSize: "0.855rem", lineHeight: 1.5,
                      color: "rgba(255,255,255,0.58)",
                    }}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={scrollToContact}
                style={{
                  marginTop: "2rem",
                  width: "100%",
                  padding: "11px 0",
                  borderRadius: 10,
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  cursor: "pointer",
                  border: "none",
                  transition: "all 0.18s",
                  background: plan.accent
                    ? "linear-gradient(135deg, #0088CC, #00C2FF)"
                    : "transparent",
                  color: plan.accent ? "#fff" : "rgba(255,255,255,0.55)",
                  boxShadow: plan.accent ? "0 4px 16px rgba(0,194,255,0.25)" : "none",
                  outline: plan.accent ? "none" : "1px solid rgba(255,255,255,0.12)",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  if (plan.accent) {
                    el.style.boxShadow = "0 6px 24px rgba(0,194,255,0.4)";
                    el.style.transform = "translateY(-1px)";
                  } else {
                    el.style.color = "rgba(255,255,255,0.88)";
                    el.style.outline = "1px solid rgba(255,255,255,0.28)";
                    el.style.background = "rgba(255,255,255,0.05)";
                  }
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  if (plan.accent) {
                    el.style.boxShadow = "0 4px 16px rgba(0,194,255,0.25)";
                    el.style.transform = "translateY(0)";
                  } else {
                    el.style.color = "rgba(255,255,255,0.55)";
                    el.style.outline = "1px solid rgba(255,255,255,0.12)";
                    el.style.background = "transparent";
                  }
                }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p style={{
          textAlign: "center",
          marginTop: "2.5rem",
          fontSize: "0.8rem",
          color: "rgba(255,255,255,0.22)",
          lineHeight: 1.6,
        }}>
          All plans include real-time monitoring · predictive risk analytics · API access · enterprise-grade security
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pricing-grid { grid-template-columns: 1fr !important; max-width: 420px; margin: 0 auto; }
        }
        @media (min-width: 769px) and (max-width: 960px) {
          .pricing-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
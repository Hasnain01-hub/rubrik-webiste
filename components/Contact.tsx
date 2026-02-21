"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";

function SparklineStrip() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    let time = 0;

    const animate = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Draw sparkline
      ctx.strokeStyle = "rgba(0, 194, 255, 0.5)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();

      for (let x = 0; x < width; x++) {
        const y = height / 2 + Math.sin(x * 0.05 + time * 2) * (height * 0.3);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full absolute inset-0 opacity-30"
    />
  );
}

export function Contact() {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    email: "",
    useCase: "",
    preferredTime: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (submitted) {
    return (
      <section
        id="contact"
        className="py-24 bg-[#F5F7FA] relative overflow-hidden"
      >
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#00C2FF]/20 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-[#00C2FF]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-[#0B1220] mb-4">Thank you!</h2>
          <p className="text-lg text-[#0B1220]/60">
            We&apos;ll be in touch within 1 business day to schedule your demo.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="py-24 bg-[#F5F7FA] relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Info */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#182848]/5 text-[#182848] text-sm font-medium mb-4">
              Get Started
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1220] mb-6">
              Schedule your <span className="text-gradient">demo</span>
            </h2>
            <p className="text-lg text-[#0B1220]/60 leading-relaxed mb-8">
              Talk to an expert and see how Rubrik can transform your space
              weather risk management. We&apos;ll walk you through the platform,
              discuss your specific use case, and answer any questions.
            </p>

            {/* Benefits list */}
            <div className="space-y-4">
              {[
                "Live platform walkthrough",
                "Custom integration discussion",
                "Pricing tailored to your needs",
                "No obligation, no pressure",
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#00C2FF]/20 flex items-center justify-center">
                    <svg
                      className="w-3.5 h-3.5 text-[#00C2FF]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-[#0B1220]/80">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Form */}
          <div className="relative">
            <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-[#E2E8F0] overflow-hidden">
              {/* Decorative sparkline */}
              <div className="absolute top-0 left-0 right-0 h-2 overflow-hidden">
                <SparklineStrip />
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="company"
                      className="text-[#0B1220] font-medium"
                    >
                      Company
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      placeholder="Acme Insurance"
                      className="rounded-xl border-[#E2E8F0] focus:border-[#00C2FF] focus:ring-[#00C2FF] bg-[#F5F7FA]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="role"
                      className="text-[#0B1220] font-medium"
                    >
                      Role
                    </Label>
                    <Input
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      placeholder="Underwriting Manager"
                      className="rounded-xl border-[#E2E8F0] focus:border-[#00C2FF] focus:ring-[#00C2FF] bg-[#F5F7FA]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#0B1220] font-medium">
                    Work Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@company.com"
                    className="rounded-xl border-[#E2E8F0] focus:border-[#00C2FF] focus:ring-[#00C2FF] bg-[#F5F7FA]"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="useCase"
                    className="text-[#0B1220] font-medium"
                  >
                    Brief Use Case
                  </Label>
                  <Textarea
                    id="useCase"
                    name="useCase"
                    value={formData.useCase}
                    onChange={handleChange}
                    placeholder="Tell us about your space weather risk management needs..."
                    rows={3}
                    className="rounded-xl border-[#E2E8F0] focus:border-[#00C2FF] focus:ring-[#00C2FF] bg-[#F5F7FA] resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="preferredTime"
                    className="text-[#0B1220] font-medium"
                  >
                    Preferred Time{" "}
                    <span className="text-[#0B1220]/40">(optional)</span>
                  </Label>
                  <Input
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    placeholder="e.g., Tuesday mornings EST"
                    className="rounded-xl border-[#E2E8F0] focus:border-[#00C2FF] focus:ring-[#00C2FF] bg-[#F5F7FA]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#00C2FF] hover:bg-[#00A8E0] text-[#0B1220] font-semibold py-6 rounded-xl transition-all hover:shadow-glow-cyan disabled:opacity-50"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Scheduling...
                    </span>
                  ) : (
                    "Schedule demo"
                  )}
                </Button>

                <p className="text-center text-sm text-[#0B1220]/40">
                  We&apos;ll reply within 1 business day.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

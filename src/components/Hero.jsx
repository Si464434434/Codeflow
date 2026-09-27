import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { ecosystemPartners, communityImages } from "../data/community";

// ─── Animated counter ─────────────────────────────────────────────────────────
function StatCounter({ value, suffix, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTime = null;
    const duration = 1600;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <span className="text-3xl sm:text-4xl font-black text-white tabular-nums leading-none">
        {count}
        <span className="text-indigo-400">{suffix}</span>
      </span>
      <span className="text-slate-500 text-xs sm:text-sm mt-1.5 font-medium tracking-wide">
        {label}
      </span>
    </div>
  );
}

const stats = [
  { value: 500, suffix: "+", label: "Members" },
  { value: 25,  suffix: "+", label: "Events" },
  { value: 15,  suffix: "+", label: "Projects" },
  { value: 10,  suffix: "+", label: "Collaborations" },
];

// ─── Collage image card ────────────────────────────────────────────────────────
function CollageCard({ item, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 group ${className}`}
    >
      {/* Real photo (when available) or gradient placeholder */}
      {item.image ? (
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
        />
      ) : (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${item.gradient} group-hover:scale-[1.04] transition-transform duration-500`}
        />
      )}

      {/* Subtle noise overlay */}
      <div
        className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Bottom gradient for caption legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

      {/* Emoji watermark */}
      <div className="absolute inset-0 flex items-center justify-center text-[3.5rem] opacity-[0.12] select-none pointer-events-none group-hover:opacity-20 transition-opacity duration-400">
        {item.emoji}
      </div>

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
        <p className="text-white font-semibold text-xs sm:text-sm leading-snug drop-shadow">
          {item.title}
        </p>
        <p className="text-white/50 text-[10px] sm:text-xs mt-0.5 drop-shadow">
          {item.subtitle}
        </p>
      </div>

      {/* Hover glow ring */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-white/0 group-hover:ring-white/15 transition-all duration-300" />
    </motion.div>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0a0a0f] pt-16">

      {/* ── Background dot grid ── */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div
          className="absolute inset-0 opacity-[0.11]"
          style={{
            backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)",
            backgroundSize: "38px 38px",
          }}
        />
        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_40%,transparent_30%,#0a0a0f_80%)]" />
      </div>

      {/* ── Ambient glow orbs ── */}
      <div className="absolute -top-20 -left-40 w-[560px] h-[560px] rounded-full bg-indigo-700/10 blur-[110px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-cyan-700/8 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[700px] h-[160px] rounded-full bg-violet-700/8 blur-[70px] pointer-events-none" />

      {/* ── Two-column content ── */}
      <div className="container-custom relative z-10 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ════════════════ LEFT ════════════════ */}
          <div className="flex flex-col items-start">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/8 text-indigo-300 text-[11px] font-semibold uppercase tracking-widest mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse shrink-0" />
              Developer Community &nbsp;·&nbsp; Learn &nbsp;·&nbsp; Build &nbsp;·&nbsp; Connect
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-5xl sm:text-6xl xl:text-[4.5rem] font-black leading-[1.06] tracking-tight text-white mb-5"
            >
              Build. Learn.<br />
              Grow.{" "}
              <span className="gradient-text">Together.</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.27 }}
              className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8 max-w-lg"
            >
              CodeFlow is a student-led developer community where ambitious learners
              build real projects, sharpen in-demand skills, and connect with engineers,
              designers, and open-source contributors who ship meaningful work.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 mb-10"
            >
              <Link
                to="/contact"
                className="btn-primary px-7 py-3 text-base w-full sm:w-auto justify-center"
              >
                Join CodeFlow
                <ArrowRight size={17} />
              </Link>
              <Link
                to="/events"
                className="btn-secondary px-7 py-3 text-base w-full sm:w-auto justify-center"
              >
                <Calendar size={17} />
                Explore Events
              </Link>
            </motion.div>

            {/* ── Ecosystem Partners ── */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.52 }}
              className="w-full"
            >
              <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.15em] mb-3">
                Community Ecosystem
              </p>
              <div className="flex flex-wrap gap-2">
                {ecosystemPartners.map((partner, i) => (
                  <motion.a
                    key={partner.id}
                    href={partner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.58 + i * 0.06, duration: 0.35 }}
                    title={`${partner.name} — ${partner.label}`}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl border ${partner.border} ${partner.bg} hover:brightness-125 transition-all duration-200 no-underline`}
                  >
                    {/* Monogram logo */}
                    <div
                      className={`w-5 h-5 rounded-md bg-gradient-to-br ${partner.color} flex items-center justify-center shrink-0`}
                    >
                      <span className="text-white text-[7px] font-black leading-none select-none">
                        {partner.logo}
                      </span>
                    </div>
                    <div className="flex flex-col leading-none">
                      <span className={`text-[11px] font-bold ${partner.text} leading-tight`}>
                        {partner.name}
                      </span>
                      <span className="text-slate-600 text-[9px] leading-tight">
                        {partner.label}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ════════════════ RIGHT — Collage ════════════════ */}
          {/* Desktop collage — absolute positioned overlapping cards */}
          <div className="relative h-[480px] lg:h-[520px] w-full">
            {/* Large card — top-left */}
            <CollageCard
              item={communityImages[0]}
              delay={0.3}
              className="absolute top-0 left-0 w-[55%] h-[56%] rounded-2xl overflow-hidden"
            />
            {/* Medium card — top-right */}
            <CollageCard
              item={communityImages[1]}
              delay={0.42}
              className="absolute top-0 right-0 w-[42%] h-[42%] rounded-2xl overflow-hidden"
            />
            {/* Medium card — bottom-left */}
            <CollageCard
              item={communityImages[2]}
              delay={0.54}
              className="absolute bottom-0 left-0 w-[42%] h-[40%] rounded-2xl overflow-hidden"
            />
            {/* Large card — bottom-right */}
            <CollageCard
              item={communityImages[3]}
              delay={0.66}
              className="absolute bottom-0 right-0 w-[55%] h-[56%] rounded-2xl overflow-hidden"
            />

            {/* Live members floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.75, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.4, ease: "backOut" }}
              className="absolute top-[52%] left-[26%] -translate-x-1/2 z-20"
            >
              <div className="glass-strong rounded-2xl px-3 py-2 border border-green-500/30 shadow-xl shadow-black/40 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
                <span className="text-green-300 text-xs font-semibold whitespace-nowrap">
                  500+ Active Members
                </span>
              </div>
            </motion.div>

            {/* Next event floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.75, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.4, ease: "backOut" }}
              className="absolute top-[38%] right-0 z-20"
            >
              <div className="glass-strong rounded-2xl px-3 py-2 border border-indigo-500/30 shadow-xl shadow-black/40">
                <span className="text-indigo-300 text-xs font-semibold whitespace-nowrap">
                  🗓&nbsp; Next event in 5 days
                </span>
              </div>
            </motion.div>

            {/* Hackathon pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.75, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.28, duration: 0.4, ease: "backOut" }}
              className="absolute bottom-[37%] right-0 z-20"
            >
              <div className="glass-strong rounded-2xl px-3 py-2 border border-amber-500/30 shadow-xl shadow-black/40 flex items-center gap-1.5">
                <span className="text-amber-300 text-[11px] font-semibold whitespace-nowrap">
                  🏆&nbsp; HackCodeFlow 2026
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.75 }}
        className="relative z-10 border-t border-white/5 bg-[#0a0a0f]/60 backdrop-blur-sm"
      >
        <div className="container-custom py-6 sm:py-7">
          {/* Desktop: inline with dividers */}
          <div className="hidden sm:flex items-stretch justify-center divide-x divide-white/8">
            {stats.map((s) => (
              <div key={s.label} className="flex-1 flex justify-center items-center px-4 py-1">
                <StatCounter {...s} />
              </div>
            ))}
          </div>
          {/* Mobile: 2×2 grid cards */}
          <div className="grid grid-cols-2 gap-3 sm:hidden">
            {stats.map((s) => (
              <div
                key={s.label}
                className="glass rounded-xl py-4 text-center border border-white/5"
              >
                <StatCounter {...s} />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" />
    </section>
  );
}

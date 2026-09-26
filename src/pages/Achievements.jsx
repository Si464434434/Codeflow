import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Trophy, Star, Rocket, Users, GitFork, Handshake,
  Calendar, Code2, ArrowRight, CheckCircle2
} from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import StatCard from "../components/StatCard";
import { stats, milestones, hackathons, workshops, openSourceStats, partnerships } from "../data/achievements";

const iconMap = { Trophy, Star, Rocket, Users, GitFork, Handshake, Calendar, Code2 };

const milestoneColors = {
  indigo: { bg: "bg-indigo-500/15 border-indigo-500/25", icon: "text-indigo-400", dot: "bg-indigo-500" },
  amber: { bg: "bg-amber-500/15 border-amber-500/25", icon: "text-amber-400", dot: "bg-amber-500" },
  cyan: { bg: "bg-cyan-500/15 border-cyan-500/25", icon: "text-cyan-400", dot: "bg-cyan-500" },
  green: { bg: "bg-green-500/15 border-green-500/25", icon: "text-green-400", dot: "bg-green-500" },
  purple: { bg: "bg-purple-500/15 border-purple-500/25", icon: "text-purple-400", dot: "bg-purple-500" },
  rose: { bg: "bg-rose-500/15 border-rose-500/25", icon: "text-rose-400", dot: "bg-rose-500" },
};

export default function Achievements() {
  return (
    <main className="pt-16">
      {/* Page hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/20 via-[#0a0a0f] to-indigo-950/20 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #f59e0b 1px, transparent 1px)", backgroundSize: "36px 36px" }}
        />
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-6">
              <Trophy size={12} /> Achievements
            </span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-5 leading-tight">
              What we've <span className="gradient-text">built</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Three years of workshops, hackathons, open-source projects, and community — here's what CodeFlow has accomplished.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Community stats */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading eyebrow="By the numbers" title="Our" highlight="impact" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <StatCard key={s.label} {...s} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Milestones timeline */}
      <section className="section-padding bg-[#0d0d14]">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Timeline"
            title="Key"
            highlight="milestones"
            description="Every milestone is a marker of the community's effort."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {milestones.map((m, i) => {
              const colors = milestoneColors[m.color] || milestoneColors.indigo;
              const Icon = iconMap[m.icon] || Star;
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`rounded-2xl border p-6 card-hover ${colors.bg}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colors.bg}`}>
                      <Icon size={20} className={colors.icon} />
                    </div>
                    <span className={`text-xs font-black uppercase tracking-widest px-2 py-1 rounded-full ${colors.bg} ${colors.icon}`}>
                      {m.year}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-base mb-2">{m.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{m.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hackathons */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading eyebrow="Hackathons" title="HackCodeFlow" highlight="history" />
          <div className="space-y-4">
            {hackathons.map((h, i) => (
              <motion.div
                key={h.id}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-2xl border border-white/5 p-6 card-hover"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-white font-bold text-lg">{h.name}</h3>
                      <span className="text-xs text-slate-500 border border-white/10 rounded-full px-2 py-0.5">{h.date}</span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-3">
                      <span className="flex items-center gap-1.5"><Users size={13} className="text-indigo-400" />{h.participants} participants</span>
                      <span className="flex items-center gap-1.5"><Code2 size={13} className="text-indigo-400" />{h.teams} teams</span>
                      <span className="flex items-center gap-1.5"><Trophy size={13} className="text-amber-400" />Prize pool: <span className="text-white font-semibold">{h.prize}</span></span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 size={14} className="text-green-400 mt-0.5 shrink-0" />
                      <span className="text-slate-300">Winner: {h.winner}</span>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <div className="flex flex-wrap gap-1.5">
                      {h.sponsors.map((s) => (
                        <span key={s} className="px-2 py-1 rounded-lg bg-white/5 border border-white/8 text-xs text-slate-400">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshops + Open Source side by side */}
      <section className="section-padding bg-[#0d0d14]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Workshops by year */}
            <div>
              <SectionHeading eyebrow="Workshops" title="Learning" highlight="sessions" centered={false} className="mb-6" />
              <div className="space-y-3">
                {workshops.map((w, i) => (
                  <motion.div
                    key={w.year}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass rounded-xl border border-white/5 p-4"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-bold">{w.year}</span>
                      <span className="text-indigo-400 font-black text-lg">{w.count}</span>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed">{w.topic}</p>
                    <div className="mt-2 h-1 rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(w.count / 15) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Open source stats */}
            <div>
              <SectionHeading eyebrow="Open Source" title="GitHub" highlight="impact" centered={false} className="mb-6" />
              <div className="grid grid-cols-2 gap-4 mb-6">
                {openSourceStats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass rounded-xl border border-white/5 p-4 text-center"
                  >
                    <div className="text-3xl font-black text-white mb-1">{s.value}<span className="text-indigo-400">+</span></div>
                    <div className="text-slate-500 text-xs">{s.label}</div>
                  </motion.div>
                ))}
              </div>
              <a
                href="https://github.com/codeflow-community"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex"
              >
                <Github size={15} /> View GitHub Org
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Partnerships"
            title="Our"
            highlight="partners"
            description="Companies and organisations that back CodeFlow with resources, mentorship, and opportunities."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {partnerships.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass rounded-2xl border border-white/5 p-5 card-hover"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-indigo-500/20 flex items-center justify-center mb-4">
                  <Handshake size={18} className="text-indigo-400" />
                </div>
                <h3 className="text-white font-bold text-base mb-1">{p.name}</h3>
                <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-3">{p.type}</span>
                <p className="text-slate-400 text-sm leading-relaxed mb-2">{p.description}</p>
                <p className="text-slate-600 text-xs">Since {p.since}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[#0d0d14]">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <h2 className="text-4xl font-black text-white mb-4">
              Help us write the next <span className="gradient-text">chapter</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
              These milestones were built by our members. The next ones will be built by you.
            </p>
            <Link to="/contact" className="btn-primary px-8 py-3 text-base inline-flex">
              Join CodeFlow <ArrowRight size={17} />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

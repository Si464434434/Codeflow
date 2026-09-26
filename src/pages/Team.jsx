import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, ArrowRight, Link2 } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import TeamCard from "../components/TeamCard";
import { coreTeam, advisors } from "../data/team";

export default function Team() {
  return (
    <main className="pt-16">
      {/* Page hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-[#0a0a0f] to-violet-950/20 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)", backgroundSize: "36px 36px" }}
        />
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-6">
              <Users size={12} /> The People
            </span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-5 leading-tight">
              Meet the <span className="gradient-text">team</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              CodeFlow runs because of people who care deeply about building community. Here's the crew behind the curtain.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Team */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Core Team"
            title="Who runs"
            highlight="CodeFlow"
            description="Students and recent graduates who volunteer their time to build something meaningful."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {coreTeam.map((member, i) => (
              <TeamCard key={member.id} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Advisors */}
      <section className="section-padding bg-[#0d0d14]">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Advisors"
            title="Guided by"
            highlight="experience"
            description="Senior professionals and faculty who guide CodeFlow's direction and mentor our members."
          />
          <div className="grid sm:grid-cols-2 max-w-2xl mx-auto gap-5">
            {advisors.map((advisor, i) => (
              <motion.div
                key={advisor.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-2xl border border-white/5 p-6 card-hover flex gap-4"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${advisor.avatarGradient} flex items-center justify-center text-base font-black text-white shrink-0`}>
                  {advisor.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-base">{advisor.name}</h3>
                  <p className="text-indigo-400 text-xs font-semibold uppercase tracking-wide mb-2">{advisor.role}</p>
                  <p className="text-slate-400 text-sm leading-relaxed mb-3">{advisor.bio}</p>
                  {advisor.linkedin && (
                    <a
                      href={advisor.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      <Link2 size={13} className="text-indigo-400" /> LinkedIn
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-5 mb-14">
            {[
              { emoji: "🤝", title: "Community first", desc: "Every decision we make asks: does this serve our members? Our community is the product." },
              { emoji: "🚀", title: "Ship often", desc: "We believe in moving fast, learning from mistakes, and iterating. Perfect is the enemy of shipped." },
              { emoji: "🌱", title: "Grow together", desc: "Seniors help juniors. Mentors help beginners. Nobody is left to figure it out alone." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="glass rounded-2xl border border-white/5 p-6 text-center card-hover"
              >
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h3 className="text-white font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Join the team CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="relative rounded-3xl border border-indigo-500/20 overflow-hidden p-10 md:p-14 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-[#0d0d14] to-violet-600/10" />
            <div className="relative z-10">
              <h2 className="text-3xl font-black text-white mb-3">
                Want to join the team?
              </h2>
              <p className="text-slate-400 max-w-lg mx-auto mb-6">
                We open applications for new team members every semester. Start by becoming a community member and showing up.
              </p>
              <Link to="/contact" className="btn-primary inline-flex">
                Apply Now <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

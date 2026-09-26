import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpen, Hammer, Users, Network, Target, Eye,
  ArrowRight, CheckCircle2, Zap, Globe, Heart
} from "lucide-react";
import SectionHeading from "../components/SectionHeading";

const pillars = [
  {
    icon: BookOpen,
    title: "Learn",
    description:
      "Structured workshops, peer-led study circles, and curated learning paths keep you growing at every level.",
    color: "from-indigo-500 to-violet-600",
    bg: "bg-indigo-500/10 border-indigo-500/20",
    text: "text-indigo-400",
  },
  {
    icon: Hammer,
    title: "Build",
    description:
      "Contribute to live open-source projects, ship real features, and build a portfolio that actually shows your ability.",
    color: "from-cyan-500 to-teal-600",
    bg: "bg-cyan-500/10 border-cyan-500/20",
    text: "text-cyan-400",
  },
  {
    icon: Users,
    title: "Collaborate",
    description:
      "Hackathons, team sprints, and cross-discipline projects. Great things get built when developers and designers work together.",
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-500/10 border-violet-500/20",
    text: "text-violet-400",
  },
  {
    icon: Network,
    title: "Network",
    description:
      "Mentors from FAANG, startup founders, and alumni who've been where you are. Build relationships that open real doors.",
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-500/10 border-amber-500/20",
    text: "text-amber-400",
  },
];

const whyJoin = [
  "Work on real, live projects — not just toy exercises",
  "Get mentorship from engineers at top companies",
  "Build a public portfolio through open-source contributions",
  "Win hackathons and get noticed by industry sponsors",
  "Access exclusive workshops and early career opportunities",
  "Be part of a 500+ member developer network",
  "Learn collaboratively across web, ML, DevOps, and more",
  "Free membership — always",
];

const values = [
  { icon: Globe, title: "Open by Default", desc: "All our projects are open-source. Knowledge and code belong to everyone." },
  { icon: Heart, title: "Inclusive Community", desc: "Every skill level is welcome. We grow together, not in competition." },
  { icon: Zap, title: "Bias Toward Action", desc: "We ship. We iterate. We believe in learning by doing, not just reading." },
  { icon: Target, title: "Impact Over Clout", desc: "We build tools people actually use, not things that just look good on slides." },
];

const timeline = [
  { year: "2023", event: "Founded by 5 students in a college computer lab with zero budget and a lot of caffeine." },
  { year: "2023", event: "First hackathon — 80 participants, 16 teams, and our first real sponsor." },
  { year: "2024", event: "Launched GitHub org and published first 3 open-source projects." },
  { year: "2024", event: "Crossed 100 members and introduced formal chapter structure." },
  { year: "2025", event: "Signed partnerships with 3 tech companies for internships and workshops." },
  { year: "2026", event: "500+ members, national coverage, and our biggest hackathon yet." },
];

export default function About() {
  return (
    <main className="pt-16">
      {/* Page hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/30 via-[#0a0a0f] to-cyan-950/20 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)", backgroundSize: "36px 36px" }}
        />
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" /> Our Story
            </span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-5 leading-tight">
              About <span className="gradient-text">CodeFlow</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              We're a student-led developer community with one belief: the best way to learn is by building things
              that matter, alongside people who care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-6">
            {[
              {
                icon: Target,
                label: "Our Mission",
                color: "from-indigo-500 to-violet-600",
                border: "border-indigo-500/20",
                text: "To empower every student developer with the skills, projects, and connections they need to thrive in the real world — starting in college.",
                points: [
                  "Make quality tech education accessible",
                  "Build a culture of shipping and open-source",
                  "Connect students with industry mentors",
                ],
              },
              {
                icon: Eye,
                label: "Our Vision",
                color: "from-cyan-500 to-teal-600",
                border: "border-cyan-500/20",
                text: "A world where every ambitious student has a community that accelerates their growth — regardless of their background or starting point.",
                points: [
                  "Become the go-to developer community for students",
                  "Launch careers through community-built projects",
                  "Expand CodeFlow chapters across institutions",
                ],
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`glass rounded-2xl border ${item.border} p-8 card-hover`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5 shadow-lg`}>
                  <item.icon size={22} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">{item.label}</h2>
                <p className="text-slate-400 leading-relaxed mb-5">{item.text}</p>
                <ul className="space-y-2">
                  {item.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-slate-300 text-sm">
                      <CheckCircle2 size={15} className="text-indigo-400 mt-0.5 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Four pillars */}
      <section className="section-padding bg-[#0d0d14]">
        <div className="container-custom">
          <SectionHeading
            eyebrow="What we do"
            title="Four pillars of"
            highlight="CodeFlow"
            description="Everything we do falls into one of four categories. Together they form a complete path from student to developer."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-2xl border p-6 card-hover ${p.bg} flex flex-col gap-4`}
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center shadow-lg`}>
                  <p.icon size={20} className="text-white" />
                </div>
                <div>
                  <h3 className={`text-xl font-bold mb-2 ${p.text}`}>{p.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{p.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading
                eyebrow="Why join"
                title="What you get"
                highlight="as a member"
                centered={false}
                className="mb-6"
              />
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {whyJoin.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-2.5 text-slate-300 text-sm"
                  >
                    <CheckCircle2 size={15} className="text-indigo-400 mt-0.5 shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
              <div className="mt-8">
                <Link to="/contact" className="btn-primary">
                  Join CodeFlow Free <ArrowRight size={15} />
                </Link>
              </div>
            </motion.div>

            {/* Values grid */}
            <div className="grid grid-cols-2 gap-4">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="glass rounded-2xl p-5 border border-white/5 card-hover"
                >
                  <v.icon size={20} className="text-indigo-400 mb-3" />
                  <h4 className="text-white font-semibold text-sm mb-1">{v.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-[#0d0d14]">
        <div className="container-custom">
          <SectionHeading
            eyebrow="History"
            title="Our"
            highlight="journey"
            description="From five friends in a lab to a 500+ member community — here's how CodeFlow grew."
          />
          <div className="relative max-w-2xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/60 via-indigo-500/20 to-transparent" />
            <div className="space-y-6">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="flex gap-6 items-start pl-4"
                >
                  <div className="relative shrink-0">
                    <div className="w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-indigo-500/20 mt-1.5 relative z-10" />
                  </div>
                  <div className="glass rounded-xl border border-white/5 p-4 flex-1">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">{item.year}</span>
                    <p className="text-slate-300 text-sm mt-1 leading-relaxed">{item.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <h2 className="text-4xl font-black text-white mb-4">
              Be part of the <span className="gradient-text">story</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
              The best chapter of CodeFlow is still being written. Come help us write it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary px-8 py-3 text-base">
                Join Now — It's Free <ArrowRight size={17} />
              </Link>
              <Link to="/team" className="btn-secondary px-8 py-3 text-base">
                Meet the Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

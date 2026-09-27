import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, BookOpen, Hammer, Users, Network,
  Calendar, Code2, GitBranch, ChevronRight, Zap, Star
} from "lucide-react";
import Hero from "../components/Hero";
import SectionHeading from "../components/SectionHeading";
import StatCard from "../components/StatCard";
import EventCard from "../components/EventCard";
import ProjectCard from "../components/ProjectCard";
import { stats } from "../data/achievements";
import { upcomingEvents } from "../data/events";
import { projects } from "../data/projects";

const features = [
  {
    icon: BookOpen,
    title: "Learn",
    description:
      "Workshops, study circles, and peer learning sessions on the most relevant technologies — from web dev to AI/ML.",
    color: "from-indigo-500 to-violet-600",
  },
  {
    icon: Hammer,
    title: "Build",
    description:
      "Work on real, open-source community projects. Ship code, earn GitHub stars, and add meaningful work to your portfolio.",
    color: "from-cyan-500 to-teal-600",
  },
  {
    icon: Users,
    title: "Collaborate",
    description:
      "Team up across disciplines — developers, designers, and product thinkers — in hackathons and sprint weeks.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: Network,
    title: "Network",
    description:
      "Connect with alumni in top companies, get mentorship, and build relationships that last beyond college.",
    color: "from-amber-500 to-orange-600",
  },
];

const testimonials = [
  {
    name: "Meera Srinivas",
    role: "SDE Intern @ Google",
    batch: "CodeFlow 2024",
    quote:
      "CodeFlow gave me my first real project to talk about in interviews. The open-source work here is what set me apart.",
    avatar: "MS",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    name: "Aarav Khanna",
    role: "Full-Stack Developer",
    batch: "CodeFlow 2023",
    quote:
      "I went from struggling with HTML to deploying production apps — all because of the mentors and projects here.",
    avatar: "AK",
    gradient: "from-cyan-500 to-teal-600",
  },
  {
    name: "Zoya Mirza",
    role: "ML Engineer",
    batch: "CodeFlow 2025",
    quote:
      "The AI study circle is the best learning format I've experienced. Collaborative, hands-on, and genuinely fun.",
    avatar: "ZM",
    gradient: "from-rose-500 to-pink-600",
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <Hero />

      {/* ── Featured Event Banner ── */}
      <section className="bg-[#0a0a0f] py-4">
        <div className="container-custom">
          <motion.a
            href="https://hacktoberfest.com/my/fest/?id=01a06e39-fc60-6632-7cba-6b68fab89ba2"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-[#0a0a0f] px-6 py-4 hover:border-amber-500/60 transition-all duration-300 group"
          >
            {/* Left */}
            <div className="flex items-center gap-4">
              <div className="text-3xl">🎃</div>
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/15 border border-amber-500/25 px-2 py-0.5 rounded-full">
                    Official Hacktoberfest 26 Event
                  </span>
                  <span className="flex items-center gap-1 text-xs text-green-400 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Upcoming
                  </span>
                </div>
                <h3 className="text-white font-bold text-base sm:text-lg">
                  Hacktoberfest Hack Day Jabalpur
                </h3>
                <p className="text-slate-400 text-sm mt-0.5">
                  🇮🇳 SRIST, Jabalpur &nbsp;·&nbsp; October 1 &nbsp;·&nbsp; 10:00 AM – 2:00 PM
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="shrink-0">
              <span className="btn-primary text-sm px-5 py-2.5 group-hover:shadow-amber-500/20">
                Register Free
                <ArrowRight size={15} />
              </span>
            </div>
          </motion.a>
        </div>
      </section>

      {/* What is CodeFlow */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left: text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                Who we are
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-5">
                More than a club.{" "}
                <span className="gradient-text">A launchpad.</span>
              </h2>
              <p className="text-slate-400 text-base leading-relaxed mb-5">
                CodeFlow is a student-run developer community that bridges the gap between
                classroom theory and real-world engineering. We run workshops, build open-source
                tools, host hackathons, and create a space where every level of developer belongs.
              </p>
              <p className="text-slate-400 text-base leading-relaxed mb-8">
                Whether you just wrote your first <code className="text-indigo-300 font-mono text-sm bg-indigo-500/10 px-1.5 py-0.5 rounded">Hello World</code> or
                you're already contributing to major repos — CodeFlow has a place for you.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/about" className="btn-primary">
                  Learn More <ArrowRight size={15} />
                </Link>
                <Link to="/contact" className="btn-secondary">
                  Join Free
                </Link>
              </div>
            </motion.div>

            {/* Right: feature grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass rounded-2xl p-5 border border-white/5 card-hover group"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <f.icon size={18} className="text-white" />
                  </div>
                  <h3 className="text-white font-bold mb-2">{f.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{f.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events preview */}
      <section className="section-padding bg-[#0d0d14]">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Events"
            title="What's happening"
            highlight="next"
            description="From hands-on workshops to 36-hour hackathons — there's always something worth showing up for."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {upcomingEvents.slice(0, 3).map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/events" className="btn-secondary inline-flex">
              View All Events <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Projects preview */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Projects"
            title="Built by the"
            highlight="community"
            description="Real apps, real users, real impact. These are projects created by CodeFlow members — open-source and always growing."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {projects.slice(0, 3).map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/projects" className="btn-secondary inline-flex">
              Explore All Projects <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-[#0d0d14]">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Testimonials"
            title="From the"
            highlight="community"
            description="What CodeFlow members say about their journey."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-2xl border border-white/5 p-6 card-hover flex flex-col gap-4"
              >
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed flex-1 italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${t.gradient} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-slate-500 text-xs">{t.role} · {t.batch}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA banner */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden border border-indigo-500/20 p-10 md:p-16 text-center"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/15 via-[#0d0d14] to-cyan-600/10" />
            <div className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)",
                backgroundSize: "32px 32px",
                opacity: 0.06,
              }}
            />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/30">
                <Zap size={24} className="text-white" fill="currentColor" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Ready to{" "}
                <span className="gradient-text">level up?</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
                Join 500+ developers who are learning, building, and growing together.
                Membership is completely free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="btn-primary px-8 py-3 text-base">
                  Join CodeFlow Free <ArrowRight size={17} />
                </Link>
                <Link to="/projects" className="btn-secondary px-8 py-3 text-base">
                  <Code2 size={17} />
                  Browse Projects
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

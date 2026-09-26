import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Sparkles, Terminal, Code2, Braces, GitBranch } from "lucide-react";

const floatingSnippets = [
  {
    id: 1,
    code: `const dev = new CodeFlow();\ndev.learn().build().connect();`,
    lang: "js",
    position: "top-24 left-6 xl:left-16",
    delay: 0.3,
  },
  {
    id: 2,
    code: `git commit -m "ship it 🚀"`,
    lang: "bash",
    position: "top-36 right-4 xl:right-20",
    delay: 0.5,
  },
  {
    id: 3,
    code: `@tailwind base;\n@tailwind components;`,
    lang: "css",
    position: "bottom-32 left-4 xl:left-12",
    delay: 0.7,
  },
  {
    id: 4,
    code: `npm run build\n✓ Built in 340ms`,
    lang: "bash",
    position: "bottom-40 right-6 xl:right-16",
    delay: 0.4,
  },
];

const gridDots = Array.from({ length: 180 });

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f]">
      {/* Dot grid background */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #6366f1 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        {/* Radial fade overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_30%,#0a0a0f_80%)]" />
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-cyan-600/8 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full bg-violet-600/8 blur-[80px] pointer-events-none" />

      {/* Floating code snippets — hidden on mobile */}
      {floatingSnippets.map((snippet) => (
        <motion.div
          key={snippet.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: snippet.delay + 0.8, duration: 0.6 }}
          className={`absolute ${snippet.position} hidden lg:block z-10`}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 4 + snippet.id,
              repeat: Infinity,
              ease: "easeInOut",
              delay: snippet.id * 0.5,
            }}
            className="glass rounded-xl p-3 border border-indigo-500/15 shadow-lg shadow-black/30 max-w-[220px]"
          >
            <div className="flex items-center gap-1.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-rose-500/70" />
              <span className="w-2 h-2 rounded-full bg-amber-500/70" />
              <span className="w-2 h-2 rounded-full bg-green-500/70" />
              <span className="ml-1 text-xs text-slate-500 font-mono">{snippet.lang}</span>
            </div>
            <pre className="text-xs text-slate-300 font-mono leading-relaxed whitespace-pre">
              {snippet.code}
            </pre>
          </motion.div>
        </motion.div>
      ))}

      {/* Main content */}
      <div className="container-custom relative z-20 py-28 text-center">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-8"
        >
          <Sparkles size={12} className="text-indigo-400" />
          Developer Community · Est. 2023
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-6"
        >
          <span className="text-white">Build. Learn.</span>
          <br />
          <span className="text-white">Grow. </span>
          <span className="gradient-text">Together.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.55 }}
          className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
        >
          CodeFlow is a student-led developer community where you build real projects,
          sharpen your skills, and connect with passionate engineers, designers, and open-source contributors.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link to="/contact" className="btn-primary px-7 py-3 text-base">
            Join CodeFlow
            <ArrowRight size={17} />
          </Link>
          <Link to="/events" className="btn-secondary px-7 py-3 text-base">
            <Calendar size={17} />
            Explore Events
          </Link>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
        >
          {[
            { icon: Code2, value: "500+", label: "Members" },
            { icon: Calendar, value: "25+", label: "Events Hosted" },
            { icon: Braces, value: "15+", label: "Projects Built" },
            { icon: GitBranch, value: "10+", label: "Collaborations" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-2 text-slate-400">
              <Icon size={15} className="text-indigo-400 shrink-0" />
              <span className="text-white font-bold">{value}</span>
              <span className="text-sm">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" />
    </section>
  );
}

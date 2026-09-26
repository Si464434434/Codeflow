import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Filter, GitFork, Star, Users, Plus } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

const statuses = ["All", "Live", "Beta", "Active"];

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? projects : projects.filter((p) => p.status === filter);
  const totalStars = projects.reduce((s, p) => s + p.stars, 0);
  const totalContributors = projects.reduce((s, p) => s + p.contributors, 0);

  return (
    <main className="pt-16">
      {/* Page hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/20 via-[#0a0a0f] to-indigo-950/20 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #8b5cf6 1px, transparent 1px)", backgroundSize: "36px 36px" }}
        />
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-xs font-semibold uppercase tracking-widest mb-6">
              <Code2 size={12} /> Open Source Projects
            </span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-5 leading-tight">
              Built by the <span className="gradient-text">community</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
              Real products. Real users. Real impact. These are open-source projects created entirely by CodeFlow members.
            </p>
            {/* Aggregate stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2 text-slate-400">
                <Code2 size={15} className="text-violet-400" />
                <span className="text-white font-bold">{projects.length}</span> Projects
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Star size={15} className="text-amber-400" />
                <span className="text-white font-bold">{totalStars}+</span> GitHub Stars
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Users size={15} className="text-indigo-400" />
                <span className="text-white font-bold">{totalContributors}</span> Contributors
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="sticky top-16 z-30 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/5">
        <div className="container-custom py-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={14} className="text-slate-500 shrink-0" />
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  filter === s
                    ? "bg-violet-500/20 text-violet-300 border border-violet-500/40"
                    : "text-slate-400 hover:text-white border border-transparent hover:border-white/10"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="section-padding">
        <div className="container-custom">
          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Code2 size={40} className="text-slate-600 mx-auto mb-4" />
              <p className="text-slate-500 text-lg font-medium">No projects with this status.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Contribute CTA */}
      <section className="section-padding bg-[#0d0d14]">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-5">
            {/* Contribute */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass rounded-2xl border border-indigo-500/20 p-8"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center mb-5">
                <GitFork size={22} className="text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Contribute to a project</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">
                All projects are open-source. Pick an issue, write the code, and get your PR merged. Beginners welcome — many issues are labelled "good first issue".
              </p>
              <a
                href="https://github.com/codeflow-community"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <GitFork size={15} /> View GitHub Org
              </a>
            </motion.div>

            {/* Propose */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass rounded-2xl border border-cyan-500/20 p-8"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center mb-5">
                <Plus size={22} className="text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Propose a new project</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">
                Have an idea that solves a real problem? Pitch it to the community. If it gets traction, we'll form a team, set up a repo, and build it together.
              </p>
              <a
                href="mailto:projects@codeflow.dev"
                className="btn-outline-accent"
              >
                <Plus size={15} /> Pitch an Idea
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

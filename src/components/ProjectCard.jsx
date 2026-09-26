import { motion } from "framer-motion";
import { GitFork, ExternalLink, Star, Users, ArrowUpRight } from "lucide-react";

const statusStyles = {
  Live: "bg-green-500/15 text-green-300 border-green-500/25",
  Beta: "bg-amber-500/15 text-amber-300 border-amber-500/25",
  Active: "bg-blue-500/15 text-blue-300 border-blue-500/25",
  Archived: "bg-slate-500/15 text-slate-300 border-slate-500/25",
};

export default function ProjectCard({ project, index = 0 }) {
  const { name, description, tech, gradient, github, demo, status, contributors, stars } = project;
  const badgeClass = statusStyles[status] || statusStyles.Active;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glass rounded-2xl border border-white/5 overflow-hidden card-hover flex flex-col group"
    >
      {/* Gradient banner */}
      <div className={`h-32 bg-gradient-to-br ${gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        {/* Decorative circles */}
        <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/5 blur-sm" />
        <div className="absolute -bottom-8 -left-4 w-20 h-20 rounded-full bg-white/5 blur-sm" />
        {/* Project initial */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl font-black text-white/20 select-none tracking-tighter">
            {name.slice(0, 2).toUpperCase()}
          </span>
        </div>
        {/* Status badge — top right */}
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-xs font-semibold ${badgeClass}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current mr-1 opacity-70" />
            {status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Name + meta */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-white font-bold text-lg leading-tight">{name}</h3>
          <div className="flex items-center gap-2 shrink-0 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Star size={12} className="text-amber-400" />
              {stars}
            </span>
            <span className="flex items-center gap-1">
              <Users size={12} className="text-indigo-400" />
              {contributors}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 flex-1">
          {description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-slate-300 text-xs font-mono"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 pt-1">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex-1 justify-center py-2 text-xs"
              aria-label={`GitHub repository for ${name}`}
            >
              <GitFork size={14} />
              GitHub
            </a>
          )}
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex-1 justify-center py-2 text-xs"
              aria-label={`Live demo for ${name}`}
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          )}
          {!demo && !github && (
            <span className="text-xs text-slate-600 italic">Links coming soon</span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

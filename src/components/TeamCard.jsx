import { motion } from "framer-motion";
import { GitFork, Link2, Share2 } from "lucide-react";

export default function TeamCard({ member, index = 0 }) {
  const { name, role, bio, avatar, avatarGradient, github, linkedin, twitter } = member;

  const socialLinks = [
    { icon: GitFork, href: github, label: "GitHub" },
    { icon: Link2, href: linkedin, label: "LinkedIn" },
    { icon: Share2, href: twitter, label: "Twitter" },
  ].filter((s) => s.href);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="glass rounded-2xl border border-white/5 p-6 card-hover group flex flex-col items-center text-center"
    >
      {/* Avatar */}
      <div className="relative mb-4">
        <div
          className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${avatarGradient} flex items-center justify-center text-2xl font-black text-white shadow-lg group-hover:scale-105 transition-transform duration-300`}
        >
          {avatar}
        </div>
        {/* Glow ring on hover */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${avatarGradient} opacity-0 group-hover:opacity-25 blur-xl transition-opacity duration-300 -z-10`} />
      </div>

      {/* Info */}
      <h3 className="text-white font-bold text-base leading-snug mb-1">{name}</h3>
      <p className="text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
        {role}
      </p>
      <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{bio}</p>

      {/* Social links */}
      {socialLinks.length > 0 && (
        <div className="flex items-center gap-2 mt-auto">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} on ${label}`}
              className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all duration-200"
            >
              <Icon size={14} />
            </a>
          ))}
        </div>
      )}
    </motion.article>
  );
}

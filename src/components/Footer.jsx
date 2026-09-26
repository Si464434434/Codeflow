import { Link } from "react-router-dom";
import { Zap, GitFork, Share2, Link2, Globe, PlayCircle, ArrowUpRight } from "lucide-react";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Events", to: "/events" },
  { label: "Projects", to: "/projects" },
  { label: "Team", to: "/team" },
  { label: "Achievements", to: "/achievements" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

const socialLinks = [
  { icon: GitFork, label: "GitHub", href: "https://github.com/codeflow-community" },
  { icon: Share2, label: "Twitter", href: "https://twitter.com/codeflowdev" },
  { icon: Link2, label: "LinkedIn", href: "https://linkedin.com/company/codeflow-community" },
  { icon: Globe, label: "Instagram", href: "https://instagram.com/codeflowdev" },
  { icon: PlayCircle, label: "YouTube", href: "https://youtube.com/@codeflowcommunity" },
];

export default function Footer() {
  return (
    <footer className="bg-[#070710] border-t border-white/5 mt-auto">
      {/* Top section */}
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Zap size={18} className="text-white" fill="currentColor" />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                <span className="gradient-text">Code</span>
                <span className="text-white">Flow</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              A student-led developer community built for learners, builders, and open-source contributors. 
              We collaborate, create, and grow together.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.slice(0, 5).map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-slate-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Community
            </h3>
            <ul className="space-y-2">
              {quickLinks.slice(5).map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-slate-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://discord.gg/codeflow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 text-sm transition-colors duration-200 flex items-center gap-1"
                >
                  Join Discord <ArrowUpRight size={13} />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/codeflow-community"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 text-sm transition-colors duration-200 flex items-center gap-1"
                >
                  GitHub Org <ArrowUpRight size={13} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-sm">
            © 2026 CodeFlow Community. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm">
            Built with{" "}
            <span className="text-rose-400">❤️</span>
            {" "}by{" "}
            <span className="text-slate-300">CodeFlow Community</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

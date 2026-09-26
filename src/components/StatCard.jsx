import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Calendar, Code2, Handshake, Star, Trophy, Rocket, GitFork } from "lucide-react";

const iconMap = { Users, Calendar, Code2, Handshake, Star, Trophy, Rocket, Github: GitFork };

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

export default function StatCard({ label, value, suffix = "", icon, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useCountUp(value, 1600, inView);
  const Icon = iconMap[icon] || Users;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay }}
      className="glass rounded-2xl p-6 text-center card-hover border border-white/5 group"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4 group-hover:border-indigo-500/40 transition-colors duration-300">
        <Icon size={22} className="text-indigo-400" />
      </div>
      <div className="text-4xl font-bold text-white mb-1 tabular-nums">
        {count}
        <span className="text-indigo-400">{suffix}</span>
      </div>
      <div className="text-slate-400 text-sm font-medium">{label}</div>
    </motion.div>
  );
}

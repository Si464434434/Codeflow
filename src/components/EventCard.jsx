import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Users, ArrowRight, CheckCircle2 } from "lucide-react";

const typeStyles = {
  Workshop: "bg-indigo-500/15 text-indigo-300 border-indigo-500/25",
  Hackathon: "bg-cyan-500/15 text-cyan-300 border-cyan-500/25",
  Community: "bg-green-500/15 text-green-300 border-green-500/25",
  "Study Circle": "bg-purple-500/15 text-purple-300 border-purple-500/25",
  Session: "bg-yellow-500/15 text-yellow-300 border-yellow-500/25",
  Meetup: "bg-pink-500/15 text-pink-300 border-pink-500/25",
  Outreach: "bg-orange-500/15 text-orange-300 border-orange-500/25",
};

export default function EventCard({ event, index = 0, past = false }) {
  const { title, date, time, location, description, type, seats, registered } = event;
  const badgeClass = typeStyles[type] || "bg-slate-500/15 text-slate-300 border-slate-500/25";
  const fillPercent = seats ? Math.round((registered / seats) * 100) : null;
  const almostFull = fillPercent >= 80;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`glass rounded-2xl border border-white/5 overflow-hidden card-hover flex flex-col ${past ? "opacity-80" : ""}`}
    >
      {/* Top accent bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${
        type === "Hackathon" ? "from-cyan-500 to-teal-500" :
        type === "Workshop" ? "from-indigo-500 to-violet-500" :
        type === "Community" ? "from-green-500 to-emerald-500" :
        type === "Study Circle" ? "from-purple-500 to-fuchsia-500" :
        type === "Meetup" ? "from-pink-500 to-rose-500" :
        "from-slate-500 to-gray-500"
      }`} />

      <div className="p-6 flex flex-col flex-1 gap-4">
        {/* Type badge + past indicator */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-semibold ${badgeClass}`}>
            {type}
          </span>
          {past && (
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <CheckCircle2 size={13} className="text-green-500" />
              Completed
            </span>
          )}
          {!past && almostFull && (
            <span className="text-xs text-amber-400 font-medium animate-pulse">
              Almost full!
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-white font-bold text-lg leading-snug">{title}</h3>

        {/* Meta */}
        <div className="flex flex-col gap-2 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-indigo-400 shrink-0" />
            <span>{date}</span>
          </div>
          {time && (
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-indigo-400 shrink-0" />
              <span>{time}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-indigo-400 shrink-0" />
            <span>{location}</span>
          </div>
          {(seats || registered) && (
            <div className="flex items-center gap-2">
              <Users size={14} className="text-indigo-400 shrink-0" />
              <span>
                {past
                  ? `${event.attendees} attended`
                  : seats
                  ? `${registered} / ${seats} registered`
                  : `${registered} registered`}
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 flex-1">
          {description}
        </p>

        {/* Progress bar for upcoming events */}
        {!past && fillPercent !== null && (
          <div>
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>Seats filled</span>
              <span className={almostFull ? "text-amber-400" : "text-slate-400"}>{fillPercent}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${fillPercent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`h-full rounded-full ${almostFull ? "bg-amber-500" : "bg-indigo-500"}`}
              />
            </div>
          </div>
        )}

        {/* CTA */}
        {!past && (
          <button className="btn-primary w-full justify-center mt-auto">
            Register Now
            <ArrowRight size={15} />
          </button>
        )}
      </div>
    </motion.article>
  );
}

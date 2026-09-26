import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Filter } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import EventCard from "../components/EventCard";
import { upcomingEvents, pastEvents } from "../data/events";

const eventTypes = ["All", "Workshop", "Hackathon", "Community", "Study Circle", "Session", "Meetup"];

export default function Events() {
  const [filter, setFilter] = useState("All");

  const filteredPast =
    filter === "All" ? pastEvents : pastEvents.filter((e) => e.type === filter);
  const filteredUpcoming =
    filter === "All" ? upcomingEvents : upcomingEvents.filter((e) => e.type === filter);

  return (
    <main className="pt-16">
      {/* Page hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 via-[#0a0a0f] to-indigo-950/20 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #06b6d4 1px, transparent 1px)", backgroundSize: "36px 36px" }}
        />
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-6">
              <Calendar size={12} /> Events & Workshops
            </span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-5 leading-tight">
              Where <span className="gradient-text">learning</span> happens
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Workshops, hackathons, study circles, and community meetups — there's always something on the CodeFlow calendar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter bar */}
      <section className="sticky top-16 z-30 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/5">
        <div className="container-custom py-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={14} className="text-slate-500 shrink-0" />
            {eventTypes.map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  filter === type
                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40"
                    : "text-slate-400 hover:text-white border border-transparent hover:border-white/10"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Upcoming"
            title="Don't miss"
            highlight="what's next"
            description="Register early — spots fill up fast."
          />
          {filteredUpcoming.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredUpcoming.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Calendar size={40} className="text-slate-600 mx-auto mb-4" />
              <p className="text-slate-500 text-lg font-medium">No upcoming events for this filter.</p>
              <p className="text-slate-600 text-sm mt-1">Try selecting a different event type.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Past Events */}
      <section className="section-padding bg-[#0d0d14]">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Archive"
            title="Past"
            highlight="events"
            description="A look back at the workshops, hackathons, and sessions we've run."
          />
          {filteredPast.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPast.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} past />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Calendar size={40} className="text-slate-600 mx-auto mb-4" />
              <p className="text-slate-500 text-lg font-medium">No past events for this filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Propose event CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="relative rounded-3xl border border-cyan-500/20 overflow-hidden p-10 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 via-[#0d0d14] to-indigo-600/10" />
            <div className="relative z-10">
              <h2 className="text-3xl font-black text-white mb-3">
                Have an idea for an event?
              </h2>
              <p className="text-slate-400 max-w-lg mx-auto mb-6">
                We love community-proposed workshops and sessions. Pitch your idea and we'll help you make it happen.
              </p>
              <a href="mailto:events@codeflow.dev" className="btn-primary inline-flex">
                <Calendar size={16} />
                Propose an Event
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

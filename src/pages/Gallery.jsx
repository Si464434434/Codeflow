import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Images, Filter } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import GalleryCard from "../components/GalleryCard";
import { galleryItems, categories } from "../data/gallery";

export default function Gallery() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? galleryItems : galleryItems.filter((g) => g.category === active);

  return (
    <main className="pt-16">
      {/* Page hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-950/20 via-[#0a0a0f] to-indigo-950/20 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #d946ef 1px, transparent 1px)", backgroundSize: "36px 36px" }}
        />
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-400 text-xs font-semibold uppercase tracking-widest mb-6">
              <Images size={12} /> Gallery
            </span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-5 leading-tight">
              Moments from the <span className="gradient-text">community</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Hackathons, workshops, meetups, and everything in between. A visual diary of CodeFlow's journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="sticky top-16 z-30 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/5">
        <div className="container-custom py-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={14} className="text-slate-500 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  active === cat
                    ? "bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40"
                    : "text-slate-400 hover:text-white border border-transparent hover:border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[180px]"
              >
                {filtered.map((item, i) => (
                  <GalleryCard key={item.id} item={item} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <Images size={40} className="text-slate-600 mx-auto mb-4" />
                <p className="text-slate-500 text-lg font-medium">No photos for this category yet.</p>
                <p className="text-slate-600 text-sm mt-1">Check back after the next event!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Submit photos CTA */}
      <section className="section-padding bg-[#0d0d14]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="relative rounded-3xl border border-fuchsia-500/20 overflow-hidden p-10 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/10 via-[#0d0d14] to-indigo-600/10" />
            <div className="relative z-10">
              <h2 className="text-3xl font-black text-white mb-3">
                Have photos from an event?
              </h2>
              <p className="text-slate-400 max-w-lg mx-auto mb-6">
                Share your memories with the community. Submit photos from CodeFlow events and we'll add them to the gallery.
              </p>
              <a href="mailto:community@codeflow.dev" className="btn-primary inline-flex">
                <Images size={16} />
                Submit Photos
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

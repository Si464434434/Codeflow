import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Tag, ZoomIn, X } from "lucide-react";
import { useState } from "react";

export default function GalleryCard({ item, index = 0 }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { title, event, date, category, gradient, span, emoji } = item;

  return (
    <>
      <motion.article
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45, delay: index * 0.06 }}
        className={`${span} relative rounded-2xl overflow-hidden cursor-pointer group`}
        style={{ minHeight: span === "col-span-2" ? "220px" : "180px" }}
        onClick={() => setLightboxOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setLightboxOpen(true)}
        aria-label={`View photo: ${title}`}
      >
        {/* Gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
        <div className="absolute inset-0 bg-black/20" />

        {/* Decorative blobs */}
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10 blur-md" />
        <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/5 blur-md" />

        {/* Emoji */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl opacity-20 select-none pointer-events-none group-hover:opacity-30 transition-opacity duration-300">
          {emoji}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />

        {/* Zoom icon */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-8 h-8 rounded-lg bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <ZoomIn size={14} className="text-white" />
          </div>
        </div>

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent translate-y-1 group-hover:translate-y-0 opacity-90 group-hover:opacity-100 transition-all duration-300">
          <p className="text-white font-semibold text-sm leading-snug mb-1 line-clamp-2">
            {title}
          </p>
          <div className="flex items-center gap-3 text-xs text-white/60">
            <span className="flex items-center gap-1">
              <Tag size={10} />
              {category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={10} />
              {date}
            </span>
          </div>
        </div>
      </motion.article>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Large gradient image */}
              <div className={`w-full h-72 bg-gradient-to-br ${gradient} flex items-center justify-center relative`}>
                <div className="absolute inset-0 bg-black/10" />
                <span className="text-9xl">{emoji}</span>
              </div>

              {/* Info panel */}
              <div className="glass-strong p-5">
                <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
                <p className="text-indigo-400 text-sm font-medium mb-2">{event}</p>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Tag size={13} className="text-indigo-400" />
                    {category}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-indigo-400" />
                    {date}
                  </span>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                aria-label="Close lightbox"
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

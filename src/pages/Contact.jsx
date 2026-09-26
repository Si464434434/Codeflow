import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send, GitFork, Share2, Link2, Globe,
  PlayCircle, MessageCircle, Mail, MapPin,
  CheckCircle2, Zap, Users, Calendar
} from "lucide-react";
import SectionHeading from "../components/SectionHeading";

const interests = [
  "Web Development",
  "Mobile Development",
  "AI / Machine Learning",
  "DevOps & Cloud",
  "Open Source",
  "UI/UX Design",
  "Competitive Programming",
  "Blockchain & Web3",
  "Cybersecurity",
  "Just exploring",
];

const socialLinks = [
  { icon: GitFork, label: "GitHub", href: "https://github.com/codeflow-community", color: "hover:text-white" },
  { icon: Share2, label: "Twitter / X", href: "https://twitter.com/codeflowdev", color: "hover:text-sky-400" },
  { icon: Link2, label: "LinkedIn", href: "https://linkedin.com/company/codeflow-community", color: "hover:text-blue-400" },
  { icon: Globe, label: "Instagram", href: "https://instagram.com/codeflowdev", color: "hover:text-pink-400" },
  { icon: PlayCircle, label: "YouTube", href: "https://youtube.com/@codeflowcommunity", color: "hover:text-red-400" },
  { icon: MessageCircle, label: "Discord", href: "https://discord.gg/codeflow", color: "hover:text-indigo-400" },
];

const perks = [
  { icon: Users, text: "Join 500+ active members" },
  { icon: Calendar, text: "Access to all events for free" },
  { icon: Zap, text: "Early access to workshops & sprints" },
  { icon: GitFork, text: "Contribute to open-source projects" },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "", email: "", college: "", interest: "", message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Enter a valid email";
    if (!formData.interest) e.interest = "Please select an interest";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
  };

  const inputClass = (field) =>
    `w-full bg-white/5 border ${errors[field] ? "border-rose-500/60" : "border-white/10"} rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 outline-none focus:border-indigo-500/60 focus:bg-indigo-500/5 transition-all duration-200`;

  return (
    <main className="pt-16">
      {/* Page hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-[#0a0a0f] to-cyan-950/20 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)", backgroundSize: "36px 36px" }}
        />
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-6">
              <Zap size={12} /> Join the Community
            </span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-5 leading-tight">
              Let's build <span className="gradient-text">together</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Membership is free. Fill out the form below to get access to events, projects, the Discord, and everything CodeFlow has to offer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-10 items-start">
            {/* Left: Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="glass rounded-2xl border border-green-500/20 p-10 text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-green-500/15 border border-green-500/25 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 size={28} className="text-green-400" />
                  </div>
                  <h2 className="text-2xl font-black text-white mb-3">You're in! 🎉</h2>
                  <p className="text-slate-400 leading-relaxed mb-2">
                    Welcome to CodeFlow, <span className="text-white font-semibold">{formData.name}</span>!
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    We'll send a confirmation to <span className="text-indigo-400">{formData.email}</span> with
                    details on how to join the Discord and get started.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", college: "", interest: "", message: "" }); }}
                    className="btn-secondary"
                  >
                    Submit another response
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="glass rounded-2xl border border-white/5 p-8"
                >
                  <h2 className="text-xl font-bold text-white mb-6">Join CodeFlow — Free Membership</h2>
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* Name + Email */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5">
                          Full Name <span className="text-rose-400">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Arjun Sharma"
                          className={inputClass("name")}
                          autoComplete="name"
                        />
                        {errors.name && <p className="text-rose-400 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
                          Email Address <span className="text-rose-400">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="arjun@example.com"
                          className={inputClass("email")}
                          autoComplete="email"
                        />
                        {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    {/* College */}
                    <div>
                      <label htmlFor="college" className="block text-sm font-medium text-slate-300 mb-1.5">
                        College / Organisation
                      </label>
                      <input
                        id="college"
                        name="college"
                        type="text"
                        value={formData.college}
                        onChange={handleChange}
                        placeholder="IIT Bombay / Infosys / Freelancer"
                        className={inputClass("college")}
                        autoComplete="organization"
                      />
                    </div>

                    {/* Interest */}
                    <div>
                      <label htmlFor="interest" className="block text-sm font-medium text-slate-300 mb-1.5">
                        Primary Interest <span className="text-rose-400">*</span>
                      </label>
                      <select
                        id="interest"
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        className={`${inputClass("interest")} appearance-none cursor-pointer`}
                      >
                        <option value="" disabled className="bg-[#111118]">Select an area...</option>
                        {interests.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#111118]">{opt}</option>
                        ))}
                      </select>
                      {errors.interest && <p className="text-rose-400 text-xs mt-1">{errors.interest}</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1.5">
                        Anything you'd like to share?
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us why you want to join, what you're working on, or any questions you have..."
                        className={`${inputClass("message")} resize-none`}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full justify-center py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send size={17} />
                          Join CodeFlow Free
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}
            </div>

            {/* Right: Info */}
            <div className="lg:col-span-2 space-y-5">
              {/* What you get */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="glass rounded-2xl border border-indigo-500/20 p-6"
              >
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Zap size={16} className="text-indigo-400" />
                  What you get
                </h3>
                <ul className="space-y-3">
                  {perks.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-2.5 text-slate-300 text-sm">
                      <div className="w-7 h-7 rounded-lg bg-indigo-500/15 flex items-center justify-center shrink-0">
                        <Icon size={13} className="text-indigo-400" />
                      </div>
                      {text}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Contact info */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="glass rounded-2xl border border-white/5 p-6"
              >
                <h3 className="text-white font-bold mb-4">Get in touch</h3>
                <div className="space-y-3">
                  <a href="mailto:hello@codeflow.dev" className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/10 transition-colors">
                      <Mail size={14} className="text-indigo-400" />
                    </div>
                    hello@codeflow.dev
                  </a>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                      <MapPin size={14} className="text-indigo-400" />
                    </div>
                    Tech Campus, Innovation Hub
                  </div>
                </div>
              </motion.div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="glass rounded-2xl border border-white/5 p-6"
              >
                <h3 className="text-white font-bold mb-4">Find us online</h3>
                <div className="grid grid-cols-2 gap-2">
                  {socialLinks.map(({ icon: Icon, label, href, color }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 p-2.5 rounded-xl border border-white/5 text-slate-400 text-xs font-medium hover:border-white/15 hover:bg-white/5 transition-all duration-200 ${color}`}
                    >
                      <Icon size={15} />
                      {label}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-[#0d0d14]">
        <div className="container-custom max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Common" highlight="questions" />
          <div className="space-y-4">
            {[
              { q: "Is membership really free?", a: "Yes, completely. CodeFlow has always been free to join and always will be. We're a community, not a business." },
              { q: "Do I need to be a student?", a: "Nope. We welcome everyone — students, recent grads, working professionals, and career-switchers. If you love tech, you belong here." },
              { q: "What happens after I submit the form?", a: "You'll get an email with a link to our Discord server within 24 hours. That's your gateway to everything CodeFlow." },
              { q: "Can I contribute without attending events?", a: "Absolutely. Our GitHub org is always open. You can contribute to projects, review PRs, and engage in discussions entirely online." },
              { q: "How often do events happen?", a: "We run at least 2–3 events per month — mix of online and offline. Check the Events page for the current schedule." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-xl border border-white/5 p-5"
              >
                <h3 className="text-white font-semibold text-sm mb-2">{item.q}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

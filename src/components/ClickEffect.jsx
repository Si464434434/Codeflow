import { useEffect, useRef, useCallback } from "react";

// ── Tiny Web Audio click sound (no external file needed) ─────────────────────
function playClickSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();

    // Layer 1 — short sharp click
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(600, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.08);
    gain1.gain.setValueAtTime(0.18, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.08);

    // Layer 2 — subtle high tick
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.type = "square";
    osc2.frequency.setValueAtTime(1200, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.04);
    gain2.gain.setValueAtTime(0.06, ctx.currentTime);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    osc2.start(ctx.currentTime);
    osc2.stop(ctx.currentTime + 0.04);

    // Auto-close context
    setTimeout(() => ctx.close(), 300);
  } catch (_) {}
}

// ── Canvas particle burst ─────────────────────────────────────────────────────
const COLORS = [
  "#6366f1", "#818cf8", "#06b6d4", "#67e8f9",
  "#a78bfa", "#c4b5fd", "#ffffff", "#e0e7ff",
];

function spawnParticles(canvas, x, y) {
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const count = 22;
  const particles = [];

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
    const speed = 2.5 + Math.random() * 5;
    const size = 2 + Math.random() * 4;
    particles.push({
      x: x * dpr,
      y: y * dpr,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      size,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      decay: 0.035 + Math.random() * 0.025,
    });
  }

  // Spark lines
  const sparks = [];
  for (let i = 0; i < 6; i++) {
    const angle = Math.random() * Math.PI * 2;
    const len = 20 + Math.random() * 40;
    sparks.push({
      x: x * dpr, y: y * dpr,
      ex: x * dpr + Math.cos(angle) * len,
      ey: y * dpr + Math.sin(angle) * len,
      alpha: 1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    });
  }

  let frame;
  function animate() {
    // Clear only the affected area (performance)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let alive = false;

    // Draw sparks
    sparks.forEach((s) => {
      if (s.alpha <= 0) return;
      s.alpha -= 0.06;
      ctx.save();
      ctx.globalAlpha = Math.max(0, s.alpha);
      ctx.strokeStyle = s.color;
      ctx.lineWidth = 1.5 * dpr;
      ctx.shadowColor = s.color;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.ex, s.ey);
      ctx.stroke();
      ctx.restore();
      alive = true;
    });

    // Draw particles
    particles.forEach((p) => {
      if (p.alpha <= 0) return;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.12; // gravity
      p.vx *= 0.97;
      p.alpha -= p.decay;

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * dpr * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      alive = true;
    });

    if (alive) {
      frame = requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  frame = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(frame);
}

// ── Screen shake ──────────────────────────────────────────────────────────────
function shakeScreen() {
  const root = document.documentElement;
  root.style.transition = "transform 0.05s ease";

  const shakes = [
    [3, -2], [-3, 2], [2, 3], [-2, -3], [1, -1], [0, 0],
  ];
  let i = 0;
  const interval = setInterval(() => {
    if (i >= shakes.length) {
      root.style.transform = "";
      clearInterval(interval);
      return;
    }
    root.style.transform = `translate(${shakes[i][0]}px, ${shakes[i][1]}px)`;
    i++;
  }, 30);
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ClickEffect() {
  const canvasRef = useRef(null);
  const cleanupRef = useRef(null);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
  }, []);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  useEffect(() => {
    const handleClick = (e) => {
      // Don't trigger on links/buttons that navigate (optional: remove this check to trigger everywhere)
      const canvas = canvasRef.current;
      if (!canvas) return;

      const x = e.clientX;
      const y = e.clientY;

      // Sound
      playClickSound();

      // Shake
      shakeScreen();

      // Particles
      if (cleanupRef.current) cleanupRef.current();
      cleanupRef.current = spawnParticles(canvas, x, y);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      aria-hidden="true"
    />
  );
}

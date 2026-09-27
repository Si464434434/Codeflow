import { useEffect, useRef, useCallback } from "react";

// ── Web Audio click sound ─────────────────────────────────────────────────────
function playClickSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
    setTimeout(() => ctx.close(), 300);
  } catch (_) {}
}

// ── Lightning bolt generator ──────────────────────────────────────────────────
function lightningPoint(x1, y1, x2, y2, roughness, points = []) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);

  if (len < 8) {
    points.push([x1, y1], [x2, y2]);
    return points;
  }

  const offset = (Math.random() - 0.5) * roughness * len;
  const nx = mx + (-dy / len) * offset;
  const ny = my + (dx / len) * offset;

  lightningPoint(x1, y1, nx, ny, roughness * 0.95, points);
  lightningPoint(nx, ny, x2, y2, roughness * 0.95, points);
  return points;
}

function drawLightning(ctx, x1, y1, x2, y2, alpha, color, width = 1.5) {
  const points = lightningPoint(x1, y1, x2, y2, 0.45);
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.shadowColor = color;
  ctx.shadowBlur = 12;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i][0], points[i][1]);
  }
  ctx.stroke();
  ctx.restore();
}

// ── Lightning effect spawner ──────────────────────────────────────────────────
const COLORS_MAIN = ["#818cf8", "#6366f1", "#06b6d4", "#a78bfa", "#ffffff"];
const COLORS_BRANCH = ["#c4b5fd", "#67e8f9", "#e0e7ff", "#6366f1"];

function spawnLightning(canvas, cx, cy) {
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const px = cx * dpr;
  const py = cy * dpr;

  // Generate 6-10 lightning bolts from click point
  const boltCount = 6 + Math.floor(Math.random() * 5);
  const bolts = [];

  for (let i = 0; i < boltCount; i++) {
    const angle = (Math.PI * 2 * i) / boltCount + (Math.random() - 0.5) * 0.6;
    const length = (120 + Math.random() * 200) * dpr;
    const ex = px + Math.cos(angle) * length;
    const ey = py + Math.sin(angle) * length;

    // Each bolt has sub-branches
    const branches = [];
    const branchCount = 2 + Math.floor(Math.random() * 3);
    for (let b = 0; b < branchCount; b++) {
      const t = 0.3 + Math.random() * 0.5;
      const bx = px + (ex - px) * t;
      const by = py + (ey - py) * t;
      const bAngle = angle + (Math.random() - 0.5) * 1.2;
      const bLen = (40 + Math.random() * 80) * dpr;
      branches.push({
        x1: bx, y1: by,
        x2: bx + Math.cos(bAngle) * bLen,
        y2: by + Math.sin(bAngle) * bLen,
        color: COLORS_BRANCH[Math.floor(Math.random() * COLORS_BRANCH.length)],
      });
    }

    bolts.push({
      x1: px, y1: py, x2: ex, y2: ey,
      alpha: 0.9 + Math.random() * 0.1,
      color: COLORS_MAIN[Math.floor(Math.random() * COLORS_MAIN.length)],
      branches,
      flicker: 3 + Math.floor(Math.random() * 3), // flicker frames
      frame: 0,
    });
  }

  // Central glow burst
  let glowAlpha = 1;

  let animFrame;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Central glow
    if (glowAlpha > 0) {
      const grad = ctx.createRadialGradient(px, py, 0, px, py, 60 * dpr);
      grad.addColorStop(0, `rgba(99,102,241,${glowAlpha * 0.6})`);
      grad.addColorStop(0.4, `rgba(6,182,212,${glowAlpha * 0.3})`);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(px, py, 60 * dpr, 0, Math.PI * 2);
      ctx.fill();
      glowAlpha -= 0.07;
    }

    let alive = false;

    bolts.forEach((bolt) => {
      if (bolt.alpha <= 0) return;
      alive = true;
      bolt.frame++;

      // Flicker effect — skip random frames
      if (bolt.frame <= bolt.flicker && Math.random() > 0.5) {
        drawLightning(ctx, bolt.x1, bolt.y1, bolt.x2, bolt.y2, bolt.alpha, bolt.color, 2 * dpr);
        // Draw branches
        bolt.branches.forEach((br) => {
          drawLightning(ctx, br.x1, br.y1, br.x2, br.y2, bolt.alpha * 0.6, br.color, 1 * dpr);
        });
      } else if (bolt.frame > bolt.flicker) {
        drawLightning(ctx, bolt.x1, bolt.y1, bolt.x2, bolt.y2, bolt.alpha, bolt.color, 2 * dpr);
        bolt.branches.forEach((br) => {
          drawLightning(ctx, br.x1, br.y1, br.x2, br.y2, bolt.alpha * 0.6, br.color, 1 * dpr);
        });
        bolt.alpha -= 0.045;
      }
    });

    if (alive || glowAlpha > 0) {
      animFrame = requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  animFrame = requestAnimationFrame(animate);
  return () => {
    cancelAnimationFrame(animFrame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
}

// ── Screen shake ──────────────────────────────────────────────────────────────
function shakeScreen() {
  const root = document.documentElement;
  const shakes = [[4, -3], [-4, 3], [3, 4], [-2, -3], [1, -1], [0, 0]];
  let i = 0;
  const iv = setInterval(() => {
    if (i >= shakes.length) {
      root.style.transform = "";
      clearInterval(iv);
      return;
    }
    root.style.transform = `translate(${shakes[i][0]}px,${shakes[i][1]}px)`;
    i++;
  }, 28);
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
      const canvas = canvasRef.current;
      if (!canvas) return;

      playClickSound();
      shakeScreen();

      if (cleanupRef.current) cleanupRef.current();
      cleanupRef.current = spawnLightning(canvas, e.clientX, e.clientY);
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

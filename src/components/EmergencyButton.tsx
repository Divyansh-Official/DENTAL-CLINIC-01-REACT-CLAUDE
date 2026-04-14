import React from "react";
import { Phone, MessageCircle } from "lucide-react";

/*
  iOS 26 Liquid Glass — Accurate Recreation
  ==========================================
  What makes Apple's liquid glass special:

  1. BLUR STACK — backdrop-filter: blur + saturate + brightness
     Not just blur. The saturate pushes ambient colors, brightness lifts dark areas.

  2. TINTED FILL — very low opacity tint (~0.12–0.18)
     The glass barely has color on its own. The blur IS the color.

  3. SPECULAR ARC — white gradient from top-left fading to transparent
     This simulates light hitting a curved glass surface.
     Critically: it fades both toward the center AND toward the right edge.

  4. RIM LIGHT — 1px border rgba(255,255,255,0.22)
     Not a full bright border — just a delicate rim.

  5. INNER EDGE — inset box-shadow 0 1px 0 rgba(255,255,255,0.30)
     The inner top edge catches light differently than the border.

  6. BOTTOM INNER SHADOW — inset 0 -1px 0 rgba(0,0,0,0.15)
     The bottom edge catches less light — darker.

  7. DROP SHADOW — soft, large-radius, color-tinted
     Not a sharp shadow. A wide ambient bleed.

  8. PULSE — only the outer glow pulses, never the glass itself.
*/

const GLASS_BLUR = "blur(32px) saturate(2.2) brightness(1.15)";

interface GlassButtonProps {
  href: string;
  target?: string;
  rel?: string;
  ariaLabel: string;
  /** Very low opacity rgba fill — glass barely tints */
  tintColor: string;
  /** Color for outer ambient glow */
  glowColor: string;
  /** Pill or circle */
  shape: "pill" | "circle";
  className?: string;
  children: React.ReactNode;
  pulse?: boolean;
}

function LiquidGlass({
  href, target, rel, ariaLabel,
  tintColor, glowColor, shape, className = "", children, pulse,
}: GlassButtonProps) {
  const isPill = shape === "pill";

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      className={`lg-root group fixed z-[200] flex items-center justify-center select-none ${className}`}
      style={{
        /* Geometry */
        borderRadius: isPill ? 100 : "50%",
        padding: isPill ? "10px 18px" : 0,
        width: isPill ? "auto" : 50,
        height: isPill ? "auto" : 50,

        /* Layer 1 — frosted glass base */
        backdropFilter: GLASS_BLUR,
        WebkitBackdropFilter: GLASS_BLUR,
        background: tintColor,

        /* Layer 3 — rim + inner edge + bottom edge + drop shadow */
        border: "1px solid rgba(255,255,255,0.20)",
        boxShadow: [
          /* Inner top highlight — light enters from top of glass curve */
          `inset 0 1.5px 0 rgba(255,255,255,0.32)`,
          /* Inner bottom darkness — less light at base of curve */
          `inset 0 -1px 0 rgba(0,0,0,0.18)`,
          /* Outer rim reflection — very subtle 1px halo just outside border */
          `0 0 0 0.5px rgba(255,255,255,0.08)`,
          /* Colored ambient glow */
          `0 8px 40px -6px ${glowColor}`,
          /* Neutral depth shadow */
          `0 2px 12px rgba(0,0,0,0.22)`,
        ].join(", "),

        /* Transitions */
        transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, background 0.3s ease",

        /* Pulse animation on emergency only */
        animation: pulse ? "lgPulse 2.6s ease-in-out infinite" : undefined,
      }}
    >
      {/*
        Layer 2 — Specular arc highlight
        Curved white gradient that simulates light hitting convex glass.
        Fades from bright top-left → transparent bottom-right.
        This is the "glassy" look that makes it feel 3D.
      */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          background: isPill
            ? /* Pill: broad sweep from top-left */
              "linear-gradient(148deg, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0.10) 30%, rgba(255,255,255,0.02) 55%, transparent 70%)"
            : /* Circle: tighter dome at top */
              "radial-gradient(ellipse 85% 55% at 42% 18%, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.08) 45%, transparent 70%)",
          transition: "opacity 0.25s ease",
        }}
        className="opacity-100 group-hover:opacity-60"
      />

      {/*
        Hover flood — glass "wets" with a little more tint on hover.
        Very subtle — just 6% white.
      */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background: "rgba(255,255,255,0.06)",
          opacity: 0,
          pointerEvents: "none",
          transition: "opacity 0.22s ease",
        }}
        className="group-hover:opacity-100"
      />

      {/* Content — above all glass layers */}
      <span className="relative z-10 flex items-center gap-2.5">
        {children}
      </span>

      {/* Keyframes injected once via first usage */}
      {pulse && (
        <style>{`
          @keyframes lgPulse {
            0%, 100% {
              box-shadow:
                inset 0 1.5px 0 rgba(255,255,255,0.32),
                inset 0 -1px 0 rgba(0,0,0,0.18),
                0 0 0 0.5px rgba(255,255,255,0.08),
                0 8px 40px -6px ${glowColor},
                0 2px 12px rgba(0,0,0,0.22);
            }
            50% {
              box-shadow:
                inset 0 1.5px 0 rgba(255,255,255,0.32),
                inset 0 -1px 0 rgba(0,0,0,0.18),
                0 0 0 0.5px rgba(255,255,255,0.08),
                0 12px 56px -4px ${glowColor},
                0 2px 12px rgba(0,0,0,0.22),
                0 0 0 8px rgba(239,68,68,0.07);
            }
          }
          .lg-root { cursor: none; }
          .lg-root:active { transform: scale(0.94) !important; }
        `}</style>
      )}
    </a>
  );
}

/* ── Emergency Call ─────────────────────────────────── */
export function EmergencyButton() {
  return (
    <LiquidGlass
      href="tel:+919876543210"
      ariaLabel="Emergency dental call"
      /* Dark red tint — site is black, so this reads as urgent glass */
      tintColor="rgba(200, 30, 30, 0.48)"
      glowColor="rgba(239, 68, 68, 0.50)"
      shape="pill"
      className="bottom-6 right-6"
      pulse
    >
      {/* Icon wrapped in its own tiny glass bubble */}
      <span
        style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.14)",
          border: "1px solid rgba(255,255,255,0.20)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25)",
        }}
      >
        <Phone size={11} color="#fff" strokeWidth={2.5} />
      </span>
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.05em",
          color: "#ffffff",
          textShadow: "0 1px 4px rgba(0,0,0,0.35)",
          fontFamily: "Poppins, sans-serif",
          whiteSpace: "nowrap",
        }}
      >
        Emergency? Call Now
      </span>
    </LiquidGlass>
  );
}

/* ── WhatsApp ────────────────────────────────────────── */
export function WhatsAppButton() {
  return (
    <LiquidGlass
      href="https://wa.me/919876543210"
      target="_blank"
      rel="noopener noreferrer"
      ariaLabel="Chat on WhatsApp"
      /* Muted green tint — recognisable but refined */
      tintColor="rgba(16, 124, 70, 0.50)"
      glowColor="rgba(37, 211, 102, 0.38)"
      shape="circle"
      className="bottom-[76px] right-6"
    >
      <MessageCircle size={19} color="#fff" strokeWidth={2} />
    </LiquidGlass>
  );
}
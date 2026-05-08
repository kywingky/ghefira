import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import portrait1 from "@/assets/portrait-1.jpg";
import portrait2 from "@/assets/portrait-2.jpg";
import meadow from "@/assets/friends-meadow.jpg";
import dance from "@/assets/friends-dance.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

/* ---------- Decorative pieces ---------- */

function Bow({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 200 140"
      className={className}
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      <g fill="none" stroke="var(--cream)" strokeWidth="3" strokeLinecap="round">
        {/* left loop */}
        <path d="M100 70 C 60 30, 20 40, 30 70 C 40 100, 80 95, 100 70 Z" fill="var(--cream)" />
        {/* right loop */}
        <path d="M100 70 C 140 30, 180 40, 170 70 C 160 100, 120 95, 100 70 Z" fill="var(--cream)" />
        {/* knot */}
        <ellipse cx="100" cy="70" rx="10" ry="14" fill="var(--cream)" />
        {/* tails */}
        <path d="M92 82 C 80 110, 70 125, 75 138" />
        <path d="M108 82 C 120 110, 130 125, 125 138" />
        <path d="M82 130 L 70 138 L 78 138 Z" fill="var(--cream)" />
        <path d="M118 130 L 130 138 L 122 138 Z" fill="var(--cream)" />
      </g>
    </svg>
  );
}

function Stamp({
  src,
  alt,
  className = "",
  innerClass = "",
}: {
  src: string;
  alt: string;
  className?: string;
  innerClass?: string;
}) {
  // Scalloped edge ONLY on the outer border (not across the photo)
  const edgeMask = [
    "radial-gradient(circle 6px at 6px 50%, transparent 5.5px, #000 6px) left/12px 14px repeat-y",
    "radial-gradient(circle 6px at calc(100% - 6px) 50%, transparent 5.5px, #000 6px) right/12px 14px repeat-y",
    "radial-gradient(circle 6px at 50% 6px, transparent 5.5px, #000 6px) top/14px 12px repeat-x",
    "radial-gradient(circle 6px at 50% calc(100% - 6px), transparent 5.5px, #000 6px) bottom/14px 12px repeat-x",
    "linear-gradient(#000,#000) center/calc(100% - 24px) calc(100% - 24px) no-repeat",
  ].join(",");
  return (
    <div
      className={`relative bg-cream p-3 shadow-2xl ${className}`}
      style={{
        WebkitMask: edgeMask,
        mask: edgeMask,
        WebkitMaskComposite: "source-over",
        filter: "drop-shadow(0 18px 24px rgb(0 0 0 / 0.5))",
      }}
    >
      <img src={src} alt={alt} className={`block w-full h-full object-cover ${innerClass}`} />
    </div>
  );
}

function Polaroid({
  src,
  alt,
  caption,
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}) {
  return (
    <div
      className={`bg-cream p-3 pb-10 shadow-2xl ${className}`}
      style={{ filter: "drop-shadow(0 22px 30px rgb(0 0 0 / 0.45))" }}
    >
      <img src={src} alt={alt} className="block w-full h-full object-cover" />
      {caption && (
        <p className="mt-2 text-center font-hand text-wine text-xl">{caption}</p>
      )}
    </div>
  );
}

function LaceStrip() {
  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
      {/* cream lace dots */}
      <svg viewBox="0 0 1200 30" preserveAspectRatio="none" className="w-full h-6 block">
        <defs>
          <pattern id="lace" width="24" height="30" patternUnits="userSpaceOnUse">
            <circle cx="6" cy="8" r="3" fill="var(--cream)" />
            <circle cx="18" cy="14" r="2.5" fill="var(--cream)" />
            <circle cx="12" cy="22" r="2" fill="var(--cream)" />
            <circle cx="2" cy="20" r="1.8" fill="var(--cream)" />
            <circle cx="22" cy="4" r="1.8" fill="var(--cream)" />
          </pattern>
        </defs>
        <rect width="1200" height="30" fill="url(#lace)" />
      </svg>
      {/* gingham red/white check */}
      <div
        className="h-5 w-full"
        style={{
          background:
            "repeating-linear-gradient(90deg, var(--cream) 0 14px, var(--wine-bright) 14px 28px)",
        }}
      />
    </div>
  );
}

function ScribbleCorner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 250" className={className}>
      <path
        d="M20 220 C 40 120, 130 40, 200 60 C 260 75, 240 130, 180 130 C 120 130, 90 80, 140 50 C 200 15, 270 30, 285 80"
        fill="none"
        stroke="var(--cream)"
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.85"
        className="animate-draw"
      />
    </svg>
  );
}

/* ---------- Slides ---------- */

function SlideCover() {
  return (
    <section className="snap-slide flex items-center px-6 md:px-16">
      {/* corner bows */}
      <Bow className="absolute top-6 left-6 w-28 md:w-36 animate-sway" />
      <Bow className="absolute top-6 right-6 w-28 md:w-36 animate-sway" flip />

      <div className="grid md:grid-cols-2 gap-10 items-center w-full max-w-7xl mx-auto">
        <div className="text-cream animate-fade-up">
          <h1 className="font-script text-cream leading-[0.9] text-7xl md:text-9xl drop-shadow-lg">
            Happy<br />Birthday
          </h1>
          <p className="mt-8 max-w-sm text-cream/90 text-sm md:text-base leading-relaxed animate-fade-up delay-2">
            For my lovely Best Friend. A tribute to the person who makes life look easy.
          </p>
          <button
            onClick={() =>
              document.getElementById("letter")?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-8 rounded-full border border-cream/80 bg-cream/95 text-wine px-8 py-3 text-xs font-semibold tracking-[0.25em] hover:bg-cream hover:scale-105 transition-all animate-fade-up delay-3"
          >
            UNFOLD THIS
          </button>
        </div>

        <div className="relative h-[460px] md:h-[560px]">
          {/* big stamp portrait */}
          <div
            className="absolute right-0 top-4 w-[280px] h-[360px] md:w-[360px] md:h-[460px] animate-drop"
            style={{ ["--r" as never]: "4deg", transform: "rotate(4deg)" }}
          >
            <Bow className="absolute -top-10 left-1/2 -translate-x-1/2 w-24 z-10 animate-wiggle" />
            <Stamp src={portrait1} alt="Rebecca portrait" className="w-full h-full" />
          </div>
          {/* small stamp */}
          <div
            className="absolute left-0 bottom-10 w-[190px] h-[230px] md:w-[230px] md:h-[270px] animate-drop delay-2"
            style={{ ["--r" as never]: "-8deg", transform: "rotate(-8deg)" }}
          >
            <Stamp src={portrait2} alt="Rebecca portrait small" className="w-full h-full" />
            {/* wax seal */}
            <div
              className="absolute -top-4 -right-4 w-14 h-14 rounded-full grid place-items-center text-cream font-script text-2xl shadow-xl"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, oklch(0.55 0.22 22), oklch(0.30 0.15 22))",
              }}
            >
              R
            </div>
          </div>
          {/* name tag */}
          <div
            className="absolute right-6 -bottom-4 bg-cream px-8 py-5 shadow-xl animate-drop delay-3"
            style={{
              ["--r" as never]: "-4deg",
              transform: "rotate(-4deg)",
              clipPath: "polygon(0 0, 100% 0, 100% 80%, 88% 100%, 0 100%)",
            }}
          >
            <p className="font-script text-wine-bright text-4xl md:text-5xl leading-none">
              Rebecca
            </p>
            <p className="font-script text-wine-bright text-4xl md:text-5xl leading-none mt-1">
              Miles
            </p>
          </div>
        </div>
      </div>

      <LaceStrip />
    </section>
  );
}

function SlideLetter() {
  return (
    <section id="letter" className="snap-slide flex items-center px-6 md:px-16">
      <ScribbleCorner className="absolute -top-4 -left-4 w-64 md:w-80" />

      <div className="grid md:grid-cols-2 gap-10 items-center w-full max-w-7xl mx-auto">
        <div className="text-cream animate-fade-up">
          <h2 className="font-script text-5xl md:text-7xl mb-8 drop-shadow">
            Happy Birthday Rebecca
          </h2>
          <p className="leading-relaxed text-sm md:text-base text-cream/90 max-w-md">
            Twenty-one orbits around the sun and you still make every season feel like
            golden hour. Thank you for the late-night laughter, the quiet listening, and
            the way you turn ordinary Tuesdays into stories worth keeping. May this new
            chapter be soft, bright, and brave — exactly like you.
          </p>
          <p className="mt-8 text-cream/90 text-sm md:text-base">
            All my love,{" "}
            <span className="font-semibold text-cream font-script text-2xl">
              Lucy Pritchard
            </span>
          </p>
        </div>

        <div className="relative h-[480px] md:h-[560px]">
          {/* notebook page */}
          <div
            className="absolute right-4 top-0 w-[300px] md:w-[380px] h-[440px] md:h-[520px] bg-cream shadow-2xl animate-drop"
            style={{
              ["--r" as never]: "3deg",
              transform: "rotate(3deg)",
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent 0 14px, oklch(0.55 0.22 22 / .15) 14px 16px)",
            }}
          >
            {/* spiral binding */}
            <div
              className="absolute -left-1 top-0 bottom-0 w-3"
              style={{
                background:
                  "repeating-linear-gradient(0deg, var(--wine-bright) 0 8px, transparent 8px 16px)",
              }}
            />
            {/* paperclip ribbon bow */}
            <div className="absolute -top-6 left-10 w-20 animate-wiggle">
              <Bow className="w-full" />
            </div>

            <div className="absolute inset-6 top-12 flex flex-col gap-3">
              <Polaroid
                src={portrait1}
                alt=""
                className="w-44 h-40 self-start"
              />
              <Polaroid
                src={portrait2}
                alt=""
                className="w-40 h-36 self-end"
              />
            </div>

            {/* stamp - flowers */}
            <div
              className="absolute bottom-4 left-4 w-16 h-20 bg-cream-soft shadow-md grid place-items-center"
              style={{
                WebkitMask:
                  "radial-gradient(circle 4px at 4px 4px, transparent 3.5px, #000 4px) -4px -4px/8px 8px",
                mask: "radial-gradient(circle 4px at 4px 4px, transparent 3.5px, #000 4px) -4px -4px/8px 8px",
              }}
            >
              <div className="text-2xl">🌷</div>
            </div>
            {/* squiggle */}
            <svg viewBox="0 0 100 30" className="absolute top-3 right-3 w-20 text-wine-bright">
              <path
                d="M2 15 Q 12 2, 22 15 T 42 15 T 62 15 T 82 15 T 102 15"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* sticky note */}
          <div
            className="absolute -right-2 -top-6 w-44 md:w-52 bg-cream-soft shadow-xl p-5 font-script text-wine animate-drop delay-3"
            style={{ ["--r" as never]: "8deg", transform: "rotate(8deg)" }}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-wine-deep" />
            <p className="text-2xl leading-tight">Chapter 21</p>
            <p className="text-base mt-2 leading-snug">
              May this new chapter be your most iconic and golden era yet.
            </p>
          </div>
        </div>
      </div>

      <LaceStrip />
    </section>
  );
}

function SlideFunFact() {
  return (
    <section className="snap-slide flex items-center px-6 md:px-16">
      <ScribbleCorner className="absolute -top-4 -left-4 w-64 md:w-80" />

      <div className="grid md:grid-cols-2 gap-10 items-center w-full max-w-7xl mx-auto">
        <div className="text-cream animate-fade-up">
          <h2 className="font-script text-6xl md:text-8xl drop-shadow">Fun Fact</h2>
          <h3 className="mt-8 font-display tracking-[0.3em] text-cream font-bold">
            THE TRUTH IS…
          </h3>
          <p className="mt-4 leading-relaxed text-sm md:text-base text-cream/90 max-w-md">
            She remembers every birthday, every coffee order, every inside joke from
            three Augusts ago. She is the friend who shows up early, stays late, and
            brings snacks. The world is gentler because she is in it.
          </p>
        </div>

        <div className="relative h-[480px] md:h-[560px]">
          <div
            className="absolute left-4 top-6 w-[260px] h-[260px] md:w-[320px] md:h-[320px] animate-drop"
            style={{ ["--r" as never]: "-6deg", transform: "rotate(-6deg)" }}
          >
            <Stamp src={meadow} alt="Joyful friends" className="w-full h-full" />
          </div>
          <div
            className="absolute right-4 bottom-4 w-[240px] h-[200px] md:w-[300px] md:h-[240px] animate-drop delay-2"
            style={{ ["--r" as never]: "5deg", transform: "rotate(5deg)" }}
          >
            <Stamp src={dance} alt="Friends dancing" className="w-full h-full" />
          </div>

          {/* did you know note */}
          <div
            className="absolute right-0 top-0 w-44 md:w-52 bg-cream-soft shadow-xl p-5 font-script text-wine animate-drop delay-3"
            style={{ ["--r" as never]: "10deg", transform: "rotate(10deg)" }}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-wine-deep" />
            <p className="text-xl leading-tight">Did You Know ?</p>
            <p className="text-base mt-2 leading-snug">
              21 years of being the person who always knows the best songs and the best
              stories.
            </p>
          </div>

          {/* clover */}
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-24 animate-float" style={{ ["--r" as never]: "0deg" }}>
            <svg viewBox="0 0 100 140">
              <g fill="oklch(0.45 0.18 145)">
                <ellipse cx="50" cy="40" rx="14" ry="20" />
                <ellipse cx="32" cy="55" rx="20" ry="14" />
                <ellipse cx="68" cy="55" rx="20" ry="14" />
                <ellipse cx="50" cy="70" rx="14" ry="20" />
              </g>
              <path
                d="M50 80 Q 52 110, 50 138"
                stroke="oklch(0.5 0.16 130)"
                strokeWidth="3"
                fill="none"
              />
            </svg>
          </div>
        </div>
      </div>

      <LaceStrip />
    </section>
  );
}

function SlideMemories() {
  return (
    <section className="snap-slide flex items-center px-6 md:px-16">
      {/* spiral spine */}
      <div
        className="absolute top-10 bottom-16 left-1/2 -translate-x-1/2 w-3 hidden md:block"
        style={{
          background:
            "repeating-linear-gradient(0deg, var(--cream) 0 8px, transparent 8px 16px)",
        }}
      />

      <div className="grid md:grid-cols-2 gap-12 items-center w-full max-w-7xl mx-auto">
        <div className="relative h-[500px] md:h-[600px]">
          {/* big polaroid with clip */}
          <div
            className="absolute left-2 top-8 w-[300px] md:w-[380px] h-[340px] md:h-[420px] animate-drop"
            style={{ ["--r" as never]: "-4deg", transform: "rotate(-4deg)" }}
          >
            <Polaroid src={dance} alt="" className="w-full h-full" caption="us, summer '24" />
            {/* binder clip */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-10 bg-[oklch(0.78_0.10_95)] rounded-sm shadow-md">
              <div className="absolute inset-x-2 top-1 h-1 bg-[oklch(0.62_0.08_95)] rounded" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[oklch(0.62_0.08_95)]" />
            </div>
          </div>
          {/* small polaroid */}
          <div
            className="absolute right-2 top-2 w-32 md:w-40 h-36 md:h-44 animate-drop delay-2"
            style={{ ["--r" as never]: "10deg", transform: "rotate(10deg)" }}
          >
            <Polaroid src={meadow} alt="" className="w-full h-full" />
          </div>
          {/* bottom polaroid with bow */}
          <div
            className="absolute left-10 bottom-0 w-44 md:w-56 h-40 md:h-48 animate-drop delay-3"
            style={{ ["--r" as never]: "-12deg", transform: "rotate(-12deg)" }}
          >
            <Polaroid src={portrait2} alt="" className="w-full h-full" />
            <Bow className="absolute -bottom-6 -right-4 w-20 animate-wiggle" />
          </div>
          {/* handwritten note */}
          <div
            className="absolute -left-2 top-0 w-28 md:w-32 bg-cream-soft p-3 font-hand text-wine text-sm shadow-md animate-drop"
            style={{ ["--r" as never]: "-8deg", transform: "rotate(-8deg)" }}
          >
            quei giorni più lunghi del normale, dove la quiete diventa il nostro tempo…
          </div>
        </div>

        <div className="text-cream text-center md:text-left animate-fade-up">
          <h2 className="font-script text-6xl md:text-8xl drop-shadow">Core Memories</h2>
          <p className="mt-6 font-script text-2xl md:text-3xl text-cream/90 max-w-md mx-auto md:mx-0">
            A curated collection of the days that turned into our favorite stories.
          </p>
        </div>
      </div>

      <ScribbleCorner className="absolute -top-2 right-2 w-56 md:w-72" />
      <LaceStrip />
    </section>
  );
}

function SlideEternity() {
  return (
    <section className="snap-slide flex items-center justify-center px-6">
      <Bow className="absolute top-6 left-6 w-28 md:w-36 animate-sway" />
      <Bow className="absolute top-6 right-6 w-28 md:w-36 animate-sway" flip />

      <div
        className="relative w-full max-w-2xl bg-cream-soft py-16 px-10 md:px-16 shadow-2xl animate-drop"
        style={{
          WebkitMask: [
            "radial-gradient(circle 10px at 10px 50%, transparent 9.5px, #000 10px) left/20px 22px repeat-y",
            "radial-gradient(circle 10px at calc(100% - 10px) 50%, transparent 9.5px, #000 10px) right/20px 22px repeat-y",
            "radial-gradient(circle 10px at 50% 10px, transparent 9.5px, #000 10px) top/22px 20px repeat-x",
            "radial-gradient(circle 10px at 50% calc(100% - 10px), transparent 9.5px, #000 10px) bottom/22px 20px repeat-x",
            "linear-gradient(#000,#000) center/calc(100% - 40px) calc(100% - 40px) no-repeat",
          ].join(","),
          mask: [
            "radial-gradient(circle 10px at 10px 50%, transparent 9.5px, #000 10px) left/20px 22px repeat-y",
            "radial-gradient(circle 10px at calc(100% - 10px) 50%, transparent 9.5px, #000 10px) right/20px 22px repeat-y",
            "radial-gradient(circle 10px at 50% 10px, transparent 9.5px, #000 10px) top/22px 20px repeat-x",
            "radial-gradient(circle 10px at 50% calc(100% - 10px), transparent 9.5px, #000 10px) bottom/22px 20px repeat-x",
            "linear-gradient(#000,#000) center/calc(100% - 40px) calc(100% - 40px) no-repeat",
          ].join(","),
          filter: "drop-shadow(0 25px 35px rgb(0 0 0 / 0.5))",
        }}
      >
        {/* paperclip */}
        <svg viewBox="0 0 60 140" className="absolute -left-4 top-10 w-12 drop-shadow-lg">
          <path
            d="M30 10 C 12 10, 12 70, 30 70 C 48 70, 48 25, 30 25 C 18 25, 18 60, 30 60"
            fill="none"
            stroke="oklch(0.78 0.01 250)"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>

        <h2 className="font-script text-5xl md:text-7xl text-wine-bright text-center">
          To Eternity
        </h2>
        <p className="mt-8 font-display italic text-wine text-center leading-loose text-base md:text-lg">
          Here's to the friend who makes ordinary days feel like film stills, who remembers
          the small things, and who turns every chapter into something worth keeping.
          To you, to us, to the years still ahead — endlessly, gratefully, always.
        </p>
        <p className="mt-8 text-center text-wine font-semibold tracking-widest text-sm">
          @reallygreatsite
        </p>
      </div>
    </section>
  );
}

/* ---------- Side dot navigator ---------- */

function Dots({ count, active }: { count: number; active: number }) {
  return (
    <div className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => {
            const slides = document.querySelectorAll(".snap-slide");
            slides[i]?.scrollIntoView({ behavior: "smooth" });
          }}
          aria-label={`Go to slide ${i + 1}`}
          className={`h-3 w-3 rounded-full border border-cream transition-all ${
            i === active ? "bg-cream scale-125" : "bg-transparent hover:bg-cream/50"
          }`}
        />
      ))}
    </div>
  );
}

/* ---------- Page ---------- */

function Index() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const slides = 5;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const onScroll = () => {
      const i = Math.round(stage.scrollTop / stage.clientHeight);
      setActive(i);
    };
    stage.addEventListener("scroll", onScroll, { passive: true });
    return () => stage.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main ref={stageRef} className="snap-stage bg-gingham">
      <SlideCover />
      <SlideLetter />
      <SlideFunFact />
      <SlideMemories />
      <SlideEternity />
      <Dots count={slides} active={active} />
    </main>
  );
}

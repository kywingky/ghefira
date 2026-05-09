import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import portrait1 from "@/assets/foto 4.jpeg";
import portrait2 from "@/assets/foto_2.jpeg";
import meadow from "@/assets/friends-meadow.jpg";
import dance from "@/assets/friends-dance.jpg";
import foto1 from "@/assets/foto_1.jpeg";
import foto3 from "@/assets/foto_3.jpeg";
import foto5 from "@/assets/foto_5.jpeg";
import foto6 from "@/assets/foto-6.jpeg";
import foto7 from "@/assets/foto-7.jpeg";
import bgMusic from "@/assets/Yiruma River Flows in You.mp3";

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
      className={`relative bg-cream p-3 shadow-2xl keepsake ${className}`}
      onClick={(e) => {
        const t = e.currentTarget;
        t.classList.remove("pop");
        // force reflow to restart animation
        void t.offsetWidth;
        t.classList.add("pop");
      }}
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
      className={`bg-cream p-3 pb-10 shadow-2xl keepsake ${className}`}
      onClick={(e) => {
        const t = e.currentTarget;
        t.classList.remove("pop");
        void t.offsetWidth;
        t.classList.add("pop");
      }}
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
          <h1 className="font-script shimmer-text leading-[0.9] text-7xl md:text-9xl drop-shadow-lg">
            Happy<br />Birthday
          </h1>
          <p className="mt-8 max-w-sm text-cream/90 text-sm md:text-base leading-relaxed animate-fade-up delay-2">
            Wanita Kuat Wanita Hebat. Ghefira Naila Arriyatillah
          </p>
          <button
            onClick={() =>
              document.getElementById("letter")?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-8 rounded-full border border-cream/80 bg-cream/95 text-wine px-8 py-3 text-xs font-semibold tracking-[0.25em] hover:bg-cream hover:scale-105 transition-all animate-fade-up delay-3"
          >
            Baca yaa
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
              G
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
              Ghefira Naila
            </p>
            <p className="font-script text-wine-bright text-4xl md:text-5xl leading-none mt-1">
              Arriyatillah
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
            Happy Birthday Ghefira
          </h2>
          <p className="leading-relaxed text-sm md:text-base text-cream/90 max-w-md">
            Walaupun kita baru kenal atau belum lama kenal, aku tahu akhir-akhir ini kamu lagi banyak hal yang dipikirin, tugas yang numpuk dan hal-hal lain yang mungkin nggak selalu mudah.
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
                src={foto1}
                alt=""
                className="w-44 h-40 self-start"
              />
              <Polaroid
                src={portrait1}
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
            <p className="text-base leading-snug">
              Semoga di fase ini, kamu nemuin banyak hal baik dan momen yang bikin kamu senyum.
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
          <p className="mt-8 leading-relaxed text-sm md:text-base text-cream/90 max-w-md">
            Banyak orang lagi cape sama tugas kuliah tapi kamuu, kamu bisa ngerjain berbagaihal sekaligus, dari ngajar, jadi operator di yayasan, dan tetap tanggung jawab sama semuanya, dan anehnya nilai kamu tetep bagus.
          </p>
          <p className="mt-4 leading-relaxed text-sm md:text-base text-cream/90 max-w-md">
            Dan yang paling bikin salut, kamu udah bisa berdiri di kaki kamu sendiri. Ngejalanin hidup tanpa banyak bergantung sesuatu yang nggak semua orang bisa lakuin.
          </p>
          <p className="mt-4 leading-relaxed text-sm md:text-base text-cream/90 max-w-md">
            Kamu nggak banyak cerita, gabanyak ngeluh, tapi yang kamu bawa setiap hari itu berat dan kamu tetap bisa ngejalaninnya.
          </p>
          <p className="mt-4 leading-relaxed text-sm md:text-base text-cream/90 max-w-md">
            aku salut banget ada orang seperti kamu gheff.
          </p>
        </div>

        <div className="relative h-[480px] md:h-[560px]">
          <div
            className="absolute left-4 top-6 w-[260px] h-[260px] md:w-[320px] md:h-[320px] animate-drop"
            style={{ ["--r" as never]: "-6deg", transform: "rotate(-6deg)" }}
          >
            <Stamp src={foto3} alt="Joyful friends" className="w-full h-full" />
          </div>
          <div
            className="absolute right-4 bottom-4 w-[240px] h-[200px] md:w-[300px] md:h-[240px] animate-drop delay-2"
            style={{ ["--r" as never]: "5deg", transform: "rotate(5deg)" }}
          >
            <Stamp src={foto5} alt="Friends dancing" className="w-full h-full" />
          </div>

          {/* did you know note */}
          <div
            className="absolute right-0 top-0 w-44 md:w-52 bg-cream-soft shadow-xl p-5 font-script text-wine animate-drop delay-3"
            style={{ ["--r" as never]: "10deg", transform: "rotate(10deg)" }}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-wine-deep" />
            <p className="text-base leading-snug">
              21 tahun menjalani lebih banyak hal dari yang orang lihat dan kamu tetap bertahan.
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
            <Polaroid src={foto7} alt="" className="w-full h-full" caption="us, summer '24" />
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
            <Polaroid src={foto6} alt="" className="w-full h-full" />
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
            foto terbaik dari Ghefira Naila
          </div>
        </div>

        <div className="text-cream text-center md:text-left animate-fade-up">
          <p className="font-script text-2xl md:text-3xl text-cream/90 max-w-md mx-auto md:mx-0">
            Ini foto yang aku ambil tanpa izin dari kamu, sorry yaa
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

        <div className="font-display italic text-wine text-center leading-relaxed text-sm md:text-base space-y-4">
          <p>
            Aku nggak tau ini tepat di hari ulang tahun kamu atau bukan…<br />
            dan mungkin ini terasa agak lebay<br />
            tapi ini yang bisa aku kasih buat kamu.
          </p>
          <p>
            Aku tau sekarang kamu lagi ada di fase yang nggak gampang—<br />
            dari hal-hal di rumah yang mungkin belum sepenuhnya terasa nyaman,<br />
            sampai pikiran kamu yang kayak nggak pernah beneran berhenti.
          </p>
          <p>
            Dan di tengah semua itu, kamu tetap jalan.<br />
            Tetap berusaha, tetap bertahan, dan tetap ngelakuin banyak hal.
          </p>
          <p>
            Semoga di umur yang baru ini, pelan-pelan semuanya bisa membaik ya.<br />
            Hal-hal yang berat bisa mulai reda,<br />
            dan apa yang lagi kamu usahakan sekarang bisa berjalan dengan baik.
          </p>
          <p>
            Nggak harus langsung sempurna, yang penting kamu tetap kuat dan nggak nyerah.
          </p>
        </div>
        <div className="mt-8 text-center text-wine">
          <p className="font-script text-3xl md:text-4xl text-wine-bright mb-2">
            Selamat ulang tahun, Ghefira Naila Arriyatillah
          </p>
          <p className="font-display italic text-xs md:text-sm max-w-md mx-auto">
            Semoga ke depan, kamu bisa ngerasain lebih banyak tenang dan hal-hal baik yang kamu pantas dapetin.
          </p>
        </div>
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
          className={`h-3 w-3 rounded-full border border-cream transition-all ${i === active ? "bg-cream scale-125" : "bg-transparent hover:bg-cream/50"
            }`}
        />
      ))}
    </div>
  );
}

/* ---------- Ambient overlays ---------- */

function Sparkles({ count = 18 }: { count?: number }) {
  const [items, setItems] = useState<
    { left: number; delay: number; dur: number; dx: number; size: number }[] | null
  >(null);

  useEffect(() => {
    const arr = Array.from({ length: count }).map(() => ({
      left: Math.random() * 100,
      delay: Math.random() * 6,
      dur: 4 + Math.random() * 5,
      dx: (Math.random() - 0.5) * 80,
      size: 6 + Math.random() * 12,
    }));
    setItems(arr);
  }, [count]);

  // Render an empty container on the server / initial render so SSR matches
  // the first client render. The randomised items are added after mount.
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {items?.map((it, i) => (
        <span
          key={i}
          className="sparkle"
          style={{
            left: `${it.left}%`,
            bottom: `-20px`,
            width: it.size,
            height: it.size,
            animationDelay: `${it.delay}s`,
            animationDuration: `${it.dur}s`,
            ["--dx" as never]: `${it.dx}px`,
          }}
        />
      ))}
    </div>
  );
}

function Hearts({ count = 12 }: { count?: number }) {
  const [items, setItems] = useState<
    { left: number; delay: number; dur: number; size: number }[] | null
  >(null);

  useEffect(() => {
    const arr = Array.from({ length: count }).map(() => ({
      left: Math.random() * 100,
      delay: Math.random() * 8,
      dur: 8 + Math.random() * 8,
      size: 10 + Math.random() * 16,
    }));
    setItems(arr);
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {items?.map((it, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="heart"
          style={{
            left: `${it.left}%`,
            width: it.size,
            height: it.size,
            animationDelay: `${it.delay}s`,
            animationDuration: `${it.dur}s`,
            fill: "var(--cream)",
            opacity: 0.55,
          }}
        >
          <path d="M12 21s-7-4.35-9.5-8.5C.8 9.6 2.5 5 6.5 5c2 0 3.4 1.1 4.5 2.6C12.1 6.1 13.5 5 15.5 5 19.5 5 21.2 9.6 19.5 12.5 17 16.65 12 21 12 21z" />
        </svg>
      ))}
    </div>
  );
}

/* ---------- Page ---------- */

function Index() {
  const stageRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [active, setActive] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
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

  useEffect(() => {
    // Attempt to auto-play immediately on load (might be blocked by browser)
    if (audioRef.current && !isPlaying) {
      audioRef.current.volume = 0.5;
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          console.log("Autoplay blocked. User needs to click Open.");
        });
    }
  }, []);

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // key per slide forces remount → replays all CSS animations on scroll-back
  const slideEls = [
    <SlideCover key={`c-${active === 0 ? "in" : "out"}`} />,
    <SlideLetter key={`l-${active === 1 ? "in" : "out"}`} />,
    <SlideFunFact key={`f-${active === 2 ? "in" : "out"}`} />,
    <SlideMemories key={`m-${active === 3 ? "in" : "out"}`} />,
    <SlideEternity key={`e-${active === 4 ? "in" : "out"}`} />,
  ];

  const handleOpen = () => {
    setIsOpened(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
    }
  };

  return (
    <>
      {/* Cover Overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-wine-deep flex flex-col items-center justify-center transition-opacity duration-1000 ${isOpened ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <p className="font-script text-cream text-5xl md:text-7xl mb-8 animate-pulse text-center px-4 leading-tight">
          Untuk Ghefira Naila
        </p>
        <button
          onClick={handleOpen}
          className="bg-cream text-wine font-semibold px-8 py-3 rounded-full hover:scale-105 transition-transform tracking-widest text-sm shadow-xl"
        >
          BUKA SURAT
        </button>
      </div>

      <main ref={stageRef} className={`snap-stage bg-gingham relative ${!isOpened ? 'overflow-hidden h-screen' : ''}`}>
        <audio ref={audioRef} src={bgMusic} loop autoPlay />

        {/* Global ambient layers (fixed so they float above gingham, below content) */}
        <div className="fixed inset-0 pointer-events-none z-[1]">
          <Hearts count={14} />
          <Sparkles count={20} />
        </div>

        {/* Music Toggle Button */}
        <button
          onClick={toggleAudio}
          className="fixed bottom-6 left-6 z-50 w-12 h-12 bg-cream border border-wine/20 rounded-full shadow-2xl flex items-center justify-center text-wine hover:scale-110 transition-transform"
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-1">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {slideEls.map((el, i) => (
          <div key={i} className="relative z-10">
            {el}
          </div>
        ))}
        <Dots count={slides} active={active} />
      </main>
    </>
  );
}


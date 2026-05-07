"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown, Scissors } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8, delay },
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#0c0c0c]" />

      {/* Radial green glow — bottom left */}
      <div className="absolute -bottom-32 -left-32 w-[700px] h-[700px] rounded-full bg-[#B8B8B8]/10 blur-[120px] pointer-events-none" />

      {/* Subtle glow top right */}
      <div className="absolute -top-20 right-0 w-[400px] h-[400px] rounded-full bg-[#B8B8B8]/5 blur-[100px] pointer-events-none" />

      {/* Grid lines decoration */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,240,235,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,235,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Background logo watermark */}
      <div className="absolute -bottom-32 -right-32 w-96 h-96 pointer-events-none opacity-[0.08]">
        <Image
          src="/spartabarberwbg.png"
          alt="Sparta Barber"
          width={384}
          height={384}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-6rem)]">
          {/* Left: Text */}
          <div className="flex flex-col justify-center">
            {/* Tag */}
            <motion.div {...fadeIn(0.2)} className="flex items-center gap-2 mb-6">
              <div className="w-6 h-px bg-[#B8B8B8]" />
              <span className="text-xs font-medium tracking-[0.25em] uppercase text-[#B8B8B8]">
                Rio de Janeiro · Desde 2015
              </span>
            </motion.div>

            {/* Main title */}
            <div className="overflow-hidden mb-3">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" as const }}
                className="font-display text-[clamp(52px,8vw,108px)] leading-[0.88] tracking-tight"
              >
                <span className="text-[#B8B8B8]">SPAR</span>
                <span className="text-[#D4D4D4]">TA</span>
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h2
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.42, ease: "easeOut" as const }}
                className="font-heading italic text-[clamp(28px,5vw,56px)] text-[#f5f0eb]/80 leading-tight"
              >
                Corte de elite.
              </motion.h2>
            </div>

            {/* Locations */}
            <motion.p
              {...fadeUp(0.7)}
              className="text-xs tracking-[0.3em] uppercase text-[#a8a8a8] mb-10 flex items-center gap-3"
            >
              <Scissors size={12} className="text-[#B8B8B8]" />
              Recreio · Barra · Guanabara
              <Scissors size={12} className="text-[#B8B8B8]" />
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...fadeUp(0.85)}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                href="/agendar"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-[#B8B8B8] text-[#111111] font-semibold tracking-widest uppercase text-sm rounded-sm hover:bg-[#D4D4D4] active:bg-[#888888] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8B8B8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0c0c] shadow-[0_0_30px_rgba(184,184,184,0.25)] hover:shadow-[0_0_40px_rgba(184,184,184,0.4)]"
              >
                Agendar Agora
                <ArrowDown
                  size={14}
                  className="-rotate-90 group-hover:translate-x-1 transition-transform duration-200"
                />
              </Link>
              <Link
                href="/servicos"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/15 text-[#f5f0eb] font-medium tracking-widest uppercase text-sm rounded-sm hover:border-[#B8B8B8] hover:text-[#B8B8B8] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8B8B8]"
              >
                Nossos Serviços
              </Link>
            </motion.div>
          </div>

          {/* Right: Image + stats */}
          <motion.div
            {...fadeIn(0.5)}
            className="relative hidden lg:flex flex-col gap-6 items-end"
          >
            {/* Main image */}
            <div className="relative w-full max-w-md aspect-[3/4] rounded-sm overflow-hidden ring-1 ring-white/10">
              <Image
                src="https://placehold.co/480x640/1e1e1e/272727?text=.&format=png"
                alt="Sparta Barber"
                width={480}
                height={640}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              {/* Color treatment overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/20 to-transparent" />
              <div className="absolute inset-0 bg-[#B8B8B8]/8 mix-blend-multiply" />

              {/* Bottom tag */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-display text-3xl text-[#f5f0eb] tracking-wide leading-none">
                  SPARTA
                </p>
                <p className="font-display text-lg text-[#B8B8B8] tracking-wider mt-1">
                  BARBER
                </p>
              </div>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-6 w-full max-w-md">
              {[
                { value: "3", label: "Unidades" },
                { value: "10+", label: "Anos" },
                { value: "5★", label: "Avaliação" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex-1 text-center py-4 bg-[#272727]/80 backdrop-blur rounded-sm ring-1 ring-white/5"
                >
                  <p className="font-display text-3xl text-[#B8B8B8] leading-none mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs tracking-widest uppercase text-[#a8a8a8]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#a8a8a8]">
          scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-[#a8a8a8] to-transparent animate-bounce" />
      </motion.div>
    </section>
  );
}

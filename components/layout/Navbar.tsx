"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User, ShieldCheck, Scissors } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const navLinks = [
  { href: "/servicos", label: "Serviços" },
  { href: "/clube", label: "Clube" },
  { href: "/loja", label: "Loja" },
  { href: "/#unidades", label: "Unidades" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isBarbeiro, setIsBarbeiro] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const checkUser = async (u: SupabaseUser | null) => {
      setUser(u);
      if (!u) { setIsAdmin(false); setIsBarbeiro(false); return; }

      const { data: adminData } = await supabase
        .from("admins")
        .select("id")
        .eq("id", u.id)
        .maybeSingle();

      const { data: profData } = await supabase
        .from("profissionais")
        .select("id")
        .eq("user_id", u.id)
        .maybeSingle();

      setIsAdmin(!!adminData);
      setIsBarbeiro(!!profData && !adminData);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      checkUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#111111]/95 backdrop-blur-md border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 overflow-hidden ring-1 ring-white/10 group-hover:ring-[#B8B8B8]/50 transition-all duration-300">
              <Image
                src="/spartabarberlogo.jpg"
                alt="Sparta Barber"
                width={48}
                height={48}
                priority
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-display text-sm tracking-wider hidden sm:block text-[#f5f0eb] group-hover:text-[#B8B8B8] transition-colors duration-300">
              SPARTA BARBER
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-widest uppercase text-[#a8a8a8] hover:text-[#f5f0eb] transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#B8B8B8] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center gap-2 px-4 py-2 border border-[#B8B8B8]/30 text-[#B8B8B8] text-sm font-medium tracking-widest uppercase rounded-sm hover:border-[#B8B8B8] hover:bg-[#B8B8B8]/10 transition-all duration-200"
              >
                <ShieldCheck size={14} />
                Admin
              </Link>
            )}
            {isBarbeiro && (
              <Link
                href="/admin"
                className="flex items-center gap-2 px-4 py-2 border border-[#B8B8B8]/30 text-[#B8B8B8] text-sm font-medium tracking-widest uppercase rounded-sm hover:border-[#B8B8B8] hover:bg-[#B8B8B8]/10 transition-all duration-200"
              >
                <Scissors size={14} />
                Minha Agenda
              </Link>
            )}
            {user ? (
              <Link
                href="/cliente"
                className="flex items-center gap-2 px-4 py-2 border border-white/10 text-[#f5f0eb] text-sm font-medium tracking-widest uppercase rounded-sm hover:border-[#B8B8B8]/50 hover:text-[#B8B8B8] transition-all duration-200"
              >
                <User size={14} />
                Minha conta
              </Link>
            ) : (
              <Link
                href="/cliente/login"
                className="px-4 py-2 border border-white/10 text-[#f5f0eb] text-sm font-medium tracking-widest uppercase rounded-sm hover:border-white/30 transition-all duration-200"
              >
                Entrar
              </Link>
            )}
            <Link
              href="/agendar"
              className="px-5 py-2 bg-[#B8B8B8] text-[#111111] text-sm font-semibold tracking-widest uppercase rounded-sm hover:bg-[#D4D4D4] active:bg-[#888888] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8B8B8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
            >
              Agendar
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-[#f5f0eb] hover:text-[#B8B8B8] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8B8B8] rounded-sm"
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-[#111111]/98 backdrop-blur-xl border-b border-white/5 md:hidden"
          >
            <nav className="flex flex-col px-6 py-6 gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-lg font-display tracking-widest text-[#a8a8a8] hover:text-[#f5f0eb] transition-colors duration-200 border-b border-white/5"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="pt-4 flex flex-col gap-3"
              >
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 border border-[#B8B8B8]/30 text-[#B8B8B8] text-center font-medium tracking-widest uppercase rounded-sm hover:border-[#B8B8B8] transition-colors"
                  >
                    <ShieldCheck size={14} />
                    Admin
                  </Link>
                )}
                {isBarbeiro && (
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 border border-[#B8B8B8]/30 text-[#B8B8B8] text-center font-medium tracking-widest uppercase rounded-sm hover:border-[#B8B8B8] transition-colors"
                  >
                    <Scissors size={14} />
                    Minha Agenda
                  </Link>
                )}
                {user ? (
                  <Link
                    href="/cliente"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 border border-white/10 text-[#f5f0eb] text-center font-medium tracking-widest uppercase rounded-sm hover:border-[#B8B8B8]/50 transition-colors"
                  >
                    <User size={14} />
                    Minha conta
                  </Link>
                ) : (
                  <Link
                    href="/cliente/login"
                    onClick={() => setOpen(false)}
                    className="block w-full py-3 border border-white/10 text-[#f5f0eb] text-center font-medium tracking-widest uppercase rounded-sm hover:border-white/30 transition-colors"
                  >
                    Entrar
                  </Link>
                )}
                <Link
                  href="/agendar"
                  onClick={() => setOpen(false)}
                  className="block w-full py-3 bg-[#B8B8B8] text-[#111111] text-center font-semibold tracking-widest uppercase rounded-sm hover:bg-[#D4D4D4] transition-colors duration-200"
                >
                  AGENDAR AGORA
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

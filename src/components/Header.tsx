/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BookOpen, ChevronLeft, LayoutDashboard, LogOut, Menu, Sparkles, UserRound, X } from 'lucide-react';

interface HeaderProps {
  currentUser: { name: string; email: string; phone: string } | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenQuiz: () => void;
  onOpenDashboard: () => void;
  hasEnrolledCourses: boolean;
}

const navItems = [
  { label: 'مسیر', id: 'methodology-section' },
  { label: 'دوره‌ها', id: 'courses-section' },
  { label: 'مشاوره', id: 'consulting-section' },
  { label: 'FAQ', id: 'faq-section' },
];

export default function Header({
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenQuiz,
  onOpenDashboard,
  hasEnrolledCourses,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('mobile-menu-active', mobileMenuOpen);
    return () => document.body.classList.remove('mobile-menu-active');
  }, [mobileMenuOpen]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const goTop = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 lg:px-5">
      <motion.div
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        className={`apple-full-container apple-glass flex h-14 items-center justify-between rounded-[24px] px-3 transition-all duration-500 lg:h-[60px] lg:px-5 ${scrolled ? 'bg-white/78 shadow-xl shadow-black/5' : 'bg-white/60'}`}
      >
        <a href="#top" onClick={goTop} className="group flex items-center gap-2.5" aria-label="بازگشت به ابتدای صفحه">
          <span className="grid size-9 place-items-center rounded-[15px] bg-[#1d1d1f] text-[11px] font-black text-white shadow-lg shadow-black/15 transition-transform duration-500 group-hover:-translate-y-0.5">
            TA
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="text-sm font-black tracking-[-0.04em] text-[#1d1d1f]">توآمریکا</span>
            <span className="mt-1 text-[10px] font-bold text-[#6e6e73]">مسیر کوتاه‌تر آمریکا</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 rounded-full bg-white/55 p-1 lg:flex" aria-label="ناوبری اصلی">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="rounded-full px-4 py-2 text-xs font-extrabold text-[#6e6e73] transition-all duration-300 hover:bg-white hover:text-[#1d1d1f] hover:shadow-sm"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {hasEnrolledCourses && (
            <button onClick={onOpenDashboard} className="apple-button-secondary min-h-10 px-4 text-xs">
              <LayoutDashboard size={15} />
              کلاس من
            </button>
          )}

          <button onClick={onOpenQuiz} className="apple-button-primary min-h-10 px-4 text-xs">
            <Sparkles size={15} />
            تعیین مسیر
          </button>

          {currentUser ? (
            <div className="group relative">
              <button className="flex h-10 items-center gap-2 rounded-full border border-black/5 bg-white/70 pr-2 pl-3 text-right shadow-sm transition-all duration-300 hover:bg-white">
                <span className="grid size-7 place-items-center rounded-full bg-zinc-100 text-[#1d1d1f]">
                  <UserRound size={14} />
                </span>
                <span className="max-w-[112px] truncate text-xs font-black text-[#1d1d1f]">{currentUser.name}</span>
              </button>
              <div className="invisible absolute left-0 top-12 w-64 translate-y-2 rounded-[24px] border border-white/80 bg-white/92 p-3 opacity-0 shadow-2xl shadow-black/10 backdrop-blur-2xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="rounded-2xl bg-[#f5f5f7] p-3">
                  <p className="text-xs font-black text-[#1d1d1f]">{currentUser.name}</p>
                  <p className="mt-1 text-[11px] font-bold text-[#6e6e73]" dir="ltr">{currentUser.phone}</p>
                </div>
                <button onClick={onLogout} className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-rose-50 px-3 py-2.5 text-xs font-black text-rose-600 transition-colors hover:bg-rose-100">
                  <LogOut size={14} />
                  خروج
                </button>
              </div>
            </div>
          ) : (
            <button onClick={onOpenAuth} className="apple-button-secondary min-h-10 px-4 text-xs">
              <UserRound size={15} />
              ورود
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          {hasEnrolledCourses && (
            <button onClick={onOpenDashboard} className="grid size-10 place-items-center rounded-full bg-white text-[#1d1d1f] shadow-sm">
              <BookOpen size={18} />
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen((value) => !value)}
            className="grid size-10 place-items-center rounded-full bg-[#1d1d1f] text-white shadow-lg shadow-black/15"
            aria-label={mobileMenuOpen ? 'بستن منو' : 'باز کردن منو'}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-[76px] z-40 bg-black/20 backdrop-blur-md lg:hidden"
              aria-label="بستن منو"
            />
            <motion.aside
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="apple-glass fixed inset-x-3 top-[78px] z-50 rounded-[28px] p-3 lg:hidden"
            >
              <button onClick={() => { setMobileMenuOpen(false); onOpenQuiz(); }} className="apple-button-primary w-full">
                <Sparkles size={16} />
                مسیر مناسبم را بگو
              </button>

              <div className="mt-3 grid gap-2">
                {navItems.map((item) => (
                  <button key={item.id} onClick={() => scrollTo(item.id)} className="flex items-center justify-between rounded-2xl bg-white/70 px-4 py-3 text-right text-sm font-black text-[#1d1d1f]">
                    {item.label}
                    <ChevronLeft size={16} className="text-[#6e6e73]" />
                  </button>
                ))}
              </div>

              <div className="mt-3 rounded-3xl bg-[#f5f5f7] p-3">
                {currentUser ? (
                  <div className="space-y-2">
                    <div className="rounded-2xl bg-white p-3">
                      <p className="text-xs font-black text-[#1d1d1f]">{currentUser.name}</p>
                      <p className="mt-1 text-[11px] font-bold text-[#6e6e73]" dir="ltr">{currentUser.phone}</p>
                    </div>
                    <button onClick={() => { setMobileMenuOpen(false); onLogout(); }} className="w-full rounded-2xl bg-rose-50 py-3 text-xs font-black text-rose-600">
                      خروج از حساب
                    </button>
                  </div>
                ) : (
                  <button onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }} className="apple-button-secondary w-full">
                    ورود دانشجو
                  </button>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, User, LogOut, Award, BookOpen, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  currentUser: { name: string; email: string; phone: string } | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenQuiz: () => void;
  onOpenDashboard: () => void;
  hasEnrolledCourses: boolean;
}

export default function Header({ 
  currentUser, 
  onOpenAuth, 
  onLogout, 
  onOpenQuiz, 
  onOpenDashboard,
  hasEnrolledCourses 
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('mobile-menu-active');
    } else {
      document.body.classList.remove('mobile-menu-active');
    }
    return () => {
      document.body.classList.remove('mobile-menu-active');
    };
  }, [mobileMenuOpen]);

  const scrollIntoView = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-zinc-200/80 select-none transition-all duration-300" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Desktop Nav Links */}
          <div className="flex items-center gap-8">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center font-bold text-white text-sm tracking-widest font-sans shadow-sm">
                US
              </div>
              <span className="font-extrabold text-sm text-zinc-900 tracking-tight font-sans">تو‌آمریکا</span>
            </a>

            <nav className="hidden lg:flex items-center gap-6">
              <button 
                onClick={() => scrollIntoView('courses-section')}
                className="text-xs font-bold text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                دوره‌ها
              </button>
              <button 
                onClick={onOpenQuiz}
                className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 border border-blue-100 px-3 py-1 rounded-full shadow-xs"
              >
                <Award className="w-3.5 h-3.5" />
                <span>تعیین سطح سریع</span>
              </button>
              <button 
                onClick={() => scrollIntoView('methodology-section')}
                className="text-xs font-bold text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                تکنیک یادگیری
              </button>
              <button 
                onClick={() => scrollIntoView('faq-section')}
                className="text-xs font-bold text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                پرسش‌های متداول
              </button>
            </nav>
          </div>

          {/* User Auth Portal & Dashboard Controls */}
          <div className="hidden lg:flex items-center gap-4">
            {hasEnrolledCourses && (
              <button
                onClick={onOpenDashboard}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 transition-all cursor-pointer shadow-sm shadow-blue-500/10"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>پنل کلاسی شما</span>
              </button>
            )}

            {currentUser ? (
              <div className="flex items-center gap-3">
                <div className="flex flex-col text-left">
                  <span className="text-[12px] font-bold text-zinc-800">{currentUser.name}</span>
                  <span className="text-[9px] text-zinc-400 font-mono tracking-wide">{currentUser.phone}</span>
                </div>
                <button
                  onClick={onLogout}
                  title="خروج از حساب"
                  className="p-1.5 rounded-full text-zinc-400 hover:text-rose-600 hover:bg-rose-50 border border-zinc-200 hover:border-rose-200 transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-zinc-700 hover:text-zinc-950 border border-zinc-200 hover:bg-zinc-50 rounded-full transition-all cursor-pointer shadow-sm"
              >
                <User className="w-3.5 h-3.5" />
                <span>ورود / عضویت</span>
              </button>
            )}
          </div>

          {/* Mobile Hamburguer toggler */}
          <div className="flex lg:hidden items-center gap-2">
            {hasEnrolledCourses && (
              <button
                onClick={onOpenDashboard}
                className="flex items-center gap-1 p-1.5 rounded-full text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 select-none shadow-sm"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="text-[10px]">کلاس</span>
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 transition-colors border border-zinc-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Responsive mobile sidebar menu drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Blur Over the Web Content with Tap to Close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 top-[64px] z-49 bg-zinc-950/35 backdrop-blur-[10px] cursor-pointer"
            />

            {/* Overlaid sliding responsive container */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="lg:hidden absolute top-full left-0 right-0 z-50 bg-white border-t border-zinc-150 px-5 py-6 space-y-4 font-sans shadow-2xl rounded-b-3xl overflow-y-auto max-h-[calc(100vh-80px)]"
            >
              
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenQuiz(); }}
                className="w-full flex items-center justify-center gap-2 py-2.5 pr-3 pl-3 text-xs font-bold bg-blue-50 text-blue-705 border border-blue-100 rounded-full shadow-xs cursor-pointer"
              >
                <Award className="w-4 h-4 text-blue-600" />
                <span>تعیین سطح و ارزیابی رایگان زبان</span>
              </button>
    
              <button 
                onClick={() => scrollIntoView('courses-section')}
                className="w-full text-right py-2 text-xs font-bold text-zinc-650 hover:text-blue-605 block border-b border-zinc-100 cursor-pointer"
              >
                دوره‌های تخصصی توآمریکا
              </button>
              <button 
                onClick={() => scrollIntoView('methodology-section')}
                className="w-full text-right py-2 text-xs font-bold text-zinc-650 hover:text-blue-605 block border-b border-zinc-100 cursor-pointer"
              >
                تکنیک یادگیری بومی مهاجران
              </button>
              <button 
                onClick={() => scrollIntoView('faq-section')}
                className="w-full text-right py-2 text-xs font-bold text-zinc-650 hover:text-blue-605 block border-b border-zinc-100 cursor-pointer"
              >
                پرسش‌های متداول ویزا
              </button>
    
              <div className="pt-2">
                {currentUser ? (
                  <div className="space-y-2">
                    <div className="bg-zinc-50 p-2.5 rounded-xl flex items-center justify-between border border-zinc-200">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-zinc-800">{currentUser.name}</span>
                        <span className="text-[10px] text-zinc-400 font-mono tracking-wide">{currentUser.phone}</span>
                      </div>
                      <User className="w-5 h-5 text-zinc-500" />
                    </div>
                    <button
                      onClick={() => { setMobileMenuOpen(false); onLogout(); }}
                      className="w-full py-2 flex items-center justify-center gap-1 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>خروج از حساب</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                    className="w-full py-2.5 flex items-center justify-center gap-2 text-xs font-bold text-white bg-zinc-900 hover:bg-zinc-800 rounded-xl shadow-sm cursor-pointer"
                  >
                    <User className="w-4 h-4" />
                    <span>ورود به حساب دانشجویی</span>
                  </button>
                )}
              </div>
    
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

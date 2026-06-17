/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Video, Users, CheckCircle, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onOpenConsulting: () => void;
}

export default function Hero({ onOpenConsulting }: HeroProps) {
  const [isPlaying, setIsOnlinePlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoDuration] = useState(148); // 2 mins, 28 seconds mock dur
  const progressTimerRef = useRef<number | null>(null);
  
  // Interactive ambient light tracker
  const [mousePos, setMousePos] = useState({ x: 50, y: 30 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 50, y: 30 }); // gently reset to center
  };

  // Simulated video playback timer loops
  useEffect(() => {
    if (isPlaying) {
      progressTimerRef.current = window.setInterval(() => {
        setVideoProgress((prev) => {
          if (prev >= videoDuration) {
            setIsOnlinePlaying(false);
            if (progressTimerRef.current) clearInterval(progressTimerRef.current);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    }

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isPlaying, videoDuration]);

  const handlePlayPause = () => {
    setIsOnlinePlaying(!isPlaying);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoProgress(Number(e.target.value));
  };

  const formatVideoTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-white py-20 md:py-28 text-center select-none" 
      dir="rtl"
    >
      {/* Pristine clean background with mouse tracking liquid spotlight lamp */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,30%),rgba(59,130,246,0.07)_0%,rgba(139,92,246,0.025)_30%,transparent_60%)] pointer-events-none transition-all duration-700 ease-out" 
        style={{
          '--mouse-x': `${mousePos.x}%`,
          '--mouse-y': `${mousePos.y}%`,
        } as React.CSSProperties}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Intro Announcement Pill */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-50 border border-zinc-200 text-[10px] text-zinc-500 font-sans tracking-wide font-bold mb-8 shadow-xs"
        >
          <span className="w-1 h-1 rounded-full bg-blue-600 animate-pulse" />
          <span>مرجع آموزش تخصصی، آزمون‌های بورد پزشکی و دپارتمان ویزای ایالات متحده</span>
        </motion.div>

        {/* Quietly refined Title without giant shouting fonts */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl md:text-3xl font-black text-zinc-900 tracking-tight leading-normal md:leading-relaxed max-w-3xl mx-auto"
        >
          با دپارتمان <span className="text-blue-600">تو‌آمدیکـــا</span>، رویای تخصص، کار و تحصیل در آمریکا هموار می‌شود
        </motion.h1>

        {/* Short clean helper paragraph */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="mt-4 text-xs text-zinc-500 max-w-2xl mx-auto leading-relaxed font-semibold"
        >
          آموزش‌های تخصصی آزمون مچینگ کادر درمان (USMLE / NCLEX)، کدهای نگارش انگیزه‌نامه SOP و برنامه مدون شبیه‌سازی مصاحبه‌های سفارتی منطبق بر آخرین تغییرات دپارتمان ویزای آمریکا.
        </motion.p>

        {/* Minimal rounded buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <button
            onClick={onOpenConsulting}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 font-bold text-[11px] transition-all cursor-pointer shadow-xs"
          >
            مشاوره رایگان پرونده مهاجرتی
          </button>
          <a
            href="#courses-section"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full text-zinc-650 hover:text-zinc-950 border border-zinc-200 hover:bg-zinc-50 font-bold text-[11px] transition-all shadow-xs"
          >
            بررسی دوره‌ها و پیش‌نیازها
          </a>
        </motion.div>

        {/* Apple Style Panoramic Hero Banner Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto mt-12 mb-6"
        >
          <div className="relative aspect-[21/9] w-full rounded-2xl bg-zinc-50 border border-dashed border-zinc-300 flex flex-col items-center justify-center p-6 text-center group cursor-pointer hover:bg-zinc-100/55 transition-all overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-zinc-100/10 to-zinc-200/5" />
            <div className="relative z-10 space-y-2">
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100 block w-max mx-auto">
                محل قرارگیری بنر عریض بالای صفحه
              </span>
              <h3 className="text-xs md:text-sm font-bold text-zinc-800">
                [بنر اصلی کمپین مهاجرتی - ابعاد پیشنهادی ۱۲۰۰ در ۵۰۰ پیکسل]
              </h3>
              <p className="text-[10px] text-zinc-400 font-medium max-w-md mx-auto leading-relaxed">
                در این بخش می‌توانید پوستر کمپین، عکس تیم اساتید دانشگاه تگزاس و کالتک، یا شعار اصلی مچینگ کادر درمان را به همراه تصویر زمینه بارگذاری نمایید.
              </p>
            </div>
            {/* Minimal line corner decorations mimicking Apple product showcases */}
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-zinc-300" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-zinc-300" />
          </div>
        </motion.div>

        {/* Clean Interactive Mock Video Player Section */}
        <div className="max-w-3xl mx-auto mt-6 mb-16">
          <div className="relative border border-zinc-200/80 rounded-2xl overflow-hidden bg-zinc-50 shadow-xs">
            
            {/* Aspect audio visualizer theater aspect */}
            <div className="aspect-video w-full relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-100/30 to-white/10" />
              
              {isPlaying ? (
                <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-60">
                  <div className="w-1 h-12 bg-blue-500 rounded-full animate-pulse-slow" style={{ animationDelay: '0.1s' }} />
                  <div className="w-1 h-16 bg-blue-600 rounded-full animate-pulse-slow" style={{ animationDelay: '0.3s' }} />
                  <div className="w-1 h-20 bg-zinc-300 rounded-full animate-pulse-slow" style={{ animationDelay: '0.5s' }} />
                  <div className="w-1 h-14 bg-blue-500 rounded-full animate-pulse-slow" style={{ animationDelay: '0.2s' }} />
                  <div className="w-1 h-8 bg-blue-600 rounded-full animate-pulse-slow" style={{ animationDelay: '0.6s' }} />
                </div>
              ) : null}

              {!isPlaying && (
                <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-zinc-200 shadow-xs">
                  <Video className="w-3 h-3 text-blue-600" />
                  <span className="text-[9px] text-zinc-600 font-bold">فیلم راهنمای آکادمی و فرآیندها (۲:۲۸)</span>
                </div>
              )}

              {/* Minimalist round center button resembling Apple site */}
              <button
                onClick={handlePlayPause}
                className="relative z-20 w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-white hover:bg-blue-600 transition-all duration-300 cursor-pointer shadow-md"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 mr-0.5" />}
              </button>

              {/* Subtitles bar */}
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none w-full px-4">
                {isPlaying && videoProgress < 15 && (
                  <span className="text-zinc-800 text-[10px] font-bold bg-white/90 backdrop-blur-xs py-1 px-3 rounded-full border border-zinc-250/60 shadow-xs">
                    «سرویس‌های کلاسی و جزوات آموزشی توآمریکا کاملاً منطبق با ساختارهای دانشگاهی آمریکا است.»
                  </span>
                )}
                {isPlaying && videoProgress >= 15 && videoProgress < 30 && (
                  <span className="text-zinc-800 text-[10px] font-bold bg-white/90 backdrop-blur-xs py-1 px-3 rounded-full border border-zinc-250/60 shadow-xs">
                    «شبیه‌ساز هوشمند کلمات و مهارت بومی جهت موفقیت ویزا در مصاحبه روز سفارت.»
                  </span>
                )}
              </div>

            </div>

            {/* Micro simple player control bar */}
            <div className="bg-white/80 backdrop-blur-xs px-4 py-2 border-t border-zinc-150 flex items-center gap-2 select-none">
              <button onClick={handlePlayPause} className="text-zinc-500 hover:text-zinc-800 cursor-pointer p-0.5">
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <span className="text-[8.5px] text-zinc-400 font-mono">{formatVideoTime(videoProgress)}</span>
              <input
                type="range"
                min="0"
                max={videoDuration}
                value={videoProgress}
                onChange={handleProgressChange}
                className="flex-1 accent-blue-600 bg-zinc-200 rounded appearance-none h-0.5 focus:outline-none cursor-pointer"
              />
              <span className="text-[8.5px] text-zinc-400 font-mono">{formatVideoTime(videoDuration)}</span>
              <button onClick={() => setIsMuted(!isMuted)} className="text-zinc-400 hover:text-zinc-700 cursor-pointer p-0.5">
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-zinc-300" /> : <Volume2 className="w-3.5 h-3.5 text-blue-600" />}
              </button>
            </div>

          </div>
        </div>

        {/* Global Key Stats row - elegant white cards with minimalist typography */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 border border-zinc-250/60 rounded-2xl bg-zinc-50/50">
          <div className="text-center py-2">
            <span className="block text-base md:text-lg font-black text-zinc-900 tracking-tight font-sans">۷۸۰+ مقاله و مستند</span>
            <span className="block text-[10px] text-zinc-400 mt-1 font-bold">بسته‌های آموزش بومی و آمادگی کلاسی</span>
          </div>

          <div className="text-center py-2 border-r border-zinc-100">
            <span className="block text-base md:text-lg font-black text-zinc-900 tracking-tight font-sans">۹۸.۴٪ رضایت عالی</span>
            <span className="block text-[10px] text-zinc-400 mt-1 font-bold">پرونده‌های تایید شده سفارتی و دانشگاهی</span>
          </div>

          <div className="text-center py-2 border-r border-zinc-100">
            <span className="block text-base md:text-lg font-black text-zinc-900 tracking-tight font-sans">۲۴+ استاد تراز اول</span>
            <span className="block text-[10px] text-zinc-400 mt-1 font-bold">برندگان فاند و متخصصین بورد آمریکا</span>
          </div>

          <div className="text-center py-2 border-r border-zinc-100">
            <span className="block text-base md:text-lg font-black text-zinc-900 tracking-tight font-sans">۵۰۰k+ جامعه اعضا</span>
            <span className="block text-[10px] text-zinc-400 mt-1 font-bold">نخبگان ایرانی مقیم ایالات متحده</span>
          </div>
        </div>

      </div>
    </section>
  );
}

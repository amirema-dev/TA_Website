/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, BriefcaseBusiness, GraduationCap, HeartPulse, MessageCircle, Sparkles, X } from 'lucide-react';

interface PlacementQuizProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCourse: (courseId: string) => void;
}

const options = [
  { id: 'embassy-comprehensive', icon: MessageCircle, title: 'مصاحبه سفارت', text: 'زبان، اعتماد، سناریو' },
  { id: 'medical-usmle', icon: HeartPulse, title: 'کادر درمان', text: 'USMLE / NCLEX' },
  { id: 'academic-funding', icon: GraduationCap, title: 'فاند تحصیلی', text: 'SOP، CV، استاد' },
  { id: 'tech-career', icon: BriefcaseBusiness, title: 'مهاجرت کاری', text: 'رزومه و مصاحبه' },
];

export default function PlacementQuiz({ isOpen, onClose, onSelectCourse }: PlacementQuizProps) {
  const [selected, setSelected] = useState(options[0].id);
  const selectedOption = useMemo(() => options.find((item) => item.id === selected) ?? options[0], [selected]);

  const handleStart = () => {
    onSelectCourse(selected);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[88] grid place-items-center px-3 py-6">
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/28 backdrop-blur-xl" aria-label="بستن تعیین مسیر" />

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="apple-card relative w-full max-w-4xl overflow-hidden p-3"
            role="dialog"
            aria-modal="true"
          >
            <div className="grid overflow-hidden rounded-[32px] bg-white lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[320px] bg-[#1d1d1f] p-7 text-white">
                <button onClick={onClose} className="absolute left-4 top-4 grid size-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur-xl">
                  <X size={17} />
                </button>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_16%,rgba(0,113,227,0.44),transparent_36%),radial-gradient(circle_at_76%_78%,rgba(255,255,255,0.12),transparent_34%)]" />
                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-2 text-xs font-black text-white/75"><Sparkles size={14} /> ۳ دقیقه</span>
                    <h2 className="mt-7 text-5xl font-black tracking-[-0.06em]">مسیرت کدامه؟</h2>
                    <p className="mt-4 text-sm font-bold leading-7 text-white/62">یک گزینه انتخاب کن؛ سایت مستقیم دوره مناسب را باز می‌کند.</p>
                  </div>
                  <div className="rounded-[28px] bg-white p-4 text-[#1d1d1f]">
                    <p className="text-xs font-black text-[#6e6e73]">پیشنهاد فعلی</p>
                    <p className="mt-1 text-xl font-black tracking-[-0.04em]">{selectedOption.title}</p>
                  </div>
                </div>
              </div>

              <div className="p-5 lg:p-7">
                <div className="grid gap-3 sm:grid-cols-2">
                  {options.map((option) => {
                    const Icon = option.icon;
                    const isActive = selected === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => setSelected(option.id)}
                        className={`min-h-[150px] rounded-[28px] p-5 text-right transition-all duration-500 ${isActive ? 'bg-[#0071e3] text-white shadow-2xl shadow-blue-500/20' : 'bg-[#f5f5f7] text-[#1d1d1f] hover:bg-zinc-100'}`}
                      >
                        <Icon size={24} />
                        <p className="mt-5 text-xl font-black tracking-[-0.04em]">{option.title}</p>
                        <p className={`mt-2 text-xs font-bold ${isActive ? 'text-white/70' : 'text-[#6e6e73]'}`}>{option.text}</p>
                      </button>
                    );
                  })}
                </div>

                <button onClick={handleStart} className="apple-button-primary mt-5 h-12 w-full">
                  شروع با همین مسیر
                  <ArrowLeft size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

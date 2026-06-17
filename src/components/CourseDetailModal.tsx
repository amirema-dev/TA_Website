/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, BadgeCheck, Clock3, Star, UsersRound, X } from 'lucide-react';
import { Course } from '../types';

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
  onEnroll: (course: Course) => void;
  isEnrolled: boolean;
}

const formatPrice = (price: number) => `${price.toLocaleString('fa-IR')} تومان`;

export default function CourseDetailModal({ course, onClose, onEnroll, isEnrolled }: CourseDetailModalProps) {
  return (
    <AnimatePresence>
      {course && (
        <div className="fixed inset-0 z-[85] grid place-items-center px-3 py-6">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/28 backdrop-blur-xl"
            aria-label="بستن جزئیات دوره"
          />

          <motion.article
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="apple-card relative max-h-[92vh] w-full max-w-5xl overflow-hidden p-3"
            role="dialog"
            aria-modal="true"
          >
            <div className="custom-scrollbar max-h-[calc(92vh-24px)] overflow-y-auto rounded-[32px] bg-white">
              <button onClick={onClose} className="sticky top-4 z-10 float-left ml-4 mt-4 grid size-10 place-items-center rounded-full bg-[#f5f5f7]/90 text-[#1d1d1f] backdrop-blur-xl">
                <X size={17} />
              </button>

              <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
                <div className="relative min-h-[420px] overflow-hidden bg-[#1d1d1f] p-7 text-white lg:min-h-[680px]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_16%,rgba(0,113,227,0.44),transparent_36%),radial-gradient(circle_at_76%_78%,rgba(255,255,255,0.12),transparent_34%)]" />
                  <div className="relative flex h-full flex-col justify-between">
                    <div>
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-2 text-xs font-black text-white/75">
                        <Star size={13} fill="currentColor" /> {course.rating.toLocaleString('fa-IR')}
                      </span>
                      <h2 className="mt-8 text-4xl font-black leading-tight tracking-[-0.06em] lg:text-6xl">{course.title}</h2>
                      <p className="mt-5 text-sm font-bold leading-8 text-white/62">{course.subtitle}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-[24px] bg-white/10 p-4 backdrop-blur-xl">
                        <Clock3 size={18} />
                        <p className="mt-3 text-xs font-black text-white/72">{course.duration}</p>
                      </div>
                      <div className="rounded-[24px] bg-white/10 p-4 backdrop-blur-xl">
                        <UsersRound size={18} />
                        <p className="mt-3 text-xs font-black text-white/72">{course.studentsCount.toLocaleString('fa-IR')} دانشجو</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 lg:p-8">
                  <p className="text-base font-bold leading-9 text-[#6e6e73]">{course.description}</p>

                  <div className="mt-8 grid gap-3">
                    {course.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-start gap-3 rounded-[24px] bg-[#f5f5f7] p-4">
                        <BadgeCheck size={18} className="mt-1 shrink-0 text-[#0071e3]" />
                        <span className="text-sm font-black leading-7 text-[#1d1d1f]">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 rounded-[28px] bg-[#f5f5f7] p-5">
                    <p className="text-xs font-bold text-[#6e6e73] line-through">{formatPrice(course.originalPrice)}</p>
                    <p className="mt-1 text-3xl font-black tracking-[-0.05em] text-[#1d1d1f]">{formatPrice(course.discountedPrice)}</p>
                    <button onClick={() => onEnroll(course)} className={isEnrolled ? 'apple-button-secondary mt-5 h-12 w-full' : 'apple-button-primary mt-5 h-12 w-full'}>
                      {isEnrolled ? 'ورود به کلاس' : 'رزرو دوره'}
                      <ArrowLeft size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      )}
    </AnimatePresence>
  );
}

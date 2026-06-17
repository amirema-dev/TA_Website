/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BookOpenCheck, CheckCircle2, Clock3, PlayCircle, X } from 'lucide-react';
import { courses } from '../data/courses';

interface DashboardProps {
  isOpen: boolean;
  onClose: () => void;
  enrolledCourseIds: string[];
}

export default function Dashboard({ isOpen, onClose, enrolledCourseIds }: DashboardProps) {
  const enrolledCourses = useMemo(() => courses.filter((course) => enrolledCourseIds.includes(course.id)), [enrolledCourseIds]);
  const [selectedCourseId, setSelectedCourseId] = useState('');

  useEffect(() => {
    if (!selectedCourseId && enrolledCourses[0]) setSelectedCourseId(enrolledCourses[0].id);
    if (selectedCourseId && !enrolledCourses.some((course) => course.id === selectedCourseId)) {
      setSelectedCourseId(enrolledCourses[0]?.id ?? '');
    }
  }, [selectedCourseId, enrolledCourses]);

  const selectedCourse = enrolledCourses.find((course) => course.id === selectedCourseId) ?? enrolledCourses[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[86] grid place-items-center px-3 py-6">
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/28 backdrop-blur-xl" aria-label="بستن داشبورد" />

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="apple-card relative max-h-[92vh] w-full max-w-6xl overflow-hidden p-3"
            role="dialog"
            aria-modal="true"
          >
            <div className="custom-scrollbar max-h-[calc(92vh-24px)] overflow-y-auto rounded-[32px] bg-white p-5 lg:p-7">
              <button onClick={onClose} className="absolute left-6 top-6 grid size-10 place-items-center rounded-full bg-[#f5f5f7]/90 text-[#1d1d1f] backdrop-blur-xl">
                <X size={17} />
              </button>

              <div className="mb-6">
                <span className="apple-eyebrow"><BookOpenCheck size={14} className="text-[#0071e3]" /> داشبورد کلاس</span>
                <h2 className="mt-5 text-4xl font-black tracking-[-0.06em] text-[#1d1d1f] lg:text-6xl">کلاس‌های من</h2>
              </div>

              {enrolledCourses.length === 0 ? (
                <div className="grid min-h-[360px] place-items-center rounded-[30px] bg-[#f5f5f7] p-8 text-center">
                  <div>
                    <BookOpenCheck size={42} className="mx-auto text-[#6e6e73]" />
                    <p className="mt-4 text-2xl font-black text-[#1d1d1f]">هنوز دوره‌ای رزرو نشده.</p>
                    <p className="mt-2 text-sm font-bold text-[#6e6e73]">از بخش دوره‌ها شروع کن.</p>
                  </div>
                </div>
              ) : (
                <div className="grid gap-3 lg:grid-cols-[0.9fr_1.1fr]">
                  <aside className="grid gap-2">
                    {enrolledCourses.map((course) => (
                      <button
                        key={course.id}
                        onClick={() => setSelectedCourseId(course.id)}
                        className={`rounded-[26px] p-4 text-right transition-all duration-400 ${selectedCourse?.id === course.id ? 'bg-[#1d1d1f] text-white shadow-2xl shadow-black/15' : 'bg-[#f5f5f7] text-[#1d1d1f] hover:bg-zinc-100'}`}
                      >
                        <p className="text-base font-black tracking-[-0.03em]">{course.title}</p>
                        <p className={`mt-2 text-xs font-bold ${selectedCourse?.id === course.id ? 'text-white/60' : 'text-[#6e6e73]'}`}>{course.duration}</p>
                      </button>
                    ))}
                  </aside>

                  <section className="relative overflow-hidden rounded-[30px] bg-[#1d1d1f] p-6 text-white">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(0,113,227,0.40),transparent_34%),radial-gradient(circle_at_76%_78%,rgba(255,255,255,0.14),transparent_34%)]" />
                    <div className="relative">
                      <p className="text-xs font-black text-white/60">جلسه بعدی</p>
                      <h3 className="mt-3 text-4xl font-black leading-tight tracking-[-0.06em]">{selectedCourse?.title}</h3>
                      <div className="mt-8 grid gap-3 sm:grid-cols-3">
                        {[
                          { icon: PlayCircle, title: 'ویدیو', text: 'شروع درس' },
                          { icon: Clock3, title: 'زمان', text: '۴۵ دقیقه' },
                          { icon: CheckCircle2, title: 'پیشرفت', text: '۲۴٪' },
                        ].map((item) => {
                          const Icon = item.icon;
                          return (
                            <div key={item.title} className="rounded-[24px] bg-white/10 p-4 backdrop-blur-xl">
                              <Icon size={19} />
                              <p className="mt-4 text-sm font-black">{item.title}</p>
                              <p className="mt-1 text-xs font-bold text-white/56">{item.text}</p>
                            </div>
                          );
                        })}
                      </div>
                      <button className="apple-button-primary mt-8 h-12 px-6">ادامه کلاس</button>
                    </div>
                  </section>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, BadgeCheck, Clock3, GraduationCap, HeartPulse, Laptop2, MessageCircle, MousePointer2, Sparkles, Star, UsersRound } from 'lucide-react';
import { courses } from '../data/courses';
import { Course } from '../types';

interface CoursesProps {
  enrolledCourseIds: string[];
  onEnroll: (course: Course) => void;
  currentUser: { name: string; email: string; phone: string } | null;
  onExploreCourse: (course: Course) => void;
}

const visualByGradient: Record<string, { bg: string; icon: React.ElementType; label: string }> = {
  'gradient-blue': {
    bg: 'from-[#dff0ff] via-[#f5fbff] to-[#ffffff]',
    icon: MessageCircle,
    label: 'Visa English',
  },
  'gradient-purple': {
    bg: 'from-[#f1e7ff] via-[#fff7ff] to-[#ffffff]',
    icon: HeartPulse,
    label: 'USMLE / NCLEX',
  },
  'gradient-emerald': {
    bg: 'from-[#dcfce7] via-[#f8fffb] to-[#ffffff]',
    icon: GraduationCap,
    label: 'Funding Route',
  },
  'gradient-amber': {
    bg: 'from-[#fff1d6] via-[#fffaf0] to-[#ffffff]',
    icon: Laptop2,
    label: 'Tech Career',
  },
};

const formatPrice = (price: number) => `${price.toLocaleString('fa-IR')} تومان`;

export default function Courses({ enrolledCourseIds, onEnroll, currentUser, onExploreCourse }: CoursesProps) {
  const [focusedCourseId, setFocusedCourseId] = useState(courses[0]?.id ?? '');

  const focusedCourse = useMemo(
    () => courses.find((course) => course.id === focusedCourseId) ?? courses[0],
    [focusedCourseId]
  );

  return (
    <section id="courses-section" className="apple-section pt-10">
      <div className="apple-full-container">
        <div className="mb-8 grid gap-5 lg:mb-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <span className="apple-eyebrow">
              <Sparkles size={15} className="text-[#0071e3]" />
              انتخاب ساده، نه لیست شلوغ
            </span>
            <h2 className="apple-title mt-5 text-[clamp(2.6rem,5.7vw,6.5rem)]">
              دوره‌ای که
              <br />
              واقعاً لازم داری.
            </h2>
          </div>
          <div className="apple-card flex max-w-lg items-center gap-3 rounded-[26px] p-4">
            <span className="apple-icon-tile shrink-0"><MousePointer2 size={19} /></span>
            <p className="text-sm font-bold leading-7 text-[#6e6e73]">
              {currentUser ? `${currentUser.name}، روی یک دوره بزن و شروع کن.` : 'اول دوره را ببین؛ برای رزرو، ورود سریع کافی است.'}
            </p>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-[0.86fr_1.14fr]">
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="apple-card sticky top-24 hidden h-[calc(100vh-120px)] min-h-[620px] overflow-hidden p-4 lg:block"
          >
            {focusedCourse && (
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[30px] bg-[#1d1d1f] p-7 text-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_16%,rgba(0,113,227,0.40),transparent_34%),radial-gradient(circle_at_76%_78%,rgba(255,255,255,0.14),transparent_34%)]" />
                <div className="relative">
                  <span className="inline-flex rounded-full bg-white/12 px-3 py-2 text-xs font-black text-white/80">Featured</span>
                  <h3 className="mt-8 max-w-xl text-5xl font-black leading-[1.04] tracking-[-0.06em]">{focusedCourse.title}</h3>
                  <p className="mt-5 max-w-md text-sm font-bold leading-8 text-white/62">{focusedCourse.subtitle}</p>
                </div>
                <div className="relative grid gap-3">
                  {focusedCourse.benefits.slice(0, 3).map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3 rounded-[22px] bg-white/10 p-3 backdrop-blur-xl">
                      <BadgeCheck size={17} className="mt-1 shrink-0 text-emerald-300" />
                      <span className="text-xs font-bold leading-6 text-white/72">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.aside>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-2">
            {courses.map((course, index) => {
              const isEnrolled = enrolledCourseIds.includes(course.id);
              const visual = visualByGradient[course.imageUrl] ?? visualByGradient['gradient-blue'];
              const Icon = visual.icon;

              return (
                <motion.article
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.72, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setFocusedCourseId(course.id)}
                  className="apple-card apple-card-hover group flex min-h-[560px] flex-col overflow-hidden p-3"
                >
                  <div className={`relative min-h-[250px] overflow-hidden rounded-[30px] bg-gradient-to-br ${visual.bg} p-5`}>
                    <div className="absolute left-5 top-5 rounded-full bg-white/72 px-3 py-2 text-[11px] font-black text-[#1d1d1f] shadow-sm backdrop-blur-xl">
                      {visual.label}
                    </div>
                    <div className="absolute bottom-5 right-5 grid size-24 place-items-center rounded-[30px] bg-white/72 text-[#0071e3] shadow-2xl shadow-black/10 backdrop-blur-xl transition-transform duration-700 group-hover:scale-105">
                      <Icon size={42} strokeWidth={1.7} />
                    </div>
                    <div className="absolute bottom-5 left-5 flex gap-2">
                      <span className="rounded-full bg-white/75 px-3 py-2 text-[11px] font-black text-[#1d1d1f] backdrop-blur-xl">{course.level}</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/75 px-3 py-2 text-[11px] font-black text-[#1d1d1f] backdrop-blur-xl">
                        <Star size={12} fill="currentColor" className="text-amber-500" />
                        {course.rating.toLocaleString('fa-IR')}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="text-2xl font-black leading-snug tracking-[-0.05em] text-[#1d1d1f]">{course.title}</h3>
                    <p className="mt-3 text-sm font-bold leading-7 text-[#6e6e73]">{course.subtitle}</p>

                    <div className="mt-5 grid grid-cols-2 gap-2">
                      <div className="rounded-[22px] bg-[#f5f5f7] p-3">
                        <Clock3 size={16} className="text-[#0071e3]" />
                        <p className="mt-2 text-[11px] font-black text-[#1d1d1f]">{course.duration.split('+')[0].trim()}</p>
                      </div>
                      <div className="rounded-[22px] bg-[#f5f5f7] p-3">
                        <UsersRound size={16} className="text-[#0071e3]" />
                        <p className="mt-2 text-[11px] font-black text-[#1d1d1f]">{course.studentsCount.toLocaleString('fa-IR')} دانشجو</p>
                      </div>
                    </div>

                    <div className="mt-auto pt-6">
                      <div className="flex items-end justify-between gap-3">
                        <div>
                          <p className="text-xs font-bold text-[#6e6e73] line-through">{formatPrice(course.originalPrice)}</p>
                          <p className="mt-1 text-xl font-black tracking-[-0.04em] text-[#1d1d1f]">{formatPrice(course.discountedPrice)}</p>
                        </div>
                        {isEnrolled && <span className="rounded-full bg-emerald-50 px-3 py-2 text-[11px] font-black text-emerald-700">ثبت شده</span>}
                      </div>

                      <div className="mt-4 grid grid-cols-[0.82fr_1.18fr] gap-2">
                        <button onClick={() => onExploreCourse(course)} className="apple-button-secondary min-h-11 px-3 text-xs">
                          جزئیات
                        </button>
                        <button
                          onClick={() => onEnroll(course)}
                          className={isEnrolled ? 'apple-button-secondary min-h-11 px-3 text-xs' : 'apple-button-primary min-h-11 px-3 text-xs'}
                        >
                          {isEnrolled ? 'ورود به کلاس' : 'رزرو دوره'}
                          <ArrowLeft size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

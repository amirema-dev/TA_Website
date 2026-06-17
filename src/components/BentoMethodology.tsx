/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, FileCheck2, LockKeyhole, MessageSquareText, MonitorPlay, Route } from 'lucide-react';

const cards = [
  {
    icon: Route,
    title: 'مسیر واضح',
    text: 'کاربر از همان نگاه اول می‌فهمد از کجا شروع کند.',
    className: 'lg:col-span-2 lg:row-span-2',
    dark: true,
  },
  {
    icon: MonitorPlay,
    title: 'کلاس تصویری',
    text: 'فایل، ویدیو و تمرین؛ یکپارچه.',
    className: '',
  },
  {
    icon: MessageSquareText,
    title: 'مصاحبه زنده',
    text: 'تمرین کوتاه، بازخورد سریع.',
    className: '',
  },
  {
    icon: FileCheck2,
    title: 'رزومه US',
    text: 'CV، SOP و ایمیل استاد.',
    className: 'lg:col-span-2',
  },
  {
    icon: LockKeyhole,
    title: 'حریم امن',
    text: 'اطلاعات پرونده جدا و محافظت‌شده.',
    className: '',
  },
];

export default function BentoMethodology() {
  return (
    <section id="methodology-section" className="apple-section">
      <div className="apple-full-container">
        <div className="mb-8 flex flex-col justify-between gap-5 lg:mb-12 lg:flex-row lg:items-end">
          <div>
            <span className="apple-eyebrow">
              <BrainCircuit size={15} className="text-[#0071e3]" />
              UX مسیرمحور
            </span>
            <h2 className="apple-title mt-5 max-w-4xl text-[clamp(2.6rem,5.8vw,6.5rem)]">
              کمتر بخوان.
              <br />
              سریع‌تر تصمیم بگیر.
            </h2>
          </div>
          <p className="apple-copy max-w-md text-sm lg:text-base">
            ساختار جدید، کاربر را از «دیدن» به «انتخاب مسیر» و بعد «شروع دوره» هدایت می‌کند.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="grid auto-rows-[230px] gap-3 lg:grid-cols-4 lg:auto-rows-[250px]"
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className={`apple-card apple-card-hover relative overflow-hidden p-6 ${card.className} ${card.dark ? 'bg-[#1d1d1f] text-white' : ''}`}
              >
                {card.dark ? (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(0,113,227,0.34),transparent_34%),radial-gradient(circle_at_70%_72%,rgba(255,255,255,0.12),transparent_30%)]" />
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(0,113,227,0.09),transparent_28%)]" />
                )}
                <div className="relative flex h-full flex-col justify-between">
                  <span className={card.dark ? 'grid size-12 place-items-center rounded-[18px] bg-white/12 text-white' : 'apple-icon-tile'}>
                    <Icon size={23} />
                  </span>
                  <div>
                    <h3 className={`text-3xl font-black tracking-[-0.05em] ${card.dark ? 'lg:text-6xl' : 'lg:text-4xl'}`}>{card.title}</h3>
                    <p className={`mt-3 max-w-sm text-sm font-bold leading-7 ${card.dark ? 'text-white/62' : 'text-[#6e6e73]'}`}>{card.text}</p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

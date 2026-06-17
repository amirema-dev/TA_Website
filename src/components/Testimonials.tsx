/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  { name: 'آرمان', route: 'F1 Visa', text: 'در یک نگاه فهمیدم باید از کجا شروع کنم. تمرین مصاحبه دقیقاً همان چیزی بود که لازم داشتم.' },
  { name: 'نگار', route: 'Funding', text: 'متن‌ها کوتاه بود، مسیر روشن بود و برای SOP و ایمیل استاد خروجی عملی گرفتم.' },
  { name: 'سینا', route: 'USMLE', text: 'داشبورد کلاسی و مسیر مرحله‌ای کمک کرد وسط کار گم نشوم.' },
];

export default function Testimonials() {
  return (
    <section className="apple-section pt-8">
      <div className="apple-full-container">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="apple-eyebrow"><Star size={14} className="text-amber-500" fill="currentColor" /> تجربه دانشجوها</span>
            <h2 className="apple-title mt-5 text-[clamp(2.4rem,4.4vw,5.2rem)]">اعتماد سریع‌تر.</h2>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="apple-card apple-card-hover min-h-[260px] p-6"
            >
              <Quote size={26} className="text-[#0071e3]" />
              <p className="mt-8 text-lg font-black leading-9 tracking-[-0.035em] text-[#1d1d1f]">{item.text}</p>
              <div className="mt-8 flex items-center justify-between border-t border-black/5 pt-4">
                <p className="text-sm font-black text-[#1d1d1f]">{item.name}</p>
                <span className="rounded-full bg-[#f5f5f7] px-3 py-2 text-[11px] font-black text-[#6e6e73]">{item.route}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

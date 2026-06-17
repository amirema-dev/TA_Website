/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  { q: 'از کجا شروع کنم؟', a: 'اول تعیین مسیر یا فرم مشاوره. بعد دوره مناسب پیشنهاد می‌شود.' },
  { q: 'برای رزرو باید وارد حساب شوم؟', a: 'بله. ورود سریع فقط برای ذخیره دوره و نمایش کلاس در داشبورد است.' },
  { q: 'کلاس‌ها مناسب موبایل هستند؟', a: 'بله. طراحی جدید اول برای تصمیم سریع و بعد برای دسترسی راحت به کلاس ساخته شده است.' },
  { q: 'این تغییرات بک‌اند را عوض می‌کند؟', a: 'خیر. این refactor فقط لایه UI/UX را تغییر می‌دهد و localDB و contract داده‌ها حفظ شده‌اند.' },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq-section" className="apple-section pt-8">
      <div className="apple-container">
        <div className="mb-8 text-center">
          <span className="apple-eyebrow"><HelpCircle size={14} className="text-[#0071e3]" /> پاسخ کوتاه</span>
          <h2 className="apple-title mt-5 text-[clamp(2.3rem,4.4vw,5rem)]">سؤال‌های سریع.</h2>
        </div>

        <div className="apple-card mx-auto max-w-4xl p-3">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.q} className="border-b border-black/5 last:border-b-0">
                <button onClick={() => setOpenIndex(isOpen ? -1 : index)} className="flex w-full items-center justify-between gap-4 rounded-[22px] px-4 py-5 text-right transition-colors hover:bg-[#f5f5f7]">
                  <span className="text-base font-black tracking-[-0.03em] text-[#1d1d1f]">{item.q}</span>
                  <ChevronDown size={18} className={`shrink-0 text-[#6e6e73] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-5 text-sm font-bold leading-8 text-[#6e6e73]">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

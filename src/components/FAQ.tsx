/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { faqs } from '../data/faqs';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <motion.section 
      id="faq-section" 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", damping: 30, stiffness: 120 }}
      className="py-20 bg-white border-t border-zinc-150 text-right select-none" 
      dir="rtl"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* TitleBlock */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block mb-1">پرسش و پاسخ‌های متداول ویزای آمریکا</span>
          <h2 className="text-lg md:text-xl font-bold text-zinc-900 tracking-tight leading-normal">
            پاسخ به سوالات متداول متقاضیان توآمریکا
          </h2>
          <p className="mt-2 text-[11px] text-zinc-405 leading-relaxed font-semibold">
            اگر سوالی درباره کلاس‌ها، برنامه‌های درسی یا بررسی پرونده‌های سفارت دارید، اطلاعات زیر را مطالعه فرمایید
          </p>
        </div>

        {/* Accordions layout */}
        <div className="space-y-2.5">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div 
                key={faq.id}
                className="bg-zinc-50 border border-zinc-200 rounded-2xl overflow-hidden transition-all duration-300"
              >
                
                {/* Trigger Button bar */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full text-right p-4 flex items-center justify-between gap-4 text-xs font-bold text-zinc-800 hover:text-zinc-950 select-none cursor-pointer group"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-zinc-450 shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0 group-hover:text-zinc-650 transition-colors" />
                  )}
                </button>

                {/* Collapsible Body element animated using framer-motion */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", damping: 25, stiffness: 200 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-2 text-[11px] text-zinc-550 leading-relaxed font-semibold border-t border-zinc-100 select-text">
                        <p className="whitespace-pre-wrap">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>

      </div>
    </motion.section>
  );
}

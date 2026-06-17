/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, CheckCircle2, CloudLightning } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().toLocaleDateString('fa-IR', { year: 'numeric' });

  return (
    <footer className="bg-zinc-50 border-t border-zinc-150 py-12 text-right select-none font-sans" dir="rtl">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-zinc-200 pb-10 mb-8">
          
          {/* Column 1 - Corporate bio */}
          <div className="md:col-span-8 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-zinc-900 flex items-center justify-center font-black text-white text-[10px] tracking-wider font-sans shadow-xs">
                US
              </div>
              <span className="font-bold text-xs text-zinc-900 tracking-tight font-sans">آکادمی تو‌آمریـكا</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed font-semibold max-w-xl">
              توآمریکا بستری تخصصی و مستقل است که با هدف ارتقای بنیه علمی، گویایی زبان انگلیسی و آمادگی آزمون‌های معادل‌سازی (USMLE / NCLEX) مهاجران ایرانی تأسیس گردیده است. ما آمادگی کامل شما را برای روز مصاحبه و آینده تحصیلی و کاری در ایالات متحده تضمین می‌کنیم.
            </p>
          </div>

          {/* Column 2 - Links Sitemap 1 */}
          <div className="md:col-span-4 space-y-2 col-span-1">
            <h4 className="text-[10px] font-bold text-zinc-805 uppercase tracking-widest pb-1 border-b border-zinc-100 inline-block">دسترسی‌های سریع</h4>
            <ul className="space-y-1.5 text-[10.5px] font-semibold">
              <li>
                <a href="#courses-section" className="text-zinc-405 hover:text-zinc-800 transition-colors">لیست دوره‌های سفارتی</a>
              </li>
              <li>
                <a href="#methodology-section" className="text-zinc-405 hover:text-zinc-800 transition-colors">متدولوژی یادگیری بومی</a>
              </li>
              <li>
                <a href="#consulting-section" className="text-zinc-405 hover:text-zinc-800 transition-colors">درخواست ارزیابی رزومه</a>
              </li>
              <li>
                <a href="#faq-section" className="text-zinc-405 hover:text-zinc-800 transition-colors">پرسش‌های متداول مصاحبه ویزا</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal credits and copyrights block */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] text-zinc-400 tracking-wide font-semibold">
          <span>حق نشر © {currentYear} آکادمی توآمریکا (ToAmerica Academy). کلیه حقوق محفوظ است.</span>
          <span className="mt-2 sm:mt-0 font-sans text-right select-all text-zinc-450">طراحی مینیمال و بهینه‌سازی کلاسی برای دانشجویان و متخصصین ایرانی.</span>
        </div>

      </div>
    </footer>
  );
}

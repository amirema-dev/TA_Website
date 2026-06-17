/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { ArrowUpLeft, Sparkles } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="pb-6 pt-8">
      <div className="apple-full-container">
        <div className="apple-card overflow-hidden p-6 lg:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="apple-eyebrow"><Sparkles size={14} className="text-[#0071e3]" /> ToAmerica Academy</span>
              <h2 className="mt-5 text-4xl font-black tracking-[-0.06em] text-[#1d1d1f] lg:text-6xl">آماده شروعی؟</h2>
              <p className="mt-4 max-w-xl text-sm font-bold leading-7 text-[#6e6e73]">اول مسیرت را مشخص کن. بعد با کمترین انتخاب اضافه، وارد کلاس مناسب شو.</p>
            </div>
            <a href="#consulting-section" className="apple-button-primary h-12 px-6">
              شروع مشاوره
              <ArrowUpLeft size={17} />
            </a>
          </div>
          <div className="mt-8 flex flex-col justify-between gap-3 border-t border-black/5 pt-5 text-xs font-bold text-[#6e6e73] sm:flex-row">
            <span>© {year} ToAmerica. All rights reserved.</span>
            <span>UI refactor: Apple-inspired, RTL-first.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

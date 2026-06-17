/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, Compass, Mail, Phone, Route, ShieldCheck, Sparkles, UserRound } from 'lucide-react';
import localDB from '../services/localDB';

const pathwayOptions = [
  { value: 'study', label: 'تحصیلی' },
  { value: 'work', label: 'کاری' },
  { value: 'medical', label: 'پزشکی' },
  { value: 'other', label: 'سایر' },
] as const;

export default function ConsultingForm() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [pathway, setPathway] = useState<'study' | 'work' | 'medical' | 'other'>('study');
  const [englishLevel, setEnglishLevel] = useState('مبتدی (A1/A2)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    if (!name || name.trim().length < 3) {
      setErrorMsg('نام کامل را وارد کن.');
      setIsSubmitting(false);
      return;
    }

    if (!phoneNumber || phoneNumber.length < 10) {
      setErrorMsg('شماره موبایل معتبر نیست.');
      setIsSubmitting(false);
      return;
    }

    setTimeout(() => {
      localDB.submitConsultation({
        name,
        phone: phoneNumber,
        email: email || 'بدون ایمیل',
        pathway,
        englishLevel,
      });
      setIsSubmitting(false);
      setSubmitSuccess(true);

      setTimeout(() => {
        setName('');
        setPhoneNumber('');
        setEmail('');
        setSubmitSuccess(false);
      }, 5000);
    }, 900);
  };

  return (
    <section id="consulting-section" className="apple-section">
      <div className="apple-full-container">
        <div className="apple-card overflow-hidden p-3 lg:p-4">
          <div className="grid gap-3 lg:grid-cols-[1.08fr_0.92fr]">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative min-h-[520px] overflow-hidden rounded-[34px] bg-[#1d1d1f] p-7 text-white lg:p-10"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(0,113,227,0.42),transparent_35%),radial-gradient(circle_at_72%_70%,rgba(255,255,255,0.13),transparent_34%)]" />
              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-2 text-xs font-black text-white/75">
                    <Sparkles size={14} />
                    شروع با یک تماس
                  </span>
                  <h2 className="mt-7 max-w-3xl text-[clamp(2.7rem,6vw,6.4rem)] font-black leading-[0.96] tracking-[-0.065em]">
                    مسیرت را
                    <br />
                    مشخص کنیم.
                  </h2>
                  <p className="mt-6 max-w-xl text-sm font-bold leading-8 text-white/62 lg:text-base">
                    فقط اطلاعات ضروری؛ تیم مشاوره، دوره مناسب و قدم بعدی را پیشنهاد می‌دهد.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { icon: Compass, title: 'هدف', text: 'تحصیل/کار/پزشکی' },
                    { icon: Route, title: 'مسیر', text: 'برنامه کوتاه' },
                    { icon: ShieldCheck, title: 'امن', text: 'بدون تغییر بک‌اند' },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="rounded-[24px] bg-white/10 p-4 backdrop-blur-xl">
                        <Icon size={19} className="text-white/85" />
                        <p className="mt-4 text-sm font-black">{item.title}</p>
                        <p className="mt-1 text-[11px] font-bold text-white/55">{item.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={handleFormSubmit}
              className="rounded-[34px] bg-white p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] lg:p-7"
            >
              {submitSuccess ? (
                <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
                  <span className="grid size-20 place-items-center rounded-[28px] bg-emerald-50 text-emerald-600">
                    <CheckCircle2 size={38} />
                  </span>
                  <h3 className="mt-6 text-3xl font-black tracking-[-0.05em] text-[#1d1d1f]">ثبت شد.</h3>
                  <p className="mt-3 max-w-sm text-sm font-bold leading-7 text-[#6e6e73]">
                    درخواستت ذخیره شد. مشاور برای هماهنگی قدم بعدی تماس می‌گیرد.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="text-3xl font-black tracking-[-0.05em] text-[#1d1d1f]">فرم سریع</h3>
                    <p className="mt-2 text-sm font-bold text-[#6e6e73]">کمتر از ۴۵ ثانیه.</p>
                  </div>

                  <div className="space-y-4">
                    <label className="block">
                      <span className="mb-2 flex items-center gap-2 text-xs font-black text-[#1d1d1f]"><UserRound size={14} /> نام کامل</span>
                      <input value={name} onChange={(event) => setName(event.target.value)} className="apple-field" placeholder="مثلاً پدرام شمس" required />
                    </label>

                    <label className="block">
                      <span className="mb-2 flex items-center gap-2 text-xs font-black text-[#1d1d1f]"><Phone size={14} /> موبایل</span>
                      <input
                        value={phoneNumber}
                        onChange={(event) => setPhoneNumber(event.target.value.replace(/\D/g, ''))}
                        className="apple-field text-left tracking-wider"
                        placeholder="9123456789"
                        dir="ltr"
                        required
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 flex items-center gap-2 text-xs font-black text-[#1d1d1f]"><Mail size={14} /> ایمیل اختیاری</span>
                      <input value={email} onChange={(event) => setEmail(event.target.value)} className="apple-field text-left" placeholder="name@mail.com" dir="ltr" />
                    </label>

                    <div>
                      <span className="mb-2 block text-xs font-black text-[#1d1d1f]">مسیرت کدام است؟</span>
                      <div className="grid grid-cols-4 gap-2">
                        {pathwayOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => setPathway(option.value)}
                            className={`rounded-2xl px-2 py-3 text-xs font-black transition-all duration-300 ${pathway === option.value ? 'bg-[#0071e3] text-white shadow-lg shadow-blue-500/20' : 'bg-[#f5f5f7] text-[#6e6e73] hover:bg-zinc-100'}`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <label className="block">
                      <span className="mb-2 block text-xs font-black text-[#1d1d1f]">سطح زبان</span>
                      <select value={englishLevel} onChange={(event) => setEnglishLevel(event.target.value)} className="apple-field cursor-pointer appearance-none">
                        <option>مبتدی (A1/A2)</option>
                        <option>متوسط (B1/B2)</option>
                        <option>پیشرفته (C1/C2)</option>
                      </select>
                    </label>
                  </div>

                  {errorMsg && <p className="mt-4 rounded-2xl bg-rose-50 px-4 py-3 text-xs font-black text-rose-600">{errorMsg}</p>}

                  <button type="submit" disabled={isSubmitting} className="apple-button-primary mt-6 h-12 w-full disabled:cursor-not-allowed disabled:opacity-70">
                    {isSubmitting ? 'در حال ثبت...' : 'ثبت درخواست'}
                    {!isSubmitting && <ArrowLeft size={16} />}
                  </button>
                </>
              )}
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, LockKeyhole, Phone, UserRound, X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: { name: string; phone: string; email: string }) => void;
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (name.trim().length < 3) {
      setError('نام کامل را وارد کن.');
      return;
    }
    if (phone.length < 10) {
      setError('شماره موبایل معتبر نیست.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const user = {
        id: `local-${Date.now()}`,
        name: name.trim(),
        phone,
        email: email || 'بدون ایمیل',
        isLoggedIn: true,
      };
      window.localStorage.setItem('toamerica_current_user', JSON.stringify(user));
      onAuthSuccess({ name: user.name, phone: user.phone, email: user.email });
      setIsSubmitting(false);
      onClose();
    }, 650);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[90] grid place-items-center px-3 py-6">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/28 backdrop-blur-xl"
            aria-label="بستن پنجره ورود"
          />

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.97 }}
            transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className="apple-card relative w-full max-w-[520px] overflow-hidden p-3"
            role="dialog"
            aria-modal="true"
          >
            <div className="relative overflow-hidden rounded-[32px] bg-white p-6">
              <button onClick={onClose} className="absolute left-4 top-4 grid size-10 place-items-center rounded-full bg-[#f5f5f7] text-[#1d1d1f]">
                <X size={17} />
              </button>

              <div className="mb-7 pt-8 text-center">
                <span className="mx-auto grid size-16 place-items-center rounded-[24px] bg-[#1d1d1f] text-white">
                  <LockKeyhole size={25} />
                </span>
                <h2 className="mt-5 text-3xl font-black tracking-[-0.05em] text-[#1d1d1f]">ورود سریع</h2>
                <p className="mt-2 text-sm font-bold text-[#6e6e73]">برای ذخیره دوره و داشبورد کلاس.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-xs font-black text-[#1d1d1f]"><UserRound size={14} /> نام کامل</span>
                  <input value={name} onChange={(event) => setName(event.target.value)} className="apple-field" placeholder="نام و نام خانوادگی" />
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-xs font-black text-[#1d1d1f]"><Phone size={14} /> شماره موبایل</span>
                  <input value={phone} onChange={(event) => setPhone(event.target.value.replace(/\D/g, ''))} className="apple-field text-left tracking-wider" placeholder="9123456789" dir="ltr" />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-black text-[#1d1d1f]">ایمیل اختیاری</span>
                  <input value={email} onChange={(event) => setEmail(event.target.value)} className="apple-field text-left" placeholder="name@mail.com" dir="ltr" />
                </label>

                {error && <p className="rounded-2xl bg-rose-50 px-4 py-3 text-xs font-black text-rose-600">{error}</p>}

                <button type="submit" disabled={isSubmitting} className="apple-button-primary h-12 w-full disabled:opacity-70">
                  {isSubmitting ? 'در حال ورود...' : 'ورود و ادامه'}
                  {!isSubmitting && <ArrowLeft size={16} />}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

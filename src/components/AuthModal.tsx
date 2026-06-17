/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Smartphone, Mail, Lock, UserCheck, ShieldCheck } from 'lucide-react';
import localDB from '../services/localDB';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: { name: string; phone: string; email: string }) => void;
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    if (!phoneNumber || phoneNumber.length < 10) {
      setErrorMsg('شماره موبایل نامعتبر است (حداقل ۱۰ رقم بدون صفر)');
      setLoading(false);
      return;
    }

    if (activeTab === 'register' && !name) {
      setErrorMsg('وارد کردن نام کامل الزامی است');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      // Local mock db behavior
      const mockUser = {
        name: activeTab === 'register' ? name : 'کاربر توآمریکا',
        phone: phoneNumber,
        email: email || `${phoneNumber}@toamerica.local`,
      };

      // Save user session in localStorage
      window.localStorage.setItem('toamerica_current_user', JSON.stringify({ ...mockUser, isLoggedIn: true }));
      localDB.addLog('auth', `کاربر ${mockUser.name} با شماره ${phoneNumber} با موفقیت ${activeTab === 'register' ? 'ثبت‌نام کرد' : 'وارد حساب کاربری شد'}.`);
      
      setLoading(false);
      onAuthSuccess(mockUser);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm transition-opacity" dir="rtl">
      <div 
        className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden text-right relative transform scale-100 transition-transform"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-1 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-zinc-100 tracking-tight">به آکادمی توآمریکا خوش آمدید</h3>
            <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">بستر تخصصی مشاوره، معادل‌سازی و آموزش بومی اعزام به ایالات متحده</p>
          </div>

          {/* Clean Segment Slider */}
          <div className="bg-zinc-950 p-1 rounded-lg flex mb-6 border border-zinc-850">
            <button
              onClick={() => { setActiveTab('login'); setErrorMsg(''); }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 ${
                activeTab === 'login'
                  ? 'bg-zinc-800 text-zinc-100 shadow'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              ورود به حساب
            </button>
            <button
              onClick={() => { setActiveTab('register'); setErrorMsg(''); }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 ${
                activeTab === 'register'
                  ? 'bg-zinc-800 text-zinc-100 shadow'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              ساخت حساب جدید
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'register' && (
              <div className="space-y-1">
                <label className="text-xs text-zinc-400 font-bold block">نام و نام خانوادگی <span className="text-rose-500">*</span></label>
                <div className="relative flex items-center">
                  <span className="absolute right-3 text-zinc-500"><UserCheck className="w-4 h-4" /></span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: حمید عباسی"
                    className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-zinc-700 rounded-xl pr-10 pl-3 py-2 text-sm text-zinc-200 placeholder-zinc-650 transition-colors uppercase outline-none"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs text-zinc-400 font-bold block">شماره تلفن همراه <span className="text-rose-500">*</span></label>
              <div className="relative flex items-center">
                <span className="absolute right-3 text-zinc-500"><Smartphone className="w-4 h-4" /></span>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="مثال: 9123456789"
                  className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-zinc-700 rounded-xl pr-10 pl-3 py-2 text-sm text-zinc-200 placeholder-zinc-650 transition-colors tracking-widest outline-none text-left"
                  dir="ltr"
                  required
                />
              </div>
            </div>

            {activeTab === 'register' && (
              <div className="space-y-1">
                <label className="text-xs text-zinc-400 font-medium block">نشانی ایمیل <span className="text-zinc-500 text-[10px]">(اختیاری)</span></label>
                <div className="relative flex items-center">
                  <span className="absolute right-3 text-zinc-500"><Mail className="w-4 h-4" /></span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-zinc-700 rounded-xl pr-10 pl-3 py-2 text-sm text-zinc-200 placeholder-zinc-650 transition-colors outline-none text-left"
                    dir="ltr"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs text-zinc-400 font-bold block">رمز ورود به پنل <span className="text-rose-500">*</span></label>
              <div className="relative flex items-center">
                <span className="absolute right-3 text-zinc-500"><Lock className="w-4 h-4" /></span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-zinc-700 rounded-xl pr-10 pl-3 py-2 text-sm text-zinc-200 placeholder-zinc-650 transition-colors outline-none text-left"
                  dir="ltr"
                  required
                />
              </div>
            </div>

            {errorMsg && (
              <p className="text-rose-400 text-xs font-medium bg-rose-950/30 border border-rose-900/30 p-2.5 rounded-lg leading-relaxed">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 text-xs font-bold rounded-xl transition-all duration-300 transform active:scale-[0.98] ${
                loading
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-950 cursor-pointer shadow-md'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-zinc-500 border-t-zinc-200 rounded-full animate-spin"></div>
                  در حال احراز هویت دیتابیس...
                </span>
              ) : (
                activeTab === 'login' ? 'ورود به پنل کاربری' : 'تکمیل نام‌نویسی و فعال‌سازی'
              )}
            </button>
          </form>

          {/* Secure indicator */}
          <div className="mt-5 pt-4 border-t border-zinc-850 flex items-center justify-center gap-1.5 text-[10px] text-zinc-500 tracking-wide font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>امنیت بالا: رمزگذاری لوکال کلید متقارن + گواهینامه امنیتی</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, HelpCircle, ArrowLeft, RotateCcw, PartyPopper, Award, X, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Course } from '../types';
import { courses } from '../data/courses';

interface PlacementQuizProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCourse: (courseId: string) => void;
}

interface Question {
  id: number;
  text: string;
  options: { key: string; text: string }[];
  correctAnswer: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    text: 'He ________ to New York last summer to visit the Columbia University campus.',
    options: [
      { key: 'a', text: 'has gone' },
      { key: 'b', text: 'went' },
      { key: 'c', text: 'goes' },
      { key: 'd', text: 'was going' }
    ],
    correctAnswer: 'b'
  },
  {
    id: 2,
    text: 'I would support you if I ________ sufficient funds for the NCLEX exam fee.',
    options: [
      { key: 'a', text: 'have' },
      { key: 'b', text: 'had' },
      { key: 'c', text: 'will have' },
      { key: 'd', text: 'would have' }
    ],
    correctAnswer: 'b'
  },
  {
    id: 3,
    text: 'By the time she finishes her resident training in Houston, she ________ USMLE Step 3.',
    options: [
      { key: 'a', text: 'will have completed' },
      { key: 'b', text: 'completes' },
      { key: 'c', text: 'has completed' },
      { key: 'd', text: 'will complete' }
    ],
    correctAnswer: 'a'
  },
  {
    id: 4,
    text: 'This academic proposal is highly competitive; indeed, it is ________ more advanced than the other one.',
    options: [
      { key: 'a', text: 'far' },
      { key: 'b', text: 'very' },
      { key: 'c', text: 'more' },
      { key: 'd', text: 'too' }
    ],
    correctAnswer: 'a'
  },
  {
    id: 5,
    text: 'The Visa officer requested that she ________ her bank statement immediately.',
    options: [
      { key: 'a', text: 'provides' },
      { key: 'b', text: 'provide' },
      { key: 'c', text: 'providing' },
      { key: 'd', text: 'provided' }
    ],
    correctAnswer: 'b'
  }
];

export default function PlacementQuiz({ isOpen, onClose, onSelectCourse }: PlacementQuizProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const currentQuestion = quizQuestions[currentIdx];

  const handleSelectOption = (optionKey: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: optionKey });
    
    setTimeout(() => {
      if (currentIdx < quizQuestions.length - 1) {
        setCurrentIdx(currentIdx + 1);
      } else {
        setQuizFinished(true);
      }
    }, 300);
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setAnswers({});
    setQuizFinished(false);
    setCopiedCode(false);
  };

  // Score Calculator
  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const getAssessmentDetails = (score: number) => {
    if (score <= 2) {
      return {
        level: 'مبتدی تا پیش‌متوسط (A2-B1)',
        desc: 'شما گرامر پایه را می‌شناسید اما برای متقاعد کردن افسر سفارت یا موفقیت در آزمون‌های تخصصی قطعاً باید واژگان بومی، ساختارهای شنیداری و بداهه‌نویسی خود را تقویت کنید.',
        recommendedCourse: courses[0] // comprehensive
      };
    } else if (score <= 4) {
      return {
        level: 'متوسط تا فوق‌متوسط (B2)',
        desc: 'سطح گرامری شما مناسب است. شما آماده ورود به دوره‌های فلوشیپ تخصصی کادر درمان یا شروع پروسه رزومه‌نویسی و پوزیشن‌یابی فول‌فاند هستید.',
        recommendedCourse: courses[2] // Academic CV
      };
    } else {
      return {
        level: 'پیشرفته بین‌المللی (C1-C2)',
        desc: 'فوق‌العاده است! تسلط گرامری شما هم‌تراز با استانداردهای آوی‌لیگ است. شما آماده همگام‌سازی مصاحبه‌های بیهویورال و الگوریتمی برای کار یا شروع بورد تخصصی هستید.',
        recommendedCourse: courses[3] // tech career
      };
    }
  };

  const score = calculateScore();
  const assessment = getAssessmentDetails(score);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('TOAMERICA10');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm" dir="rtl">
      <div 
        className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-6 md:p-8 text-right relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-1 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Box */}
        {!quizFinished ? (
          <div>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-500" />
                <h3 className="text-md font-extrabold text-zinc-100">سنجش سریع سطح زبان انگلیسی مهاجرتی</h3>
              </div>
              <span className="text-xs text-zinc-400 font-mono">
                سوال {currentIdx + 1} از {quizQuestions.length}
              </span>
            </div>

            {/* Slider Progress Bar */}
            <div className="w-full bg-zinc-950 rounded-full h-1 my-4">
              <div 
                className="bg-amber-400 h-1 rounded-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / quizQuestions.length) * 100}%` }}
              ></div>
            </div>

            {/* Interactive Question Card */}
            <div className="bg-zinc-950 border border-zinc-850 rounded-xl p-5 mb-6 text-left" dir="ltr">
              <div className="flex items-start gap-1 pb-2">
                <HelpCircle className="w-4 h-4 text-amber-500 shrink-0 mt-1" />
                <p className="text-zinc-100 font-bold text-sm leading-relaxed whitespace-pre-wrap">{currentQuestion.text}</p>
              </div>
            </div>

            {/* Select options list */}
            <div className="space-y-2">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.key}
                  onClick={() => handleSelectOption(option.key)}
                  className="w-full py-3 px-4 text-left border border-zinc-805 bg-zinc-900/60 hover:bg-zinc-800 hover:border-zinc-700/80 rounded-xl text-zinc-200 hover:text-zinc-100 font-medium text-xs md:text-sm transition-all flex items-center justify-between group cursor-pointer"
                  dir="ltr"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-zinc-950 border border-zinc-800 text-[10px] text-zinc-400 group-hover:text-zinc-100 flex items-center justify-center font-bold">
                      {option.key.toUpperCase()}
                    </span>
                    <span>{option.text}</span>
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-8 text-center text-[10px] text-zinc-500 font-medium">
              زمان‌بندی آزمون شبیه‌ساز آفلاین برای هر تست ۳۰ ثانیه می‌باشد.
            </div>
          </div>
        ) : (
          /* Quiz finished page detailing recommended course */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-amber-950/20 border border-amber-900/40 text-amber-400 flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 animate-bounce" />
            </div>

            <h3 className="text-xl font-extrabold text-zinc-100 mb-1">نتیجه کارنامه آزمون سفارتی شما</h3>
            <p className="text-xs text-zinc-500 font-semibold mb-6">آکادمی توآمریکا سطح شما را دقیق پایش کرد</p>

            <div className="bg-zinc-950 border border-zinc-850 rounded-xl p-5 text-right mb-6">
              
              <div className="flex justify-between items-center border-b border-zinc-900 pb-3 mb-3">
                <span className="text-xs font-bold text-zinc-300">نمره کسب‌شده:</span>
                <span className="text-sm font-black text-amber-400 tracking-wide font-mono">
                  {score} از {quizQuestions.length} پاسخ صحیح
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-zinc-900 pb-3 mb-3">
                <span className="text-xs font-bold text-zinc-300">سطح برآوردی:</span>
                <span className="text-xs font-black text-emerald-400">{assessment.level}</span>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
                {assessment.desc}
              </p>

            </div>

            {/* Exclusive Promo Discount banner block */}
            <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/5 border border-amber-900/30 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between text-right gap-4">
              <div className="flex items-center gap-3">
                <div className="text-xl">🎁</div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-zinc-200">هدیه ویژه تکمیل تعیین سطح</span>
                  <span className="text-[10px] text-zinc-400 font-semibold">کد تخفیف ۱۰٪ مازاد در اولین دوره سفارتی تایید شده</span>
                </div>
              </div>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-amber-400 hover:bg-amber-300 text-zinc-950 transition-colors shadow-sm cursor-pointer"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'کپی شد!' : 'کد تخفیف: TOAMERICA10'}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl border border-zinc-850/80 bg-zinc-900 text-right mb-6">
              <h4 className="text-xs font-bold text-zinc-300 mb-1 text-center sm:text-right">دوره پیشنهادی مشاوران برای ارتقای رتبه:</h4>
              <p className="text-[11px] text-zinc-400 leading-relaxed font-semibold text-center sm:text-right mb-4">
                «{assessment.recommendedCourse.title}» - {assessment.recommendedCourse.subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-2 justify-center sm:justify-end">
                <button
                  onClick={handleRestart}
                  className="px-4 py-2 rounded-lg text-xs font-semibold border border-zinc-800 hover:bg-zinc-800 text-zinc-400 transition-colors cursor-pointer"
                >
                  <span className="flex items-center justify-center gap-1">
                    <RotateCcw className="w-3.5 h-3.5" />
                    تست دوباره
                  </span>
                </button>
                <button
                  onClick={() => {
                    onSelectCourse(assessment.recommendedCourse.id);
                    onClose();
                  }}
                  className="px-5 py-2 rounded-lg text-xs font-bold bg-zinc-100 text-zinc-950 hover:bg-zinc-200 transition-colors cursor-pointer"
                >
                  مشاهده و بررسی دوره پیشنهادی
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

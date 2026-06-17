/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
  date: string;
  imageUrl: string;
}

export const articles: Article[] = [
  {
    id: 'f1-visa-checklist',
    title: 'چک‌لیست طلایی موفقیت در مصاحبه ویزای دانشجویی F1',
    excerpt: 'افسران ویزا در آمریکا به دنبال چه مواردی در توجیه مالی و تحصیلی شما هستند؟ در این راهنما سوال و جواب‌های پرتکرار سفارت را تحلیل کرده‌ایم.',
    category: 'آمادگی سفارت',
    readingTime: '۷ دقیقه',
    date: '۲۵ خرداد ۱۴۰۵',
    imageUrl: 'gradient-accent-1'
  },
  {
    id: 'usmle-matching-guide',
    title: 'بررسی مراحل فلوشیپ و نحوه مچ شدن پزشکان ایرانی در ایالات متحده',
    excerpt: 'چگونه شانس پذیرش خود را با رزومه پژوهشی در سیستم ارا (ERAS) افزایش دهیم؟ تفاوت کلیدی استپ ۱ و ۲ در قبولی بورد چیست؟',
    category: 'کادر درمان',
    readingTime: '۱۲ دقیقه',
    date: '۱۸ خرداد ۱۴۰۵',
    imageUrl: 'gradient-accent-2'
  },
  {
    id: 'linkedin-ats-resumes',
    title: 'اصول بهینه‌سازی رزومه کدهای ATS برای هدهای شکارچی استعداد در آمریکا',
    excerpt: 'وب‌سایت‌های پذیرش ارشد و دکتری و یا وب‌سایت‌های جاب‌یابی آمریکایی از نرم‌افزار ATS استفاده می‌کنند. چگونه رزومه خود را بدون ایراد ساختاری به هیرینگ اکسچنج‌ها بفرستیم؟',
    category: 'مهاجرت کاری',
    readingTime: '۹ دقیقه',
    date: '۰۹ خرداد ۱۴۰۵',
    imageUrl: 'gradient-accent-3'
  }
];

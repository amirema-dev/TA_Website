/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Instructor {
  id: string;
  name: string;
  role: string;
  bio: string;
  experience: string;
  imageUrl: string;
  badge: string;
}

export const instructors: Instructor[] = [
  {
    id: 'instructor-1',
    name: 'دکتر آرش رادان',
    role: 'منتور ارشد معادل‌سازی مدرک پزشکی و USMLE',
    bio: 'رزیدنت پاتولوژی هاسپیتال ارشد هیوستون تگزاس، رتبه ممتاز آزمون استپ ۱ و ۲ با انطباق کامل.',
    experience: '۹ سال سابقه تدریس تخصصی',
    imageUrl: 'arash',
    badge: 'Houston, TX'
  },
  {
    id: 'instructor-2',
    name: 'مهندس نیلوفر آوان',
    role: 'مدرس آمادگی مصاحبه‌های مهندسی سیلیکون‌ولی',
    bio: 'سابقا مهندس ارشد نرم‌افزار گوگل در کالیفرنیا، طراح و مصاحبه‌کننده فعال در شرکت‌های تک آمریکا.',
    experience: '۸ سال سابقه لیدینگ فنی',
    imageUrl: 'niloofar',
    badge: 'San Jose, CA'
  },
  {
    id: 'instructor-3',
    name: 'استاد مریم سعادت',
    role: 'مدرس ممتاز دوره جامع و گفتگوی روان سفارتی',
    bio: 'کارشناس ارشد زبانشناسی از دانشگاه تهران، طراح متدولوژی موفقیت در مصاحبه‌های ویزای تحصیلی و توریستی.',
    experience: '۱۲ سال سابقه تدریس بین‌المللی',
    imageUrl: 'maryam',
    badge: 'Ex-Embassy Coach'
  },
  {
    id: 'instructor-4',
    name: 'دکتر علیرضا توکلی',
    role: 'مشاور ارشد پذیرش‌های آکادمیک و فاند دانشجویی',
    bio: 'فارغ‌التحصیل دکترای مهندسی مکانیک از دانشگاه استنفورد، برنده فاند طلایی ناسا و همکار پژوهشی کلتک.',
    experience: '۱۰ سال منتورینگ پذیرش',
    imageUrl: 'alireza',
    badge: 'Stanford Alumnus'
  }
];

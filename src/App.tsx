/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Courses from './components/Courses';
import BentoMethodology from './components/BentoMethodology';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import ConsultingForm from './components/ConsultingForm';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import PlacementQuiz from './components/PlacementQuiz';
import Dashboard from './components/Dashboard';
import CourseDetailModal from './components/CourseDetailModal';
import localDB from './services/localDB';
import { Course } from './types';
import { courses } from './data/courses';

type AppUser = {
  name: string;
  email: string;
  phone: string;
};

export default function App() {
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const stored = window.localStorage.getItem('toamerica_current_user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed?.isLoggedIn) {
          setCurrentUser({ name: parsed.name, email: parsed.email, phone: parsed.phone });
        }
      } catch (error) {
        console.error('Error parsing user session:', error);
      }
    }

    setEnrolledCourseIds(localDB.getEnrolledCourses());

    const handleDBUpdate = () => setEnrolledCourseIds(localDB.getEnrolledCourses());
    window.addEventListener('toamerica-db-update', handleDBUpdate);

    return () => window.removeEventListener('toamerica-db-update', handleDBUpdate);
  }, []);

  const handleAuthSuccess = (user: AppUser) => {
    setCurrentUser(user);
    localDB.triggerBackgroundSync();
  };

  const handleLogout = () => {
    window.localStorage.removeItem('toamerica_current_user');
    setCurrentUser(null);
    localDB.addLog('auth', 'کاربر با موفقیت از حساب کاربری خارج شد.');
  };

  const handleEnrollInCourse = (course: Course) => {
    if (!currentUser) {
      setIsAuthOpen(true);
      localDB.addLog('auth', `تلاش جهت ثبت‌نام در دوره "${course.title}". انتقال به احراز هویت.`);
      return;
    }

    const success = localDB.enrollInCourse(course.id, course.title);
    if (success) setEnrolledCourseIds(localDB.getEnrolledCourses());
    setIsDashboardOpen(true);
  };

  const handleSelectCourseFromQuiz = (courseId: string) => {
    const course = courses.find((item) => item.id === courseId);
    if (course) handleEnrollInCourse(course);
  };

  const scrollToConsulting = () => {
    document.getElementById('consulting-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] selection:bg-blue-100 selection:text-blue-800">
      <Header
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        hasEnrolledCourses={enrolledCourseIds.length > 0}
      />

      <main>
        <Hero onOpenConsulting={scrollToConsulting} />
        <BentoMethodology />
        <Courses
          enrolledCourseIds={enrolledCourseIds}
          onEnroll={handleEnrollInCourse}
          currentUser={currentUser}
          onExploreCourse={setSelectedCourse}
        />
        <ConsultingForm />
        <Testimonials />
        <FAQ />
      </main>

      <Footer />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <PlacementQuiz
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectCourse={handleSelectCourseFromQuiz}
      />

      <Dashboard
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        enrolledCourseIds={enrolledCourseIds}
      />

      <CourseDetailModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onEnroll={(course) => {
          handleEnrollInCourse(course);
          setSelectedCourse(null);
        }}
        isEnrolled={selectedCourse ? enrolledCourseIds.includes(selectedCourse.id) : false}
      />
    </div>
  );
}

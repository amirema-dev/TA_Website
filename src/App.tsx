/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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

export default function App() {
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; phone: string } | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // On page load, retrieve current user session and enrolled courses
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('toamerica_current_user');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.isLoggedIn) {
            setCurrentUser({ name: parsed.name, email: parsed.email, phone: parsed.phone });
          }
        } catch (e) {
          console.error('Error parsing user session:', e);
        }
      }

      setEnrolledCourseIds(localDB.getEnrolledCourses());
    }

    // Add event listener for global db changes (like enrollments from other panels)
    const handleDBUpdate = () => {
      setEnrolledCourseIds(localDB.getEnrolledCourses());
    };
    window.addEventListener('toamerica-db-update', handleDBUpdate);

    return () => {
      window.removeEventListener('toamerica-db-update', handleDBUpdate);
    };
  }, []);

  const handleAuthSuccess = (user: { name: string; phone: string; email: string }) => {
    setCurrentUser(user);
    // Automatically trigger background sync to fetch user's synced courses or data
    localDB.triggerBackgroundSync();
  };

  const handleLogout = () => {
    window.localStorage.removeItem('toamerica_current_user');
    setCurrentUser(null);
    localDB.addLog('auth', 'کاربر با موفقیت از حساب کاربری خارج شد.');
  };

  const handleEnrollInCourse = (course: Course) => {
    if (!currentUser) {
      // If not logged in, trigger auth popup first
      setIsAuthOpen(true);
      localDB.addLog('auth', `تلاش جهت ثبت‌نام در دوره "${course.title}". انتقال به صفحه احراز هویت دیتابیس.`);
      return;
    }

    const success = localDB.enrollInCourse(course.id, course.title);
    if (success) {
      setEnrolledCourseIds(localDB.getEnrolledCourses());
      // Prompt user to directly open their classes panel
      setIsDashboardOpen(true);
    } else {
      // Already enrolled, just open classroom dashboard
      setIsDashboardOpen(true);
    }
  };

  const handleSelectCourseFromQuiz = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (course) {
      handleEnrollInCourse(course);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900" dir="rtl">
      
      {/* Corporate Apple-Style Nav Header */}
      <Header
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        hasEnrolledCourses={enrolledCourseIds.length > 0}
      />

      {/* Main Sections Body */}
      <main className="flex-1">
        
        {/* Majestic Hero Banner + Video aspect Section */}
        <Hero onOpenConsulting={() => {
          const element = document.getElementById('consulting-section');
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }} />

        {/* 2x2 Bento value methodology card grid */}
        <BentoMethodology />

        {/* Courses Section List */}
        <Courses
          enrolledCourseIds={enrolledCourseIds}
          onEnroll={handleEnrollInCourse}
          currentUser={currentUser}
          onExploreCourse={(course) => setSelectedCourse(course)}
        />

        {/* Success story reviews card slider */}
        <Testimonials />

        {/* Advisory Form Section */}
        <ConsultingForm />

        {/* Collapsible FAQ sections */}
        <FAQ />

      </main>

      {/* Sleek footer section */}
      <Footer />

      {/* Overlay Modals Dialogs */}
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
        isOpen={selectedCourse !== null}
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

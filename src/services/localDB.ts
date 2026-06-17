/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ConsultationRequest, SyncLog, User } from '../types';

class LocalDBService {
  private readonly CON_KEY = 'toamerica_consultations';
  private readonly ENROLLED_KEY = 'toamerica_enrolled_courses';
  private readonly LOGS_KEY = 'toamerica_sync_logs';
  private readonly CURRENT_USER_KEY = 'toamerica_current_user';
  private readonly ONLINE_SIM_KEY = 'toamerica_simulated_online';

  constructor() {
    if (typeof window !== 'undefined') {
      if (window.localStorage.getItem(this.ONLINE_SIM_KEY) === null) {
        window.localStorage.setItem(this.ONLINE_SIM_KEY, 'true');
      }
    }
  }

  // Connectivity Simulator
  isOnlineSimulated(): boolean {
    if (typeof window === 'undefined') return true;
    return window.localStorage.getItem(this.ONLINE_SIM_KEY) === 'true';
  }

  setOnlineSimulated(status: boolean): void {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(this.ONLINE_SIM_KEY, String(status));
    this.addLog(
      status ? 'auth' : 'auth',
      `وضعیت شبکه شبیه‌سازی‌شده: ${status ? 'آنلاین' : 'آفلاین'}`
    );
    if (status) {
      this.triggerBackgroundSync();
    }
  }

  // Sync Log Manager
  getLogs(): SyncLog[] {
    if (typeof window === 'undefined') return [];
    const logs = window.localStorage.getItem(this.LOGS_KEY);
    return logs ? JSON.parse(logs) : [];
  }

  addLog(type: SyncLog['type'], message: string): void {
    const logs = this.getLogs();
    const newLog: SyncLog = {
      id: Math.random().toString(36).substring(7),
      type,
      status: this.isOnlineSimulated() ? 'synced' : 'queued',
      message,
      timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    window.localStorage.setItem(this.LOGS_KEY, JSON.stringify([newLog, ...logs].slice(0, 50)));
    // Dispatch global event for UI reactivity
    window.dispatchEvent(new Event('toamerica-db-update'));
  }

  clearLogs(): void {
    window.localStorage.setItem(this.LOGS_KEY, JSON.stringify([]));
    window.dispatchEvent(new Event('toamerica-db-update'));
  }

  // Consultation Submissions (Offline-first approach)
  getConsultations(): ConsultationRequest[] {
    if (typeof window === 'undefined') return [];
    const items = window.localStorage.getItem(this.CON_KEY);
    return items ? JSON.parse(items) : [];
  }

  submitConsultation(request: Omit<ConsultationRequest, 'id' | 'submittedAt' | 'isSynced'>): ConsultationRequest {
    const consultations = this.getConsultations();
    const isOnline = this.isOnlineSimulated();
    const newRequest: ConsultationRequest = {
      ...request,
      id: 'con_' + Math.random().toString(36).substring(7),
      submittedAt: new Date().toLocaleDateString('fa-IR') + ' ' + new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
      isSynced: isOnline
    };

    window.localStorage.setItem(this.CON_KEY, JSON.stringify([newRequest, ...consultations]));
    
    if (isOnline) {
      this.addLog('consultation', `درخواست مشاوره برای ${newRequest.name} به سرور ارسال و همگام‌سازی شد.`);
    } else {
      this.addLog('consultation', `درخواست مشاوره برای ${newRequest.name} در حافظه موقت (صف همگام‌سازی آفلاین) ذخیره شد.`);
    }

    return newRequest;
  }

  // Enrolled Courses Manager
  getEnrolledCourses(): string[] {
    if (typeof window === 'undefined') return [];
    const enrolled = window.localStorage.getItem(this.ENROLLED_KEY);
    return enrolled ? JSON.parse(enrolled) : [];
  }

  enrollInCourse(courseId: string, courseTitle: string): boolean {
    const enrolled = this.getEnrolledCourses();
    if (enrolled.includes(courseId)) {
      return false; // Already enrolled
    }

    const updated = [...enrolled, courseId];
    window.localStorage.setItem(this.ENROLLED_KEY, JSON.stringify(updated));
    const isOnline = this.isOnlineSimulated();

    this.addLog(
      'enrollment',
      isOnline 
        ? `ثبت نام در دوره "${courseTitle}" با موفقیت ثبت و بر روی شبکه هماهنگ شد.` 
        : `ثبت نام در دوره "${courseTitle}" به صورت آفلاین ذخیره شد و دسترسی به ویدیوها فعال گردید.`
    );
    return true;
  }

  unenrollInCourse(courseId: string): void {
    const enrolled = this.getEnrolledCourses();
    const updated = enrolled.filter(id => id !== courseId);
    window.localStorage.setItem(this.ENROLLED_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('toamerica-db-update'));
  }

  // Background Sync triggers automatically when Simulated Network changes to green (Online)
  triggerBackgroundSync(): void {
    let changed = false;

    // 1. Sync pending consultations
    const consultations = this.getConsultations();
    const updatedConsultations = consultations.map(c => {
      if (!c.isSynced) {
        c.isSynced = true;
        changed = true;
        this.addLog('consultation', `درخواست مشاوره [شناسه: ${c.id}] با موفقیت به سرور ابری همگام‌سازی شد.`);
      }
      return c;
    });

    if (changed) {
      window.localStorage.setItem(this.CON_KEY, JSON.stringify(updatedConsultations));
      this.addLog('auth', 'همگام‌سازی پس‌زمینه با موفقیت در شرایط اتصال پایدار انجام شد.');
      window.dispatchEvent(new Event('toamerica-db-update'));
    }
  }

  // Active Offline Simulation Metrics
  getStorageMetrics() {
    if (typeof window === 'undefined') return { usedBytes: 0, percentage: 0 };
    let totalSize = 0;
    for (const key in window.localStorage) {
      if (window.localStorage.hasOwnProperty(key)) {
        totalSize += (key.length + (window.localStorage.getItem(key)?.length || 0)) * 2; // UTF-16 characters = 2 bytes
      }
    }
    const maxQuota = 5 * 1024 * 1024; // Average localStorage quota is 5MB
    return {
      usedBytes: totalSize,
      formattedUsed: (totalSize / 1024).toFixed(2) + ' KB',
      percentage: Math.min((totalSize / maxQuota) * 100, 100)
    };
  }
}

export const localDB = new LocalDBService();
export default localDB;

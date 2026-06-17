/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  isLoggedIn: boolean;
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  level: 'مبتدی' | 'متوسط' | 'پیشرفته' | 'همه سطوح';
  rating: number;
  studentsCount: number;
  originalPrice: number;
  discountedPrice: number;
  description: string;
  benefits: string[];
  duration: string;
  imageUrl: string;
}

export interface ConsultationRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  pathway: 'study' | 'work' | 'medical' | 'other';
  englishLevel: string;
  submittedAt: string;
  isSynced: boolean;
}

export interface SyncLog {
  id: string;
  type: 'enrollment' | 'consultation' | 'auth';
  status: 'queued' | 'synced';
  message: string;
  timestamp: string;
}

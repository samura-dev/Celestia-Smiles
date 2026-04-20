import type { SdCategoryId, SdSpecialist } from '../data/sd_specialists';

export type SdCabinetSectionId =
  | 'dashboard'
  | 'appointments'
  | 'booking'
  | 'finances'
  | 'treatment'
  | 'documents'
  | 'notifications'
  | 'settings';

export type SdCabinetTransactionType = 'topup' | 'payment' | 'refund' | 'bonus';
export type SdCabinetAppointmentStatus = 'scheduled' | 'completed' | 'cancelled';
export type SdCabinetDocumentStatus = 'signed' | 'pending' | 'archived';

export interface SdCabinetDirection {
  id: string;
  title: string;
  description: string;
  canonicalId: SdCategoryId | 'orthopedics';
}

export interface SdCabinetSession {
  userId: string;
  email: string;
  fullName: string;
  createdAt: string;
}

export interface SdCabinetAppointment {
  id: string;
  userId: string;
  directionId: string;
  directionTitle: string;
  doctorId: number;
  doctorName: string;
  doctorRole: string;
  date: string;
  time: string;
  status: SdCabinetAppointmentStatus;
  clinicAddress: string;
  cabinet: string;
  notes?: string;
  durationMinutes: number;
  estimatedPrice: number;
  createdAt: string;
}

export interface SdCabinetTransaction {
  id: string;
  userId: string;
  type: SdCabinetTransactionType;
  title: string;
  description: string;
  amount: number;
  createdAt: string;
}

export interface SdCabinetTreatmentPlanItem {
  id: string;
  userId: string;
  title: string;
  stage: string;
  status: 'planned' | 'in_progress' | 'completed';
  progress: number;
  doctorName: string;
  dateLabel: string;
  note: string;
}

export interface SdCabinetDocument {
  id: string;
  userId: string;
  title: string;
  type: string;
  status: SdCabinetDocumentStatus;
  issuedAt: string;
  summary: string;
}

export interface SdCabinetNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface SdCabinetProfile {
  fullName: string;
  phone: string;
  email: string;
  birthDate: string;
  city: string;
  emergencyContact: string;
  loyaltyLevel: string;
  balance: number;
  bonusBalance: number;
  totalVisits: number;
  favoriteDoctorId?: number;
}

export interface SdCabinetUser {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  password: string;
  createdAt: string;
  profile: SdCabinetProfile;
  appointments: SdCabinetAppointment[];
  transactions: SdCabinetTransaction[];
  treatmentPlan: SdCabinetTreatmentPlanItem[];
  documents: SdCabinetDocument[];
  notifications: SdCabinetNotification[];
}

export interface SdCabinetAuthPayload {
  fullName: string;
  phone: string;
  email: string;
  password: string;
}

export interface SdCabinetLoginPayload {
  email: string;
  password: string;
}

export interface SdCabinetBookingPayload {
  directionId: string;
  directionTitle: string;
  doctor: SdSpecialist;
  date: string;
  time: string;
  notes?: string;
}

export interface SdCabinetProfileUpdatePayload {
  fullName: string;
  phone: string;
  birthDate: string;
  city: string;
  emergencyContact: string;
}

export interface SdCabinetReschedulePayload {
  date: string;
  time: string;
  notes?: string;
}

export interface SdCabinetStorageSnapshot {
  users: SdCabinetUser[];
  session: SdCabinetSession | null;
}

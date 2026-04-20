import { create } from 'zustand';
import {
  sd_addCabinetTopup,
  sd_cancelCabinetAppointment,
  sd_createCabinetAppointment,
  sd_findCabinetUserBySession,
  sd_getCabinetSnapshot,
  sd_loginCabinetUser,
  sd_logoutCabinetUser,
  sd_markCabinetNotificationRead,
  sd_repeatCabinetAppointment,
  sd_registerCabinetUser,
  sd_rescheduleCabinetAppointment,
  sd_updateCabinetProfile,
} from '../cabinet/sd_cabinetStorage';
import type {
  SdCabinetAuthPayload,
  SdCabinetBookingPayload,
  SdCabinetLoginPayload,
  SdCabinetProfileUpdatePayload,
  SdCabinetReschedulePayload,
  SdCabinetSectionId,
  SdCabinetSession,
  SdCabinetUser,
} from '../cabinet/sd_cabinetTypes';

interface SdCabinetStoreState {
  sd_user: SdCabinetUser | null;
  sd_session: SdCabinetSession | null;
  sd_activeSection: SdCabinetSectionId;
  sd_isHydrated: boolean;
  sd_isBusy: boolean;
  sd_error: string | null;
  sd_hydrateCabinet: () => void;
  sd_setActiveSection: (section: SdCabinetSectionId) => void;
  sd_clearError: () => void;
  sd_register: (payload: SdCabinetAuthPayload) => void;
  sd_login: (payload: SdCabinetLoginPayload) => void;
  sd_logout: () => void;
  sd_updateProfile: (payload: SdCabinetProfileUpdatePayload) => void;
  sd_createAppointment: (payload: SdCabinetBookingPayload) => void;
  sd_cancelAppointment: (appointmentId: string) => void;
  sd_rescheduleAppointment: (appointmentId: string, payload: SdCabinetReschedulePayload) => void;
  sd_repeatAppointment: (appointmentId: string) => void;
  sd_addTopup: (amount: number) => void;
  sd_markNotificationRead: (notificationId: string) => void;
}

const sd_resolveSnapshot = () => {
  const snapshot = sd_getCabinetSnapshot();
  return {
    session: snapshot.session,
    user: sd_findCabinetUserBySession(snapshot),
  };
};

export const useSdCabinetStore = create<SdCabinetStoreState>((set, get) => ({
  sd_user: null,
  sd_session: null,
  sd_activeSection: 'dashboard',
  sd_isHydrated: false,
  sd_isBusy: false,
  sd_error: null,

  sd_hydrateCabinet: () => {
    const { session, user } = sd_resolveSnapshot();
    set({
      sd_session: session,
      sd_user: user,
      sd_isHydrated: true,
      sd_error: null,
    });
  },

  sd_setActiveSection: (section) => set({ sd_activeSection: section }),
  sd_clearError: () => set({ sd_error: null }),

  sd_register: (payload) => {
    try {
      set({ sd_isBusy: true, sd_error: null });
      const { user, session } = sd_registerCabinetUser(payload);
      set({
        sd_user: user,
        sd_session: session,
        sd_activeSection: 'dashboard',
        sd_isBusy: false,
      });
    } catch (error) {
      set({
        sd_error: error instanceof Error ? error.message : 'Не удалось создать кабинет.',
        sd_isBusy: false,
      });
    }
  },

  sd_login: (payload) => {
    try {
      set({ sd_isBusy: true, sd_error: null });
      const { user, session } = sd_loginCabinetUser(payload);
      set({
        sd_user: user,
        sd_session: session,
        sd_activeSection: 'dashboard',
        sd_isBusy: false,
      });
    } catch (error) {
      set({
        sd_error: error instanceof Error ? error.message : 'Не удалось выполнить вход.',
        sd_isBusy: false,
      });
    }
  },

  sd_logout: () => {
    sd_logoutCabinetUser();
    set({
      sd_user: null,
      sd_session: null,
      sd_activeSection: 'dashboard',
      sd_error: null,
    });
  },

  sd_updateProfile: (payload) => {
    const currentUser = get().sd_user;
    if (!currentUser) return;
    const nextUser = sd_updateCabinetProfile(currentUser.id, payload);
    set({ sd_user: nextUser, sd_error: null });
  },

  sd_createAppointment: (payload) => {
    const currentUser = get().sd_user;
    if (!currentUser) return;
    const nextUser = sd_createCabinetAppointment(currentUser.id, payload);
    set({
      sd_user: nextUser,
      sd_activeSection: 'appointments',
      sd_error: null,
    });
  },

  sd_cancelAppointment: (appointmentId) => {
    const currentUser = get().sd_user;
    if (!currentUser) return;
    const nextUser = sd_cancelCabinetAppointment(currentUser.id, appointmentId);
    set({ sd_user: nextUser, sd_error: null });
  },

  sd_rescheduleAppointment: (appointmentId, payload) => {
    const currentUser = get().sd_user;
    if (!currentUser) return;
    const nextUser = sd_rescheduleCabinetAppointment(currentUser.id, appointmentId, payload);
    set({ sd_user: nextUser, sd_error: null });
  },

  sd_repeatAppointment: (appointmentId) => {
    const currentUser = get().sd_user;
    if (!currentUser) return;
    const nextUser = sd_repeatCabinetAppointment(currentUser.id, appointmentId);
    set({
      sd_user: nextUser,
      sd_activeSection: 'appointments',
      sd_error: null,
    });
  },

  sd_addTopup: (amount) => {
    const currentUser = get().sd_user;
    if (!currentUser) return;
    const nextUser = sd_addCabinetTopup(currentUser.id, amount);
    set({ sd_user: nextUser, sd_error: null });
  },

  sd_markNotificationRead: (notificationId) => {
    const currentUser = get().sd_user;
    if (!currentUser) return;
    const nextUser = sd_markCabinetNotificationRead(currentUser.id, notificationId);
    set({ sd_user: nextUser, sd_error: null });
  },
}));

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SdCabinetAuthenticated } from '../cabinet/SdCabinetAuthenticated';
import { SdCabinetAuthScreen } from '../cabinet/sections/SdCabinetAuthScreen';
import {
  sd_clearPendingCabinetBooking,
  sd_getPendingCabinetBooking,
} from '../cabinet/sd_cabinetStorage';
import type { SdCabinetSectionId } from '../cabinet/sd_cabinetTypes';
import { sd_cabinetSections } from '../cabinet/sd_cabinetMeta';
import { useSdCabinetStore } from '../store/sd_cabinetStore';

export const CabinetPlaceholder = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sd_pendingAppliedRef = useRef(false);
  const {
    sd_user,
    sd_setActiveSection,
    sd_hydrateCabinet,
    sd_isHydrated,
    sd_createAppointment,
  } = useSdCabinetStore();

  useEffect(() => {
    sd_hydrateCabinet();
  }, [sd_hydrateCabinet]);

  useEffect(() => {
    const section = searchParams.get('section') as SdCabinetSectionId | null;
    if (!section) return;
    if (sd_cabinetSections.some((item) => item.id === section)) {
      sd_setActiveSection(section);
    }
  }, [searchParams, sd_setActiveSection]);

  useEffect(() => {
    if (!sd_user || sd_pendingAppliedRef.current) return;
    const sd_pendingBooking = sd_getPendingCabinetBooking();
    if (!sd_pendingBooking) return;

    sd_createAppointment(sd_pendingBooking);
    sd_clearPendingCabinetBooking();
    sd_pendingAppliedRef.current = true;

    const next = new URLSearchParams(searchParams);
    next.set('section', 'appointments');
    next.delete('pendingBooking');
    next.delete('mode');
    setSearchParams(next, { replace: true });
  }, [sd_createAppointment, sd_user, searchParams, setSearchParams]);

  useEffect(() => {
    if (!sd_user) {
      sd_pendingAppliedRef.current = false;
    }
  }, [sd_user]);

  useEffect(() => {
    const sd_refreshFromExternalBooking = () => {
      sd_hydrateCabinet();
      sd_setActiveSection('appointments');
    };

    window.addEventListener('sd:cabinet-booking-created', sd_refreshFromExternalBooking);
    return () => {
      window.removeEventListener('sd:cabinet-booking-created', sd_refreshFromExternalBooking);
    };
  }, [sd_hydrateCabinet, sd_setActiveSection]);

  if (!sd_isHydrated) {
    return (
      <div className="w-full min-h-screen pt-32 md:pt-40 pb-24 px-[15px] md:px-[40px]">
        <div className="max-w-[1920px] mx-auto rounded-[34px] border border-white/20 bg-white/55 backdrop-blur-[24px] p-8 text-[#002f6c]">
          Загружаем кабинет пациента...
        </div>
      </div>
    );
  }

  if (!sd_user) {
    return <SdCabinetAuthScreen />;
  }

  return <SdCabinetAuthenticated sd_user={sd_user} />;
};

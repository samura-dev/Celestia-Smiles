import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import type { SdCabinetUser } from './sd_cabinetTypes';
import { sd_cabinetSections, sd_summaryCards } from './sd_cabinetMeta';
import { SdCabinetDashboardSection } from './sections/SdCabinetDashboardSection';
import { SdCabinetAppointmentsSection } from './sections/SdCabinetAppointmentsSection';
import { SdCabinetBookingSection } from './sections/SdCabinetBookingSection';
import { SdCabinetFinancesSection } from './sections/SdCabinetFinancesSection';
import {
  SdCabinetDocumentsSection,
  SdCabinetNotificationsSection,
  SdCabinetSettingsSection,
  SdCabinetTreatmentSection,
} from './sections/SdCabinetExtraSections';
import { useSdCabinetStore } from '../store/sd_cabinetStore';

export const SdCabinetAuthenticated = ({ sd_user }: { sd_user: SdCabinetUser }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { sd_activeSection, sd_setActiveSection } = useSdCabinetStore();

  const sd_renderSection = () => {
    switch (sd_activeSection) {
      case 'dashboard':
        return <SdCabinetDashboardSection sd_user={sd_user} />;
      case 'appointments':
        return <SdCabinetAppointmentsSection sd_user={sd_user} />;
      case 'booking':
        return <SdCabinetBookingSection sd_user={sd_user} />;
      case 'finances':
        return <SdCabinetFinancesSection sd_user={sd_user} />;
      case 'treatment':
        return <SdCabinetTreatmentSection sd_user={sd_user} />;
      case 'documents':
        return <SdCabinetDocumentsSection sd_user={sd_user} />;
      case 'notifications':
        return <SdCabinetNotificationsSection sd_user={sd_user} />;
      case 'settings':
        return <SdCabinetSettingsSection sd_user={sd_user} />;
      default:
        return <SdCabinetDashboardSection sd_user={sd_user} />;
    }
  };

  const sd_upcomingCount = sd_user.appointments.filter((item) => item.status === 'scheduled').length;
  const sd_documentsCount = sd_user.documents.length;

  return (
    <div className="w-full min-h-screen pt-28 md:pt-36 pb-24 px-[15px] md:px-[40px] overflow-x-clip">
      <div className="max-w-[1920px] mx-auto">
        <div className="mb-8 flex flex-col xl:flex-row xl:items-end xl:justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] font-black text-[#7b95bf]">
              Личный кабинет
            </p>
            <h1 className="mt-3 text-4xl md:text-6xl font-medium tracking-tight text-[#002f6c]">
              Кабинет пациента Celestia Smiles
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="rounded-full border border-white/20 bg-white/68 px-4 py-3 text-sm font-semibold text-[#002f6c]">
              {sd_upcomingCount} активных записи
            </div>
            <div className="rounded-full border border-white/20 bg-white/68 px-4 py-3 text-sm font-semibold text-[#002f6c]">
              {sd_documentsCount} документов
            </div>
          </div>
        </div>

        <div className="grid xl:grid-cols-[320px_minmax(0,1fr)] gap-6">
          <aside className="rounded-[34px] border border-white/20 bg-white/55 backdrop-blur-[28px] p-4 md:p-5 h-fit xl:sticky xl:top-32">
            <div className="rounded-[28px] bg-[#002f6c] text-white p-5 md:p-6">
              <p className="text-[10px] uppercase tracking-[0.22em] font-black text-white/55">Профиль</p>
              <p className="mt-3 text-2xl font-semibold">{sd_user.profile.fullName}</p>
              <p className="mt-2 text-sm text-white/68">{sd_user.profile.phone}</p>
              <p className="mt-1 text-sm text-white/68">{sd_user.profile.email}</p>
              <div className="mt-5 rounded-[20px] bg-white/10 px-4 py-4">
                <p className="text-[10px] uppercase tracking-[0.18em] font-black text-white/55">
                  Лояльность
                </p>
                <p className="mt-2 text-xl font-semibold">{sd_user.profile.loyaltyLevel}</p>
              </div>
            </div>

            <nav className="mt-4 grid gap-2">
              {sd_cabinetSections.map((item) => {
                const Icon = item.icon;
                const sd_isActive = sd_activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      sd_setActiveSection(item.id);
                      const next = new URLSearchParams(searchParams);
                      next.set('section', item.id);
                      setSearchParams(next, { replace: true });
                    }}
                    className={`w-full rounded-[24px] px-4 py-4 text-left transition-all ${
                      sd_isActive
                        ? 'bg-[#0055ff]/10 border border-[#0055ff]/14 shadow-[0_18px_38px_-26px_rgba(0,85,255,0.35)]'
                        : 'border border-transparent hover:bg-white/55'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-[16px] flex items-center justify-center ${
                          sd_isActive ? 'bg-[#0055ff]/12 text-[#0055ff]' : 'bg-white/70 text-[#7b95bf]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-base font-semibold text-[#002f6c]">{item.title}</p>
                        <p className="mt-1 text-sm text-[#002f6c]/55">{item.subtitle}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </nav>
          </aside>

          <motion.section
            key={sd_activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="min-w-0"
          >
            {sd_renderSection()}
          </motion.section>
        </div>

        <section className="mt-8 rounded-[34px] border border-white/20 bg-white/50 backdrop-blur-[26px] p-5 md:p-6">
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {sd_summaryCards.map((item) => (
              <div key={item.title} className="rounded-[26px] border border-white/18 bg-white/70 px-5 py-5">
                <div className="w-11 h-11 rounded-[16px] bg-[#0055ff]/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-[#0055ff]" />
                </div>
                <p className="mt-4 text-[10px] uppercase tracking-[0.18em] font-black text-[#7b95bf]">
                  {item.title}
                </p>
                <p className="mt-2 text-2xl font-semibold text-[#002f6c]">{item.value}</p>
                <p className="mt-3 text-sm text-[#002f6c]/62 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

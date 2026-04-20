import { Bell, CalendarClock, HeartPulse, Wallet } from 'lucide-react';
import type { SdCabinetUser } from '../sd_cabinetTypes';
import { SdCabinetMetricCard, SdCabinetTimelineCard } from '../sd_cabinetShared';
import { sd_formatCurrency, sd_formatDate, sd_sortUpcomingAppointments } from '../sd_cabinetMeta';

export const SdCabinetDashboardSection = ({ sd_user }: { sd_user: SdCabinetUser }) => {
  const sd_upcoming = sd_sortUpcomingAppointments(
    sd_user.appointments.filter((item) => item.status === 'scheduled'),
  );
  const sd_nextAppointment = sd_upcoming[0];
  const sd_unreadCount = sd_user.notifications.filter((item) => !item.isRead).length;
  const sd_completedPlanCount = sd_user.treatmentPlan.filter((item) => item.status === 'completed').length;

  return (
    <div className="space-y-6">
      <section className="rounded-[34px] border border-white/20 bg-white/55 backdrop-blur-[28px] p-6 md:p-8 shadow-[0_32px_90px_-42px_rgba(0,47,108,0.36)]">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] font-black text-[#7b95bf]">
              Пациентский кабинет
            </p>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-[#002f6c]">
              {sd_user.profile.fullName}
            </h2>
            <p className="mt-3 max-w-[720px] text-base md:text-lg text-[#002f6c]/68 leading-relaxed">
              Внутри собраны все ключевые сценарии пациента: запись, приемы, этапы лечения,
              документы, уведомления и персональный баланс.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/22 bg-white/60 px-5 py-4 min-w-[260px]">
            <p className="text-[11px] uppercase tracking-[0.22em] font-black text-[#7b95bf]">
              Статус клиента
            </p>
            <p className="mt-2 text-2xl font-semibold text-[#002f6c]">{sd_user.profile.loyaltyLevel}</p>
            <p className="mt-2 text-sm text-[#002f6c]/60">
              Баланс: {sd_formatCurrency(sd_user.profile.balance)} · Бонусы:{' '}
              {sd_formatCurrency(sd_user.profile.bonusBalance)}
            </p>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        <SdCabinetMetricCard
          title="Ближайший прием"
          value={sd_nextAppointment ? sd_nextAppointment.time : '—'}
          caption={
            sd_nextAppointment
              ? `${sd_formatDate(sd_nextAppointment.date)} · ${sd_nextAppointment.directionTitle}`
              : 'Вы еще не выбрали новый визит'
          }
          icon={CalendarClock}
        />
        <SdCabinetMetricCard
          title="Внутренний баланс"
          value={sd_formatCurrency(sd_user.profile.balance)}
          caption="Используйте для предоплат и быстрых расчетов по этапам."
          icon={Wallet}
        />
        <SdCabinetMetricCard
          title="Непрочитанные"
          value={String(sd_unreadCount)}
          caption="Напоминания о визитах, обновления плана лечения и сервисные уведомления."
          icon={Bell}
        />
        <SdCabinetMetricCard
          title="Этапы лечения"
          value={`${sd_completedPlanCount}/${sd_user.treatmentPlan.length}`}
          caption="Прогресс по текущей карте лечения и готовность следующего этапа."
          icon={HeartPulse}
        />
      </section>

      <section className="grid xl:grid-cols-[1.1fr_0.9fr] gap-6">
        <div className="rounded-[30px] border border-white/20 bg-white/55 backdrop-blur-[26px] p-5 md:p-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] font-black text-[#7b95bf]">
              Ближайшие действия
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-[#002f6c]">Что сейчас важно</h3>
          </div>
          <div className="grid gap-4 mt-5">
            <SdCabinetTimelineCard
              title={sd_nextAppointment ? `${sd_nextAppointment.directionTitle} · ${sd_nextAppointment.time}` : 'Новая запись'}
              subtitle={
                sd_nextAppointment
                  ? `${sd_formatDate(sd_nextAppointment.date)} · ${sd_nextAppointment.doctorName}`
                  : 'Подберите удобное время и врача в разделе записи.'
              }
              status={sd_nextAppointment ? 'Запланировано' : 'Нужно действие'}
            />
            <SdCabinetTimelineCard
              title="План лечения в работе"
              subtitle="Имплантация и подготовка к постоянной ортопедической конструкции."
              status="Контроль динамики"
            />
            <SdCabinetTimelineCard
              title="Документы обновлены"
              subtitle="Проверьте подписанное согласие и дорожную карту лечения."
              status="Готово"
            />
          </div>
        </div>

        <div className="rounded-[30px] border border-white/20 bg-white/55 backdrop-blur-[26px] p-5 md:p-6">
          <p className="text-[11px] uppercase tracking-[0.24em] font-black text-[#7b95bf]">
            Сводка кабинета
          </p>
          <div className="space-y-4 mt-5">
            {[
              { label: 'Телефон', value: sd_user.profile.phone },
              { label: 'Email', value: sd_user.profile.email },
              { label: 'Город', value: sd_user.profile.city },
              { label: 'Экстренный контакт', value: sd_user.profile.emergencyContact },
            ].map((item) => (
              <div key={item.label} className="rounded-[22px] border border-white/18 bg-white/70 px-4 py-4">
                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-[#7b95bf]">
                  {item.label}
                </p>
                <p className="mt-2 text-base font-semibold text-[#002f6c]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

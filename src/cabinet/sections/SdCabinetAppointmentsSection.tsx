import { useMemo, useState } from 'react';
import type { SdCabinetAppointment, SdCabinetUser } from '../sd_cabinetTypes';
import { SdCabinetAppointmentCard } from '../sd_cabinetShared';
import { sd_sortPastAppointments, sd_sortUpcomingAppointments, sd_timeSlots } from '../sd_cabinetMeta';
import { useSdCabinetStore } from '../../store/sd_cabinetStore';

const sd_getNextRescheduleDate = (date: string) => {
  const value = new Date(`${date}T12:00:00`);
  value.setDate(value.getDate() + 3);
  return value.toISOString().slice(0, 10);
};

export const SdCabinetAppointmentsSection = ({ sd_user }: { sd_user: SdCabinetUser }) => {
  const { sd_cancelAppointment, sd_repeatAppointment, sd_rescheduleAppointment } = useSdCabinetStore();
  const [sd_rescheduleId, setSdRescheduleId] = useState<string | null>(null);
  const [sd_rescheduleDate, setSdRescheduleDate] = useState('');
  const [sd_rescheduleTime, setSdRescheduleTime] = useState(sd_timeSlots[0]);

  const sd_upcoming = sd_sortUpcomingAppointments(
    sd_user.appointments.filter((item) => item.status === 'scheduled'),
  );
  const sd_past = sd_sortPastAppointments(
    sd_user.appointments.filter((item) => item.status !== 'scheduled'),
  );

  const sd_rescheduleItem = useMemo(
    () => sd_upcoming.find((item) => item.id === sd_rescheduleId) ?? null,
    [sd_rescheduleId, sd_upcoming],
  );

  const sd_openReschedule = (item: SdCabinetAppointment) => {
    setSdRescheduleId(item.id);
    setSdRescheduleDate(sd_getNextRescheduleDate(item.date));
    setSdRescheduleTime(item.time);
  };

  return (
    <div className="space-y-8">
      <section>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] font-black text-[#7b95bf]">Предстоящие приемы</p>
            <h3 className="mt-2 text-3xl font-semibold text-[#002f6c]">Ближайшие визиты</h3>
          </div>
          <p className="text-sm text-[#002f6c]/58">Из кабинета можно отменить, перенести или быстро повторить нужный сценарий.</p>
        </div>

        <div className="space-y-4">
          {sd_upcoming.length ? (
            sd_upcoming.map((item) => (
              <div key={item.id} className="space-y-3">
                <SdCabinetAppointmentCard
                  item={item}
                  canCancel
                  canReschedule
                  onCancel={() => {
                    if (sd_rescheduleId === item.id) {
                      setSdRescheduleId(null);
                    }
                    sd_cancelAppointment(item.id);
                  }}
                  onReschedule={() => sd_openReschedule(item)}
                />

                {sd_rescheduleItem?.id === item.id ? (
                  <div className="rounded-[28px] border border-white/20 bg-white/55 px-5 py-5 shadow-[0_24px_70px_-38px_rgba(0,47,108,0.25)] backdrop-blur-[24px] md:px-6 md:py-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.22em] font-black text-[#7b95bf]">Перенос записи</p>
                        <h4 className="mt-2 text-2xl font-semibold text-[#002f6c]">Выберите новую дату и время</h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSdRescheduleId(null)}
                        className="text-sm font-semibold text-[#002f6c]/60 transition-colors hover:text-[#002f6c]"
                      >
                        Свернуть
                      </button>
                    </div>

                    <div className="mt-5 grid gap-4 md:grid-cols-[220px_minmax(0,1fr)]">
                      <label className="block">
                        <span className="text-[11px] uppercase tracking-[0.18em] font-black text-[#7b95bf]">Новая дата</span>
                        <input
                          type="date"
                          min={new Date().toISOString().slice(0, 10)}
                          value={sd_rescheduleDate}
                          onChange={(event) => setSdRescheduleDate(event.target.value)}
                          className="mt-2 w-full rounded-[18px] border border-white/26 bg-white/80 px-4 py-3 text-base font-semibold text-[#002f6c] outline-none"
                        />
                      </label>

                      <div>
                        <span className="text-[11px] uppercase tracking-[0.18em] font-black text-[#7b95bf]">Время</span>
                        <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
                          {sd_timeSlots.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSdRescheduleTime(slot)}
                              className={`rounded-[18px] px-4 py-3 text-sm font-semibold transition-all ${
                                sd_rescheduleTime === slot
                                  ? 'bg-[#002f6c] text-white shadow-[0_18px_34px_-20px_rgba(0,47,108,0.6)]'
                                  : 'border border-white/24 bg-white/78 text-[#002f6c]'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={() => {
                          if (!sd_rescheduleDate) return;
                          sd_rescheduleAppointment(item.id, {
                            date: sd_rescheduleDate,
                            time: sd_rescheduleTime,
                          });
                          setSdRescheduleId(null);
                        }}
                        className="rounded-[18px] bg-[#002f6c] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#00439a]"
                      >
                        Сохранить новое время
                      </button>
                      <button
                        type="button"
                        onClick={() => setSdRescheduleId(null)}
                        className="rounded-[18px] border border-[#002f6c]/12 bg-white/75 px-5 py-3 text-sm font-semibold text-[#002f6c] transition-colors hover:bg-white"
                      >
                        Отмена
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            ))
          ) : (
            <div className="rounded-[28px] border border-dashed border-white/28 bg-white/35 px-6 py-10 text-center text-[#002f6c]/65">
              Пока нет активных записей. Новый визит можно оформить в соседнем разделе.
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="mb-4">
          <p className="text-[11px] uppercase tracking-[0.24em] font-black text-[#7b95bf]">История</p>
          <h3 className="mt-2 text-3xl font-semibold text-[#002f6c]">Прошедшие и отмененные</h3>
        </div>
        <div className="space-y-4">
          {sd_past.map((item) => (
            <SdCabinetAppointmentCard
              key={item.id}
              item={item}
              canRepeat
              onRepeat={() => sd_repeatAppointment(item.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
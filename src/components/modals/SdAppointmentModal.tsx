import { useMemo, useState } from 'react';
import { CalendarDays, ChevronDown, Clock3, Stethoscope, UserRound, X } from 'lucide-react';
import { sd_servicesData } from '../../data/sd_services';
import { sd_specialistsData, type SdCategoryId } from '../../data/sd_specialists';

interface SdAppointmentModalProps {
  sd_initialDirectionId?: string | null;
  sd_initialDoctorId?: number | null;
  sd_onClose: () => void;
}

const sd_now = new Date();
const sd_today = sd_now.toISOString().slice(0, 10);

const sd_allSlots = Array.from({ length: 22 }, (_, index) => {
  const hours = 9 + Math.floor(index / 2);
  const minutes = index % 2 === 0 ? '00' : '30';
  return `${hours.toString().padStart(2, '0')}:${minutes}`;
});

const sd_createBusyIndexes = (date: string, doctorId: number): Set<number> => {
  const seed = `${date}:${doctorId}`;
  const checksum = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return new Set([
    checksum % sd_allSlots.length,
    (checksum + 3) % sd_allSlots.length,
    (checksum + 7) % sd_allSlots.length,
  ]);
};

export const SdAppointmentModal = ({
  sd_initialDirectionId,
  sd_initialDoctorId,
  sd_onClose,
}: SdAppointmentModalProps) => {
  const sd_directionOptions = useMemo(
    () => sd_servicesData.map((category) => ({ id: category.id as SdCategoryId, title: category.title })),
    []
  );

  const sd_defaultDirection = sd_directionOptions.find((option) => option.id === sd_initialDirectionId)?.id
    ?? sd_directionOptions[0]?.id
    ?? 'therapy';

  const [sd_directionId, setSdDirectionId] = useState<SdCategoryId>(sd_defaultDirection);
  const [sd_doctorId, setSdDoctorId] = useState<number | null>(sd_initialDoctorId ?? null);
  const [sd_date, setSdDate] = useState<string>(sd_today);
  const [sd_time, setSdTime] = useState<string>('');
  const [sd_submitted, setSdSubmitted] = useState(false);

  const sd_doctorsByDirection = useMemo(
    () => sd_specialistsData.filter((doctor) => doctor.categoryIds.includes(sd_directionId)),
    [sd_directionId]
  );

  const sd_effectiveDoctorId = sd_doctorsByDirection.some((doctor) => doctor.id === sd_doctorId)
    ? sd_doctorId
    : (sd_doctorsByDirection[0]?.id ?? null);

  const sd_slots = useMemo(() => {
    if (!sd_effectiveDoctorId || !sd_date) return [];
    const busyIndexes = sd_createBusyIndexes(sd_date, sd_effectiveDoctorId);
    const isToday = sd_date === sd_today;
    const currentMinutes = sd_now.getHours() * 60 + sd_now.getMinutes();

    return sd_allSlots.filter((slot, index) => {
      if (busyIndexes.has(index)) return false;
      if (!isToday) return true;
      const [hours, minutes] = slot.split(':').map(Number);
      return hours * 60 + minutes > currentMinutes + 30;
    });
  }, [sd_date, sd_effectiveDoctorId]);

  const sd_effectiveTime = sd_slots.includes(sd_time) ? sd_time : '';
  const sd_selectedDirection = sd_directionOptions.find((option) => option.id === sd_directionId);
  const sd_selectedDoctor = sd_specialistsData.find((doctor) => doctor.id === sd_effectiveDoctorId);
  const sd_canSubmit = Boolean(sd_directionId && sd_effectiveDoctorId && sd_date && sd_effectiveTime);

  const sd_handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!sd_canSubmit) return;
    setSdSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 md:p-8">
      <button
        type="button"
        onClick={sd_onClose}
        className="absolute inset-0 bg-[#071324]/34"
        aria-label="Закрыть модальное окно записи"
      />

      <div className="relative w-full max-w-[1240px] max-h-[94vh] overflow-y-auto rounded-[36px] border border-white/20 bg-white/[0.14] backdrop-blur-[28px] shadow-[0_48px_130px_-18px_rgba(5,20,50,0.5)] p-6 md:p-9">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-[#0055ff] uppercase tracking-[0.22em] text-[10px] font-black">Запись онлайн</p>
            <h2 className="text-2xl md:text-4xl text-[#002f6c] font-medium leading-tight mt-2">
              Подберите удобное время визита
            </h2>
          </div>
          <button
            type="button"
            onClick={sd_onClose}
            className="w-10 h-10 rounded-full border border-white/30 bg-white/[0.45] text-[#002f6c] flex items-center justify-center hover:bg-[#0055ff] hover:text-white transition-colors shrink-0"
            aria-label="Закрыть"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={sd_handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-[#002f6c] font-black text-xs uppercase tracking-[0.18em] flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-[#0055ff]" />
                Направление
              </span>
              <div className="relative">
                <select
                  value={sd_directionId}
                  onChange={(event) => {
                    setSdDirectionId(event.target.value as SdCategoryId);
                    setSdDoctorId(null);
                    setSdTime('');
                  }}
                  className="sd_appointment_select h-11 w-full appearance-none rounded-xl border border-[#0055ff]/25 bg-white/[0.6] pl-4 pr-11 text-[#002f6c] font-semibold outline-none transition-all focus:border-[#0055ff]/60 focus:ring-2 focus:ring-[#0055ff]/15 hover:border-[#0055ff]/45"
                >
                  {sd_directionOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.title}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0055ff]/75" />
              </div>
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-[#002f6c] font-black text-xs uppercase tracking-[0.18em] flex items-center gap-2">
                <UserRound className="w-4 h-4 text-[#0055ff]" />
                Врач
              </span>
              <div className="relative">
                <select
                  value={sd_effectiveDoctorId ?? ''}
                  onChange={(event) => {
                    setSdDoctorId(Number(event.target.value));
                    setSdTime('');
                  }}
                  className="sd_appointment_select h-11 w-full appearance-none rounded-xl border border-[#0055ff]/25 bg-white/[0.6] pl-4 pr-11 text-[#002f6c] font-semibold outline-none transition-all focus:border-[#0055ff]/60 focus:ring-2 focus:ring-[#0055ff]/15 hover:border-[#0055ff]/45"
                >
                  {sd_doctorsByDirection.length === 0 && <option value="">Нет доступных врачей</option>}
                  {sd_doctorsByDirection.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} — {doctor.role}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0055ff]/75" />
              </div>
            </label>

            <label className="flex flex-col gap-2 md:col-span-2">
              <span className="text-[#002f6c] font-black text-xs uppercase tracking-[0.18em] flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-[#0055ff]" />
                Дата
              </span>
              <input
                type="date"
                min={sd_today}
                value={sd_date}
                onChange={(event) => setSdDate(event.target.value)}
                className="h-11 rounded-xl border border-white/30 bg-white/[0.5] px-4 text-[#002f6c] font-medium outline-none focus:border-[#0055ff]/60 focus:ring-2 focus:ring-[#0055ff]/15"
              />
            </label>

            <div className="md:col-span-2">
              <span className="text-[#002f6c] font-black text-xs uppercase tracking-[0.18em] flex items-center gap-2 mb-2">
                <Clock3 className="w-4 h-4 text-[#0055ff]" />
                Время
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {sd_slots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSdTime(slot)}
                    className={`h-10 rounded-xl text-sm font-bold transition-all border ${
                      sd_effectiveTime === slot
                        ? 'bg-[#0055ff] text-white border-[#0055ff]'
                        : 'bg-white/[0.5] text-[#002f6c] border-white/30 hover:border-[#0055ff]/40'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
                {sd_slots.length === 0 && (
                  <span className="col-span-3 sm:col-span-5 text-sm text-slate-500 font-medium">
                    На выбранную дату нет свободных слотов.
                  </span>
                )}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-5 rounded-2xl border border-white/25 bg-white/[0.35] p-4 md:p-5">
            <h3 className="text-[#002f6c] font-black text-sm uppercase tracking-[0.16em] mb-4">Сводка записи</h3>
            <div className="space-y-3 text-[#002f6c]">
              <div className="rounded-xl bg-white/[0.55] border border-white/30 p-3">
                <div className="text-[10px] uppercase tracking-[0.16em] text-slate-400 font-black mb-1">Направление</div>
                <div className="font-bold text-sm">{sd_selectedDirection?.title ?? 'Не выбрано'}</div>
              </div>
              <div className="rounded-xl bg-white/[0.55] border border-white/30 p-3">
                <div className="text-[10px] uppercase tracking-[0.16em] text-slate-400 font-black mb-1">Врач</div>
                <div className="font-bold text-sm">{sd_selectedDoctor ? `${sd_selectedDoctor.name}, ${sd_selectedDoctor.role}` : 'Не выбран'}</div>
              </div>
              <div className="rounded-xl bg-white/[0.55] border border-white/30 p-3">
                <div className="text-[10px] uppercase tracking-[0.16em] text-slate-400 font-black mb-1">Дата и время</div>
                <div className="font-bold text-sm">{sd_date ? `${sd_date}${sd_effectiveTime ? `, ${sd_effectiveTime}` : ''}` : 'Не выбрано'}</div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!sd_canSubmit}
              className="mt-5 w-full h-11 rounded-full bg-[#002f6c] text-white font-black uppercase text-[11px] tracking-[0.2em] transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#0055ff]"
            >
              Подтвердить запись
            </button>

            {sd_submitted && sd_canSubmit && (
              <div className="mt-4 rounded-xl border border-[#0055ff]/30 bg-[#0055ff]/10 p-3">
                <div className="text-[#002f6c] font-black text-[11px] uppercase tracking-[0.15em] mb-1">Запись создана</div>
                <p className="text-slate-600 font-medium text-xs leading-relaxed">
                  Заявка принята. Администратор свяжется с вами для финального подтверждения времени.
                </p>
              </div>
            )}
          </aside>
        </form>
      </div>
    </div>
  );
};

import { useMemo, useState } from 'react';
import type { SdCabinetUser } from '../sd_cabinetTypes';
import { sd_cabinetDirections, sd_getDoctorsByDirection } from '../sd_cabinetStorage';
import { sd_timeSlots } from '../sd_cabinetMeta';
import { useSdCabinetStore } from '../../store/sd_cabinetStore';

export const SdCabinetBookingSection = ({ sd_user }: { sd_user: SdCabinetUser }) => {
  const { sd_createAppointment, sd_setActiveSection } = useSdCabinetStore();
  const sd_initialDirection = sd_cabinetDirections[0]?.id ?? 'therapy';
  const [sd_directionId, setSdDirectionId] = useState(sd_initialDirection);
  const [sd_date, setSdDate] = useState('2026-04-28');
  const [sd_time, setSdTime] = useState(sd_timeSlots[2]);
  const [sd_notes, setSdNotes] = useState('');

  const sd_doctors = useMemo(() => sd_getDoctorsByDirection(sd_directionId), [sd_directionId]);
  const [sd_doctorId, setSdDoctorId] = useState<number>(sd_doctors[0]?.id ?? 0);
  const sd_effectiveDoctorId = sd_doctors.some((item) => item.id === sd_doctorId)
    ? sd_doctorId
    : (sd_doctors[0]?.id ?? 0);
  const sd_selectedDoctor = sd_doctors.find((item) => item.id === sd_effectiveDoctorId) ?? sd_doctors[0];
  const sd_selectedDirection =
    sd_cabinetDirections.find((item) => item.id === sd_directionId) ?? sd_cabinetDirections[0];
  const sd_nextVisitCount = sd_user.appointments.filter((item) => item.status === 'scheduled').length;

  return (
    <div className="grid xl:grid-cols-[1.08fr_0.92fr] gap-6">
      <section className="rounded-[34px] border border-white/20 bg-white/55 backdrop-blur-[28px] p-6 md:p-8">
        <p className="text-[11px] uppercase tracking-[0.28em] font-black text-[#7b95bf]">Новая запись</p>
        <h3 className="mt-3 text-3xl md:text-4xl font-semibold text-[#002f6c]">
          Подберите направление, врача и удобный слот
        </h3>
        <p className="mt-3 text-[#002f6c]/66 leading-relaxed">
          Мы сразу показываем только тех специалистов, которые относятся к выбранному направлению.
        </p>

        <form
          className="mt-8 space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            if (!sd_selectedDoctor || !sd_selectedDirection) return;
            sd_createAppointment({
              directionId: sd_selectedDirection.id,
              directionTitle: sd_selectedDirection.title,
              doctor: sd_selectedDoctor,
              date: sd_date,
              time: sd_time,
              notes: sd_notes,
            });
            setSdNotes('');
            sd_setActiveSection('appointments');
          }}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-[11px] uppercase tracking-[0.22em] font-black text-[#7b95bf]">Направление</span>
              <select
                value={sd_directionId}
                onChange={(event) => setSdDirectionId(event.target.value)}
                className="sd_appointment_select mt-2 w-full rounded-[20px] border border-white/26 bg-white/80 px-5 py-4 text-base font-semibold text-[#002f6c] outline-none"
              >
                {sd_cabinetDirections.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-[11px] uppercase tracking-[0.22em] font-black text-[#7b95bf]">Врач</span>
              <select
                value={sd_effectiveDoctorId}
                onChange={(event) => setSdDoctorId(Number(event.target.value))}
                className="sd_appointment_select mt-2 w-full rounded-[20px] border border-white/26 bg-white/80 px-5 py-4 text-base font-semibold text-[#002f6c] outline-none"
              >
                {sd_doctors.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} — {item.role}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-4">
            <label className="block">
              <span className="text-[11px] uppercase tracking-[0.22em] font-black text-[#7b95bf]">Дата</span>
              <input
                type="date"
                value={sd_date}
                min="2026-04-20"
                onChange={(event) => setSdDate(event.target.value)}
                className="mt-2 w-full rounded-[20px] border border-white/26 bg-white/80 px-5 py-4 text-base font-semibold text-[#002f6c] outline-none"
              />
            </label>

            <div>
              <span className="text-[11px] uppercase tracking-[0.22em] font-black text-[#7b95bf]">Время</span>
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {sd_timeSlots.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSdTime(item)}
                    className={`rounded-[18px] px-4 py-4 text-sm font-semibold transition-all ${
                      sd_time === item
                        ? 'bg-[#002f6c] text-white shadow-[0_18px_34px_-20px_rgba(0,47,108,0.6)]'
                        : 'bg-white/78 border border-white/24 text-[#002f6c]'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.22em] font-black text-[#7b95bf]">Комментарий</span>
            <textarea
              value={sd_notes}
              onChange={(event) => setSdNotes(event.target.value)}
              rows={4}
              placeholder="Например: чувствительность после еды, хочется совместить прием с консультацией ортопеда."
              className="mt-2 w-full rounded-[22px] border border-white/26 bg-white/80 px-5 py-4 text-base text-[#002f6c] outline-none resize-none"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-[22px] bg-[#002f6c] px-5 py-4 text-sm md:text-base font-semibold text-white hover:bg-[#00439a] transition-colors"
          >
            Подтвердить запись
          </button>
        </form>
      </section>

      <aside className="rounded-[34px] border border-white/20 bg-white/55 backdrop-blur-[28px] p-6 md:p-8">
        <p className="text-[11px] uppercase tracking-[0.28em] font-black text-[#7b95bf]">Сводка записи</p>
        <div className="space-y-4 mt-6">
          <div className="rounded-[24px] bg-white/75 border border-white/20 px-5 py-4">
            <p className="text-[10px] uppercase tracking-[0.18em] font-black text-[#7b95bf]">Направление</p>
            <p className="mt-2 text-xl font-semibold text-[#002f6c]">{sd_selectedDirection?.title}</p>
            <p className="mt-2 text-sm text-[#002f6c]/62 leading-relaxed">{sd_selectedDirection?.description}</p>
          </div>
          <div className="rounded-[24px] bg-white/75 border border-white/20 px-5 py-4">
            <p className="text-[10px] uppercase tracking-[0.18em] font-black text-[#7b95bf]">Врач</p>
            <p className="mt-2 text-xl font-semibold text-[#002f6c]">{sd_selectedDoctor?.name}</p>
            <p className="mt-2 text-sm text-[#002f6c]/62">{sd_selectedDoctor?.role}</p>
          </div>
          <div className="rounded-[24px] bg-white/75 border border-white/20 px-5 py-4">
            <p className="text-[10px] uppercase tracking-[0.18em] font-black text-[#7b95bf]">Дата и слот</p>
            <p className="mt-2 text-xl font-semibold text-[#002f6c]">{sd_date} · {sd_time}</p>
            <p className="mt-2 text-sm text-[#002f6c]/62">После подтверждения запись сразу появится в разделе приемов.</p>
          </div>
          <div className="rounded-[24px] bg-[#002f6c] px-5 py-5 text-white">
            <p className="text-[10px] uppercase tracking-[0.18em] font-black text-white/65">Сервисный статус</p>
            <p className="mt-2 text-2xl font-semibold">{sd_nextVisitCount} активных записей</p>
            <p className="mt-2 text-sm text-white/70 leading-relaxed">
              Система хранит все данные локально, поэтому кабинет ощущается живым уже без бэкенда.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
};

import { Wallet } from 'lucide-react';
import type { SdCabinetAppointment } from './sd_cabinetTypes';
import { sd_formatCurrency, sd_formatDate } from './sd_cabinetMeta';

export const SdCabinetMetricCard = ({
  title,
  value,
  caption,
  icon: Icon,
}: {
  title: string;
  value: string;
  caption: string;
  icon: typeof Wallet;
}) => (
  <div className="rounded-[28px] border border-white/20 bg-white/55 shadow-[0_24px_60px_-30px_rgba(0,47,108,0.28)] backdrop-blur-[24px] p-5 md:p-6">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-[11px] uppercase tracking-[0.25em] font-black text-[#7b95bf]">{title}</p>
        <p className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-[#002f6c]">{value}</p>
        <p className="mt-2 text-sm md:text-base text-[#002f6c]/65 leading-relaxed">{caption}</p>
      </div>
      <div className="w-12 h-12 rounded-[18px] bg-[#0055ff]/10 border border-[#0055ff]/10 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-[#0055ff]" />
      </div>
    </div>
  </div>
);

export const SdCabinetTimelineCard = ({
  title,
  subtitle,
  status,
}: {
  title: string;
  subtitle: string;
  status: string;
}) => (
  <div className="rounded-[24px] border border-white/16 bg-white/45 backdrop-blur-[20px] p-4 md:p-5">
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="text-lg font-semibold text-[#002f6c]">{title}</p>
        <p className="mt-1 text-sm text-[#002f6c]/65">{subtitle}</p>
      </div>
      <span className="rounded-full bg-[#0055ff]/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] font-black text-[#0055ff]">
        {status}
      </span>
    </div>
  </div>
);

export const SdCabinetAppointmentCard = ({
  item,
  canCancel,
  onCancel,
  canReschedule,
  onReschedule,
  canRepeat,
  onRepeat,
}: {
  item: SdCabinetAppointment;
  canCancel?: boolean;
  onCancel?: () => void;
  canReschedule?: boolean;
  onReschedule?: () => void;
  canRepeat?: boolean;
  onRepeat?: () => void;
}) => (
  <div className="rounded-[30px] border border-white/20 bg-white/55 backdrop-blur-[24px] p-5 md:p-6 shadow-[0_24px_70px_-38px_rgba(0,47,108,0.35)]">
    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#0055ff]/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#0055ff]">
            {item.directionTitle}
          </span>
          <span className="rounded-full bg-white/65 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#7b95bf]">
            {item.status === 'scheduled' ? 'Предстоит' : item.status === 'completed' ? 'Завершен' : 'Отменен'}
          </span>
        </div>

        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-[#002f6c]">{item.doctorName}</h3>
          <p className="mt-1 text-base text-[#002f6c]/62">{item.doctorRole}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 text-sm md:text-[15px] text-[#002f6c]/70">
          <p>
            <span className="font-semibold text-[#002f6c]">Дата:</span> {sd_formatDate(item.date)} в {item.time}
          </p>
          <p>
            <span className="font-semibold text-[#002f6c]">Длительность:</span> {item.durationMinutes} минут
          </p>
          <p>
            <span className="font-semibold text-[#002f6c]">Локация:</span> {item.clinicAddress}
          </p>
          <p>
            <span className="font-semibold text-[#002f6c]">Кабинет:</span> {item.cabinet}
          </p>
        </div>

        {item.notes ? <p className="text-sm text-[#002f6c]/70 leading-relaxed">{item.notes}</p> : null}
      </div>

      <div className="lg:max-w-[250px] flex flex-col gap-3">
        <div className="rounded-[22px] border border-white/18 bg-white/70 px-4 py-4">
          <p className="text-[11px] uppercase tracking-[0.22em] font-black text-[#7b95bf]">Ориентир по оплате</p>
          <p className="mt-2 text-2xl font-semibold text-[#002f6c]">{sd_formatCurrency(item.estimatedPrice)}</p>
        </div>
        {canReschedule && onReschedule ? (
          <button
            type="button"
            onClick={onReschedule}
            className="rounded-[18px] border border-[#0055ff]/16 bg-[#0055ff]/8 px-4 py-3 text-sm font-semibold text-[#0055ff] hover:bg-[#0055ff]/14 transition-colors"
          >
            Перенести запись
          </button>
        ) : null}
        {canCancel && onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-[18px] border border-[#002f6c]/12 bg-white/75 px-4 py-3 text-sm font-semibold text-[#002f6c] hover:bg-white transition-colors"
          >
            Отменить запись
          </button>
        ) : null}
        {canRepeat && onRepeat ? (
          <button
            type="button"
            onClick={onRepeat}
            className="rounded-[18px] border border-[#002f6c]/12 bg-white/75 px-4 py-3 text-sm font-semibold text-[#002f6c] hover:bg-white transition-colors"
          >
            Записаться снова
          </button>
        ) : null}
      </div>
    </div>
  </div>
);
import { CircleCheckBig, CreditCard, LogOut, ShieldCheck, Stethoscope } from 'lucide-react';
import { useState } from 'react';
import type { SdCabinetUser } from '../sd_cabinetTypes';
import { useSdCabinetStore } from '../../store/sd_cabinetStore';

export const SdCabinetTreatmentSection = ({ sd_user }: { sd_user: SdCabinetUser }) => (
  <div className="space-y-4">
    {sd_user.treatmentPlan.map((item) => (
      <div key={item.id} className="rounded-[30px] border border-white/20 bg-white/55 backdrop-blur-[24px] p-5 md:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="rounded-full bg-[#0055ff]/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#0055ff]">
                {item.stage}
              </span>
              <span className="rounded-full bg-white/65 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#7b95bf]">
                {item.status === 'completed' ? 'Завершено' : item.status === 'in_progress' ? 'В работе' : 'Запланировано'}
              </span>
            </div>
            <h3 className="mt-3 text-2xl font-semibold text-[#002f6c]">{item.title}</h3>
            <p className="mt-2 text-[#002f6c]/66 leading-relaxed">{item.note}</p>
            <p className="mt-3 text-sm text-[#002f6c]/62">Ведущий врач: {item.doctorName} · {item.dateLabel}</p>
          </div>

          <div className="lg:w-[260px]">
            <div className="flex items-center justify-between text-sm font-semibold text-[#002f6c]">
              <span>Прогресс</span>
              <span>{item.progress}%</span>
            </div>
            <div className="mt-3 h-3 rounded-full bg-white/70 overflow-hidden">
              <div className="h-full rounded-full bg-[#0055ff]" style={{ width: `${item.progress}%` }} />
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const SdCabinetDocumentsSection = ({ sd_user }: { sd_user: SdCabinetUser }) => (
  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
    {sd_user.documents.map((item) => (
      <div key={item.id} className="rounded-[30px] border border-white/20 bg-white/55 backdrop-blur-[24px] p-5 md:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-[#0055ff]/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#0055ff]">
            {item.type}
          </span>
          <span className="text-[10px] uppercase tracking-[0.18em] font-black text-[#7b95bf]">{item.issuedAt}</span>
        </div>
        <h3 className="mt-5 text-2xl font-semibold text-[#002f6c]">{item.title}</h3>
        <p className="mt-3 text-[#002f6c]/64 leading-relaxed">{item.summary}</p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-[#002f6c]">
            {item.status === 'signed' ? 'Подписан' : item.status === 'pending' ? 'Ожидает обновления' : 'В архиве'}
          </span>
          <button type="button" className="rounded-[16px] border border-white/20 bg-white/75 px-4 py-2 text-sm font-semibold text-[#002f6c]">
            Открыть
          </button>
        </div>
      </div>
    ))}
  </div>
);

export const SdCabinetNotificationsSection = ({ sd_user }: { sd_user: SdCabinetUser }) => {
  const { sd_markNotificationRead } = useSdCabinetStore();

  return (
    <div className="space-y-4">
      {sd_user.notifications.map((item) => (
        <div
          key={item.id}
          className={`rounded-[30px] border p-5 md:p-6 backdrop-blur-[24px] ${
            item.isRead
              ? 'border-white/18 bg-white/48'
              : 'border-[#0055ff]/18 bg-[#edf5ff]/78 shadow-[0_26px_72px_-38px_rgba(0,85,255,0.25)]'
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <p className="text-2xl font-semibold text-[#002f6c]">{item.title}</p>
              <p className="mt-3 text-[#002f6c]/65 leading-relaxed">{item.message}</p>
              <p className="mt-3 text-[12px] uppercase tracking-[0.18em] font-black text-[#7b95bf]">
                {new Date(item.createdAt).toLocaleString('ru-RU')}
              </p>
            </div>
            {!item.isRead ? (
              <button
                type="button"
                onClick={() => sd_markNotificationRead(item.id)}
                className="rounded-[18px] bg-[#002f6c] px-4 py-3 text-sm font-semibold text-white"
              >
                Прочитано
              </button>
            ) : (
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#0d8b54]">
                <CircleCheckBig className="w-4 h-4" />
                Прочитано
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export const SdCabinetSettingsSection = ({ sd_user }: { sd_user: SdCabinetUser }) => {
  const { sd_updateProfile, sd_logout } = useSdCabinetStore();
  const [sd_form, setSdForm] = useState({
    fullName: sd_user.profile.fullName,
    phone: sd_user.profile.phone,
    birthDate: sd_user.profile.birthDate,
    city: sd_user.profile.city,
    emergencyContact: sd_user.profile.emergencyContact,
  });

  return (
    <div className="grid xl:grid-cols-[1.05fr_0.95fr] gap-6">
      <section className="rounded-[34px] border border-white/20 bg-white/55 backdrop-blur-[28px] p-6 md:p-8">
        <p className="text-[11px] uppercase tracking-[0.28em] font-black text-[#7b95bf]">Профиль пациента</p>
        <h3 className="mt-3 text-3xl font-semibold text-[#002f6c]">Контакты и личные данные</h3>

        <form
          className="space-y-4 mt-7"
          onSubmit={(event) => {
            event.preventDefault();
            sd_updateProfile(sd_form);
          }}
        >
          {[
            { key: 'fullName', label: 'ФИО', type: 'text' },
            { key: 'phone', label: 'Телефон', type: 'text' },
            { key: 'birthDate', label: 'Дата рождения', type: 'date' },
            { key: 'city', label: 'Город', type: 'text' },
            { key: 'emergencyContact', label: 'Экстренный контакт', type: 'text' },
          ].map((field) => (
            <label key={field.key} className="block">
              <span className="text-[11px] uppercase tracking-[0.22em] font-black text-[#7b95bf]">{field.label}</span>
              <input
                type={field.type}
                value={sd_form[field.key as keyof typeof sd_form]}
                onChange={(event) => setSdForm((prev) => ({ ...prev, [field.key]: event.target.value }))}
                className="mt-2 w-full rounded-[20px] border border-white/26 bg-white/80 px-5 py-4 text-base text-[#002f6c] outline-none"
              />
            </label>
          ))}

          <button type="submit" className="w-full rounded-[22px] bg-[#002f6c] px-5 py-4 text-sm md:text-base font-semibold text-white">
            Сохранить изменения
          </button>
        </form>
      </section>

      <aside className="space-y-6">
        <div className="rounded-[34px] border border-white/20 bg-white/55 backdrop-blur-[28px] p-6 md:p-8">
          <p className="text-[11px] uppercase tracking-[0.28em] font-black text-[#7b95bf]">Сервисные настройки</p>
          <div className="space-y-4 mt-6">
            {[
              { title: 'Email для входа', value: sd_user.profile.email, icon: ShieldCheck },
              { title: 'Уровень лояльности', value: sd_user.profile.loyaltyLevel, icon: CreditCard },
              { title: 'Любимый врач', value: 'Подтягивается из истории визитов', icon: Stethoscope },
            ].map((item) => (
              <div key={item.title} className="rounded-[24px] border border-white/18 bg-white/70 px-5 py-4 flex items-center gap-4">
                <div className="w-11 h-11 rounded-[16px] bg-[#0055ff]/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-[#0055ff]" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] font-black text-[#7b95bf]">{item.title}</p>
                  <p className="mt-2 text-base font-semibold text-[#002f6c]">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[34px] border border-white/20 bg-[#002f6c] text-white p-6 md:p-8">
          <p className="text-[11px] uppercase tracking-[0.28em] font-black text-white/55">Сессия</p>
          <h4 className="mt-3 text-3xl font-semibold">Выход из кабинета</h4>
          <p className="mt-3 text-white/72 leading-relaxed">
            Все данные сохранятся в localStorage этого браузера, а вы сможете снова войти по email и паролю.
          </p>
          <button
            type="button"
            onClick={sd_logout}
            className="mt-6 w-full rounded-[22px] border border-white/20 bg-white/10 px-5 py-4 text-sm md:text-base font-semibold text-white hover:bg-white/15 transition-colors inline-flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Выйти
          </button>
        </div>
      </aside>
    </div>
  );
};

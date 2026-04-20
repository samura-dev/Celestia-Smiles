import type { SdCabinetUser } from '../sd_cabinetTypes';
import { sd_formatCurrency, sd_topupOptions } from '../sd_cabinetMeta';
import { useSdCabinetStore } from '../../store/sd_cabinetStore';

export const SdCabinetFinancesSection = ({ sd_user }: { sd_user: SdCabinetUser }) => {
  const { sd_addTopup } = useSdCabinetStore();

  return (
    <div className="space-y-6">
      <section className="grid lg:grid-cols-[0.95fr_1.05fr] gap-6">
        <div className="rounded-[34px] border border-white/20 bg-[#002f6c] text-white p-6 md:p-8">
          <p className="text-[11px] uppercase tracking-[0.28em] font-black text-white/55">Баланс пациента</p>
          <p className="mt-4 text-5xl md:text-6xl font-semibold tracking-tight">{sd_formatCurrency(sd_user.profile.balance)}</p>
          <p className="mt-4 text-white/72 max-w-[420px] leading-relaxed">
            Внутренний баланс удобно использовать для резервирования этапов лечения и быстрых оплат без звонка администратору.
          </p>
          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="rounded-[22px] bg-white/10 px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.18em] font-black text-white/55">Бонусы</p>
              <p className="mt-2 text-2xl font-semibold">{sd_formatCurrency(sd_user.profile.bonusBalance)}</p>
            </div>
            <div className="rounded-[22px] bg-white/10 px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.18em] font-black text-white/55">Уровень</p>
              <p className="mt-2 text-2xl font-semibold">{sd_user.profile.loyaltyLevel}</p>
            </div>
          </div>
        </div>

        <div className="rounded-[34px] border border-white/20 bg-white/55 backdrop-blur-[28px] p-6 md:p-8">
          <p className="text-[11px] uppercase tracking-[0.28em] font-black text-[#7b95bf]">Быстрое пополнение</p>
          <h3 className="mt-3 text-3xl font-semibold text-[#002f6c]">Добавить средства в кабинет</h3>
          <p className="mt-3 text-[#002f6c]/64 leading-relaxed">
            Пока это локальная демонстрация, но сценарий уже рабочий: сумма зачисляется, история обновляется, уведомление приходит мгновенно.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mt-6">
            {sd_topupOptions.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => sd_addTopup(value)}
                className="rounded-[20px] border border-white/20 bg-white/78 px-4 py-4 text-left hover:border-[#0055ff]/20 hover:bg-white transition-colors"
              >
                <p className="text-[10px] uppercase tracking-[0.18em] font-black text-[#7b95bf]">Пополнить</p>
                <p className="mt-2 text-2xl font-semibold text-[#002f6c]">{sd_formatCurrency(value)}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[34px] border border-white/20 bg-white/55 backdrop-blur-[28px] p-6 md:p-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] font-black text-[#7b95bf]">История операций</p>
          <h3 className="mt-2 text-3xl font-semibold text-[#002f6c]">Движение средств</h3>
        </div>

        <div className="space-y-4 mt-6">
          {sd_user.transactions.map((item) => (
            <div
              key={item.id}
              className="rounded-[24px] border border-white/18 bg-white/72 px-5 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <p className="text-lg font-semibold text-[#002f6c]">{item.title}</p>
                <p className="mt-1 text-sm text-[#002f6c]/62">{item.description}</p>
                <p className="mt-2 text-[12px] uppercase tracking-[0.18em] font-black text-[#7b95bf]">
                  {new Date(item.createdAt).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div className={`text-2xl font-semibold ${item.amount >= 0 ? 'text-[#0d8b54]' : 'text-[#002f6c]'}`}>
                {item.amount >= 0 ? '+' : ''}
                {sd_formatCurrency(item.amount)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

import { useState } from 'react';
import { ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useSdCabinetStore } from '../../store/sd_cabinetStore';

export const SdCabinetAuthScreen = () => {
  const [searchParams] = useSearchParams();
  const [sd_mode, setSdMode] = useState<'login' | 'register'>(
    searchParams.get('mode') === 'login' ? 'login' : 'register',
  );
  const [sd_registerForm, setSdRegisterForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
  });
  const [sd_loginForm, setSdLoginForm] = useState({
    email: '',
    password: '',
  });

  const { sd_register, sd_login, sd_error, sd_clearError, sd_isBusy } = useSdCabinetStore();

  return (
    <div className="w-full min-h-screen pt-28 md:pt-36 pb-20 px-[15px] md:px-[40px] overflow-x-clip">
      <div className="max-w-[1920px] mx-auto">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#0055ff] hover:text-[#003dbb] transition-colors text-sm font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            На главную
          </Link>
        </div>

        <div className="grid xl:grid-cols-[minmax(0,1.16fr)_minmax(560px,0.84fr)] gap-6 xl:gap-8">
          <section className="rounded-[42px] border border-white/18 bg-white/50 backdrop-blur-[26px] shadow-[0_30px_90px_-45px_rgba(0,47,108,0.32)] p-6 md:p-8 lg:p-10 overflow-hidden relative min-w-0">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(0,85,255,0.18),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(0,47,108,0.08),transparent_36%)]" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-[18px] bg-[#0055ff]/12 border border-[#0055ff]/12 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-[#0055ff]" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.26em] font-black text-[#0055ff]">
                    Личный кабинет
                  </p>
                  <p className="text-sm text-[#002f6c]/60">Пациентское пространство Celestia Smiles</p>
                </div>
              </div>

              <h1 className="max-w-[820px] text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[0.94] text-[#002f6c]">
                Все визиты, план лечения и финансы в одном кабинете
              </h1>
              <p className="mt-6 max-w-[760px] text-base md:text-xl text-[#002f6c]/68 leading-relaxed">
                Без звонков и хаоса: следим за этапами лечения, смотрим документы, бронируем новые
                приемы и контролируем внутренний баланс прямо с телефона.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-8">
                {[
                  'Предстоящие и прошедшие приемы',
                  'Онлайн-запись к нужному врачу',
                  'Баланс, платежи и история операций',
                  'План лечения, документы и уведомления',
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[26px] border border-white/18 bg-white/52 backdrop-blur-[18px] px-5 py-4 text-[#002f6c] font-medium"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#0055ff]" />
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-[42px] border border-white/20 bg-[#eff5ff]/82 backdrop-blur-[28px] shadow-[0_30px_90px_-45px_rgba(0,47,108,0.36)] p-6 md:p-8 min-w-0">
            <div className="flex rounded-full border border-white/25 bg-white/45 p-1 w-full max-w-[320px]">
              {[
                { id: 'register', label: 'Регистрация' },
                { id: 'login', label: 'Вход' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    sd_clearError();
                    setSdMode(item.id as 'login' | 'register');
                  }}
                  className={`flex-1 rounded-full px-4 py-3 text-sm font-semibold transition-all ${
                    sd_mode === item.id
                      ? 'bg-[#002f6c] text-white shadow-[0_12px_34px_-18px_rgba(0,47,108,0.55)]'
                      : 'text-[#002f6c]/65'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mt-8">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#002f6c]">
                {sd_mode === 'register' ? 'Создать кабинет пациента' : 'Войти в кабинет'}
              </h2>
              <p className="mt-3 text-[#002f6c]/65 leading-relaxed">
                {sd_mode === 'register'
                  ? 'После регистрации сразу создадим демо-наполнение: приемы, документы, уведомления и финансы.'
                  : 'Используйте email и пароль, указанные при регистрации в этом браузере.'}
              </p>
            </div>

            <form
              className="mt-8 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                if (sd_mode === 'register') {
                  sd_register(sd_registerForm);
                  return;
                }
                sd_login(sd_loginForm);
              }}
            >
              {sd_mode === 'register' ? (
                <>
                  <label className="block">
                    <span className="text-[11px] uppercase tracking-[0.24em] font-black text-[#7b95bf]">
                      ФИО
                    </span>
                    <input
                      value={sd_registerForm.fullName}
                      onChange={(event) =>
                        setSdRegisterForm((prev) => ({ ...prev, fullName: event.target.value }))
                      }
                      className="mt-2 w-full rounded-[20px] border border-white/28 bg-white/78 px-5 py-4 text-base text-[#002f6c] outline-none focus:border-[#0055ff]/35"
                      placeholder="Екатерина Смирнова"
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="text-[11px] uppercase tracking-[0.24em] font-black text-[#7b95bf]">
                      Телефон
                    </span>
                    <input
                      value={sd_registerForm.phone}
                      onChange={(event) =>
                        setSdRegisterForm((prev) => ({ ...prev, phone: event.target.value }))
                      }
                      className="mt-2 w-full rounded-[20px] border border-white/28 bg-white/78 px-5 py-4 text-base text-[#002f6c] outline-none focus:border-[#0055ff]/35"
                      placeholder="+7 (999) 000-00-00"
                      required
                    />
                  </label>
                </>
              ) : null}

              <label className="block">
                <span className="text-[11px] uppercase tracking-[0.24em] font-black text-[#7b95bf]">
                  Email
                </span>
                <input
                  type="email"
                  value={sd_mode === 'register' ? sd_registerForm.email : sd_loginForm.email}
                  onChange={(event) =>
                    sd_mode === 'register'
                      ? setSdRegisterForm((prev) => ({ ...prev, email: event.target.value }))
                      : setSdLoginForm((prev) => ({ ...prev, email: event.target.value }))
                  }
                  className="mt-2 w-full rounded-[20px] border border-white/28 bg-white/78 px-5 py-4 text-base text-[#002f6c] outline-none focus:border-[#0055ff]/35"
                  placeholder="patient@celestia-smiles.ru"
                  required
                />
              </label>

              <label className="block">
                <span className="text-[11px] uppercase tracking-[0.24em] font-black text-[#7b95bf]">
                  Пароль
                </span>
                <input
                  type="password"
                  minLength={6}
                  value={sd_mode === 'register' ? sd_registerForm.password : sd_loginForm.password}
                  onChange={(event) =>
                    sd_mode === 'register'
                      ? setSdRegisterForm((prev) => ({ ...prev, password: event.target.value }))
                      : setSdLoginForm((prev) => ({ ...prev, password: event.target.value }))
                  }
                  className="mt-2 w-full rounded-[20px] border border-white/28 bg-white/78 px-5 py-4 text-base text-[#002f6c] outline-none focus:border-[#0055ff]/35"
                  placeholder="Минимум 6 символов"
                  required
                />
              </label>

              {sd_error ? (
                <div className="rounded-[18px] border border-[#ff8b8b]/20 bg-[#fff1f1] px-4 py-3 text-sm text-[#9d2b2b]">
                  {sd_error}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={sd_isBusy}
                className="w-full rounded-[22px] bg-[#002f6c] px-5 py-4 text-sm md:text-base font-semibold text-white hover:bg-[#00439a] transition-colors disabled:opacity-60"
              >
                {sd_mode === 'register' ? 'Создать кабинет' : 'Войти'}
              </button>
            </form>

            <p className="mt-5 text-sm text-[#002f6c]/55 leading-relaxed">
              Все данные хранятся локально в этом браузере. Это демо-кабинет без сервера, но со
              всей пользовательской логикой.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

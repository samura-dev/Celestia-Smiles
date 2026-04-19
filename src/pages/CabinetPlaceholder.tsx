import { motion } from 'framer-motion';
import { ArrowLeft, LockKeyhole, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SdPrimaryButton } from '../components/ui/sd_primary_button';

export const CabinetPlaceholder = () => {
  return (
    <div className="w-full min-h-screen pt-32 md:pt-40 pb-24 px-[15px] md:px-[40px]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#0055ff] hover:text-[#003dbb] transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            На главную
          </Link>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.18 }}
          className="relative overflow-hidden rounded-[48px] border border-white/20 bg-white/[0.08] backdrop-blur-[28px] shadow-[0_30px_90px_-30px_rgba(0,47,108,0.35)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,85,255,0.16),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(0,47,108,0.12),transparent_34%)] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 p-8 md:p-12 lg:p-16">
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-[20px] bg-[#0055ff]/10 border border-[#0055ff]/15 flex items-center justify-center">
                  <LockKeyhole className="w-7 h-7 text-[#0055ff]" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-[0.28em] text-[#0055ff]">
                  Личный кабинет
                </span>
              </div>

              <div className="max-w-[680px]">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-[#002f6c] leading-[0.95]">
                  Скоро здесь появится
                  <br />
                  цифровое пространство пациента
                </h1>
                <p className="mt-6 text-base md:text-xl text-[#002f6c]/70 leading-relaxed font-medium">
                  Мы готовим кабинет, где можно будет смотреть план лечения, историю визитов,
                  рекомендации врача, документы и запись на прием в одном месте.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                <div className="w-full max-w-sm">
                  <SdPrimaryButton text="Вернуться на главную" link="/" />
                </div>
                <p className="text-sm text-[#002f6c]/55 font-medium">
                  Пока кабинет в разработке, запись и консультации доступны через сайт и по телефону.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:gap-5 self-end">
              {[
                'История визитов и лечения',
                'Онлайн-запись и напоминания',
                'Персональные рекомендации врача',
                'Документы, чеки и планы лечения',
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.08, duration: 0.45 }}
                  className="flex items-center gap-4 rounded-[28px] border border-white/20 bg-white/[0.08] backdrop-blur-[20px] px-5 py-4"
                >
                  <div className="w-10 h-10 rounded-full bg-[#0055ff]/12 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-[#0055ff]" />
                  </div>
                  <span className="text-sm md:text-base font-medium text-[#002f6c]">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};


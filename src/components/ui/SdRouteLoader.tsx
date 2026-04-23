import { motion, useReducedMotion } from 'framer-motion';

export const SdRouteLoader = () => {
  const sd_prefersReducedMotion = useReducedMotion();

  return (
    <div className="w-full min-h-screen px-[15px] md:px-[40px] pt-24 md:pt-32 pb-20">
      <div className="mx-auto max-w-[1920px]">
        <div className="sd_loader_shell relative overflow-hidden rounded-[38px] border border-white/20 bg-white/50 backdrop-blur-[26px] shadow-[0_32px_90px_-44px_rgba(0,47,108,0.28)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(0,85,255,0.15),transparent_34%),radial-gradient(circle_at_85%_75%,rgba(0,47,108,0.14),transparent_38%)]" />

          <div className="relative z-10 flex min-h-[60vh] flex-col items-center justify-center px-6 py-10 text-center md:px-12">
            <div className="mb-8 inline-flex items-center justify-center rounded-[18px] border border-white/30 bg-white/55 px-4 py-3 shadow-[0_18px_50px_-32px_rgba(0,47,108,0.55)]">
              <div className="text-left leading-none">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#0055ff]">Celestia</p>
                <p className="mt-1 text-[10px] font-black uppercase tracking-[0.24em] text-[#0055ff]">Smiles</p>
              </div>
            </div>

            <div className="relative mb-8 h-[72px] w-[72px]">
              <motion.div
                animate={
                  sd_prefersReducedMotion
                    ? undefined
                    : { rotate: 360 }
                }
                transition={
                  sd_prefersReducedMotion
                    ? undefined
                    : { duration: 2.4, ease: 'linear', repeat: Number.POSITIVE_INFINITY }
                }
                className="absolute inset-0 rounded-full border border-[#0055ff]/30"
              />
              <motion.div
                animate={
                  sd_prefersReducedMotion
                    ? undefined
                    : { rotate: -360 }
                }
                transition={
                  sd_prefersReducedMotion
                    ? undefined
                    : { duration: 3.2, ease: 'linear', repeat: Number.POSITIVE_INFINITY }
                }
                className="absolute inset-[8px] rounded-full border border-transparent border-t-[#0055ff] border-r-[#0055ff]/40"
              />
              <div className="absolute inset-[20px] rounded-full bg-[#0055ff]/16" />
            </div>

            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-[#002f6c]">
              Подготавливаем пространство улыбки
            </h2>
            <p className="mt-3 max-w-[620px] text-base md:text-lg font-medium text-[#002f6c]/62">
              Загружаем раздел и синхронизируем интерфейс клиники.
            </p>

            <div className="mt-8 h-[10px] w-full max-w-[520px] overflow-hidden rounded-full border border-white/28 bg-white/58">
              <motion.div
                animate={
                  sd_prefersReducedMotion
                    ? { width: '58%' }
                    : { x: ['-40%', '120%'] }
                }
                transition={
                  sd_prefersReducedMotion
                    ? undefined
                    : { duration: 1.8, ease: [0.16, 1, 0.3, 1], repeat: Number.POSITIVE_INFINITY }
                }
                className="h-full w-[45%] rounded-full bg-gradient-to-r from-[#0055ff]/45 via-[#7cb4ff]/90 to-[#0055ff]/45 shadow-[0_0_24px_rgba(0,85,255,0.35)]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

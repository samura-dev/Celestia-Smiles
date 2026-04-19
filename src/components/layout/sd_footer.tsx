import { ArrowUpRight, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { sd_servicesData } from '../../data/sd_services';

export const SdFooter = () => {
  const { pathname } = useLocation();

  const sd_footerPages = [
    { name: 'Услуги', path: '/services' },
    { name: 'Специалисты', path: '/doctors' },
    { name: 'Личный кабинет', path: '/cabinet' },
    { name: 'Карта сайта', path: '/sitemap' },
  ];

  const sd_footerCategories = sd_servicesData.map((category) => ({
    name: category.title,
    path: `/services/${category.id}`,
  }));

  return (
    <footer className="w-full relative z-40 bg-[#071324] text-white pt-20 pb-8 px-[15px] md:px-[60px] overflow-hidden pointer-events-auto">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[300px] bg-[#0055ff]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#0055ff]/40 to-transparent" />

      <div className="max-w-[1920px] mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-20">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#0055ff]">
                <path d="M12 22C12 22 17 19.5 19 14.5C21 9.5 19 3 14.5 3C12.5 3 12 5.5 12 5.5C12 5.5 11.5 3 9.5 3C5 3 3 9.5 5 14.5C7 19.5 12 22 12 22Z" fill="currentColor" fillOpacity="0.8"/>
                <path d="M12 11V22M8 12L8 18M16 12L16 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
              </svg>
              <div className="font-semibold tracking-tighter leading-none flex flex-col uppercase text-[18px]">
                <span>Celestia</span>
                <span className="text-[#0055ff]">Smiles</span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-[300px]">
              Искусство безупречной стоматологии. Мы объединяем передовые технологии и эстетику для создания вашей идеальной улыбки.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Навигация</h4>
            {sd_footerPages.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center w-fit ${pathname === item.path ? 'text-white' : ''}`}
              >
                <span className="text-white/70 group-hover:text-white transition-colors">{item.name}</span>
                <ArrowUpRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-[#0055ff]" />
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-5">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Направления</h4>
            {sd_footerCategories.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center w-fit ${pathname === item.path ? 'text-white' : ''}`}
              >
                <span className="text-white/70 group-hover:text-white transition-colors">{item.name}</span>
                <ArrowUpRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-[#0055ff]" />
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-5">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Контакты</h4>

            <a href="tel:+74950000000" className="flex items-start gap-3 group w-fit">
              <Phone className="w-5 h-5 text-[#0055ff] mt-0.5" />
              <div className="flex flex-col">
                <span className="text-lg font-medium text-white group-hover:text-[#4da6ff] transition-colors">+7 (495) 000-00-00</span>
                <span className="text-xs text-white/40 leading-none mt-1">Звонок бесплатный</span>
              </div>
            </a>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-white/30 mt-0.5" />
              <span className="text-white/70 max-w-[200px] leading-relaxed">
                г. Москва, Пресненская набережная, 12 (Москва-Сити)
              </span>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-white/30 mt-0.5" />
              <span className="text-white/70 leading-relaxed">
                Пн - Вс: 09:00 - 21:00<br />Без выходных
              </span>
            </div>

            <a href="mailto:hello@celestiasmiles.ru" className="flex items-center gap-3 group w-fit mt-2">
              <Mail className="w-5 h-5 text-white/30 group-hover:text-[#0055ff] transition-colors" />
              <span className="text-white/70 group-hover:text-white transition-colors">hello@celestiasmiles.ru</span>
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-xs text-center md:text-left font-medium">
            © {new Date().getFullYear()} Celestia Smiles. Все права защищены. <br className="md:hidden" />
            Лицензия ЛО-77-01-000000 от 01.01.2024
            <br />
            <a
              href="https://meloddydesign.ru/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-white/55 hover:text-white transition-colors"
            >
              Разработано meloddy.design
            </a>
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-xs text-white/40 font-medium">
            <Link to="/privacy" className="hover:text-white transition-colors">Политика конфиденциальности</Link>
            <span className="hidden md:inline">•</span>
            <Link to="/legal" className="hover:text-white transition-colors">Правовая информация</Link>
            <span className="hidden md:inline">•</span>
            <Link to="/sitemap" className="hover:text-white transition-colors">Карта сайта</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

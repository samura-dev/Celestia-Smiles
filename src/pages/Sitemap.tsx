
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { sd_servicesData } from '../data/sd_services';
import { SdBreadcrumbs } from '../components/ui/SdBreadcrumbs';
import { Map, ArrowRight, BookOpen, Shield } from 'lucide-react';

export const Sitemap = () => {
  return (
    <div className="sd_sitemap_page w-full min-h-screen pt-32 pb-24 px-[20px] md:px-[40px]">
      <div className="max-w-[1920px] mx-auto relative z-10">
        <SdBreadcrumbs items={[{ label: 'Карта сайта' }]} />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <Map className="w-8 h-8 text-[#0055ff]" />
            <span className="text-[#0055ff] font-black uppercase tracking-[0.3em] text-xs">Navigation Hub</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-medium text-[#002f6c] tracking-tighter uppercase leading-[0.9]">
            Карта <span className="text-[#0055ff]">сайта</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          
          {/* Main Pages */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#0055ff]/5 flex items-center justify-center">
                 <ArrowRight className="w-5 h-5 text-[#0055ff]" />
              </div>
              <h3 className="text-xl font-black text-[#002f6c] uppercase tracking-tight">Основные разделы</h3>
            </div>
            <ul className="flex flex-col gap-4 pl-14">
              <li><Link to="/" className="text-slate-500 hover:text-[#0055ff] transition-colors font-medium">Главная страница</Link></li>
              <li><Link to="/services" className="text-slate-500 hover:text-[#0055ff] transition-colors font-medium">Все услуги</Link></li>
              <li><Link to="/doctors" className="text-slate-500 hover:text-[#0055ff] transition-colors font-medium">Наши специалисты</Link></li>
              <li><Link to="/#faq" className="text-slate-500 hover:text-[#0055ff] transition-colors font-medium">Вопросы и ответы</Link></li>
            </ul>
          </motion.div>

          {/* Services Deep Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#0055ff]/5 flex items-center justify-center">
                 <BookOpen className="w-5 h-5 text-[#0055ff]" />
              </div>
              <h3 className="text-xl font-black text-[#002f6c] uppercase tracking-tight">Направления</h3>
            </div>
            <ul className="flex flex-col gap-4 pl-14">
              {sd_servicesData.map(service => (
                <li key={service.id}>
                  <Link to={`/services/${service.id}`} className="text-slate-500 hover:text-[#0055ff] transition-colors font-medium">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal and Support */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#0055ff]/5 flex items-center justify-center">
                 <Shield className="w-5 h-5 text-[#0055ff]" />
              </div>
              <h3 className="text-xl font-black text-[#002f6c] uppercase tracking-tight">Документы</h3>
            </div>
            <ul className="flex flex-col gap-4 pl-14">
              <li><Link to="/privacy" className="text-slate-500 hover:text-[#0055ff] transition-colors font-medium">Политика конфиденциальности</Link></li>
              <li><Link to="/legal" className="text-slate-500 hover:text-[#0055ff] transition-colors font-medium">Юридическая информация</Link></li>
              <li><Link to="/#calculator" className="text-slate-500 hover:text-[#0055ff] transition-colors font-medium">Калькулятор стоимости</Link></li>
            </ul>
          </motion.div>

        </div>
      </div>
    </div>
  );
};


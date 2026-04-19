
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { sd_servicesData } from '../data/sd_services';
import { SdBreadcrumbs } from '../components/ui/SdBreadcrumbs';
import { SdPrimaryButton } from '../components/ui/sd_primary_button';
import { ArrowRight, Activity, Plus } from 'lucide-react';
import { useState } from 'react';

export const ServiceDetail = () => {
  const { categoryId, serviceId } = useParams();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  
  const category = sd_servicesData.find(c => c.id === categoryId);
  const service = category?.services.find(s => s.id === serviceId);

  if (!category || !service) {
    return (
      <div className="pt-40 text-center">
        <h1 className="text-2xl font-bold text-[#002f6c]">Услуга не найдена</h1>
        <Link to="/services" className="text-blue-500 mt-4 block underline">Вернуться к списку услуг</Link>
      </div>
    );
  }

  const sd_serviceHeroImage = `/service-heroes/${service.id}.png`;

  return (
    <div className="sd_service_detail_page w-full min-h-screen bg-transparent">
      {/* Wrapper to enforce grid */}
      <div className="max-w-[1920px] mx-auto px-[20px] md:px-[40px] pt-32 pb-24 relative z-10">
        <SdBreadcrumbs items={[
          { label: 'Услуги', path: '/services' },
          { label: category.title, path: `/services/${category.id}` },
          { label: service.title }
        ]} />

        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 mb-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-4 mb-6">
               <span className="w-12 h-[1px] bg-[#0055ff]" />
               <span className="text-[#0055ff] font-black uppercase tracking-[0.3em] text-[11px]">
                 Premium Dentistry
               </span>
            </div>
            <h1 className="sd-mobile-text-glow text-4xl md:text-8xl font-medium text-[#002f6c] mb-10 tracking-tighter leading-[0.9] uppercase">
              {service.title}
            </h1>
            <p className="sd-mobile-text-glow-soft text-slate-500 text-lg md:text-xl font-medium leading-relaxed mb-12 max-w-[600px]">
              {service.fullDescription || service.description}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-8 md:gap-10">
              <div className="w-full sm:w-80">
                <SdPrimaryButton text="ЗАПИСАТЬСЯ" icon={ArrowRight} link={`?modal=appointment&direction=${category.id}`} />
              </div>
              <div className="flex flex-col">
                <span className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Стоимость</span>
                <span className="text-3xl font-black text-[#002f6c]">{service.price}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="sd-mobile-glass relative aspect-square md:aspect-video lg:aspect-square rounded-[60px] overflow-hidden group shadow-[0_50px_100px_-20px_rgba(0,47,108,0.2)] border border-white/20 bg-white/[0.08] backdrop-blur-[22px]"
          >
            <img 
              src={sd_serviceHeroImage}
              alt={service.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#eaf2ff]/20 via-transparent to-white/10 pointer-events-none" />
            {/* Float Badge */}
            <div className="absolute top-10 left-10 p-6 rounded-[30px] bg-white/[0.14] backdrop-blur-2xl border border-white/20 shadow-2xl flex items-center gap-4 animate-bounce-slow">
               <div className="w-12 h-12 rounded-full bg-[#002f6c] text-white flex items-center justify-center">
                 <Activity className="w-6 h-6" />
               </div>
               <div>
                  <div className="text-[#002f6c] font-black text-xs uppercase tracking-widest">ISO 9001</div>
                  <div className="text-slate-600 text-[11px] font-bold">Высший стандарт качества</div>
               </div>
            </div>
          </motion.div>
        </section>

        {/* Price Table Segment */}
        {service.priceTable && (
          <section className="mb-32">
            <h2 className="sd-mobile-text-glow text-4xl md:text-5xl font-medium text-[#002f6c] mb-16 tracking-tighter uppercase">Прайс-лист</h2>
            <div className="sd-mobile-glass bg-white/[0.08] rounded-[48px] border border-white/20 backdrop-blur-[22px] overflow-hidden">
              <div className="bg-transparent overflow-hidden">
                {service.priceTable.map((item, i) => (
                  <div key={i} className="flex flex-col items-start gap-3 md:flex-row md:justify-between md:items-center p-6 md:p-10 border-b border-white/10 last:border-0 hover:bg-white/[0.06] transition-colors group">
                    <span className="text-base md:text-xl font-bold text-[#002f6c] tracking-tight">{item.name}</span>
                    <span className="self-end md:self-auto text-xl md:text-2xl font-black text-[#0055ff] whitespace-nowrap text-right">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Process Roadmap */}
        {service.process && (
          <section className="mb-32">
            <h2 className="sd-mobile-text-glow text-4xl md:text-5xl font-medium text-[#002f6c] mb-20 tracking-tighter uppercase text-center">Этапы лечения</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {service.process.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col gap-8 group"
                >
                  <div className="relative">
                    <span className="text-8xl font-black text-[#0055ff]/5 absolute -top-10 -left-4 group-hover:text-[#0055ff]/10 transition-colors">0{step.step}</span>
                    <div className="w-16 h-16 rounded-[24px] bg-[#002f6c] text-white flex items-center justify-center text-xl font-black relative z-10 shadow-xl group-hover:scale-110 transition-transform">
                      {step.step}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-[#002f6c] mb-4 uppercase tracking-tight leading-tight">{step.title}</h4>
                    <p className="text-slate-500 font-medium leading-relaxed text-lg">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ Section Full Width */}
        {service.faq && (
          <section className="mb-32 w-full">
            <h2 className="text-4xl md:text-5xl font-medium text-[#002f6c] mb-16 tracking-tighter uppercase text-center">Частые вопросы</h2>
            <div className="flex flex-col gap-4">
              {service.faq.map((item, i) => (
                <div 
                  key={i} 
                  className={`sd-mobile-glass border rounded-[32px] overflow-hidden transition-all duration-500 backdrop-blur-[22px] ${openFaq === i ? 'bg-white/[0.12] border-[#0055ff]/35' : 'bg-white/[0.07] border-white/15 hover:border-[#0055ff]/20'}`}
                >
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-8 md:p-10 text-left outline-none"
                  >
                    <span className={`text-xl font-bold tracking-tight uppercase transition-colors ${openFaq === i ? 'text-[#0055ff]' : 'text-[#002f6c]'}`}>
                      {item.question}
                    </span>
                    <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 ${openFaq === i ? 'bg-[#002f6c] border-[#002f6c] text-white rotate-180' : 'bg-white/[0.08] border-white/20 text-[#002f6c]'}`}>
                      <Plus className={`w-6 h-6 transition-transform ${openFaq === i ? 'rotate-45' : ''}`} />
                    </div>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-10 pb-10 text-slate-500 text-lg md:text-xl leading-relaxed font-medium">
                      {item.answer}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA Master */}
        <section className="text-center p-16 lg:p-32 rounded-[80px] bg-[#002f6c] text-white relative overflow-hidden shadow-[0_60px_120px_-20px_rgba(0,47,108,0.4)]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0055ff]/20 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center gap-10">
            <div className="w-20 h-[2px] bg-[#0055ff]" />
            <h2 className="text-4xl md:text-7xl font-medium tracking-tighter uppercase leading-[0.95]">
              Верните уверенность<br />в своей улыбке
            </h2>
            <p className="text-white/60 text-xl max-w-[700px] font-medium leading-relaxed">
              Запишитесь на первичную консультацию — мы проведем полную диагностику 
              и составим план преображения вашей улыбки.
            </p>
            <div className="w-full max-w-md">
               <SdPrimaryButton text="НАЧАТЬ ПРЕОБРАЖЕНИЕ" icon={ArrowRight} link={`?modal=appointment&direction=${category.id}`} className="border-white text-white hover:border-[#0055ff]" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};



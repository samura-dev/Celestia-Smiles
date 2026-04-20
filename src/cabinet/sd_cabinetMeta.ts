import {
  ArrowDownToLine,
  Banknote,
  Bell,
  CalendarClock,
  CalendarDays,
  FileText,
  LayoutDashboard,
  NotebookTabs,
  ShieldCheck,
  UserRound,
  Wallet,
} from 'lucide-react';
import type { SdCabinetAppointment, SdCabinetSectionId } from './sd_cabinetTypes';

export const sd_cabinetSections: {
  id: SdCabinetSectionId;
  title: string;
  subtitle: string;
  icon: typeof LayoutDashboard;
}[] = [
  { id: 'dashboard', title: 'Обзор', subtitle: 'Ключевая сводка', icon: LayoutDashboard },
  { id: 'appointments', title: 'Мои приемы', subtitle: 'Будущие и прошедшие', icon: CalendarDays },
  { id: 'booking', title: 'Новая запись', subtitle: 'Выбор врача и времени', icon: CalendarClock },
  { id: 'finances', title: 'Финансы', subtitle: 'Баланс и история', icon: Wallet },
  { id: 'treatment', title: 'План лечения', subtitle: 'Статусы этапов', icon: NotebookTabs },
  { id: 'documents', title: 'Документы', subtitle: 'Планы и согласия', icon: FileText },
  { id: 'notifications', title: 'Уведомления', subtitle: 'Напоминания и новости', icon: Bell },
  { id: 'settings', title: 'Профиль', subtitle: 'Контакты и настройки', icon: UserRound },
];

export const sd_timeSlots = ['09:30', '10:30', '11:30', '13:00', '15:00', '17:30', '19:00'];
export const sd_topupOptions = [5000, 10000, 25000, 50000];

export const sd_summaryCards = [
  {
    title: 'Сессия',
    value: 'Local-first',
    icon: ShieldCheck,
    text: 'Вся логика кабинета уже рабочая и переживает перезагрузку без бэкенда.',
  },
  {
    title: 'Запись',
    value: 'Умная связка',
    icon: CalendarClock,
    text: 'Врач подбирается только из выбранного направления без ручной путаницы.',
  },
  {
    title: 'Финансы',
    value: 'Баланс пациента',
    icon: Banknote,
    text: 'Пополнения, оплаты и бонусы собираются в единую историю операций.',
  },
  {
    title: 'Документы',
    value: 'Под рукой',
    icon: ArrowDownToLine,
    text: 'Планы, согласия и рекомендации разложены по понятным карточкам.',
  },
];

export const sd_formatCurrency = (value: number) =>
  `${value.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ₽`;

export const sd_formatDate = (value: string) =>
  new Date(`${value}T12:00:00`).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export const sd_sortUpcomingAppointments = (items: SdCabinetAppointment[]) =>
  [...items].sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));

export const sd_sortPastAppointments = (items: SdCabinetAppointment[]) =>
  [...items].sort((a, b) => `${b.date}${b.time}`.localeCompare(`${a.date}${a.time}`));

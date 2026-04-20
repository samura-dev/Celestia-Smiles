import { sd_servicesData } from '../data/sd_services';
import { sd_specialistsData, type SdCategoryId, type SdSpecialist } from '../data/sd_specialists';
import type {
  SdCabinetAppointment,
  SdCabinetAuthPayload,
  SdCabinetBookingPayload,
  SdCabinetDocument,
  SdCabinetDirection,
  SdCabinetLoginPayload,
  SdCabinetNotification,
  SdCabinetProfileUpdatePayload,
  SdCabinetReschedulePayload,
  SdCabinetSession,
  SdCabinetStorageSnapshot,
  SdCabinetTransaction,
  SdCabinetTreatmentPlanItem,
  SdCabinetUser,
} from './sd_cabinetTypes';

const SD_CABINET_USERS_KEY = 'sd_cabinet_users';
const SD_CABINET_SESSION_KEY = 'sd_cabinet_session';
const SD_CABINET_PENDING_BOOKING_KEY = 'sd_cabinet_pending_booking';

const sd_defaultClinicAddress = 'Москва, Прогрессивная улица, 12';
const sd_defaultCabinet = 'Кабинет 4';

const sd_safeStorage = () => {
  if (typeof window === 'undefined') return null;
  return window.localStorage;
};

const sd_generateId = (prefix: string) => `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2, 10)}`;

const sd_shiftDate = (date: string, days: number) => {
  const value = new Date(`${date}T12:00:00`);
  value.setDate(value.getDate() + days);
  return value.toISOString().slice(0, 10);
};

const sd_createFutureDate = (days: number) => {
  const value = new Date();
  value.setHours(12, 0, 0, 0);
  value.setDate(value.getDate() + days);
  return value.toISOString().slice(0, 10);
};

const sd_readUsers = (): SdCabinetUser[] => {
  const storage = sd_safeStorage();
  if (!storage) return [];
  const raw = storage.getItem(SD_CABINET_USERS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as SdCabinetUser[];
  } catch {
    return [];
  }
};

const sd_writeUsers = (users: SdCabinetUser[]) => {
  const storage = sd_safeStorage();
  if (!storage) return;
  storage.setItem(SD_CABINET_USERS_KEY, JSON.stringify(users));
};

const sd_readSession = (): SdCabinetSession | null => {
  const storage = sd_safeStorage();
  if (!storage) return null;
  const raw = storage.getItem(SD_CABINET_SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SdCabinetSession;
  } catch {
    return null;
  }
};

const sd_writeSession = (session: SdCabinetSession | null) => {
  const storage = sd_safeStorage();
  if (!storage) return;
  if (!session) {
    storage.removeItem(SD_CABINET_SESSION_KEY);
    return;
  }
  storage.setItem(SD_CABINET_SESSION_KEY, JSON.stringify(session));
};

const sd_readPendingBooking = (): SdCabinetBookingPayload | null => {
  const storage = sd_safeStorage();
  if (!storage) return null;
  const raw = storage.getItem(SD_CABINET_PENDING_BOOKING_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SdCabinetBookingPayload;
  } catch {
    return null;
  }
};

const sd_writePendingBooking = (booking: SdCabinetBookingPayload | null) => {
  const storage = sd_safeStorage();
  if (!storage) return;
  if (!booking) {
    storage.removeItem(SD_CABINET_PENDING_BOOKING_KEY);
    return;
  }
  storage.setItem(SD_CABINET_PENDING_BOOKING_KEY, JSON.stringify(booking));
};

const sd_normalizeCategoryId = (categoryId: string): SdCategoryId | 'orthopedics' => {
  if (categoryId === 'orthopedics') return 'prosthetics';
  return categoryId as SdCategoryId | 'orthopedics';
};

export const sd_cabinetDirections: SdCabinetDirection[] = sd_servicesData.map((item) => ({
  id: item.id,
  title: item.title,
  description: item.description,
  canonicalId: sd_normalizeCategoryId(item.id),
}));

export const sd_getDoctorsByDirection = (directionId: string) => {
  const normalized = sd_normalizeCategoryId(directionId);
  return sd_specialistsData.filter((doctor) =>
    doctor.categoryIds.some((categoryId) => sd_normalizeCategoryId(categoryId) === normalized),
  );
};

const sd_pickDoctorForDirection = (directionId: string, fallbackIndex = 0): SdSpecialist => {
  const doctors = sd_getDoctorsByDirection(directionId);
  if (doctors[fallbackIndex]) return doctors[fallbackIndex];
  if (doctors[0]) return doctors[0];
  return sd_specialistsData[0];
};

const sd_createDemoAppointments = (userId: string): SdCabinetAppointment[] => {
  const therapyDoctor = sd_pickDoctorForDirection('therapy');
  const implantsDoctor = sd_pickDoctorForDirection('implants');
  const hygieneDoctor = sd_pickDoctorForDirection('hygiene');

  return [
    {
      id: sd_generateId('appt'),
      userId,
      directionId: 'implants',
      directionTitle: 'Имплантация',
      doctorId: implantsDoctor.id,
      doctorName: implantsDoctor.name,
      doctorRole: implantsDoctor.role,
      date: '2026-04-24',
      time: '11:30',
      status: 'scheduled',
      clinicAddress: sd_defaultClinicAddress,
      cabinet: 'Операционный блок 2',
      notes: 'Контроль состояния мягких тканей и подготовка к фиксации формирователя.',
      durationMinutes: 60,
      estimatedPrice: 12000,
      createdAt: new Date().toISOString(),
    },
    {
      id: sd_generateId('appt'),
      userId,
      directionId: 'therapy',
      directionTitle: 'Терапия',
      doctorId: therapyDoctor.id,
      doctorName: therapyDoctor.name,
      doctorRole: therapyDoctor.role,
      date: '2026-03-18',
      time: '15:00',
      status: 'completed',
      clinicAddress: sd_defaultClinicAddress,
      cabinet: 'Кабинет 7',
      notes: 'Лечение под микроскопом, фотопротокол и рекомендации по уходу.',
      durationMinutes: 90,
      estimatedPrice: 18500,
      createdAt: new Date().toISOString(),
    },
    {
      id: sd_generateId('appt'),
      userId,
      directionId: 'hygiene',
      directionTitle: 'Гигиена',
      doctorId: hygieneDoctor.id,
      doctorName: hygieneDoctor.name,
      doctorRole: hygieneDoctor.role,
      date: '2026-02-06',
      time: '10:00',
      status: 'completed',
      clinicAddress: sd_defaultClinicAddress,
      cabinet: 'Кабинет 3',
      notes: 'Профессиональная гигиена и реминерализующая терапия.',
      durationMinutes: 50,
      estimatedPrice: 9500,
      createdAt: new Date().toISOString(),
    },
  ];
};

const sd_createDemoTransactions = (userId: string): SdCabinetTransaction[] => [
  {
    id: sd_generateId('txn'),
    userId,
    type: 'topup',
    title: 'Пополнение депозита',
    description: 'Пополнение перед этапом имплантации.',
    amount: 50000,
    createdAt: '2026-04-10T10:15:00.000Z',
  },
  {
    id: sd_generateId('txn'),
    userId,
    type: 'payment',
    title: 'Оплата лечения под микроскопом',
    description: 'Терапевтический прием, закрытие счета после визита.',
    amount: -18500,
    createdAt: '2026-03-18T17:05:00.000Z',
  },
  {
    id: sd_generateId('txn'),
    userId,
    type: 'bonus',
    title: 'Начисление бонусов лояльности',
    description: 'Бонусы за выполнение плана лечения вовремя.',
    amount: 3500,
    createdAt: '2026-03-19T09:00:00.000Z',
  },
];

const sd_createDemoTreatmentPlan = (userId: string): SdCabinetTreatmentPlanItem[] => [
  {
    id: sd_generateId('plan'),
    userId,
    title: 'Диагностика и цифровое планирование',
    stage: 'Этап 1',
    status: 'completed',
    progress: 100,
    doctorName: 'Сергей Морозов',
    dateLabel: 'Завершено 05 апреля',
    note: 'Снимки, фотопротокол, КТ и финальное согласование хирургического шаблона.',
  },
  {
    id: sd_generateId('plan'),
    userId,
    title: 'Имплантация и мягкотканная подготовка',
    stage: 'Этап 2',
    status: 'in_progress',
    progress: 68,
    doctorName: 'Сергей Морозов',
    dateLabel: 'Следующий контроль 24 апреля',
    note: 'Идет приживление импланта, соблюдаем мягкий режим нагрузки и контрольные визиты.',
  },
  {
    id: sd_generateId('plan'),
    userId,
    title: 'Ортопедическая фиксация коронки',
    stage: 'Этап 3',
    status: 'planned',
    progress: 18,
    doctorName: 'Дмитрий Комаров',
    dateLabel: 'Запланировано на май',
    note: 'После полной стабилизации тканей будет изготовлена и установлена постоянная конструкция.',
  },
];

const sd_createDemoDocuments = (userId: string): SdCabinetDocument[] => [
  {
    id: sd_generateId('doc'),
    userId,
    title: 'План лечения на 2026 год',
    type: 'План',
    status: 'signed',
    issuedAt: '2026-04-05',
    summary: 'Общая стратегия лечения, сроки, стоимость этапов и состав команды.',
  },
  {
    id: sd_generateId('doc'),
    userId,
    title: 'Информированное согласие на имплантацию',
    type: 'Согласие',
    status: 'signed',
    issuedAt: '2026-04-12',
    summary: 'Подписанное согласие с рекомендациями на период реабилитации.',
  },
  {
    id: sd_generateId('doc'),
    userId,
    title: 'Рекомендации после хирургического этапа',
    type: 'Рекомендации',
    status: 'pending',
    issuedAt: '2026-04-19',
    summary: 'Появятся после контрольного приема и подтверждения динамики.',
  },
];

const sd_createDemoNotifications = (userId: string): SdCabinetNotification[] => [
  {
    id: sd_generateId('notice'),
    userId,
    title: 'Напоминание о ближайшем визите',
    message: '24 апреля в 11:30 вас ожидает Сергей Морозов. Пожалуйста, не ешьте за 2 часа до приема.',
    createdAt: '2026-04-19T09:30:00.000Z',
    isRead: false,
  },
  {
    id: sd_generateId('notice'),
    userId,
    title: 'План лечения обновлен',
    message: 'В кабинете появился новый комментарий врача по этапу ортопедической фиксации.',
    createdAt: '2026-04-15T14:15:00.000Z',
    isRead: true,
  },
];

const sd_calculateBalance = (transactions: SdCabinetTransaction[]) =>
  transactions.reduce((sum, item) => sum + item.amount, 0);

const sd_createUser = (payload: SdCabinetAuthPayload): SdCabinetUser => {
  const id = sd_generateId('user');
  const transactions = sd_createDemoTransactions(id);
  const appointments = sd_createDemoAppointments(id);
  const treatmentPlan = sd_createDemoTreatmentPlan(id);

  return {
    id,
    fullName: payload.fullName.trim(),
    phone: payload.phone.trim(),
    email: payload.email.trim().toLowerCase(),
    password: payload.password,
    createdAt: new Date().toISOString(),
    profile: {
      fullName: payload.fullName.trim(),
      phone: payload.phone.trim(),
      email: payload.email.trim().toLowerCase(),
      birthDate: '1994-09-12',
      city: 'Москва',
      emergencyContact: '+7 (999) 120-45-67',
      loyaltyLevel: 'Signature',
      balance: sd_calculateBalance(transactions),
      bonusBalance: 3500,
      totalVisits: appointments.filter((item) => item.status === 'completed').length,
      favoriteDoctorId: appointments[0]?.doctorId,
    },
    appointments,
    transactions,
    treatmentPlan,
    documents: sd_createDemoDocuments(id),
    notifications: sd_createDemoNotifications(id),
  };
};

const sd_createSession = (user: SdCabinetUser): SdCabinetSession => ({
  userId: user.id,
  email: user.email,
  fullName: user.fullName,
  createdAt: new Date().toISOString(),
});

const sd_updateUserBalance = (user: SdCabinetUser): SdCabinetUser => ({
  ...user,
  profile: {
    ...user.profile,
    balance: sd_calculateBalance(user.transactions),
    totalVisits: user.appointments.filter((item) => item.status === 'completed').length,
  },
});

export const sd_getCabinetSnapshot = (): SdCabinetStorageSnapshot => ({
  users: sd_readUsers(),
  session: sd_readSession(),
});

export const sd_findCabinetUserBySession = (snapshot: SdCabinetStorageSnapshot) =>
  snapshot.users.find((user) => user.id === snapshot.session?.userId) ?? null;

export const sd_registerCabinetUser = (payload: SdCabinetAuthPayload) => {
  const users = sd_readUsers();
  const email = payload.email.trim().toLowerCase();

  if (users.some((user) => user.email === email)) {
    throw new Error('Пользователь с таким email уже зарегистрирован.');
  }

  const user = sd_createUser(payload);
  const nextUsers = [...users, user];
  const session = sd_createSession(user);

  sd_writeUsers(nextUsers);
  sd_writeSession(session);

  return { user, session };
};

export const sd_loginCabinetUser = (payload: SdCabinetLoginPayload) => {
  const users = sd_readUsers();
  const email = payload.email.trim().toLowerCase();
  const user = users.find((item) => item.email === email);

  if (!user || user.password !== payload.password) {
    throw new Error('Неверный email или пароль.');
  }

  const session = sd_createSession(user);
  sd_writeSession(session);
  return { user, session };
};

export const sd_logoutCabinetUser = () => {
  sd_writeSession(null);
};

export const sd_setPendingCabinetBooking = (payload: SdCabinetBookingPayload) => {
  sd_writePendingBooking(payload);
};

export const sd_getPendingCabinetBooking = () => sd_readPendingBooking();

export const sd_clearPendingCabinetBooking = () => {
  sd_writePendingBooking(null);
};

const sd_updateUserCollection = (userId: string, updater: (user: SdCabinetUser) => SdCabinetUser) => {
  const users = sd_readUsers();
  const nextUsers = users.map((user) => {
    if (user.id !== userId) return user;
    return sd_updateUserBalance(updater(user));
  });
  sd_writeUsers(nextUsers);
  return nextUsers.find((user) => user.id === userId) ?? null;
};

export const sd_updateCabinetProfile = (userId: string, payload: SdCabinetProfileUpdatePayload) =>
  sd_updateUserCollection(userId, (user) => ({
    ...user,
    fullName: payload.fullName.trim(),
    phone: payload.phone.trim(),
    profile: {
      ...user.profile,
      fullName: payload.fullName.trim(),
      phone: payload.phone.trim(),
      birthDate: payload.birthDate,
      city: payload.city.trim(),
      emergencyContact: payload.emergencyContact.trim(),
    },
  }));

export const sd_addCabinetTopup = (userId: string, amount: number) =>
  sd_updateUserCollection(userId, (user) => ({
    ...user,
    transactions: [
      {
        id: sd_generateId('txn'),
        userId,
        type: 'topup',
        title: 'Пополнение баланса',
        description: 'Средства добавлены через личный кабинет.',
        amount,
        createdAt: new Date().toISOString(),
      },
      ...user.transactions,
    ],
    notifications: [
      {
        id: sd_generateId('notice'),
        userId,
        title: 'Баланс пополнен',
        message: `На счет зачислено ${amount.toLocaleString('ru-RU')} ₽.`,
        createdAt: new Date().toISOString(),
        isRead: false,
      },
      ...user.notifications,
    ],
  }));

export const sd_createCabinetAppointment = (userId: string, payload: SdCabinetBookingPayload) =>
  sd_updateUserCollection(userId, (user) => ({
    ...user,
    appointments: [
      {
        id: sd_generateId('appt'),
        userId,
        directionId: payload.directionId,
        directionTitle: payload.directionTitle,
        doctorId: payload.doctor.id,
        doctorName: payload.doctor.name,
        doctorRole: payload.doctor.role,
        date: payload.date,
        time: payload.time,
        status: 'scheduled',
        clinicAddress: sd_defaultClinicAddress,
        cabinet: sd_defaultCabinet,
        notes: payload.notes?.trim(),
        durationMinutes: 60,
        estimatedPrice: 6000,
        createdAt: new Date().toISOString(),
      },
      ...user.appointments,
    ],
    notifications: [
      {
        id: sd_generateId('notice'),
        userId,
        title: 'Запись подтверждена',
        message: `${payload.directionTitle}: ${payload.date} в ${payload.time}, врач ${payload.doctor.name}.`,
        createdAt: new Date().toISOString(),
        isRead: false,
      },
      ...user.notifications,
    ],
  }));

export const sd_createCabinetAppointmentForActiveSession = (payload: SdCabinetBookingPayload) => {
  const snapshot = sd_getCabinetSnapshot();
  const activeUser = sd_findCabinetUserBySession(snapshot);
  if (!activeUser) {
    return null;
  }
  return sd_createCabinetAppointment(activeUser.id, payload);
};

export const sd_cancelCabinetAppointment = (userId: string, appointmentId: string) =>
  sd_updateUserCollection(userId, (user) => ({
    ...user,
    appointments: user.appointments.map((item) =>
      item.id === appointmentId ? { ...item, status: 'cancelled' } : item,
    ),
    notifications: [
      {
        id: sd_generateId('notice'),
        userId,
        title: 'Запись отменена',
        message: 'Мы сохранили данные визита в истории. При желании можно выбрать новое время.',
        createdAt: new Date().toISOString(),
        isRead: false,
      },
      ...user.notifications,
    ],
  }));

export const sd_rescheduleCabinetAppointment = (
  userId: string,
  appointmentId: string,
  payload: SdCabinetReschedulePayload,
) =>
  sd_updateUserCollection(userId, (user) => {
    const previousAppointment = user.appointments.find((item) => item.id === appointmentId);
    if (!previousAppointment) return user;

    return {
      ...user,
      appointments: user.appointments.map((item) =>
        item.id === appointmentId
          ? {
              ...item,
              date: payload.date,
              time: payload.time,
              notes: payload.notes?.trim() || item.notes,
            }
          : item,
      ),
      notifications: [
        {
          id: sd_generateId('notice'),
          userId,
          title: 'Время визита обновлено',
          message: `${previousAppointment.directionTitle}: новая запись ${payload.date} в ${payload.time}.`,
          createdAt: new Date().toISOString(),
          isRead: false,
        },
        ...user.notifications,
      ],
    };
  });

export const sd_repeatCabinetAppointment = (userId: string, appointmentId: string) =>
  sd_updateUserCollection(userId, (user) => {
    const previousAppointment = user.appointments.find((item) => item.id === appointmentId);
    if (!previousAppointment) return user;

    const nextDate = sd_shiftDate(
      previousAppointment.date > sd_createFutureDate(7) ? previousAppointment.date : sd_createFutureDate(7),
      14,
    );

    return {
      ...user,
      appointments: [
        {
          ...previousAppointment,
          id: sd_generateId('appt'),
          date: nextDate,
          status: 'scheduled',
          createdAt: new Date().toISOString(),
          notes: previousAppointment.notes
            ? `${previousAppointment.notes} Повторная запись оформлена из истории визитов.`
            : 'Повторная запись оформлена из истории визитов.',
        },
        ...user.appointments,
      ],
      notifications: [
        {
          id: sd_generateId('notice'),
          userId,
          title: 'Повторная запись создана',
          message: `${previousAppointment.directionTitle}: ${nextDate} в ${previousAppointment.time}.`,
          createdAt: new Date().toISOString(),
          isRead: false,
        },
        ...user.notifications,
      ],
    };
  });

export const sd_markCabinetNotificationRead = (userId: string, notificationId: string) =>
  sd_updateUserCollection(userId, (user) => ({
    ...user,
    notifications: user.notifications.map((item) =>
      item.id === notificationId ? { ...item, isRead: true } : item,
    ),
  }));

export type Lang = 'en' | 'pl' | 'uk' | 'ru'

export const translations: Record<Lang, {
  title: string
  role: string
  tagline: string
  stack: string
  whatIBuild: string
  skills: string[]
  selectedWork: string
  projects: Array<{
    title: string
    description: string
    details: string
    stack: string
  }>
  contact: string
  contactDesc: string
  name: string
  email: string
  message: string
  send: string
  sending: string
  sent: string
  error: string
  links: string
  footer: string
  copied: string
}> = {
  en: {
    title: 'Ilia Griniuk',
    role: 'Senior Frontend Engineer',
    tagline: 'Building production-grade web applications for US companies.',
    stack: 'Next.js · TypeScript · React · Tailwind CSS',
    whatIBuild: 'What I Build',
    skills: [
      'Next.js + TypeScript applications',
      'Headless CMS integrations (WordPress, Strapi)',
      'High-performance UI (Lighthouse 90–100)',
      'API-heavy systems (Stripe, DocuSign, Plaid)',
      'Enterprise-scale insurance & fintech platforms',
    ],
    selectedWork: 'Selected Work',
    projects: [
      {
        title: 'US Insurance Platform',
        description: 'Enterprise-scale quote comparison system handling 50k+ daily users.',
        details: 'Multi-step forms, real-time API integrations, performance optimization. Reduced page load by 60%. Lead frontend developer.',
        stack: 'Next.js · TypeScript · Tailwind · REST APIs',
      },
      {
        title: 'Financial Services Dashboard',
        description: 'Debt estimation and qualification tools for US lending company.',
        details: 'DocuSign integration, Plaid bank verification, Stripe payments. Built calculator components used across 5 products.',
        stack: 'Next.js · TypeScript · Strapi · Stripe · Plaid',
      },
      {
        title: 'E-commerce Food Platform',
        description: 'Multi-location ordering system with loyalty program integration.',
        details: 'Real-time inventory, payment processing, location-based menus. Lighthouse score 95+. Sole frontend developer.',
        stack: 'Next.js · TypeScript · WordPress · WooCommerce',
      },
    ],
    contact: 'Get in Touch',
    contactDesc: 'Have a project in mind? Let\'s talk.',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    send: 'Send Message',
    sending: 'Sending...',
    sent: 'Message sent!',
    error: 'Something went wrong. Try again.',
    links: 'Links',
    footer: 'Open to remote and hybrid opportunities',
    copied: 'Copied!',
  },
  pl: {
    title: 'Ilia Griniuk',
    role: 'Senior Frontend Engineer',
    tagline: 'Tworzę aplikacje webowe klasy produkcyjnej dla firm z USA.',
    stack: 'Next.js · TypeScript · React · Tailwind CSS',
    whatIBuild: 'Co tworzę',
    skills: [
      'Aplikacje Next.js + TypeScript',
      'Integracje headless CMS (WordPress, Strapi)',
      'Wydajne UI (Lighthouse 90–100)',
      'Systemy z API (Stripe, DocuSign, Plaid)',
      'Platformy ubezpieczeniowe i fintech',
    ],
    selectedWork: 'Wybrane projekty',
    projects: [
      {
        title: 'Platforma ubezpieczeniowa USA',
        description: 'System porównywania ofert obsługujący 50k+ użytkowników dziennie.',
        details: 'Wieloetapowe formularze, integracje API w czasie rzeczywistym. Redukcja czasu ładowania o 60%. Lead frontend developer.',
        stack: 'Next.js · TypeScript · Tailwind · REST APIs',
      },
      {
        title: 'Panel usług finansowych',
        description: 'Narzędzia do szacowania zadłużenia dla firmy pożyczkowej z USA.',
        details: 'Integracja DocuSign, weryfikacja bankowa Plaid, płatności Stripe. Komponenty kalkulatorów używane w 5 produktach.',
        stack: 'Next.js · TypeScript · Strapi · Stripe · Plaid',
      },
      {
        title: 'Platforma e-commerce gastronomia',
        description: 'System zamówień wielolokalizacyjny z programem lojalnościowym.',
        details: 'Inwentarz w czasie rzeczywistym, przetwarzanie płatności. Lighthouse 95+. Jedyny frontend developer.',
        stack: 'Next.js · TypeScript · WordPress · WooCommerce',
      },
    ],
    contact: 'Kontakt',
    contactDesc: 'Masz projekt? Porozmawiajmy.',
    name: 'Imię',
    email: 'Email',
    message: 'Wiadomość',
    send: 'Wyślij',
    sending: 'Wysyłanie...',
    sent: 'Wiadomość wysłana!',
    error: 'Coś poszło nie tak. Spróbuj ponownie.',
    links: 'Linki',
    footer: 'Otwarty na pracę zdalną i hybrydową',
    copied: 'Skopiowano!',
  },
  uk: {
    title: 'Ілля Гринюк',
    role: 'Senior Frontend Engineer',
    tagline: 'Розробляю проєкти для американських компаній.',
    stack: 'Next.js · TypeScript · React · Tailwind CSS',
    whatIBuild: 'Що я роблю',
    skills: [
      'Проєкти на Next.js + TypeScript',
      'Headless CMS інтеграції (WordPress, Strapi)',
      'Швидкі інтерфейси (Lighthouse 90–100)',
      'Інтеграції з API (Stripe, DocuSign, Plaid)',
      'Страхові та фінтех платформи корпоративного рівня',
    ],
    selectedWork: 'Проєкти',
    projects: [
      {
        title: 'Страхова платформа (США)',
        description: 'Сервіс порівняння страхових пропозицій, 50k+ користувачів на день.',
        details: 'Багатокрокові форми, інтеграції з API в реальному часі. Пришвидшив завантаження на 60%. Провідний frontend-розробник.',
        stack: 'Next.js · TypeScript · Tailwind · REST APIs',
      },
      {
        title: 'Фінансова панель',
        description: 'Калькулятори боргів та інструменти кваліфікації для кредитної компанії.',
        details: 'Інтеграція DocuSign, банківська верифікація Plaid, оплата через Stripe. Компоненти використовуються у 5 продуктах.',
        stack: 'Next.js · TypeScript · Strapi · Stripe · Plaid',
      },
      {
        title: 'Платформа доставки їжі',
        description: 'Мережа ресторанів із системою замовлень та програмою лояльності.',
        details: 'Синхронізація меню в реальному часі, онлайн-оплата. Lighthouse 95+. Єдиний frontend-розробник.',
        stack: 'Next.js · TypeScript · WordPress · WooCommerce',
      },
    ],
    contact: 'Контакт',
    contactDesc: 'Є проєкт? Напишіть мені.',
    name: 'Ім\'я',
    email: 'Email',
    message: 'Повідомлення',
    send: 'Надіслати',
    sending: 'Надсилаю...',
    sent: 'Надіслано!',
    error: 'Щось пішло не так. Спробуйте ще.',
    links: 'Посилання',
    footer: 'Розглядаю віддалену та гібридну позицію',
    copied: 'Скопійовано!',
  },
  ru: {
    title: 'Илья Гринюк',
    role: 'Senior Frontend Engineer',
    tagline: 'Создаю веб-приложения продакшн-уровня для компаний США.',
    stack: 'Next.js · TypeScript · React · Tailwind CSS',
    whatIBuild: 'Что я создаю',
    skills: [
      'Приложения Next.js + TypeScript',
      'Интеграции headless CMS (WordPress, Strapi)',
      'Высокопроизводительный UI (Lighthouse 90–100)',
      'Системы с API (Stripe, DocuSign, Plaid)',
      'Страховые и финтех платформы',
    ],
    selectedWork: 'Избранные работы',
    projects: [
      {
        title: 'Страховая платформа США',
        description: 'Система сравнения котировок для 50k+ пользователей ежедневно.',
        details: 'Многоэтапные формы, интеграции API в реальном времени. Сокращение времени загрузки на 60%. Lead frontend developer.',
        stack: 'Next.js · TypeScript · Tailwind · REST APIs',
      },
      {
        title: 'Панель финансовых услуг',
        description: 'Инструменты оценки долга для кредитной компании США.',
        details: 'Интеграция DocuSign, верификация Plaid, платежи Stripe. Компоненты калькуляторов для 5 продуктов.',
        stack: 'Next.js · TypeScript · Strapi · Stripe · Plaid',
      },
      {
        title: 'E-commerce платформа еды',
        description: 'Система заказов с программой лояльности.',
        details: 'Инвентарь в реальном времени, обработка платежей. Lighthouse 95+. Единственный frontend разработчик.',
        stack: 'Next.js · TypeScript · WordPress · WooCommerce',
      },
    ],
    contact: 'Связаться',
    contactDesc: 'Есть проект? Давайте поговорим.',
    name: 'Имя',
    email: 'Email',
    message: 'Сообщение',
    send: 'Отправить',
    sending: 'Отправка...',
    sent: 'Сообщение отправлено!',
    error: 'Что-то пошло не так. Попробуйте ещё раз.',
    links: 'Ссылки',
    footer: 'Открыт к удалённой и гибридной работе',
    copied: 'Скопировано!',
  },
}

export const langNames: Record<Lang, string> = {
  en: 'EN',
  pl: 'PL',
  uk: 'UA',
  ru: 'RU',
}

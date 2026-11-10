import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'uk' | 'ru' | 'en';

export interface TranslationSchema {
  common: {
    days: string;
    currency: string;
  };
  header: {
    getEstimate: string;
  };
  hero: {
    badge: string;
    title_prefix: string;
    title_highlight: string;
    title_suffix: string;
    description: string;
    discuss: string;
    cases: string;
  };
  expertise: {
    title: string;
    subtitle: string;
    btnDetails: string;
    btnCalc: string;
    conversion: string;
    visitors: string;
    tagsTitle: string;
    services: {
      dev: { title: string; desc: string };
      seo: { title: string; desc: string };
      ads: { title: string; desc: string };
      smm: { title: string; desc: string };
    };
  };
  stats: {
    title: string;
    subtitle: string;
    years_val: string;
    years_title: string;
    years_desc: string;
    kpi_val: string;
    kpi_title: string;
    kpi_desc: string;
    reports_val: string;
    reports_title: string;
    reports_desc: string;
  };
  contact: {
    badge: string;
    title: string;
    desc: string;
    bullet1: string;
    bullet2: string;
    bullet3: string;
    label_name: string;
    placeholder_name: string;
    label_phone: string;
    placeholder_phone: string;
    label_service: string;
    btn_submit: string;
    btn_submitting: string;
    err_name: string;
    err_phone: string;
    err_phone_short: string;
    success_title: string;
    success_desc: string;
    success_btn: string;
  };
  footer: {
    link_services: string;
    link_cases: string;
    link_why: string;
    link_contacts: string;
    crm_panel: string;
    copyright: string;
  };
  portfolio: {
    title: string;
    subtitle: string;
    btnMore: string;
    viewAll: string;
  };
  casesDrawer: {
    drawer_title: string;
    drawer_subtitle: string;
    cat_all: string;
    cat_dev: string;
    cat_seo: string;
    cat_ads: string;
    cat_smm: string;
    lbl_challenge: string;
    lbl_solution: string;
    lbl_results: string;
    lbl_growth: string;
    lbl_speed: string;
    lbl_cheque: string;
    lbl_organic: string;
    lbl_top10: string;
    lbl_leads: string;
    lbl_cost: string;
    lbl_reach: string;
    lbl_ugc: string;
    lbl_pagespeed: string;
    lbl_renderspeed: string;
    lbl_bounce: string;
    lbl_seokept: string;
    lbl_pubtime: string;
    lbl_migrated: string;
    lbl_uptime: string;
    lbl_reacttime: string;
    lbl_backups: string;
    bottom_text: string;
    btn_contact: string;
  };
  calculator: {
    calc_title: string;
    calc_subtitle: string;
    step: string;
    of: string;
    select_service: string;
    service_desc: string;
    step2_title: string;
    scale1_title: string;
    scale1_desc: string;
    scale2_title: string;
    scale2_desc: string;
    scale3_title: string;
    scale3_desc: string;
    step3_title: string;
    opt_design: string;
    opt_seo: string;
    opt_multilang: string;
    opt_support: string;
    step4_title: string;
    est_cost: string;
    est_timeline: string;
    form_subtitle: string;
    btn_back: string;
    btn_next: string;
    btn_finish: string;
  };
  crm: {
    crm_title: string;
    crm_subtitle: string;
    col_client: string;
    col_details: string;
    col_status: string;
    col_actions: string;
    st_new: string;
    st_contacted: string;
    st_completed: string;
    btn_reset: string;
    no_leads: string;
  };
}

const TRANSLATIONS: Record<Language, TranslationSchema> = {
  uk: {
    common: {
      days: 'днів',
      currency: '₴'
    },
    header: {
      getEstimate: 'Отримати розрахунок'
    },
    hero: {
      badge: '⚡ Додамо динаміки вашому сайту',
      title_prefix: 'Ваш бізнес заслуговує на найкращу ',
      title_highlight: 'digital-присутність',
      title_suffix: '.',
      description: 'Додамо динаміки вашому сайту: створюємо сайти, які продають, та виводимо їх у топ Google. Комплексний підхід до розробки та маркетингу для вимірного зростання показників.',
      discuss: 'Дивитися ціни',
      cases: 'Дивитися кейси'
    },
    expertise: {
      title: 'Експертиза Kray Digital',
      subtitle: 'Ми поєднуємо глибокі знання технологій з розумінням маркетингової стратегії для створення рішень, що приносять реальний прибуток.',
      btnDetails: 'Дізнатися детальніше',
      btnCalc: 'Отримати розрахунок',
      conversion: 'Конверсія +32%',
      visitors: 'Відвідувачі за місяць',
      tagsTitle: 'Реалізовані технології',
      services: {
        dev: {
          title: 'Розробка сайтів',
          desc: 'Від висококонверсійних лендингів до складних корпоративних систем та інтернет-магазинів з інтеграціями.'
        },
        seo: {
          title: 'SEO-оптимізація',
          desc: 'Стабільне зростання органічного цільового трафіку та топові позиції у пошуку Google.'
        },
        ads: {
          title: 'Google Реклама',
          desc: 'Швидкі ліди, висока окупність інвестицій (ROI) та точний таргетинг на гарячу аудиторію.'
        },
        smm: {
          title: 'Додаткові послуги та техпідтримка',
          desc: 'Модернізація, перенесення на хостинг/Wordpress, оптимізація швидкості та навантаження, підключення форм та швидке відновлення роботи сайту.'
        }
      }
    },
    stats: {
      title: 'Чому обирають нас',
      subtitle: 'Прозорість на кожному етапі, експертна команда та безумовний фокус на бізнес-результатах наших клієнтів.',
      years_val: '10+',
      years_title: 'Років досвіду',
      years_desc: 'У digital-маркетингу та розробці високонавантажених систем',
      kpi_val: '10%',
      kpi_title: 'Символічна передоплата',
      kpi_desc: 'Лише 10% для старту проєкту. Решта 90% оплачуються виключно за фактом здачі та прийому робіт.',
      reports_val: '24/7',
      reports_title: 'Звітність',
      reports_desc: 'Повністю прозора наскрізна веб-аналітика та звіти в реальному часі'
    },
    contact: {
      badge: 'Аудит у подарунок',
      title: 'Готові обговорити ваш проєкт?',
      desc: 'Залиште заявку, і наші фахівці зв\'яжуться з вами протягом робочого дня для проведення безкоштовного аудиту ваших поточних digital-активів.',
      bullet1: 'Детальний розбір задачі нашими тімлідами',
      bullet2: 'Оцінка орієнтовних термінів та вилки бюджету',
      bullet3: 'Покроковий план перших кроків запуску',
      label_name: 'Ваше ім\'я',
      placeholder_name: 'Іван Іванов',
      label_phone: 'Телефон',
      placeholder_phone: '+380 (99) 000-00-00',
      label_service: 'Послуга, що цікавить',
      btn_submit: 'Надіслати заявку',
      btn_submitting: 'Надсилання...',
      err_name: 'Будь ласка, вкажіть ваше ім\'я',
      err_phone: 'Будь ласка, введіть ваш телефон',
      err_phone_short: 'Номер телефону занадто короткий',
      success_title: 'Заявку успішно відправлено!',
      success_desc: 'Дякуємо за довіру. Ми вже вивчаємо вашу нішу та зателефонуємо вам найближчим часом.',
      success_btn: 'Надіслати ще одну'
    },
    footer: {
      link_services: 'Послуги',
      link_cases: 'Кейси',
      link_why: 'Чому ми',
      link_contacts: 'Контакти',
      crm_panel: 'Панель лідів CRM',
      copyright: '© 2026 Kray Digital. Усі права захищено.'
    },
    portfolio: {
      title: 'Наші успішні роботи',
      subtitle: 'Реальні результати, виражені в зростанні продажів та трафіку для наших клієнтів.',
      btnMore: 'Детальніше про проєкт',
      viewAll: 'Дивитися всі кейси'
    },
    casesDrawer: {
      drawer_title: 'Наші успішні кейси',
      drawer_subtitle: 'Реальні цифри та результати вирішення бізнес-проблем',
      cat_all: 'Всі',
      cat_dev: 'Розробка сайтів',
      cat_seo: 'SEO-оптимізація',
      cat_ads: 'Google Реклама',
      cat_smm: 'Додаткові послуги та підтримка',
      lbl_challenge: 'Проблема та виклики',
      lbl_solution: 'Наше рішення',
      lbl_results: 'Отримані результати',
      lbl_growth: 'ЗРОСТАННЯ КОНВЕРСІЇ',
      lbl_speed: 'ШВИДКІСТЬ ЗАВАНТАЖЕННЯ',
      lbl_cheque: 'ЗРОСТАННЯ ЧЕКА',
      lbl_organic: 'ОРГАНІЧНИЙ ТРАФІК',
      lbl_top10: 'ЗАПИТИ В ТОП-10',
      lbl_leads: 'КІЛЬКІСТЬ ЛІДІВ',
      lbl_cost: 'ВАРТІСТЬ ЛІДА',
      lbl_reach: 'ОХОПЛЕННЯ',
      lbl_ugc: 'UGC ЗГАДКИ',
      lbl_pagespeed: 'ОЦІНКА PAGESPEED',
      lbl_renderspeed: 'ШВИДКІСТЬ РЕНДЕРИНГУ',
      lbl_bounce: 'ЗНИЖЕННЯ ВІДМОВ',
      lbl_seokept: 'ЗБЕРЕЖЕНО SEO-ПОЗИЦІЙ',
      lbl_pubtime: 'ЧАС ПУБЛІКАЦІЇ',
      lbl_migrated: 'СТАТЕЙ ПЕРЕНЕСЕНО',
      lbl_uptime: 'UPTIME САЙТУ',
      lbl_reacttime: 'ЧАС РЕАКЦІЇ',
      lbl_backups: 'БЕЗПЕКА (БЕКАПИ)',
      bottom_text: 'Маєте схожу задачу? Давайте обговоримо її!',
      btn_contact: 'Зв\'язатися з нами'
    },
    calculator: {
      calc_title: 'Інтерактивний калькулятор вартості',
      calc_subtitle: 'Розрахуйте орієнтовну вартість та терміни вашого проєкту за 1 хвилину',
      step: 'Крок',
      of: 'з',
      select_service: 'Виберіть основну послугу',
      service_desc: 'Це допоможе нам визначити базовий технологічний стек',
      step2_title: 'Оберіть масштаб та складність проєкту',
      scale1_title: 'Базовий / Стартап',
      scale1_desc: 'Швидкий запуск, мінімальний необхідний функціонал для перевірки гіпотез.',
      scale2_title: 'Оптимальний / Бізнес',
      scale2_desc: 'Ідеально для компаній, що розвиваються. Інтеграції, просунутий дизайн.',
      scale3_title: 'Преміум / Enterprise',
      scale3_desc: 'Високонавантажені системи, унікальний дизайн, індивідуальні рішення.',
      step3_title: 'Додаткові параметри',
      opt_design: 'Унікальний 3D/WebGL дизайн',
      opt_seo: 'Первинна SEO-оптимізація та семантика',
      opt_multilang: 'Мультимовність (інтернаціоналізація)',
      opt_support: 'Підтримка та ведення на 3 місяці',
      step4_title: 'Ваш індивідуальний розрахунок',
      est_cost: 'Орієнтовна вартість',
      est_timeline: 'Орієнтовний термін',
      form_subtitle: 'Залиште контакти, щоб зафіксувати цю ціну та отримати детальну PDF-кошторис',
      btn_back: 'Назад',
      btn_next: 'Продовжити',
      btn_finish: 'Зафіксувати ціну та отримати кошторис'
    },
    crm: {
      crm_title: 'Kray CRM: Внутрішня панель лідів',
      crm_subtitle: 'Тут зберігаються заявки ваших клієнтів в localStorage для повної автономності демонстрації',
      col_client: 'Клієнт',
      col_details: 'Деталі',
      col_status: 'Статус',
      col_actions: 'Дії',
      st_new: 'Новий',
      st_contacted: 'В роботі',
      st_completed: 'Завершено',
      btn_reset: 'Скинути до демо-даних',
      no_leads: 'Заявок поки немає. Спробуйте заповнити форму!'
    }
  },
  ru: {
    common: {
      days: 'дней',
      currency: '₽'
    },
    header: {
      getEstimate: 'Получить расчет'
    },
    hero: {
      badge: '⚡ Добавим динамики вашему сайту',
      title_prefix: 'Ваш бизнес заслуживает лучшего ',
      title_highlight: 'digital-присутствия',
      title_suffix: '.',
      description: 'Добавим динамики вашему сайту: создаем продающие интерфейсы и выводим их в топ Google. Комплексный подход к разработке и маркетингу для измеримого роста показателей.',
      discuss: 'Смотреть цены',
      cases: 'Смотреть кейсы'
    },
    expertise: {
      title: 'Экспертиза Kray Digital',
      subtitle: 'Мы объединяем глубокие знания технологий с пониманием маркетинговой стратегии для создания решений, приносящих реальную прибыль.',
      btnDetails: 'Узнать подробнее',
      btnCalc: 'Получить расчет',
      conversion: 'Конверсия +32%',
      visitors: 'Посетители за месяц',
      tagsTitle: 'Реализованные технологии',
      services: {
        dev: {
          title: 'Разработка сайтов',
          desc: 'От высококонверсионных лендингов до сложных корпоративных систем и интернет-магазинов с интеграциями.'
        },
        seo: {
          title: 'SEO-оптимизация',
          desc: 'Стабильный рост органического целевого трафика и топовые позиции в поиске Google.'
        },
        ads: {
          title: 'Google Реклама',
          desc: 'Быстрые лиды, высокая окупаемость инвестиций (ROI) и точный таргетинг на горячую аудиторию.'
        },
        smm: {
          title: 'Дополнительные услуги и техподдержка',
          desc: 'Модернизация, перенос на хостинг/Wordpress, оптимизация скорости и нагрузки, подключение форм и оперативное восстановление работы сайта.'
        }
      }
    },
    stats: {
      title: 'Почему выбирают нас',
      subtitle: 'Прозрачность на каждом этапе, экспертная команда и безусловный фокус на бизнес-результатах наших клиентов.',
      years_val: '10+',
      years_title: 'Лет опыта',
      years_desc: 'В digital-маркетинге и разработке высоконагруженных систем',
      kpi_val: '10%',
      kpi_title: 'Символическая предоплата',
      kpi_desc: 'Всего 10% для старта проекта. Остальные 90% оплачиваются исключительно по факту сдачи и приёмки работ.',
      reports_val: '24/7',
      reports_title: 'Отчетность',
      reports_desc: 'Полностью прозрачная сквозная веб-аналитика и отчеты в реальном времени'
    },
    contact: {
      badge: 'Аудит в подарок',
      title: 'Готовы обсудить ваш проект?',
      desc: 'Оставьте заявку, и наши специалисты свяжутся с вами в течение рабочего дня для проведения бесплатного аудита ваших текущих digital-активов.',
      bullet1: 'Детальный разбор задачи нашими тимлидами',
      bullet2: 'Оценка ориентировочных сроков и вилки бюджета',
      bullet3: 'Пошаговый план первых шагов запуска',
      label_name: 'Ваше имя',
      placeholder_name: 'Иван Иванов',
      label_phone: 'Телефон',
      placeholder_phone: '+380 (99) 000-00-00',
      label_service: 'Интересующая услуга',
      btn_submit: 'Отправить заявку',
      btn_submitting: 'Отправка...',
      err_name: 'Пожалуйста, укажите ваше имя',
      err_phone: 'Пожалуйста, введите ваш телефон',
      err_phone_short: 'Номер телефона слишком короткий',
      success_title: 'Заявка успешно отправлена!',
      success_desc: 'Спасибо за доверие. Мы уже изучаем вашу нишу и перезвоним вам в ближайшее время.',
      success_btn: 'Отправить еще одну'
    },
    footer: {
      link_services: 'Услуги',
      link_cases: 'Кейсы',
      link_why: 'Почему мы',
      link_contacts: 'Контакты',
      crm_panel: 'Панель лидов CRM',
      copyright: '© 2026 Kray Digital. Все права защищены.'
    },
    portfolio: {
      title: 'Наши успешные работы',
      subtitle: 'Реальные результаты, выраженные в росте продаж и трафика для наших клиентов.',
      btnMore: 'Подробнее о проекте',
      viewAll: 'Смотреть все кейсы'
    },
    casesDrawer: {
      drawer_title: 'Наши успешные кейсы',
      drawer_subtitle: 'Реальные цифры и результаты решения бизнес-проблем',
      cat_all: 'Все',
      cat_dev: 'Разработка сайтов',
      cat_seo: 'SEO-оптимизация',
      cat_ads: 'Google Реклама',
      cat_smm: 'Доп. услуги и поддержка',
      lbl_challenge: 'Проблема и вызовы',
      lbl_solution: 'Наше решение',
      lbl_results: 'Полученные результаты',
      lbl_growth: 'РОСТ КОНВЕРСИИ',
      lbl_speed: 'СКОРОСТЬ ЗАГРУЗКИ',
      lbl_cheque: 'РОСТ ЧЕКА',
      lbl_organic: 'ОРГАНИЧЕСКИЙ ТРАФИК',
      lbl_top10: 'ЗАПРОСЫ В ТОП-10',
      lbl_leads: 'КОЛИЧЕСТВО ЛИДОВ',
      lbl_cost: 'СТОИМОСТЬ ЛИДА',
      lbl_reach: 'ОХВАТ',
      lbl_ugc: 'UGC УПОМИНАНИЯ',
      lbl_pagespeed: 'ОЦЕНКА PAGESPEED',
      lbl_renderspeed: 'СКОРОСТЬ РЕНДЕРИНГА',
      lbl_bounce: 'СНИЖЕНИЕ ОТКАЗОВ',
      lbl_seokept: 'СОХРАНЕНО SEO-ПОЗИЦИЙ',
      lbl_pubtime: 'ВРЕМЯ ПУБЛИКАЦИИ',
      lbl_migrated: 'СТАТЕЙ ПЕРЕНЕСЕНО',
      lbl_uptime: 'UPTIME САЙТА',
      lbl_reacttime: 'ВРЕМЯ РЕАКЦИИ',
      lbl_backups: 'БЕЗОПАСНОСТЬ (БЭКАПЫ)',
      bottom_text: 'Есть похожая задача? Давайте обсудим её!',
      btn_contact: 'Связаться с нами'
    },
    calculator: {
      calc_title: 'Интерактивный калькулятор стоимости',
      calc_subtitle: 'Рассчитайте ориентировочную стоимость и сроки вашего проекта за 1 минуту',
      step: 'Шаг',
      of: 'из',
      select_service: 'Выберите основную услугу',
      service_desc: 'Это поможет нам определить базовый технологический стек',
      step2_title: 'Выберите масштаб и сложность проекта',
      scale1_title: 'Базовый / Стартап',
      scale1_desc: 'Быстрый запуск, минимальный необходимый функционал для проверки гипотез.',
      scale2_title: 'Оптимальный / Бизнес',
      scale2_desc: 'Идеально для развивающихся компаний. Интеграции, продвинутый дизайн.',
      scale3_title: 'Премиум / Enterprise',
      scale3_desc: 'Высоконагруженные системы, уникальный дизайн, индивидуальные решения.',
      step3_title: 'Дополнительные параметры',
      opt_design: 'Уникальный 3D/WebGL дизайн',
      opt_seo: 'Первичная SEO-оптимизация и семантика',
      opt_multilang: 'Мультиязычность (интернационализация)',
      opt_support: 'Поддержка и ведение на 3 месяца',
      step4_title: 'Ваш индивидуальный расчет',
      est_cost: 'Ориентировочная стоимость',
      est_timeline: 'Ориентировочный срок',
      form_subtitle: 'Оставьте контакты, чтобы зафиксировать эту цену и получить подробную PDF-смету',
      btn_back: 'Назад',
      btn_next: 'Продолжить',
      btn_finish: 'Зафиксировать цену и получить смету'
    },
    crm: {
      crm_title: 'Kray CRM: Внутренняя панель лидов',
      crm_subtitle: 'Здесь сохраняются заявки ваших клиентов в localStorage для полной автономности демонстрации',
      col_client: 'Клиент',
      col_details: 'Детали',
      col_status: 'Статус',
      col_actions: 'Действия',
      st_new: 'Новый',
      st_contacted: 'В работе',
      st_completed: 'Завершено',
      btn_reset: 'Сбросить к демо-данным',
      no_leads: 'Заявок пока нет. Попробуйте заполнить форму!'
    }
  },
  en: {
    common: {
      days: 'days',
      currency: '$'
    },
    header: {
      getEstimate: 'Get estimate'
    },
    hero: {
      badge: '⚡ Bringing Dynamics to Your Website',
      title_prefix: 'Your business deserves the best ',
      title_highlight: 'digital presence',
      title_suffix: '.',
      description: 'Bringing dynamics to your website: we build high-converting interfaces and rank them #1 on Google. A comprehensive approach for measurable growth.',
      discuss: 'View Pricing',
      cases: 'View Case Studies'
    },
    expertise: {
      title: 'Kray Digital Expertise',
      subtitle: 'We combine deep technical expertise with strategic marketing insight to deliver solutions that drive real bottom-line revenue.',
      btnDetails: 'Learn More',
      btnCalc: 'Get Estimate',
      conversion: 'Conversion +32%',
      visitors: 'Monthly Visitors',
      tagsTitle: 'Core Technologies',
      services: {
        dev: {
          title: 'Website Development',
          desc: 'From high-converting landing pages to complex corporate systems and e-commerce with full integrations.'
        },
        seo: {
          title: 'SEO Optimization',
          desc: 'Consistent growth of organic targeted traffic and top rankings on Google search.'
        },
        ads: {
          title: 'Google Ads',
          desc: 'Immediate high-quality leads, exceptional ROI, and precise target search marketing.'
        },
        smm: {
          title: 'Additional Services & Support',
          desc: 'Website modernization, hosting & WordPress migration, server optimization, custom forms integration, and emergency recovery.'
        }
      }
    },
    stats: {
      title: 'Why Choose Us',
      subtitle: 'Transparency at every stage, an expert team, and absolute focus on our clients\' business results.',
      years_val: '10+',
      years_title: 'Years of Experience',
      years_desc: 'In digital marketing and highly scalable systems engineering',
      kpi_val: '10%',
      kpi_title: 'Minimal Deposit',
      kpi_desc: 'Only 10% down payment to kick off. The remaining 90% is paid strictly upon milestone delivery and approval.',
      reports_val: '24/7',
      reports_title: 'Reporting',
      reports_desc: 'Fully transparent end-to-end web analytics and live custom reports'
    },
    contact: {
      badge: 'Free Audit Included',
      title: 'Ready to discuss your project?',
      desc: 'Submit a request, and our specialists will contact you within one business day for a free audit of your current digital assets.',
      bullet1: 'Detailed task analysis by our team leads',
      bullet2: 'Estimate of delivery timelines and budget brackets',
      bullet3: 'Step-by-step roadmap for launching your project',
      label_name: 'Your Name',
      placeholder_name: 'John Doe',
      label_phone: 'Phone',
      placeholder_phone: '+1 (555) 000-0000',
      label_service: 'Service of Interest',
      btn_submit: 'Submit Request',
      btn_submitting: 'Sending...',
      err_name: 'Please enter your name',
      err_phone: 'Please enter your phone number',
      err_phone_short: 'Phone number is too short',
      success_title: 'Request successfully submitted!',
      success_desc: 'Thank you for your trust. We are already analyzing your niche and will get back to you shortly.',
      success_btn: 'Submit another'
    },
    footer: {
      link_services: 'Services',
      link_cases: 'Cases',
      link_why: 'Why Us',
      link_contacts: 'Contacts',
      crm_panel: 'CRM Leads Panel',
      copyright: '© 2026 Kray Digital. All rights reserved.'
    },
    portfolio: {
      title: 'Our Successful Works',
      subtitle: 'Real business-solving results reflected in traffic growth and sales metrics for our clients.',
      btnMore: 'View details',
      viewAll: 'Explore All Case Studies'
    },
    casesDrawer: {
      drawer_title: 'Our Successful Cases',
      drawer_subtitle: 'Real metrics and results of solving business challenges',
      cat_all: 'All',
      cat_dev: 'Web Development',
      cat_seo: 'SEO Optimization',
      cat_ads: 'Google Ads',
      cat_smm: 'Maintenance & Support',
      lbl_challenge: 'Challenge & Roadblocks',
      lbl_solution: 'Our Solution',
      lbl_results: 'Results Achieved',
      lbl_growth: 'CONVERSION GROWTH',
      lbl_speed: 'LOAD SPEED',
      lbl_cheque: 'AVERAGE CHEQUE',
      lbl_organic: 'ORGANIC TRAFFIC',
      lbl_top10: 'KEYWORDS IN TOP-10',
      lbl_leads: 'NUMBER OF LEADS',
      lbl_cost: 'LEAD ACQUISITION COST',
      lbl_reach: 'SOCIAL REACH',
      lbl_ugc: 'UGC MENTIONS',
      lbl_pagespeed: 'PAGESPEED SCORE',
      lbl_renderspeed: 'RENDERING SPEED',
      lbl_bounce: 'BOUNCE DECREASE',
      lbl_seokept: 'SEO POSITIONS SAVED',
      lbl_pubtime: 'PUBLISHING TIME',
      lbl_migrated: 'ARTICLES MIGRATED',
      lbl_uptime: 'WEBSITE UPTIME',
      lbl_reacttime: 'RESPONSE TIME',
      lbl_backups: 'SECURITY (BACKUPS)',
      bottom_text: 'Have a similar challenge? Let\'s discuss it!',
      btn_contact: 'Contact Us'
    },
    calculator: {
      calc_title: 'Interactive Cost Calculator',
      calc_subtitle: 'Calculate the estimated cost and timeline of your project in 1 minute',
      step: 'Step',
      of: 'of',
      select_service: 'Select the primary service',
      service_desc: 'This helps us identify the baseline technology stack',
      step2_title: 'Select project scale & complexity',
      scale1_title: 'Basic / Startup',
      scale1_desc: 'Rapid launch, essential features to validate your business assumptions.',
      scale2_title: 'Optimal / Business',
      scale2_desc: 'Perfect for growing companies. Third-party APIs, advanced custom design.',
      scale3_title: 'Premium / Enterprise',
      scale3_desc: 'High-load tailored architecture, bespoke UI, custom modules.',
      step3_title: 'Additional parameters',
      opt_design: 'Bespoke 3D/WebGL animations',
      opt_seo: 'Initial SEO setup and indexation',
      opt_multilang: 'Multilingual localization support',
      opt_support: 'Dedicated technical support for 3 months',
      step4_title: 'Your Custom Estimate',
      est_cost: 'Estimated Cost',
      est_timeline: 'Estimated Timeline',
      form_subtitle: 'Submit your contacts to lock in this price and receive a detailed PDF proposal',
      btn_back: 'Back',
      btn_next: 'Next',
      btn_finish: 'Lock Price & Request Proposal'
    },
    crm: {
      crm_title: 'Kray CRM: Internal Lead Dashboard',
      crm_subtitle: 'Client requests are securely saved in localStorage for fully offline/isolated preview capability',
      col_client: 'Client',
      col_details: 'Details',
      col_status: 'Status',
      col_actions: 'Actions',
      st_new: 'New',
      st_contacted: 'Contacted',
      st_completed: 'Completed',
      btn_reset: 'Reset to Demo Leads',
      no_leads: 'No leads logged yet. Submit the contact form to see them here!'
    }
  }
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationSchema;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

function detectBrowserLanguage(): Language {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'ru';
  }

  const candidateLangs: string[] = [];
  if (Array.isArray(navigator.languages) && navigator.languages.length > 0) {
    candidateLangs.push(...navigator.languages);
  }
  if (navigator.language) {
    candidateLangs.push(navigator.language);
  }
  if ((navigator as any).userLanguage) {
    candidateLangs.push((navigator as any).userLanguage);
  }

  for (const raw of candidateLangs) {
    if (!raw) continue;
    const lower = raw.toLowerCase().trim();
    if (lower.startsWith('uk') || lower.startsWith('ua')) {
      return 'uk';
    }
    if (lower.startsWith('ru') || lower.startsWith('be') || lower.startsWith('kk')) {
      return 'ru';
    }
    if (lower.startsWith('en')) {
      return 'en';
    }
  }

  return 'uk';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => detectBrowserLanguage());

  useEffect(() => {
    try {
      localStorage.removeItem('kray_digital_lang');
    } catch {
      // ignore
    }

    const handleLangChange = () => {
      setLanguageState(detectBrowserLanguage());
    };

    window.addEventListener('languagechange', handleLangChange);
    return () => window.removeEventListener('languagechange', handleLangChange);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = TRANSLATIONS[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

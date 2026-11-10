import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Database, Trash2, Shield, Lock, Unlock, Plus, Save } from 'lucide-react';
import { LeadSubmission } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface LeadPanelProps {
  isOpen: boolean;
  onClose: () => void;
  leads: LeadSubmission[];
  onUpdateStatus: (id: string, status: 'new' | 'contacted' | 'completed') => void;
  onDeleteLead: (id: string) => void;
  onResetLeads: () => void;
  onAddLead: (lead: { name: string; phone: string; service: string; budget?: string }) => void;
}

const LOCALIZED_CRM = {
  uk: {
    title: 'Панель управління лідами (CRM)',
    subtitle: 'Внутрішній інтерфейс агентства для відстеження вхідних заявок із сайту',
    statTotal: 'Всього заявок',
    statNew: 'Нові заявки',
    statCompleted: 'Закриті угоди',
    statSum: 'Загальна сума кошторисів',
    emptyTitle: 'База даних лідів порожня',
    emptyDesc: 'Заповніть форму зворотного зв\'язку на сайті або скористайтеся калькулятором, щоб побачити заявки тут!',
    btnLoadDemo: 'Завантажити демо-ліди',
    thClient: 'ПІБ клієнта',
    thPhone: 'Телефон',
    thService: 'Послуга, що цікавить',
    thBudget: 'Бюджет',
    thStatus: 'Статус',
    thActions: 'Дії / Зміна статусу',
    stNew: 'Новий',
    stInWork: 'В роботі',
    stCompleted: 'Успішно',
    notCalculated: 'Не розраховано',
    actionInWork: 'В роботу',
    actionCompleted: 'Успішно',
    actionDelete: 'Видалити заявку',
    securityTip: 'Усі дані зберігаються локально у вашому браузері (localStorage)',
    btnReset: 'Скинути та повернути демо-дані',
    btnAddManual: 'Створити лід',
    btnToggleForm: '+ Створити лід вручну',
    labelName: "ПІБ / Ім'я клієнта",
    labelPhone: 'Номер телефону',
    labelService: 'Послуга, що цікавить',
    labelBudget: 'Бюджет (напр. 25000 ₴)',
    btnSubmit: 'Зберегти лід',
    btnCancel: 'Скасувати',
    authTitle: 'Вхід до панелі керування CRM',
    authSubtitle: 'Будь ласка, введіть адміністративний пароль для доступу до бази лідів',
    authPlaceholder: 'Введіть пароль',
    authBtn: 'Увійти',
    authHint: 'Пароль за замовчуванням:',
    authError: 'Невірний пароль! Спробуйте ще раз.'
  },
  ru: {
    title: 'Панель управления лидами (CRM)',
    subtitle: 'Внутренний интерфейс агентства для отслеживания входящих заявок с сайта',
    statTotal: 'Всего заявок',
    statNew: 'Новые заявки',
    statCompleted: 'Закрытые сделки',
    statSum: 'Общая сумма смет',
    emptyTitle: 'База данных лидов пуста',
    emptyDesc: 'Заполните форму обратной связи на сайте или воспользуйтесь калькулятором, чтобы увидеть заявки здесь!',
    btnLoadDemo: 'Загрузить демо-лиды',
    thClient: 'ФИО клиента',
    thPhone: 'Телефон',
    thService: 'Интересующая услуга',
    thBudget: 'Budget',
    thStatus: 'Статус',
    thActions: 'Действия / Смена статуса',
    stNew: 'Новый',
    stInWork: 'В работе',
    stCompleted: 'Успешно',
    notCalculated: 'Не рассчитано',
    actionInWork: 'В работу',
    actionCompleted: 'Успешно',
    actionDelete: 'Удалить заявку',
    securityTip: 'Все данные хранятся локально в вашем браузере (localStorage)',
    btnReset: 'Сбросить и вернуть демо-данные',
    btnAddManual: 'Создать лид',
    btnToggleForm: '+ Создать лид вручную',
    labelName: 'ФИО / Имя клиента',
    labelPhone: 'Номер телефона',
    labelService: 'Интересующая услуга',
    labelBudget: 'Бюджет (напр. 25000 ₴)',
    btnSubmit: 'Сохранить лид',
    btnCancel: 'Отмена',
    authTitle: 'Вход в панель управления CRM',
    authSubtitle: 'Пожалуйста, введите административный пароль для доступа к базе лидов',
    authPlaceholder: 'Введите пароль',
    authBtn: 'Войти',
    authHint: 'Пароль по умолчанию:',
    authError: 'Неверный пароль! Попробуйте еще раз.'
  },
  en: {
    title: 'Leads Management Dashboard (CRM)',
    subtitle: 'Internal agency dashboard to track incoming requests from the website',
    statTotal: 'Total Requests',
    statNew: 'New Leads',
    statCompleted: 'Closed Deals',
    statSum: 'Total Estimated Budget',
    emptyTitle: 'Leads Database is Empty',
    emptyDesc: 'Fill out the contact form or use the interactive calculator to see submissions here!',
    btnLoadDemo: 'Load Demo Leads',
    thClient: 'Client Name',
    thPhone: 'Phone Number',
    thService: 'Interested Service',
    thBudget: 'Budget',
    thStatus: 'Status',
    thActions: 'Actions / Change Status',
    stNew: 'New',
    stInWork: 'In Progress',
    stCompleted: 'Success',
    notCalculated: 'Not Calculated',
    actionInWork: 'In Progress',
    actionCompleted: 'Success',
    actionDelete: 'Delete lead',
    securityTip: 'All data is securely stored locally in your browser (localStorage)',
    btnReset: 'Reset to default demo data',
    btnAddManual: 'Create Lead',
    btnToggleForm: '+ Create Lead Manually',
    labelName: 'Client Full Name',
    labelPhone: 'Phone Number',
    labelService: 'Interested Service',
    labelBudget: 'Estimated Budget (e.g., $1,200)',
    btnSubmit: 'Save Lead',
    btnCancel: 'Cancel',
    authTitle: 'CRM Control Panel Login',
    authSubtitle: 'Please enter the administrator password to access the leads database',
    authPlaceholder: 'Enter password',
    authBtn: 'Login',
    authHint: 'Default password:',
    authError: 'Incorrect password! Please try again.'
  }
};

export default function LeadPanel({ isOpen, onClose, leads, onUpdateStatus, onDeleteLead, onResetLeads, onAddLead }: LeadPanelProps) {
  const { language } = useLanguage();
  const crm = LOCALIZED_CRM[language as keyof typeof LOCALIZED_CRM] || LOCALIZED_CRM.uk;

  // Authentication states
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('crm_authorized') === 'true';
  });

  // Manual Add Form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formService, setFormService] = useState(() => {
    return language === 'en' ? 'Website Development (Landing Page)' : language === 'ru' ? 'Разработка сайта (Лендинг)' : 'Розробка сайту (Лендинг)';
  });
  const [formBudget, setFormBudget] = useState('');

  const serviceOptions = language === 'en' ? [
    "Website Development (Landing Page)",
    "Website Development (Corporate Site)",
    "Website Development (E-commerce)",
    "Website Development (Web Portal)",
    "SEO Optimization (Local)",
    "SEO Optimization (National)",
    "Contextual PPC Ads",
    "Social Media Marketing (SMM)",
    "Custom / Other"
  ] : language === 'ru' ? [
    "Разработка сайта (Лендинг)",
    "Разработка сайта (Corporate)",
    "Разработка сайта (Интернет-магазин)",
    "Разработка сайта (Служба/Портал)",
    "SEO-оптимизация (Локальное)",
    "SEO-оптимизация (Национальное)",
    "Контекстная реклама Google/PPC",
    "Продвижение SMM (Соцсети)",
    "Другое / Индивидуальный проект"
  ] : [
    "Розробка сайту (Лендинг)",
    "Розробка сайту (Корпоративний)",
    "Розробка сайту (Інтернет-магазин)",
    "Розробка сайту (Сервіс/Портал)",
    "SEO-оптимізація (Локальне)",
    "SEO-оптимізація (Національне)",
    "Контекстна реклама Google/PPC",
    "SMM-просування (Соцмережі)",
    "Інше / Індивідуальний проєкт"
  ];

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('crm_authorized', 'true');
      setLoginError('');
    } else {
      setLoginError(crm.authError);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim()) return;

    onAddLead({
      name: formName,
      phone: formPhone,
      service: formService,
      budget: formBudget ? formBudget : undefined
    });

    // Reset fields
    setFormName('');
    setFormPhone('');
    setFormBudget('');
    setShowAddForm(false);
  };

  // Stats calculation
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'new').length;
  const completedLeads = leads.filter(l => l.status === 'completed').length;
  
  const totalBudgetEst = leads.reduce((acc, l) => {
    if (l.budget) {
      const parsed = parseInt(l.budget.replace(/\D/g, ''), 10);
      return acc + (isNaN(parsed) ? 0 : parsed);
    }
    return acc;
  }, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="px-2.5 py-1 text-[10px] rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase">{crm.stCompleted}</span>;
      case 'contacted':
        return <span className="px-2.5 py-1 text-[10px] rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold uppercase">{crm.stInWork}</span>;
      default:
        return <span className="px-2.5 py-1 text-[10px] rounded-full bg-brand-primary-container/10 text-brand-primary-container border border-brand-primary-container/20 font-bold uppercase">{crm.stNew}</span>;
    }
  };

  // 1. Unauthenticated Login Gate View
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#0a0e19]/95 backdrop-blur-md"
        />

        {/* Login Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-md bg-brand-surface-container rounded-2xl border border-brand-outline-variant/30 shadow-2xl overflow-hidden p-8 z-10 text-center"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-brand-surface-container-highest text-brand-on-surface-variant hover:text-brand-on-surface transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Icon */}
          <div className="mx-auto w-14 h-14 bg-brand-primary-container/10 border border-brand-primary-container/20 rounded-2xl flex items-center justify-center text-brand-primary-container mb-6">
            <Lock className="w-6 h-6 animate-pulse" />
          </div>

          <h3 className="text-xl font-bold font-display text-brand-on-surface mb-2">
            {crm.authTitle}
          </h3>
          <p className="text-xs text-brand-on-surface-variant mb-6 leading-relaxed">
            {crm.authSubtitle}
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setLoginError('');
                }}
                placeholder={crm.authPlaceholder}
                className="w-full px-4 py-3 rounded-xl bg-brand-surface-container-low border border-brand-outline-variant/20 focus:border-brand-primary-container/50 text-brand-on-surface text-center text-sm tracking-widest focus:outline-hidden transition-all"
              />
              {loginError && (
                <p className="text-xs text-red-400 mt-2 font-semibold">
                  {loginError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-brand-primary-container text-[#00363a] font-bold rounded-xl hover:bg-brand-primary-container/90 transition-all cursor-pointer text-sm shadow-glow flex items-center justify-center gap-2 border-none"
            >
              <Unlock className="w-4 h-4" />
              <span>{crm.authBtn}</span>
            </button>
          </form>

          {/* Default Hint */}
          <div className="mt-6 pt-4 border-t border-brand-outline-variant/10 text-xs text-brand-on-surface-variant">
            <span>{crm.authHint} <strong className="font-mono text-brand-primary-container bg-brand-primary-container/10 px-1.5 py-0.5 rounded">admin</strong></span>
          </div>
        </motion.div>
      </div>
    );
  }

  // 2. Fully Authenticated Dashboard View
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#0a0e19]/90 backdrop-blur-md"
      />

      {/* Panel Window */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-5xl h-[85vh] bg-brand-surface-container rounded-2xl border border-brand-outline-variant/30 shadow-2xl overflow-hidden flex flex-col z-10"
        id="lead-panel-modal"
      >
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary-container/10 blur-[100px] rounded-full pointer-events-none" />

        {/* Header */}
        <div className="p-6 border-b border-brand-outline-variant/15 flex items-center justify-between bg-brand-surface-container-low">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-primary-container/10 border border-brand-primary-container/20 rounded-xl text-brand-primary-container">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-brand-on-surface flex items-center gap-2">
                {crm.title} <span className="text-[10px] font-mono bg-brand-surface-container-highest px-2 py-0.5 rounded text-brand-on-surface-variant font-normal">Internal</span>
              </h3>
              <p className="text-xs text-brand-on-surface-variant mt-0.5">{crm.subtitle}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-3.5 py-2 bg-brand-primary-container/10 border border-brand-primary-container/20 hover:bg-brand-primary-container/20 text-brand-primary-container text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{crm.btnToggleForm}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-brand-surface-container-highest text-brand-on-surface-variant hover:text-brand-on-surface transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-brand-outline-variant/10 bg-brand-surface-container-lowest/50">
          <div className="p-4 border-r border-brand-outline-variant/10 text-center md:text-left">
            <span className="text-[10px] text-brand-on-surface-variant uppercase font-semibold">{crm.statTotal}</span>
            <span className="block text-2xl font-black font-display text-brand-on-surface mt-1">{totalLeads}</span>
          </div>
          <div className="p-4 border-r border-brand-outline-variant/10 text-center md:text-left">
            <span className="text-[10px] text-brand-on-surface-variant uppercase font-semibold">{crm.statNew}</span>
            <span className="block text-2xl font-black font-display text-brand-primary-container mt-1">{newLeads}</span>
          </div>
          <div className="p-4 border-r border-brand-outline-variant/10 text-center md:text-left">
            <span className="text-[10px] text-brand-on-surface-variant uppercase font-semibold">{crm.statCompleted}</span>
            <span className="block text-2xl font-black font-display text-emerald-400 mt-1">{completedLeads}</span>
          </div>
          <div className="p-4 text-center md:text-left">
            <span className="text-[10px] text-brand-on-surface-variant uppercase font-semibold">{crm.statSum}</span>
            <span className="block text-2xl font-black font-display text-brand-secondary mt-1">
              ~ {totalBudgetEst.toLocaleString(language === 'en' ? 'en-US' : 'uk-UA')} {language === 'en' ? '$' : '₴'}
            </span>
          </div>
        </div>

        {/* Table / List Workspace */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Manual Lead Creation Form */}
          {showAddForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-6 p-5 rounded-xl border border-brand-primary-container/30 bg-brand-surface-container-lowest/80 backdrop-blur-xs relative overflow-hidden"
            >
              <h4 className="text-xs font-bold text-brand-primary-container mb-4 flex items-center gap-1.5">
                <Plus className="w-4 h-4" />
                {crm.btnToggleForm}
              </h4>
              <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-brand-on-surface-variant uppercase font-semibold">{crm.labelName}</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder={language === 'en' ? 'John Doe' : 'Олександр Коваленко'}
                    className="w-full px-3 py-2 rounded-lg bg-brand-surface-container-low border border-brand-outline-variant/10 focus:border-brand-primary-container/40 text-brand-on-surface text-xs focus:outline-hidden transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-brand-on-surface-variant uppercase font-semibold">{crm.labelPhone}</label>
                  <input
                    type="text"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+380..."
                    className="w-full px-3 py-2 rounded-lg bg-brand-surface-container-low border border-brand-outline-variant/10 focus:border-brand-primary-container/40 text-brand-on-surface text-xs focus:outline-hidden transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-brand-on-surface-variant uppercase font-semibold">{crm.labelService}</label>
                  <select
                    value={formService}
                    onChange={(e) => setFormService(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-brand-surface-container-low border border-brand-outline-variant/10 focus:border-brand-primary-container/40 text-brand-on-surface text-xs focus:outline-hidden transition-all cursor-pointer"
                  >
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-brand-surface-container-lowest text-brand-on-surface">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-brand-on-surface-variant uppercase font-semibold">{crm.labelBudget}</label>
                  <input
                    type="text"
                    value={formBudget}
                    onChange={(e) => setFormBudget(e.target.value)}
                    placeholder="25 000 ₴"
                    className="w-full px-3 py-2 rounded-lg bg-brand-surface-container-low border border-brand-outline-variant/10 focus:border-brand-primary-container/40 text-brand-on-surface text-xs focus:outline-hidden transition-all"
                  />
                </div>
                <div className="md:col-span-4 flex justify-end gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 bg-brand-surface-container-high text-brand-on-surface hover:bg-brand-surface-container-highest text-xs font-bold rounded-lg cursor-pointer transition-colors border-none"
                  >
                    {crm.btnCancel}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-brand-primary-container text-[#00363a] font-bold rounded-lg hover:bg-brand-primary-container/90 text-xs cursor-pointer shadow-glow flex items-center gap-1.5 border-none"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{crm.btnSubmit}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {leads.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="w-16 h-16 rounded-full bg-brand-surface-container-high border border-brand-outline-variant/20 flex items-center justify-center text-brand-on-surface-variant/40">
                <Database className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-brand-on-surface">{crm.emptyTitle}</h4>
                <p className="text-xs text-brand-on-surface-variant max-w-sm">
                  {crm.emptyDesc}
                </p>
              </div>
              <button
                onClick={onResetLeads}
                className="px-4 py-2 bg-brand-primary-container/10 border border-brand-primary-container/20 text-brand-primary-container text-xs font-bold rounded hover:bg-brand-primary-container/20 transition-all cursor-pointer"
              >
                {crm.btnLoadDemo}
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-brand-outline-variant/15">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-brand-surface-container-lowest text-brand-on-surface-variant font-bold border-b border-brand-outline-variant/15">
                  <tr>
                    <th className="p-4">{crm.thClient}</th>
                    <th className="p-4">{crm.thPhone}</th>
                    <th className="p-4">{crm.thService}</th>
                    <th className="p-4">{crm.thBudget}</th>
                    <th className="p-4">{crm.thStatus}</th>
                    <th className="p-4 text-right">{crm.thActions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-outline-variant/10 bg-brand-surface-container-low/20">
                  {leads.map((l) => (
                    <tr key={l.id} className="hover:bg-brand-surface-container-lowest/40 transition-colors">
                      <td className="p-4 font-bold text-brand-on-surface flex flex-col">
                        <span>{l.name}</span>
                        <span className="text-[9px] text-brand-on-surface-variant font-normal mt-0.5">{l.timestamp}</span>
                      </td>
                      <td className="p-4 font-mono text-brand-on-surface-variant">{l.phone}</td>
                      <td className="p-4 font-semibold text-brand-on-surface max-w-[200px] truncate">{l.service}</td>
                      <td className="p-4 font-bold text-brand-primary-container font-display">{l.budget || crm.notCalculated}</td>
                      <td className="p-4">{getStatusBadge(l.status)}</td>
                      <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => onUpdateStatus(l.id, 'contacted')}
                          disabled={l.status === 'contacted'}
                          className={`px-2 py-1 rounded text-[10px] font-bold border transition-all cursor-pointer ${
                            l.status === 'contacted'
                              ? 'bg-amber-500/10 text-amber-500/40 border-amber-500/10'
                              : 'bg-brand-surface-container-highest text-amber-400 border-amber-500/20 hover:bg-amber-500/10'
                          }`}
                          title={crm.actionInWork}
                        >
                          {crm.actionInWork}
                        </button>
                        <button
                          onClick={() => onUpdateStatus(l.id, 'completed')}
                          disabled={l.status === 'completed'}
                          className={`px-2 py-1 rounded text-[10px] font-bold border transition-all cursor-pointer ${
                            l.status === 'completed'
                              ? 'bg-emerald-500/10 text-emerald-500/40 border-emerald-500/10'
                              : 'bg-brand-surface-container-highest text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/10'
                          }`}
                          title={crm.actionCompleted}
                        >
                          {crm.actionCompleted}
                        </button>
                        <button
                          onClick={() => onDeleteLead(l.id)}
                          className="p-1.5 bg-brand-surface-container-highest text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors inline-flex items-center cursor-pointer border-none"
                          title={crm.actionDelete}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="p-4 bg-brand-surface-container-lowest border-t border-brand-outline-variant/15 flex justify-between items-center px-6 text-xs text-brand-on-surface-variant">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-brand-primary-container" />
            <span>{crm.securityTip}</span>
          </div>
          {leads.length > 0 && (
            <button
              onClick={onResetLeads}
              className="px-4 py-2 bg-brand-surface-container-high hover:bg-brand-surface-container-highest border border-brand-outline-variant/20 rounded font-semibold transition-colors text-brand-on-surface cursor-pointer"
            >
              {crm.btnReset}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

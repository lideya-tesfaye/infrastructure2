import React, { useState, useEffect, useMemo } from 'react';
import { translations } from './translations';
import { Language, Theme, View, SectorSubmission, UserState } from './types';
import { 
  BuildingLibraryIcon, 
  MapIcon, 
  ShieldCheckIcon, 
  SunIcon, 
  MoonIcon, 
  LanguageIcon,
  UserGroupIcon,
  ChevronLeftIcon,
  ArrowRightIcon,
  DocumentArrowUpIcon,
  ChartBarIcon,
  InformationCircleIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

const OfficialBanner: React.FC<{ t: (key: string) => string; theme: Theme }> = ({ t, theme }) => (
  <div className={`text-[10px] py-1 text-center font-medium border-b transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
    <span className="flex items-center justify-center gap-2">
      <img src="https://upload.wikimedia.org/wikipedia/commons/7/71/Flag_of_Ethiopia.svg" className="w-3 h-2" alt="" />
      {t('officialWebsite')}
    </span>
  </div>
);

const Footer: React.FC<{ t: (key: string) => string; theme: Theme; setView: (v: View) => void }> = ({ t, theme, setView }) => (
  <footer className={`mt-0 border-t transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'}`}>
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/7/71/Flag_of_Ethiopia.svg" 
              alt="Ethiopian Flag" 
              className="w-8 h-5 object-cover rounded shadow-sm"
            />
            <h2 className="font-bold text-slate-900 dark:text-white">CDAAS</h2>
          </div>
          <p className="text-sm leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white uppercase text-xs tracking-widest">{t('quickLinks')}</h3>
          <ul className="space-y-2 text-sm">
            <li><button onClick={() => setView('home')} className="hover:text-green-600 transition">{t('home')}</button></li>
            <li><button onClick={() => setView('about')} className="hover:text-green-600 transition">{t('about')}</button></li>
            <li><button onClick={() => setView('learnMore')} className="hover:text-green-600 transition">{t('learnMore')}</button></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white uppercase text-xs tracking-widest">{t('contactUs')}</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><GlobeAltIcon className="w-4 h-4" /> {t('address')}</li>
            <li className="flex items-center gap-2"><EnvelopeIcon className="w-4 h-4" /> {t('email')}</li>
            <li className="flex items-center gap-2"><PhoneIcon className="w-4 h-4" /> {t('phone')}</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white uppercase text-xs tracking-widest">{t('legal')}</h3>
          <ul className="space-y-2 text-sm">
            <li><button className="hover:text-green-600 transition">{t('privacyPolicy')}</button></li>
            <li><button className="hover:text-green-600 transition">{t('termsOfService')}</button></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-xs">
        {t('copyright')}
      </div>
    </div>
  </footer>
);

const Navbar: React.FC<{
  currentLang: Language;
  setLang: (l: Language) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  currentView: View;
  setView: (v: View) => void;
  user: UserState;
  setUser: (u: UserState) => void;
  t: (key: string) => string;
}> = ({ currentLang, setLang, theme, setTheme, currentView, setView, user, setUser, t }) => {
  return (
    <nav className={`sticky top-0 z-50 w-full border-b shadow-sm transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'}`}>
      <div className="ethiopia-gradient"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('home')}>
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/7/71/Flag_of_Ethiopia.svg" 
              alt="Ethiopian Flag" 
              className="w-10 h-6 object-cover rounded shadow-sm border border-slate-200 dark:border-slate-700"
            />
            <div>
              <h1 className="font-bold text-lg leading-tight tracking-tight dark:text-white">CDAAS</h1>
              <p className="text-[10px] uppercase tracking-widest opacity-70 dark:text-slate-300">Official Portal</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => setView('home')} className={`text-sm font-semibold hover:text-green-600 transition ${currentView === 'home' ? 'text-green-600' : 'text-slate-600 dark:text-slate-300'}`}>{t('home')}</button>
            <button onClick={() => setView('about')} className={`text-sm font-semibold hover:text-green-600 transition ${currentView === 'about' ? 'text-green-600' : 'text-slate-600 dark:text-slate-300'}`}>{t('about')}</button>
            {user.isAuthenticated ? (
               <button onClick={() => { setUser({ role: null, isAuthenticated: false }); setView('home'); }} className="text-sm font-semibold text-red-500 hover:text-red-600 transition">{t('logout')}</button>
            ) : (
              <button onClick={() => setView('login')} className={`text-sm font-semibold hover:text-green-600 transition ${currentView === 'login' ? 'text-green-600' : 'text-slate-600 dark:text-slate-300'}`}>{t('login')}</button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-full p-1 transition-colors">
              <button onClick={() => setLang('en')} className={`px-3 py-1 text-xs rounded-full transition-all duration-200 ${currentLang === 'en' ? 'bg-white dark:bg-slate-600 shadow-sm font-bold text-slate-900 dark:text-white' : 'opacity-60 text-slate-600 dark:text-slate-400'}`}>EN</button>
              <button onClick={() => setLang('am')} className={`px-3 py-1 text-xs rounded-full transition-all duration-200 ${currentLang === 'am' ? 'bg-white dark:bg-slate-600 shadow-sm font-bold text-slate-900 dark:text-white' : 'opacity-60 text-slate-600 dark:text-slate-400'}`}>AM</button>
              <button onClick={() => setLang('om')} className={`px-3 py-1 text-xs rounded-full transition-all duration-200 ${currentLang === 'om' ? 'bg-white dark:bg-slate-600 shadow-sm font-bold text-slate-900 dark:text-white' : 'opacity-60 text-slate-600 dark:text-slate-400'}`}>OM</button>
            </div>
            <button 
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <MoonIcon className="w-5 h-5 text-slate-600" /> : <SunIcon className="w-5 h-5 text-yellow-400" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Home: React.FC<{ setView: (v: View) => void; theme: Theme; t: (key: string) => string; }> = ({ setView, theme, t }) => {
  return (
    <div className="space-y-24">
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center py-12">
        <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white ethiopic-font leading-tight drop-shadow-sm">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-100 max-w-2xl mx-auto font-light leading-relaxed">
            {t('subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              onClick={() => setView('login')}
              className="w-full sm:w-auto px-10 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition transform hover:scale-105 flex items-center justify-center gap-2"
            >
              {t('getStarted')} <ArrowRightIcon className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setView('learnMore')}
              className="w-full sm:w-auto px-10 py-4 border-2 border-slate-200 dark:border-slate-700 hover:border-yellow-500 dark:hover:border-yellow-500 text-slate-700 dark:text-white rounded-xl font-bold transition hover:bg-yellow-50 dark:hover:bg-slate-800"
            >
              {t('learnMore')}
            </button>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-8 bg-white dark:bg-slate-800/50 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 backdrop-blur-sm transition-colors duration-300 group">
            <ChartBarIcon className="w-8 h-8 text-red-500 mb-6" />
            <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{t('collisionHistory')}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-100 leading-relaxed">{t('collisionDesc')}</p>
          </div>
          <div className="p-8 bg-white dark:bg-slate-800/50 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 backdrop-blur-sm transition-colors duration-300 group">
            <MapIcon className="w-8 h-8 text-yellow-500 mb-6" />
            <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{t('purpose')}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-100 leading-relaxed">{t('aiDesc')}</p>
          </div>
          <div className="p-8 bg-white dark:bg-slate-800/50 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 backdrop-blur-sm transition-colors duration-300 group">
            <UserGroupIcon className="w-8 h-8 text-green-500 mb-6" />
            <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{t('digitalEthiopia')}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-100 leading-relaxed">{t('digital2025Desc')}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const About: React.FC<{ t: (key: string) => string; theme: Theme }> = ({ t, theme }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 space-y-20 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white ethiopic-font">{t('about')}</h2>
        <p className="text-slate-600 dark:text-slate-100 max-w-2xl mx-auto">{t('subtitle')}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-bold text-green-700 dark:text-green-500 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-green-600 rounded-full"></span>
              {t('vision')}
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-100 leading-relaxed">
              {t('visionDesc')}
            </p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-yellow-600 dark:text-yellow-500 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-yellow-500 rounded-full"></span>
              {t('mission')}
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-100 leading-relaxed">
              {t('missionDesc')}
            </p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-red-600 dark:text-red-500 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-red-600 rounded-full"></span>
              {t('digitalEthiopia')}
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-100 leading-relaxed">
              {t('digitalEthiopiaDesc')}
            </p>
          </section>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img src="https://images.unsplash.com/photo-1579541814924-49fef17c5be5?q=80&w=400&h=400&auto=format&fit=crop" alt="Infrastructure" className="rounded-2xl shadow-lg border-2 border-white dark:border-slate-800 transition-colors duration-300" />
          <img src="https://images.unsplash.com/photo-1621210126224-82f63f572793?q=80&w=400&h=400&auto=format&fit=crop" alt="Roads" className="rounded-2xl shadow-lg mt-8 border-2 border-white dark:border-slate-800 transition-colors duration-300" />
          <img src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=400&h=400&auto=format&fit=crop" alt="Power" className="rounded-2xl shadow-lg border-2 border-white dark:border-slate-800 transition-colors duration-300" />
          <img src="https://images.unsplash.com/photo-1541888941259-7904f1174667?q=80&w=400&h=400&auto=format&fit=crop" alt="Development" className="rounded-2xl shadow-lg mt-8 border-2 border-white dark:border-slate-800 transition-colors duration-300" />
        </div>
      </div>
    </div>
  );
};

const Guidelines: React.FC<{ setView: (v: View) => void; t: (key: string) => string }> = ({ setView, t }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-in slide-in-from-right-8 duration-500">
      <button onClick={() => setView('home')} className="flex items-center gap-2 text-slate-500 dark:text-white hover:text-green-600 dark:hover:text-green-400 mb-8 transition font-semibold">
        <ChevronLeftIcon className="w-5 h-5" /> {t('back')}
      </button>
      <h2 className="text-4xl font-bold mb-12 text-slate-900 dark:text-white ethiopic-font">{t('guidelineTitle')}</h2>
      
      <div className="space-y-12">
        <section className="bg-slate-100 dark:bg-slate-900/80 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors duration-300">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
            <InformationCircleIcon className="w-8 h-8 text-blue-500 dark:text-blue-400" /> {t('howToUseTitle')}
          </h3>
          <p className="text-slate-700 dark:text-white mb-6 leading-relaxed font-medium">
            {t('howToUseDesc')}
          </p>
          <ul className="space-y-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <li key={step} className="flex gap-4 p-5 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors duration-300">
                 <span className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center font-bold">{step}</span>
                 <p className="text-sm text-slate-700 dark:text-white leading-relaxed">{t(`howToUseStep${step}`)}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors duration-300">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900 dark:text-white">
            <span className="text-red-500">01.</span> {t('collisionHistory')}
          </h3>
          <p className="text-slate-700 dark:text-white leading-relaxed">
            {t('collisionHistoryPara')}
          </p>
        </section>

        <section className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors duration-300">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900 dark:text-white">
            <span className="text-yellow-600 dark:text-yellow-500">02.</span> {t('problemStatement')}
          </h3>
          <p className="text-slate-700 dark:text-white leading-relaxed">
            {t('problemPara')}
          </p>
        </section>

        <section className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors duration-300">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900 dark:text-white">
            <span className="text-green-600 dark:text-green-500">03.</span> {t('solutionStatement')}
          </h3>
          <p className="text-slate-700 dark:text-white leading-relaxed">
            {t('solutionPara')}
          </p>
        </section>
      </div>
    </div>
  );
};

const Login: React.FC<{ 
  onLogin: (role: 'manager' | 'sector') => void; 
  t: (key: string) => string; 
  theme: Theme; 
}> = ({ onLogin, t, theme }) => {
  const [activeTab, setActiveTab] = useState<'manager' | 'sector'>('manager');
  const [password, setPassword] = useState('');
  const [savePass, setSavePass] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length > 0) {
      if (savePass) {
        localStorage.setItem(`${activeTab}_pass`, password);
      }
      onLogin(activeTab);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem(`${activeTab}_pass`);
    if (saved) setPassword(saved);
    else setPassword('');
  }, [activeTab]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-700 transition-colors duration-300">
        <div className="flex">
          <button onClick={() => setActiveTab('manager')} className={`flex-1 py-5 text-sm font-bold transition-all duration-300 ${activeTab === 'manager' ? 'bg-white dark:bg-slate-800 border-b-4 border-green-600 text-slate-900 dark:text-white' : 'bg-slate-50 dark:bg-slate-900 text-slate-400'}`}>{t('managerLogin')}</button>
          <button onClick={() => setActiveTab('sector')} className={`flex-1 py-5 text-sm font-bold transition-all duration-300 ${activeTab === 'sector' ? 'bg-white dark:bg-slate-800 border-b-4 border-green-600 text-slate-900 dark:text-white' : 'bg-slate-50 dark:bg-slate-900 text-slate-400'}`}>{t('sectorLogin')}</button>
        </div>
        <div className="p-10 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{activeTab === 'manager' ? t('managerLogin') : t('sectorLogin')}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t('credentialsDesc')}</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{t('password')}</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t('enterPassword')} className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-slate-900 dark:text-white transition-all placeholder:text-slate-400" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="savePass" checked={savePass} onChange={(e) => setSavePass(e.target.checked)} className="w-5 h-5 text-green-600 border-slate-300 dark:border-slate-700 rounded focus:ring-green-500 cursor-pointer" />
              <label htmlFor="savePass" className="text-sm font-medium text-slate-600 dark:text-slate-300 cursor-pointer">{t('savePassword')}</label>
            </div>
            <button type="submit" className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-xl transition transform active:scale-95">{t('signIn')}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const ManagerDashboard: React.FC<{ submissions: SectorSubmission[]; t: (key: string) => string; setView: (v: View) => void; }> = ({ submissions, t, setView }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white ethiopic-font">{t('managerDashboard')}</h2>
          <p className="text-slate-500 dark:text-slate-400">{t('welcomeManager')}</p>
        </div>
        <div className="px-5 py-2 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-sm font-bold rounded-full border border-green-200 dark:border-green-800 shadow-sm">{t('managerActive')}</div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-md border border-slate-100 dark:border-slate-700 transition-colors duration-300">
          <ChartBarIcon className="w-8 h-8 text-blue-500 dark:text-blue-400 mb-4" />
          <h3 className="font-bold text-slate-600 dark:text-slate-400 uppercase text-xs tracking-widest mb-1">{t('collisionAnalysis')}</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{t('activeStatus')}</p>
        </div>
        <div className="p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-md border border-slate-100 dark:border-slate-700 transition-colors duration-300">
          <UserGroupIcon className="w-8 h-8 text-purple-500 dark:text-purple-400 mb-4" />
          <h3 className="font-bold text-slate-600 dark:text-slate-400 uppercase text-xs tracking-widest mb-1">{t('connectedSectors')}</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">12</p>
        </div>
        <div className="p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-md border border-slate-100 dark:border-slate-700 transition-colors duration-300">
          <MapIcon className="w-8 h-8 text-yellow-500 dark:text-yellow-400 mb-4" />
          <h3 className="font-bold text-slate-600 dark:text-slate-400 uppercase text-xs tracking-widest mb-1">{t('totalSubmissions')}</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{submissions.length}</p>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden transition-colors duration-300">
        <div className="p-8 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900/30">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('receivedInfo')}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-900/50">
              <tr>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{t('sectorName')}</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{t('documentHeader')}</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{t('geodataHeader')}</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{t('timestamp')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {submissions.length === 0 ? (
                <tr><td colSpan={4} className="px-8 py-16 text-center text-slate-400 dark:text-slate-500 font-medium">{t('noData')}</td></tr>
              ) : (
                submissions.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                    <td className="px-8 py-5 font-bold text-slate-900 dark:text-white">{s.sectorName}</td>
                    <td className="px-8 py-5 text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer font-medium">{s.documentName}</td>
                    <td className="px-8 py-5 text-sm text-slate-600 dark:text-slate-400">Files: {s.longitudeFile}, {s.latitudeFile}</td>
                    <td className="px-8 py-5 text-sm text-slate-500 dark:text-slate-500">{s.timestamp}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center pt-8">
        <button onClick={() => setView('home')} className="px-8 py-3 border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-white rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-bold">{t('back')}</button>
      </div>
    </div>
  );
};

const SectorDashboard: React.FC<{ onAddSubmission: (s: SectorSubmission) => void; t: (key: string) => string; setView: (v: View) => void; }> = ({ onAddSubmission, t, setView }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ sectorName: '', doc: null as File | null, lng: null as File | null, lat: null as File | null });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setIsSubmitting(true);
    setTimeout(() => {
      const newSubmission: SectorSubmission = { id: Math.random().toString(36).substr(2, 9), sectorName: formData.sectorName, documentName: formData.doc?.name || 'document.pdf', longitudeFile: formData.lng?.name || 'lng.csv', latitudeFile: formData.lat?.name || 'lat.csv', timestamp: new Date().toLocaleString() };
      onAddSubmission(newSubmission); setIsSubmitting(false); setShowForm(false); alert(t('success'));
    }, 1500);
  };
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 animate-in fade-in duration-500">
      {!showForm ? (
        <div className="text-center space-y-8 py-20 bg-white dark:bg-slate-800 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-700 transition-colors duration-300">
          <div className="flex justify-center"><div className="w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center shadow-inner"><MapIcon className="w-12 h-12 text-blue-600 dark:text-blue-300" /></div></div>
          <div className="space-y-4 px-6"><h2 className="text-4xl font-bold text-slate-900 dark:text-white ethiopic-font">{t('sectorPortal')}</h2><p className="text-xl text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">{t('sectorGreeting')}</p></div>
          <button onClick={() => setShowForm(true)} className="px-12 py-5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl shadow-xl transition transform hover:scale-105">{t('enterInfo')}</button>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 p-10 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-700 space-y-10 transition-colors duration-300">
          <div className="flex justify-between items-center"><h3 className="text-3xl font-bold text-slate-900 dark:text-white">{t('enterInfo')}</h3><button onClick={() => setShowForm(false)} className="p-2 text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors text-3xl font-light">×</button></div>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2"><label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{t('sectorName')}</label><input type="text" required value={formData.sectorName} onChange={(e) => setFormData({...formData, sectorName: e.target.value})} className="w-full p-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none text-slate-900 dark:text-white transition-all" /></div>
              <div className="space-y-2"><label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{t('govLegality')}</label><div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-5 flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer group"><DocumentArrowUpIcon className="w-6 h-6 text-slate-400 group-hover:text-green-600 transition-colors" /><span className="text-sm font-medium text-slate-500 dark:text-white truncate">{formData.doc ? formData.doc.name : t('chooseFile')}</span><input type="file" required onChange={(e) => setFormData({...formData, doc: e.target.files?.[0] || null})} className="absolute inset-0 opacity-0 cursor-pointer" /></div></div>
              <div className="space-y-2"><label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{t('longitude')}</label><div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-5 flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer group"><MapIcon className="w-6 h-6 text-slate-400 group-hover:text-green-600 transition-colors" /><span className="text-sm font-medium text-slate-500 dark:text-white truncate">{formData.lng ? formData.lng.name : t('chooseFile')}</span><input type="file" required onChange={(e) => setFormData({...formData, lng: e.target.files?.[0] || null})} className="absolute inset-0 opacity-0 cursor-pointer" /></div></div>
              <div className="space-y-2"><label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{t('latitude')}</label><div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-5 flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer group"><MapIcon className="w-6 h-6 text-slate-400 group-hover:text-green-600 transition-colors" /><span className="text-sm font-medium text-slate-500 dark:text-white truncate">{formData.lat ? formData.lat.name : t('chooseFile')}</span><input type="file" required onChange={(e) => setFormData({...formData, lat: e.target.files?.[0] || null})} className="absolute inset-0 opacity-0 cursor-pointer" /></div></div>
            </div>
            <button type="submit" disabled={isSubmitting} className={`w-full py-5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl shadow-xl transition-all flex items-center justify-center gap-4 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'active:scale-95'}`}>{isSubmitting ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>{t('loading')}</> : t('submit')}</button>
          </form>
        </div>
      )}
      <div className="flex justify-center"><button onClick={() => setView('home')} className="px-10 py-3 border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-white rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-bold">{t('back')}</button></div>
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('light');
  const [view, setView] = useState<View>('home');
  const [user, setUser] = useState<UserState>({ role: null, isAuthenticated: false });
  const [submissions, setSubmissions] = useState<SectorSubmission[]>([]);
  const t = (key: string) => translations[lang][key] || key;
  const handleLoginSuccess = (role: 'manager' | 'sector') => { setUser({ role, isAuthenticated: true }); setView(role === 'manager' ? 'managerDashboard' : 'sectorDashboard'); };
  useEffect(() => { const saved = localStorage.getItem('eims_submissions'); if (saved) setSubmissions(JSON.parse(saved)); }, []);
  const addSubmission = (newSub: SectorSubmission) => { const updated = [...submissions, newSub]; setSubmissions(updated); localStorage.setItem('eims_submissions', JSON.stringify(updated)); };
  useEffect(() => { const root = window.document.documentElement; if (theme === 'dark') root.classList.add('dark'); else root.classList.remove('dark'); }, [theme]);

  const renderContent = () => {
    switch (view) {
      case 'home': return <Home setView={setView} theme={theme} t={t} />;
      case 'about': return <About t={t} theme={theme} />;
      case 'learnMore': return <Guidelines setView={setView} t={t} />;
      case 'login': return <Login onLogin={handleLoginSuccess} t={t} theme={theme} />;
      case 'managerDashboard': return <ManagerDashboard submissions={submissions} t={t} setView={setView} />;
      case 'sectorDashboard': return <SectorDashboard onAddSubmission={addSubmission} t={t} setView={setView} />;
      default: return <Home setView={setView} theme={theme} t={t} />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 selection:bg-green-100 dark:selection:bg-green-900/40 ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <OfficialBanner t={t} theme={theme} />
      <Navbar currentLang={lang} setLang={setLang} theme={theme} setTheme={setTheme} currentView={view} setView={setView} user={user} setUser={setUser} t={t} />
      <main className="flex-grow pt-4">
        {renderContent()}
      </main>
      <Footer t={t} theme={theme} setView={setView} />
    </div>
  );
}
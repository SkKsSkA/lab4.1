import { useEffect, useState } from 'react';
import Logo from '../components/Logo.jsx';
import LoginForm from '../components/LoginForm.jsx';
import RegisterForm from '../components/RegisterForm.jsx';
import { TAB_SESSION_KEY } from '../lib/session.js';

const params = new URLSearchParams(window.location.search);
const serverMessage = params.get('msg');
const messageType = params.get('type') === 'success' ? 'success' : 'error';

export default function AuthPage() {
  // после успешной регистрации сразу показываем вкладку входа
  const [tab, setTab] = useState('login');

  useEffect(() => {
    // после выхода не пытаемся войти автоматически
    if (params.get('loggedOut') === '1') {
      sessionStorage.removeItem(TAB_SESSION_KEY);
      return;
    }
    // если есть живая сессия — сразу в кабинет: при «Запомнить меня»
    // или если вход был выполнен в этой же вкладке
    fetch('/api/me')
      .then(response => (response.ok ? response.json() : null))
      .then(user => {
        if (user && (user.remembered || sessionStorage.getItem(TAB_SESSION_KEY) === '1')) {
          window.location.replace('/dashboard.html');
        } else {
          sessionStorage.removeItem(TAB_SESSION_KEY);
        }
      })
      .catch(() => sessionStorage.removeItem(TAB_SESSION_KEY));
  }, []);

  return (
    <main className="card">
      <Logo />
      <p className="brand-sub">Otar Aslabnek</p>

      <div className="tabs">
        <button
          type="button"
          className={`tab-btn${tab === 'login' ? ' active' : ''}`}
          onClick={() => setTab('login')}
        >
          Вход
        </button>
        <button
          type="button"
          className={`tab-btn${tab === 'register' ? ' active' : ''}`}
          onClick={() => setTab('register')}
        >
          Регистрация
        </button>
      </div>

      <div className={`msg${serverMessage ? ` show ${messageType}-msg` : ''}`}>
        {serverMessage}
      </div>

      <LoginForm active={tab === 'login'} />
      <RegisterForm active={tab === 'register'} />
    </main>
  );
}

import { useEffect, useState } from 'react';
import Logo from '../components/Logo.jsx';
import { TAB_SESSION_KEY } from '../lib/session.js';

const LOGIN_URL = '/index.html?msg=Сначала войдите в аккаунт&type=error';

export default function DashboardPage() {
  const [name, setName] = useState('');

  useEffect(() => {
    const url = new URL(window.location.href);

    if (url.searchParams.has('tabSession')) {
      sessionStorage.setItem(TAB_SESSION_KEY, '1');
    } else if (url.searchParams.has('remembered')) {
      sessionStorage.removeItem(TAB_SESSION_KEY);
    }
    if (url.searchParams.has('tabSession') || url.searchParams.has('remembered')) {
      window.history.replaceState(null, '', '/dashboard.html');
    }

    fetch('/api/me')
      .then(response => {
        if (!response.ok) throw new Error('not authenticated');
        return response.json();
      })
      .then(user => {
        if (!user.remembered && sessionStorage.getItem(TAB_SESSION_KEY) !== '1') {
          window.location.replace(LOGIN_URL);
          return;
        }
        setName(user.name);
      })
      .catch(() => window.location.replace(LOGIN_URL));
  }, []);

  return (
    <>
      <div className="account-menu">
        <div className="account-user-block">
          <div className="account-icon" aria-hidden="true"><span></span></div>
          <span className="account-name">{name}</span>
          <form action="/logout" method="GET">
            <button className="logout-button" type="submit">Выйти</button>
          </form>
        </div>
      </div>

      <main className="dashboard-home" aria-label="Главная страница">
        <Logo label="Otar Aslabnek" />
      </main>
    </>
  );
}

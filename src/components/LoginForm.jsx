import { useState } from 'react';
import Field from './Field.jsx';
import { validateEmail, validatePassword, getCookie } from '../lib/validation.js';

export default function LoginForm({ active }) {
  const rememberedEmail = getCookie('oa_remember_email');
  const [email, setEmail] = useState(rememberedEmail);
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(Boolean(rememberedEmail));
  const [errors, setErrors] = useState({ email: '', password: '' });

  function handleSubmit(event) {
    const next = {
      email: validateEmail(email),
      password: validatePassword(password, false)
    };
    setErrors(next);
    // если всё верно, форма уходит на сервер обычным POST /login
    if (next.email || next.password) event.preventDefault();
  }

  return (
    <form
      className={`tab-content${active ? ' active' : ''}`}
      action="/login"
      method="POST"
      noValidate
      onSubmit={handleSubmit}
    >
      <Field
        label="Email"
        type="email"
        name="email"
        placeholder="you@gmail.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        error={errors.email}
        required
      />
      <Field
        label="Пароль"
        type="password"
        name="password"
        minLength={6}
        value={password}
        onChange={e => setPassword(e.target.value)}
        error={errors.password}
        required
      />

      <label className="checkbox">
        <input
          type="checkbox"
          name="remember"
          value="1"
          checked={remember}
          onChange={e => setRemember(e.target.checked)}
        />{' '}
        Запомнить меня
      </label>

      <button type="submit">Войти</button>
    </form>
  );
}

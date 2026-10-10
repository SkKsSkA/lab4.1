import { useRef, useState } from 'react';
import Field from './Field.jsx';
import {
  EMAIL_REGEX,
  normalizeEmail,
  validateName,
  validateEmail,
  validatePassword,
  validatePasswordsMatch
} from '../lib/validation.js';

export default function RegisterForm({ active }) {
  const [values, setValues] = useState({ name: '', email: '', password: '', password2: '' });
  const [errors, setErrors] = useState({ name: '', email: '', password: '', password2: '' });
  const latestEmail = useRef('');

  const setError = (field, message) => setErrors(prev => ({ ...prev, [field]: message }));

  function handleChange(event) {
    const { name, value } = event.target;
    setValues(prev => ({ ...prev, [name]: value }));
    if (name === 'email') checkEmail(value);
  }

  // Проверка формата и занятости email прямо во время ввода
  function checkEmail(value) {
    const email = normalizeEmail(value);
    latestEmail.current = email;

    if (!EMAIL_REGEX.test(email)) {
      setError('email', validateEmail(value));
      return;
    }

    fetch(`/api/check-email?email=${encodeURIComponent(email)}`)
      .then(response => response.json())
      .then(result => {
        if (latestEmail.current !== email) return; // пришёл ответ на устаревший ввод
        setError('email', result.exists ? 'Этот email уже зарегистрирован' : '');
      })
      .catch(() => setError('email', 'Не удалось проверить email'));
  }

  function handleSubmit(event) {
    const next = {
      name: validateName(values.name),
      email: validateEmail(values.email) || errors.email,
      password: validatePassword(values.password),
      password2: validatePasswordsMatch(values.password, values.password2)
    };
    setErrors(next);
    // если всё верно, форма уходит на сервер обычным POST /register
    if (Object.values(next).some(Boolean)) event.preventDefault();
  }

  return (
    <form
      className={`tab-content${active ? ' active' : ''}`}
      action="/register"
      method="POST"
      noValidate
      onSubmit={handleSubmit}
    >
      <Field label="Имя" type="text" name="name" minLength={2}
        value={values.name} onChange={handleChange} error={errors.name} required />
      <Field label="Email" type="email" name="email" placeholder="you@gmail.com"
        value={values.email} onChange={handleChange} error={errors.email} required />
      <Field label="Пароль" type="password" name="password" minLength={8}
        value={values.password} onChange={handleChange} error={errors.password} required />
      <Field label="Повторите пароль" type="password" name="password2" minLength={8}
        value={values.password2} onChange={handleChange} error={errors.password2} required />

      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}

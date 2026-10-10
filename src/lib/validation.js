export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@(gmail\.com|mail\.ru|yahoo\.com|yahoo\.co\.uk|outlook\.com|outlook\.co\.uk|hotmail\.com|live\.com)$/i;
export const PASSWORD_MIN_LENGTH = 8;

export function normalizeEmail(value) {
  return value.trim().toLowerCase();
}

// Каждая функция возвращает текст ошибки или пустую строку, если всё в порядке.
export function validateEmail(value) {
  const email = normalizeEmail(value);
  if (!email) return 'Введите email';
  if (!EMAIL_REGEX.test(email)) return 'Разрешены Gmail, Mail.ru, Yahoo и Outlook';
  return '';
}

export function validatePassword(value, strict = true) {
  if (value.length < 6) return 'Минимум 6 символов';
  if (strict && value.length < PASSWORD_MIN_LENGTH) return `Минимум ${PASSWORD_MIN_LENGTH} символов`;
  if (strict && !/[a-z]/.test(value)) return 'Добавьте строчную латинскую букву';
  if (strict && !/[A-Z]/.test(value)) return 'Добавьте заглавную латинскую букву';
  if (strict && !/\d/.test(value)) return 'Добавьте хотя бы одну цифру';
  return '';
}

export function validateName(value) {
  return value.trim().length >= 2 ? '' : 'Введите имя (минимум 2 символа)';
}

export function validatePasswordsMatch(password, password2) {
  const ok = password2 === password && password2.length >= PASSWORD_MIN_LENGTH;
  return ok ? '' : 'Пароли не совпадают';
}

export function getCookie(name) {
  const prefix = `${encodeURIComponent(name)}=`;
  const item = document.cookie.split('; ').find(cookie => cookie.startsWith(prefix));
  return item ? decodeURIComponent(item.slice(prefix.length)) : '';
}

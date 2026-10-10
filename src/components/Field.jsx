// Поле формы с подписью и текстом ошибки под ним.
export default function Field({ label, error, ...inputProps }) {
  return (
    <>
      <label>
        {label}
        <input {...inputProps} />
      </label>
      <span className="error">{error}</span>
    </>
  );
}

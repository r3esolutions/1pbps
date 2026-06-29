"use client";

export default function LanguageSwitcher() {
  return (
    <select
      className="rounded-lg border border-white/10 bg-black px-3 py-2 text-sm text-white"
      defaultValue="en"
    >
      <option value="en">English</option>
      <option value="ru">Русский</option>
      <option value="de">Deutsch</option>
      <option value="fr">Français</option>
      <option value="es">Español</option>
      <option value="hi">हिन्दी</option>
    </select>
  );
}

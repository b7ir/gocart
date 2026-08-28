'use client'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { languageNames } from '@/lib/i18n/translations'

const LanguageSwitcher = ({ className = '' }) => {
    const { language, setLanguage } = useLanguage()

    return (
        <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            aria-label="Language"
            className={`text-xs sm:text-sm text-slate-600 bg-transparent outline-none cursor-pointer border border-slate-300 rounded-full px-3 py-1.5 ${className}`}
        >
            {Object.keys(languageNames).map((code) => (
                <option key={code} value={code}>
                    {languageNames[code]}
                </option>
            ))}
        </select>
    )
}

export default LanguageSwitcher

'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from './translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('en')

    // Load saved language preference after mount (keeps SSR output as English)
    useEffect(() => {
        const saved = typeof window !== 'undefined' ? localStorage.getItem('language') : null
        if (saved === 'en' || saved === 'ckb') {
            setLanguage(saved)
        }
    }, [])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('language', language)
        }
    }, [language])

    const t = (key, vars) => {
        let text = translations[language]?.[key] ?? translations.en[key] ?? key
        if (vars) {
            Object.keys(vars).forEach((v) => {
                text = text.replace(`{${v}}`, vars[v])
            })
        }
        return text
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}

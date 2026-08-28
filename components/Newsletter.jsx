'use client'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Title from './Title'
import { useLanguage } from '@/lib/i18n/LanguageContext'

const Newsletter = () => {
    const { t } = useLanguage()
    const [email, setEmail] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error)
            toast.success(data.alreadySubscribed ? '\u067e\u06ce\u0634\u062a\u0631 \u0628\u06d5\u0634\u062f\u0627\u0631\u06cc\u062a \u06a9\u0631\u062f\u0648\u0648\u06d5' : '\u0628\u06d5\u0634\u062f\u0627\u0631\u06cc\u062a \u06a9\u0631\u062f!')
            setEmail('')
        } catch (err) {
            toast.error(err.message || '\u0647\u06d5\u06b5\u06d5\u06cc\u06d5\u06a9 \u0695\u0648\u0648\u06cc\u062f\u0627')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className='flex flex-col items-center mx-4 my-36'>
            <Title title={t('newsletter_title')} description={t('newsletter_description')} visibleButton={false} />
            <form onSubmit={handleSubmit} className='flex bg-slate-100 text-sm p-1 rounded-full w-full max-w-xl my-10 border-2 border-white ring ring-slate-200'>
                <input
                    className='flex-1 pl-5 outline-none bg-transparent'
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('newsletter_placeholder')}
                />
                <button disabled={submitting} type="submit" className='font-medium bg-green-500 text-white px-7 py-3 rounded-full hover:scale-103 active:scale-95 transition disabled:opacity-60'>
                    {submitting ? '...' : t('newsletter_button')}
                </button>
            </form>
        </div>
    )
}

export default Newsletter
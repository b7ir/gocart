'use client'
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react"
import { useLanguage } from "@/lib/i18n/LanguageContext"
import { useSiteSettings } from "@/lib/useSiteSettings"

const ContactPage = () => {
    const { t } = useLanguage()
    const { settings, loading } = useSiteSettings()

    return (
        <div className="min-h-[60vh] max-w-3xl mx-auto px-6 py-16">
            <h1 className="text-3xl font-semibold text-slate-700 mb-2">{t('nav_contact')}</h1>
            <p className="text-slate-500 mb-10">{t('footer_about')}</p>

            {!loading && (
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-5 border border-slate-200">
                        <PhoneIcon className="text-green-600 shrink-0" size={22} />
                        <div>
                            <p className="text-xs text-slate-400">{t('nav_contact')}</p>
                            <a href={`tel:${settings.phone}`} className="text-slate-700 font-medium hover:underline">{settings.phone}</a>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-5 border border-slate-200">
                        <MailIcon className="text-green-600 shrink-0" size={22} />
                        <div>
                            <p className="text-xs text-slate-400">Email</p>
                            <a href={`mailto:${settings.email}`} className="text-slate-700 font-medium hover:underline">{settings.email}</a>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-5 border border-slate-200">
                        <MapPinIcon className="text-green-600 shrink-0" size={22} />
                        <div>
                            <p className="text-xs text-slate-400">Address</p>
                            <p className="text-slate-700 font-medium">{settings.address}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ContactPage

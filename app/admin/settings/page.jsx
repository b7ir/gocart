'use client'
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Loader2Icon } from "lucide-react"

const SESSION_KEY = "gocart_admin_authed"

const emptySettings = {
    phone: "",
    email: "",
    address: "",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    banner: { enabled: false, imageUrl: "", videoUrl: "", linkUrl: "", title: "" },
}

const AdminSettingsPage = () => {
    const [settings, setSettings] = useState(emptySettings)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        fetch("/api/settings")
            .then((res) => res.json())
            .then((data) => setSettings({ ...emptySettings, ...data, banner: { ...emptySettings.banner, ...data.banner } }))
            .catch(() => toast.error("\u0646\u06d5\u062a\u0648\u0627\u0646\u0631\u0627 \u0695\u06ce\u06a9\u062e\u0633\u062a\u0646\u06d5\u06a9\u0627\u0646 \u0628\u0647\u06ce\u0646\u0631\u06ce\u062a"))
            .finally(() => setLoading(false))
    }, [])

    const update = (key, value) => setSettings((s) => ({ ...s, [key]: value }))
    const updateBanner = (key, value) => setSettings((s) => ({ ...s, banner: { ...s.banner, [key]: value } }))

    const save = async () => {
        setSaving(true)
        const password = typeof window !== "undefined" ? sessionStorage.getItem(SESSION_KEY) : ""
        try {
            const res = await fetch("/api/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...settings, password }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || "\u0647\u06d5\u06b5\u06d5")
            toast.success("\u0695\u06ce\u06a9\u062e\u0633\u062a\u0646\u06d5\u06a9\u0627\u0646 \u067e\u0627\u0634\u06d5\u06a9\u06d5\u0648\u062a \u06a9\u0631\u0627\u0646")
        } catch (err) {
            toast.error(err.message || "\u067e\u0627\u0634\u06d5\u06a9\u06d5\u0648\u062a\u06a9\u0631\u062f\u0646 \u0633\u06d5\u0631\u06a9\u06d5\u0648\u062a\u0648\u0648 \u0646\u06d5\u0628\u0648\u0648")
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return <div className="flex items-center justify-center py-20"><Loader2Icon className="animate-spin text-slate-400" size={28} /></div>
    }

    const inputClass = "border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-slate-500 w-full max-w-md"
    const labelClass = "text-sm font-medium text-slate-600 mb-1 block"

    return (
        <div className="max-w-2xl pb-20">
            <h1 className="text-2xl font-semibold text-slate-700 mb-1">\u0695\u06ce\u06a9\u062e\u0633\u062a\u0646\u06d5\u06a9\u0627\u0646\u06cc \u0633\u0627\u06cc\u062a</h1>
            <p className="text-sm text-slate-400 mb-8">\u0626\u06d5\u0645 \u0632\u0627\u0646\u06cc\u0627\u0631\u06cc\u06cc\u0627\u0646\u06d5 \u0628\u06c6 \u0647\u06d5\u0645\u0648\u0648 \u0628\u06cc\u0646\u06d5\u0631\u0627\u0646\u06cc \u0633\u0627\u06cc\u062a\u06d5\u06a9\u06d5\u062a \u062f\u06d5\u0631\u062f\u06d5\u06a9\u06d5\u0648\u0646.</p>

            <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
                <h2 className="font-semibold text-slate-700 mb-4">\u0632\u0627\u0646\u06cc\u0627\u0631\u06cc \u067e\u06d5\u06cc\u0648\u06d5\u0646\u062f\u06cc</h2>
                <div className="flex flex-col gap-4">
                    <div>
                        <label className={labelClass}>\u0698\u0645\u0627\u0631\u06d5 \u062a\u06d5\u0644\u06d5\u0641\u06c6\u0646</label>
                        <input className={inputClass} value={settings.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+964 750 000 0000" />
                    </div>
                    <div>
                        <label className={labelClass}>\u0626\u06cc\u0645\u06d5\u06cc\u0644</label>
                        <input className={inputClass} value={settings.email} onChange={(e) => update("email", e.target.value)} placeholder="contact@example.com" />
                    </div>
                    <div>
                        <label className={labelClass}>\u0646\u0627\u0648\u0646\u06cc\u0634\u0627\u0646</label>
                        <input className={inputClass} value={settings.address} onChange={(e) => update("address", e.target.value)} placeholder="\u0647\u06d5\u0648\u0644\u06ce\u0631\u060c \u06a9\u0648\u0631\u062f\u0633\u062a\u0627\u0646" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
                <h2 className="font-semibold text-slate-700 mb-4">\u0633\u06c6\u0634\u06cc\u0627\u0644 \u0645\u06cc\u062f\u06cc\u0627</h2>
                <div className="flex flex-col gap-4">
                    <div>
                        <label className={labelClass}>Facebook</label>
                        <input className={inputClass} value={settings.facebook} onChange={(e) => update("facebook", e.target.value)} placeholder="https://facebook.com/yourpage" />
                    </div>
                    <div>
                        <label className={labelClass}>Instagram</label>
                        <input className={inputClass} value={settings.instagram} onChange={(e) => update("instagram", e.target.value)} placeholder="https://instagram.com/yourpage" />
                    </div>
                    <div>
                        <label className={labelClass}>Twitter / X</label>
                        <input className={inputClass} value={settings.twitter} onChange={(e) => update("twitter", e.target.value)} placeholder="https://x.com/yourpage" />
                    </div>
                    <div>
                        <label className={labelClass}>LinkedIn</label>
                        <input className={inputClass} value={settings.linkedin} onChange={(e) => update("linkedin", e.target.value)} placeholder="https://linkedin.com/company/yourpage" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-slate-700">\u0695\u06cc\u06a9\u0644\u0627\u0645\u06cc \u0633\u06d5\u0631\u06d5\u06a9\u06cc (\u0644\u0627\u067e\u06d5\u0695\u06d5\u06cc \u0633\u06d5\u0631\u06d5\u06a9\u06cc)</h2>
                    <label className="flex items-center gap-2 text-sm text-slate-500 cursor-pointer">
                        <input type="checkbox" checked={settings.banner.enabled} onChange={(e) => updateBanner("enabled", e.target.checked)} />
                        \u0686\u0627\u0644\u0627\u06a9\u0628\u0648\u0648\u0646
                    </label>
                </div>
                <div className="flex flex-col gap-4">
                    <div>
                        <label className={labelClass}>\u0646\u0627\u0648\u0646\u06cc\u0634\u0627\u0646\u06cc \u0695\u06cc\u06a9\u0644\u0627\u0645</label>
                        <input className={inputClass} value={settings.banner.title} onChange={(e) => updateBanner("title", e.target.value)} placeholder="\u0646\u0631\u062e\u06cc \u062a\u0627\u06cc\u0628\u06d5\u062a \u0626\u06d5\u0645 \u0647\u06d5\u0641\u062a\u06d5\u06cc\u06d5!" />
                    </div>
                    <div>
                        <label className={labelClass}>\u0644\u06cc\u0646\u06a9\u06cc \u0648\u06ce\u0646\u06d5 (Image URL)</label>
                        <input className={inputClass} value={settings.banner.imageUrl} onChange={(e) => updateBanner("imageUrl", e.target.value)} placeholder="https://..." />
                    </div>
                    <div>
                        <label className={labelClass}>\u0644\u06cc\u0646\u06a9\u06cc \u06a4\u06cc\u062f\u06cc\u06c6\u06cc \u06a9\u0648\u0631\u062a (Video URL \u2014 \u0626\u0627\u0631\u06d5\u0632\u0648\u0648\u0645\u06d5\u0646\u062f\u0627\u0646\u06d5)</label>
                        <input className={inputClass} value={settings.banner.videoUrl} onChange={(e) => updateBanner("videoUrl", e.target.value)} placeholder="https://..." />
                    </div>
                    <div>
                        <label className={labelClass}>\u0644\u06cc\u0646\u06a9 \u06a9\u0627\u062a\u06ce\u06a9 \u06a9\u0631\u062a\u06d5\u06cc \u0644\u06ce\u0628\u06a9\u0631\u06ce\u062a</label>
                        <input className={inputClass} value={settings.banner.linkUrl} onChange={(e) => updateBanner("linkUrl", e.target.value)} placeholder="https://..." />
                    </div>
                    <p className="text-xs text-slate-400">
                        \u062a\u06ce\u0628\u06cc\u0646\u06cc: \u0628\u06c6 \u0648\u06ce\u0646\u06d5/\u06a4\u06cc\u062f\u06cc\u06c6 \u067e\u06ce\u0648\u06cc\u0633\u062a\u06d5 \u0644\u06cc\u0646\u06a9\u06cc \u0695\u0627\u0633\u062a\u06d5\u0648\u062e\u06c6 \u062f\u0627\u0628\u0646\u06ce\u06cc\u062a (\u0628\u06c6 \u0646\u0645\u0648\u0648\u0646\u06d5 \u0628\u0627\u0631\u06a9\u0631\u062f\u0646\u06cc \u0648\u06ce\u0646\u06d5 \u0628\u06c6 imgbb.com \u06cc\u0627\u0646 \u0647\u06d5\u0631 \u0634\u0648\u06ce\u0646\u06ce\u06a9\u06cc \u062a\u0631 \u0648 \u06a9\u06c6\u067e\u06cc\u06a9\u0631\u062f\u0646\u06cc \u0644\u06cc\u0646\u06a9\u06d5\u06a9\u06d5\u06cc).
                    </p>
                </div>
            </div>

            <button onClick={save} disabled={saving} className="bg-slate-700 text-white px-8 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition disabled:opacity-50">
                {saving ? "\u067e\u0627\u0634\u06d5\u06a9\u06d5\u0648\u062a\u06a9\u0631\u062f\u0646..." : "\u067e\u0627\u0634\u06d5\u06a9\u06d5\u0648\u062a\u06a9\u0631\u062f\u0646"}
            </button>
        </div>
    )
}

export default AdminSettingsPage

'use client'
import { useEffect, useState } from "react"
import Loading from "../Loading"
import { LockKeyhole } from "lucide-react"
import AdminNavbar from "./AdminNavbar"
import AdminSidebar from "./AdminSidebar"

// \u26a0\ufe0f Change this password to your own secret before going live.
// This is a simple client-side gate: good enough to keep casual visitors
// out of your admin panel, but not a substitute for real server-side auth.
const ADMIN_PASSWORD = "gocart-admin-2026"
const SESSION_KEY = "gocart_admin_authed"

const AdminLayout = ({ children }) => {

    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, setLoading] = useState(true)
    const [passwordInput, setPasswordInput] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        const authed = typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY) === "true"
        setIsAdmin(authed)
        setLoading(false)
    }, [])

    const handleLogin = (e) => {
        e.preventDefault()
        if (passwordInput === ADMIN_PASSWORD) {
            sessionStorage.setItem(SESSION_KEY, "true")
            setIsAdmin(true)
            setError("")
        } else {
            setError("\u067e\u0627\u0633\u0648\u06c6\u0631\u062f\u06d5\u06a9\u06d5 \u0647\u06d5\u06b5\u06d5\u06cc\u06d5")
        }
    }

    if (loading) return <Loading />

    if (!isAdmin) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
                <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm border border-slate-200">
                    <LockKeyhole className="mx-auto text-slate-500 mb-3" size={32} />
                    <h1 className="text-xl font-semibold text-slate-700 mb-1">\u0686\u0648\u0648\u0646\u06d5\u0698\u0648\u0648\u0631\u06d5\u0648\u06d5\u06cc \u0626\u06d5\u062f\u0645\u06cc\u0646</h1>
                    <p className="text-sm text-slate-400 mb-6">\u062a\u06a9\u0627\u06cc\u06d5 \u067e\u0627\u0633\u0648\u06c6\u0631\u062f\u06d5\u06a9\u06d5 \u0628\u0646\u0648\u0648\u0633\u06d5</p>
                    <form onSubmit={handleLogin} className="flex flex-col gap-3">
                        <input
                            type="password"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            placeholder="\u067e\u0627\u0633\u0648\u06c6\u0631\u062f"
                            className="border border-slate-300 rounded-lg px-4 py-2.5 outline-none focus:border-slate-500 text-center"
                            autoFocus
                        />
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button type="submit" className="bg-slate-700 text-white rounded-lg py-2.5 font-medium hover:bg-slate-800 transition">
                            \u0686\u0648\u0648\u0646\u06d5\u0698\u0648\u0648\u0631\u06d5\u0648\u06d5
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-screen">
            <AdminNavbar />
            <div className="flex flex-1 items-start h-full overflow-y-scroll no-scrollbar">
                <AdminSidebar />
                <div className="flex-1 h-full p-5 lg:pl-12 lg:pt-12 overflow-y-scroll">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AdminLayout

'use client'
import { useState } from "react"
import { X } from "lucide-react"
import { useAuth } from "@/lib/auth/AuthContext"

const AuthModal = ({ onClose }) => {
    const { signIn, signUp } = useAuth()
    const [mode, setMode] = useState("signin") // signin | signup
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        setError("")
        const result = mode === "signin" ? signIn(email, password) : signUp(name, email, password)
        if (result.error) setError(result.error)
        else onClose()
    }

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-sm relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                    <X size={20} />
                </button>
                <h2 className="text-xl font-semibold text-slate-700 mb-1">
                    {mode === "signin" ? "\u0686\u0648\u0648\u0646\u06d5\u0698\u0648\u0648\u0631\u06d5\u0648\u06d5" : "\u062f\u0631\u0648\u0633\u062a\u06a9\u0631\u062f\u0646\u06cc \u0647\u06d5\u0698\u0645\u0627\u0631"}
                </h2>
                <p className="text-sm text-slate-400 mb-6">
                    {mode === "signin" ? "\u0628\u06d5\u062e\u06ce\u0631\u0628\u06ce\u06cc\u062a\u06d5\u0648\u06d5 \u0628\u06c6 gocart" : "\u0647\u06d5\u0698\u0645\u0627\u0631\u06ce\u06a9\u06cc \u0646\u0648\u06ce \u062f\u0631\u0648\u0633\u062a \u0628\u06a9\u06d5"}
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    {mode === "signup" && (
                        <input
                            type="text" required value={name} onChange={(e) => setName(e.target.value)}
                            placeholder="\u0646\u0627\u0648" className="border border-slate-300 rounded-lg px-4 py-2.5 outline-none focus:border-indigo-400"
                        />
                    )}
                    <input
                        type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                        placeholder="\u0626\u06cc\u0645\u06d5\u06cc\u0644" className="border border-slate-300 rounded-lg px-4 py-2.5 outline-none focus:border-indigo-400"
                    />
                    <input
                        type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                        placeholder="\u067e\u0627\u0633\u0648\u06c6\u0631\u062f" className="border border-slate-300 rounded-lg px-4 py-2.5 outline-none focus:border-indigo-400"
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-lg py-2.5 font-medium mt-2">
                        {mode === "signin" ? "\u0686\u0648\u0648\u0646\u06d5\u0698\u0648\u0648\u0631\u06d5\u0648\u06d5" : "\u062f\u0631\u0648\u0633\u062a\u06a9\u0631\u062f\u0646\u06cc \u0647\u06d5\u0698\u0645\u0627\u0631"}
                    </button>
                </form>
                <p className="text-sm text-slate-500 text-center mt-5">
                    {mode === "signin" ? (
                        <>\u0647\u06d5\u0698\u0645\u0627\u0631\u062a \u0646\u06cc\u06d5\u061f{" "}
                            <button onClick={() => setMode("signup")} className="text-indigo-500 font-medium">\u062f\u0631\u0648\u0633\u062a\u06cc \u0628\u06a9\u06d5</button>
                        </>
                    ) : (
                        <>\u0647\u06d5\u0698\u0645\u0627\u0631\u062a \u0647\u06d5\u06cc\u06d5\u061f{" "}
                            <button onClick={() => setMode("signin")} className="text-indigo-500 font-medium">\u0686\u0648\u0648\u0646\u06d5\u0698\u0648\u0648\u0631\u06d5\u0648\u06d5</button>
                        </>
                    )}
                </p>
            </div>
        </div>
    )
}

export default AuthModal

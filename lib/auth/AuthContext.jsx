'use client'
import { createContext, useContext, useEffect, useState } from "react"

// NOTE: This is a lightweight, no-backend auth system. Accounts are stored
// per-browser in localStorage. It's enough for a demo/small store where
// customers just want to save their name for checkout, but it is NOT secure
// enough for real payment/production use, and accounts won't sync across
// devices. Real customer accounts need a database (e.g. Postgres via Neon).
const USERS_KEY = "gocart_users"
const SESSION_KEY = "gocart_current_user"

const AuthContext = createContext(null)

function getUsers() {
    if (typeof window === "undefined") return []
    try {
        return JSON.parse(localStorage.getItem(USERS_KEY) || "[]")
    } catch {
        return []
    }
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const email = localStorage.getItem(SESSION_KEY)
        if (email) {
            const found = getUsers().find(u => u.email === email)
            if (found) setUser({ name: found.name, email: found.email })
        }
        setLoaded(true)
    }, [])

    const signUp = (name, email, password) => {
        const users = getUsers()
        if (users.some(u => u.email === email)) {
            return { error: "\u0626\u06d5\u0645 \u0626\u06cc\u0645\u06d5\u06cc\u0644\u06d5 \u067e\u06ce\u0634\u062a\u0631 \u062a\u06c6\u0645\u0627\u0631\u06a9\u0631\u0627\u0648\u06d5" }
        }
        const newUser = { name, email, password }
        localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]))
        localStorage.setItem(SESSION_KEY, email)
        setUser({ name, email })
        return { success: true }
    }

    const signIn = (email, password) => {
        const users = getUsers()
        const found = users.find(u => u.email === email && u.password === password)
        if (!found) return { error: "\u0626\u06cc\u0645\u06d5\u06cc\u0644 \u06cc\u0627\u0646 \u067e\u0627\u0633\u0648\u06c6\u0631\u062f \u0647\u06d5\u06b5\u06d5\u06cc\u06d5" }
        localStorage.setItem(SESSION_KEY, email)
        setUser({ name: found.name, email: found.email })
        return { success: true }
    }

    const signOut = () => {
        localStorage.removeItem(SESSION_KEY)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loaded, signUp, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth must be used within AuthProvider")
    return ctx
}

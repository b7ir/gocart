'use client'
import { useEffect, useState } from "react";

const FALLBACK = {
    phone: "+1-212-456-7890",
    email: "contact@example.com",
    address: "794 Francisco, 94102",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    banner: { enabled: false, imageUrl: "", videoUrl: "", linkUrl: "", title: "" },
};

export function useSiteSettings() {
    const [settings, setSettings] = useState(FALLBACK);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        fetch("/api/settings")
            .then((res) => res.json())
            .then((data) => {
                if (!cancelled) setSettings({ ...FALLBACK, ...data });
            })
            .catch(() => {
                // keep fallback values on error
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => { cancelled = true };
    }, []);

    return { settings, loading };
}

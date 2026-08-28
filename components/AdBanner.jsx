'use client'
import Link from "next/link"
import { useSiteSettings } from "@/lib/useSiteSettings"

const AdBanner = () => {
    const { settings, loading } = useSiteSettings()
    const { banner } = settings

    if (loading || !banner?.enabled || (!banner.imageUrl && !banner.videoUrl)) return null

    const content = (
        <div className="relative w-full max-w-7xl mx-auto my-10 rounded-2xl overflow-hidden bg-slate-100">
            {banner.videoUrl ? (
                <video src={banner.videoUrl} autoPlay muted loop playsInline className="w-full max-h-[420px] object-cover" />
            ) : (
                <img src={banner.imageUrl} alt={banner.title || "ad"} className="w-full max-h-[420px] object-cover" />
            )}
            {banner.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                    <p className="text-white text-lg sm:text-2xl font-medium">{banner.title}</p>
                </div>
            )}
        </div>
    )

    return banner.linkUrl ? (
        <Link href={banner.linkUrl} className="block px-6">{content}</Link>
    ) : (
        <div className="px-6">{content}</div>
    )
}

export default AdBanner

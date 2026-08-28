import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

const KV_KEY = "site-settings";

// \u26a0\ufe0f Keep this in sync with ADMIN_PASSWORD in components/admin/AdminLayout.jsx
// It protects the write (POST) endpoint so only your admin panel can save changes.
const ADMIN_PASSWORD = "gocart-admin-2026";

export const DEFAULT_SETTINGS = {
    phone: "+1-212-456-7890",
    email: "contact@example.com",
    address: "794 Francisco, 94102",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    banner: {
        enabled: false,
        imageUrl: "",
        videoUrl: "",
        linkUrl: "",
        title: "",
    },
};

export async function GET() {
    try {
        const { env } = getCloudflareContext();
        const raw = await env.SETTINGS_KV.get(KV_KEY);
        const settings = raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
        return NextResponse.json(settings);
    } catch (err) {
        // If KV isn't reachable for any reason, fall back to defaults
        // rather than breaking the page that reads these settings.
        return NextResponse.json(DEFAULT_SETTINGS);
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { password, ...settings } = body;

        if (password !== ADMIN_PASSWORD) {
            return NextResponse.json({ error: "\u067e\u0627\u0633\u0648\u06c6\u0631\u062f\u06cc \u0647\u06d5\u06b5\u06d5" }, { status: 401 });
        }

        const { env } = getCloudflareContext();
        const merged = { ...DEFAULT_SETTINGS, ...settings };
        await env.SETTINGS_KV.put(KV_KEY, JSON.stringify(merged));

        return NextResponse.json({ success: true, settings: merged });
    } catch (err) {
        return NextResponse.json({ error: "\u0647\u06d5\u06b5\u06d5\u06cc\u06d5\u06a9 \u0695\u0648\u0648\u06cc\u062f\u0627 \u0644\u06d5 \u06a9\u0627\u062a\u06cc \u0647\u06d5\u06b5\u06af\u0631\u062a\u0646" }, { status: 500 });
    }
}

import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

const KV_KEY = "newsletter-emails";

export async function POST(request) {
    try {
        const { email } = await request.json();
        if (!email || !email.includes("@")) {
            return NextResponse.json({ error: "\u0626\u06cc\u0645\u06d5\u06cc\u0644\u06ce\u06a9\u06cc \u062f\u0631\u0648\u0633\u062a \u0628\u0646\u0648\u0648\u0633\u06d5" }, { status: 400 });
        }

        const { env } = getCloudflareContext();
        const raw = await env.SETTINGS_KV.get(KV_KEY);
        const emails = raw ? JSON.parse(raw) : [];

        if (emails.includes(email)) {
            return NextResponse.json({ success: true, alreadySubscribed: true });
        }

        emails.push(email);
        await env.SETTINGS_KV.put(KV_KEY, JSON.stringify(emails));

        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: "\u0647\u06d5\u06b5\u06d5\u06cc\u06d5\u06a9 \u0695\u0648\u0648\u06cc\u062f\u0627" }, { status: 500 });
    }
}

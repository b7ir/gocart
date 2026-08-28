import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { AuthProvider } from "@/lib/auth/AuthContext";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata = {
    title: "GoCart. - Shop smarter",
    description: "GoCart. - Shop smarter",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${outfit.className} antialiased`}>
                <LanguageProvider>
                    <AuthProvider>
                        <StoreProvider>
                            <Toaster />
                            {children}
                        </StoreProvider>
                    </AuthProvider>
                </LanguageProvider>
            </body>
        </html>
    );
}

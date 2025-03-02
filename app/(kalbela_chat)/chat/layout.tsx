import "@/styles/globals.css"
import { Metadata } from "next"
import { ToastContainer } from "react-toastify"

import { siteConfig } from "@/config/site"
import { fontPoppins } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { ThemeProvider } from "@/components/ThemeProvider"
import Navbar from "@/components/navbar/Navbar"


export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: ["kal bela chat", "chat", "message", "contact"],
    creator: siteConfig.name,
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
}

interface DashboardLayoutProps {
    children: React.ReactNode
}

export default function ChatLayout({ children }: DashboardLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta
                    name="theme-color"
                    content="#DEEBFF"
                    media="(prefers-color-scheme: light)"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta charSet="UTF-8" />
                <meta title="Dashboard - Kalbela Jobs" />
                <meta name="description" content="Dashboard - Kalbela Jobs" />
                <meta
                    name="keywords"
                    content="Jobs, Job Seeker, Employer, Job Portal, Job Posting"
                />
                <meta name="author" content="Kalbela Jobs" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="shortcut icon" href="/favicon-16x16.png" />
                <link rel="manifest" href="/manifest.json" />
            </head>
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontPoppins.variable
                )}
            >
                {children}
            </body>
        </html>
    )
}

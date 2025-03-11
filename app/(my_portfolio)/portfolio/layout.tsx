import "@/styles/globals.css"
import { Metadata } from "next"
import { ToastContainer } from "react-toastify"

import { siteConfig } from "@/config/site"
import { fontPoppins } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { ThemeProvider } from "@/components/ThemeProvider"
import BottomNav from "../../../components/BottomNav"
import PortfolioNav from "@/components/navbar/PortfolioNav"
import type { ReactNode } from 'react'

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: ["job search", "portfolio", "employment", "career", "recruitment"],
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

interface PortfolioLayoutProps {
    children: ReactNode
}

export default function PortfolioLayout({ children }: PortfolioLayoutProps) {
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
                <meta title="Portfolio" />
                <meta name="description" content="Portfolio - Kalbela Jobs" />
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
            <body>
                <ThemeProvider attribute="class" enableSystem>
                    <div className=" min-h-screen ">

                        {/* <div className=" w-full items-center">
                            <PortfolioNav />
                        </div> */}
                        {/* <MaxWidthWrapper> */}
                        <div className="">
                            <main className="w-full">
                                {children}
                                <ToastContainer />
                            </main>
                        </div>
                        {/* </MaxWidthWrapper> */}
                    </div>
                    <BottomNav />
                </ThemeProvider>
            </body>
        </html>
    )
}

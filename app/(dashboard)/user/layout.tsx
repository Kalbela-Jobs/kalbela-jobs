import "@/styles/globals.css"
import { Metadata } from "next"
import { ToastContainer } from "react-toastify"

import { siteConfig } from "@/config/site"
import { fontPoppins } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { ThemeProvider } from "@/components/ThemeProvider"
import Navbar from "@/components/navbar/Navbar"

import BottomNav from "../../../components/BottomNav"
import { Sidebar } from "./components/Sideber"

export const metadata: Metadata = {
      title: {
            default: siteConfig.name,
            template: `%s | ${siteConfig.name}`,
      },
      description: siteConfig.description,
      keywords: ["job search", "employment", "career", "recruitment"],
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

export default function DashboardLayout({ children }: DashboardLayoutProps) {
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
                        <ThemeProvider attribute="class" enableSystem>
                              <div className="flex min-h-screen flex-col">
                                    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                                          <Navbar />
                                    </header>
                                    <MaxWidthWrapper>
                                          <div className="mx-auto flex flex-col lg:flex-row">
                                                <div className="w-full lg:fixed lg:h-screen lg:w-[250px]">
                                                      <aside className="hidden min-h-screen w-64 shrink-0 border-r lg:block">
                                                            <Sidebar />
                                                      </aside>
                                                </div>
                                                <main className="mx-auto w-auto flex-1 overflow-y-auto p-0 px-0 sm:px-6 md:px-8 lg:pl-[270px] pt-4">
                                                      {children}
                                                      <ToastContainer />
                                                </main>
                                          </div>
                                    </MaxWidthWrapper>
                              </div>
                              <BottomNav />
                        </ThemeProvider>
                  </body>
            </html>
      )
}

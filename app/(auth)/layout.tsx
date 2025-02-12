import "@/styles/globals.css"
import { Metadata } from "next"
import { ToastContainer } from "react-toastify"

import { siteConfig } from "@/config/site"
import { fontPoppins } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { TailwindIndicator } from "@/components/TailwindIndicator"
import { ThemeProvider } from "@/components/ThemeProvider"
import Navbar from "@/components/navbar/Navbar"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"

export const metadata: Metadata = {
      title: {
            default: siteConfig.name,
            template: `%s - ${siteConfig.name}`,
      },
      description: siteConfig.description,
      themeColor: [
            { media: "(prefers-color-scheme: light)", color: "white" },
            { media: "(prefers-color-scheme: dark)", color: "black" },
      ],
      icons: {
            icon: "/favicon.ico",
            shortcut: "/favicon-16x16.png",
            apple: "/apple-touch-icon.png",
      },
}

interface RootLayoutProps {
      children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
      return (
            <>
                  <html lang="en" suppressHydrationWarning>
                        <head>
                              <meta
                                    name="theme-color"
                                    content="#DEEBFF"
                                    media="(prefers-color-scheme: light)"
                              />
                              <meta
                                    name="viewport"
                                    content="width=device-width, initial-scale=1.0"
                              />
                              <meta charSet="UTF-8" />
                              <meta title="Sign In - Kalbela Jobs" />
                              <meta name="description" content="Sign In - Kalbela Jobs" />
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
                                    <div className="relative flex min-h-screen flex-col bg-light-theme dark:bg-dark-theme">
                                          <header className="sticky top-0 z-50">
                                                <Navbar />
                                          </header>
                                          <main>
                                                <MaxWidthWrapper>
                                                      <div className="flex-1 items-center justify-center">{children}</div>
                                                </MaxWidthWrapper>
                                                <ToastContainer />
                                          </main>
                                    </div>
                                    <TailwindIndicator />
                              </ThemeProvider>
                        </body>
                  </html>
            </>
      )
}

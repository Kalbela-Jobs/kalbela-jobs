"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Download, X } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"

/// <reference lib="webworker" />

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>
    userChoice: Promise<{
        outcome: "accepted" | "dismissed"
        platform: string
    }>
}

interface PropsType {
    size?: "default" | "sm" | "lg" | "icon"
}

declare global {
    interface WindowEventMap {
        beforeinstallprompt: BeforeInstallPromptEvent
    }
}

const DownloadApp: React.FC<PropsType> = ({ size = "default" }) => {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        // Check localStorage to see if the user has already closed or installed the app
        const hasInteracted = localStorage.getItem("appDownloadInteracted")

        if (hasInteracted) {
            return // Don't show the popup if the user has already interacted with it
        }

        const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
            e.preventDefault()
            setDeferredPrompt(e)
            setIsOpen(true) // Open the popup when the app is installable
        }

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

        // Show the popup after a short delay if the app is not already installed
        // This ensures we don't show it immediately on page load
        const timer = setTimeout(() => {
            setIsOpen(true)
        }, 2000)

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
            clearTimeout(timer)
        }
    }, [])

    const handleInstallClick = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt()

            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === "accepted") {
                    console.log("User accepted the A2HS prompt")
                    // Save to localStorage that the user has installed the app
                    localStorage.setItem("appDownloadInteracted", "installed")
                } else {
                    console.log("User dismissed the A2HS prompt")
                }
                setDeferredPrompt(null)
                setIsOpen(false)
            })
        } else {
            // If no install prompt is available, just close the dialog
            handleCloseClick()
        }
    }

    // const handleInstallClick = () => {
    //       if (deferredPrompt) {
    //             deferredPrompt.prompt();

    //             deferredPrompt.userChoice.then((choiceResult) => {
    //                   if (choiceResult.outcome === "accepted") {
    //                         console.log("User accepted the A2HS prompt");
    //                   } else {
    //                         console.log("User dismissed the A2HS prompt");
    //                   }
    //                   setDeferredPrompt(null);
    //                   handleCloseClick()
    //             });
    //       }
    // };

    const handleCloseClick = () => {
        // Save to localStorage that the user has closed the popup
        localStorage.setItem("appDownloadInteracted", "closed")
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleCloseClick}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Download className="h-5 w-5" />
                        Download Our App
                    </DialogTitle>
                    <DialogDescription className="text-start">Install our app for a better experience and offline access.</DialogDescription>
                </DialogHeader>
                <div className="flex justify-between items-center mt-4">
                    <Button variant="outline" onClick={handleCloseClick} className="flex items-center gap-1">
                        <X className="h-4 w-4" />
                        Close
                    </Button>
                    <Button
                        className="bg-primary text-white hover:shadow-lg duration-300 flex items-center gap-1"
                        onClick={handleInstallClick}
                        size={size}
                    >
                        Install App
                        <Download className="h-4 w-4" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DownloadApp
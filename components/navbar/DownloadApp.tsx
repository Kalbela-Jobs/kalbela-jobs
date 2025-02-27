'use client';

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
/// <reference lib="webworker" />

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
    }>;
}

interface PropsType {
    size?: "default" | "sm" | "lg" | "icon";
}

declare global {
    interface WindowEventMap {
        'beforeinstallprompt': BeforeInstallPromptEvent;
    }
}

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
    }>;
}

const DownloadApp: React.FC<PropsType> = ({ size }) => {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isInstallable, setIsInstallable] = useState<boolean>(true);

    useEffect(() => {
        // Listener for the 'beforeinstallprompt' event
        const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
            e.preventDefault(); // Prevent the default prompt
            setDeferredPrompt(e); // Store the event
            setIsInstallable(true); // Make the install button visible
        };

        // Add the event listener to handle the install prompt
        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        // Cleanup listener when component unmounts
        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();

            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === "accepted") {
                    console.log("User accepted the A2HS prompt");
                } else {
                    console.log("User dismissed the A2HS prompt");
                }
                setDeferredPrompt(null);
                setIsInstallable(false);
            });
        }
    };

    return (
        <>
            {isInstallable && (
                <Button className="!rounded hover:shadow-lg duration-300" onClick={handleInstallClick} variant="outline" size={size}>
                    {size === "icon" ? "" : "Install App"} <Download />
                </Button>
            )}
        </>
    );
};

export default DownloadApp;

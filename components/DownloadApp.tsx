'use client';

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { Alert } from "./ui/alert";
import { Button } from "./ui/button";
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
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setIsInstallable(true);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

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


    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.innerHeight + window.scrollY;
            const documentHeight = document.documentElement.scrollHeight;

            // If the user scrolls to the bottom, make it sticky
            setIsSticky(scrollPosition >= documentHeight - 200);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <>
            {isInstallable && <div
                className={`w-full px-3 flex justify-center transition-all duration-300 z-10 ${isSticky ? "sticky bottom-[300px]" : "fixed bottom-5"
                    }`}
            >
                <div className="md:!w-[700px] w-full">
                    <Alert className="bg-[#efebeb] !shadow-lg !rounded-sm !flex !items-center !justify-between">
                        <div className="flex items-center gap-2">
                            <Download className="" />
                            <h1>Download Our App</h1>
                        </div>
                        <Button className="bg-primary !text-[white] !rounded hover:shadow-lg duration-300" onClick={handleInstallClick} variant="outline" size={size}>
                            {size === "icon" ? "" : "Install App"} <Download />
                        </Button>
                    </Alert>
                </div>
            </div>}
        </>
    );
};

export default DownloadApp;

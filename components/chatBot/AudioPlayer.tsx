"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function AudioPlayer({ audioUrl }: { audioUrl: string }) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [audioName] = useState(`REC${Math.floor(Math.random() * 1000)}`);

    // Format time (MM:SS)
    const formatTime = (seconds: number) => {
        if (isNaN(seconds) || seconds === Infinity) return "00:00";
        return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // Update current time while playing
        const updateTime = () => setCurrentTime(audio.currentTime);

        // Ensure duration is set when metadata is loaded
        const setAudioDuration = () => {
            if (!isNaN(audio.duration) && audio.duration > 0) {
                setDuration(audio.duration);
            }
        };

        // Attach event listeners
        audio.addEventListener("loadedmetadata", setAudioDuration);
        audio.addEventListener("timeupdate", updateTime);

        // Remove event listeners on unmount
        return () => {
            audio.removeEventListener("loadedmetadata", setAudioDuration);
            audio.removeEventListener("timeupdate", updateTime);
        };
    }, []);

    // Play/Pause Function
    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying((prev) => !prev);
    };

    return (
        <div className="audio-player flex items-center gap-2">
            <button onClick={togglePlay}>
                {isPlaying ? <Pause /> : <Play />}
            </button>
            <div className="my-recording-wave flex gap-1">
                {[...Array(30)].map((_, i) => (
                    <div key={i} className={isPlaying ? "wave-bar-play" : "wave-bar-pause"} style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
            </div>
            <audio ref={audioRef} src={audioUrl} preload="metadata" />
        </div>
    );
}

export default AudioPlayer;

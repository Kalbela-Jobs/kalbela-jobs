import AudioPlayer from '@/app/(dashboard)/user/chats/components/AudioPlay';
import { useUserData } from '@/utils/encript_decript';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { Avatar } from '../ui/avatar';
import { Pause, Play } from 'lucide-react';

interface ChatAreaProps {
    messages: any;
    selectedUser: any;
    onSendMessage: (message: any) => any;
    candidate: any;
    refetch: () => any;
    isLoading: any;
    users: any;
}

const ChatAreaBox = ({ messages: allMessage, selectedUser, onSendMessage, candidate, refetch, isLoading, users }: ChatAreaProps) => {
    const [user] = useUserData();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState<string | null>(null); // Track currently playing audio ID
    const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map()); // Use useRef for audio element references

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [allMessage]);

    const getInitials = (name?: string) =>
        name?.split(' ').map(word => word[0]).join('').toUpperCase();

    const messages = [...allMessage].sort((a, b) => {
        const dateA = new Date(a?.timestamp);
        const dateB = new Date(b?.timestamp);
        return dateA.getTime() - dateB.getTime();
    });

    const formatTime = (timestamp: string): string => {
        const date: Date = new Date(timestamp);
        let hours: number = date.getHours();
        let minutes: number | string = date.getMinutes();

        hours = hours % 12 || 12;
        minutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${hours}:${minutes}`;
    };

    const isMe = (id: string) => {
        return user?._id === id;
    };

    // Handle audio play/pause
    const togglePlay = (audioId: string) => {
        const audioElement = audioRefs.current.get(audioId);
        if (!audioElement) return;

        // If audio is playing, pause it
        if (isPlaying === audioId) {
            audioElement.pause();
            setIsPlaying(null);
        } else {
            // Play the selected audio
            audioElement.play();
            setIsPlaying(audioId);
        }
    };

    const handleAudioEnd = (audioId: string) => {
        // Reset animation and playing state when audio ends
        setIsPlaying(null);
    };

    // Store audio element reference using useRef instead of useState
    const setAudioElementRef = (audioId: string, audioElement: HTMLAudioElement | null) => {
        if (audioElement) {
            audioRefs.current.set(audioId, audioElement);
        } else {
            audioRefs.current.delete(audioId);
        }
    };

    return (
        <div className="space-y-3 bg-gray-100 h-full md:px-4 md:pb-4 pt-4 mt-[-8px]">
            {messages?.map((chat: any) => (
                <div key={chat?._id} className={`flex items-end `}>
                    <div className={`flex items-end ${isMe(chat?.sender) ? 'ml-auto' : 'mr-auto'}`}>
                        <div className={`bg-gray-900 text-white p-2 rounded-lg ${isMe(chat?.sender) ? 'rounded-br-none order-1' : 'rounded-bl-none order-2'}`}>

                            {chat?.attachments && (
                                <div className={`mb-4 flex flex-wrap gap-2 ${isMe(chat?.sender) ? ' justify-end' : ' flex justify-start'}`}>
                                    {chat?.attachments?.map((itm: string) => (
                                        <img key={itm} src={itm} className='h-16 border w-16 rounded-md object-cover' />
                                    ))}
                                </div>
                            )}

                            {chat?.audio && (
                                <div className={`mb-4 ${isMe(chat?.sender) ? ' flex justify-end' : ' flex justify-start'}`}>
                                    <div className="audio-player flex items-center gap-2">
                                        <button onClick={() => togglePlay(chat?._id)}>
                                            {isPlaying === chat?._id ? <Pause /> : <Play />}
                                        </button>
                                        <div className="my-recording-wave flex gap-1">
                                            {[...Array(30)].map((_, i) => (
                                                <div key={i} className={isPlaying === chat?._id ? "wave-bar-play" : "wave-bar-pause"} style={{ animationDelay: `${i * 0.1}s` }} />
                                            ))}
                                        </div>
                                        <audio
                                            ref={(audioElement) => setAudioElementRef(chat?._id, audioElement)}
                                            src={chat?.audio}
                                            preload="metadata"
                                            onEnded={() => handleAudioEnd(chat?._id)}
                                        />
                                    </div>
                                </div>
                            )}

                            <p className="">
                                {chat?.content}
                                <p className={`text-xs ${isMe(chat?.sender) ? 'text-right' : 'text-left'}`}>{formatTime(chat?.timestamp)}</p>
                            </p>
                        </div>
                        <Image
                            className={`w-8 h-8 rounded-full mt-2 border ${isMe(chat?.sender) ? 'order-2' : 'order-1'}`}
                            src={'/icons/icon-192x192.png'}
                            width={300} height={300} alt='logo' />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatAreaBox;

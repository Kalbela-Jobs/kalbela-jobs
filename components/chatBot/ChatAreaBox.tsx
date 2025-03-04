import AudioPlayer from '@/app/(dashboard)/user/chats/components/AudioPlay';
import { useUserData } from '@/utils/encript_decript';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
interface ChatAreaProps {
    messages: any;
    selectedUser: any;
    onSendMessage: (message: any) => any;
    candidate: any;
    refetch: () => any;
    isLoading: any;
}


const ChatAreaBox = ({ messages, selectedUser, onSendMessage, candidate, refetch, isLoading }: ChatAreaProps) => {
    const [user] = useUserData();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const getInitials = (name?: string) =>
        name?.split(' ').map(word => word[0]).join('').toUpperCase();


    const myId = '121';
    const chatData = [
        {
            id: '121',
            message: "Hello! How are you?",
            audio: '',
            image: 'https://randomuser.me/api/portraits/men/1.jpg',
            name: 'Me',
            time: '10:30 AM',
        },
        {
            id: '122',
            message: "I'm good, thanks! How about you?",
            audio: '',
            image: 'https://randomuser.me/api/portraits/men/2.jpg',
            name: 'John',
            time: '10:31 AM',
        },
        {
            id: '121',
            message: "I'm doing well too. What are you up to?",
            audio: '',
            image: 'https://randomuser.me/api/portraits/men/1.jpg',
            name: 'Me',
            time: '10:32 AM',
        },
        {
            id: '122',
            message: "",
            audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Audio message
            image: 'https://randomuser.me/api/portraits/men/2.jpg',
            name: 'John',
            time: '10:33 AM',
        },
        {
            id: '121',
            message: "",
            audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', // Audio message
            image: 'https://randomuser.me/api/portraits/men/1.jpg',
            name: 'Me',
            time: '10:34 AM',
        }, {
            id: '121',
            message: "Hello! How are you?",
            audio: '',
            image: 'https://randomuser.me/api/portraits/men/1.jpg',
            name: 'Me',
            time: '10:30 AM',
        },
        {
            id: '122',
            message: "I'm good, thanks! How about you?",
            audio: '',
            image: 'https://randomuser.me/api/portraits/men/2.jpg',
            name: 'John',
            time: '10:31 AM',
        },
        {
            id: '121',
            message: "I'm doing well too. What are you up to?",
            audio: '',
            image: 'https://randomuser.me/api/portraits/men/1.jpg',
            name: 'Me',
            time: '10:32 AM',
        },
        {
            id: '122',
            message: "",
            audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Audio message
            image: 'https://randomuser.me/api/portraits/men/2.jpg',
            name: 'John',
            time: '10:33 AM',
        },
        {
            id: '121',
            message: "",
            audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', // Audio message
            image: 'https://randomuser.me/api/portraits/men/1.jpg',
            name: 'Me',
            time: '10:34 AM',
        }, {
            id: '121',
            message: "Hello! How are you?",
            audio: '',
            image: 'https://randomuser.me/api/portraits/men/1.jpg',
            name: 'Me',
            time: '10:30 AM',
        },
        {
            id: '122',
            message: "I'm good, thanks! How about you?",
            audio: '',
            image: 'https://randomuser.me/api/portraits/men/2.jpg',
            name: 'John',
            time: '10:31 AM',
        },
        {
            id: '121',
            message: "I'm doing well too. What are you up to?",
            audio: '',
            image: 'https://randomuser.me/api/portraits/men/1.jpg',
            name: 'Me',
            time: '10:32 AM',
        },
        {
            id: '122',
            message: "",
            audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Audio message
            image: 'https://randomuser.me/api/portraits/men/2.jpg',
            name: 'John',
            time: '10:33 AM',
        },
        {
            id: '121',
            message: "",
            audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', // Audio message
            image: 'https://randomuser.me/api/portraits/men/1.jpg',
            name: 'Me',
            time: '10:34 AM',
        }, {
            id: '121',
            message: "Hello! How are you?",
            audio: '',
            image: 'https://randomuser.me/api/portraits/men/1.jpg',
            name: 'Me',
            time: '10:30 AM',
        },
        {
            id: '122',
            message: "I'm good, thanks! How about you?",
            audio: '',
            image: 'https://randomuser.me/api/portraits/men/2.jpg',
            name: 'John',
            time: '10:31 AM',
        },
        {
            id: '121',
            message: "I'm doing well too. What are you up to?",
            audio: '',
            image: 'https://randomuser.me/api/portraits/men/1.jpg',
            name: 'Me',
            time: '10:32 AM',
        },
        {
            id: '122',
            message: "",
            audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Audio message
            image: 'https://randomuser.me/api/portraits/men/2.jpg',
            name: 'John',
            time: '10:33 AM',
        },
        {
            id: '121',
            message: "",
            audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', // Audio message
            image: 'https://randomuser.me/api/portraits/men/1.jpg',
            name: 'Me',
            time: '10:34 AM',
        },
    ];
    console.log('message : ');

    return (
        <div className="space-y-3 bg-gray-100 h-full p-4">

            {Array.isArray(messages) && messages.map((message) => {
                const hasHTML = /<\/?[a-z][\s\S]*>/i.test(message.content);
                const isUserSender = message.sender === user?._id;

                return (
                    <div key={message._id} className={`message-bubble ${isUserSender ? 'sent' : 'received'}`}>
                        {hasHTML ? (
                            <span dangerouslySetInnerHTML={{ __html: message.content }} />
                        ) : (
                            <span>{message.content}</span>
                        )}

                        {message.attachments?.map((att: string, i: number) => (
                            <Image
                                key={i}
                                src={att}
                                alt="attachment"
                                width={200}
                                height={200}
                                className="rounded-md mt-2"
                            />
                        ))}


                        {message.audio && <AudioPlayer audioUrl={message.audio} />}

                        <div className="message-status flex justify-between mt-1 text-xs text-gray-400">
                            <span>{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
                            {isUserSender && <span className="flex items-center gap-1">Sent <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg></span>}
                        </div>
                    </div>
                );
            })}
            <div ref={messagesEndRef} />
            {chatData.map((chat, index) => (
                <div key={index} className={`hidden items-end ${chat.id === myId ? 'justify-end' : 'justify-start'}`}>

                    {/* Receiver's Image */}
                    {chat.id !== myId && (
                        <img src={chat.image} alt="User" className="w-8 h-8 rounded-full mr-2" />
                    )}

                    <div className={`max-w-xs p-3 rounded-lg ${chat.id === myId ? 'bg-primary text-white' : 'bg-white text-black'} shadow-md`}>
                        {/* Text Message */}
                        {chat.message && <p>{chat.message}</p>}
                        {<span className="text-xs text-gray-400 block my-1">{chat.time}</span>}

                        {/* Default HTML Audio Player */}
                        {chat.audio && (
                            <audio controls controlsList="nodownload noplaybackrate" onContextMenu={(e) => e.preventDefault()}>
                                <source src={chat.audio} type="audio/mp3" />
                                Your browser does not support the audio element.
                            </audio>

                        )}

                    </div>

                    {/* Sender's Image */}
                    {chat.id === myId && (
                        <img src={chat.image} alt="Me" className="w-8 h-8 rounded-full ml-2" />
                    )}

                </div>
            ))}
        </div>
    );
};

export default ChatAreaBox;

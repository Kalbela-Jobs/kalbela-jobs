import React from 'react';

const ChatAreaBox: React.FC = () => {
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

    return (
        <div className="space-y-3 bg-gray-100 h-full p-4">
            {chatData.map((chat, index) => (
                <div key={index} className={`flex items-end ${chat.id === myId ? 'justify-end' : 'justify-start'}`}>

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

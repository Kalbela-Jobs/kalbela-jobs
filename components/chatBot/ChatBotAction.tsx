'use client'
import React, { useState } from 'react';
import { Mic, Paperclip, Send, SmilePlus } from 'lucide-react';

const ChatBotAction: React.FC = () => {
    const [isEmojiOpen, setIsEmojiOpen] = useState(false);
    const emojis = [
        "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
        "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
        "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
        "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
        "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
        "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
        "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
        "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚",
    ];

    return (
        <div className='bg-[white] mt-2 shadow-xl h-[68px] flex items-center gap-2 w-full justify-center px-4 border-t relative'>
            <button className="text-sm flex items-center justify-center rounded-full">
                <Paperclip />
            </button>
            <div className="w-full bg-[#e6e3e370] border rounded-full border-[#b7b5b5a4] px-2 flex items-center gap-1 h-[38px] relative">
                <button
                    className="w-8 h-8 text-sm flex items-center justify-center rounded-full"
                    onClick={() => setIsEmojiOpen(!isEmojiOpen)}
                >
                    <SmilePlus />
                </button>

                {isEmojiOpen && (
                    <div className="absolute bottom-[45px] flex flex-wrap left-0 bg-white shadow-md p-2 rounded-md w-[230px] max-h-[300px] overflow-y-auto">
                        {
                            emojis?.map((emoji, index) => <p key={index} className="text-xl hover:bg-gray-300 duration-300 p-1 rounded-full cursor-pointer chat-bot">{emoji}</p>)
                        }
                    </div>
                )}

                <input
                    placeholder='write a message'
                    className='focus-within:outline-none focus:outline-none px-2 w-full h-full bg-transparent'
                    type="text"
                />
                <button className="w-9 h-9 text-sm flex items-center justify-center rounded-full">
                    <Mic />
                </button>
            </div>
            <button className="text-primary w-8 h-8 text-sm flex items-center justify-center rounded-full">
                <Send />
            </button>
        </div>
    );
};

export default ChatBotAction;

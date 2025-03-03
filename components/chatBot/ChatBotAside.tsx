'use client';
import { ChevronLeft, ChevronLeftIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import ChatUserList from './ChatUserList';

interface ChatBotAreaType {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatBotAside: React.FC<ChatBotAreaType> = ({ open, setOpen }) => {
    return (
        <div className={`md:relative absolute ${open ? 'md:translate-x-[-100%] translate-x-0 md:w-0 w-[90%]' : 'md:translate-x-0 translate-x-[-100%] md:w-[30%] w-[90%] '} overflow-hidden duration-300 top-0 left-0 bottom-0  bg-[#fff] border-r `}>
            <div className="flex  justify-between h-[68px] items-center gap-2 border-b px-4">
                <div className="flex items-center">
                    <Image
                        className="w-[140px] rounded-full"
                        src="/logo.png"
                        alt="logo"
                        width={100}
                        height={100}
                    />
                    <h2 className="text-lg font-semibold">Chat</h2>
                </div>
                <button onClick={() => setOpen(true)} className='w-8 h-8 border text-gray-500 mr-2 md:flex hidden items-center justify-center rounded-full'><ChevronLeftIcon /></button>

                <button onClick={() => setOpen(false)} className='w-8 h-8 md:hidden border text-gray-500 mr-2 flex items-center justify-center rounded-full'><ChevronLeftIcon /></button>
            </div>
            <div className="overflow-y-auto h-full px-4 py-1 chat-bot ">
                <input type='text' className='border w-full mt-2 mb-3 bg-gray-200 px-3 py-1 rounded-full' placeholder='Search...' />

                <ul className="w-full">
                    <ChatUserList />
                    <ChatUserList />
                    <ChatUserList />
                    <ChatUserList />
                    <ChatUserList />
                    <ChatUserList />
                    <ChatUserList />
                    <ChatUserList />
                    <ChatUserList />
                    <ChatUserList />
                    <ChatUserList />
                    <ChatUserList />
                    <ChatUserList />
                    <ChatUserList />
                    <ChatUserList />
                    <ChatUserList />
                    <ChatUserList />
                    <ChatUserList />
                    <ChatUserList />
                    <ChatUserList />
                </ul>
            </div>
        </div>
    );
};

export default ChatBotAside;
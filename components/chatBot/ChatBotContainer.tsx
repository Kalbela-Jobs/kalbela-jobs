'use client'
import ChatBotHeader from "./ChatBotHeader";
import ChatBotAction from "./ChatBotAction";
import ChatBotAside from "./ChatBotAside";
import React, { useState } from "react";
import ChatAreaBox from "./ChatAreaBox";

interface ChatBotContainerType {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ChatBotContainer: React.FC<ChatBotContainerType> = ({ isOpen, setIsOpen }) => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <div className="h-[calc(100vh-100px)] flex ">
            <ChatBotAside open={open} setOpen={setOpen} />

            <div className={`${!open ? 'md:w-[70%]' : 'md:w-[100%]'} bg-[#f7f5f5]`}>
                <ChatBotHeader
                    open={open}
                    setOpen={setOpen}
                    modalClose={isOpen}
                    setModalClose={setIsOpen}
                />
                <div className=" md:px-6 px-4 pt-2 pb-8 md:h-[78%] h-[75%] overflow-y-auto chat-bot-chat-area">
                    <ChatAreaBox />
                </div>
                <ChatBotAction />
            </div>
        </div>
    );
};

export default ChatBotContainer;
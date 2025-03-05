'use client'
import ChatBotHeader from "./ChatBotHeader";
import ChatBotAction from "./ChatBotAction";
import ChatBotAside from "./ChatBotAside";
import React, { useEffect, useState } from "react";
import ChatAreaBox from "./ChatAreaBox";
import { useUserData } from "@/utils/encript_decript";
import { useQuery } from "@tanstack/react-query";
import uploadImage from "@/app/hooks/useUploadImage";
import upload_audio from "@/app/hooks/useUploadAudio";

interface ChatBotContainerType {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ChatBotContainer: React.FC<ChatBotContainerType> = ({ isOpen, setIsOpen }) => {
    const [open, setOpen] = useState<boolean>(false);


    const [user] = useUserData()

    const { data: users = [], isLoading, error, refetch } = useQuery({
        queryKey: ["all_user", user?._id],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_APP_BASE_URL}/api/v1/chat/get-all-messaged-users?token=${user?._id}&user_id=${user?._id}`);
            if (!res.ok) {
                throw new Error("Failed to fetch candidate data");
            }
            const result = await res.json();
            return result.data;
        },
        enabled: !!user?._id && !!process.env.NEXT_APP_BASE_URL,
    });

    const [selectedUser, setSelectedUser] = useState<any>(null);

    useEffect(() => {
        if (users.length > 0) {
            setSelectedUser(users[0]);
        }
    }, [users]);

    const { data: messages = [], isLoading: isMessagesLoading, error: messagesError, refetch: refetchMessages } = useQuery({
        queryKey: ["chat", user?._id, selectedUser?.user_id],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_APP_BASE_URL}/api/v1/chat/get-chat-by-user?token=${user?._id}&to=${selectedUser?.user_id}&sender=${user?._id}`);
            if (!res.ok) {
                throw new Error("Failed to fetch candidate data");
            }
            const result = await res.json();
            return result.data;
        },
        enabled: !!user?._id && !!process.env.NEXT_APP_BASE_URL && !!selectedUser?.user_id,
    });


    const handleSendMessage = async (message: any) => {

        const newMessage = {
            to: selectedUser?.user_id,
            sender: user?._id,
            content: message.text,
            attachments: message.attachments?.length
                ? await Promise.all(message.attachments.map(async (attachment: any) => uploadImage(attachment.file)))
                : [],
            audio: message.audio ? await upload_audio(message.audio) : null,
            timestamp: new Date().toISOString(),
        };

        fetch(`${process.env.NEXT_APP_BASE_URL}/api/v1/chat/add-new-chat?token=${user?._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newMessage),
        })
            .then((res) => res.json())
            .then((data) => {
                refetch();
                refetchMessages();
            });

        // setMessages(prevMessages => ({
        //       ...prevMessages,
        //       [selectedUser.id]: [...prevMessages[selectedUser.id], newMessage]
        // }));
    };



    return (
        <div className="lg:h-[620px] h-[540px] flex ">
            <ChatBotAside
                users={users}
                onSelectUser={setSelectedUser}
                selectedUser={selectedUser}
                open={open}
                setOpen={setOpen}
            />

            <div className={`${!open ? 'md:w-[70%] w-full' : 'md:w-[100%]'} bg-[#f7f5f5]`}>
                <ChatBotHeader
                    open={open}
                    setOpen={setOpen}
                    modalClose={isOpen}
                    setModalClose={setIsOpen}
                    candidate={selectedUser}
                />
                <div className=" md:px-6 px-4 pt-2 pb-8 md:h-[78%] h-[75%] overflow-y-auto chat-bot-chat-area">
                    <ChatAreaBox
                        messages={messages}
                        selectedUser={selectedUser}
                        onSendMessage={handleSendMessage}
                        candidate={selectedUser}
                        refetch={refetchMessages}
                        isLoading={isMessagesLoading}
                        users={users}
                    />
                </div>
                <ChatBotAction onSendMessage={handleSendMessage} />
            </div>
        </div>
    );
};

export default ChatBotContainer;
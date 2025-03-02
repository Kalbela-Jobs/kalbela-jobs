// 'use client'

// import { Button } from "@/components/ui/button";
// import { Menu, MessageSquare, Send, Video, X } from "lucide-react";
// import { useEffect, useState } from "react";
// import ChatUsersList from "./ChatUsersList";
// import ChatHeader from "./ChatHeader";
// import ChatAside from "./ChatAside";
// import ChatBox from "./ChatBox";
// import ChatAction from "./ChatAction";
// import { json } from "stream/consumers";
// import { useUserData } from "@/utils/encript_decript";
// import { useQuery } from "@tanstack/react-query";
// import uploadImage from "@/app/hooks/useUploadImage";
// import upload_audio from "@/app/hooks/useUploadAudio";

// interface Message {
//     id: number;
//     text: string;
//     sender: "me" | "other";
// }


// const ChatMainBox = () => {
//     const [messages, setMessages] = useState<Message[]>([
//         { id: 1, text: "Hello! How are you?", sender: "other" },
//         { id: 2, text: "I'm good, thanks! You?", sender: "me" },
//     ]);
//     const [input, setInput] = useState("");
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//     const sendMessage = () => {
//         if (input.trim() !== "") {
//             setMessages([...messages, { id: messages.length + 1, text: input, sender: "me" }]);
//             setInput("");
//         }
//     };

//     const closeSidebar = () => {
//         setIsSidebarOpen(false);
//     };

//     // get chat data from server

//     const [user] = useUserData()

//     const { data: users = [], isLoading, error, refetch } = useQuery({
//         queryKey: ["all_user", user?._id],
//         queryFn: async () => {
//             const res = await fetch(`${process.env.NEXT_APP_BASE_URL}/api/v1/chat/get-all-messaged-users?token=${user?._id}&user_id=${user?._id}`);
//             if (!res.ok) {
//                 throw new Error("Failed to fetch candidate data");
//             }
//             const result = await res.json();
//             return result.data;
//         },
//         enabled: !!user?._id && !!process.env.NEXT_APP_BASE_URL,
//     });

//     const [selectedUser, setSelectedUser] = useState<any>(null);

//     // useEffect(() => {
//     //     if (users.length > 0) {
//     //         setSelectedUser(users[0]);
//     //     }
//     // }, [users]);

//     // const { data: messages = [], isLoading: isMessagesLoading, error: messagesError, refetch: refetchMessages } = useQuery({
//     //     queryKey: ["chat", user?._id, selectedUser?.user_id],
//     //     queryFn: async () => {
//     //         const res = await fetch(`${process.env.NEXT_APP_BASE_URL}/api/v1/chat/get-chat-by-user?token=${user?._id}&to=${selectedUser?.user_id}&sender=${user?._id}`);
//     //         if (!res.ok) {
//     //             throw new Error("Failed to fetch candidate data");
//     //         }
//     //         const result = await res.json();
//     //         return result.data;
//     //     },
//     //     enabled: !!user?._id && !!process.env.NEXT_APP_BASE_URL && !!selectedUser?.user_id,
//     // });


//     // const handleSendMessage = async (message: any) => {

//     //     const newMessage = {
//     //         to: selectedUser?.user_id,
//     //         sender: user?._id,
//     //         content: message.text,
//     //         attachments: message.attachments?.length
//     //             ? await Promise.all(message.attachments.map(async (attachment: any) => uploadImage(attachment.file)))
//     //             : [],
//     //         audio: message.audio ? await upload_audio(message.audio) : null,
//     //         timestamp: new Date().toISOString(),
//     //     };

//     //     fetch(`${process.env.NEXT_APP_BASE_URL}/api/v1/chat/add-new-chat?token=${user?._id}`, {
//     //         method: "POST",
//     //         headers: {
//     //             "Content-Type": "application/json",
//     //         },
//     //         body: JSON.stringify(newMessage),
//     //     })
//     //         .then((res) => res.json())
//     //         .then((data) => {
//     //             refetch();
//     //             refetchMessages();
//     //         });

//     //     // setMessages(prevMessages => ({
//     //     //       ...prevMessages,
//     //     //       [selectedUser.id]: [...prevMessages[selectedUser.id], newMessage]
//     //     // }));
//     // };

//     console.log("user...........", users);

//     return (
//         <div>
//             <div className="flex h-screen bg-gray-100">
//                 <ChatAside isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />

//                 {isSidebarOpen && (
//                     <div
//                         onClick={closeSidebar}
//                         className="bg-black fixed inset-0 opacity-50 z-8"
//                     />
//                 )}


//                 <main className="flex flex-col flex-1">
//                     <ChatHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

//                     <ChatBox messages={messages} />

//                     <ChatAction input={input} setInput={setInput} sendMessage={sendMessage} />
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default ChatMainBox;


'use client'

import { Button } from "@/components/ui/button";
import { Menu, MessageSquare, Send, Video, X } from "lucide-react";
import { useEffect, useState } from "react";
import ChatUsersList from "./ChatUsersList";
import ChatHeader from "./ChatHeader";
import ChatAside from "./ChatAside";
import ChatBox from "./ChatBox";
import ChatAction from "./ChatAction";
import { useUserData } from "@/utils/encript_decript";
import { useQuery } from "@tanstack/react-query";
import uploadImage from "@/app/hooks/useUploadImage";
import upload_audio from "@/app/hooks/useUploadAudio";

interface Message {
    id: number;
    text: string;
    sender: "me" | "other";
}

const ChatMainBox = () => {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hello! How are you?", sender: "other" },
        { id: 2, text: "I'm good, thanks! You?", sender: "me" },
    ]);
    const [input, setInput] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);

    const sendMessage = () => {
        if (input.trim() !== "") {
            setMessages([...messages, { id: messages.length + 1, text: input, sender: "me" }]);
            setInput("");
        }
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    const [user] = useUserData();

    // Query to fetch users
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

    // UseEffect to set the selected user when users data is available
    useEffect(() => {
        if (users.length > 0 && !selectedUser) {
            setSelectedUser(users[0]); // Set first user if no selected user exists
        }
    }, [users, selectedUser]); // Avoid unnecessary updates

    // useQuery to fetch messages based on selectedUser
    const { data: chatMessages = [], isLoading: isMessagesLoading, error: messagesError } = useQuery({
        queryKey: ["chat", user?._id, selectedUser?.user_id],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_APP_BASE_URL}/api/v1/chat/get-chat-by-user?token=${user?._id}&to=${selectedUser?.user_id}&sender=${user?._id}`);
            if (!res.ok) {
                throw new Error("Failed to fetch chat data");
            }
            const result = await res.json();
            return result.data;
        },
        enabled: !!user?._id && !!process.env.NEXT_APP_BASE_URL && !!selectedUser?.user_id,
    });

    // Handling sending message with attachment and audio
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
                // Optionally refetch chat messages too
            });
    };

    console.log("user...........",);

    return (
        <div>
            {/* <div className="flex h-screen bg-gray-100">
                <ChatAside isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />

                {isSidebarOpen && (
                    <div
                        onClick={closeSidebar}
                        className="bg-black fixed inset-0 opacity-50 z-8"
                    />
                )}

                <main className="flex flex-col flex-1">
                    <ChatHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

                    <ChatBox messages={messages} />

                    <ChatAction input={input} setInput={setInput} sendMessage={sendMessage} />
                </main>
            </div> */}
        </div>
    );
};

export default ChatMainBox;
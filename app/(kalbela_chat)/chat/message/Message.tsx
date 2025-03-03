"use client"

import React, { useContext, useEffect, useState } from 'react';
import './style/chat.css';
import './style/messenger.css';
import './style/sidebar.css';

import { useUserData } from '@/utils/encript_decript';
import useApiRequest from '@/app/hooks/useApiRequest';
import upload_audio from '@/app/hooks/useUploadAudio';
import uploadImage from '@/app/hooks/useUploadImage';
import ChatArea from '../components/ChatArea';
import Sidebar from '../components/Sidebar';
import { useQuery } from '@tanstack/react-query';

type ApiResponse = {
      data: any
      total: number
}

function Message() {
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
            <div className="flex bg-gray-200 ">
                  <div style={{ width: '320px' }}>
                        <Sidebar
                              users={users}
                              onSelectUser={setSelectedUser}
                              selectedUser={selectedUser}

                        />
                  </div>
                  <ChatArea
                        messages={messages}
                        selectedUser={selectedUser}
                        onSendMessage={handleSendMessage}
                        candidate={selectedUser}
                        refetch={refetchMessages}
                        isLoading={isMessagesLoading}
                  />
            </div>
      );
}

export default Message;

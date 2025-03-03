"use client"

import React, { useRef, useEffect, useState } from 'react';
import '../message/style/chat.css';
import '../message/style/messenger.css';
import '../message/style/sidebar.css';
import { useUserData } from '@/utils/encript_decript';
import Image from 'next/image';
import { Pause, Play } from 'lucide-react';
import MessageInput from './MessageInput';
import { normalize } from 'path';
import { set } from 'date-fns';
import AudioPlayer from './AudioPlay';

interface ChatAreaProps {
      messages: any;
      selectedUser: any;
      onSendMessage: (message: any) => any;
      candidate: any;
      refetch: () => any;
      isLoading: any;
}


const ChatArea = ({ messages, selectedUser, onSendMessage, candidate, refetch, isLoading }: ChatAreaProps) => {
      const [user] = useUserData();
      const messagesEndRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);

      const getInitials = (name?: string) =>
            name?.split(' ').map(word => word[0]).join('').toUpperCase();



      return (
            <div className="">
                  <div className="message-area h-screen">
                        <div className="community-header primary-bg">
                              <div className="community-info">
                                    <div className="community-avatar">
                                          {candidate?.profile_picture ? (
                                                <Image
                                                      src={candidate.profile_picture}
                                                      alt={candidate.fullName}
                                                      width={50}
                                                      height={50}
                                                      className="rounded-lg"
                                                />
                                          ) : (
                                                <div className="community-avatar-placeholder">
                                                      {getInitials(selectedUser?.name)}
                                                </div>
                                          )}
                                    </div>
                                    <div className="community-details text-white">
                                          <h2>{candidate?.fullName}</h2>
                                          <div className="community-status">Active now</div>
                                    </div>
                              </div>
                              <div className="community-actions">
                                    <button className="action-button" onClick={() => refetch()} disabled={isLoading}>
                                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M23 7l-7 5 7 5V7z" />
                                                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                                          </svg>
                                    </button>
                              </div>
                        </div>

                        <div className="messages-container !bg-[#f2efef] dark:!bg-gray-900 !text-black overflow-y-auto h-[calc(100vh-150px)] px-4">
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
                        </div>

                        <MessageInput onSendMessage={onSendMessage} />
                  </div>
            </div>
      );
};

export default ChatArea;






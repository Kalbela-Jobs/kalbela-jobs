"use client"

import React, { useRef, useEffect, useState } from 'react';
import '../message/style/chat.css';
import '../message/style/messenger.css';
import '../message/style/sidebar.css';
import { useUserData } from '@/utils/encript_decript';
import Image from 'next/image';
import { Pause, Play } from 'lucide-react';
import MessageInput from './MessageInput';

interface ChatAreaProps {
      messages: any;
      selectedUser: any;
      onSendMessage: (message: string) => any;
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
            <div className="message-area h-screen">
                  <div className="community-header">
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

                  <div className="messages-container overflow-y-auto h-[calc(100vh-150px)] px-4">
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
      );
};

const AudioPlayer = ({ audioUrl }: { audioUrl: string }) => {
      const audioRef = useRef<HTMLAudioElement>(null);
      const [isPlaying, setIsPlaying] = useState(false);
      const [currentTime, setCurrentTime] = useState(0);
      const [duration, setDuration] = useState(0);

      useEffect(() => {
            const audio = audioRef.current;
            if (!audio) return;

            const updateTime = () => setCurrentTime(audio.currentTime);
            const setAudioDuration = () => setDuration(audio.duration);

            audio.addEventListener('timeupdate', updateTime);
            audio.addEventListener('loadedmetadata', setAudioDuration);

            return () => {
                  audio.removeEventListener('timeupdate', updateTime);
                  audio.removeEventListener('loadedmetadata', setAudioDuration);
            };
      }, []);

      const togglePlayPause = () => {
            if (!audioRef.current) return;

            if (isPlaying) {
                  audioRef.current.pause();
            } else {
                  audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
      };

      const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (audioRef.current) {
                  audioRef.current.currentTime = Number(e.target.value);
                  setCurrentTime(Number(e.target.value));
            }
      };

      const formatTime = (time: number) => {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      };

      return (
            <div className="audio-player bg-gray-100 rounded-lg p-3 flex flex-col items-center mt-2 w-full max-w-md">
                  <audio ref={audioRef} src={audioUrl} preload="metadata" />

                  <button
                        onClick={togglePlayPause}
                        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                  >
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>

                  <input
                        type="range"
                        value={currentTime}
                        max={duration || 0}
                        onChange={handleSeek}
                        className="w-full mt-2"
                  />

                  <div className="flex justify-between w-full text-xs text-gray-600 mt-1">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                  </div>
            </div>
      );
};

export default ChatArea;

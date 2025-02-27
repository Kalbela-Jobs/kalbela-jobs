"use client";
import React, { useState } from 'react';
import { Avatar } from '@radix-ui/react-avatar';
import '../message/style/chat.css';
import '../message/style/messenger.css';
import '../message/style/sidebar.css';

interface User {
      user_id: string;
      fullName: string;
      profile_picture?: string;
      lastMessage?: string;
      lastMessageTime?: string;
}

interface SidebarProps {
      users: User[];
      onSelectUser: (user: User) => void;
      selectedUser: User | null;
}

function Sidebar({ users, onSelectUser, selectedUser }: SidebarProps) {
      const [searchQuery, setSearchQuery] = useState('');
      const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'groups' | 'archived'>('all');

      const filteredUsers = users.filter((user) =>
            user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user?.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase())
      );

      return (
            <div className="sidebar-container text-white p-4">
                  <div className="message-header mb-4">
                        <h1 className="message-count text-lg font-semibold">Messages ({users.length})</h1>
                        <div className="flex space-x-2 py-2">
                              {['all', 'unread', 'groups', 'archived'].map((filter) => (
                                    <button
                                          key={filter}
                                          className={`px-3 py-1 rounded-full text-sm ${activeFilter === filter ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                                                }`}
                                          onClick={() => setActiveFilter(filter as 'all' | 'unread' | 'groups' | 'archived')}
                                    >
                                          {filter.charAt(0).toUpperCase() + filter.slice(1)}
                                    </button>
                              ))}
                        </div>
                        <input
                              type="text"
                              placeholder="Search messages..."
                              className="search-bar w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                        />
                  </div>

                  <div className="chat-list space-y-3 overflow-y-auto max-h-[calc(100vh-200px)]">
                        {filteredUsers.length > 0 ? (
                              filteredUsers.map((user) => {
                                    const isSelected = selectedUser?.user_id === user.user_id;
                                    const hasHTML = /<[^>]+>/.test(user.lastMessage ?? '');

                                    return (
                                          <div
                                                key={user.user_id}
                                                className={`chat-item flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors duration-200 ${isSelected ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                                                      }`}
                                                onClick={() => onSelectUser(user)}
                                          >
                                                <Avatar className="w-12 h-12 rounded-full overflow-hidden">
                                                      {user.profile_picture ? (
                                                            <img src={user.profile_picture} alt={user.fullName} className="w-full h-full object-cover" />
                                                      ) : (
                                                            <div className="flex items-center justify-center w-full h-full bg-gray-400 text-white text-lg font-bold">
                                                                  {user.fullName.charAt(0)}
                                                            </div>
                                                      )}
                                                </Avatar>

                                                <div className="chat-item-content flex-1">
                                                      <div className="chat-item-header flex justify-between items-center">
                                                            <span className="chat-name font-medium truncate group-hover:text-black">
                                                                  {user.fullName}
                                                            </span>
                                                            {user.lastMessageTime && (
                                                                  <span className="chat-time text-sm text-gray-500">
                                                                        {new Date(user.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                                  </span>
                                                            )}
                                                      </div>
                                                      <div className="chat-preview text-sm text-gray-600 truncate">
                                                            {user.lastMessage ? (
                                                                  hasHTML ? (
                                                                        <span dangerouslySetInnerHTML={{ __html: user.lastMessage }} />
                                                                  ) : (
                                                                        user.lastMessage.split(' ').slice(0, 10).join(' ')
                                                                  )
                                                            ) : (
                                                                  <em className="text-gray-400">No messages yet</em>
                                                            )}
                                                      </div>
                                                </div>
                                          </div>
                                    );
                              })
                        ) : (
                              <div className="text-center text-gray-500 py-6">No users found.</div>
                        )}
                  </div>
            </div>
      );
}

export default Sidebar;

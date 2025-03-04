import { User } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface ChatUserListProps {
    user: any;
    isSelected: any;
    hasHTML: any;
    onSelectUser: any
}

const ChatUserList: React.FC<ChatUserListProps> = ({ user, isSelected, hasHTML, onSelectUser }) => {
    console.log('user......', user);
    return (
        <li
            onClick={() => onSelectUser(user)}
            className={`${isSelected ? ' bg-gray-100' : ''} flex items-center gap-2 w-full mb-2 py-1 px-2 cursor-pointer hover:bg-gray-100 duration-300 rounded-md`}>
            {
                user?.profile_picture ? <Image
                    src={user?.profile_picture}
                    width={300}
                    height={300}
                    alt={'user'}
                    className='w-14 h-14 uppercase  rounded-full border object-cover'
                /> : <div className='w-14 h-14 uppercase  rounded-full border border-gray-300 object-cover bg-gray-200 flex items-center justify-center'>
                    <User size={30} />
                </div>
            }
            <div className="">
                <h4 className="text-lg font-semibold">{user?.fullName}  </h4>
                <div className="flex items-center w-full text-md justify-between">
                    {/* <p className="text-gray-500">Send a audio message</p> -
                    <p className="text-gray-500 ">11:02</p> */}

                    {user?.lastMessageTime && (
                        <span className="chat-time text-sm text-gray-500">
                            {new Date(user.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    )}
                </div>
            </div>
        </li>
    );
};

export default ChatUserList;
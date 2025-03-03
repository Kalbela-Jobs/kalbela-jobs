import Image from 'next/image';
import React from 'react';

const ChatUserList = () => {
    return (
        <li className="flex items-center gap-2 w-full mb-2 ">
            <Image
                src={'https://yt3.googleusercontent.com/DdtUl06VkqvZvr9aDFP6iX-qxWxV5Aqlk1d4mTUdD1E34wwX333DKo56iJiSJ3hojEeeW_kVzEc=s900-c-k-c0x00ffffff-no-rj'}
                className='w-12 h-12 rounded-full p-1 border border-[#2b323b] '
                width={300}
                height={300}
                alt={'user'}
            />
            <div className="">
                <h4 className="text-lg font-semibold">Nahid</h4>
                <div className="flex items-center w-full text-md justify-between">
                    <p className="text-gray-500">Send a audio message</p> -
                    <p className="text-gray-500 ">11:02</p>
                </div>
            </div>
        </li>
    );
};

export default ChatUserList;
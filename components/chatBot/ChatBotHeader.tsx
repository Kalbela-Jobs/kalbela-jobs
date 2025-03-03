import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import { Video } from 'lucide-react';
import Link from 'next/link';

const ChatBotHeader: React.FC = () => {
    return (
        <div className='bg-[white] h-[60px] flex items-center justify-between px-4 border-b'>
            <Link href="#">
                <div className="flex items-center uppercase gap-2">
                    <Image
                        className='rounded-full w-10 h-10 border p-1'
                        src="https://yt3.googleusercontent.com/DdtUl06VkqvZvr9aDFP6iX-qxWxV5Aqlk1d4mTUdD1E34wwX333DKo56iJiSJ3hojEeeW_kVzEc=s900-c-k-c0x00ffffff-no-rj" alt="logo" width={40} height={40} />
                    <h4 className=' text-sm '>ChatBot</h4>
                </div>

            </Link>
            <button className='w-10 h-10 flex items-center justify-center duration-300 !bg-[#1b2432] hover:!bg-[#263347] !rounded-full'>
                <Video strokeWidth={0.9} />
            </button>
        </div>
    );
};

export default ChatBotHeader;
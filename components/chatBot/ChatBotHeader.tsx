import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import { ChevronLeftIcon, Menu, Video } from 'lucide-react';
import Link from 'next/link';
import { X } from 'lucide-react';

interface ChatBotAreaType {
    open: boolean,
    modalClose: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    setModalClose: React.Dispatch<React.SetStateAction<boolean>>
}

const ChatBotHeader: React.FC<ChatBotAreaType> = ({ open, setOpen, modalClose, setModalClose }) => {
    return (
        <div className='bg-[white] h-[68px] flex items-center justify-between px-4 border-b'>
            <div className="flex items-center gap-1">
                {
                    !open
                        ? ''
                        : <button
                            className='bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center'
                            onClick={() => setOpen(false)} ><Menu /></button>
                }

                <button
                    className='bg-gray-200 w-8 h-8 rounded-full md:hidden flex items-center justify-center'
                    onClick={() => setOpen(true)} ><Menu /></button>
                <Link href="#">
                    <div className="flex items-center uppercase gap-2">
                        <Image
                            className='rounded-full w-10 h-10 border p-1'
                            src="https://yt3.googleusercontent.com/DdtUl06VkqvZvr9aDFP6iX-qxWxV5Aqlk1d4mTUdD1E34wwX333DKo56iJiSJ3hojEeeW_kVzEc=s900-c-k-c0x00ffffff-no-rj" alt="logo" width={40} height={40} />
                        <h4 className=' text-sm '>ChatBot</h4>
                    </div>

                </Link>
            </div>
            <div className="flex items-center gap-2">
                <button className='w-10 h-10 flex items-center justify-center duration-300 !text-[#1b2432] hover:!bg-[#c2c6cb] bg-[#e8e5e5] !rounded-full'>
                    <Video size={"26"} strokeWidth={0.9} />
                </button>

                <button onClick={() => setModalClose(!modalClose)} className='w-10 h-10 flex items-center justify-center duration-300 !text-[#1b2432] hover:!bg-[#c2c6cb] bg-[#e8e5e5] !rounded-full'><X /></button>
            </div>
        </div>
    );
};

export default ChatBotHeader;
import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import { ChevronLeftIcon, Menu, User, Video } from 'lucide-react';
import Link from 'next/link';
import { X } from 'lucide-react';

interface ChatBotAreaType {
    open: boolean,
    modalClose: boolean,
    candidate: any,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    setModalClose: React.Dispatch<React.SetStateAction<boolean>>
}

const ChatBotHeader: React.FC<ChatBotAreaType> = ({ open, setOpen, modalClose, setModalClose, candidate }) => {
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
                        {
                            candidate?.profile_picture ? <Image
                                src={candidate?.profile_picture}
                                width={300}
                                height={300}
                                alt={'user'}
                                className='w-10 h-10 uppercase  rounded-full border object-cover'
                            /> : <div className='w-10 h-10 uppercase  rounded-full border border-gray-300 object-cover bg-gray-200 flex items-center justify-center'>
                                <User strokeWidth={1} size={30} />
                            </div>
                        }
                        <div className="">
                            <h4 className=' text-sm  font-semibold'>{candidate?.fullName}</h4>
                            <div className="community-status text-xs text-green-500">Active now</div>
                        </div>
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
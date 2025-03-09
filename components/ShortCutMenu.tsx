'use client'

import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Home, LayoutDashboardIcon } from 'lucide-react';
import Image from 'next/image';

const ShortCutMenu = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <button className='group ml-3 mt-[10px] inline-flex h-10 w-10 flex-col items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 dark:text-black'>
            <LayoutDashboardIcon />
        </button>;
    }

    const shortcuts = [
        { icon: '/icons/icn2.png', label: 'Find job' },
        { icon: '/icons/icn1.png', label: 'Job' },
        { icon: '/icons/icn3.png', label: 'IT Job' },
        { icon: '/icons/icn2.png', label: 'Find job' },
        { icon: '/icons/icn1.png', label: 'Job' },
        { icon: '/icons/icn3.png', label: 'IT Job' },
        { icon: '/icons/icn2.png', label: 'Find job' },
        { icon: '/icons/icn1.png', label: 'Job' },
        { icon: '/icons/icn3.png', label: 'IT Job' },
        { icon: '/icons/icn2.png', label: 'Find job' },
        { icon: '/icons/icn1.png', label: 'Job' },
        { icon: '/icons/icn3.png', label: 'IT Job' },
        { icon: '/icons/icn2.png', label: 'Find job' },
        { icon: '/icons/icn1.png', label: 'Job' },
        { icon: '/icons/icn3.png', label: 'IT Job' },
        { icon: '/icons/icn2.png', label: 'Find job' },
        { icon: '/icons/icn1.png', label: 'Job' },
        { icon: '/icons/icn3.png', label: 'IT Job' },
        { icon: '/icons/icn2.png', label: 'Find job' },
        { icon: '/icons/icn1.png', label: 'Job' },
        { icon: '/icons/icn3.png', label: 'IT Job' },
        { icon: '/icons/icn2.png', label: 'Find job' },
        { icon: '/icons/icn1.png', label: 'Job' },
        { icon: '/icons/icn3.png', label: 'IT Job' },
        { icon: '/icons/icn2.png', label: 'Find job' },
        { icon: '/icons/icn1.png', label: 'Job' },
        { icon: '/icons/icn3.png', label: 'IT Job' },
        { icon: '/icons/icn2.png', label: 'Find job' },
        { icon: '/icons/icn1.png', label: 'Job' },
        { icon: '/icons/icn3.png', label: 'IT Job' },
        { icon: '/icons/icn2.png', label: 'Find job' },
        { icon: '/icons/icn1.png', label: 'Job' },
        { icon: '/icons/icn3.png', label: 'IT Job' },
        { icon: '/icons/icn2.png', label: 'Find job' },
        { icon: '/icons/icn1.png', label: 'Job' },
        { icon: '/icons/icn3.png', label: 'IT Job' },
        { icon: '/icons/icn2.png', label: 'Find job' },
        { icon: '/icons/icn1.png', label: 'Job' },
        { icon: '/icons/icn3.png', label: 'IT Job' },
        { icon: '/icons/icn2.png', label: 'Find job' },
        { icon: '/icons/icn1.png', label: 'Job' },
        { icon: '/icons/icn3.png', label: 'IT Job' },
    ];

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <div className="flex items-center justify-center mt-[10px]">
                        <button>
                            <div
                                data-tooltip-target="tooltip-wallet"
                                className={cn(
                                    "group inline-flex h-10 w-10 flex-col items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 dark:text-black",
                                )}
                            >
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <LayoutDashboardIcon className="h-5 w-5" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Dashboard</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </button>
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] ">
                    <div className="px-2 font-semibold text-xl font-mono">
                        Shortcut
                    </div>
                    <div className="grid grid-cols-4 gap-4 mt-2 !max-h-full overflow-y-auto h-[70vh]">
                        {
                            shortcuts?.map((itm, index) => <div
                                key={index}
                                className='flex p-1 rounded flex-col items-center justify-center gap-1 border'
                            >
                                <div>
                                    <Image
                                        src={itm?.icon}
                                        width={100}
                                        height={100}
                                        alt='icon'
                                        className='w-7'
                                    />
                                </div>
                                <p className="text-xs text-center">{itm?.label}</p>
                            </div>)
                        }

                    </div>
                    
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ShortCutMenu;

'use client';
import { useUserData } from '@/utils/encript_decript';
import { log } from 'console';
import React from 'react';

const DashboardInfo: React.FC = () => {
    const [user] = useUserData();
    console.log("---->", user);

    return (
        <div className=' mt-3 mb-2 '>
            <div className="">
                <h3 className="text-xl pb-2 font-semibold">Basic Information</h3>
                <hr />
                <ul className='mt-2'>
                    <li className="flex items-center gap-2">
                        <span className='font-semibold'>Full Name : </span> {user?.fullName}
                    </li>
                    <li className="flex items-center gap-2">
                        <span className='font-semibold'>Full Name : </span> {user?.fullName}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardInfo;
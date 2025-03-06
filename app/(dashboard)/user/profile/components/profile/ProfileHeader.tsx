import { Mail, Phone } from 'lucide-react';
import { Home } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface ProfileHeaderProps {
    user: any
}
const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
    return (
        <header className='md:flex gap-4'>
            <div >
                <div className="border border-gray-200 rounded-full object-scale-down w-[120px] h-[120px] overflow-hidden md:m-auto m-auto">
                    <Image
                        src={user?.profile_picture}
                        alt="Profile Picture"
                        width={500}
                        height={500}
                        className="w-full h-full rounded-full"
                    />
                </div>
            </div>
            <div className="mt-2 lg:w-[400px]">
                <h2 className="text-2xl md:text-start text-center capitalize font-semibold">
                    {user?.fullName}
                </h2>
                <div className="mt-2 flex md:justify-start justify-center text-gray-500 text-sm flex-wrap gap-2">
                    {user?.address?.permanentCity && <div className="flex items-center gap-1">
                        <Home size={20} strokeWidth={1.2} /> <p>{user?.address?.permanentCity?.label}- {user?.address?.permanentCountry?.label}</p>
                    </div>}

                    {user?.
                        emergencyPhone && <a href='#' className="flex  duration-200 hover:text-blue-800 items-center gap-1">
                            <Phone size={20} strokeWidth={1.2} /> <p>{user?.
                                emergencyPhone
                            }</p>
                        </a>}

                    {user?.email && <a href={`${user?.email}`} className="flex duration-200 hover:text-blue-800  items-center gap-1">
                        <Mail size={20} strokeWidth={1.2} /> <p>{user?.email}</p>
                    </a>}
                </div>
            </div>
        </header>
    );
};

export default ProfileHeader;
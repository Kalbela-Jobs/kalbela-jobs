import React from 'react';
import Image from 'next/image';

interface ProfileCirtificationProps {
    user: any
}
const ProfileCitification: React.FC<ProfileCirtificationProps> = ({ user }) => {
    return (
        <figure className='mt-8 pb-4 rounded-xl relative md:mt-6 border'>
            <h1 className="text-xl px-4 py-3 capitalize font-semibold border-b">
                📑 Certification
            </h1>

            <ul className="px-4 grid grid-cols-2 gap-2 py-2">
                {user?.
                    certifications.length > 0 ?
                    user?.
                        certifications?.map((itm: any, index: number) => (
                            <li className='p-2 hover:border-blue-900 duration-300 shadow-xl rounded border relative' key={itm?._id}>
                                <a href="#" target='_blank'>
                                    <Image
                                        className='h-[]'
                                        src={'https://d2vyhi5ouo1we3.cloudfront.net/force_jpg/aHR0cHM6Ly9pbWFnZXMuYmFubmVyYmVhci5jb20vcmVxdWVzdHMvaW1hZ2VzLzAwOC85MjQvNTc5L29yaWdpbmFsL2VhYzQyY2FiZjM5YzIxY2Y4NThlNWY4NDRlZmM0YTA1MjJmOGUxNzkucG5nPzE2MzI4MDgzMDI=/image.jpg'} alt={itm?.title} width={400} height={400} />

                                    <h2 className="md:text-md text-sm font-semibold mt-2"> {itm?.name.slice(0, 40)} </h2>
                                    <h2 className="md:text-sm text-xs text-gray-500 "> {itm?.year} </h2>
                                </a>
                            </li>
                        ))
                    : <div className='text-center py-6'>Citification Not Found</div>
                }
            </ul>

        </figure>
    );
};

export default ProfileCitification;
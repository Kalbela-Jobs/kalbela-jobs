import React from 'react';
import Experience from '../Experience';

interface ProfileExperienceProps {
    user: any
}
const ProfileExperience: React.FC<ProfileExperienceProps> = ({ user }) => {
    return (
        <figure className='mt-8 pb-4 rounded-xl relative md:mt-6 border'>
            <h1 className="text-xl px-4 py-3 capitalize font-semibold border-b">
                💼 My Experience
            </h1>

            <ul className="px-4 py-2">
                {user?.experience.length > 0 ?
                    user?.experience?.map((itm: any, index: number) => (
                        <li className='px-4 relative' key={itm?._id}>
                            <div className="flex gap-2 relative">
                                <div className="">
                                    <div className="bg-[#425caf3b] text-3xl font-semibold text-[#001968] w-16 h-16 rounded flex items-center justify-center">E</div>
                                </div>
                                <div className="">
                                    <h2 className="text-md font-semibold "> {itm?.title} </h2>
                                    <h3 className="text-gray-800">
                                        <span className=" text-sm">{itm?.companyName} || {itm?.employmentType}</span>
                                    </h3>
                                    <p className="text-gray-500 text-sm">
                                        <span className="">{itm?.location} || {itm?.startDate?.month} {itm?.startDate?.year} - {itm?.endDate?.month} {itm?.endDate?.year}</span>
                                    </p>

                                </div>
                            </div>

                            <p className="text-gray-500 mt-2 text-sm ">
                                {itm?.description}
                            </p>
                        </li>
                    ))
                    : <div className='text-center py-6'>Experience Not Found</div>
                }
            </ul>

        </figure>
    );
};

export default ProfileExperience;
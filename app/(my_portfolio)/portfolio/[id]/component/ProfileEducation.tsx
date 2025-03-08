import Image from 'next/image';
import React from 'react';

interface ProfileEducationProps {
    user: any
}
const ProfileEducation: React.FC<ProfileEducationProps> = ({ user }) => {
    return (
        <figure className='mt-8 pb-4 rounded-xl relative md:mt-6 border'>
            <h1 className="text-xl px-4 py-3 capitalize font-semibold border-b">
                👨‍🎓 My Education

            </h1>
            <ul className="space-y-2 px-4 py-2 mt-2">
                {
                    user?.education?.map((education: any, index: number) => <li key={education?._id} className="flex gap-4 mb-3">
                        <div className="flex text-[#2f486c] w-[70px] h-[70px] rounded-xl bg-[#c3c7cc4b] items-center justify-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={40}
                                height={40}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1.3}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-university"
                            >
                                <circle cx={12} cy={10} r={1} />
                                <path d="M22 20V8h-4l-6-4-6 4H2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2" />
                                <path d="M6 17v.01" />
                                <path d="M6 13v.01" />
                                <path d="M18 17v.01" />
                                <path d="M18 13v.01" />
                                <path d="M14 22v-5a2 2 0 0 0-2-2a2 2 0 0 0-2 2v5" />
                            </svg>

                        </div>

                        <div className="">
                            <h3 className="text-md font-semibold">{education?.universityName}</h3>
                            <p className="text-sm capitalize text-gray-500">
                                {education?.degree}
                            </p>
                            <p className="text-sm text-gray-500">
                                Passing Year : {education?.graduationYear}
                            </p>
                        </div>
                    </li>
                    )}
            </ul>
        </figure>
    );
};

export default ProfileEducation;
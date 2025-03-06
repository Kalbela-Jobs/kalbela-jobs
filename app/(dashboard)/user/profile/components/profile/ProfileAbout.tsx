import React from 'react';

interface ProfileAboutProps {
    user: any
}
const ProfileAbout: React.FC<ProfileAboutProps> = ({ user }) => {
    return (
        <figure className='mt-8 pb-4 rounded-xl relative md:mt-6 border'>
            <h1 className="text-xl px-4 py-3 capitalize font-semibold border-b">
                👨‍💼 About
            </h1>

            <h1 className="text- capitalize px-4 font-semibold mt-3">
                {user?.title}
            </h1>
            <p className='!text-gray-500 px-4' dangerouslySetInnerHTML={{ __html: user?.description }} />
        </figure>
    );
};

export default ProfileAbout;


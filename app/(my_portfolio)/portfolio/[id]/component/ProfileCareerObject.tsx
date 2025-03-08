import React from 'react';

interface ProfileCareerObjectProps {
    user: any
}
const ProfileCareerObject: React.FC<ProfileCareerObjectProps> = ({ user }) => {
    return (
        <figure className='mt-8 pb-4 rounded-xl relative md:mt-6 border'>
            <h1 className="text-xl px-4 py-3 capitalize font-semibold border-b">
                👩‍💻 Career Objective

            </h1>
            <p className='!text-gray-500 px-4 py-2' dangerouslySetInnerHTML={{ __html: user?.career_objective }} />
        </figure>
    );
};

export default ProfileCareerObject;
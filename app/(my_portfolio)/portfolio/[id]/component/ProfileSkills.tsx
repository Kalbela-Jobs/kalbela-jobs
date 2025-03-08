import React from 'react';

interface ProfileSkillProps {
    user: any
}
const ProfileSkill: React.FC<ProfileSkillProps> = ({ user }) => {
    const skills = user?.skills?.skills
    return (
        <figure className='mt-8 pb-4 rounded-xl relative md:mt-6 border'>
            <h1 className="text-xl px-4 py-3 capitalize font-semibold border-b">
                💡 My Skills
            </h1>

            <ul className="px-4 py-2">
                {skills.length > 0 ?
                    skills?.map((skill: string) => (
                        <li className='px-4 relative' key={skill}> <div className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full w-2 h-2 bg-[#2f486c]" />{skill}</li>
                    ))
                    : <div className='text-center py-6'>Skill Not Found</div>
                }
            </ul>

        </figure>
    );
};

export default ProfileSkill;
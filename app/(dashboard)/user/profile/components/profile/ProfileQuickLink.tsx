import { Facebook, Github, Home, Link, Linkedin } from 'lucide-react';
import React from 'react';

interface ProfileQuickLinkProps {
    user: any
}
const ProfileQuickLink: React.FC<ProfileQuickLinkProps> = ({ user }) => {
    return (
        <div>
            <div className="border rounded-xl p-6">
                <h3 className="text-lg font-semibold">Quick Links</h3>
                <ul className='text-gray-700 mt-3'>


                    <li className='flex items-center duration-300 hover:text-blue-800 gap-1 mb-2'>
                        <Facebook strokeWidth={1.2} size={20} />
                        <a href={'#'}>http://localhost:3000/user</a>
                    </li>
                    <li className='flex items-center duration-300 hover:text-blue-800 gap-1 mb-2'>
                        <Linkedin strokeWidth={1.2} size={20} />
                        <a href={'#'}>nahid360s/43jhsd/sfasdoijf</a>
                    </li>
                    <li className='flex items-center duration-300 hover:text-blue-800 gap-1 mb-2'>
                        <Github strokeWidth={1.2} size={20} />
                        <a href={'#'}>nahid360s/43jhsd/sfasdoijf</a>
                    </li>
                </ul>
            </div>
        </div>);
};

export default ProfileQuickLink;
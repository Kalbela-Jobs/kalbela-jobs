'use client';
import { decryptId } from '@/utils/encriptDecriptGenarator';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Facebook, Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
import ProfileHeader from './component/ProfileHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileCareerObject from './component/ProfileCareerObject';
import ProfileAbout from './component/ProfileAbout';
import ProfileEducation from './component/ProfileEducation';
import ProfileAddress from './component/ProfileAddress';
import ProfileSkill from './component/ProfileSkills';
import ProfileExperience from './component/ProfileExperience';
import ProfileCitification from './component/ProfileCertifications';
import ProfileQuickLink from './component/ProfileQuickLink';

interface ShareProfilePageProps {
    params: {
        id: string
    }
}

const ShareProfilePage: React.FC<ShareProfilePageProps> = ({ params: { id } }) => {
    const decryptedId = decryptId(decodeURIComponent(id));
    const [userData, setUserData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${process.env.NEXT_APP_BASE_URL}/api/v1/user/user-profile?user_id=${decryptedId}`);
                setUserData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, [decryptedId]);

    const user = userData?.data;

    console.log(user, 'user...');

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-600">Error: {error.message}</p>}


            {!loading && !error && (
                <main className='w-full  md:p-8 relative'>
                    <div className="grid lg:grid-cols-3 gap-4">
                        <div className="col-span-2">
                            <ProfileHeader user={user} />
                            <Tabs className="mt-5" defaultValue="overview">
                                <TabsList className="flex justify-start space-x-2 p-0 border-b !rounded-none border-gray-300 !bg-transparent">
                                    <TabsTrigger value="overview" className="px-4 py-2 !rounded-t-lg !rounded-b-[2px] data-[state=active]:bg-primary_blue data-[state=active]:text-white text-primary_blue">
                                        Overview
                                    </TabsTrigger>
                                    <TabsTrigger value="personal" className="px-4 py-2 !rounded-t-lg !rounded-b-[2px] data-[state=active]:bg-primary_blue data-[state=active]:text-white text-primary_blue">
                                        Personal Info
                                    </TabsTrigger>
                                    <TabsTrigger value="others" className="px-4 py-2 !rounded-t-lg !rounded-b-[2px] data-[state=active]:bg-primary_blue data-[state=active]:text-white text-primary_blue">
                                        Others
                                    </TabsTrigger>
                                </TabsList>

                                {/* tab content */}
                                <TabsContent value="overview" className='space-y-4'>
                                    <div className="space-y-4">
                                        <ProfileCareerObject user={user} />
                                        <ProfileAbout user={user} />
                                        <ProfileEducation user={user} />
                                    </div>
                                </TabsContent>
                                <TabsContent value="personal">
                                    <div className="p-4 space-y-1">
                                        <h2 className="text-lg font-semibold mb-2">🙋‍♂️ Personal Information</h2>
                                        <div className="flex items-center ">
                                            <span className="mr-2">Email :</span>
                                            <span>{user?.email}</span>
                                        </div>
                                        <div className="flex items-center ">
                                            <span className="mr-2">Phone :</span>
                                            <span>{user?.emergencyPhone}</span>
                                        </div>
                                        <div className="flex items-center ">
                                            <span className="mr-2">Blood Group :</span>
                                            <span className='text-red-500 font-semibold'>{user?.bloodGroup}</span>
                                        </div>
                                    </div>
                                    <ProfileAddress user={user} />
                                </TabsContent>
                                <TabsContent value="others">
                                    <ProfileSkill user={user} />
                                    <ProfileExperience user={user} />
                                    <ProfileCitification user={user} />
                                </TabsContent>
                            </Tabs>
                        </div>
                        <div className="">
                            <ProfileQuickLink user={user} />
                        </div>
                    </div>
                </main>
            )}
        </div>
    );
};

export default ShareProfilePage;

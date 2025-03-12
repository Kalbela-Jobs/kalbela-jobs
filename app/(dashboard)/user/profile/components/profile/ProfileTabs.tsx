'use client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserData } from '@/utils/encript_decript';
import { useQuery } from '@tanstack/react-query';
import { Contact, Mail, MapPin, Pencil, Star, User } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import CareerObjective from '../CareerObjective';
import EmergencyContact from '../EmergencyContact';
import Resume from '../Resume';
import BasicInfoTabsContent from './BasicInfoContent';
import EducationTabContent from './EducationTabContent';
import ProfileAddressUpload from './ProfileAddressUpload';
import ProfileJobPreferenceUpload from './ProfileJobPreferentUpload';
import ProfilePersonalDetails from './ProfilePersonalDetails';

const ProfileTabs: React.FC = () => {
    const [user, setUserData] = useUserData()
    const [editDetailsOpen, setEditDetailsOpen] = useState(false)
    const [editNameOpen, setEditNameOpen] = useState(false)
    const [editImageOpen, setEditImageOpen] = useState(false)
    const [editLanguagesOpen, setEditLanguagesOpen] = useState(false)
    const [image, setImage] = useState(null)
    const [image_file, setImageFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error_message, set_error_message] = useState("")
    const [name, setName] = useState(user?.fullName)
    const [languages, setLanguages] = useState(user?.languages || [])
    const [new_language, setNewLanguage] = useState(user?.languages)
    const [editContactOpen, setEditContactOpen] = useState(false)
    const [phone, setPhone] = useState<any>(user?.phone)
    const [email, setEmail] = useState(user?.email)

    const router = useRouter();


    const [completion, setCompletion] = useState(30)
    const showStar = completion === 100

    const {
        data: certificationsData = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["certificationsData", user?._id],
        queryFn: async () => {
            if (!user?._id) return []
            const res = await fetch(
                `${process.env.NEXT_APP_BASE_URL}/api/v1/user/get-certification?user_id=${user._id}`
            )

            if (!res.ok) {
                throw new Error("Failed to fetch certifications")
            }

            const data = await res.json()
            return data.data
        },
        enabled: !!user?._id,
    });;

    const { data: educations = [] } = useQuery({
        queryKey: ["educations_data", user?._id],
        queryFn: async () => {
            if (!user?._id) return []
            const res = await fetch(
                `${process.env.NEXT_APP_BASE_URL}/api/v1/user/get-education?user_id=${user._id}`
            )

            if (!res.ok) {
                throw new Error("Failed to fetch education data")
            }

            const data = await res.json()
            return data.data
        },
        enabled: !!user?._id,
    });

    useEffect(() => {
        let completion = 0
        if (user?.fullName?.length) completion += 8
        if (user?.email) completion += 8
        if (user?.phone_number?.length > 5) completion += 8
        if (user?.profile_picture) completion += 8
        if (user?.languages?.length) completion += 8
        if (user?.title?.length > 1) completion += 8
        if (user?.description?.length > 4) completion += 8
        if (user?.date_of_birth) completion += 8
        if (user?.gender) completion += 8
        if (user?.career_objective?.length > 4) completion += 8
        if (educations.length) completion += 8
        if (certificationsData.length) completion += 8
        setCompletion(completion)
    }, [
        user?.title,
        user?.description,
        user?.fullName,
        user?.email,
        user?.phone_number,
        user?.profile_picture,
        user?.languages,
        user?.date_of_birth,
        user?.gender,
        user?.career_objective,
        educations,
        certificationsData
    ])

    const [activeTab, setActiveTab] = useState("basic_info");

    useEffect(() => {
        // Set the default active tab when the component mounts
        setActiveTab("basic_info");
    }, []);

    return (
        <div>
            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="mb-4">
                <TabsList className="flex justify-start space-x-2 p-0 border-b !rounded-none border-gray-300 !bg-transparent overflow-x-auto">
                    <TabsTrigger value="basic_info" className="px-4 py-2 !rounded-t-lg !rounded-b-[2px] data-[state=active]:bg-primary_blue data-[state=active]:text-white text-primary_blue whitespace-nowrap">
                        Basic info
                    </TabsTrigger>
                    <TabsTrigger value="educational_info" className="px-4 py-2 !rounded-t-lg !rounded-b-[2px] data-[state=active]:bg-primary_blue data-[state=active]:text-white text-primary_blue whitespace-nowrap">
                        Educational info
                    </TabsTrigger>
                    <TabsTrigger value="other_info" className="px-4 py-2 !rounded-t-lg !rounded-b-[2px] data-[state=active]:bg-primary_blue data-[state=active]:text-white text-primary_blue whitespace-nowrap">
                        Others Info
                    </TabsTrigger>
                    <TabsTrigger value="attachment_info" className="px-4 py-2 !rounded-t-lg !rounded-b-[2px] data-[state=active]:bg-primary_blue data-[state=active]:text-white text-primary_blue whitespace-nowrap">
                        Attachment info
                    </TabsTrigger>
                </TabsList>

                {/* tab content */}
                <TabsContent value="basic_info">
                    <BasicInfoTabsContent
                        user={user}
                        educations={educations}
                        certificationsData={certificationsData}
                        setEditImageOpen={setEditImageOpen}
                        setEditNameOpen={setEditNameOpen}
                        setEditContactOpen={setEditContactOpen}
                        setEditLanguagesOpen={setEditLanguagesOpen}
                    />
                </TabsContent>

                <TabsContent value="educational_info">
                    <EducationTabContent />
                </TabsContent>

                <TabsContent value="other_info">
                    <EmergencyContact />
                </TabsContent>

            </Tabs>

        </div>
    );
};

export default ProfileTabs;
import React, { useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { Contact, Mail, MapPin, Pencil, Star, User } from 'lucide-react';
import Image from 'next/image';
import CareerObjective from '../CareerObjective';
import Resume from '../Resume';
import ProfileAddressUpload from './ProfileAddressUpload';
import ProfileJobPreferenceUpload from './ProfileJobPreferentUpload';
import ProfilePersonalDetails from './ProfilePersonalDetails';

const UserTabsContent: React.FC<{ user: any, educations: any[], certificationsData: any[], setEditImageOpen: (open: boolean) => void, setEditNameOpen: (open: boolean) => void, setEditContactOpen: (open: boolean) => void, setEditLanguagesOpen: (open: boolean) => void }> = ({ user, educations, certificationsData, setEditImageOpen, setEditNameOpen, setEditContactOpen, setEditLanguagesOpen }) => {
    const [completion, setCompletion] = useState(30);
    const showStar = completion === 100;

    useEffect(() => {
        let completion = 0;
        if (user?.fullName?.length) completion += 8;
        if (user?.email) completion += 8;
        if (user?.phone_number?.length > 5) completion += 8;
        if (user?.profile_picture) completion += 8;
        if (user?.languages?.length) completion += 8;
        if (user?.title?.length > 1) completion += 8;
        if (user?.description?.length > 4) completion += 8;
        if (user?.date_of_birth) completion += 8;
        if (user?.gender) completion += 8;
        if (user?.career_objective?.length > 4) completion += 8;
        if (educations.length) completion += 8;
        if (certificationsData.length) completion += 8;
        setCompletion(completion);
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
    ]);

    return (
        <div className="space-y-4">
            <div className="mt-4 ">
                {user ? (
                    <div className="flex md:flex-row flex-col justify-start  gap-4">
                        <div className="relative">
                            <div
                                className="group relative flex size-20 cursor-pointer items-center justify-center rounded-full"
                                onClick={() => setEditImageOpen(true)}
                            >
                                {/* Profile Image */}
                                <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-primary">
                                    {user?.profile_picture ? (
                                        <Image
                                            src={user?.profile_picture || "/placeholder.svg"}
                                            alt="Profile Picture"
                                            fill
                                            className="object-scale-down "
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-primary text-3xl text-primary-foreground">
                                            {user?.fullName?.[0]?.toUpperCase() || "?"}
                                        </div>
                                    )}

                                    {/* Dark Overlay */}
                                    <div className="absolute inset-0 bg-black/30" />
                                </div>

                                {/* Progress Ring */}
                                <svg className="absolute inset-0 h-full w-full -rotate-90">
                                    <svg
                                        className="h-24 w-24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 96 96"
                                    >
                                        <defs>
                                            <linearGradient
                                                id="circleGradient"
                                                x1="0"
                                                y1="0"
                                                x2="1"
                                                y2="1"
                                            >
                                                <stop offset="0%" stopColor="#3b82f6" /> {/* Blue */}
                                                <stop offset="100%" stopColor="#8b5cf6" />{" "}
                                                {/* Purple */}
                                            </linearGradient>
                                        </defs>
                                        {/* Background Circle */}
                                        <circle
                                            className="text-white"
                                            strokeWidth="6"
                                            stroke="currentColor"
                                            fill="transparent"
                                            r="46"
                                            cx="48"
                                            cy="48"
                                        />
                                        {/* Progress Circle with Gradient */}
                                        <circle
                                            className="text-blue-500"
                                            strokeWidth="6"
                                            strokeDasharray={290}
                                            strokeDashoffset={290 - (290 * completion) / 100}
                                            strokeLinecap="round"
                                            stroke="url(#circleGradient)"
                                            fill="transparent"
                                            r="46"
                                            cx="48"
                                            cy="48"
                                        />
                                    </svg>
                                </svg>

                                {/* Star or Percentage */}
                                <div className="absolute -bottom-1 flex items-center justify-center rounded-3xl bg-gray-600 px-2 py-0.5 text-primary-foreground shadow-lg">
                                    {showStar ? (
                                        <Star className="h-4 w-4 fill-current text-[#4493F8]" />
                                    ) : (
                                        <span className="text-sm font-medium">{completion}%</span>
                                    )}
                                </div>

                                {/* Update text on hover */}
                                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 transition-opacity group-hover:opacity-100">
                                    <span className="text-sm font-medium text-white">
                                        Update
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <h1 className="text-2xl font-bold">
                                        {user?.fullName ? user?.fullName : "Update Your Name"}
                                    </h1>
                                    <Pencil
                                        onClick={() => setEditNameOpen(true)}
                                        className="h-4 w-4"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Contact className="h-4 w-4" />
                                    {user?.phone_number
                                        ? user?.phone_number
                                        : "Update Phone Number"}
                                </div>

                                <div className="flex items-center gap-1">

                                    <Mail className="h-4 w-4" />
                                    {user?.email ? user?.email : "Update Email"}
                                </div>
                                <Pencil
                                    onClick={() => setEditContactOpen(true)}
                                    className="h-4 w-4"
                                />
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    Bangladesh
                                </div>

                                <div className="flex flex-wrap items-center gap-1">
                                    <div className="flex size-1 items-center rounded-full bg-gray-500"></div>
                                    <span>
                                        {user?.languages?.length
                                            ? user?.languages?.join(", ")
                                            : "Update Languages"}
                                    </span>
                                    <Pencil
                                        onClick={() => setEditLanguagesOpen(true)}
                                        className="h-4 w-4"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-20 w-20 rounded-full" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-8 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>
                    </div>
                )}
            </div>

            {/* accordions */}
            <Accordion type="single" collapsible defaultValue="item-1" className="w-full">

                <AccordionItem className="border" value="item-1">
                    <AccordionTrigger className="bg-gray-50 px-4">
                        <h1 className="text-md flex items-end gap-2 !font-[500]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-briefcase-business"
                            >
                                <path d="M12 12h.01" />
                                <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                                <path d="M22 13a18.15 18.15 0 0 1-20 0" />
                                <rect width={20} height={14} x={2} y={6} rx={2} />
                            </svg>

                            Job Preference</h1>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 px-4 p-2">
                        <CareerObjective />
                        <Resume />

                        <ProfileJobPreferenceUpload />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem className="border" value="item-2">
                    <AccordionTrigger className="bg-gray-50 px-4">
                        <h1 className="text-md flex items-end gap-2 !font-[500]"><User strokeWidth={1} /> Personal Details</h1>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 px-4 pt-2">
                        <ProfilePersonalDetails />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem className="border" value="item-3">
                    <AccordionTrigger className="bg-gray-50 px-4">
                        <h1 className="text-md flex items-end gap-2 !font-[500]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-map-pin-house"
                            >
                                <path d="M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z" />
                                <path d="M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2" />
                                <path d="M18 22v-3" />
                                <circle cx={10} cy={10} r={3} />
                            </svg>

                            Address</h1>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 px-4 pt-2">
                        <ProfileAddressUpload />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>





        </div>
    );
};

export default UserTabsContent;
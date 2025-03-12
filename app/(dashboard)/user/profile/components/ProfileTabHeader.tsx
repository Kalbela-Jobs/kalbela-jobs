import { Skeleton } from '@/components/ui/skeleton';
import { Contact, Mail, MapPin, Pencil, Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface ProfileTabHeaderProps {
    user: {
        profile_picture?: string;
        fullName?: string;
        phone_number?: string;
        email?: string;
        languages?: string[];
    };
    setEditImageOpen: (open: boolean) => void;
    completion: number;
    showStar: boolean;
    setEditNameOpen: (open: boolean) => void;
    setEditContactOpen: (open: boolean) => void;
    setEditLanguagesOpen: (open: boolean) => void;
}

const ProfileTabHeader: React.FC<ProfileTabHeaderProps> = ({
    user,
    setEditImageOpen,
    completion,
    showStar,
    setEditNameOpen,
    setEditContactOpen,
    setEditLanguagesOpen
}) => {
    return (
        <div>
            <div className="mt-4">
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
        </div>
    );
};

export default ProfileTabHeader;
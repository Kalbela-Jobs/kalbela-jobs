import { TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import React from 'react';

const ProfileTabList = () => {
    return (
        <TabsList className="w-full justify-start p-0 h-auto bg-transparent border-b">
            <TabsTrigger
                value="home"
                className="px-6 py-3 tabs-trigger"
            >
                Home
            </TabsTrigger>
            <TabsTrigger
                value="education"
                className="px-6 py-3 tabs-trigger"
            >
                Education/Training
            </TabsTrigger>
            <TabsTrigger
                value="employment"
                className="px-6 py-3 tabs-trigger"
            >
                Employment
            </TabsTrigger>
            <TabsTrigger
                value="other"
                className="px-6 py-3 tabs-trigger"
            >
                Other Information
            </TabsTrigger>
            <TabsTrigger
                value="accomplishment"
                className="px-6 py-3 tabs-trigger"
            >
                Accomplishment
            </TabsTrigger>
        </TabsList>
    );
};

export default ProfileTabList;
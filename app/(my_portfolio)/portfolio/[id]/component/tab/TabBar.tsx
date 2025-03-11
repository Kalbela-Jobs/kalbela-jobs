import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';
import BasicInformation from './BasicInformation';
import Overview from './Overview';

const TabBar: React.FC = () => {
    return (
        <div>
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
                    <Overview />
                </TabsContent>
                <TabsContent value="overview" className='space-y-4'>
                    <BasicInformation />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default TabBar;
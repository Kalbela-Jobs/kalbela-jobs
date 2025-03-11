'use client';

import useApiRequest from "@/app/hooks/useApiRequest";
import { useUserData } from "@/utils/encript_decript";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import DisplayTabBox from "./DisplayTabBox";

const DisplayTab = () => {
    const [user] = useUserData();
    const [basicInfo, setBasicInfo] = useState<number | null | string>(0);

    const { data, loading, error } = useApiRequest<any>(
        "jobs/get-featured-jobs",
        "GET"
    )

    console.log('---->>>> data :: ', data);

    const {
        data: certificationsData = [],
        isLoading: isLoadingCertifications,
        error: errorCertifications,
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
    });

    const {
        data: educations = [],
        isLoading: isLoadingEducations,
        error: errorEducations,
    } = useQuery({
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
        setBasicInfo(completion);
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
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
            <DisplayTabBox
                title="Basic info"
                range={8}
                color="#493D9E"
                url="/user/profile?tab=basic_info"
            />
            <DisplayTabBox
                title="Educational info"
                range={90}
                color="#410445"
                url="/user/profile?tab=educational_info"
            />
            <DisplayTabBox
                title="Other's info"
                range={90}
                color="#1F7D53"
                url="/user/profile?tab=other_info"
            />
            <DisplayTabBox
                title="Attachment info"
                range={90}
                color="#AC1754"
                url="/user/profile?tab=attachment_info"
            />
        </div>
    );
};

export default DisplayTab;
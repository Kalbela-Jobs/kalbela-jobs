'use client';

import useApiRequest from '@/app/hooks/useApiRequest';
import { useUserData } from '@/utils/encript_decript';
import React, { useEffect } from 'react';
import DisplayCardItem from './DisplayCardItem';
import DisplayTabBox from './DisplayTabBox';

type Job = {
    _id: string
    job_post: {
        job_title: string
        status: boolean
        url: string
        company_info: {
            name: string
        }
        location: {
            remote: boolean
            division: string
        }
    }
    created_at: string
}

type ApplyJob = {
    _id: string
    job_post: {
        job_title: string
        company_name: string
        job_location: string
        salary: string
        posted_date: string
        company_logo: string
    }
    created_at: any
    status: "Applied" | "In Review" | "Interview" | "Offer" | "Rejected"
}

type ApiResponse = {
    data: ApplyJob[]
    total: number
}

const DisplayCardBox: React.FC = () => {
    const [user] = useUserData();
    const [jobs, setJobs] = React.useState<Job[]>([]);
    const [totalJobs, setTotalJobs] = React.useState<number>(0);

    const { data: applyJob, loading: applyLoading, error: applyError } = useApiRequest<ApiResponse>(
        `user/get-applied-jobs?user_id=${user?._id}`,
        "GET"
    )

    const { data, loading, error } = useApiRequest<{ data: Job[] }>(
        user ? `user/get-saved-jobs?user_id=${user._id}` : "",
        "GET"
    );

    useEffect(() => {
        if (data?.data) {
            setJobs(data?.data)
        }
    }, [data])


    useEffect(() => {
        if (applyJob?.data) {
            setTotalJobs(applyJob?.data?.length || 0)
        }
    }, [applyJob])

    return (
        <div>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 mt-4">
                <DisplayCardItem
                    title="Saved Jobs"
                    range={jobs.length}
                    color="#2A004E"
                    url="/user/saved-jobs"
                />

                <DisplayCardItem
                    title="Applied Jobs"
                    range={totalJobs}
                    color="#123524"
                    url="/user/applied-jobs"
                />


                <DisplayCardItem
                    title="Others"
                    range={totalJobs}
                    color="#16C47F"
                    url="/user"
                />

                <DisplayCardItem
                    title="Others"
                    range={totalJobs}
                    color="#5B913B"
                    url="/user"
                />

            </div>
        </div>
    );
};

export default DisplayCardBox;

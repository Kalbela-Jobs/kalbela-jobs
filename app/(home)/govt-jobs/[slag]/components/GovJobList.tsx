import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { User } from 'lucide-react';
import { Star } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

interface JobListProptype {
      all_org_jobs_loading: boolean;
      all_org_jobs: any;
      get_org_all_jobs: (jobs: any) => number | string | null;
      handleJobSelect: (orgId: string, jobId: string) => void;
}

const GovJobList: React.FC<JobListProptype> = ({ all_org_jobs_loading = false, all_org_jobs, get_org_all_jobs, handleJobSelect }) => {
      return (
            <div className=" chat-bot h-screen md:pr-3 overflow-y-auto">
                  {all_org_jobs_loading
                        ? Array.from({ length: 4 }).map((_, index) => (
                              <Card key={index} className="p-4">
                                    <div className="flex gap-4">
                                          <Skeleton className="h-16 w-16 rounded-full" />
                                          <div className="flex-1 space-y-2">
                                                <Skeleton className="h-4 w-3/4" />
                                                <Skeleton className="h-4 w-1/2" />
                                                <Skeleton className="h-4 w-1/4" />
                                          </div>
                                    </div>
                              </Card>
                        ))
                        :
                        all_org_jobs?.data?.map((org: any) => (
                              <Link
                                    href={`/govt-jobs/${org?.jobs[0]?._id}`}
                                    key={org._id}
                                    className="flex flex-col mb-2 justify-between rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow-md"
                              >
                                    <div className="flex items-start gap-4">
                                          <Avatar className="h-16 w-16 rounded-lg border bg-gray-100 p-2 transition-transform group-hover:scale-110">
                                                <AvatarImage src={org.logo} alt={org.name} className="object-contain" />
                                                <AvatarFallback>{org.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                          </Avatar>
                                          <div className="flex-1">
                                                <h3 className="font-semibold capitalize leading-tight line-clamp-2">{org.name}</h3>
                                                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-600">
                                                      <span className="flex items-center">
                                                            <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                            {org.job_count} Openings
                                                      </span>
                                                      <span className="flex items-center">
                                                            <User className="mr-1 h-4 w-4 text-blue-500" />
                                                            {get_org_all_jobs(org.jobs)} Vacancies
                                                      </span>
                                                </div>
                                          </div>
                                    </div>
                                    <div className="group relative">
                                          <Select>
                                                <SelectTrigger className="mt-4 w-full">
                                                      <SelectValue placeholder="View Jobs" />
                                                </SelectTrigger>
                                          </Select>
                                          <div
                                                className="w-full absolute top-[3.6rem] z-40 left-0 p-2 border bg-white rounded-md shadow-lg hidden group-hover:block"
                                          >
                                                {org.jobs.length > 0 ? (
                                                      org.jobs.map((job: any) => (
                                                            <div
                                                                  key={job._id}
                                                                  onClick={() => handleJobSelect(org._id, job._id)}
                                                                  className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer rounded-md"
                                                            >
                                                                  {job.title}
                                                            </div>
                                                      ))
                                                ) : (
                                                      <p className="text-gray-500 text-sm text-center">No jobs available</p>
                                                )}
                                          </div>
                                    </div>
                              </Link>
                        ))}
            </div>
      );
};

export default GovJobList;

import { Briefcase, Building2, Calendar, MapPin } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Job = {
  _id: string
  status: string
  created_at: any
  job_post: {
    job_title: any
    location: {
      remote: any
      district?: any
    }
    salary_negotiable: any
    salary_range?: {
      min: any
      max: any
    }
    company_info: {
      name: any
      logo: any
    }
  }
}

type JobCardProps = {
  job_data: Job
  key: string
  statusColor: string
}

export function JobCard({ job_data, key, statusColor }: JobCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-md" key={key}>
      <CardHeader className="flex flex-row items-center gap-4">
        <img
          src={job_data?.job_post?.company_info?.logo}
          alt={`${job_data?.job_post?.company_info?.name} logo`}
          className="h-12 w-12 rounded-full border"
        />
        <div className="flex-1">
          <CardTitle className="text-xl">
            {job_data?.job_post?.job_title}
          </CardTitle>
          <p className="text-sm text-gray-500">
            {job_data?.job_post?.company_info?.name}
          </p>
        </div>
        <Badge className={statusColor}>{job_data.status}</Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-400" />
            <span className="text-sm">
              {job_data?.job_post?.location.remote
                ? "Remote"
                : job_data?.job_post?.location.district || "Dhaka"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase size={16} className="text-gray-400" />
            <span className="text-sm">
              {job_data?.job_post?.salary_negotiable && "Negotiable"}
              {!job_data?.job_post?.salary_negotiable && (
                <span className="text-sm">
                  {" "}
                  {job_data?.job_post?.salary_range?.min} -{" "}
                  {job_data?.job_post?.salary_range?.max}
                </span>
              )}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 size={16} className="text-gray-400" />
            <span className="text-sm">
              {job_data?.job_post?.company_info?.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-gray-400" />
            <span className="text-sm">
              Applied on {new Date(job_data?.created_at).toDateString()}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <a href="#" className="text-sm text-blue-600 hover:underline">
          View Application
        </a>
      </CardFooter>
    </Card>
  )
}

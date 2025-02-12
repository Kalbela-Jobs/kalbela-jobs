"use client"

import { useUserData } from "@/utils/encript_decript"

import useApiRequest from "@/app/hooks/useApiRequest"

type Job = {
  _id: string
  job_post: {
    company_info: {
      name: string
      logo: string
    }
    job_title: string
    job_location: string
    salary: string
    posted_date: string
  }
  created_at: any
  status: "Applied" | "In Review" | "Interview" | "Offer" | "Rejected"
}
type ApiResponse = {
  data: Job[]
  total: number
}

const page = () => {
  const [user] = useUserData()

  const { data, loading, error } = useApiRequest<ApiResponse>(
    `user/get-applied-jobs?user_id=${user?._id}`,
    "GET"
  )

  const jobs = data?.data || []

  return (
    <div className="flex flex-1 flex-col overflow-x-hidden">
      <div className="py-6">
        <div className="mx-auto">
          <div className="md:flex md:items-center">
            <p className="text-base font-bold">Hey {user?.fullName} -</p>
            <p className="mt-1 text-base font-medium text-gray-500 md:ml-2 md:mt-0">
              here's what's happening with your store today
            </p>
          </div>
        </div>
        <div className="mx-auto mt-8">
          <div className="space-y-5 sm:space-y-6">
            <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-6">
              <div className="overflow-hidden rounded-xl border border-gray-200 lg:col-span-4">
                <div className="px-4 py-5 sm:p-6">
                  <div className="sm:flex sm:items-start sm:justify-between">
                    <div>
                      <p className="text-base font-bold">Applied Jobs</p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <a
                        href="#"
                        title=""
                        className="hover: inline-flex items-center text-xs font-semibold uppercase tracking-widest text-gray-500"
                      >
                        See all applied jobs
                        <svg
                          className="ml-2 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {data?.data?.map((job: any) => (
                    <div className="grid grid-cols-3 gap-y-4 py-4 lg:grid-cols-6 lg:gap-0">
                      <div className="col-span-2 px-4 sm:px-6 lg:col-span-1 lg:py-4">
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-900">
                          <svg
                            className="-ml-1 mr-1.5 h-2.5 w-2.5 text-green-500"
                            fill="currentColor"
                            viewBox="0 0 8 8"
                          >
                            <circle cx={4} cy={4} r={3} />
                          </svg>
                          {job.status}
                        </span>
                      </div>
                      <div className="px-4 text-right sm:px-6 lg:order-last lg:py-4">
                        <button
                          type="button"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 transition-all duration-200 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                        >
                          <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="px-4 sm:px-6 lg:col-span-2 lg:py-4">
                        <p className="text-sm font-bold">
                          {job?.job_post?.job_title}
                        </p>
                        <p className="mt-1 text-sm font-medium text-gray-500">
                          {job?.job_post?.company_info?.name}
                        </p>
                      </div>
                      <div className="px-4 sm:px-6 lg:py-4">
                        <p className="text-sm font-bold">
                          {job.job_post?.job_type}
                        </p>
                        <p className="mt-1 whitespace-nowrap text-sm font-medium text-gray-500">
                          {new Date(job?.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      <div className="px-4 sm:px-6 lg:py-4">
                        <p className="mt-1 text-sm font-medium text-gray-500">
                          {job?.job_post?.company_info?.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="overflow-hidden rounded-xl border border-gray-200 lg:col-span-2">
                <div className="px-4 py-5 sm:p-6">
                  <div>
                    <p className="text-base font-bold">Recent Customers</p>
                    <p className="mt-1 text-sm font-medium text-gray-500">
                      Lorem ipsum dolor sit ametis.
                    </p>
                  </div>
                  <div className="mt-8 space-y-6">
                    <div className="flex items-center justify-between space-x-5">
                      <div className="flex min-w-0 flex-1 items-center">
                        <img
                          className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
                          src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/dashboards/1/avatar-male.png"
                          alt=""
                        />
                        <div className="ml-4 min-w-0 flex-1">
                          <p className="text-sm font-bold">Jenny Wilson</p>
                          <p className="mt-1 text-sm font-medium text-gray-500">
                            w.lawson@example.com
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">$11,234</p>
                        <p className="mt-1 truncate text-sm font-medium text-gray-500">
                          Austin
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between space-x-5">
                      <div className="flex min-w-0 flex-1 items-center">
                        <img
                          className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
                          src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/dashboards/1/avatar-male-2.png"
                          alt=""
                        />
                        <div className="ml-4 min-w-0 flex-1">
                          <p className="text-sm font-bold">Devon Lane</p>
                          <p className="mt-1 truncate text-sm font-medium text-gray-500">
                            dat.roberts@example.com
                          </p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <p className="text-sm font-medium">$11,159</p>
                        <p className="mt-1 truncate text-sm font-medium text-gray-500">
                          New York
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between space-x-5">
                      <div className="flex min-w-0 flex-1 items-center">
                        <img
                          className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
                          src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/dashboards/1/avatar-female-2.png"
                          alt=""
                        />
                        <div className="ml-4 min-w-0 flex-1">
                          <p className="text-sm font-bold">Jane Cooper</p>
                          <p className="mt-1 truncate text-sm font-medium text-gray-500">
                            jgraham@example.com
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">$10,483</p>
                        <p className="mt-1 text-sm font-medium text-gray-500">
                          Toledo
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between space-x-5">
                      <div className="flex min-w-0 flex-1 items-center">
                        <img
                          className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
                          src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/dashboards/1/avatar-male-3.png"
                          alt=""
                        />
                        <div className="ml-4 min-w-0 flex-1">
                          <p className="text-sm font-bold">Dianne Russell</p>
                          <p className="mt-1 truncate text-sm font-medium text-gray-500">
                            curtis.d@example.com
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">$9,084</p>
                        <p className="mt-1 text-sm font-medium text-gray-500">
                          Naperville
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <a
                      href="#"
                      title=""
                      className="hover: inline-flex items-center text-xs font-semibold uppercase tracking-widest text-gray-500"
                    >
                      See all Customers
                      <svg
                        className="ml-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page

import Link from "next/link"

import { formatDate, truncateText } from "@/lib/utils"
import useApiRequest from "@/app/hooks/useApiRequest"
import { ArrowRightIcon } from "lucide-react"

const Resource = ({
      resource,
      resourceSlugFromQuery,
}: {
      resource: any
      resourceSlugFromQuery: string
}) => {
      const { data, loading, error } = useApiRequest<any>(
            `resource/category-resource?slag=${resourceSlugFromQuery}`,
            "GET"
      )

      console.log("data", data)

      if (error) {
            return <p>Error loading data</p>
      }

      return (
            <section className="py-6">
                  <div>
                        <div className="mx-auto text-left">
                              <h2 className="text-xl font-bold leading-tight md:text-3xl">
                                    Latest from {resource.name}
                              </h2>
                        </div>
                        <div className="mx-auto mt-6 grid max-w-md grid-cols-1 gap-x-16 gap-y-6 lg:mt-10 lg:max-w-full lg:grid-cols-3">
                              {data?.data?.length > 0 && !loading ? (
                                    data?.data?.map((item: any) => (
                                          <div>


                                                <article
                                                      className="overflow-hidden rounded-lg border  border-opacity-25  shadow-sm"
                                                >
                                                      <img
                                                            alt="Office"
                                                            loading="lazy" src={item.photo}
                                                            className="h-56 w-full object-cover"
                                                      />

                                                      <div className="p-4 sm:p-6">
                                                            <Link href={`/career-resources/${item._id}`}>
                                                                  <h3 className="text-lg font-medium">
                                                                        {item.name}
                                                                  </h3>
                                                            </Link>


                                                            <p
                                                                  className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500"
                                                                  dangerouslySetInnerHTML={{
                                                                        __html: truncateText(item.description, 200),
                                                                  }}
                                                            ></p>


                                                            <Link href={`/career-resources/${item._id}`} title="" className="inline-flex items-center justify-center pb-0.5 mt-5 text-base font-semibold text-blue-600 transition-all duration-200">
                                                                  Continue Reading
                                                                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                                                  </svg>
                                                            </Link>
                                                      </div>
                                                </article>


                                          </div>

                                    ))
                              ) : (
                                    <div>
                                          <p className="text-gray-600">No data available</p>
                                    </div>
                              )}
                        </div>


                  </div>
            </section>
      )
}

export default Resource

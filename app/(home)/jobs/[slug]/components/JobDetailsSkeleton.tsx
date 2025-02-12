import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"

const JobDetailsSkeleton = () => {
      return (
            <MaxWidthWrapper>
                  <div className="relative h-[300px] mt-4 rounded-xl w-full overflow-hidden bg-light-theme shadow dark:bg-dark-theme   md:h-[400px]">
                        <div className="absolute left-0 top-0">
                              <img
                                    className="w-16 md:w-24 lg:w-32 xl:w-full"
                                    src="https://landingfoliocom.imgix.net/store/collection/saasui/images/newsletter/3/ring-pattern.svg"
                                    alt=""
                              />
                        </div>

                        <div className="relative h-full">
                              <div className="container mx-auto flex h-full flex-col justify-end px-4 pb-8 ">
                                    <div className="max-w-3xl">
                                          <h1 className="mb-2 text-4xl font-bold md:text-5xl lg:text-6xl text-transparent custom-outline">
                                                Hiring
                                          </h1>


                                          <h2 className="mb-4 text-3xl font-semibold /90 md:text-4xl">
                                                <Skeleton className="h-12 w-40" />
                                          </h2>
                                          <div className="flex items-center gap-2">
                                                <Skeleton className="h-6 w-20" />  <Skeleton className="h-6 w-20" />  <Skeleton className="h-6 w-20" />
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
                  <div className="flex flex-col gap-8 px-2 py-6 pb-14 md:gap-4 lg:flex-row">
                        <div className="lg:w-[450px]">
                              <Card className="p-6">
                                    <Skeleton className="mb-4 h-8 w-1/2" />
                                    <div className="space-y-4">
                                          <Skeleton className="h-24 w-full" />
                                          <Skeleton className="h-24 w-full" />
                                          <Skeleton className="h-24 w-full" />
                                    </div>
                              </Card>
                        </div>
                        <div className="content-container flex-1 space-y-6">
                              <Card className="p-6">
                                    <Skeleton className="mb-4 h-10 w-3/4" />
                                    <div className="mb-4 flex gap-2">
                                          <Skeleton className="h-6 w-20" />
                                          <Skeleton className="h-6 w-20" />
                                          <Skeleton className="h-6 w-20" />
                                    </div>
                                    <Skeleton className="mb-2 h-4 w-full" />
                                    <Skeleton className="mb-2 h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                              </Card>
                        </div>

                  </div>
            </MaxWidthWrapper>
      )
}

export default JobDetailsSkeleton

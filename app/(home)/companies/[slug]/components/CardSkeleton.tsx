import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const CardSkeleton = () => {
      return (
            <Card className="job-card overflow-hidden">
                  <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                              <div className="mb-4 md:mb-0">
                                    <Skeleton className="h-6 w-48 mb-2" />
                                    <Skeleton className="h-4 w-32" />
                              </div>
                              <div className="flex gap-2">
                                    <Skeleton className="h-6 w-20" />
                                    <Skeleton className="h-6 w-20" />
                                    <Skeleton className="h-6 w-20" />
                              </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                              <Skeleton className="h-10 w-32" />
                              <Skeleton className="h-10 w-10 rounded-full" />
                        </div>
                  </CardContent>
            </Card>
      )
}

export default CardSkeleton

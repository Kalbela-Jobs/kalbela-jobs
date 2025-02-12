import { Skeleton } from "@/components/ui/skeleton"

const JobCardSkeleton: React.FC = () => (
  <div className="rounded border p-4 shadow-sm">
    <div className="relative pb-2">
      <Skeleton className="h-4 w-1/3" />

      <Skeleton className="my-1 h-4 w-1/4" />

      <div className="flex space-x-4">
        <Skeleton className="h-4 w-1/6" />
        <Skeleton className="h-4 w-1/4" />
      </div>

      <Skeleton className="mt-1 h-4 w-5/6" />

      <div className="mt-2 flex flex-wrap gap-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-20" />
      </div>

      <Skeleton className="absolute right-0 top-0 h-16 w-16 rounded" />
    </div>

    <div className="flex items-center justify-between pt-1">
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-4 w-10" />
    </div>
  </div>
)

export default JobCardSkeleton

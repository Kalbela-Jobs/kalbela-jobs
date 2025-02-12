import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-[#f4f4f5] dark:bg-[#f4f4f57a]",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }

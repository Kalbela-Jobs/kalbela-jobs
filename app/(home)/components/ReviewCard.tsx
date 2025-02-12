import { cn } from "@/lib/utils"

const ReviewCard = ({ name, logo }: { name: string; logo: string }) => {
  return (
    <figure
      className={cn(
        "relative h-auto w-fit cursor-pointer overflow-hidden rounded-sm border p-1 md:w-24 md:p-2",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <img
          className="hidden h-20 w-12 object-contain md:block lg:w-20"
          alt="logo"
          src={logo}
        />
        {/* <div className="flex flex-col">
          <figcaption className="text-nowrap text-[7px] dark:text-white md:text-xs md:font-medium">
            {name}
          </figcaption>
        </div> */}
      </div>
    </figure>
  )
}

export default ReviewCard

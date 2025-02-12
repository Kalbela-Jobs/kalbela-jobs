import { cn } from "@/lib/utils"
import Marquee from "@/components/Marquee"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"

import { ReviewCard } from "./Testimonial_review_card"

const reviews = [
  {
    name: "Rakib Hossain",
    position: "Frontend Developer",
    body: "Kalbela Jobs helped me land my dream job as a Frontend Developer in no time. Highly recommended!",
    img: "https://avatar.vercel.sh/rakib",
  },
  {
    name: "Tania Akter",
    position: "Sales Executive",
    body: "Finding a job used to be tough, but Kalbela Jobs made it super easy for me. I love the platform!",
    img: "https://avatar.vercel.sh/tania",
  },
  {
    name: "Sajid Hossain",
    position: "Tech Lead",
    body: "As a Tech Lead, I was looking for specific roles. Kalbela Jobs matched me with the perfect opportunity.",
    img: "https://avatar.vercel.sh/sajid",
  },
  {
    name: "Nabila Rahman",
    position: "Product Manager",
    body: "I found the perfect Product Manager role through Kalbela Jobs. The process was smooth and efficient.",
    img: "https://avatar.vercel.sh/nabila",
  },
  {
    name: "Ayesha Akter",
    position: "Backend Developer",
    body: "Kalbela Jobs is an incredible platform. I quickly got hired as a Backend Developer. Thank you!",
    img: "https://avatar.vercel.sh/ayesha",
  },
  {
    name: "Hasib Ahmed",
    position: "Designer",
    body: "The design-related job postings on Kalbela Jobs are amazing. I found my ideal role in no time!",
    img: "https://avatar.vercel.sh/hasib",
  },
]

const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)

const Testimonial = () => {
  return (
    <div className="mx-auto h-full w-full max-w-screen-xl px-0 md:px-20 lg:px-12 2xl:max-w-screen-2xl">
      <div className="bg-background py-6 md:py-10">
        <h2 className="mb-2 w-full px-2 text-left text-xl font-bold md:text-3xl">
          What people are saying
        </h2>
        <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg">
          <Marquee pauseOnHover className="[--duration:30s]">
            {firstRow.map((review) => (
              <ReviewCard key={review.position} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:30s]">
            {secondRow.map((review) => (
              <ReviewCard key={review.position} {...review} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
        </div>
      </div>
    </div>
  )
}

export default Testimonial

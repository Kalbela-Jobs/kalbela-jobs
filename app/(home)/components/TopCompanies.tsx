"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import Autoplay from "embla-carousel-autoplay"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import SecondaryBtn from "@/components/SecondaryBtn"
import useApiRequest from "@/app/hooks/useApiRequest"

const topCompaniessArr = [
  {
    company_name: "Fortune 500",
    job_title: "Leading global telecom company.",
    logo: "/company-logo.png",
  },
  {
    company_name: "Walton",
    job_title: "Leading global telecom company.",
    logo: "/company-logo.png",
  },
  {
    company_name: "Fortune 500 LTD.",
    job_title: "Leading global telecom company.",
    logo: "/company-logo.png",
  },
  {
    company_name: "Brack Bank",
    job_title: "Leading global telecom company.",
    logo: "/company-logo.png",
  },
  {
    company_name: "Fortune 500 Chain",
    job_title: "Leading global telecom company.",
    logo: "/company-logo.png",
  },
  {
    company_name: "Pathao",
    job_title: "Leading global telecom company.",
    logo: "/company-logo.png",
  },
  {
    company_name: "Fortune 500",
    job_title: "Leading global telecom company.",
    logo: "/company-logo.png",
  },
  {
    company_name: "Fortune 500",
    job_title: "Leading global telecom company.",
    logo: "/company-logo.png",
  },
  {
    company_name: "Fortune 500",
    job_title: "Leading global telecom company.",
    logo: "/company-logo.png",
  },
  {
    company_name: "Fortune 500",
    job_title: "Leading global telecom company.",
    logo: "/company-logo.png",
  },
  {
    company_name: "Fortune 500",
    job_title: "Leading global telecom company.",
    logo: "/company-logo.png",
  },
]

const TopCompanies: React.FC = () => {
  const [api, setApi] = useState<CarouselApi | null>(null)
  const { data, loading, error } = useApiRequest<any>(
    "workspace/feature",
    "GET"
  )

  console.log("company data>>>", data)

  useEffect(() => {
    if (!api) return
  }, [api])

  const handleNextClick = () => {
    if (api) api.scrollNext()
  }

  const handlePrevClick = () => {
    if (api) api.scrollPrev()
  }

  return (
    <section className="py-6 md:py-10">
      <MaxWidthWrapper>
        <h2 className="mb-4 flex items-center text-xl font-bold md:mb-6 md:text-3xl">
          Top companies hiring now
        </h2>
        <Carousel
          opts={{ loop: true }}
          setApi={setApi}
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
          className="flex w-full items-center justify-between"
        >
          <div className="h-6 w-6">
            <Button
              onClick={handlePrevClick}
              variant="outline"
              size="icon"
              className="h-6 w-6 rounded-full"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
          </div>

          <CarouselContent className="flex">
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="mx-2 h-auto w-full" />
                ))
              : data?.data?.map((company: any) => (
                  <CarouselItem
                    key={company._id}
                    className="min-w-48 basis-1/2 md:basis-1/4 lg:basis-1/5"
                  >
                    <Link
                      href={`companies/${company.company_website}`}
                      className="flex h-full w-full flex-col items-center justify-between rounded-sm border p-2 py-4"
                    >
                      <div className="flex size-24 items-center justify-center">
                        <img
                          className="mr-1 size-full rounded-sm object-scale-down"
                          src={company.logo}
                          alt={`${company.company_name} image`}
                          loading="lazy"
                        />
                      </div>
                      <h3 className="my-2 max-w-40 truncate text-sm font-semibold">
                        {company.company_name}
                      </h3>
                      <SecondaryBtn className="mt-2">View jobs</SecondaryBtn>
                    </Link>
                  </CarouselItem>
                ))}
          </CarouselContent>

          <div className="h-6 w-6">
            <Button
              onClick={handleNextClick}
              variant="outline"
              size="icon"
              className="h-6 w-6 rounded-full"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </Carousel>
      </MaxWidthWrapper>
    </section>
  )
}

export default TopCompanies

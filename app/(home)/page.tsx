import { Fragment } from "react"
import { Metadata } from "next"

import FeaturedJobs from "./components/FeaturedJobs"
import Govt_jobs from "./components/Govt_jobs"
import HeroSection from "./components/HeroSection"
import InterviewQuestions from "./components/InterviewQuestions"
import JobType from "./components/JobType"
import Job_type_tag from "./components/Job_type_tag"
import NesLetter from "./components/NesLetter"
import Testimonial from "./components/Testimonial"
import TopCompanies from "./components/TopCompanies"
import VerticalMarquee from "./components/VerticalMarquee"

export const metadata: Metadata = {
      title: "Kalbela Jobs || Find Your Dream Job Today",
      description:
            "Discover top jobs and career opportunities on Kalbela Jobs. Explore featured jobs, top companies, and expert interview tips to boost your career.",
      keywords: [
            "jobs",
            "job portal",
            "career opportunities",
            "Kalbela",
            "featured jobs",
            "top companies",
            "interview tips",
      ],
      icons: {
            icon: "/favicon.ico",
      },
}

const HomePage = () => {
      return (
            <Fragment>
                  <div className="relative">
                        <div className="z-50">
                              <HeroSection />
                              {/* <Job_type_tag /> */}
                              {/* <JobType /> */}
                        </div>
                        <div className="pointer-events-none absolute right-0 top-0 z-0 w-full">
                              <VerticalMarquee />
                        </div>

                        <FeaturedJobs />


                  </div>

                  <TopCompanies />

                  {/* <InterviewQuestions /> */}
                  <Testimonial />
                  <NesLetter />
            </Fragment>
      )
}

export default HomePage

"use client"

import Link from "next/link"
import { Briefcase, Clock, Save, MapPin, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import NoVacancies from "@/app/(home)/search-details/components/NoVacancies"
import CardSkeleton from "./CardSkeleton"

const CompanyJobs = ({ jobs, loading }: { jobs: any; loading: boolean }) => {
      return (
            <div className="space-y-4 mb-8">
                  <h2 className="text-3xl lg:mt-0 mt-4 font-bold lg:text-white md:text-primary">Open Positions</h2>
                  {loading ? (
                        <div className="space-y-6">
                              {Array.from({ length: 4 }).map((_, index) => (
                                    <CardSkeleton key={index} />
                              ))}
                        </div>
                  ) : jobs && jobs.length > 0 ? (
                        <div className="space-y-6">
                              {jobs.map((job: any) => (
                                    <Card
                                          key={job._id}
                                          className="job-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-700"
                                    >
                                          <CardContent className="p-6">
                                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                                      <div className="mb-4 md:mb-0">
                                                            <h3 className="text-xl font-semibold text-foreground mb-2">{job.job_title}</h3>
                                                            <p className="text-muted-foreground">{job.company_info?.name}</p>
                                                      </div>
                                                      <div className="flex flex-wrap gap-2">
                                                            <Badge variant="secondary" className="text-sm">
                                                                  <Briefcase className="mr-1 h-3 w-3" />
                                                                  {job.experience_level}
                                                            </Badge>
                                                            <Badge variant="secondary" className="text-sm">
                                                                  <MapPin className="mr-1 h-3 w-3" />
                                                                  {job.location?.remote ? "Remote" : `${job.location?.country || ""}, ${job.location?.city || ""}`}
                                                            </Badge>
                                                            <Badge variant="secondary" className="text-sm">
                                                                  <Clock className="mr-1 h-3 w-3" />
                                                                  {job.job_type}
                                                            </Badge>
                                                      </div>
                                                </div>
                                                <div className="mt-6 flex items-center justify-between">
                                                      <Button asChild>
                                                            <Link href={`/jobs/${job.url}`} className="flex items-center">
                                                                  View Details
                                                                  <ChevronRight className="ml-2 h-4 w-4" />
                                                            </Link>
                                                      </Button>
                                                      <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-muted-foreground hover:text-foreground"
                                                            aria-label="Save job"
                                                      >
                                                            <Save className="h-5 w-5" />
                                                      </Button>
                                                </div>
                                          </CardContent>
                                    </Card>
                              ))}
                        </div>
                  ) : (
                        <NoVacancies />
                  )}
            </div>
      )
}

export default CompanyJobs

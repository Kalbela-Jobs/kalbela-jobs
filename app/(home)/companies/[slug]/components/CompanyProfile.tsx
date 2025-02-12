"use client"
import Link from "next/link"
import { Globe, Heart, Linkedin, MapPin, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const CompanyProfile = ({ company_info }: { company_info: any }) => {
      return (
            <Card className="overflow-hidden shadow-lg">
                  <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                              <div className="mb-6">
                                    <div className="relative size-32 overflow-hidden rounded p-2 border-4 border-primary-200 dark:border-primary-800 shadow-xl">
                                          <img
                                                src={company_info?.logo || "/placeholder.svg?height=128&width=128"}
                                                alt="Logo"
                                                className="h-full w-full object-cover"
                                          />
                                    </div>
                              </div>
                              <h1 className="mb-2 text-2xl font-bold text-foreground">{company_info?.company_name || "Company Name"}</h1>
                              <p className="mb-4 text-lg text-muted-foreground">
                                    {company_info?.tagline || "Innovative solutions for tomorrow"}
                              </p>
                              <div className="mb-6 flex flex-wrap justify-center gap-2">
                                    <Badge variant="secondary" className="text-sm px-2 py-1">
                                          <MapPin className="mr-1 h-3 w-3" />
                                          {company_info?.location || "Location"}
                                    </Badge>
                                    <Badge variant="secondary" className="text-sm px-2 py-1">
                                          <Users className="mr-1 h-3 w-3" />
                                          {company_info?.employees || "1-50"} employees
                                    </Badge>
                              </div>
                              <div className="flex flex-wrap justify-center gap-3">
                                    <Button variant="outline" size="sm" asChild>
                                          <Link href={company_info?.company_website || "#"} target="_blank">
                                                <Globe className="mr-2 h-4 w-4" />
                                                Website
                                          </Link>
                                    </Button>
                                    <Button variant="outline" size="sm" asChild>
                                          <Link href={company_info?.linkedin || "#"} target="_blank">
                                                <Linkedin className="mr-2 h-4 w-4" />
                                                LinkedIn
                                          </Link>
                                    </Button>
                                    <Button variant="secondary" size="sm">
                                          <Heart className="mr-2 h-4 w-4" />
                                          Follow
                                    </Button>
                              </div>
                        </div>
                  </CardContent>
            </Card>
      )
}

export default CompanyProfile

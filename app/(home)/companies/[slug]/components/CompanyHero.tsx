import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Globe, Linkedin } from "lucide-react"
import Link from "next/link"

export default function CompanyHero({ company }: { company: any }) {
      return (
            <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
                  <div
                        className="absolute inset-0 bg-black/50"
                        style={{
                              backgroundImage: `url(${company.cover_image || "/placeholder.svg?height=400&width=1920"})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              mixBlendMode: "overlay",
                        }}
                  />
                  <MaxWidthWrapper className="relative py-20">
                        <div className="flex flex-col items-center text-center">
                              <img
                                    src={company.logo || "/placeholder.svg?height=128&width=128"}
                                    alt={`${company.company_name} logo`}
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg mb-6"
                              />
                              <h1 className="text-4xl font-bold mb-2">{company.company_name}</h1>
                              <p className="text-xl mb-6">{company.tagline}</p>
                              <div className="flex flex-wrap justify-center gap-4 mb-8">
                                    <span className="flex items-center">
                                          <MapPin className="w-5 h-5 mr-2" />
                                          {company.location}
                                    </span>
                                    <span className="flex items-center">
                                          <Users className="w-5 h-5 mr-2" />
                                          {company.employees} employees
                                    </span>
                              </div>
                              <div className="flex gap-4">
                                    <Button asChild variant="secondary">
                                          <Link href={company.website}>
                                                <Globe className="w-4 h-4 mr-2" />
                                                Website
                                          </Link>
                                    </Button>
                                    <Button asChild variant="secondary">
                                          <Link href={company.linkedin}>
                                                <Linkedin className="w-4 h-4 mr-2" />
                                                LinkedIn
                                          </Link>
                                    </Button>
                              </div>
                        </div>
                  </MaxWidthWrapper>
            </div>
      )
}

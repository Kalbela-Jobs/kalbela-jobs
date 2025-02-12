import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Briefcase, Star, TrendingUp } from "lucide-react"

export default function CompanyStats({ company }: { company: any }) {
      return (
            <div className="space-y-6">
                  <Card>
                        <CardHeader>
                              <CardTitle>Company Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                              <div className="flex items-center">
                                    <Users className="w-5 h-5 mr-2 text-primary" />
                                    <span>{company.employees} employees</span>
                              </div>
                              <div className="flex items-center">
                                    <Briefcase className="w-5 h-5 mr-2 text-primary" />
                                    <span>{company.industry}</span>
                              </div>
                              <div className="flex items-center">
                                    <Star className="w-5 h-5 mr-2 text-primary" />
                                    <span>{company.founded} founded</span>
                              </div>
                              <div className="flex items-center">
                                    <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                                    <span>{company.growth_stage}</span>
                              </div>
                        </CardContent>
                  </Card>
                  <Card>
                        <CardHeader>
                              <CardTitle>Why Join Us</CardTitle>
                        </CardHeader>
                        <CardContent>
                              <ul className="list-disc list-inside space-y-2">
                                    {company.benefits.map((benefit: string, index: number) => (
                                          <li key={index}>{benefit}</li>
                                    ))}
                              </ul>
                        </CardContent>
                  </Card>
            </div>
      )
}

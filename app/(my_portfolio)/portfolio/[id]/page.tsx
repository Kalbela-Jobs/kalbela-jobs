'use client';
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



import { decryptId } from '@/utils/encriptDecriptGenarator';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Facebook, Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
import ProfileHeader from './component/ProfileHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ShareProfilePageProps {
      params: {
            id: string
      }
}

type SkillType = string;

interface Experience {
      skills?: SkillType[];
}


const ShareProfilePage: React.FC<ShareProfilePageProps> = ({ params: { id } }) => {
      const decryptedId = decryptId(decodeURIComponent(id));
      const [userDatas, setUserDatas] = useState<any>([]);
      const [loading, setLoading] = useState<boolean>(false);
      const [error, setError] = useState<any>(null);
      const [isOpen, setIsOpen] = useState(true)
      useEffect(() => {
            const fetchUserData = async () => {
                  setLoading(true);
                  try {
                        const response = await axios.get(`${process.env.NEXT_APP_BASE_URL}/api/v1/user/user-profile?user_id=${decryptedId}`);
                        setUserDatas(response.data);
                        setLoading(false);
                  } catch (error) {
                        setError(error);
                        setLoading(false);
                  }
            };

            fetchUserData();
      }, [decryptedId]);



      const userData = userDatas?.data;




      //  Helper function to safely render HTML content
      const renderHTML = (html: any) => {
            if (!html) return null
            return <div dangerouslySetInnerHTML={{ __html: html }} />
      }

      // Format date of birth to a readable format
      const formatDate = (dateString: any) => {
            if (!dateString) return null
            try {
                  const date = new Date(dateString)
                  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
            } catch (error) {
                  return null
            }
      }

      // Calculate age from date of birth
      const calculateAge = (dateString: any) => {
            if (!dateString) return null
            try {
                  const birthDate = new Date(dateString)
                  const today = new Date()
                  let age = today.getFullYear() - birthDate.getFullYear()
                  const monthDiff = today.getMonth() - birthDate.getMonth()
                  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                        age--
                  }
                  return age
            } catch (error) {
                  return null
            }
      }

      console.log("profile data", userData);

      return (
            <div>


                  <div id="home" className="min-h-screen  bg-light-theme">





                        {/* Header */}
                        <header className="sticky flex items-center  top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                              <div className="w-full mt-3">
                                    <div className={`container  flex md:!h-[60px] !h-[40px] overflow-hidden items-center justify-between`}>
                                          <div className="flex items-center gap-2">
                                                <Avatar className="h-10 w-10 uppercase">
                                                      <AvatarImage
                                                            src={userData?.profile_picture || "/placeholder.svg?height=32&width=32"}
                                                            alt={userData?.fullName || "Profile"}
                                                      />
                                                      <AvatarFallback>{userData?.fullName ? userData?.fullName.charAt(0) : "K"}</AvatarFallback>
                                                </Avatar>
                                                <span className="font-semibold">{userData?.fullName || userData?.fullName}</span>
                                          </div>
                                          <nav className="hidden md:flex gap-6">
                                                <Link href="#home" className="text-sm font-medium hover:underline underline-offset-4">
                                                      About
                                                </Link>
                                                <Link href="#about" className="text-sm font-medium hover:underline underline-offset-4">
                                                      About
                                                </Link>
                                                <Link href="#experience" className="text-sm font-medium hover:underline underline-offset-4">
                                                      Experience
                                                </Link>
                                                <Link href="#education" className="text-sm font-medium hover:underline underline-offset-4">
                                                      Education
                                                </Link>
                                                <Link href="#skills" className="text-sm font-medium hover:underline underline-offset-4">
                                                      Skills
                                                </Link>
                                                <Link href="#contact" className="text-sm font-medium hover:underline underline-offset-4">
                                                      Contact
                                                </Link>
                                          </nav>

                                          <Button asChild size="sm" className="hidden md:inline-flex">
                                                <Link href="#contact">Contact Me</Link>
                                          </Button>
                                          <Button
                                                onClick={() => setIsOpen(!isOpen)}
                                                variant="outline" size="icon" className="md:hidden">
                                                <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      width="24"
                                                      height="24"
                                                      viewBox="0 0 24 24"
                                                      fill="none"
                                                      stroke="currentColor"
                                                      strokeWidth="2"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      className="h-6 w-6"
                                                >
                                                      <line x1="4" x2="20" y1="12" y2="12" />
                                                      <line x1="4" x2="20" y1="6" y2="6" />
                                                      <line x1="4" x2="20" y1="18" y2="18" />
                                                </svg>
                                                <span className="sr-only">Toggle menu</span>
                                          </Button>
                                    </div>
                                    {<div className={`container mt-3 ${isOpen ? 'h-[0px] duration-300' : 'h-[100vh] duration-300'} overflow-hidden`}>
                                          <nav className="flex md:hidden flex-col gap-6">
                                                <Link onClick={() => setIsOpen(!isOpen)} href="#home" className="text-sm font-medium hover:underline underline-offset-4">
                                                      Home
                                                </Link>
                                                <Link onClick={() => setIsOpen(!isOpen)} href="#about" className="text-sm font-medium hover:underline underline-offset-4">
                                                      About
                                                </Link>
                                                <Link onClick={() => setIsOpen(!isOpen)} href="#experience" className="text-sm font-medium hover:underline underline-offset-4">
                                                      Experience
                                                </Link>
                                                <Link onClick={() => setIsOpen(!isOpen)} href="#education" className="text-sm font-medium hover:underline underline-offset-4">
                                                      Education
                                                </Link>
                                                <Link onClick={() => setIsOpen(!isOpen)} href="#skills" className="text-sm font-medium hover:underline underline-offset-4">
                                                      Skills
                                                </Link>
                                                <Link onClick={() => setIsOpen(!isOpen)} href="#contact" className="text-sm font-medium hover:underline underline-offset-4">
                                                      Contact
                                                </Link>
                                          </nav>
                                    </div>}
                              </div>
                        </header>

                        <main className="container py-8 md:py-12">
                              {/* Hero Section */}
                              <section className="grid gap-8 md:grid-cols-2 items-center py-8 md:py-12">
                                    <div className="space-y-4">
                                          <h1 className="text-4xl font-bold tracking-tight">{userData?.fullName || userData?.fullName}</h1>
                                          <h2 className="text-2xl font-medium text-muted-foreground">{userData?.title || ""}</h2>
                                          {userData?.description && <div className="text-muted-foreground">{renderHTML(userData?.description)}</div>}
                                          <div className="flex gap-4">
                                                <Button asChild>
                                                      <Link href="#contact">Contact Me</Link>
                                                </Button>
                                                {userData?.social_links && userData?.social_links.length > 0 && (
                                                      <Button variant="outline" asChild>
                                                            <Link href={userData?.social_links[0]} target="_blank" rel="noopener noreferrer">
                                                                  Portfolio <ArrowUpRight className="ml-2 h-4 w-4" />
                                                            </Link>
                                                      </Button>
                                                )}
                                          </div>
                                    </div>
                                    <div className="flex justify-center">
                                          <div className="relative w-64 h-64 overflow-hidden rounded-full border-4 border-primary/20">
                                                <Image
                                                      src={userData?.profile_picture || "/placeholder.svg?height=256&width=256"}
                                                      alt={userData?.fullName || "Profile"}
                                                      fill
                                                      className="object-cover"
                                                      priority
                                                />
                                          </div>
                                    </div>
                              </section>

                              {/* About Section */}
                              <section id="about" className="py-8 md:py-12 scroll-mt-16">
                                    <h2 className="text-3xl font-bold mb-8">About Me</h2>
                                    <div className="grid md:gap-8 gap-3 md:grid-cols-3">
                                          <Card className="md:col-span-2">
                                                <CardHeader>
                                                      <CardTitle>Career Objective</CardTitle>
                                                </CardHeader>
                                                <CardContent className="md:w-auto w-[300px] text-wrap overflow-hidden">
                                                      {userData?.career_objective ? (
                                                            renderHTML(userData?.career_objective)
                                                      ) : (
                                                            <p>No career objective provided.</p>
                                                      )}
                                                </CardContent>
                                          </Card>
                                          <div className="space-y-6">
                                                <Card>
                                                      <CardHeader>
                                                            <CardTitle>Personal Information</CardTitle>
                                                      </CardHeader>
                                                      <CardContent className="space-y-4">
                                                            {userData?.date_of_birth && (
                                                                  <div className="flex justify-between">
                                                                        <span className="text-muted-foreground">Age:</span>
                                                                        <span>{calculateAge(userData?.date_of_birth)} years</span>
                                                                  </div>
                                                            )}
                                                            {userData?.gender && (
                                                                  <div className="flex justify-between">
                                                                        <span className="text-muted-foreground">Gender:</span>
                                                                        <span>{userData?.gender}</span>
                                                                  </div>
                                                            )}
                                                            {userData?.bloodGroup && (
                                                                  <div className="flex justify-between">
                                                                        <span className="text-muted-foreground">Blood Group:</span>
                                                                        <span>{userData?.bloodGroup}</span>
                                                                  </div>
                                                            )}
                                                            {userData?.languages && userData?.languages.length > 0 && (
                                                                  <div className="flex justify-between">
                                                                        <span className="text-muted-foreground">Languages:</span>
                                                                        <span>{userData?.languages.join(", ")}</span>
                                                                  </div>
                                                            )}
                                                            {userData?.address && userData?.address.presentCity && (
                                                                  <div className="flex justify-between">
                                                                        <span className="text-muted-foreground">Location:</span>
                                                                        <span>
                                                                              {userData?.address.presentCity.label}, {userData?.address.presentCountry.label}
                                                                        </span>
                                                                  </div>
                                                            )}
                                                      </CardContent>
                                                </Card>
                                                {userData?.address && (
                                                      <Card>
                                                            <CardHeader>
                                                                  <CardTitle>Address</CardTitle>
                                                            </CardHeader>
                                                            <CardContent>
                                                                  <Tabs defaultValue="present">
                                                                        <TabsList className="grid w-full grid-cols-2">
                                                                              <TabsTrigger value="present">Present</TabsTrigger>
                                                                              <TabsTrigger value="permanent">Permanent</TabsTrigger>
                                                                        </TabsList>
                                                                        <TabsContent value="present" className="space-y-2 mt-4">
                                                                              {userData?.address.presentCity && (
                                                                                    <div className="flex items-start gap-2">
                                                                                          <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                                                                          <div>
                                                                                                <p>{userData?.address.presentCity.label}</p>
                                                                                                <p className="text-sm text-muted-foreground">
                                                                                                      {userData?.address.presentDivision.label}, {userData?.address.presentCountry.label}
                                                                                                </p>
                                                                                          </div>
                                                                                    </div>
                                                                              )}
                                                                        </TabsContent>
                                                                        <TabsContent value="permanent" className="space-y-2 mt-4">
                                                                              {userData?.address.permanentCity && (
                                                                                    <div className="flex items-start gap-2">
                                                                                          <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                                                                          <div>
                                                                                                <p>{userData?.address.permanentCity.label}</p>
                                                                                                <p className="text-sm text-muted-foreground">
                                                                                                      {userData?.address.permanentDivision.label}, {userData?.address.permanentCountry.label}
                                                                                                </p>
                                                                                          </div>
                                                                                    </div>
                                                                              )}
                                                                        </TabsContent>
                                                                  </Tabs>
                                                            </CardContent>
                                                      </Card>
                                                )}
                                          </div>
                                    </div>
                              </section>

                              {/* Experience Section */}
                              <section id="experience" className="pb-8 pt-2 ">
                                    <h2 className="text-3xl font-bold mb-8">Work Experience</h2>
                                    {userData?.experience && userData?.experience.length > 0 ? (
                                          <div className="grid gap-6">
                                                {userData?.experience.map((exp: any) => (
                                                      <Card key={exp._id}>
                                                            <CardHeader>
                                                                  <div className="flex justify-between items-start">
                                                                        <div>
                                                                              <CardTitle>{exp.title}</CardTitle>
                                                                              <CardDescription>{exp.companyName}</CardDescription>
                                                                        </div>
                                                                        <Badge variant="outline">{exp.employmentType}</Badge>
                                                                  </div>
                                                            </CardHeader>
                                                            <CardContent className="space-y-4">
                                                                  <div className="flex items-center justify-between text-sm">
                                                                        <div className="flex items-center gap-2">
                                                                              <MapPin className="h-4 w-4 text-muted-foreground" />
                                                                              <span>{exp.location}</span>
                                                                        </div>
                                                                        <div>
                                                                              {exp.startDate && (
                                                                                    <span>
                                                                                          {exp.startDate.month} {exp.startDate.year} -{" "}
                                                                                          {exp.currentlyWorking ? "Present" : `${exp.endDate.month} ${exp.endDate.year}`}
                                                                                    </span>
                                                                              )}
                                                                        </div>
                                                                  </div>
                                                                  <p>{exp.description}</p>
                                                                  {exp?.skills && exp?.skills.length > 0 && (
                                                                        <div className="flex flex-wrap gap-2">
                                                                              {exp?.skills.map((skill: any, index: any) => (
                                                                                    <Badge key={index} variant="secondary">
                                                                                          {skill}
                                                                                    </Badge>
                                                                              ))}
                                                                        </div>
                                                                  )}
                                                            </CardContent>
                                                      </Card>
                                                ))}
                                          </div>
                                    ) : (
                                          <Card>
                                                <CardContent className="py-8 text-center text-muted-foreground">
                                                      No work experience data available.
                                                </CardContent>
                                          </Card>
                                    )}
                              </section>

                              {/* Education Section */}
                              <section id="education" className="pb-8 pt-2">
                                    <h2 className="text-3xl font-bold mb-8">Education</h2>
                                    {userData?.education && userData?.education.length > 0 ? (
                                          <div className="grid gap-6 md:grid-cols-2">
                                                {userData?.education.map((edu: any) => (
                                                      <Card key={edu._id}>
                                                            <CardHeader>
                                                                  <CardTitle>{edu.universityName}</CardTitle>
                                                                  <CardDescription>
                                                                        {edu.degree && edu.degree.toUpperCase()} in {edu.major}
                                                                  </CardDescription>
                                                            </CardHeader>
                                                            <CardContent className="space-y-2">
                                                                  <div className="flex justify-between text-sm">
                                                                        <span className="text-muted-foreground">{edu["location/board"]}</span>
                                                                        <span>Graduated: {edu.graduationYear}</span>
                                                                  </div>
                                                                  {edu.grade_show && edu["gpa/cgpa"] && (
                                                                        <div className="flex justify-between">
                                                                              <span className="text-muted-foreground">GPA/CGPA:</span>
                                                                              <span>{edu["gpa/cgpa"]}</span>
                                                                        </div>
                                                                  )}
                                                            </CardContent>
                                                      </Card>
                                                ))}
                                          </div>
                                    ) : (
                                          <Card>
                                                <CardContent className="py-8 text-center text-muted-foreground">No education data available.</CardContent>
                                          </Card>
                                    )}
                              </section>

                              {/* Skills & Certifications Section */}
                              <section id="skills" className="pb-8 pt-2">
                                    <div className="grid md:gap-8 gap-6 md:grid-cols-2">
                                          <div>
                                                <h2 className="text-3xl font-bold mb-8">Skills</h2>
                                                {userData?.skills && userData?.skills.skills && userData?.skills.skills.length > 0 ? (
                                                      <Card>
                                                            <CardContent className="py-6">
                                                                  <div className="flex flex-wrap gap-2">
                                                                        {userData?.skills.skills.map((skill: any, index: any) => (
                                                                              <Badge key={index} className="px-3 py-1 text-sm">
                                                                                    {skill}
                                                                              </Badge>
                                                                        ))}
                                                                  </div>
                                                            </CardContent>
                                                      </Card>
                                                ) : (
                                                      <Card>
                                                            <CardContent className="py-8 text-center text-muted-foreground">
                                                                  No skills data available.
                                                            </CardContent>
                                                      </Card>
                                                )}
                                          </div>
                                          <div>
                                                <h2 className="text-3xl font-bold mb-8">Certifications</h2>
                                                {userData?.certifications && userData?.certifications.length > 0 ? (
                                                      <div className="space-y-4">
                                                            {userData?.certifications.map((cert: any) => (
                                                                  <Card key={cert._id}>
                                                                        <CardContent className="py-6">
                                                                              <div className="flex justify-between items-center">
                                                                                    <div>
                                                                                          <h3 className="font-medium">{cert.fullName}</h3>
                                                                                          <p className="text-sm text-muted-foreground">Year: {cert.year}</p>
                                                                                    </div>
                                                                                    {cert.file && (
                                                                                          <Button variant="outline" size="sm" asChild>
                                                                                                <Link href={cert.file} target="_blank" rel="noopener noreferrer">
                                                                                                      View Certificate
                                                                                                </Link>
                                                                                          </Button>
                                                                                    )}
                                                                              </div>
                                                                        </CardContent>
                                                                  </Card>
                                                            ))}
                                                      </div>
                                                ) : (
                                                      <Card>
                                                            <CardContent className="py-8 text-center text-muted-foreground">
                                                                  No certification data available.
                                                            </CardContent>
                                                      </Card>
                                                )}
                                          </div>
                                    </div>
                              </section>
                              {/* border */}

                              {/* Contact Section */}
                              <section id="contact" className="py-4 md:py-12  md:w-auto w-[300px] overflow-">
                                    <h2 className="text-3xl font-bold mb-8">Contact Me</h2>
                                    <div className="grid gap-8 md:grid-cols-2">
                                          <Card>
                                                <CardHeader>
                                                      <CardTitle>Contact Information</CardTitle>
                                                      <CardDescription>Feel free to reach out through any of these channels</CardDescription>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                      {userData?.email && (
                                                            <div className="flex items-center gap-3">
                                                                  <Mail className="h-5 w-5 text-muted-foreground" />
                                                                  <div>
                                                                        <p className="font-medium">Email</p>
                                                                        <p className="text-sm text-muted-foreground">{userData?.email}</p>
                                                                  </div>
                                                            </div>
                                                      )}
                                                      {userData?.phone_number && (
                                                            <div className="flex items-center gap-3">
                                                                  <Phone className="h-5 w-5 text-muted-foreground" />
                                                                  <div>
                                                                        <p className="font-medium">Phone</p>
                                                                        <p className="text-sm text-muted-foreground">{userData?.phone_number}</p>
                                                                  </div>
                                                            </div>
                                                      )}
                                                      {userData?.address && userData?.address.presentCity && (
                                                            <div className="flex items-center gap-3">
                                                                  <MapPin className="h-5 w-5 text-muted-foreground" />
                                                                  <div>
                                                                        <p className="font-medium">Location</p>
                                                                        <p className="text-sm text-muted-foreground">
                                                                              {userData?.address.presentCity.label}, {userData?.address.presentCountry.label}
                                                                        </p>
                                                                  </div>
                                                            </div>
                                                      )}
                                                      {userData?.social_links && userData?.social_links.length > 0 && (
                                                            <div className="pt-4">
                                                                  <p className="font-medium mb-2">Social Links</p>
                                                                  <div className="flex gap-2">
                                                                        {userData?.social_links.map((link: any, index: any) => (
                                                                              <Button key={index} variant="outline" size="sm" asChild>
                                                                                    <Link href={link} target="_blank" rel="noopener noreferrer">
                                                                                          Website <ArrowUpRight className="ml-1 h-3 w-3" />
                                                                                    </Link>
                                                                              </Button>
                                                                        ))}
                                                                  </div>
                                                            </div>
                                                      )}
                                                </CardContent>
                                          </Card>
                                          <Card>
                                                <CardHeader>
                                                      <CardTitle>Send Me a Message</CardTitle>
                                                      <CardDescription>Fill out the form below and I'll get back to you as soon as possible</CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                      <form className="space-y-4">
                                                            <div className="grid gap-4 md:grid-cols-2">
                                                                  <div className="space-y-2">
                                                                        <label htmlFor="name" className="text-sm font-medium">
                                                                              Name
                                                                        </label>
                                                                        <input
                                                                              id="name"
                                                                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                                              placeholder="Your name"
                                                                        />
                                                                  </div>
                                                                  <div className="space-y-2">
                                                                        <label htmlFor="email" className="text-sm font-medium">
                                                                              Email
                                                                        </label>
                                                                        <input
                                                                              id="email"
                                                                              type="email"
                                                                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                                              placeholder="Your email"
                                                                        />
                                                                  </div>
                                                            </div>
                                                            <div className="space-y-2">
                                                                  <label htmlFor="subject" className="text-sm font-medium">
                                                                        Subject
                                                                  </label>
                                                                  <input
                                                                        id="subject"
                                                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                                        placeholder="Subject of your message"
                                                                  />
                                                            </div>
                                                            <div className="space-y-2">
                                                                  <label htmlFor="message" className="text-sm font-medium">
                                                                        Message
                                                                  </label>
                                                                  <textarea
                                                                        id="message"
                                                                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                                        placeholder="Your message"
                                                                  />
                                                            </div>
                                                            <Button type="submit" className="w-full">
                                                                  Send Message
                                                            </Button>
                                                      </form>
                                                </CardContent>
                                          </Card>
                                    </div>
                              </section>
                        </main>

                        {/* Footer */}
                        <footer className="border-t py-6 md:py-8">
                              <div className="container flex flex-col items-center justify-center gap-4 text-center md:flex-row md:justify-between">
                                    <p className="text-sm text-muted-foreground">
                                          &copy; {new Date().getFullYear()} {userData?.fullName || userData?.fullName}. All rights reserved.
                                    </p>
                                    <div className="flex gap-4">
                                          {userData?.social_links && userData?.social_links.length > 0 && (
                                                <Link
                                                      href={userData?.social_links[0]}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className="text-sm text-muted-foreground hover:text-foreground"
                                                >
                                                      Portfolio
                                                </Link>
                                          )}
                                    </div>
                              </div>
                        </footer>

                  </div>
                  <div className="flex border bg-gray-50 text-white border-gray-200 py-2 px-4 rounded-t-md  items-center justify-center gap-2">
                        <span className="text-sm text-muted-foreground">Powered by</span>
                        <div className="flex items-center">
                              <Image
                                    src="/icons/logo.svg"
                                    alt="Kalbela Jobs Logo"
                                    width={70}
                                    height={70}
                                    className="mr-1"
                              />
                        </div>
                  </div>
            </div>
      );
};

export default ShareProfilePage;

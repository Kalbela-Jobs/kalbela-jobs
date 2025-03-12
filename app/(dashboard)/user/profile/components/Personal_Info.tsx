"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Camera, User, Phone, Briefcase, MapPin, FileText, GraduationCap, BarChart2, Award, Building, Globe, LinkIcon, Users, Trophy, Pencil, Save, X, Monitor, View, Eye } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import {
      Dialog,
      DialogTrigger,
      DialogContent,
      DialogHeader,
      DialogFooter,
      DialogTitle,
      DialogDescription,
      DialogClose,
      DialogOverlay,
      DialogPortal
} from "@/components/ui/dialog"
import { AccomplishmentDialog } from "./small_components/accomplishment-dialog"
import { useMediaQuery } from "@/app/hooks/use_media_query"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/collapsible"
import { useUserData } from "@/utils/encript_decript"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import Address from "./Address"
import PersonalDetailsEdit from "./small_components/PersonalDetailsEdit"
import Profile_update from "./small_components/Profile_update"
import ContactUpdate from "./small_components/Contact_update"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import { useRouter } from "next/navigation"
import { encryptId } from "@/utils/encriptDecriptGenarator"


export default function ProfileForm() {

      const isMobile = useMediaQuery("(max-width: 768px)")
      const [activeSection, setActiveSection] = useState<string | null>(null)
      const [activeTab, setActiveTab] = useState("home")
      const [isEditing, setIsEditing] = useState(false)



      // Load active tab from localStorage on component mount
      useEffect(() => {
            const savedTab = localStorage.getItem("activeProfileTab")
            if (savedTab) {
                  setActiveTab(savedTab)
            }
      }, [])

      // Save active tab to localStorage when it changes
      useEffect(() => {
            localStorage.setItem("activeProfileTab", activeTab)
      }, [activeTab])

      const handleTabChange = (value: string) => {
            setActiveTab(value)
      }

      const toggleEditMode = () => {
            setIsEditing(!isEditing)
      }

      const handleSave = () => {
            // Here you would typically save the form data
            setIsEditing(false)
      }

      if (isMobile === null) {
            return (
                  <div className="flex items-center justify-center h-12">
                        <LoadingSpinner size="medium" className="text-primary" />
                  </div>
            )
      }
      if (isMobile) {
            return (
                  <MobileProfileView
                        activeSection={activeSection}
                        setActiveSection={setActiveSection}
                        isEditing={isEditing}
                        toggleEditMode={toggleEditMode}
                        handleSave={handleSave}
                  />
            )
      }

      // @ts-ignore

      return (
            <DesktopProfileView
                  activeTab={activeTab}
                  handleTabChange={handleTabChange}
                  isEditing={isEditing}
                  toggleEditMode={toggleEditMode}
                  handleSave={handleSave}
            />
      )
}

function MobileProfileView({
      activeSection,
      setActiveSection,
      isEditing,
      toggleEditMode,
      handleSave,
}: {
      activeSection: string | null
      setActiveSection: (section: string | null) => void
      isEditing: boolean
      toggleEditMode: () => void
      handleSave: () => void
}) {

      const [user, setUserData] = useUserData()
      if (activeSection === "personalDetails") {
            return (
                  <PersonalDetailsEdit setActiveSection={setActiveSection} />
            )
      }
      if (activeSection === "profilePhoto") {
            return (
                  <Profile_update setActiveSection={setActiveSection} />
            )
      }
      if (activeSection === "contactDetails") {
            return (
                  <ContactUpdate setActiveSection={setActiveSection} />
            )
      }

      const router = useRouter()
      const shareProfileHandler = (id: string) => {
            const encryptedId = encodeURIComponent(encryptId(id));
            router.push(`/portfolio/${encryptedId}`);

      }

      return (

            <div className=" mb-20 rounded bg-gray-100">
                  <div className="bg-light-theme py-4 dark:bg-dark-theme text-white flex flex-col items-center rounded-t-lg">
                        <div className="relative w-20 h-20 bg-gray-300 rounded-full overflow-hidden mb-2">
                              <Image
                                    src={user?.profile_picture}
                                    alt="Profile"
                                    width={80}
                                    height={80}
                                    className="object-scale-down w-full h-full"
                              />
                        </div>
                        <h1 className="text-xl text-black font-medium">{user?.fullName}</h1>
                  </div>

                  <div className="bg-gray-100 p-4">
                        <div className="text-lg font-medium mb-2 text-center">Statistics of Kalbela Jobs Profile</div>
                        <div className="grid grid-cols-3 gap-2">
                              <div className="bg-white p-4 rounded-md flex flex-col items-center">
                                    <div className="text-2xl font-bold">0</div>
                                    <div className="text-gray-500 text-sm">Viewed</div>
                              </div>
                              <div className="bg-white p-4 rounded-md flex flex-col items-center">
                                    <div className="text-2xl font-bold">0</div>
                                    <div className="text-gray-500 text-sm">Downloaded</div>
                              </div>
                              <div className="bg-white p-4 rounded-md flex flex-col items-center">
                                    <div className="text-2xl font-bold">0</div>
                                    <div className="text-gray-500 text-sm">Emailed</div>
                              </div>
                        </div>
                  </div>

                  <hr className="my-4" />
                  <div className="p-4 bg-gray-100">
                        <h2 className="text-gray-500 mb-4">Personal Information</h2>
                        <div className="space-y-4">
                              <Button variant="outline" className="w-full justify-start bg-white" onClick={() => setActiveSection("profilePhoto")}>
                                    <Camera className="mr-2 h-5 w-5 text-gray-500" />
                                    Upload Photo
                              </Button>

                              <Button
                                    variant="outline"
                                    className="w-full justify-start bg-white"
                                    onClick={() => setActiveSection("personalDetails")}
                              >
                                    <User className="mr-2 h-5 w-5 text-gray-500" />
                                    Personal Details
                              </Button>

                              <Button variant="outline" className="w-full justify-start bg-white" onClick={() => setActiveSection("contactDetails")}>
                                    <Phone className="mr-2 h-5 w-5 text-gray-500" />
                                    Contact Details
                              </Button>

                              <Button variant="outline" className="w-full justify-start bg-white" onClick={() => { }}>
                                    <Briefcase className="mr-2 h-5 w-5 text-gray-500" />
                                    Career and Application Information
                              </Button>

                              <Button variant="outline" className="w-full justify-start bg-white" onClick={() => { }}>
                                    <MapPin className="mr-2 h-5 w-5 text-gray-500" />
                                    Preferred Areas
                              </Button>

                              <Button variant="outline" className="w-full justify-start bg-white" onClick={() => { }}>
                                    <FileText className="mr-2 h-5 w-5 text-gray-500" />
                                    Other Relevant Information
                              </Button>
                        </div>
                  </div>

                  <div className="p-4">
                        <h2 className="text-gray-500 mb-4">Education / Training</h2>
                        <div className="space-y-4">
                              <Button variant="outline" className="w-full justify-start bg-white" onClick={() => { }}>
                                    <GraduationCap className="mr-2 h-5 w-5 text-gray-500" />
                                    Academic Qualification
                              </Button>

                              <Button variant="outline" className="w-full justify-start bg-white" onClick={() => { }}>
                                    <BarChart2 className="mr-2 h-5 w-5 text-gray-500" />
                                    Training Summary
                              </Button>

                              <Button variant="outline" className="w-full justify-start bg-white" onClick={() => { }}>
                                    <Award className="mr-2 h-5 w-5 text-gray-500" />
                                    Professional Certification Summary
                              </Button>
                        </div>
                  </div>

                  <div className="p-4">
                        <h2 className="text-gray-500 mb-4">Employment History</h2>
                        <div className="space-y-4">
                              <Button variant="outline" className="w-full justify-start bg-white" onClick={() => { }}>
                                    <Building className="mr-2 h-5 w-5 text-gray-500" />
                                    Employment History
                              </Button>

                              <Button variant="outline" className="w-full justify-start bg-white" onClick={() => { }}>
                                    <Building className="mr-2 h-5 w-5 text-gray-500" />
                                    Employment History (Retired Army Person)
                              </Button>
                        </div>
                  </div>

                  <div className="p-4">
                        <h2 className="text-gray-500 mb-4">Skills & Others</h2>
                        <div className="space-y-4">
                              <Button variant="outline" className="w-full justify-start bg-white" onClick={() => { }}>
                                    <BarChart2 className="mr-2 h-5 w-5 text-gray-500" />
                                    Skill
                              </Button>

                              <Button variant="outline" className="w-full justify-start bg-white" onClick={() => { }}>
                                    <Globe className="mr-2 h-5 w-5 text-gray-500" />
                                    Language Proficiency
                              </Button>

                              <Button variant="outline" className="w-full justify-start bg-white" onClick={() => { }}>
                                    <LinkIcon className="mr-2 h-5 w-5 text-gray-500" />
                                    Link Account
                              </Button>

                              <Button variant="outline" className="w-full justify-start bg-white" onClick={() => { }}>
                                    <Users className="mr-2 h-5 w-5 text-gray-500" />
                                    References
                              </Button>
                        </div>
                  </div>

                  <div className="p-4">
                        <h2 className="text-gray-500 mb-4">Accomplishment</h2>
                        <div className="space-y-4">
                              <Button variant="outline" className="w-full justify-start bg-white" onClick={() => { }}>
                                    <Trophy className="mr-2 h-5 w-5 text-gray-500" />
                                    Accomplishment
                              </Button>
                              <p className="text-gray-500 text-sm px-2">
                                    Select & Add your portfolio, Project, Paper/Journal, Publication, etc to enhance your profile
                              </p>
                        </div>
                  </div>

                  <div className="fixed bottom-20 right-4">
                        <Button onClick={() => shareProfileHandler(user?._id)} className="rounded-full h-10 w-10 bg-green-500 hover:bg-green-600">
                              <Eye className="h-6 w-6" />
                        </Button>
                  </div>
            </div>

      )
}

function DesktopProfileView({
      activeTab,
      handleTabChange,
      isEditing,
      toggleEditMode,
      handleSave,
}: {
      activeTab: string
      handleTabChange: (value: string) => void
      isEditing: boolean
      toggleEditMode: () => void
      handleSave: () => void
}) {
      const [activeDialog, setActiveDialog] = useState<"portfolio" | "publication" | "award" | "project" | "other" | null>(null)

      const handleSaveAccomplishment = (data: any) => {
            console.log("Saving accomplishment:", data)
            // Handle saving the accomplishment data here
      }

      return (
            <div>
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                              <TabsList className="w-full justify-start p-0 h-auto bg-transparent border-b">
                                    <TabsTrigger
                                          value="home"
                                          className="px-6 py-3 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none"
                                    >
                                          Home
                                    </TabsTrigger>
                                    <TabsTrigger
                                          value="education"
                                          className="px-6 py-3 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none"
                                    >
                                          Education/Training
                                    </TabsTrigger>
                                    <TabsTrigger
                                          value="employment"
                                          className="px-6 py-3 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none"
                                    >
                                          Employment
                                    </TabsTrigger>
                                    <TabsTrigger
                                          value="other"
                                          className="px-6 py-3 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none"
                                    >
                                          Other Information
                                    </TabsTrigger>
                                    <TabsTrigger
                                          value="accomplishment"
                                          className="px-6 py-3 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none"
                                    >
                                          Accomplishment
                                    </TabsTrigger>
                              </TabsList>

                              <TabsContent value="home" className="m-0">
                                    <div className="p-4 border-b flex items-center justify-between">
                                          <h1 className="text-lg font-medium">Personal Details</h1>
                                          {isEditing ? (
                                                <div className="flex items-center space-x-2">
                                                      <Button variant="outline" size="sm" onClick={handleSave}>
                                                            <Save className="h-4 w-4 mr-2" />
                                                            Save
                                                      </Button>
                                                      <Button variant="outline" size="sm" onClick={toggleEditMode}>
                                                            <X className="h-4 w-4 mr-2" />
                                                            Cancel
                                                      </Button>
                                                </div>
                                          ) : (
                                                <Button variant="outline" size="sm" onClick={toggleEditMode}>
                                                      <Pencil className="h-4 w-4 mr-2" />
                                                      Edit
                                                </Button>
                                          )}
                                    </div>

                                    <div className="p-6">
                                          <div className="grid grid-cols-12 gap-6">
                                                <div className="col-span-2 flex flex-col items-center">
                                                      <div className="w-24 h-24 bg-gray-200 rounded-md mb-2 flex items-center justify-center">
                                                            <User className="h-12 w-12 text-gray-400" />
                                                      </div>
                                                      <Button variant="outline" size="sm" disabled={!isEditing}>
                                                            Change Photo
                                                      </Button>
                                                </div>

                                                <div className="col-span-10">
                                                      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                                            <div>
                                                                  <Label htmlFor="desktop-firstName">First Name</Label>
                                                                  <Input
                                                                        id="desktop-firstName"
                                                                        placeholder="First Name"
                                                                        readOnly={!isEditing}
                                                                        className={!isEditing ? "bg-gray-50" : ""}
                                                                        defaultValue="John"
                                                                  />
                                                            </div>
                                                            <div>
                                                                  <Label htmlFor="desktop-lastName">Last Name</Label>
                                                                  <Input
                                                                        id="desktop-lastName"
                                                                        placeholder="Last Name"
                                                                        readOnly={!isEditing}
                                                                        className={!isEditing ? "bg-gray-50" : ""}
                                                                        defaultValue="Doe"
                                                                  />
                                                            </div>
                                                            <div>
                                                                  <Label htmlFor="desktop-fathersName">Father's Name</Label>
                                                                  <Input
                                                                        id="desktop-fathersName"
                                                                        placeholder="Father's Name"
                                                                        readOnly={!isEditing}
                                                                        className={!isEditing ? "bg-gray-50" : ""}
                                                                        defaultValue="James Doe"
                                                                  />
                                                            </div>
                                                            <div>
                                                                  <Label htmlFor="desktop-mothersName">Mother's Name</Label>
                                                                  <Input
                                                                        id="desktop-mothersName"
                                                                        placeholder="Mother's Name"
                                                                        readOnly={!isEditing}
                                                                        className={!isEditing ? "bg-gray-50" : ""}
                                                                        defaultValue="Mary Doe"
                                                                  />
                                                            </div>
                                                            <div>
                                                                  <Label htmlFor="desktop-dob">Date of Birth</Label>
                                                                  <Input
                                                                        id="desktop-dob"
                                                                        type="date"
                                                                        readOnly={!isEditing}
                                                                        className={!isEditing ? "bg-gray-50" : ""}
                                                                        defaultValue="1990-01-01"
                                                                  />
                                                            </div>
                                                            <div>
                                                                  <Label htmlFor="desktop-gender">Gender</Label>
                                                                  <Select disabled={!isEditing}>
                                                                        <SelectTrigger id="desktop-gender" className={!isEditing ? "bg-gray-50" : ""}>
                                                                              <SelectValue placeholder="Male" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                              <SelectItem value="male">Male</SelectItem>
                                                                              <SelectItem value="female">Female</SelectItem>
                                                                              <SelectItem value="other">Other</SelectItem>
                                                                        </SelectContent>
                                                                  </Select>
                                                            </div>
                                                            <div>
                                                                  <Label htmlFor="desktop-religion">Religion</Label>
                                                                  <Input
                                                                        id="desktop-religion"
                                                                        placeholder="Religion"
                                                                        readOnly={!isEditing}
                                                                        className={!isEditing ? "bg-gray-50" : ""}
                                                                        defaultValue="Christianity"
                                                                  />
                                                            </div>
                                                            <div>
                                                                  <Label htmlFor="desktop-nationality">Nationality</Label>
                                                                  <Input
                                                                        id="desktop-nationality"
                                                                        placeholder="Nationality"
                                                                        readOnly={!isEditing}
                                                                        className={!isEditing ? "bg-gray-50" : ""}
                                                                        defaultValue="American"
                                                                  />
                                                            </div>
                                                            <div>
                                                                  <Label htmlFor="desktop-passportNumber">Passport Number</Label>
                                                                  <Input
                                                                        id="desktop-passportNumber"
                                                                        placeholder="Passport Number"
                                                                        readOnly={!isEditing}
                                                                        className={!isEditing ? "bg-gray-50" : ""}
                                                                        defaultValue="AB123456"
                                                                  />
                                                            </div>
                                                            <div>
                                                                  <Label htmlFor="desktop-passportIssueDate">Passport Issue Date</Label>
                                                                  <Input
                                                                        id="desktop-passportIssueDate"
                                                                        type="date"
                                                                        readOnly={!isEditing}
                                                                        className={!isEditing ? "bg-gray-50" : ""}
                                                                        defaultValue="2018-05-15"
                                                                  />
                                                            </div>
                                                            <div>
                                                                  <Label htmlFor="desktop-primaryMobile">Primary Mobile</Label>
                                                                  <Input
                                                                        id="desktop-primaryMobile"
                                                                        placeholder="Primary Mobile"
                                                                        readOnly={!isEditing}
                                                                        className={!isEditing ? "bg-gray-50" : ""}
                                                                        defaultValue="+1 234 567 8901"
                                                                  />
                                                            </div>
                                                            <div>
                                                                  <Label htmlFor="desktop-secondaryMobile">Secondary Mobile</Label>
                                                                  <Input
                                                                        id="desktop-secondaryMobile"
                                                                        placeholder="Secondary Mobile"
                                                                        readOnly={!isEditing}
                                                                        className={!isEditing ? "bg-gray-50" : ""}
                                                                        defaultValue="+1 987 654 3210"
                                                                  />
                                                            </div>
                                                            <div>
                                                                  <Label htmlFor="desktop-alternateEmail">Alternate Email</Label>
                                                                  <Input
                                                                        id="desktop-alternateEmail"
                                                                        type="email"
                                                                        placeholder="Alternate Email"
                                                                        readOnly={!isEditing}
                                                                        className={!isEditing ? "bg-gray-50" : ""}
                                                                        defaultValue="john.alt@example.com"
                                                                  />
                                                            </div>
                                                            <div>
                                                                  <Label htmlFor="desktop-email">Email</Label>
                                                                  <div className="flex items-center space-x-2">
                                                                        <Input
                                                                              id="desktop-email"
                                                                              type="email"
                                                                              value="john.doe@example.com"
                                                                              readOnly
                                                                              className="bg-gray-50"
                                                                        />
                                                                        <Button variant="outline" size="sm" className="whitespace-nowrap" disabled={!isEditing}>
                                                                              Change Email
                                                                        </Button>
                                                                  </div>
                                                            </div>
                                                            <div>
                                                                  <Label htmlFor="desktop-height">Height (cm)</Label>
                                                                  <Input
                                                                        id="desktop-height"
                                                                        type="number"
                                                                        placeholder="Height"
                                                                        readOnly={!isEditing}
                                                                        className={!isEditing ? "bg-gray-50" : ""}
                                                                        defaultValue="175"
                                                                  />
                                                            </div>
                                                            <div>
                                                                  <Label htmlFor="desktop-weight">Weight (kg)</Label>
                                                                  <Input
                                                                        id="desktop-weight"
                                                                        type="number"
                                                                        placeholder="Weight"
                                                                        readOnly={!isEditing}
                                                                        className={!isEditing ? "bg-gray-50" : ""}
                                                                        defaultValue="70"
                                                                  />
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>

                                    <div className="p-4 border-t">
                                          <Collapsible className="w-full">
                                                <CollapsibleTrigger className="flex items-center justify-between w-full">
                                                      <h2 className="text-lg font-medium">Address Details</h2>
                                                      {isEditing && <Pencil className="h-4 w-4 text-gray-500" />}
                                                </CollapsibleTrigger>
                                                <CollapsibleContent className="pt-4">
                                                      <Address />
                                                </CollapsibleContent>
                                          </Collapsible>
                                    </div>

                                    <div className="p-4 border-t">
                                          <Collapsible className="w-full">
                                                <CollapsibleTrigger className="flex items-center justify-between w-full">
                                                      <h2 className="text-lg font-medium">Career and Application Information</h2>
                                                      {isEditing && <Pencil className="h-4 w-4 text-gray-500" />}
                                                </CollapsibleTrigger>
                                                <CollapsibleContent className="pt-4">
                                                      <div className="space-y-4">
                                                            <div>
                                                                  <Label>Career Objective</Label>
                                                                  <Input
                                                                        placeholder="Career Objective"
                                                                        readOnly={!isEditing}
                                                                        defaultValue="Seeking a challenging position in a reputable organization"
                                                                  />
                                                            </div>
                                                            <div>
                                                                  <Label>Job Level</Label>
                                                                  <Select disabled={!isEditing}>
                                                                        <SelectTrigger>
                                                                              <SelectValue placeholder="Mid Level" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                              <SelectItem value="entry">Entry Level</SelectItem>
                                                                              <SelectItem value="mid">Mid Level</SelectItem>
                                                                              <SelectItem value="senior">Senior Level</SelectItem>
                                                                        </SelectContent>
                                                                  </Select>
                                                            </div>
                                                      </div>
                                                </CollapsibleContent>
                                          </Collapsible>
                                    </div>

                                    <div className="p-4 border-t">
                                          <Collapsible className="w-full">
                                                <CollapsibleTrigger className="flex items-center justify-between w-full">
                                                      <h2 className="text-lg font-medium">Preferred Areas</h2>
                                                      {isEditing && <Pencil className="h-4 w-4 text-gray-500" />}
                                                </CollapsibleTrigger>
                                                <CollapsibleContent className="pt-4">
                                                      <div className="space-y-4">
                                                            <div>
                                                                  <Label>Preferred Job Categories</Label>
                                                                  <Select disabled={!isEditing}>
                                                                        <SelectTrigger>
                                                                              <SelectValue placeholder="IT & Telecommunication" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                              <SelectItem value="it">IT & Telecommunication</SelectItem>
                                                                              <SelectItem value="marketing">Marketing</SelectItem>
                                                                              <SelectItem value="finance">Finance</SelectItem>
                                                                        </SelectContent>
                                                                  </Select>
                                                            </div>
                                                            <div>
                                                                  <Label>Preferred Job Locations</Label>
                                                                  <Select disabled={!isEditing}>
                                                                        <SelectTrigger>
                                                                              <SelectValue placeholder="New York" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                              <SelectItem value="newyork">New York</SelectItem>
                                                                              <SelectItem value="sanfrancisco">San Francisco</SelectItem>
                                                                              <SelectItem value="chicago">Chicago</SelectItem>
                                                                        </SelectContent>
                                                                  </Select>
                                                            </div>
                                                      </div>
                                                </CollapsibleContent>
                                          </Collapsible>
                                    </div>

                                    <div className="p-4 border-t">
                                          <Collapsible className="w-full">
                                                <CollapsibleTrigger className="flex items-center justify-between w-full">
                                                      <h2 className="text-lg font-medium">Other Relevant Information</h2>
                                                      {isEditing && <Pencil className="h-4 w-4 text-gray-500" />}
                                                </CollapsibleTrigger>
                                                <CollapsibleContent className="pt-4">
                                                      <div className="space-y-4">
                                                            <div>
                                                                  <Label>Expected Salary</Label>
                                                                  <Input placeholder="Expected Salary" readOnly={!isEditing} defaultValue="$80,000 - $100,000" />
                                                            </div>
                                                            <div>
                                                                  <Label>Available For</Label>
                                                                  <Select disabled={!isEditing}>
                                                                        <SelectTrigger>
                                                                              <SelectValue placeholder="Full Time" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                              <SelectItem value="fulltime">Full Time</SelectItem>
                                                                              <SelectItem value="parttime">Part Time</SelectItem>
                                                                              <SelectItem value="contract">Contract</SelectItem>
                                                                        </SelectContent>
                                                                  </Select>
                                                            </div>
                                                      </div>
                                                </CollapsibleContent>
                                          </Collapsible>
                                    </div>
                              </TabsContent>

                              <TabsContent value="education" className="m-0">
                                    <div className="p-4 border-b flex items-center justify-between">
                                          <h1 className="text-lg font-medium">Education & Training</h1>
                                          {isEditing ? (
                                                <div className="flex items-center space-x-2">
                                                      <Button variant="outline" size="sm" onClick={handleSave}>
                                                            <Save className="h-4 w-4 mr-2" />
                                                            Save
                                                      </Button>
                                                      <Button variant="outline" size="sm" onClick={toggleEditMode}>
                                                            <X className="h-4 w-4 mr-2" />
                                                            Cancel
                                                      </Button>
                                                </div>
                                          ) : (
                                                <Button variant="outline" size="sm" onClick={toggleEditMode}>
                                                      <Pencil className="h-4 w-4 mr-2" />
                                                      Edit
                                                </Button>
                                          )}
                                    </div>
                                    <div className="p-6">
                                          <div className="space-y-6">
                                                <div>
                                                      <h2 className="text-lg font-medium mb-4">Academic Qualification</h2>
                                                      <div className="bg-gray-50 p-4 rounded-md">
                                                            <p className="text-gray-500">No academic qualifications added yet.</p>
                                                            {isEditing && (
                                                                  <Button variant="outline" size="sm" className="mt-2">
                                                                        Add Qualification
                                                                  </Button>
                                                            )}
                                                      </div>
                                                </div>

                                                <div>
                                                      <h2 className="text-lg font-medium mb-4">Training Summary</h2>
                                                      <div className="bg-gray-50 p-4 rounded-md">
                                                            <p className="text-gray-500">No training records added yet.</p>
                                                            {isEditing && (
                                                                  <Button variant="outline" size="sm" className="mt-2">
                                                                        Add Training
                                                                  </Button>
                                                            )}
                                                      </div>
                                                </div>

                                                <div>
                                                      <h2 className="text-lg font-medium mb-4">Professional Certification</h2>
                                                      <div className="bg-gray-50 p-4 rounded-md">
                                                            <p className="text-gray-500">No certifications added yet.</p>
                                                            {isEditing && (
                                                                  <Button variant="outline" size="sm" className="mt-2">
                                                                        Add Certification
                                                                  </Button>
                                                            )}
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </TabsContent>

                              <TabsContent value="employment" className="m-0">
                                    <div className="p-4 border-b flex items-center justify-between">
                                          <h1 className="text-lg font-medium">Employment History</h1>
                                          {isEditing ? (
                                                <div className="flex items-center space-x-2">
                                                      <Button variant="outline" size="sm" onClick={handleSave}>
                                                            <Save className="h-4 w-4 mr-2" />
                                                            Save
                                                      </Button>
                                                      <Button variant="outline" size="sm" onClick={toggleEditMode}>
                                                            <X className="h-4 w-4 mr-2" />
                                                            Cancel
                                                      </Button>
                                                </div>
                                          ) : (
                                                <Button variant="outline" size="sm" onClick={toggleEditMode}>
                                                      <Pencil className="h-4 w-4 mr-2" />
                                                      Edit
                                                </Button>
                                          )}
                                    </div>
                                    <div className="p-6">
                                          <div className="bg-gray-50 p-4 rounded-md">
                                                <p className="text-gray-500">No employment history added yet.</p>
                                                {isEditing && (
                                                      <Button variant="outline" size="sm" className="mt-2">
                                                            Add Employment
                                                      </Button>
                                                )}
                                          </div>
                                    </div>
                              </TabsContent>

                              <TabsContent value="other" className="m-0">
                                    <div className="p-4 border-b flex items-center justify-between">
                                          <h1 className="text-lg font-medium">Skills & Other Information</h1>
                                          {isEditing ? (
                                                <div className="flex items-center space-x-2">
                                                      <Button variant="outline" size="sm" onClick={handleSave}>
                                                            <Save className="h-4 w-4 mr-2" />
                                                            Save
                                                      </Button>
                                                      <Button variant="outline" size="sm" onClick={toggleEditMode}>
                                                            <X className="h-4 w-4 mr-2" />
                                                            Cancel
                                                      </Button>
                                                </div>
                                          ) : (
                                                <Button variant="outline" size="sm" onClick={toggleEditMode}>
                                                      <Pencil className="h-4 w-4 mr-2" />
                                                      Edit
                                                </Button>
                                          )}
                                    </div>
                                    <div className="p-6">
                                          <div className="space-y-6">
                                                <div>
                                                      <h2 className="text-lg font-medium mb-4">Skills</h2>
                                                      <div className="bg-gray-50 p-4 rounded-md">
                                                            <p className="text-gray-500">No skills added yet.</p>
                                                            {isEditing && (
                                                                  <Button variant="outline" size="sm" className="mt-2">
                                                                        Add Skills
                                                                  </Button>
                                                            )}
                                                      </div>
                                                </div>

                                                <div>
                                                      <h2 className="text-lg font-medium mb-4">Language Proficiency</h2>
                                                      <div className="bg-gray-50 p-4 rounded-md">
                                                            <p className="text-gray-500">No languages added yet.</p>
                                                            {isEditing && (
                                                                  <Button variant="outline" size="sm" className="mt-2">
                                                                        Add Language
                                                                  </Button>
                                                            )}
                                                      </div>
                                                </div>

                                                <div>
                                                      <h2 className="text-lg font-medium mb-4">References</h2>
                                                      <div className="bg-gray-50 p-4 rounded-md">
                                                            <p className="text-gray-500">No references added yet.</p>
                                                            {isEditing && (
                                                                  <Button variant="outline" size="sm" className="mt-2">
                                                                        Add Reference
                                                                  </Button>
                                                            )}
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </TabsContent>

                              <TabsContent value="accomplishment" className="m-0">
                                    <div className="p-6">
                                          <div className="flex flex-col items-center justify-center text-center space-y-6">
                                                <div className="w-16 h-16 bg-[#001968]/10 rounded-full flex items-center justify-center">
                                                      <Monitor className="w-8 h-8 text-[#001968]" />
                                                </div>
                                                <p className="text-gray-600 max-w-lg">
                                                      Currently no data exists! Select & add your portfolio url, Papers/Journal, Publications, etc to enhance your profile
                                                </p>
                                                <div className="flex flex-wrap gap-3 justify-center">
                                                      <Button
                                                            variant="outline"
                                                            className="border-[#001968] text-[#001968] hover:bg-[#001968]/10"
                                                            onClick={() => setActiveDialog("portfolio")}
                                                      >
                                                            Portfolio
                                                      </Button>
                                                      <Button
                                                            variant="outline"
                                                            className="border-[#001968] text-[#001968] hover:bg-[#001968]/10"
                                                            onClick={() => setActiveDialog("publication")}
                                                      >
                                                            Publications
                                                      </Button>
                                                      <Button
                                                            variant="outline"
                                                            className="border-[#001968] text-[#001968] hover:bg-[#001968]/10"
                                                            onClick={() => setActiveDialog("award")}
                                                      >
                                                            Awards/Honors
                                                      </Button>
                                                      <Button
                                                            variant="outline"
                                                            className="border-[#001968] text-[#001968] hover:bg-[#001968]/10"
                                                            onClick={() => setActiveDialog("project")}
                                                      >
                                                            Projects
                                                      </Button>
                                                      <Button
                                                            variant="outline"
                                                            className="border-[#001968] text-[#001968] hover:bg-[#001968]/10"
                                                            onClick={() => setActiveDialog("other")}
                                                      >
                                                            Others
                                                      </Button>
                                                </div>
                                          </div>

                                          <AccomplishmentDialog
                                                type={activeDialog || "portfolio"}
                                                open={!!activeDialog}
                                                onOpenChange={(open) => !open && setActiveDialog(null)}
                                                onSave={handleSaveAccomplishment}
                                          />
                                    </div>
                              </TabsContent>
                        </Tabs>
                  </div>
            </div>
      )
}

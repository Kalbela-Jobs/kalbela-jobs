"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Camera, User, Phone, Briefcase, MapPin, FileText, GraduationCap, BarChart2, Award, Building, Globe, LinkIcon, Users, Trophy, Pencil, Save, X, Monitor, View, Eye, Home } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { useUserData } from "@/utils/encript_decript"
import Address from "./Address"
import { useRouter } from "next/navigation"
import { encryptId } from "@/utils/encriptDecriptGenarator"
import ProfileTabList from "./ProfileTabList"
import PersonalDetailsContent from "./PersonalDetailsContent"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import CareerObjective from "./CareerObjective"
import PreferredAreas from "./PreferredAreas"
import OtherReleventInfo from "./OtherReleventInfo"
import DisabilityInformation from "./DisabilityInformation"
import EducationTraining from "./EducationTraining"
import { useMediaQuery } from "@/app/hooks/use_media_query"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import PersonalDetailsEdit from "./small_components/PersonalDetailsEdit"
import ProfileUpdate from "./small_components/Profile_update"
import ContactUpdate from "./small_components/Contact_update"
import TrainingSummary from "./Traning_summary";
import { AccomplishmentDialog } from "./small_components/accomplishment-dialog"
import CitificationSummary from "./CirtificationSummary"
import EmploymentHistory from "./EmployeementHistory"
import EmployeeHistoryForRetired from "./EmploymentHistoryForRetire"
import OtherSkills from "./OtherSkills"
import LanguageProficiency from "./LanguageProficency"
import ReferenceInput from "./Reference"
import LinkAccounts from "./LinksAccount"
import UserAssets from "./UserAssets"


export default function ProfileForm() {

      const isMobile = useMediaQuery("(max-width: 768px)")
      const [activeSection, setActiveSection] = useState<string | null>(null)
      const [activeTab, setActiveTab] = useState("home")
      const [isEditing, setIsEditing] = useState(false)


      useEffect(() => {
            const savedTab = localStorage.getItem("activeProfileTab")
            if (savedTab) {
                  setActiveTab(savedTab)
            }
      }, [])

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
                  <ProfileUpdate setActiveSection={setActiveSection} />
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


      return (
            <div>
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                              <ProfileTabList />

                              <TabsContent value="home" className="m-0">
                                    <Accordion defaultValue="item-1" type="single" collapsible className="w-full mt-6 space-y-3">
                                          <AccordionItem className="border" value="item-1">
                                                <AccordionTrigger className="font-regular text-lg  px-4 bg-gray-50 flex items-center gap-2">
                                                      <div className="flex items-center gap-2">
                                                            <svg
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  width={28}
                                                                  height={28}
                                                                  viewBox="0 0 24 24"
                                                                  fill="none"
                                                                  stroke="currentColor"
                                                                  strokeWidth={1}
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  className="lucide lucide-shield-user"
                                                            >
                                                                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                                                                  <path d="M6.376 18.91a6 6 0 0 1 11.249.003" />
                                                                  <circle cx={12} cy={11} r={4} />
                                                            </svg>


                                                            Personal Details
                                                      </div>
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                      <PersonalDetailsContent
                                                            isEditing={isEditing}
                                                            toggleEditMode={toggleEditMode}
                                                            handleSave={handleSave}
                                                      />
                                                </AccordionContent>
                                          </AccordionItem>

                                          <AccordionItem className="border" value="item-2">
                                                <AccordionTrigger className="font-regular text-lg  px-4 bg-gray-50">
                                                      <div className="flex items-center gap-2">
                                                            <svg
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  width={28}
                                                                  height={28}
                                                                  viewBox="0 0 24 24"
                                                                  fill="none"
                                                                  stroke="currentColor"
                                                                  strokeWidth={1}
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  className="lucide lucide-shield-user"
                                                            >
                                                                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                                                                  <path d="M6.376 18.91a6 6 0 0 1 11.249.003" />
                                                                  <circle cx={12} cy={11} r={4} />
                                                            </svg>


                                                            Address Details
                                                      </div>
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                      <Address />
                                                </AccordionContent>
                                          </AccordionItem>

                                          <AccordionItem className="border" value="item-3">
                                                <AccordionTrigger className="font-regular text-lg  px-4 bg-gray-50">

                                                      <div className="flex items-center gap-2">
                                                            <svg
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  width={28}
                                                                  height={28}
                                                                  viewBox="0 0 24 24"
                                                                  fill="none"
                                                                  stroke="currentColor"
                                                                  strokeWidth={1}
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  className="lucide lucide-shield-user"
                                                            >
                                                                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                                                                  <path d="M6.376 18.91a6 6 0 0 1 11.249.003" />
                                                                  <circle cx={12} cy={11} r={4} />
                                                            </svg>
                                                            Career and Application Information
                                                      </div>
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                      <CareerObjective isEditing={isEditing} />
                                                </AccordionContent>
                                          </AccordionItem>

                                          <AccordionItem className="border" value="item-4">
                                                <AccordionTrigger className="font-regular text-lg  px-4 bg-gray-50">
                                                      <div className="flex items-center gap-2">
                                                            <svg
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  width={28}
                                                                  height={28}
                                                                  viewBox="0 0 24 24"
                                                                  fill="none"
                                                                  stroke="currentColor"
                                                                  strokeWidth={1}
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  className="lucide lucide-shield-user"
                                                            >
                                                                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                                                                  <path d="M6.376 18.91a6 6 0 0 1 11.249.003" />
                                                                  <circle cx={12} cy={11} r={4} />
                                                            </svg>
                                                            Preferred Areas
                                                      </div>
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                      <PreferredAreas />
                                                </AccordionContent>
                                          </AccordionItem>


                                          <AccordionItem className="border" value="item-5">
                                                <AccordionTrigger className="font-regular text-lg  px-4 bg-gray-50">
                                                      <div className="flex items-center gap-2">
                                                            <svg
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  width={28}
                                                                  height={28}
                                                                  viewBox="0 0 24 24"
                                                                  fill="none"
                                                                  stroke="currentColor"
                                                                  strokeWidth={1}
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  className="lucide lucide-shield-user"
                                                            >
                                                                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                                                                  <path d="M6.376 18.91a6 6 0 0 1 11.249.003" />
                                                                  <circle cx={12} cy={11} r={4} />
                                                            </svg>
                                                            Other Relevant Information
                                                      </div>
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                      <OtherReleventInfo />
                                                </AccordionContent>
                                          </AccordionItem>


                                          <AccordionItem className="border" value="item-6">
                                                <AccordionTrigger className="font-regular text-lg  px-4 bg-gray-50">
                                                      <div className="flex items-center gap-2">
                                                            <svg
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  width={28}
                                                                  height={28}
                                                                  viewBox="0 0 24 24"
                                                                  fill="none"
                                                                  stroke="currentColor"
                                                                  strokeWidth={1}
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  className="lucide lucide-unplug"
                                                            >
                                                                  <path d="m19 5 3-3" />
                                                                  <path d="m2 22 3-3" />
                                                                  <path d="M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z" />
                                                                  <path d="M7.5 13.5 10 11" />
                                                                  <path d="M10.5 16.5 13 14" />
                                                                  <path d="m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z" />
                                                            </svg>
                                                            Disability Information (if any)
                                                      </div>
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                      <DisabilityInformation />
                                                </AccordionContent>
                                          </AccordionItem>
                                    </Accordion>
                              </TabsContent>

                              <TabsContent value="education" className="m-0">
                                    <Accordion defaultValue="academic" type="single" collapsible className="w-full mt-6 space-y-3">
                                          <AccordionItem className="border" value="academic">
                                                <AccordionTrigger className="font-regular text-lg  px-4 bg-gray-50">
                                                      <div className="flex items-center gap-2">
                                                            <svg
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  width={28}
                                                                  height={28}
                                                                  viewBox="0 0 24 24"
                                                                  fill="none"
                                                                  stroke="currentColor"
                                                                  strokeWidth={1}
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  className="lucide lucide-graduation-cap"
                                                            >
                                                                  <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
                                                                  <path d="M22 10v6" />
                                                                  <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
                                                            </svg>

                                                            Academic Summary
                                                      </div>
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                      <EducationTraining />
                                                </AccordionContent>
                                          </AccordionItem>

                                          <AccordionItem className="border" value="trining">
                                                <AccordionTrigger className="font-regular text-lg  px-4 bg-gray-50">
                                                      <div className="flex items-center gap-2">
                                                            <svg
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  width={28}
                                                                  height={28}
                                                                  viewBox="0 0 24 24"
                                                                  fill="none"
                                                                  stroke="currentColor"
                                                                  strokeWidth={1}
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  className="lucide lucide-graduation-cap"
                                                            >
                                                                  <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
                                                                  <path d="M22 10v6" />
                                                                  <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
                                                            </svg>
                                                            Training Summary
                                                      </div>
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                      <TrainingSummary />
                                                </AccordionContent>
                                          </AccordionItem>

                                          <AccordionItem className="border" value="cirtification">
                                                <AccordionTrigger className="font-regular text-lg  px-4 bg-gray-50">
                                                      <div className="flex items-center gap-2">
                                                            <svg
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  width={28}
                                                                  height={28}
                                                                  viewBox="0 0 24 24"
                                                                  fill="none"
                                                                  stroke="currentColor"
                                                                  strokeWidth={1}
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  className="lucide lucide-graduation-cap"
                                                            >
                                                                  <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
                                                                  <path d="M22 10v6" />
                                                                  <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
                                                            </svg>
                                                            Professional Certification Summary
                                                      </div>
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                      <CitificationSummary />
                                                </AccordionContent>
                                          </AccordionItem>
                                    </Accordion>
                              </TabsContent>

                              <TabsContent value="employment" className="m-0">
                                    <Accordion defaultValue="academic" type="single" collapsible className="w-full mt-6 space-y-3">
                                          <AccordionItem className="border" value="academic">
                                                <AccordionTrigger className="font-regular text-lg  px-4 bg-gray-50">
                                                      <div className="flex items-center gap-2">
                                                            {/* @ts-ignore */}
                                                            <svg
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  width={28}
                                                                  height={28}
                                                                  viewBox="0 0 24 24"
                                                                  fill="none"
                                                                  stroke="currentColor"
                                                                  strokeWidth={1}
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  className="lucide lucide-users"
                                                            >
                                                                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                                                  <circle cx={9} cy={7} r={4} />
                                                                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                                                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                                            </svg>

                                                            Employment History
                                                      </div>
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                      <EmploymentHistory />
                                                </AccordionContent>
                                          </AccordionItem>
                                          <AccordionItem className="border" value="retired">
                                                <AccordionTrigger className="font-regular text-lg  px-4 bg-gray-50">
                                                      <div className="flex items-center gap-2">
                                                            {/* @ts-ignore */}
                                                            <svg
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  width={28}
                                                                  height={28}
                                                                  viewBox="0 0 24 24"
                                                                  fill="none"
                                                                  stroke="currentColor"
                                                                  strokeWidth={1}
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  className="lucide lucide-users"
                                                            >
                                                                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                                                  <circle cx={9} cy={7} r={4} />
                                                                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                                                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                                            </svg>
                                                            Employment History (For Retired Army Person)
                                                      </div>
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                      <EmployeeHistoryForRetired />
                                                </AccordionContent>
                                          </AccordionItem>

                                    </Accordion>
                              </TabsContent>



                              <TabsContent value="other" className="m-0">
                                    <Accordion defaultValue="skill_info" type="single" collapsible className="w-full mt-6 space-y-3">
                                          <AccordionItem className="border" value="skill_info">
                                                <AccordionTrigger className="font-regular text-lg  px-4 bg-gray-50">
                                                      <div className="flex items-center gap-2">
                                                            {/* @ts-ignore */}
                                                            <svg
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  width={28}
                                                                  height={28}
                                                                  viewBox="0 0 24 24"
                                                                  fill="none"
                                                                  stroke="currentColor"
                                                                  strokeWidth={1}
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  className="lucide lucide-brain"
                                                            >
                                                                  <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
                                                                  <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
                                                                  <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
                                                                  <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
                                                                  <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
                                                                  <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
                                                                  <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
                                                                  <path d="M6 18a4 4 0 0 1-1.967-.516" />
                                                                  <path d="M19.967 17.484A4 4 0 0 1 18 18" />
                                                            </svg>

                                                            Skills
                                                      </div>
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                      <OtherSkills />
                                                </AccordionContent>
                                          </AccordionItem>

                                          <AccordionItem className="border" value="language">
                                                <AccordionTrigger className="font-regular text-lg  px-4 bg-gray-50">
                                                      <div className="flex items-center gap-2">
                                                            {/* @ts-ignore */}
                                                            <svg
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  width={28}
                                                                  height={28}
                                                                  viewBox="0 0 24 24"
                                                                  fill="none"
                                                                  stroke="currentColor"
                                                                  strokeWidth={1}
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  className="lucide lucide-languages"
                                                            >
                                                                  <path d="m5 8 6 6" />
                                                                  <path d="m4 14 6-6 2-3" />
                                                                  <path d="M2 5h12" />
                                                                  <path d="M7 2h1" />
                                                                  <path d="m22 22-5-10-5 10" />
                                                                  <path d="M14 18h6" />
                                                            </svg>

                                                            Language Proficiency
                                                      </div>
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                      <LanguageProficiency />
                                                </AccordionContent>
                                          </AccordionItem>

                                          <AccordionItem className="border" value="link">
                                                <AccordionTrigger className="font-regular text-lg  px-4 bg-gray-50">
                                                      <div className="flex items-center gap-2">
                                                            {/* @ts-ignore */}
                                                            <svg
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  width={28}
                                                                  height={28}
                                                                  viewBox="0 0 24 24"
                                                                  fill="none"
                                                                  stroke="currentColor"
                                                                  strokeWidth={1}
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  className="lucide lucide-link"
                                                            >
                                                                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                                                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                                                            </svg>


                                                            Links Account
                                                      </div>
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                      <LinkAccounts />
                                                </AccordionContent>
                                          </AccordionItem>

                                          <AccordionItem className="border" value="references">
                                                <AccordionTrigger className="font-regular text-lg  px-4 bg-gray-50">
                                                      <div className="flex items-center gap-2">
                                                            {/* @ts-ignore */}
                                                            <svg
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  width={28}
                                                                  height={28}
                                                                  viewBox="0 0 24 24"
                                                                  fill="none"
                                                                  stroke="currentColor"
                                                                  strokeWidth={1}
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  className="lucide lucide-user-round-check"
                                                            >
                                                                  <path d="M2 21a8 8 0 0 1 13.292-6" />
                                                                  <circle cx={10} cy={8} r={5} />
                                                                  <path d="m16 19 2 2 4-4" />
                                                            </svg>

                                                            References
                                                      </div>
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                      <ReferenceInput />
                                                </AccordionContent>
                                          </AccordionItem>

                                    </Accordion>
                              </TabsContent>
                              <TabsContent value="accomplishment" className="m-0">
                                    <UserAssets />
                              </TabsContent>
                        </Tabs>
                  </div>
            </div>
      )
}

"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Camera, User, Phone, Briefcase, MapPin, FileText, GraduationCap, BarChart2, Award, Building, Globe, LinkIcon, Users, Trophy, Pencil, Save, X, Monitor, View, Eye } from 'lucide-react'
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
      const [activeDialog, setActiveDialog] = useState<"portfolio" | "publication" | "award" | "project" | "other" | null>(null)

      const handleSaveAccomplishment = (data: any) => {
            console.log("Saving accomplishment:", data)
            // Handle saving the accomplishment data here
      }

      return (
            <div>
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                              <ProfileTabList />

                              <TabsContent value="home" className="m-0">
                                    <Accordion defaultValue="item-1" type="single" collapsible className="w-full mt-6 space-y-3">
                                          <AccordionItem className="border" value="item-1">
                                                <AccordionTrigger className="font-regular text-lg  px-4 bg-gray-50">Personal Details</AccordionTrigger>
                                                <AccordionContent>
                                                      <PersonalDetailsContent
                                                            isEditing={isEditing}
                                                            toggleEditMode={toggleEditMode}
                                                            handleSave={handleSave}
                                                      />
                                                </AccordionContent>
                                          </AccordionItem>

                                          <AccordionItem className="border" value="item-2">
                                                <AccordionTrigger className="font-regular text-lg  px-4 bg-gray-50">Address Details </AccordionTrigger>
                                                <AccordionContent>
                                                      <Address />
                                                </AccordionContent>
                                          </AccordionItem>

                                          <AccordionItem className="border" value="item-3">
                                                <AccordionTrigger className="font-regular text-lg  px-4 bg-gray-50">Career and Application Information </AccordionTrigger>
                                                <AccordionContent>
                                                      <CareerObjective isEditing={isEditing} />
                                                </AccordionContent>
                                          </AccordionItem>

                                          <AccordionItem className="border" value="item-4">
                                                <AccordionTrigger className="font-regular text-lg  px-4 bg-gray-50">Preferred Areas</AccordionTrigger>
                                                <AccordionContent>
                                                      <PreferredAreas />
                                                </AccordionContent>
                                          </AccordionItem>


                                          <AccordionItem className="border" value="item-5">
                                                <AccordionTrigger className="font-regular text-lg  px-4 bg-gray-50">Other Relevant Information</AccordionTrigger>
                                                <AccordionContent>
                                                      <OtherReleventInfo />
                                                </AccordionContent>
                                          </AccordionItem>


                                          <AccordionItem className="border" value="item-6">
                                                <AccordionTrigger className="font-regular text-lg  px-4 bg-gray-50">Disability Information (if any)</AccordionTrigger>
                                                <AccordionContent>
                                                      <DisabilityInformation />
                                                </AccordionContent>
                                          </AccordionItem>


                                    </Accordion>
                              </TabsContent>

                              <TabsContent value="education" className="m-0">
                                    <Accordion defaultValue="academic" type="single" collapsible className="w-full mt-6 space-y-3">
                                          <AccordionItem className="border" value="academic">
                                                <AccordionTrigger className="font-regular text-lg  px-4 bg-gray-50">Academic Summary</AccordionTrigger>
                                                <AccordionContent>
                                                      <EducationTraining />
                                                </AccordionContent>
                                          </AccordionItem>

                                          <AccordionItem className="border" value="trining">
                                                <AccordionTrigger className="font-regular text-lg  px-4 bg-gray-50">Training Summary</AccordionTrigger>
                                                <AccordionContent>
                                                      <TrainingSummary />
                                                </AccordionContent>
                                          </AccordionItem>

                                          <AccordionItem className="border" value="cirtification">
                                                <AccordionTrigger className="font-regular text-lg  px-4 bg-gray-50">Professional Certification Summary</AccordionTrigger>
                                                <AccordionContent>
                                                      <CitificationSummary />
                                                </AccordionContent>
                                          </AccordionItem>
                                    </Accordion>
                              </TabsContent>

                              <TabsContent value="employment" className="m-0">
                                    <Accordion defaultValue="academic" type="single" collapsible className="w-full mt-6 space-y-3">
                                          <AccordionItem className="border" value="academic">
                                                <AccordionTrigger className="font-regular text-lg  px-4 bg-gray-50">Employment History</AccordionTrigger>
                                                <AccordionContent>
                                                      <EmploymentHistory />
                                                </AccordionContent>
                                          </AccordionItem>

                                    </Accordion>
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

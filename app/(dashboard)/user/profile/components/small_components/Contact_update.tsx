"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Pencil, Save, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUserData, set_user_data } from "@/utils/encript_decript"
import useApiForPost from "@/app/hooks/useApiForPost"
import { Card, CardContent } from "@/components/ui/card"

const ContactUpdate = ({ setActiveSection }: { setActiveSection: (section: string | null) => void }) => {
      const [user, setUserData] = useUserData()
      const [isEditing, setIsEditing] = useState(false)
      const [loading, setLoading] = useState(false)
      const [error, setError] = useState("")
      const { apiRequest } = useApiForPost()

      const [contactData, setContactData] = useState({
            primaryMobile: "",
            secondaryMobile: "",
            emergencyContact: "",
            email: "",
      })

      useEffect(() => {
            if (user) {
                  setContactData({
                        primaryMobile: user.primaryMobile || "",
                        secondaryMobile: user.secondaryMobile || "",
                        emergencyContact: user.emergencyContact || "",
                        email: user.email || "",
                  })
            }
      }, [user])

      const toggleEditMode = () => {
            if (isEditing) {
                  // Reset form if canceling edit
                  setContactData({
                        primaryMobile: user?.primaryMobile || "",
                        secondaryMobile: user?.secondaryMobile || "",
                        emergencyContact: user?.emergencyContact || "",
                        email: user?.email || "",
                  })
            }
            setIsEditing(!isEditing)
      }

      const handleSave = async () => {
            setLoading(true)

            const { data, error } = await apiRequest<any>(`api/v1/user/update-contact?id=${user?._id}`, "PUT", {
                  primaryMobile: contactData.primaryMobile,
                  secondaryMobile: contactData.secondaryMobile,
                  emergencyContact: contactData.emergencyContact,
                  email: contactData.email,
            })

            setLoading(false)

            if (error) {
                  setError(error.message)
                  return
            }

            if (data) {
                  set_user_data(data.data)
                  setUserData(data.data)
                  setError("")
                  setIsEditing(false)
            }
      }

      return (
            <div>
                  <div className="bg-light-theme dark:bg-dark-theme text-black p-4 flex items-center justify-between">
                        <div className="flex items-center">
                              <Button variant="ghost" size="icon" className="text-white" onClick={() => setActiveSection(null)}>
                                    <ChevronLeft className="h-6 w-6" />
                              </Button>
                              <h1 className="text-xl font-medium ml-4">Contact Details</h1>
                        </div>
                        {isEditing ? (
                              <div className="flex items-center space-x-2">
                                    <Button variant="ghost" size="icon" className="text-white" onClick={handleSave} disabled={loading}>
                                          <Save className="h-5 w-5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-white" onClick={toggleEditMode}>
                                          <X className="h-5 w-5" />
                                    </Button>
                              </div>
                        ) : (
                              <Button variant="ghost" size="icon" className="text-white" onClick={toggleEditMode}>
                                    <Pencil className="h-5 w-5" />
                              </Button>
                        )}
                  </div>

                  <div className="py-2">
                        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

                        <Card className="w-full">
                              <div className="p-6 w-full">
                                    <div className="space-y-4">
                                          <div className="space-y-2">
                                                <Label htmlFor="primaryMobile">Primary Mobile</Label>
                                                {isEditing ? (
                                                      <Input
                                                            id="primaryMobile"
                                                            value={contactData.primaryMobile}
                                                            onChange={(e) => setContactData((prev) => ({ ...prev, primaryMobile: e.target.value }))}
                                                            placeholder="Enter primary mobile"
                                                      />
                                                ) : (
                                                      <p className="text-gray-700 dark:text-gray-300 p-2 border rounded-md bg-muted/30">
                                                            {contactData.primaryMobile || "Not provided"}
                                                      </p>
                                                )}
                                          </div>

                                          <div className="space-y-2">
                                                <Label htmlFor="secondaryMobile">Secondary Mobile</Label>
                                                {isEditing ? (
                                                      <Input
                                                            id="secondaryMobile"
                                                            value={contactData.secondaryMobile}
                                                            onChange={(e) => setContactData((prev) => ({ ...prev, secondaryMobile: e.target.value }))}
                                                            placeholder="Enter secondary mobile"
                                                      />
                                                ) : (
                                                      <p className="text-gray-700 dark:text-gray-300 p-2 border rounded-md bg-muted/30">
                                                            {contactData.secondaryMobile || "Not provided"}
                                                      </p>
                                                )}
                                          </div>

                                          <div className="space-y-2">
                                                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                                                {isEditing ? (
                                                      <Input
                                                            id="emergencyContact"
                                                            value={contactData.emergencyContact}
                                                            onChange={(e) => setContactData((prev) => ({ ...prev, emergencyContact: e.target.value }))}
                                                            placeholder="Enter emergency contact"
                                                      />
                                                ) : (
                                                      <p className="text-gray-700 dark:text-gray-300 p-2 border rounded-md bg-muted/30">
                                                            {contactData.emergencyContact || "Not provided"}
                                                      </p>
                                                )}
                                          </div>

                                          <div className="space-y-2">
                                                <Label htmlFor="email">Email Address</Label>
                                                {isEditing ? (
                                                      <Input
                                                            id="email"
                                                            type="email"
                                                            value={contactData.email}
                                                            onChange={(e) => setContactData((prev) => ({ ...prev, email: e.target.value }))}
                                                            placeholder="Enter your email address"
                                                      />
                                                ) : (
                                                      <p className="text-gray-700 dark:text-gray-300 p-2 border rounded-md bg-muted/30">
                                                            {contactData.email || "Not provided"}
                                                      </p>
                                                )}
                                          </div>
                                    </div>
                              </div>
                        </Card>

                        {isEditing && (
                              <div className="flex justify-center mt-4 space-x-4">
                                    <Button variant="ghost" onClick={handleSave} disabled={loading}>
                                          Save
                                    </Button>
                                    <Button variant="secondary" onClick={toggleEditMode}>
                                          Cancel
                                    </Button>
                              </div>
                        )}
                  </div>
            </div>
      )
}

export default ContactUpdate

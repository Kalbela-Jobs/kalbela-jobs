"use client"

import { useEffect, useState } from "react"
import { Mail, Pencil, Phone, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { EditModal } from "./CommonModal"
import { set_user_data, useUserData } from "@/utils/encript_decript"
import useApiForPost from "@/app/hooks/useApiForPost"

const EmergencyContact = () => {
      const [user, setUserData] = useUserData()
      const [editContactOpen, setEditContactOpen] = useState(false)
      const [loading, setLoading] = useState(false)
      const [error_message, set_error_message] = useState("")
      const { apiRequest } = useApiForPost()
      const [formData, setFormData] = useState({
            emergencyEmail: "",
            emergencyPhone: "",
      })



      const handleSave = () => {
            console.log("Emergency Contact Data:", formData)
            update_contact()
            setEditContactOpen(false)
      }

      const handleAddEdit = () => {
            setEditContactOpen(true)
      }



      useEffect(() => {
            if (user?.career_objective) {
                  setFormData({
                        emergencyEmail: user?.emergencyEmail,
                        emergencyPhone: user?.emergencyPhone,
                  })
            }

      }, [user]);

      const handleInputChange = (field: string, value: string) => {
            setFormData((prev) => ({ ...prev, [field]: value }))
      }

      const update_contact = async () => {
            setLoading(true)
            const { data, error } = await apiRequest<any>(
                  `api/v1/user/update-profile?id=${user?._id}`,
                  "PUT",
                  {
                        emergencyEmail: formData.emergencyEmail,
                        emergencyPhone: formData.emergencyPhone,
                  }
            )

            setLoading(false)
            if (error) {
                  set_error_message(error.message)
                  return
            }
            if (data) {
                  set_user_data(data.data)
                  setUserData(data.data)
                  set_error_message("")
                  setEditContactOpen(false)
            }
      }


      return (
            <div>
                  <Card>
                        <CardHeader>
                              <CardTitle>Emergency Contact</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                              <div className="text-left">


                                    {formData.emergencyEmail || formData.emergencyPhone ? (
                                          <ul className="space-y-2">
                                                <li >
                                                      <a className="flex text-primary items-center gap-2"
                                                            href={`mailto:${formData.emergencyEmail}`}>
                                                            <Mail />{formData.emergencyEmail || "N/A"}
                                                      </a>
                                                </li>

                                                <li >
                                                      <a className="flex text-primary items-center gap-2"
                                                            href={`tel:${formData.emergencyPhone}`}>
                                                            <Phone /> {formData.emergencyPhone || "N/A"}
                                                      </a>
                                                </li>
                                                <br />
                                                <Button
                                                      className="!bg-primary mt-3 !text-white"
                                                      size={'sm'}
                                                      onClick={handleAddEdit} variant="outline">
                                                      <Pencil className="mr-2 h-4 w-4" />
                                                      Edit Contact
                                                </Button>
                                          </ul>

                                    ) : (
                                          <div>
                                                <p className="mt-1 text-sm text-gray-500">
                                                      No contact added yet.
                                                </p>
                                                <div className="mt-4">
                                                      <Button variant="outline" onClick={handleAddEdit}>
                                                            <Plus className="mr-2 h-4 w-4" />
                                                            Add Contact
                                                      </Button>
                                                </div>
                                          </div>
                                    )}
                              </div>
                        </CardContent>
                  </Card>

                  {editContactOpen && (
                        <EditModal
                              open={editContactOpen}
                              onOpenChange={setEditContactOpen}
                              title={
                                    formData.emergencyEmail || formData.emergencyPhone
                                          ? "Edit Emergency Contact"
                                          : "Add Emergency Contact"
                              }
                        >
                              <form
                                    className="space-y-6"
                                    onSubmit={(e) => {
                                          e.preventDefault()
                                          handleSave()
                                    }}
                              >
                                    <div className="space-y-2">
                                          <Label htmlFor="emergency-email">Emergency Email*</Label>
                                          <Input
                                                id="emergency-email"
                                                type="email"
                                                value={formData.emergencyEmail}
                                                onChange={(e) =>
                                                      handleInputChange("emergencyEmail", e.target.value)
                                                }
                                                placeholder="Enter emergency email"
                                          />
                                    </div>
                                    <div className="space-y-2">
                                          <Label htmlFor="emergency-phone">Emergency Phone*</Label>
                                          <Input
                                                id="emergency-phone"
                                                type="tel"
                                                value={formData.emergencyPhone}
                                                onChange={(e) =>
                                                      handleInputChange("emergencyPhone", e.target.value)
                                                }
                                                placeholder="Enter emergency phone"
                                          />
                                    </div>
                                    <div className="text-right">
                                          <Button type="submit">Save</Button>
                                    </div>
                              </form>
                        </EditModal>
                  )}
            </div>
      )
}

export default EmergencyContact

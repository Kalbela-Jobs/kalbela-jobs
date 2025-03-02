"use client"

import { useEffect, useState } from "react"
import { Pencil, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
} from "@/components/ui/select"

import { EditModal } from "./CommonModal"
import { set_user_data, useUserData } from "@/utils/encript_decript"
import useApiForPost from "@/app/hooks/useApiForPost"

const BloodGroup = () => {
      const [user, setUserData] = useUserData()
      const [loading, setLoading] = useState(false)
      const [error_message, set_error_message] = useState("")
      const { apiRequest } = useApiForPost()
      const [editBloodGroupOpen, setEditBloodGroupOpen] = useState(false)
      const [formData, setFormData] = useState({
            bloodGroup: "",
      })

      const handleInputChange = (field: string, value: string) => {
            setFormData((prev) => ({ ...prev, [field]: value }))
      }

      const handleSave = () => {
            console.log("Blood Group data:", formData)
            update_contact()
            setEditBloodGroupOpen(false)
      }

      const handleAddEdit = () => {
            setEditBloodGroupOpen(true)
      }
      useEffect(() => {
            if (user?.bloodGroup) {
                  setFormData({ bloodGroup: user?.bloodGroup })
            }

      }, [user]);

      const update_contact = async () => {
            setLoading(true)
            const { data, error } = await apiRequest<any>(
                  `api/v1/user/update-profile?id=${user?._id}`,
                  "PUT",
                  {
                        bloodGroup: formData.bloodGroup,
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
                  setEditBloodGroupOpen(false)
            }
      }

      return (
            <div>
                  <Card>
                        <CardHeader>
                              <CardTitle>Blood Group</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                              <div className="text-left">
                                    {formData.bloodGroup ? (
                                          <div className="space-y-2">
                                                <p className="text-sm font-semibold text-gray-600 dark:text-slate-200">
                                                      {formData.bloodGroup}
                                                </p>
                                                <Button onClick={handleAddEdit} variant="outline">
                                                      <Pencil className="mr-2 h-4 w-4" />
                                                      Edit Blood Group
                                                </Button>
                                          </div>
                                    ) : (
                                          <div>
                                                <p className="mt-1 text-sm text-gray-500">No data added yet.</p>
                                                <div className="mt-4">
                                                      <Button variant="outline" onClick={handleAddEdit}>
                                                            <Plus className="mr-2 h-4 w-4" />
                                                            Add Blood Group
                                                      </Button>
                                                </div>
                                          </div>
                                    )}
                              </div>
                        </CardContent>
                  </Card>

                  {editBloodGroupOpen && (
                        <EditModal
                              open={editBloodGroupOpen}
                              onOpenChange={setEditBloodGroupOpen}
                              title={formData.bloodGroup ? "Edit Blood Group" : "Add Blood Group"}
                        >
                              <form
                                    className="space-y-6"
                                    onSubmit={(e) => {
                                          e.preventDefault()
                                          handleSave()
                                    }}
                              >
                                    <div className="space-y-2">
                                          <Label htmlFor="blood-group">Blood Group*</Label>
                                          <Select
                                                onValueChange={(value) =>
                                                      setFormData((prev) => ({ ...prev, bloodGroup: value }))
                                                }
                                                value={formData.bloodGroup}
                                          >
                                                <SelectTrigger id="blood-group">
                                                      <SelectValue placeholder="Select blood group" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                      <SelectItem value="A+">A+</SelectItem>
                                                      <SelectItem value="A-">A-</SelectItem>
                                                      <SelectItem value="B+">B+</SelectItem>
                                                      <SelectItem value="B-">B-</SelectItem>
                                                      <SelectItem value="AB+">AB+</SelectItem>
                                                      <SelectItem value="AB-">AB-</SelectItem>
                                                      <SelectItem value="O+">O+</SelectItem>
                                                      <SelectItem value="O-">O-</SelectItem>
                                                </SelectContent>
                                          </Select>
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

export default BloodGroup

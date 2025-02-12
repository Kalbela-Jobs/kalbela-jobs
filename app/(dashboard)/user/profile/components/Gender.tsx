"use client"

import { useState } from "react"
import { set_user_data, useUserData } from "@/utils/encript_decript"
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
import useApiForPost from "@/app/hooks/useApiForPost"

import { EditModal } from "./CommonModal"

const Gender = () => {
  const [loading, setLoading] = useState(false)
  const [error_message, set_error_message] = useState("")
  const { apiRequest } = useApiForPost()
  const [user, setUserData] = useUserData()
  const [editGenderOpen, setEditGenderOpen] = useState(false)
  const [formData, setFormData] = useState({
    gender: user?.gender,
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    update_contact()
  }

  const handleAddEdit = () => {
    setEditGenderOpen(true)
  }

  const update_contact = async () => {
    setLoading(true)
    const { data, error } = await apiRequest<any>(
      `api/v1/user/update-profile?id=${user?._id}`,
      "PUT",
      {
        gender: formData.gender,
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
      setEditGenderOpen(false)
    }
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Gender</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-left">
            {user?.gender ? (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-600 dark:text-slate-200">
                  {user?.gender}
                </p>
                <Button onClick={handleAddEdit} variant="outline">
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Gender
                </Button>
              </div>
            ) : (
              <div>
                <p className="mt-1 text-sm text-gray-500">No data added yet.</p>
                <div className="mt-4">
                  <Button variant="outline" onClick={handleAddEdit}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Gender
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {editGenderOpen && (
        <EditModal
          open={editGenderOpen}
          onOpenChange={setEditGenderOpen}
          title={formData.gender ? "Edit Gender" : "Add Gender"}
        >
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault()
              handleSave()
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="gender">Gender*</Label>
              <Select
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, gender: value }))
                }
                defaultValue={user?.gender}
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
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

export default Gender

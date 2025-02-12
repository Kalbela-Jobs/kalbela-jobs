"use client"

import { useState } from "react"
import { set_user_data, useUserData } from "@/utils/encript_decript"
import { addYears, format, subYears } from "date-fns"
import { Pencil, Plus } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useApiForPost from "@/app/hooks/useApiForPost"

import { EditModal } from "./CommonModal"

const DateOfBirth = () => {
  const [editDobOpen, setEditDobOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [loading, setLoading] = useState(false)
  const [error_message, set_error_message] = useState("")
  const { apiRequest } = useApiForPost()
  const [user, setUserData] = useUserData()

  const handleSave = () => {
    update_contact()
  }

  const handleAddEdit = () => {
    setEditDobOpen(true)
  }

  const update_contact = async () => {
    setLoading(true)
    const { data, error } = await apiRequest<any>(
      `api/v1/user/update-profile?id=${user?._id}`,
      "PUT",
      {
        date_of_birth: selectedDate,
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
      setEditDobOpen(false)
    }
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Date of Birth</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-left">
            {user?.date_of_birth ? (
              <div className="space-y-2 text-gray-600 dark:text-slate-200">
                <p className="text-sm font-semibold">
                  {format(user?.date_of_birth, "dd MMM, yyyy")}
                </p>
                <Button onClick={handleAddEdit} variant="outline">
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </div>
            ) : (
              <div>
                <p className="mt-1 text-sm text-gray-500">No data added yet.</p>
                <div className="mt-6">
                  <Button variant="outline" onClick={handleAddEdit}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Date of Birth
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {editDobOpen && (
        <EditModal
          open={editDobOpen}
          onOpenChange={setEditDobOpen}
          title={selectedDate ? "Edit Date of Birth" : "Add Date of Birth"}
        >
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault()
              handleSave()
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="calendar">Select Date of Birth*</Label>
              <Input
                type="date"
                id="calendar"
                name="calendar"
                defaultValue={
                  user?.date_of_birth
                    ? format(user?.date_of_birth, "yyyy-MM-dd")
                    : ""
                }
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                required
              />
            </div>
            <div className="text-right">
              <Button type="submit" disabled={!selectedDate}>
                Save
              </Button>
            </div>
          </form>
        </EditModal>
      )}
    </div>
  )
}

export default DateOfBirth

"use client"

import { useState } from "react"
import { useUserData } from "@/utils/encript_decript"
import { useQuery } from "@tanstack/react-query"
import { Eye, GraduationCap, Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
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

const DEGREES = [
  "Bachelor's",
  "Master's",
  "Ph.D.",
  "Associate's",
  "Diploma",
  "HSC",
  "SSC",
  "Vocational",
  "JSC",
  "PSC",
  "Other",
]
const YEARS = Array.from({ length: 50 }, (_, i) =>
  (new Date().getFullYear() - i).toString()
)

const Educations = () => {
  const [editEducationOpen, setEditEducationOpen] = useState(false)
  const [user] = useUserData()
  const [formData, setFormData] = useState({
    id: "",
    country: "",
    universityName: "",
    "location/board": "",
    degree: "",
    major: "",
    graduationYear: "",
    "gpa/cgpa": "",
  })

  const { apiRequest } = useApiForPost()

  const {
    data: educations = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["educations", user?._id],
    queryFn: async () => {
      if (!user?._id) return []
      const res = await fetch(
        `${process.env.NEXT_APP_BASE_URL}/api/v1/user/get-education?user_id=${user._id}`
      )

      if (!res.ok) {
        throw new Error("Failed to fetch education data")
      }

      const data = await res.json()
      return data.data
    },
    enabled: !!user?._id,
  })

  const handleEducationAction = async (action: "add" | "edit" | "delete") => {
    let endpoint = ""
    let method = "POST"
    let body

    switch (action) {
      case "add":
        endpoint = `api/v1/user/upload-education`
        body = { ...formData, user_id: user?._id }
        break
      case "edit":
        endpoint = `api/v1/user/update-education?education_id=${formData.id}`
        method = "PATCH"
        body = { ...formData, user_id: user?._id }
        break
      case "delete":
        endpoint = `api/v1/user/delete-education?education_id=${formData.id}`
        method = "DELETE"
        break
    }

    const { data, error } = await apiRequest<any>(endpoint, method as any, body)

    if (data) {
      refetch()
      setEditEducationOpen(false)
      setFormData({
        id: "",
        country: "",
        universityName: "",
        degree: "",
        major: "",
        graduationYear: "",
        "location/board": "",
        "gpa/cgpa": "",
      })
    }
  }

  const openEditModal = (education: any) => {
    setFormData({
      id: education._id,
      country: education.country || "",
      universityName: education.universityName,
      degree: education.degree,
      major: education.major,
      graduationYear: education.graduationYear,
      "location/board": education["location/board"] || "",
      "gpa/cgpa": education["gpa/cgpa"] || "",
    })
    setEditEducationOpen(true)
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {educations?.map((education: any) => (
            <div
              key={education._id}
              className="flex items-start justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <GraduationCap className="mt-1 h-5 w-5" />
                <div>
                  <h3 className="font-medium">{education?.universityName}</h3>
                  <p className="text-sm text-muted-foreground">
                    <span className="capitalize">{education?.degree}</span>,{" "}
                    {education?.major}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Graduated {education?.graduationYear}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => openEditModal(education)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, id: education._id }))
                    handleEducationAction("delete")
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => {
              setFormData({
                id: "",
                country: "",
                universityName: "",
                degree: "",
                major: "",
                graduationYear: "",
                "location/board": "",
                "gpa/cgpa": "",
              })
              setEditEducationOpen(true)
            }}
          >
            <Pencil className="h-4 w-4" />
            Add education
          </Button>
        </CardContent>
      </Card>

      <EditModal
        open={editEducationOpen}
        onOpenChange={setEditEducationOpen}
        title={formData.id ? "Edit Education" : "Add Education"}
        description={
          formData.id
            ? "Update your education information"
            : "Add new education information"
        }
      >
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault()
            handleEducationAction(formData.id ? "edit" : "add")
          }}
        >
          {/* University Name */}
          <div className="grid gap-2">
            <Label htmlFor="universityName" className="font-medium">
              School/College/University Name
            </Label>
            <Input
              id="universityName"
              value={formData.universityName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  universityName: e.target.value,
                }))
              }
              placeholder="Enter school / college / university name"
              className="w-full"
            />
          </div>

          {/* Degree and Major */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Degree Selection */}
            <div className="grid gap-2">
              <Label htmlFor="degree" className="font-medium">
                Degree
              </Label>
              <Select
                value={formData.degree}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, degree: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select degree" />
                </SelectTrigger>
                <SelectContent>
                  {DEGREES.map((degree) => (
                    <SelectItem key={degree} value={degree.toLowerCase()}>
                      {degree}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="graduationYear" className="font-medium">
                Year of Graduation
              </Label>
              <Select
                value={formData.graduationYear}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, graduationYear: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {YEARS.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="major" className="font-medium">
              Major
            </Label>
            <Input
              id="major"
              value={formData.major}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, major: e.target.value }))
              }
              placeholder="Enter major"
              className="h-10 w-full"
            />
          </div>

          {/* Graduation Year */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-end gap-2">
              <div className="grid gap-2">
                <Label htmlFor="gpa/cgpa" className="font-medium">
                  GPA or CGPA
                </Label>
                <Input
                  id="gpa/cgpa"
                  value={formData["gpa/cgpa"]}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      "gpa/cgpa": e.target.value,
                    }))
                  }
                  placeholder="Enter GPA or CGPA"
                  className="w-full"
                />
              </div>
              <Eye className="mb-2" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location/board" className="font-medium">
                Location / Board
              </Label>
              <Input
                id="location/board"
                value={formData["location/board"]}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    "location/board": e.target.value,
                  }))
                }
                placeholder="Enter location or board"
                className="w-full"
              />
            </div>
          </div>

          {/* Footer */}
          <DialogFooter className="pt-4">
            <Button type="submit" className="w-full sm:w-auto">
              {formData.id ? "Save Changes" : "Add Education"}
            </Button>
          </DialogFooter>
        </form>
      </EditModal>
    </div>
  )
}

export default Educations

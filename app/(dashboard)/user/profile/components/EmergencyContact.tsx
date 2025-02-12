"use client"

import { useState } from "react"
import { Pencil, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { EditModal } from "./CommonModal"

const EmergencyContact = () => {
  const [editContactOpen, setEditContactOpen] = useState(false)
  const [formData, setFormData] = useState({
    emergencyEmail: "",
    emergencyPhone: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    console.log("Emergency Contact Data:", formData)
    setEditContactOpen(false)
  }

  const handleAddEdit = () => {
    setEditContactOpen(true)
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
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-600 dark:text-slate-200">
                  <span className="block">
                    Emergency Email: {formData.emergencyEmail || "N/A"}
                  </span>
                  <span className="block">
                    Emergency Phone: {formData.emergencyPhone || "N/A"}
                  </span>
                </p>
                <Button onClick={handleAddEdit} variant="outline">
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Contact
                </Button>
              </div>
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

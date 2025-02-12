"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Pencil, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

import { EditModal } from "./CommonModal"
import "react-quill/dist/quill.snow.css"
import { DialogFooter } from "@/components/ui/dialog"

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

const CareerObjective = () => {
  const [editDetailsOpen, setEditDetailsOpen] = useState(false)
  const [description, setDescription] = useState("")

  const handleChange = (value: string) => {
    setDescription(value)
  }

  const handleUpdateDetails = () => {
    console.log("Career Objective:", description)
    setEditDetailsOpen(false) // Close the modal
  }

  const isEmpty = !description

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Career Objective</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEmpty ? (
            <EmptyState
              title="No information added yet"
              description="Add a brief description about your career goals."
              icon={<User className="h-10 w-10" />}
              action={
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => setEditDetailsOpen(true)}
                >
                  <Pencil className="h-4 w-4" />
                  Add details
                </Button>
              }
            />
          ) : (
            <>
              <div className="prose max-w-none text-muted-foreground">
                <div dangerouslySetInnerHTML={{ __html: description }} />
              </div>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => setEditDetailsOpen(true)}
              >
                <Pencil className="h-4 w-4" />
                Edit details
              </Button>
            </>
          )}
        </CardContent>
      </Card>
      <EditModal
        open={editDetailsOpen}
        onOpenChange={setEditDetailsOpen}
        title="Edit Career Objective"
        description="Update your career objective details"
      >
        <div className="grid gap-4 py-4">
          <div className="mb-8 grid gap-2">
            <Label htmlFor="description">Description</Label>
            <ReactQuill
              value={description}
              onChange={handleChange}
              placeholder="Write a brief description about your career objective..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleUpdateDetails} type="submit">
            Update Details
          </Button>
        </DialogFooter>
      </EditModal>
    </div>
  )
}

export default CareerObjective

const EmptyState = ({ title, description, icon, action }: any) => {
  return (
    <div className="flex flex-col items-center justify-center rounded bg-gray-50 p-8 text-center shadow-sm">
      <div className="mb-4 text-gray-400">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="mb-4 text-gray-500">{description}</p>
      {action}
    </div>
  )
}

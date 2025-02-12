"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Pencil, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { EditModal } from "./CommonModal"
import "react-quill/dist/quill.snow.css"
import { set_user_data, useUserData } from "@/utils/encript_decript"

import { DialogFooter } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import useApiForPost from "@/app/hooks/useApiForPost"

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

const About = () => {
  const [user, setUserData] = useUserData()
  const [editDetailsOpen, setEditDetailsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error_message, set_error_message] = useState("")
  const [title, setTitle] = useState(user?.title || "")
  const [description, setDescription] = useState(user?.description || "")
  const { apiRequest } = useApiForPost()

  const handleChange = (value: string) => {
    setDescription(value)
  }

  const update_about = async () => {
    setLoading(true)
    const { data, error } = await apiRequest<any>(
      `api/v1/user/update-profile?id=${user?._id}`,
      "PUT",
      {
        title,
        description,
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
      setEditDetailsOpen(false)
    }
  }

  if (!user) {
    return <AboutSkeleton />
  }

  const isEmpty = user?.title?.length === 0 && user?.description?.length === 11

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEmpty ? (
            <EmptyState
              title="No information added yet"
              description="Add your professional title and a brief description about yourself."
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
              <p className="font-medium">{user.title}</p>
              <div className="prose max-w-none text-muted-foreground">
                <div dangerouslySetInnerHTML={{ __html: user.description }} />
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
        title="Edit Details"
        description="Update your profile details"
      >
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Senior Software Engineer"
            />
          </div>
          <div className="mb-8 grid gap-2">
            <Label htmlFor="about">About</Label>
            <ReactQuill
              value={description}
              onChange={handleChange}
              placeholder="Write a brief description about yourself..."
            />
          </div>
        </div>
        {error_message && <p className="py-4 text-red-500">{error_message}</p>}
        <DialogFooter>
          <Button disabled={loading} onClick={update_about} type="submit">
            {loading ? "Updating..." : "Update Details"}
          </Button>
        </DialogFooter>
      </EditModal>
    </div>
  )
}

export default About

const AboutSkeleton = () => {
  return (
    <div>
      <Card className="">
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-10 w-40" />
        </CardContent>
      </Card>
    </div>
  )
}

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

"use client"

import { useState } from "react"
import { useUserData } from "@/utils/encript_decript"
import { useQuery } from "@tanstack/react-query"
import { Plus, Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import useApiForPost from "@/app/hooks/useApiForPost"
import uploadImage from "@/app/hooks/useUploadImage"

import { EditModal } from "./CommonModal"

const Resume = () => {
  const [editResumeOpen, setEditResumeOpen] = useState(false)
  const [resumeData, setResumeData] = useState<any>(null)
  const [resumeName, setResumeName] = useState("")
  const [user] = useUserData()
  const [previewResume, setPreviewResume] = useState<any>(null)
  const { apiRequest } = useApiForPost()

  const {
    data: resumes = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["resumes", user?._id],
    queryFn: async () => {
      if (!user?._id) return []
      const res = await fetch(
        `${process.env.NEXT_APP_BASE_URL}/api/v1/user/get-resume?user_id=${user._id}`
      )

      if (!res.ok) {
        throw new Error("Failed to fetch workspace jobs")
      }

      const data = await res.json()
      return data.data
    },
    enabled: !!user?._id,
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setResumeData(file)
    }
  }

  const upload_resume = async () => {
    if (resumeData) {
      const resume_url = await uploadImage(resumeData)
      if (resume_url) {
        const { data, error } = await apiRequest<any>(
          `api/v1/user/upload-resume`,
          "POST",
          {
            resume_url,
            resume_name: resumeName,
            user_id: user?._id,
          }
        )

        if (data) {
          refetch()
          setEditResumeOpen(false)
        }
      }
    }
  }

  const delete_resume = async (resume_id: string) => {
    const { data, error } = await apiRequest<any>(
      `api/v1/user/delete-resume?resume_id=${resume_id}`,
      "DELETE"
    )

    if (data) {
      refetch()
    }
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Resume</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <ResumeSkeleton />
          ) : resumes.length === 0 ? (
            <EmptyState
              title="No resumes uploaded yet"
              description="Upload your first resume to get started"
              icon={<Upload className="h-10 w-10" />}
              action={
                <Button
                  onClick={() => setEditResumeOpen(true)}
                  variant="outline"
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add New Resume
                </Button>
              }
            />
          ) : (
            <div className="flex max-w-3xl gap-4 overflow-x-auto pb-4">
              {resumes.map((resume: any, index: number) => (
                <div
                  onClick={() => {
                    setPreviewResume(resume.resume_url)
                  }}
                  key={index}
                  className="relative flex-shrink-0"
                >
                  <div className="absolute bottom-4 left-4 right-4 z-10 max-w-[180px] truncate rounded-md bg-black bg-opacity-75 px-3 py-1 text-center text-white">
                    {resume.resume_name}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      delete_resume(resume._id)
                    }}
                    className="absolute right-2 top-2 rounded-full bg-gray-100 p-1 transition-colors hover:bg-red-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <iframe
                    title={`Resume ${index + 1}`}
                    src={`${resume.resume_url}#toolbar=0`}
                    width="200px"
                    height="282px"
                    className="rounded-lg shadow-md"
                  />
                </div>
              ))}
            </div>
          )}
          {!isLoading && resumes.length > 0 && (
            <Button
              onClick={() => setEditResumeOpen(true)}
              variant="outline"
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add New Resume
            </Button>
          )}
        </CardContent>
      </Card>

      <EditModal
        open={editResumeOpen}
        onOpenChange={() => setEditResumeOpen(false)}
        title="Add New Resume"
        description="Upload a new resume to your profile"
      >
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="resumeName">Resume Name</Label>
            <Input
              id="resumeName"
              onChange={(e) => setResumeName(e.target.value)}
              type="text"
              placeholder="e.g., Software Engineer 2023"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="resumeFile">Resume File</Label>
            <Input
              id="resumeFile"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={upload_resume} type="submit">
            Upload Resume
          </Button>
        </DialogFooter>
      </EditModal>

      <EditModal
        title="Resume Preview"
        description=""
        open={!!previewResume}
        onOpenChange={() => setPreviewResume(null)}
      >
        <div className="h-[485px] w-full">
          <iframe
            title="Resume Preview"
            src={`${previewResume}#toolbar=0`}
            width="100%"
            height="100%"
            className="rounded-lg"
          />
        </div>
      </EditModal>
    </div>
  )
}

export default Resume

const ResumeSkeleton = () => {
  return (
    <div className="flex max-w-3xl gap-4 overflow-x-auto pb-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="relative flex-shrink-0">
          <Skeleton className="h-[282px] w-[200px] rounded-lg" />
          <Skeleton className="absolute bottom-4 left-4 right-4 h-8 rounded-md" />
        </div>
      ))}
    </div>
  )
}

const EmptyState = ({ title, description, icon, action }: any) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 p-8 text-center">
      <div className="mb-4 text-gray-400">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="mb-4 text-gray-500">{description}</p>
      {action}
    </div>
  )
}

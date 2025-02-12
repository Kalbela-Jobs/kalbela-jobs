import { useState } from "react"
import { useUserData } from "@/utils/encript_decript"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Award, Pencil, Plus, Trash2 } from "lucide-react"

import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import useApiForPost from "@/app/hooks/useApiForPost"

import { EditModal } from "./CommonModal"

const Certifications = () => {
  const [editCertificationsOpen, setEditCertificationsOpen] = useState(false)
  const [editingCertification, setEditingCertification] = useState<any>(null)
  const [user] = useUserData()
  const [loading, setLoading] = useState(false)
  const [certifications, setCertifications] = useState({
    name: "",
    year: "",
    file: null,
  })

  const queryClient = useQueryClient()

  const {
    data: certificationsData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["certificationsData", user?._id],
    queryFn: async () => {
      if (!user?._id) return []
      const res = await fetch(
        `${process.env.NEXT_APP_BASE_URL}/api/v1/user/get-certification?user_id=${user._id}`
      )

      if (!res.ok) {
        throw new Error("Failed to fetch certifications")
      }

      const data = await res.json()
      return data.data
    },
    enabled: !!user?._id,
  })

  const { apiRequest } = useApiForPost()

  const uploadMutation = useMutation({
    mutationFn: async (certData: any) => {
      const endpoint = certData.certification_id
        ? `api/v1/user/update-certification?certification_id=${certData.certification_id}`
        : `api/v1/user/upload-certification`
      const method = certData.certification_id ? "PATCH" : "POST"
      const { data, error } = await apiRequest<any>(endpoint, method, {
        ...certData,
        user_id: user?._id,
      })
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries<any>(["certificationsData", user?._id])
      setEditCertificationsOpen(false)
      toast({
        title: "Success",
        description: editingCertification
          ? "Certification updated successfully"
          : "Certification added successfully",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: editingCertification
          ? "Failed to update certification"
          : "Failed to add certification",
        variant: "destructive",
      })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (certId: string) => {
      const { data, error } = await apiRequest<any>(
        `api/v1/user/delete-certification?certification_id=${certId}`,
        "DELETE"
      )
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries<any>(["certificationsData", user?._id])
      toast({
        title: "Success",
        description: "Certification deleted successfully",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete certification",
        variant: "destructive",
      })
    },
  })

  const handleEdit = (certification: any) => {
    setEditingCertification(certification)
    setCertifications({
      name: certification.name,
      year: certification.year,
      file: null,
    })
    setEditCertificationsOpen(true)
  }

  const handleDelete = (certificationId: string) => {
    deleteMutation.mutate(certificationId)
  }

  const handleSubmit = () => {
    setLoading(true)
    if (editingCertification) {
      // Update existing certification
      uploadMutation.mutate({
        ...certifications,
        certification_id: editingCertification._id,
      })
      setLoading(false)
    } else {
      // Add new certification
      uploadMutation.mutate(certifications)
      setLoading(false)
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Certifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start gap-4">
              <Skeleton className="mt-1 h-5 w-5" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Certifications</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">
            Error loading certifications. Please try again later.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Certifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {certificationsData.length === 0 ? (
            <p className="text-muted-foreground">
              No certifications added yet.
            </p>
          ) : (
            certificationsData.map((certification: any) => (
              <div
                key={certification._id}
                className="flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <Award className="mt-1 h-5 w-5" />
                  <div>
                    <h3 className="font-medium capitalize">
                      {certification.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {certification.year}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(certification)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(certification._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => {
              setEditingCertification(null)
              setCertifications({ name: "", year: "", file: null })
              setEditCertificationsOpen(true)
            }}
          >
            <Plus className="h-4 w-4" />
            Add certification
          </Button>
        </CardContent>
      </Card>

      <EditModal
        open={editCertificationsOpen}
        onOpenChange={setEditCertificationsOpen}
        title={
          editingCertification ? "Edit Certification" : "Add Certification"
        }
        description={
          editingCertification
            ? "Update your certification"
            : "Add a new certification"
        }
      >
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="cert-name">Certification Name</Label>
            <Input
              onChange={(e) => {
                setCertifications({ ...certifications, name: e.target.value })
              }}
              id="cert-name"
              value={certifications.name}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cert-year">Year</Label>
            <Input
              onChange={(e) => {
                setCertifications({ ...certifications, year: e.target.value })
              }}
              id="cert-year"
              value={certifications.year}
            />
          </div>

          <div>
            <Label htmlFor="cert-file">Upload Certificate</Label>
            <Input
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  setCertifications({ ...certifications, file: file as any })
                }
              }}
              id="cert-file"
              type="file"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} type="submit">
            {loading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </EditModal>
    </div>
  )
}

export default Certifications

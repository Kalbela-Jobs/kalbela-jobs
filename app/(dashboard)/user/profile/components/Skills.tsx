import { useState } from "react"
import { useUserData } from "@/utils/encript_decript"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Pencil, Plus } from "lucide-react"
import CreatableSelect from "react-select/creatable"

import { toast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import useApiForPost from "@/app/hooks/useApiForPost"

import { EditModal } from "./CommonModal"

interface Skill {
  value: string
  label: string
}

const Skills = () => {
  const [editSkillsOpen, setEditSkillsOpen] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(false)
  const [user] = useUserData()
  const queryClient = useQueryClient()
  const { apiRequest } = useApiForPost()

  const {
    data: skills = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["skills", user?._id],
    queryFn: async () => {
      if (!user?._id) return []
      const res = await fetch(
        `${process.env.NEXT_APP_BASE_URL}/api/v1/user/get-skills?user_id=${user._id}`
      )
      if (!res.ok) {
        throw new Error("Failed to fetch skills")
      }
      const data = await res.json()
      if (!data?.data) return []
      console.log("data", data)
      return data?.data?.map((skill: string) => ({
        value: skill,
        label: skill,
      }))
    },
    enabled: !!user?._id,
  })

  const updateSkillsMutation = useMutation({
    mutationFn: async (newSkills: Skill[]) => {
      const { data, error } = await apiRequest<any>(
        `api/v1/user/update-skill?user_id=${user?._id}`,
        "PUT",
        {
          skills: newSkills.map((skill) => skill.value),
          user_id: user?._id,
        }
      )
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries<any>(["skills", user?._id])
      setEditSkillsOpen(false)
      toast({
        title: "Success",
        description: "Skills updated successfully",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update skills",
        variant: "destructive",
      })
    },
  })

  const handleSaveSkills = () => {
    setLoading(true)
    updateSkillsMutation.mutate(selectedSkills)
    setLoading(false)
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Skills and expertise</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-6 w-20" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Skills and expertise</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">
            Error loading skills. Please try again later.
          </p>
        </CardContent>
      </Card>
    )
  }

  const visibleSkills = skills.slice(0, 10)
  const hiddenSkillsCount = Math.max(0, skills.length - 10)

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Skills and expertise</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {visibleSkills.map((skill: Skill) => (
              <Badge key={skill.value} className="rounded" variant="secondary">
                {skill.label}
              </Badge>
            ))}
            {hiddenSkillsCount > 0 && (
              <Badge variant="secondary" className="cursor-pointer">
                +{hiddenSkillsCount}
              </Badge>
            )}
          </div>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => {
              setSelectedSkills(skills)
              setEditSkillsOpen(true)
            }}
          >
            {visibleSkills.length ? (
              <Pencil className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            {visibleSkills.length ? "Edit skills" : "Add skills"}
          </Button>
        </CardContent>
      </Card>

      <EditModal
        open={editSkillsOpen}
        onOpenChange={setEditSkillsOpen}
        title="Edit Skills"
        description="Update your skills and expertise"
      >
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="skills">Skills</Label>
            <CreatableSelect
              isMulti
              id="skills"
              value={selectedSkills}
              onChange={(newValue) => setSelectedSkills(newValue as Skill[])}
              options={skills}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSaveSkills} disabled={loading}>
            {loading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </EditModal>
    </div>
  )
}

export default Skills

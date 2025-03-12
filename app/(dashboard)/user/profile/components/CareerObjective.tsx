"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Pencil, Plus, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

import { EditModal } from "./CommonModal"
import "react-quill/dist/quill.snow.css"
import { DialogFooter } from "@/components/ui/dialog"
import useApiForPost from "@/app/hooks/useApiForPost"
import { set_user_data, useUserData } from "@/utils/encript_decript"

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

const CareerObjective = () => {
      const [user, setUserData] = useUserData()
      const [editDetailsOpen, setEditDetailsOpen] = useState(false)
      const [description, setDescription] = useState(user?.career_objective)
      const [loading, setLoading] = useState(false)
      const [error_message, set_error_message] = useState("")
      const { apiRequest } = useApiForPost()

      useEffect(() => {
            if (user?.career_objective) {
                  setDescription(user?.career_objective)
            }

      }, [user]);

      const handleChange = (value: string) => {
            setDescription(value)
      }

      const handleUpdateDetails = () => {
            console.log("Career Objective:", description)
            update_contact()
            setEditDetailsOpen(false) // Close the modal
      }

      const update_contact = async () => {
            setLoading(true)
            const { data, error } = await apiRequest<any>(
                  `api/v1/user/update-profile?id=${user?._id}`,
                  "PUT",
                  {
                        career_objective: description,
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

      const isEmpty = !description

      return (
            <div>
                  <div className="border-b pb-3">
                        <header className="flex items-center justify-between pb-2 h-[30px]  ">
                              <h2 className="font-semibold text-md ">Career Objective</h2>
                        </header>
                        <div className="">
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
                                                      <Plus className="h-4 w-4" />
                                                      Add details
                                                </Button>
                                          }
                                    />
                              ) : (
                                    <>
                                          <div className="prose max-w-none text-muted-foreground">
                                                <div dangerouslySetInnerHTML={{ __html: description }} />
                                          </div>
                                          {/* {!isEmpty && <Button
                                                variant="destructive"
                                                className="gap-2 mt-3 !bg-primary"
                                                onClick={() => setEditDetailsOpen(true)}
                                          >
                                                <Pencil className="h-4 w-4" />
                                                Edit
                                          </Button>

                                          } */}
                                    </>
                              )}
                        </div>

                  </div>
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

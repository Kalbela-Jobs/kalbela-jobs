"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Pencil, Save, X, Upload, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUserData, set_user_data } from "@/utils/encript_decript"
import useApiForPost from "@/app/hooks/useApiForPost"

const ProfileUpdate = ({ setActiveSection }: { setActiveSection: (section: string | null) => void }) => {
      const [user, setUserData] = useUserData()
      const [isEditing, setIsEditing] = useState(false)
      const [loading, setLoading] = useState(false)
      const [error, setError] = useState("")
      const { apiRequest } = useApiForPost()
      const fileInputRef = useRef<HTMLInputElement>(null)

      const [profileData, setProfileData] = useState({
            profileImage: "",
            previewImage: "",
      })

      useEffect(() => {
            if (user) {
                  setProfileData({
                        profileImage: user.profileImage || "",
                        previewImage: user.profileImage || "",
                  })
            }
      }, [user])

      const toggleEditMode = () => {
            if (isEditing) {
                  // Reset form if canceling edit
                  setProfileData({
                        profileImage: user?.profileImage || "",
                        previewImage: user?.profileImage || "",
                  })
            }
            setIsEditing(!isEditing)
      }

      const handleImageClick = () => {
            if (isEditing && fileInputRef.current) {
                  fileInputRef.current.click()
            }
      }

      const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0]
            if (file) {
                  // Create a preview URL for the selected image
                  const previewUrl = URL.createObjectURL(file)
                  setProfileData((prev) => ({
                        ...prev,
                        previewImage: previewUrl,
                  }))

                  // Here you would typically upload the image to your server
                  // For this example, we'll just simulate it
                  uploadImage(file)
            }
      }

      const uploadImage = async (file: File) => {
            setLoading(true)

            // Create a FormData object to send the file
            const formData = new FormData()
            formData.append("profileImage", file)

            try {
                  // This is a placeholder for your actual image upload API
                  const { data, error } = await apiRequest<any>(
                        `api/v1/user/upload-profile-image?id=${user?._id}`,
                        "POST",
                        formData,
                        true, // Set to true if your API expects FormData
                  )

                  if (error) {
                        setError(error.message)
                  } else if (data) {
                        // Update profileImage with the URL returned from the server
                        setProfileData((prev) => ({
                              ...prev,
                              profileImage: data.imageUrl,
                        }))
                  }
            } catch (err) {
                  setError("Failed to upload image")
            } finally {
                  setLoading(false)
            }
      }

      const handleSave = async () => {
            setLoading(true)

            const { data, error } = await apiRequest<any>(`api/v1/user/update-profile?id=${user?._id}`, "PUT", {
                  profileImage: profileData.profileImage,
            })

            setLoading(false)

            if (error) {
                  setError(error.message)
                  return
            }

            if (data) {
                  set_user_data(data.data)
                  setUserData(data.data)
                  setError("")
                  setIsEditing(false)
            }
      }

      return (
            <div>
                  <div className="bg-light-theme dark:bg-dark-theme text-black p-4 flex items-center justify-between">
                        <div className="flex items-center">
                              <Button variant="ghost" size="icon" className="text-white" onClick={() => setActiveSection(null)}>
                                    <ChevronLeft className="h-6 w-6" />
                              </Button>
                              <h1 className="text-xl font-medium ml-4">Profile Picture</h1>
                        </div>
                        {isEditing ? (
                              <div className="flex items-center space-x-2">
                                    <Button variant="ghost" size="icon" className="text-white" onClick={handleSave} disabled={loading}>
                                          <Save className="h-5 w-5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-white" onClick={toggleEditMode}>
                                          <X className="h-5 w-5" />
                                    </Button>
                              </div>
                        ) : (
                              <Button variant="ghost" size="icon" className="text-white" onClick={toggleEditMode}>
                                    <Pencil className="h-5 w-5" />
                              </Button>
                        )}
                  </div>

                  <div className="p-6 flex flex-col items-center">
                        <div className={`relative cursor-pointer ${isEditing ? "hover:opacity-80" : ""}`} onClick={handleImageClick}>
                              <Avatar className="h-32 w-32 border-2 border-primary">
                                    <AvatarImage src={profileData.previewImage} alt="Profile Picture" />
                                    <AvatarFallback className="bg-muted">
                                          <User className="h-16 w-16 text-muted-foreground" />
                                    </AvatarFallback>
                              </Avatar>

                              {isEditing && (
                                    <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2">
                                          <Upload className="h-6 w-6" />
                                    </div>
                              )}
                        </div>

                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />

                        {isEditing && <p className="text-sm text-muted-foreground mt-2">Click to upload profile picture</p>}
                        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">{error}</div>}
                  </div>

                  {isEditing && (
                        <div className="flex justify-center mt-4 space-x-4">
                              <Button variant="ghost" onClick={handleSave} disabled={loading}>
                                    Save
                              </Button>
                              <Button variant="secondary" onClick={toggleEditMode}>
                                    Cancel
                              </Button>
                        </div>
                  )}
            </div>
      )
}

export default ProfileUpdate

"use client"

import { useState } from "react"
import { Pencil, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { EditModal } from "./CommonModal"
import { set_user_data, useUserData } from "@/utils/encript_decript"

import { DialogFooter } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import useApiForPost from "@/app/hooks/useApiForPost"

interface User {
    _id: any
    location?: any
}

interface ApiResponse<T> {
    data?: T | null
    error?: {
        message: any
    }
}

const PreferedLocation = () => {
    const [user, setUserData] = useUserData()
    const [editDetailsOpen, setEditDetailsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error_message, setErrorMessage] = useState("")
    const [location, setLocation] = useState(user?.location || "")
    const { apiRequest } = useApiForPost()

    const update_location = async () => {
        setLoading(true)
        const { data, error }: ApiResponse<User> = await apiRequest(
            `api/v1/user/update-profile?id=${user?._id}`,
            "PUT",
            {
                location,
            }
        )

        setLoading(false)
        if (error) {
            setErrorMessage(error.message)
            return
        }
        if (data) {
            set_user_data(data)
            setUserData(data)
            setErrorMessage("")
            setEditDetailsOpen(false)
        }
    }

    if (!user) {
        return <LocationSkeleton />
    }

    const isEmpty = user?.location?.length === 0

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Preferred Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    {isEmpty ? (
                        <EmptyState
                            title="No location added yet"
                            description="Add your preferred location."
                            icon={<User className="h-10 w-10" />}
                            action={
                                <Button
                                    variant="outline"
                                    className="gap-2"
                                    onClick={() => setEditDetailsOpen(true)}
                                >
                                    <Pencil className="h-4 w-4" />
                                    Add location
                                </Button>
                            }
                        />
                    ) : (
                        <>
                            <p className="font-medium">{user.location ?? "N/A"}</p>
                            <Button
                                variant="outline"
                                className="gap-2"
                                onClick={() => setEditDetailsOpen(true)}
                            >
                                <Pencil className="h-4 w-4" />
                                Edit location
                            </Button>
                        </>
                    )}
                </CardContent>
            </Card>
            <EditModal
                open={editDetailsOpen}
                onOpenChange={setEditDetailsOpen}
                title="Edit Location"
                description="Update your preferred location"
            >
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="e.g., New York, USA"
                        />
                    </div>
                </div>
                {error_message && <p className="py-4 text-red-500">{error_message}</p>}
                <DialogFooter>
                    <Button disabled={loading} onClick={update_location} type="submit">
                        {loading ? "Updating..." : "Update Location"}
                    </Button>
                </DialogFooter>
            </EditModal>
        </div>
    )
}

export default PreferedLocation

const LocationSkeleton = () => {
    return (
        <div>
            <Card className="">
                <CardHeader>
                    <CardTitle>Preferred Location</CardTitle>
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

const EmptyState = ({ title, description, icon, action }: { title: string, description: string, icon: JSX.Element, action: JSX.Element }) => {
    return (
        <div className="flex flex-col items-center justify-center rounded bg-gray-50 p-8 text-center shadow-sm">
            <div className="mb-4 text-gray-400">{icon}</div>
            <h3 className="mb-2 text-lg font-semibold">{title}</h3>
            <p className="mb-4 text-gray-500">{description}</p>
            {action}
        </div>
    )
}
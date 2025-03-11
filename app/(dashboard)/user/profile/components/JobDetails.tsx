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
    _id: string
    jobType?: string
    jobCategory?: string
    expectedSalary?: string
    presentSalary?: string
}

interface ApiResponse<T> {
    data?: T | null
    error?: {
        message: string
    }
}

const JobDetails = () => {
    const [user, setUserData] = useUserData()
    const [editDetailsOpen, setEditDetailsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error_message, setErrorMessage] = useState("")
    const [jobType, setJobType] = useState(user?.jobType || "")
    const [jobCategory, setJobCategory] = useState(user?.jobCategory || "")
    const [expectedSalary, setExpectedSalary] = useState(user?.expectedSalary || "")
    const [presentSalary, setPresentSalary] = useState(user?.presentSalary || "")
    const { apiRequest } = useApiForPost()

    const update_job_details = async () => {
        setLoading(true)
        const { data, error }: ApiResponse<User | undefined> = await apiRequest(
            `api/v1/user/update-profile?id=${user?._id}`,
            "PUT",
            {
                jobType,
                jobCategory,
                expectedSalary,
                presentSalary,
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
        return <JobDetailsSkeleton />
    }

    const isEmpty = !user.jobType && !user.jobCategory && !user.expectedSalary && !user.presentSalary

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Job Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    {isEmpty ? (
                        <EmptyState
                            title="No job details added yet"
                            description="Add your job type, job category, expected salary, and present salary."
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
                            <p className="font-medium">Job Type: {user.jobType ?? "N/A"}</p>
                            <p className="font-medium">Job Category: {user.jobCategory ?? "N/A"}</p>
                            <p className="font-medium">Expected Salary: {user.expectedSalary ?? "N/A"}</p>
                            <p className="font-medium">Present Salary: {user.presentSalary ?? "N/A"}</p>
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
                title="Edit Job Details"
                description="Update your job type, job category, expected salary, and present salary"
            >
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="jobType">Job Type</Label>
                        <Input
                            id="jobType"
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value)}
                            placeholder="e.g., Full-time, Part-time"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="jobCategory">Job Category</Label>
                        <Input
                            id="jobCategory"
                            value={jobCategory}
                            onChange={(e) => setJobCategory(e.target.value)}
                            placeholder="e.g., Software Engineering, Data Science"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="expectedSalary">Expected Salary</Label>
                        <Input
                            id="expectedSalary"
                            value={expectedSalary}
                            onChange={(e) => setExpectedSalary(e.target.value)}
                            placeholder="e.g., $60,000"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="presentSalary">Present Salary</Label>
                        <Input
                            id="presentSalary"
                            value={presentSalary}
                            onChange={(e) => setPresentSalary(e.target.value)}
                            placeholder="e.g., $50,000"
                        />
                    </div>
                </div>
                {error_message && <p className="py-4 text-red-500">{error_message}</p>}
                <DialogFooter>
                    <Button disabled={loading} onClick={update_job_details} type="submit">
                        {loading ? "Updating..." : "Update Details"}
                    </Button>
                </DialogFooter>
            </EditModal>
        </div>
    )
}

export default JobDetails

const JobDetailsSkeleton = () => {
    return (
        <div>
            <Card className="">
                <CardHeader>
                    <CardTitle>Job Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-3/4" />
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
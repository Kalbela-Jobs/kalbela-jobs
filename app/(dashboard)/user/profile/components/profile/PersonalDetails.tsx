"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Pencil, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import "react-quill/dist/quill.snow.css"
import { set_user_data, useUserData } from "@/utils/encript_decript"
import { DialogFooter } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import useApiForPost from "@/app/hooks/useApiForPost"
import { EditModal } from "../CommonModal"

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

const PersonalDetails = () => {
    const [user, setUserData] = useUserData()
    const [editDetailsOpen, setEditDetailsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error_message, set_error_message] = useState("")
    const [fullName, setFullName] = useState("")
    const [fatherName, setFatherName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null)
    const [nationality, setNationality] = useState("")
    const [religion, setReligion] = useState("")
    const [passportId, setPassportId] = useState("")
    const [drivingLicense, setDrivingLicense] = useState("")
    const [physicalHandicap, setPhysicalHandicap] = useState(false)
    const { apiRequest } = useApiForPost()

    useEffect(() => {
        if (user) {
            setFullName(user.fullName || "")
            setFatherName(user.fatherName || "")
            setEmail(user.email || "")
            setPhone(user.phone || "")
            setDateOfBirth(user.dateOfBirth ? new Date(user.dateOfBirth) : null)
            setNationality(user.nationality || "")
            setReligion(user.religion || "")
            setPassportId(user.passportId || "")
            setDrivingLicense(user.drivingLicense || "")
            setPhysicalHandicap(user.physicalHandicap || false)
        }
    }, [user])

    const update_about = async () => {
        setLoading(true)
        const { data, error } = await apiRequest<any>(
            `api/v1/user/update-profile?id=${user?._id}`,
            "PUT",
            {
                fullName,
                fatherName,
                email,
                phone,
                dateOfBirth,
                religion,
                drivingLicense,
                physicalHandicap,
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
        return <PersonalDetailsSkeleton />
    }

    const isEmpty = user?.fullName?.length === 0 && user?.description?.length === 0

    return (
        <div>
            <Card>
                <CardContent className="space-y-4 text-lg pt-3">
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
                            <ul>
                                <li className="flex items-center gap-2 text-gray-500">
                                    <span className="font-semibold text-gray-800">Full Name : </span> {user?.fullName ?? "N/A"}
                                </li>
                                <li className="flex items-center gap-2 text-gray-500">
                                    <span className="font-semibold text-gray-800">Father's Name : </span> {user?.fatherName ?? "N/A"}
                                </li>
                                <li className="flex items-center gap-2 text-gray-500">
                                    <span className="font-semibold text-gray-800">Email : </span> {user?.email ?? "N/A"}
                                </li>
                                <li className="flex items-center gap-2 text-gray-500">
                                    <span className="font-semibold text-gray-800">Phone : </span> {user?.phone ?? "N/A"}
                                </li>
                                <li className="flex items-center gap-2 text-gray-500">
                                    <span className="font-semibold text-gray-800">Date of Birth : </span> {user?.dateOfBirth ? new Date(user?.dateOfBirth).toDateString() : "N/A"}
                                </li>
                                <li className="flex items-center gap-2 text-gray-500">
                                    <span className="font-semibold text-gray-800">Nationality : </span> {user?.nationality ?? "N/A"}
                                </li>
                                {user?.passportId && (
                                    <li className="flex items-center gap-2 text-gray-500">
                                        <span className="font-semibold text-gray-800">Passport ID : </span> {user?.passportId}
                                    </li>
                                )}
                                {user?.drivingLicense && (
                                    <li className="flex items-center gap-2 text-gray-500">
                                        <span className="font-semibold text-gray-800">Driving License : </span> {user?.drivingLicense}
                                    </li>
                                )}
                                <li className="flex items-center gap-2 text-gray-500">
                                    <span className="font-semibold text-gray-800">Religion : </span> {user?.religion ?? "N/A"}
                                </li>
                                <li className="flex items-center gap-2 text-gray-500">
                                    <span className="font-semibold text-gray-800">Physical Handicap : </span> {user?.physicalHandicap ? "Yes" : "No"}
                                </li>
                            </ul>

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
                        <Label htmlFor="fullName">Full Name</Label>
                        <input
                            className="border focus:outline-none border-gray-200 rounded-md p-2"
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Full Name"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="fatherName">Father's Name</Label>
                        <input
                            className="border focus:outline-none border-gray-200 rounded-md p-2"
                            id="fatherName"
                            value={fatherName}
                            onChange={(e) => setFatherName(e.target.value)}
                            placeholder="Father's Name"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <input
                            className="border focus:outline-none border-gray-200 rounded-md p-2"
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone">Phone</Label>
                        <input
                            className="border focus:outline-none border-gray-200 rounded-md p-2"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Phone"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <input
                            className="border focus:outline-none border-gray-200 rounded-md p-2"
                            id="dateOfBirth"
                            type="date"
                            value={dateOfBirth ? dateOfBirth.toISOString().split("T")[0] : ""}
                            onChange={(e) => setDateOfBirth(new Date(e.target.value))}
                            placeholder="Date of Birth"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="religion">Religion</Label>
                        <input
                            className="border focus:outline-none border-gray-200 rounded-md p-2"
                            id="religion"
                            value={religion}
                            onChange={(e) => setReligion(e.target.value)}
                            placeholder="Religion"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="drivingLicense">Driving License</Label>
                        <input
                            className="border focus:outline-none border-gray-200 rounded-md p-2"
                            id="drivingLicense"
                            value={drivingLicense}
                            onChange={(e) => setDrivingLicense(e.target.value)}
                            placeholder="Driving License"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="physicalHandicap"
                            checked={physicalHandicap}
                            onChange={(e) => setPhysicalHandicap(e.target.checked)}
                            className="focus:outline-none"
                        />
                        <Label htmlFor="physicalHandicap">Physical Handicap</Label>
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

export default PersonalDetails

const PersonalDetailsSkeleton = () => {
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
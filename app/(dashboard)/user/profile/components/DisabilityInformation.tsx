"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckIcon, Pencil } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function DisabilityInformation() {
    const [hasDisabilityID, setHasDisabilityID] = useState(true)
    const [showOnResume, setShowOnResume] = useState(true)
    const [isEditMode, setIsEditMode] = useState(false)
    const [disabilityID, setDisabilityID] = useState('')
    const [difficultySee, setDifficultySee] = useState('')
    const [difficultyHear, setDifficultyHear] = useState('')
    const [difficultyConcentrate, setDifficultyConcentrate] = useState('')
    const [difficultyMobility, setDifficultyMobility] = useState('')
    const [difficultyCommunicate, setDifficultyCommunicate] = useState('')
    const [difficultyCare, setDifficultyCare] = useState('')

    interface DisabilityData {
        hasDisabilityID: boolean;
        showOnResume: boolean;
        disabilityID: string;
        difficultySee: string;
        difficultyHear: string;
        difficultyConcentrate: string;
        difficultyMobility: string;
        difficultyCommunicate: string;
        difficultyCare: string;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const data: DisabilityData = {
            hasDisabilityID,
            showOnResume,
            disabilityID,
            difficultySee,
            difficultyHear,
            difficultyConcentrate,
            difficultyMobility,
            difficultyCommunicate,
            difficultyCare
        };
        console.log(data);
        setIsEditMode(false);
    }

    return (
        <div className="mb-4 px-8 py-4 w-full">
            <div className="space-y-2">
                <div className="flex items-center">
                    <Label htmlFor="has-disability-id" className="text-gray-700 text-base font-medium">
                        Do you have National Disability ID Number?
                        <span className="text-red-500">*</span>
                    </Label>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="disability-yes"
                            name="has-disability-id"
                            className="w-4 h-4 accent-blue-900 focus:outline-none"
                            checked={hasDisabilityID}
                            onChange={() => setHasDisabilityID(true)}
                        />
                        <Label htmlFor="disability-yes" className="ml-2 text-gray-700">
                            Yes
                        </Label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="disability-no"
                            name="has-disability-id"
                            className="w-4 h-4 accent-blue-900 focus:outline-none"
                            checked={!hasDisabilityID}
                            onChange={() => setHasDisabilityID(false)}
                        />
                        <Label htmlFor="disability-no" className="ml-2 text-gray-700">
                            No
                        </Label>
                    </div>
                </div>
            </div>

            {hasDisabilityID ? (
                <form className="space-y-6 mt-4" onSubmit={handleSubmit}>
                    {isEditMode ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="disability-id" className="text-gray-700 text-base font-medium">
                                        National Disability ID
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="disability-id"
                                        className="border-2 border-gray-300 rounded-md p-2 w-full focus:outline-none"
                                        value={disabilityID}
                                        onChange={(e) => setDisabilityID(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-gray-700 text-base font-medium">Show on Resume</Label>
                                    <div className="flex">
                                        <button
                                            type="button"
                                            className={`flex items-center justify-center px-4 py-2 rounded-l-md ${showOnResume ? "bg-blue-900 text-white" : "bg-white text-gray-700 border border-gray-300"
                                                }`}
                                            onClick={() => setShowOnResume(true)}
                                        >
                                            {showOnResume && <CheckIcon className="w-4 h-4 mr-1" />}
                                            Yes
                                        </button>
                                        <button
                                            type="button"
                                            className={`flex items-center justify-center px-4 py-2 rounded-r-md ${!showOnResume ? "bg-blue-900 text-white" : "bg-white text-gray-700 border border-gray-300"
                                                }`}
                                            onClick={() => setShowOnResume(false)}
                                        >
                                            No
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="difficulty-see" className="text-gray-700 text-base font-medium">
                                        Difficulty to See
                                    </Label>
                                    <Select value={difficultySee} onValueChange={setDifficultySee}>
                                        <SelectTrigger className="border-2 border-gray-300 rounded-md p-2 w-full focus:outline-none">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">None</SelectItem>
                                            <SelectItem value="mild">Mild</SelectItem>
                                            <SelectItem value="moderate">Moderate</SelectItem>
                                            <SelectItem value="severe">Severe</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="difficulty-hear" className="text-gray-700 text-base font-medium">
                                        Difficulty to Hear
                                    </Label>
                                    <Select value={difficultyHear} onValueChange={setDifficultyHear}>
                                        <SelectTrigger className="border-2 border-gray-300 rounded-md p-2 w-full focus:outline-none">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">None</SelectItem>
                                            <SelectItem value="mild">Mild</SelectItem>
                                            <SelectItem value="moderate">Moderate</SelectItem>
                                            <SelectItem value="severe">Severe</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="difficulty-concentrate" className="text-gray-700 text-base font-medium">
                                        Difficulty to Concentrate or remember
                                    </Label>
                                    <Select value={difficultyConcentrate} onValueChange={setDifficultyConcentrate}>
                                        <SelectTrigger className="border-2 border-gray-300 rounded-md p-2 w-full focus:outline-none">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">None</SelectItem>
                                            <SelectItem value="mild">Mild</SelectItem>
                                            <SelectItem value="moderate">Moderate</SelectItem>
                                            <SelectItem value="severe">Severe</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="difficulty-mobility" className="text-gray-700 text-base font-medium">
                                        Difficulty to Sit, Stand, Walk or Climb Stairs
                                    </Label>
                                    <Select value={difficultyMobility} onValueChange={setDifficultyMobility}>
                                        <SelectTrigger className="border-2 border-gray-300 rounded-md p-2 w-full focus:outline-none">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">None</SelectItem>
                                            <SelectItem value="mild">Mild</SelectItem>
                                            <SelectItem value="moderate">Moderate</SelectItem>
                                            <SelectItem value="severe">Severe</SelectItem> </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="difficulty-communicate" className="text-gray-700 text-base font-medium">
                                        Difficulty to Communicate
                                    </Label>
                                    <Select value={difficultyCommunicate} onValueChange={setDifficultyCommunicate}>
                                        <SelectTrigger className="border-2 border-gray-300 rounded-md p-2 w-full focus:outline-none">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">None</SelectItem>
                                            <SelectItem value="mild">Mild</SelectItem>
                                            <SelectItem value="moderate">Moderate</SelectItem>
                                            <SelectItem value="severe">Severe

                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="difficulty-care" className="text-gray-700 text-base font-medium">
                                        Difficulty of Taking Care{" "}
                                        <span className="text-gray-500 font-normal">(example: shower, wearing clothes)</span>
                                    </Label>
                                    <Select value={difficultyCare} onValueChange={setDifficultyCare}>
                                        <SelectTrigger className="border-2 border-gray-300 rounded-md p-2 w-full focus:outline-none">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">None</SelectItem>
                                            <SelectItem value="mild">Mild</SelectItem>
                                            <SelectItem value="moderate">Moderate</SelectItem>
                                            <SelectItem value="severe">Severe </SelectItem></SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button type="submit" className="!bg-primary text-white px-8 py-2 rounded-md">
                                    Save
                                </Button>
                                <Button type="button" variant="outline" className="border border-gray-300 text-gray-700 px-8 py-2 rounded-md" onClick={() => setIsEditMode(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <div>
                                    <div className="grid md:grid-cols-2 border-t mt-3 pt-2 gap-x-8 gap-y-6">
                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="text-gray-600 text-sm font-medium mb-1">National Disability ID</h3>
                                                <p className="text-gray-900">{disabilityID || 'N/A'}</p>
                                            </div>

                                            <div>
                                                <h3 className="text-gray-600 text-sm font-medium mb-1">Difficulty to See</h3>
                                                <p className="text-gray-900">{difficultySee || 'N/A'}</p>
                                            </div>

                                            <div>
                                                <h3 className="text-gray-600 text-sm font-medium mb-1">Difficulty to Concentrate or remember</h3>
                                                <p className="text-gray-900">{difficultyConcentrate || 'N/A'}</p>
                                            </div>

                                            <div>
                                                <h3 className="text-gray-600 text-sm font-medium mb-1">Difficulty to Communicate</h3>
                                                <p className="text-gray-900">{difficultyCommunicate || 'N/A'}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="text-gray-600 text-sm font-medium mb-1">Show on Resume</h3>
                                                <p className="text-gray-900">{showOnResume ? 'Yes' : 'No'}</p>
                                            </div>

                                            <div>
                                                <h3 className="text-gray-600 text-sm font-medium mb-1">Difficulty to Hear</h3>
                                                <p className="text-gray-900">{difficultyHear || 'N/A'}</p>
                                            </div>

                                            <div>
                                                <h3 className="text-gray-600 text-sm font-medium mb-1">Difficulty to Sit, Stand, Walk or Climb Stairs</h3>
                                                <p className="text-gray-900">{difficultyMobility || 'N/A'}</p>
                                            </div>

                                            <div>
                                                <h3 className="text-gray-600 text-sm font-medium mb-1">
                                                    Difficulty of Taking Care <span className="text-gray-500">(example: shower, wearing clothes)</span>
                                                </h3>
                                                <p className="text-gray-900">{difficultyCare || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Button className="mt-4 !bg-primary text-white px-4 py-2 rounded-md" onClick={() => setIsEditMode(true)}><Pencil /> Edit</Button>
                        </>
                    )}
                </form>
            ) : (
                <div className="mt-4 border rounded border-orange-400 p-4 text-orange-500">
                    <p>You have indicated that you do not have a National Disability ID Number. If you require assistance or accommodations, please ensure you provide the necessary documentation or details regarding your condition. Having a National Disability ID can help in accessing various support services and benefits. If you need guidance on how to obtain one, consider reaching out to the relevant government or disability support agencies.
                    </p>
                </div>
            )}
        </div>
    )
}
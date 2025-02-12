"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { CalendarIcon, Pencil, Plus } from "lucide-react"
import { useTheme } from "next-themes"
import Select, { SingleValue } from "react-select"

import { selectCustomStyles } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
      Popover,
      PopoverContent,
      PopoverTrigger,
} from "@/components/ui/popover"

import { EditModal } from "./CommonModal"
import uploadImage from "@/app/hooks/useUploadImage"

type CountryOption = {
      value: string
      label: string
}

const fetchNationalities = async (): Promise<CountryOption[]> => {
      const response = await fetch("https://restcountries.com/v3.1/all")
      const data = await response.json()
      return data.sort((a: any, b: any) => a.name.common.localeCompare(b.name.common)).map((country: any) => ({
            value: country.cca2,
            label: country.name.common,
      }))
}

const IdTypeOptions = [
      { label: "Passport", value: "passport" },
      { label: "NID", value: "NID" },
      { label: "Birth Certificate", value: "birth_certificate" },
]

const UserIdentity = () => {
      const { theme } = useTheme()
      const customStyles = selectCustomStyles(theme || "light")

      const [editNationalityOpen, setEditNationalityOpen] = useState(false)
      const [selectedNationality, setSelectedNationality] = useState({
            label: "Bangladesh",
      })
      const [identificationType, setIdentificationType] = useState<{
            label: string
            value: string
      } | null>(null)
      const [nidImage, setNidImage] = useState<File | null>(null)
      const [nidImageBack, setNidImageBack] = useState<File | null>(null)
      const [nidNumber, setNidNumber] = useState("")
      const [nidIssueDate, setNidIssueDate] = useState<Date | null>(null)

      const {
            data: nationalities = [],
            isLoading,
            isError,
      } = useQuery({
            queryKey: ["nationalities"],
            queryFn: fetchNationalities,
      })

      const handleSave = async () => {
            const data = {
                  selectedNationality,
                  identificationType,
                  image: nidImage,
                  ...(identificationType?.label === "NID" && { back_image: await uploadImage(nidImageBack) }),
                  number: nidNumber,
                  issue_date: nidIssueDate,
            }



            // setEditNationalityOpen(false)
      }


      return (
            <div>
                  <Card>
                        <CardHeader>
                              <CardTitle>Identity</CardTitle>
                        </CardHeader>
                        <CardContent>
                              {selectedNationality || nidNumber || nidImage || nidIssueDate ? (
                                    <div className="space-y-2 text-gray-600 dark:text-slate-200">
                                          <p className="text-sm font-semibold">
                                                Nationality:{" "}
                                                {selectedNationality?.label
                                                      ? selectedNationality?.label
                                                      : "N/A"}
                                          </p>
                                          <p className="text-sm font-semibold">
                                                NID Number: {nidNumber ? nidNumber : "N/A"}
                                          </p>
                                          {nidIssueDate ? (
                                                <p className="text-sm font-semibold">
                                                      ID Issue Date: {format(nidIssueDate, "dd MMM, yyyy")}
                                                </p>
                                          ) : (
                                                <span className="text-sm font-semibold">
                                                      {" "}
                                                      ID Issue Date: N/A
                                                </span>
                                          )}
                                          <div>
                                                <img
                                                      src={
                                                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz-FiPMV4405HDPHTbRP2tbxaK9ysV02HDLA&s"
                                                      }
                                                      alt="NID image"
                                                />
                                          </div>
                                          <Button
                                                onClick={() => setEditNationalityOpen(true)}
                                                variant="outline"
                                          >
                                                <Pencil className="mr-2 h-4 w-4" />
                                                Edit
                                          </Button>
                                    </div>
                              ) : (
                                    <div className="space-y-4">
                                          <p className="text-gray-500">No identity added yet.</p>
                                          <Button
                                                onClick={() => setEditNationalityOpen(true)}
                                                variant="outline"
                                          >
                                                <Plus className="mr-2 h-4 w-4" />
                                                Add Identity
                                          </Button>
                                    </div>
                              )}
                        </CardContent>
                  </Card>

                  {editNationalityOpen && (
                        <EditModal
                              open={editNationalityOpen}
                              onOpenChange={setEditNationalityOpen}
                              title={
                                    selectedNationality || nidNumber || nidImage || nidIssueDate
                                          ? "Edit Identity"
                                          : "Add Identity"
                              }
                        >
                              <form
                                    onSubmit={(e) => {
                                          e.preventDefault()
                                          handleSave()
                                    }}
                                    className="space-y-6"
                              >
                                    <div>
                                          <Label className="mb-2" htmlFor="nationality">
                                                Select Nationality
                                          </Label>
                                          {isLoading ? (
                                                <p>Loading...</p>
                                          ) : isError ? (
                                                <p className="text-red-500">Failed to load nationalities</p>
                                          ) : (
                                                <Select
                                                      id="nationality"
                                                      className="text-sm"
                                                      options={nationalities}
                                                      value={selectedNationality}
                                                      onChange={(option) =>
                                                            setSelectedNationality(option as CountryOption)
                                                      }
                                                      isSearchable
                                                      placeholder="Select nationality"
                                                      styles={customStyles}
                                                />
                                          )}
                                    </div>

                                    <div>
                                          <Label className="mb-2" htmlFor="id-type">
                                                Identification Type
                                          </Label>
                                          <select
                                                id="id-type"
                                                className="mt-1.5 w-full p-2 rounded-lg border border-gray-800 text-gray-700 sm:text-sm"

                                                onChange={(e) =>
                                                      setIdentificationType({
                                                            value: e.target.value,
                                                            label: e.target.value,
                                                      })
                                                }
                                          // value={identificationType}
                                          // onChange={(option) => setIdentificationType(option)}
                                          >
                                                <option value="">
                                                      Select an option
                                                </option>
                                                {IdTypeOptions.map((option) => (
                                                      <option selected={option.value === identificationType?.value} key={option.value} value={option.value}>
                                                            {option.label}
                                                      </option>
                                                ))}
                                          </select>
                                    </div>

                                    {identificationType?.value?.length ? (
                                          <div>
                                                <Label className="mb-2 capitalize" htmlFor="nid-image">
                                                      Upload Image of {identificationType?.value} Front side
                                                </Label>
                                                <Input
                                                      id="nid-image"
                                                      className="text-sm"
                                                      type="file"
                                                      accept="image/*"
                                                      onChange={(e) =>
                                                            setNidImage(e.target.files ? e.target.files[0] : null)
                                                      }
                                                />
                                          </div>
                                    ) : null}

                                    {identificationType?.value === "NID" && (
                                          <div>
                                                <Label className="mb-2 capitalize" htmlFor="nid-image">
                                                      Upload Image of {identificationType?.value} Back side
                                                </Label>
                                                <Input
                                                      id="nid-image"
                                                      className="text-sm"
                                                      type="file"
                                                      accept="image/*"
                                                      onChange={(e) =>
                                                            setNidImageBack(e.target.files ? e.target.files[0] : null)
                                                      }
                                                />
                                          </div>
                                    )}
                                    {identificationType?.value.length ? (
                                          <div>
                                                <Label className="mb-2 capitalize" htmlFor="nid-number">
                                                      {identificationType?.value} Number
                                                </Label>
                                                <Input
                                                      id="nid-number"
                                                      className="text-sm"
                                                      placeholder={`Enter ${identificationType?.value} number`}
                                                      type="text"
                                                      value={nidNumber}
                                                      onChange={(e) => setNidNumber(e.target.value)}
                                                />
                                          </div>
                                    ) : (
                                          ""
                                    )}
                                    {identificationType?.value.length ? (
                                          <div className="flex flex-col justify-start">
                                                <Label className="mb-2 capitalize" htmlFor="issue-date">
                                                      {identificationType?.value} Issue Date
                                                </Label>
                                                <Popover>
                                                      <PopoverTrigger asChild>
                                                            <Button variant="outline" className="justify-start text-sm">
                                                                  <CalendarIcon className="mr-2" />
                                                                  {nidIssueDate
                                                                        ? format(nidIssueDate, "PPP")
                                                                        : "Select a date"}
                                                            </Button>
                                                      </PopoverTrigger>
                                                      <PopoverContent>
                                                            <Calendar
                                                                  className="text-sm"
                                                                  mode="single"
                                                                  selected={nidIssueDate as Date}
                                                                  onSelect={setNidIssueDate as any}
                                                            />
                                                      </PopoverContent>
                                                </Popover>
                                          </div>
                                    ) : null}
                                    <div className="flex justify-end ">
                                          <Button type="submit" disabled={!selectedNationality}>
                                                Save
                                          </Button>
                                    </div>
                              </form>
                        </EditModal>
                  )
                  }
            </div >
      )
}

export default UserIdentity

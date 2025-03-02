"use client"

import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Pencil, Plus } from "lucide-react"
import { useTheme } from "next-themes"
import Select from "react-select"

import { cn, selectCustomStyles } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

import { EditModal } from "./CommonModal"
import { Checkbox } from "@/components/ui/checkbox"
import { set_user_data, useUserData } from "@/utils/encript_decript"
import useApiForPost from "@/app/hooks/useApiForPost"

type Option = {
      value: string
      label: string
}

const fetchCountries = async (): Promise<Option[]> => {
      const response = await fetch("http://api.geonames.org/countryInfoJSON?username=brightfuturesoft")
      const data = await response.json()
      return data?.geonames?.map((country: any) => ({
            value: country.geonameId,
            label: country.countryName,
      }))
}

const fetchDivisions = async (countryId: string): Promise<Option[]> => {
      if (!countryId) return []
      const response = await fetch(`http://api.geonames.org/childrenJSON?geonameId=${countryId}&username=brightfuturesoft`)
      const data = await response.json()
      return data?.geonames?.map((division: any) => ({
            value: division.geonameId,
            label: division.name,
      }))
}

const fetchCities = async (divisionId: string): Promise<Option[]> => {
      if (!divisionId) return []
      const response = await fetch(`http://api.geonames.org/childrenJSON?geonameId=${divisionId}&username=brightfuturesoft`)
      const data = await response.json()
      return data?.geonames?.map((city: any) => ({
            value: city.geonameId,
            label: city.name,
      }))
}

const Address = () => {
      const { theme } = useTheme()
      const [user, setUserData] = useUserData()
      const [loading, setLoading] = useState(false)
      const [error_message, set_error_message] = useState("")
      const { apiRequest } = useApiForPost()
      const customStyles = selectCustomStyles(theme || "light")
      const [editAddressOpen, setEditAddressOpen] = useState(false)
      const [sameAsPresent, setSameAsPresent] = useState(false)


      const [addressData, setAddressData] = useState({
            presentCountry: null as Option | null,
            presentDivision: null as Option | null,
            presentCity: null as Option | null,
            permanentCountry: null as Option | null,
            permanentDivision: null as Option | null,
            permanentCity: null as Option | null,
      })

      useEffect(() => {

            if (user?.address) {
                  setAddressData({
                        ...user?.address
                  })
            }
      }, [user]);

      const { data: countries = [], isLoading: loadingCountries } = useQuery({
            queryKey: ["countries"],
            queryFn: fetchCountries,
      })

      const { data: presentDivisions = [], isLoading: loadingPresentDivisions } = useQuery({
            queryKey: ["divisions", addressData.presentCountry?.value],
            queryFn: () => fetchDivisions(addressData.presentCountry?.value || ""),
            enabled: !!addressData.presentCountry,
      })

      const { data: presentCities = [], isLoading: loadingPresentCities } = useQuery({
            queryKey: ["cities", addressData.presentDivision?.value],
            queryFn: () => fetchCities(addressData.presentDivision?.value || ""),
            enabled: !!addressData.presentDivision,
      })

      // Permanent Address Queries
      const { data: permanentDivisions = [], isLoading: loadingPermanentDivisions } = useQuery({
            queryKey: ["permanentDivisions", addressData.permanentCountry?.value],
            queryFn: () => fetchDivisions(addressData.permanentCountry?.value || ""),
            enabled: !!addressData.permanentCountry && !sameAsPresent, // Disable if "Same as Present" is checked
      })

      const { data: permanentCities = [], isLoading: loadingPermanentCities } = useQuery({
            queryKey: ["permanentCities", addressData.permanentDivision?.value],
            queryFn: () => fetchCities(addressData.permanentDivision?.value || ""),
            enabled: !!addressData.permanentDivision && !sameAsPresent, // Disable if "Same as Present" is checked
      })

      const handleSave = () => {
            console.log("Address data:", addressData)
            update_contact()
            setEditAddressOpen(false)
      }

      // Handle the "Same as Present Address" checkbox
      const handleSameAsPresent = (checked: boolean) => {
            setSameAsPresent(checked)
            if (checked) {
                  setAddressData((prev) => ({
                        ...prev,
                        permanentCountry: prev.presentCountry,
                        permanentDivision: prev.presentDivision,
                        permanentCity: prev.presentCity,
                  }))
            } else {
                  setAddressData((prev) => ({
                        ...prev,
                        permanentCountry: null,
                        permanentDivision: null,
                        permanentCity: null,
                  }))
            }
      }

      const update_contact = async () => {
            setLoading(true)
            const { data, error } = await apiRequest<any>(
                  `api/v1/user/update-profile?id=${user?._id}`,
                  "PUT",
                  {
                        address: addressData,
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
                  setEditAddressOpen(false)
            }
      }

      return (
            <div>
                  <Card>
                        <CardHeader>
                              <CardTitle>Address</CardTitle>
                        </CardHeader>
                        <CardContent>
                              {Object.values(addressData).some((field) => field) ? (
                                    <div className="space-y-4 text-gray-600 dark:text-slate-200">
                                          <p className="flex items-center gap-2">
                                                <strong>Present Address:</strong>
                                                {`${addressData.presentCity?.label || "N/A"}, ${addressData.presentDivision?.label || "N/A"}, ${addressData.presentCountry?.label || "N/A"}`}
                                          </p>
                                          <p className="flex items-center gap-2">
                                                <strong>Permanent Address:</strong>
                                                {`${addressData.permanentCity?.label || "N/A"}, ${addressData.permanentDivision?.label || "N/A"}, ${addressData.permanentCountry?.label || "N/A"}`}
                                          </p>
                                          <Button onClick={() => setEditAddressOpen(true)} variant="outline">
                                                <Pencil className="mr-2 h-4 w-4" />
                                                Edit Address
                                          </Button>
                                    </div>
                              ) : (
                                    <div>
                                          <p className="mb-3 text-gray-500">No address added yet.</p>
                                          <Button onClick={() => setEditAddressOpen(true)} variant="outline">
                                                <Plus className="mr-2 h-4 w-4" />
                                                Add Address
                                          </Button>
                                    </div>
                              )}
                        </CardContent>
                  </Card>

                  {editAddressOpen && (
                        <EditModal open={editAddressOpen} onOpenChange={setEditAddressOpen} title="Edit Address">
                              <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
                                    <div>
                                          <Label className="mb-2">Present Address</Label>
                                          <div className="flex flex-col gap-4">
                                                <Select options={countries} value={addressData.presentCountry} onChange={(option) => setAddressData((prev) => ({ ...prev, presentCountry: option }))} isLoading={loadingCountries} placeholder="Select Country" styles={customStyles} />
                                                <Select options={presentDivisions} value={addressData.presentDivision} onChange={(option) => setAddressData((prev) => ({ ...prev, presentDivision: option }))} isLoading={loadingPresentDivisions} placeholder="Select Division" styles={customStyles} />
                                                <Select options={presentCities} value={addressData.presentCity} onChange={(option) => setAddressData((prev) => ({ ...prev, presentCity: option }))} isLoading={loadingPresentCities} placeholder="Select City" styles={customStyles} />
                                          </div>
                                    </div>

                                    <div>
                                          <div className="flex items-center justify-between">
                                                <Label className="mb-2">Permanent Address</Label>
                                                <Label className="mb-2 flex items-center">
                                                      Same as present address
                                                      <Checkbox className="ml-2" checked={sameAsPresent} onCheckedChange={handleSameAsPresent} />
                                                </Label>
                                          </div>
                                          {!sameAsPresent && (
                                                <div className="flex flex-col gap-4">
                                                      <Select options={countries} value={addressData.permanentCountry} onChange={(option) => setAddressData((prev) => ({ ...prev, permanentCountry: option }))} isLoading={loadingCountries} placeholder="Select Country" styles={customStyles} />
                                                      <Select options={permanentDivisions} value={addressData.permanentDivision} onChange={(option) => setAddressData((prev) => ({ ...prev, permanentDivision: option }))} isLoading={loadingPermanentDivisions} placeholder="Select Division" styles={customStyles} />
                                                      <Select options={permanentCities} value={addressData.permanentCity} onChange={(option) => setAddressData((prev) => ({ ...prev, permanentCity: option }))} isLoading={loadingPermanentCities} placeholder="Select City" styles={customStyles} />
                                                </div>
                                          )}
                                    </div>

                                    <div className="text-right">
                                          <Button type="submit">Save</Button>
                                    </div>
                              </form>
                        </EditModal>
                  )}
            </div>
      )
}

export default Address

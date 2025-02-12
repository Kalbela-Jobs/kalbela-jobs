"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Pencil, Plus } from "lucide-react"
import { useTheme } from "next-themes"
import Select from "react-select"

import { cn, selectCustomStyles } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

import { EditModal } from "./CommonModal"

type Option = {
  value: string
  label: string
}

const fetchCountries = async (): Promise<Option[]> => {
  const response = await fetch("https://restcountries.com/v3.1/all")
  const data = await response.json()
  return data.map((country: any) => ({
    value: country.cca2,
    label: country.name.common,
  }))
}

const fetchDivisions = async (): Promise<Option[]> => {
  const response = await fetch("https://example.com/divisions")
  const data = await response.json()
  return data.map((division: any) => ({
    value: division.id,
    label: division.name,
  }))
}

const fetchCities = async (): Promise<Option[]> => {
  const response = await fetch("https://example.com/cities")
  const data = await response.json()
  return data.map((city: any) => ({
    value: city.id,
    label: city.name,
  }))
}

const Address = () => {
  const { theme } = useTheme()
  const customStyles = selectCustomStyles(theme || "light")
  const [editAddressOpen, setEditAddressOpen] = useState(false)
  const [addressData, setAddressData] = useState({
    presentCountry: null as Option | null,
    presentDivision: null as Option | null,
    presentCity: null as Option | null,
    permanentCountry: null as Option | null,
    permanentDivision: null as Option | null,
    permanentCity: null as Option | null,
  })

  const { data: countries = [], isLoading: loadingCountries } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  })

  const { data: divisions = [], isLoading: loadingDivisions } = useQuery({
    queryKey: ["divisions"],
    queryFn: fetchDivisions,
  })

  const { data: cities = [], isLoading: loadingCities } = useQuery({
    queryKey: ["cities"],
    queryFn: fetchCities,
  })

  const handleSave = () => {
    console.log("Address data:", addressData)
    setEditAddressOpen(false)
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
              <p>
                <strong>Present Address:</strong>
                {`${addressData.presentCity?.label || "N/A"}, ${addressData.presentDivision?.label || "N/A"}, ${addressData.presentCountry?.label || "N/A"}`}
              </p>
              <p>
                <strong>Permanent Address:</strong>
                {`${addressData.permanentCity?.label || "N/A"}, ${addressData.permanentDivision?.label || "N/A"}, ${addressData.permanentCountry?.label || "N/A"}`}
              </p>
              <Button
                onClick={() => setEditAddressOpen(true)}
                variant="outline"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit Address
              </Button>
            </div>
          ) : (
            <div>
              <p className="mb-3 text-gray-500">No address added yet.</p>
              <Button
                onClick={() => setEditAddressOpen(true)}
                variant="outline"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Address
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {editAddressOpen && (
        <EditModal
          open={editAddressOpen}
          onOpenChange={setEditAddressOpen}
          title="Edit Address"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSave()
            }}
            className="space-y-6"
          >
            <div>
              <Label className="mb-2">Present Address</Label>
              <div className="flex flex-col gap-4">
                <Select
                  options={countries}
                  value={addressData.presentCountry}
                  onChange={(option) =>
                    setAddressData((prev) => ({
                      ...prev,
                      presentCountry: option,
                    }))
                  }
                  isLoading={loadingCountries}
                  placeholder="Select Country"
                  styles={customStyles}
                />
                <Select
                  options={divisions}
                  value={addressData.presentDivision}
                  onChange={(option) =>
                    setAddressData((prev) => ({
                      ...prev,
                      presentDivision: option,
                    }))
                  }
                  isLoading={loadingDivisions}
                  placeholder="Select Division"
                  styles={customStyles}
                />
                <Select
                  options={cities}
                  value={addressData.presentCity}
                  onChange={(option) =>
                    setAddressData((prev) => ({
                      ...prev,
                      presentCity: option,
                    }))
                  }
                  isLoading={loadingCities}
                  placeholder="Select City"
                  styles={customStyles}
                />
              </div>
            </div>

            <div>
              <Label className="mb-2">Permanent Address</Label>
              <div className="flex flex-col gap-4">
                <Select
                  options={countries}
                  value={addressData.permanentCountry}
                  onChange={(option) =>
                    setAddressData((prev) => ({
                      ...prev,
                      permanentCountry: option,
                    }))
                  }
                  isLoading={loadingCountries}
                  placeholder="Select Country"
                  styles={customStyles}
                />
                <Select
                  options={divisions}
                  value={addressData.permanentDivision}
                  onChange={(option) =>
                    setAddressData((prev) => ({
                      ...prev,
                      permanentDivision: option,
                    }))
                  }
                  isLoading={loadingDivisions}
                  placeholder="Select Division"
                  styles={customStyles}
                />
                <Select
                  options={cities}
                  value={addressData.permanentCity}
                  onChange={(option) =>
                    setAddressData((prev) => ({
                      ...prev,
                      permanentCity: option,
                    }))
                  }
                  isLoading={loadingCities}
                  placeholder="Select City"
                  styles={customStyles}
                />
              </div>
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

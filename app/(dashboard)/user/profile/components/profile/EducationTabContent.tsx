import useApiForPost from '@/app/hooks/useApiForPost';
import { selectCustomStyles } from '@/lib/utils';
import { useUserData } from '@/utils/encript_decript';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import Address from '../Address';
import Educations from '../Educations';
import Experience from '../Experience';

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
const EducationTabContent: React.FC = () => {
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
            // set_user_data(data.data)
            setUserData(data.data)
            set_error_message("")
            setEditAddressOpen(false)
        }
    }
    return (
        <div>
            <Educations />
            <Experience />
        </div>
    );
};

export default EducationTabContent;
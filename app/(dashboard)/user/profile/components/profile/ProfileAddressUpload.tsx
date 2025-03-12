import useApiForPost from "@/app/hooks/useApiForPost";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserData } from "@/utils/encript_decript";
import { Pencil, Plus, User } from "lucide-react";
import { useEffect, useState } from "react";
import { EditModal } from "../CommonModal";
import Select from 'react-select';
import ProfileAddressTable from "./ProfileAddressTable";

const ProfileAddressUpload = () => {
    const [user, setUserData] = useUserData();
    console.log('>>>------------------>', user);

    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [addressError, setAddressError] = useState(null)
    const [addressSwitch, setAddressSwitch] = useState(false);
    const { apiRequest } = useApiForPost()

    const [presentAddress, setPresentAddress] = useState({
        country: '',
        division: '',
        upazila: '',
        postOffice: '',
        postCode: '',
        streetVillage: '',
    });

    const [isOtherCountry, setIsOtherCountry] = useState(false);
    const [permanentAddress, setPermanentAddress] = useState({
        country: '',
        division: '',
        upazila: '',
        postOffice: '',
        postCode: '',
        streetVillage: '',
    });

    useEffect(() => {
        if (user?.present_address) {
            setPresentAddress(user.present_address)
        }
        if (user?.permanent_address) {
            setPermanentAddress(user.permanent_address)
        }
    }, [user]);

    const handlePresentAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setPresentAddress({
            ...presentAddress,
            [e.target.name]: e.target.value
        });
    }

    const handlePermanentAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setPermanentAddress({
            ...permanentAddress,
            [e.target.name]: e.target.value
        });
    }

    const handleOtherCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsOtherCountry(e.target.checked);
    }

    const handleUpdate = async () => {
        console.log({
            present_address: presentAddress,
            permanent_address: permanentAddress,
        });

        setLoading(true);
        const { data, error } = await apiRequest<any>(
            `api/v1/user/update-address?id=${user?._id}`,
            "PUT",
            {
                present_address: presentAddress,
                permanent_address: permanentAddress,
            }
        )

        setLoading(false);
        if (error) {
            setAddressError(error.message);
            return;
        }
        if (data) {
            setUserData(data.data);
            setAddressError(null);
        }
    }

    const countryOptions = [
        { value: 'Bangladesh', label: 'Bangladesh' },
        { value: 'Other', label: 'Other' }
    ];


    return (
        <div>

            {
                user?.address?.presentCountry?.label
                    ? <ProfileAddressTable data={user?.address} />
                    : <EmptyState
                        title="No information added yet"
                        description="Add your professional title and a brief description about yourself."
                        icon={<User className="h-10 w-10" />}
                        action={
                            <Button
                                variant="destructive"
                                className="gap-2 mt-3 !bg-primary"
                                onClick={() => setIsOpen(true)}
                            >
                                <Plus className="h-4 w-4" />
                                Add Address
                            </Button>
                        }
                    />
            }



            {user?.address?.presentCountry?.label &&
                <Button
                    variant="destructive"
                    className="gap-2 mt-3 !bg-primary"
                    onClick={() => setIsOpen(true)}
                >
                    <Pencil className="h-4 w-4" />
                    Edit
                </Button>
            }

            <EditModal
                title={addressSwitch ? "Permanent Address" : "Present Address"}
                description=""
                open={isOpen}
                onOpenChange={() => setIsOpen(false)} >

                <div className="flex items-center border md:mt-2 mt-6 rounded-md p-1">
                    <button
                        onClick={() => setAddressSwitch(false)}
                        className={`md:text-md text-sm rounded-md duration-300 hover:bg-gray-50 ${!addressSwitch ? '!bg-primary text-white ' : 'bg-transparent text-black '} w-full text-center py-2`}> Present Address</button>
                    <button
                        onClick={() => setAddressSwitch(true)}
                        className={`md:text-md text-sm rounded-md duration-300 hover:bg-gray-50 ${addressSwitch ? '!bg-primary text-white ' : 'bg-transparent text-black '} w-full text-center py-2`}> Permanent Address</button>
                </div>


                <div className={`${addressSwitch ? 'grid' : 'hidden'} gap-4 py-4`}>
                    <div className="grid gap-2">
                        <Label htmlFor="presentCountry">Country</Label>
                        <Select
                            id="presentCountry"
                            name="country"
                            options={countryOptions}
                            onChange={(selected) => handlePresentAddressChange({ target: { name: 'country', value: selected?.value || '' } } as unknown as React.ChangeEvent<HTMLInputElement>)}
                            placeholder="Select country..."
                        />
                    </div>
                    {isOtherCountry ? (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="presentState">State/Region</Label>
                                <Input
                                    id="presentState"
                                    name="state"
                                    onChange={handlePresentAddressChange}
                                    type="text"
                                    placeholder="State/Region"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="presentPostalCode">Postal/Zip Code</Label>
                                <Input
                                    id="presentPostalCode"
                                    name="postalCode"
                                    onChange={handlePresentAddressChange}
                                    type="text"
                                    placeholder="Postal/Zip Code"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="presentStreetAddress">Street Address</Label>
                                <Input
                                    id="presentStreetAddress"
                                    name="streetAddress"
                                    onChange={handlePresentAddressChange}
                                    type="text"
                                    placeholder="Street Address"
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="presentDivision">Division</Label>
                                <Input
                                    id="presentDivision"
                                    name="division"
                                    onChange={handlePresentAddressChange}
                                    type="text"
                                    placeholder="Division"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="presentUpazila">Upazila/P.S</Label>
                                <Input
                                    id="presentUpazila"
                                    name="upazila"
                                    onChange={handlePresentAddressChange}
                                    type="text"
                                    placeholder="Upazila/P.S"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="presentPostOffice">Post Office</Label>
                                <Input
                                    id="presentPostOffice"
                                    name="postOffice"
                                    onChange={handlePresentAddressChange}
                                    type="text"
                                    placeholder="Post Office"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="presentPostCode">Post Code</Label>
                                <Input
                                    id="presentPostCode"
                                    name="postCode"
                                    onChange={handlePresentAddressChange}
                                    type="number"
                                    placeholder="Post Code"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="presentStreetVillage">Street/Village</Label>
                                <Input
                                    id="presentStreetVillage"
                                    name="streetVillage"
                                    onChange={handlePresentAddressChange}
                                    type="text"
                                    placeholder="Street/Village"
                                />
                            </div>
                        </>
                    )}
                </div>


                <div className={`${addressSwitch ? 'hidden' : 'grid'} gap-4 py-4`}>
                    <div className="grid gap-2">
                        <Label htmlFor="permanentCountry">Country</Label>
                        <Select
                            id="permanentCountry"
                            name="country"
                            options={countryOptions}
                            onChange={(selected) => handlePermanentAddressChange({ target: { name: 'country', value: selected?.value || '' } } as unknown as React.ChangeEvent<HTMLInputElement>)}
                            placeholder="Select country..."
                        />
                    </div>
                    {isOtherCountry ? (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="permanentState">State/Region</Label>
                                <Input
                                    id="permanentState"
                                    name="state"
                                    onChange={handlePermanentAddressChange}
                                    type="text"
                                    placeholder="State/Region"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="permanentPostalCode">Postal/Zip Code</Label>
                                <Input
                                    id="permanentPostalCode"
                                    name="postalCode"
                                    onChange={handlePermanentAddressChange}
                                    type="text"
                                    placeholder="Postal/Zip Code"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="permanentStreetAddress">Street Address</Label>
                                <Input
                                    id="permanentStreetAddress"
                                    name="streetAddress"
                                    onChange={handlePermanentAddressChange}
                                    type="text"
                                    placeholder="Street Address"
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="permanentDivision">Division</Label>
                                <Input
                                    id="permanentDivision"
                                    name="division"
                                    onChange={handlePermanentAddressChange}
                                    type="text"
                                    placeholder="Division"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="permanentUpazila">Upazila/P.S</Label>
                                <Input
                                    id="permanentUpazila"
                                    name="upazila"
                                    onChange={handlePermanentAddressChange}
                                    type="text"
                                    placeholder="Upazila/P.S"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="permanentPostOffice">Post Office</Label>
                                <Input
                                    id="permanentPostOffice"
                                    name="postOffice"
                                    onChange={handlePermanentAddressChange}
                                    type="text"
                                    placeholder="Post Office"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="permanentPostCode">Post Code</Label>
                                <Input
                                    id="permanentPostCode"
                                    name="postCode"
                                    onChange={handlePermanentAddressChange}
                                    type="number"
                                    placeholder="Post Code"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="permanentStreetVillage">Street/Village</Label>
                                <Input
                                    id="permanentStreetVillage"
                                    name="streetVillage"
                                    onChange={handlePermanentAddressChange}
                                    type="text"
                                    placeholder="Street/Village"
                                />
                            </div>
                        </>
                    )}
                </div>

                <br />
                <div>
                    <Button onClick={handleUpdate} type="submit">
                        Update
                    </Button>
                </div>

            </EditModal>
        </div>
    );
};

export default ProfileAddressUpload;

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
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Edit2, Pencil } from 'lucide-react';
import { format } from 'date-fns';
import uploadImage from '@/app/hooks/useUploadImage';
import { EditModal } from '../CommonModal';
import { selectCustomStyles } from '@/lib/utils';
import ProfilePersonalDetailsForm from './ProfilePersonalDetailsForm';
import { useUserData } from '@/utils/encript_decript';

type CountryOption = {
    value: string;
    label: string;
};

const fetchNationalities = async (): Promise<CountryOption[]> => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    return data
        .sort((a: any, b: any) => a.name.common.localeCompare(b.name.common))
        .map((country: any) => ({
            value: country.cca2,
            label: country.name.common,
        }));
};

const IdTypeOptions = [
    { label: 'Passport', value: 'passport' },
    { label: 'NID', value: 'NID' },
    { label: 'Birth Certificate', value: 'birth_certificate' },
];

const ProfilePersonalDetails: React.FC = () => {
    const [user] = useUserData();
    const { theme } = useTheme();
    const customStyles = selectCustomStyles(theme || 'light');

    const [personalDetails, setPersonalDetails] = useState({
        fullName: 'John Doe',
        fatherName: 'Richard Roe',
        motherName: 'Jane Roe',
        dateOfBirth: new Date('1990-01-01'),
        birthRegistration: { value: 'Yes', label: 'Yes' },
        nationality: { value: 'Yes', label: 'Yes' },
        nationalID: '1234567890',
        gender: { value: 'Male', label: 'Male' },
        bloodGroup: { value: 'O+', label: 'O+' },
        religion: 'Muslim',
        maritalStatus: { value: 'Single', label: 'Single' },
        passportID: 'A1234567',
        drivingLicense: 'B1234567',
        physicalHandicap: false,
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formLoading, setFormLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setPersonalDetails((prevDetails) => ({
            ...prevDetails,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSelectChange = (selectedOption: any, actionMeta: any) => {
        const { name } = actionMeta;
        setPersonalDetails((prevDetails) => ({
            ...prevDetails,
            [name]: selectedOption,
        }));
    };

    const handleDateChange = (date: any) => {
        setPersonalDetails((prevDetails) => ({
            ...prevDetails,
            dateOfBirth: date,
        }));
    };

    const selectOptions = {
        birthRegistration: [
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' },
        ],
        nationality: [
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' },
        ],
        gender: [
            { value: 'Male', label: 'Male' },
            { value: 'Female', label: 'Female' },
        ],
        bloodGroup: [
            { value: 'O+', label: 'O+' },
            { value: 'A+', label: 'A+' },
            { value: 'B+', label: 'B+' },
            { value: 'AB+', label: 'AB+' },
        ],
        maritalStatus: [
            { value: 'Single', label: 'Single' },
            { value: 'Married', label: 'Married' },
        ],
    };

    const [selectedNationality, setSelectedNationality] = useState({
        label: 'Bangladesh',
    });
    const [identificationType, setIdentificationType] = useState<{ label: string; value: string } | null>(null);
    const [nidImage, setNidImage] = useState<File | null>(null);
    const [nidImageBack, setNidImageBack] = useState<File | null>(null);
    const [nidNumber, setNidNumber] = useState('');
    const [nidIssueDate, setNidIssueDate] = useState<Date | null>(null);

    const {
        data: nationalities = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['nationalities'],
        queryFn: fetchNationalities,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormLoading(true);
        const newObj = {
            ...personalDetails,
            selectedNationality,
            identificationType,
            image: await uploadImage(nidImage),
            ...(identificationType?.label === 'NID' && { back_image: await uploadImage(nidImageBack) }),
            passport_number: nidNumber,
            issue_date: nidIssueDate,
        };
        console.log(newObj);

        try {
            const response = await fetch(`/api/v1/user/update-profile?id=${user?._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newObj),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log(responseData);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setFormLoading(false);
            setIsDialogOpen(false);
        }
    };

    return (
        <div>
            <ul className='space-y-1 text-md list-disc ml-6 pb-2'>
                <li><strong>Full Name : </strong> {user?.fullName}</li>
                <li><strong>Father Name : </strong> {user?.fatherName}</li>
                <li><strong>Mother Name : </strong> {user?.motherName ?? 'N/A'}</li>
                <li><strong>Date of Birth : </strong>
                    {new Date(user?.dateOfBirth).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </li>
                <li><strong>Birth Registration : </strong> {personalDetails.birthRegistration.label}</li>
                <li><strong>Nationality : </strong> {personalDetails.nationality.label}</li>
                <li><strong>National ID : </strong> {personalDetails.nationalID}</li>
                <li><strong>Gender : </strong> {personalDetails.gender.label}</li>
                <li><strong>Blood Group : </strong> {personalDetails.bloodGroup.label}</li>
                <li><strong>Religion : </strong> {personalDetails.religion}</li>
                <li><strong>Marital Status : </strong> {personalDetails.maritalStatus.label}</li>
                <li><strong>Passport ID : </strong> {personalDetails.passportID}</li>
                <li><strong>Driving License : </strong> {personalDetails.drivingLicense}</li>
                <li><strong>Physical Handicap : </strong> {personalDetails.physicalHandicap ? 'Yes' : 'No'}</li>
            </ul>
            <hr />
            {/* <Button onClick={() => setIsDialogOpen(true)} className='mt-3 !bg-primary'>
                <Edit2 strokeWidth={1} /> Edit
            </Button> */}

            <Button
                variant="destructive"
                className="gap-2 mt-3 !bg-primary"
                onClick={() => setIsDialogOpen(true)}
            >
                <Pencil className="h-4 w-4" />
                Edit details
            </Button>

            <EditModal open={isDialogOpen} onOpenChange={setIsDialogOpen} title='Edit Personal Details' description='Edit your personal details here.'>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <ProfilePersonalDetailsForm
                        personalDetails={user}
                        handleChange={handleChange}
                        handleSelectChange={handleSelectChange}
                        handleDateChange={handleDateChange}
                        selectOptions={selectOptions}
                        customStyles={customStyles}
                        nationalities={nationalities}
                        isLoading={isLoading}
                        isError={isError}
                        selectedNationality={selectedNationality}
                        setSelectedNationality={setSelectedNationality}
                        identificationType={identificationType}
                        setIdentificationType={setIdentificationType}
                        nidImage={nidImage}
                        setNidImage={setNidImage}
                        nidImageBack={nidImageBack}
                        setNidImageBack={setNidImageBack}
                        nidNumber={nidNumber}
                        setNidNumber={setNidNumber}
                        nidIssueDate={nidIssueDate}
                        setNidIssueDate={setNidIssueDate}
                    />
                    <Button type='submit' disabled={formLoading}>
                        {formLoading ? 'Saving...' : 'Save'}
                    </Button>
                </form>
            </EditModal>
        </div>
    );
};

export default ProfilePersonalDetails;
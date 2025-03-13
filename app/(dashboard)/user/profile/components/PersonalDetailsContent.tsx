'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUserData } from '@/utils/encript_decript';
import { Pencil, Save, X } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadProfile from './UploadProfile';

interface PersonalDetailsContentProps {
    isEditing: boolean;
    toggleEditMode: () => void;
    handleSave: (userData: any) => void;
}

const PersonalDetailsContent: React.FC<PersonalDetailsContentProps> = ({
    isEditing,
    toggleEditMode,
    handleSave,
}) => {
    const [user] = useUserData();
    const [file, setFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        fullName: user?.fullName || '',
        fatherName: user?.fatherName || '',
        motherName: user?.motherName || '',
        dateOfBirth: user?.date_of_birth || '',
        gender: user?.gender,
        email: user?.email,
        religion: user?.religion,
        nationality: user?.nationality,
        passportNumber: user?.passportNumber || '',
        passportIssueDate: '2018-05-15',
        primaryMobile: user?.primaryMobile || '',
        secondaryMobile: user?.secondaryMobile || '',
        alternateEmail: user?.alternateEmail || '',
        height: user?.height || '',
        weight: user?.weight || '',
        profile_picture: user?.profile_picture || '',
    });

    useEffect(() => {
        setFormData({
            fullName: user?.fullName || '',
            fatherName: user?.fatherName || '',
            motherName: user?.motherName || '',
            dateOfBirth: user?.date_of_birth || '',
            gender: user?.gender,
            email: user?.email,
            religion: user?.religion,
            nationality: user?.nationality,
            passportNumber: user?.passportNumber || '',
            passportIssueDate: user?.passportIssueDate,
            primaryMobile: user?.primaryMobile || '',
            secondaryMobile: user?.secondaryMobile || '',
            alternateEmail: user?.alternateEmail || '',
            height: user?.height || '',
            weight: user?.weight || '',
            profile_picture: user?.profile_picture || '',
        })
    }, [user])

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFile(acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            'image/*': []
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const saveData = () => {
        const finalData = { ...formData, profile_picture: file };
        console.log('Updated data:', finalData);
        handleSave(finalData);
    };


    console.log('object', user);
    return (
        <div>
            <div className="py-4">
                <div className="px-4 py-2 w-full">
                    <div className="flex justify-between">
                        <UploadProfile
                            file={file}
                            profile_picture={formData.profile_picture}
                            isDragActive={isDragActive} getRootProps={getRootProps}
                            getInputProps={getInputProps}
                            isEditing={isEditing} />

                        {!isEditing && <Button className='mb-4 ml-auto !bg-primary !text-white' variant="outline" size="lg" onClick={toggleEditMode}>
                            <Pencil className="h-4 w-4 " />
                            Edit
                        </Button>}
                    </div>


                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                            id="fullName"
                            placeholder="First Name"
                            readOnly={!isEditing}
                            className={!isEditing ? "bg-gray-50 !border-gray-50" : "!border-gray-900"}
                            value={formData?.fullName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid mt-4 grid-cols-2 gap-x-8 gap-y-4 w-full">
                        <div className="space-y-2">
                            <Label htmlFor="fatherName">Father's Name</Label>
                            <Input
                                id="fatherName"
                                placeholder="Father's Name"
                                readOnly={!isEditing}
                                className={!isEditing ? "bg-gray-50 !border-gray-50" : "!border-gray-900"}
                                value={formData.fatherName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="motherName">Mother's Name</Label>
                            <Input
                                id="motherName"
                                placeholder="Mother's Name"
                                readOnly={!isEditing}
                                className={!isEditing ? "bg-gray-50 !border-gray-50" : "!border-gray-900"}
                                value={formData.motherName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dateOfBirth">Date of Birth</Label>
                            <Input
                                id="dateOfBirth"
                                type="date"
                                readOnly={!isEditing}
                                className={!isEditing ? "bg-gray-50 !border-gray-50" : "!border-gray-900"}
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="gender">Gender</Label>
                            <Select disabled={!isEditing}>
                                <SelectTrigger id="gender" className={!isEditing ? "bg-gray-50 !border-gray-50" : "!border-gray-900"}>
                                    <SelectValue placeholder="Male" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="religion">Religion</Label>
                            <Input
                                id="religion"
                                placeholder="Religion"
                                readOnly={!isEditing}
                                className={!isEditing ? "bg-gray-50 !border-gray-50" : "!border-gray-900"}
                                value={formData.religion}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="nationality">Nationality</Label>
                            <Input
                                id="nationality"
                                placeholder="Nationality"
                                readOnly={!isEditing}
                                className={!isEditing ? "bg-gray-50 !border-gray-50" : "!border-gray-900"}
                                value={formData.nationality}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="passportNumber">Passport Number</Label>
                            <Input
                                id="passportNumber"
                                placeholder="Passport Number"
                                readOnly={!isEditing}
                                className={!isEditing ? "bg-gray-50 !border-gray-50" : "!border-gray-900"}
                                value={formData.passportNumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="passportIssueDate">Passport Issue Date</Label>
                            <Input
                                id="passportIssueDate"
                                type="date"
                                readOnly={!isEditing}
                                className={!isEditing ? "bg-gray-50 !border-gray-50" : "!border-gray-900"}
                                value={formData.passportIssueDate}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="primaryMobile">Primary Mobile</Label>
                            <Input
                                id="primaryMobile"
                                placeholder="Primary Mobile"
                                readOnly={!isEditing}
                                className={!isEditing ? "bg-gray-50 !border-gray-50" : "!border-gray-900"}
                                value={formData.primaryMobile}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="secondaryMobile">Secondary Mobile</Label>
                            <Input
                                id="secondaryMobile"
                                placeholder="Secondary Mobile"
                                readOnly={!isEditing}
                                className={!isEditing ? "bg-gray-50 !border-gray-50" : "!border-gray-900"}
                                value={formData.secondaryMobile}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="alternateEmail">Alternate Email</Label>
                            <Input
                                id="alternateEmail"
                                type="email"
                                placeholder="Alternate Email"
                                readOnly={!isEditing}
                                className={!isEditing ? "bg-gray-50 !border-gray-50" : "!border-gray-900"}
                                value={formData.alternateEmail}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="flex items-center space-x-2">
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData?.email}
                                    readOnly={isEditing}
                                    className={!isEditing ? "bg-gray-50 !border-gray-50" : "!border-gray-900"}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="height">Height (cm)</Label>
                            <Input
                                id="height"
                                type="number"
                                placeholder="Height"
                                readOnly={!isEditing}
                                className={!isEditing ? "bg-gray-50 !border-gray-50" : "!border-gray-900"}
                                value={formData.height}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="weight">Weight (kg)</Label>
                            <Input
                                id="weight"
                                type="number"
                                placeholder="Weight"
                                readOnly={!isEditing}
                                className={!isEditing ? "bg-gray-50 !border-gray-50" : "!border-gray-900"}
                                value={formData.weight}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        {isEditing &&
                            <div className="flex items-center space-x-2">
                                <Button className='!bg-primary !text-white' variant="outline" size="lg" onClick={saveData}>
                                    <Save className="h-4 w-4 mr-2" />
                                    Save
                                </Button>
                                <Button className='!bg-red-500 !text-white' variant="outline" size="lg" onClick={toggleEditMode}>
                                    <X className="h-4 w-4 mr-2" />
                                    Cancel
                                </Button>
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalDetailsContent;
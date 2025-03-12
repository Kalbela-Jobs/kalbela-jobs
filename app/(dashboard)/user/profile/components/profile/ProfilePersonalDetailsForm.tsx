import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Select from 'react-select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

const ProfilePersonalDetailsForm = ({
    personalDetails,
    handleChange,
    handleSelectChange,
    handleDateChange,
    selectOptions,
    customStyles,
    nationalities,
    isLoading,
    isError,
    selectedNationality,
    setSelectedNationality,
    identificationType,
    setIdentificationType,
    nidImage,
    setNidImage,
    nidImageBack,
    setNidImageBack,
    nidNumber,
    setNidNumber,
    nidIssueDate,
    setNidIssueDate,
}: any) => {
    const IdTypeOptions = [
        { label: "Passport", value: "passport" },
        { label: "NID", value: "NID" },
        { label: "Birth Certificate", value: "birth_certificate" },
    ]
    return (
        <>
            <div className="flex flex-col space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" name="fullName" value={personalDetails.fullName} onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-2">
                <Label htmlFor="fatherName">Father Name</Label>
                <Input id="fatherName" name="fatherName" value={personalDetails.fatherName} onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-2">
                <Label htmlFor="motherName">Mother Name</Label>
                <Input id="motherName" name="motherName" value={personalDetails.motherName} onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="justify-start text-sm">
                            <CalendarIcon className="mr-2" />
                            {personalDetails.dateOfBirth ? format(personalDetails.dateOfBirth, "PPP") : "Select a date"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <Calendar className="text-sm" mode="single" selected={personalDetails.dateOfBirth} onSelect={handleDateChange} />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex flex-col space-y-2">
                <Label htmlFor="birthRegistration">Birth Registration</Label>
                <Select
                    id="birthRegistration"
                    name="birthRegistration"
                    options={selectOptions.birthRegistration}
                    value={personalDetails.birthRegistration}
                    onChange={handleSelectChange}
                />
            </div>
            <div>
                <Label className="mb-2" htmlFor="nationality">
                    Nationality
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
                        onChange={(option) => setSelectedNationality(option)}
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
                    onChange={(e) => setIdentificationType({ value: e.target.value, label: e.target.value })}
                >
                    <option value="">Select an option</option>
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
                        className="text-sm mt-2"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setNidImage(e.target.files ? e.target.files[0] : null)}
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
                        className="text-sm mt-2"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setNidImageBack(e.target.files ? e.target.files[0] : null)}
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
                                {nidIssueDate ? format(nidIssueDate, "PPP") : "Select a date"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <Calendar className="text-sm" mode="single" selected={nidIssueDate as Date} onSelect={setNidIssueDate as any} />
                        </PopoverContent>
                    </Popover>
                </div>
            ) : null}

            <div className="flex flex-col space-y-2">
                <Label htmlFor="nationalID">National ID</Label>
                <Input id="nationalID" name="nationalID" value={personalDetails.nationalID} onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select id="gender" name="gender" options={selectOptions.gender} value={personalDetails.gender} onChange={handleSelectChange} />
            </div>
            <div className="flex flex-col space-y-2">
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <Select
                    id="bloodGroup"
                    name="bloodGroup"
                    options={selectOptions.bloodGroup}
                    value={personalDetails.bloodGroup}
                    onChange={handleSelectChange}
                />
            </div>
            <div className="flex flex-col space-y-2">
                <Label htmlFor="religion">Religion</Label>
                <Input id="religion" name="religion" value={personalDetails.religion} onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-2">
                <Label htmlFor="maritalStatus">Marital Status</Label>
                <Select
                    id="maritalStatus"
                    name="maritalStatus"
                    options={selectOptions.maritalStatus}
                    value={personalDetails.maritalStatus}
                    onChange={handleSelectChange}
                />
            </div>
            <div className="flex flex-col space-y-2">
                <Label htmlFor="passportID">Passport ID</Label>
                <Input id="passportID" name="passportID" value={personalDetails.passportID} onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-2">
                <Label htmlFor="drivingLicense">Driving License</Label>
                <Input id="drivingLicense" name="drivingLicense" value={personalDetails.drivingLicense} onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-2">
                <Label className='flex items-center gap-2' htmlFor="physicalHandicap"> <Input className='w-4 h-4' id="physicalHandicap" name="physicalHandicap" type="checkbox" checked={personalDetails.physicalHandicap} onChange={handleChange} /> Physical Handicap</Label>
            </div>
        </>
    );
};

export default ProfilePersonalDetailsForm;
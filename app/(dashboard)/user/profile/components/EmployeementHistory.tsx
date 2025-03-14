'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DateInput, Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import Select from 'react-select';
import { boolean } from 'zod';
import { EditModal } from './CommonModal';

interface TrainingSummaryType {
    companyName: string;
    companyBusiness: string;
    designation: string;
    department: string;
    employmentFrom: string;
    employmentTo: string;
    responsibilities: string;
    skills: string[];
    index?: number;
}

const EmploymentHistory = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [trainings, setTrainings] = useState<TrainingSummaryType[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<any[]>([]);
    const [currentWork, setCurrentWork] = useState(false);

    const {
        data: skillsOptions = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["configuer-skills"],
        queryFn: async () => {
            const res = await fetch(
                `${process.env.NEXT_APP_BASE_URL}/api/v1/config/skills`
            )

            if (!res.ok) {
                throw new Error("Failed to fetch certifications")
            }


            const data = await res.json()
            return data.data.map((skill: any) => ({ value: skill?.name, label: skill?.name }));
        },
    })

    const [currentTraining, setCurrentTraining] = useState<TrainingSummaryType>({
        companyName: '',
        companyBusiness: '',
        designation: '',
        department: '',
        employmentFrom: '',
        employmentTo: '',
        responsibilities: '',
        skills: []
    });

    const handleAddClick = () => {
        setCurrentTraining({
            companyName: '',
            companyBusiness: '',
            designation: '',
            department: '',
            employmentFrom: '',
            employmentTo: '',
            responsibilities: '',
            skills: []
        });
        setSelectedSkills([]);
        setIsEditMode(false);
        setIsDialogOpen(true);
    };

    const handleEditClick = (training: TrainingSummaryType, index: number) => {
        setCurrentTraining({ ...training, index });
        setSelectedSkills(training.skills.map(skill => ({ value: skill, label: skill })));
        setIsEditMode(true);
        setIsDialogOpen(true);
    };

    const handleDeleteClick = (trainingIndex: number) => {
        const updatedTrainings = [...trainings];
        updatedTrainings.splice(trainingIndex, 1);
        setTrainings(updatedTrainings);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setCurrentTraining((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: any) => {
        setCurrentWork(e.target.checked);
        if (e.target.checked) {
            setCurrentTraining((prev) => ({ ...prev, employmentTo: '' }));
        }
    };

    const handleSelectChange = (selectedOptions: any) => {
        setSelectedSkills(selectedOptions);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const form = e.target;

        const data: TrainingSummaryType = {
            companyName: form.companyName.value,
            companyBusiness: form.companyBusiness.value,
            designation: form.designation.value,
            department: form.department.value,
            employmentFrom: form.employmentFrom.value,
            employmentTo: currentWork ? 'Present' : form.employmentTo.value,
            responsibilities: form.responsibilities.value,
            skills: selectedSkills.map(skill => skill.value),
        };

        if (isEditMode && currentTraining.index !== undefined) {
            const updatedTrainings = trainings.map((training, index) =>
                index === currentTraining.index ? data : training
            );
            setTrainings(updatedTrainings);
        } else {
            setTrainings([...trainings, data]);
        }

        console.log("submited data....", data);
        setIsDialogOpen(false);
    };

    return (
        <div className='mb-4 px-4 py-2 w-full space-y-6'>
            {trainings.length === 0 ? (
                <div className="text-center text-xl flex flex-col justify-center items-center bg-gray-50 py-16 text-gray-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={58}
                        height={58}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-user-search m-auto mb-4"
                    >
                        <circle cx={10} cy={7} r={4} />
                        <path d="M10.3 15H7a4 4 0 0 0-4 4v2" />
                        <circle cx={17} cy={17} r={3} />
                        <path d="m21 21-1.9-1.9" />
                    </svg>

                    <p>No data found.</p>
                    {trainings.length === 0 && <Button className='px-6 mt-3' onClick={handleAddClick}><Plus /> Add</Button>}
                </div>
            ) : (
                trainings.map((training, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-md p-4 border">
                        <header className="flex items-center justify-between">
                            <h1 className="text-lg font-semibold">{` Experience-${trainings.length}`}</h1>
                            <div className="flex items-center gap-3">
                                <Button className="text-sm !bg-primary" onClick={() => handleEditClick(training, index)}>Edit</Button>
                                <Button className="text-sm !bg-red-600" onClick={() => handleDeleteClick(index)}>Delete</Button>
                            </div>
                        </header>
                        <main className="grid grid-cols-3 gap-8 mt-3">
                            <div>
                                <h3 className="text-md font-semibold">Company Name</h3>
                                <p className="text-gray-500 mt-2">{training.companyName}</p>
                            </div>
                            <div>
                                <h3 className="text-md font-semibold">Company Business</h3>
                                <p className="text-gray-500 mt-2">{training.companyBusiness}</p>
                            </div>
                            <div>
                                <h3 className="text-md font-semibold">Designation</h3>
                                <p className="text-gray-500 mt-2">{training.designation}</p>
                            </div>
                            <div>
                                <h3 className="text-md font-semibold">Department</h3>
                                <p className="text-gray-500 mt-2">{training.department}</p>
                            </div>
                            <div>
                                <h3 className="text-md font-semibold">Employment Period</h3>
                                <p className="text-gray-500 mt-2">{training.employmentFrom} to {training.employmentTo}</p>
                            </div>
                            <div>
                                <h3 className="text-md font-semibold">Responsibilities</h3>
                                <p className="text-gray-500 mt-2">{training.responsibilities}</p>
                            </div>
                            <div>
                                <h3 className="text-md font-semibold">Skills</h3>
                                <p className="text-gray-500 mt-2">
                                    <p className="flex flex-col md:flex-row md:flex-nowrap flex-wrap gap-2 mt-2">
                                        {training.skills.map((skill: string, index: number) => (
                                            <span key={index} className="mr-2 bg-primary text-white px-2 py-1 rounded text-sm">{skill}</span>
                                        ))}
                                    </p>

                                </p>

                            </div>
                        </main>
                    </div>
                ))
            )}

            {trainings.length !== 0 && <Button className='px-6' onClick={handleAddClick}><Plus /> Add</Button>}

            <EditModal
                className="w-[700px]"
                open={isDialogOpen}
                onOpenChange={handleDialogClose}
                title={isEditMode ? "Edit History" : "Add History"}
            >
                <form onSubmit={handleSubmit} className="space-y-4 pt-6">
                    <div className="space-y-2 flex flex-col">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input id="companyName" name="companyName" type="text" defaultValue={currentTraining.companyName} />
                    </div>
                    <div className="space-y-2 flex flex-col">
                        <Label htmlFor="companyBusiness">Company Business</Label>
                        <Input id="companyBusiness" name="companyBusiness" type="text" defaultValue={currentTraining.companyBusiness} />
                    </div>
                    <div className="space-y-2 flex flex-col">
                        <Label htmlFor="designation">Designation</Label>
                        <Input id="designation" name="designation" type="text" defaultValue={currentTraining.designation} />
                    </div>
                    <div className="space-y-2 flex flex-col">
                        <Label htmlFor="department">Department</Label>
                        <Input id="department" name="department" type="text" defaultValue={currentTraining.department} />
                    </div>
                    <div className="md:flex w-full items-center gap-4">
                        <div className="space-y-2 flex flex-col w-full">
                            <Label htmlFor="employmentFrom">Employment From</Label>
                            <DateInput className='!w-full' id="employmentFrom" name="employmentFrom" type="date" defaultValue={currentTraining.employmentFrom} />
                        </div>
                        <div className="space-y-2 flex flex-col w-full">
                            <Label htmlFor="employmentTo">Employment To</Label>
                            <DateInput
                                className='!w-full'
                                id="employmentTo"
                                name="employmentTo"
                                type="date"
                                defaultValue={currentTraining.employmentTo}
                                disabled={currentWork} // Disable when checkbox is checked
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                        <Checkbox
                            id="currentlyEmployed"
                            checked={currentWork}
                            // @ts-ignore
                            onCheckedChange={(checked) => setCurrentWork(checked)}
                        />
                        <Label htmlFor="currentlyEmployed">Currently Employed</Label>
                    </div>
                    <div className="space-y-2 flex flex-col">
                        <Label htmlFor="responsibilities">Responsibilities</Label>
                        <textarea id="responsibilities" name="responsibilities" className="border !border-gray-300 focus:outline-none rounded-md p-2" rows={3} defaultValue={currentTraining.responsibilities}></textarea>
                    </div>
                    <div className="space-y-2 flex flex-col">
                        <Label htmlFor="skills">Skills</Label>
                        <Select
                            isMulti
                            options={skillsOptions}
                            value={selectedSkills}
                            onChange={handleSelectChange}
                            styles={{
                                menu: (provided) => ({ ...provided, zIndex: 500 }),
                                control: (provided, state) => ({
                                    ...provided,
                                    boxShadow: 'none',
                                    borderColor: state.isFocused ? 'inherit' : provided.borderColor,
                                    '&:hover': { borderColor: 'inherit' },
                                }),
                                multiValue: (provided) => ({
                                    ...provided,
                                    backgroundColor: '#1b2a69',
                                    color: 'white',
                                }),
                                multiValueLabel: (provided) => ({
                                    ...provided,
                                    color: 'white',
                                }),
                            }}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                    </div>
                    <div className="mt-4 flex justify-end">
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </EditModal>
        </div>
    );
};

export default EmploymentHistory;
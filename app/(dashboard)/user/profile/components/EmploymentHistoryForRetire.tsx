'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DateInput, Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select as SelectComponent, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import { GraduationCap, Plus } from 'lucide-react';
import React, { useState } from 'react';
import Select from 'react-select';
import { boolean } from 'zod';
import { EditModal } from './CommonModal';

interface TrainingSummaryType {
    trade: string;
    course: string;
    commission_date: string;
    retirement_date: string;
    companyName: string;
    rank: string;
    type: string;
    arms: string;
}

const EmploymentHistoryForRetired = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [trainings, setTrainings] = useState<TrainingSummaryType[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<any[]>([]);
    const [currentWork, setCurrentWork] = useState(false);

    const [currentTraining, setCurrentTraining] = useState<TrainingSummaryType>({
        trade: '',
        course: '',
        commission_date: '',
        retirement_date: '',
        companyName: '',
        rank: '',
        type: '',
        arms: '',
    });

    const handleAddClick = () => {
        setCurrentTraining({
            trade: '',
            course: '',
            commission_date: '',
            retirement_date: '',
            companyName: '',
            rank: '',
            type: '',
            arms: '',
        });
        setSelectedSkills([]);
        setIsEditMode(false);
        setIsDialogOpen(true);
    };

    const handleEditClick = (trainingIndex: number) => {
        setCurrentTraining(trainings[trainingIndex]);
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

    const handleSelectChange = (name: string, value: string) => {
        setCurrentTraining((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const form = e.target;

        const newTraining: TrainingSummaryType = {
            trade: form.trade.value,
            course: form.course.value,
            commission_date: form.commission_date.value,
            retirement_date: form.retirement_date.value,
            companyName: currentTraining.companyName,
            rank: currentTraining.rank,
            type: currentTraining.type,
            arms: currentTraining.arms,
        };

        if (isEditMode) {
            const updatedTrainings = trainings.map((training) =>
                training === currentTraining ? newTraining : training
            );
            setTrainings(updatedTrainings);
        } else {
            setTrainings([...trainings, newTraining]);
        }

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
                            <h1 className="text-lg font-semibold">{` Experience-${index + 1}`}</h1>
                            <div className="flex items-center gap-3">
                                <Button className="text-sm !bg-primary" onClick={() => handleEditClick(index)}>Edit</Button>
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
                                <p className="text-gray-500 mt-2">{training.course}</p>
                            </div>
                            <div>
                                <h3 className="text-md font-semibold">Designation</h3>
                                <p className="text-gray-500 mt-2">{training.rank}</p>
                            </div>
                            <div>
                                <h3 className="text-md font-semibold">Department</h3>
                                <p className="text-gray-500 mt-2">{training.type}</p>
                            </div>
                            <div>
                                <h3 className="text-md font-semibold">Arms</h3>
                                <p className="text-gray-500 mt-2">{training.arms}</p>
                            </div>
                            <div>
                                <h3 className="text-md font-semibold">Trade</h3>
                                <p className="text-gray-500 mt-2">{training.trade}</p>
                            </div>
                            <div>
                                <h3 className="text-md font-semibold">Course</h3>
                                <p className="text-gray-500 mt-2">{training.course}</p>
                            </div>
                            <div>
                                <h3 className="text-md font-semibold">Date of Commission</h3>
                                <p className="text-gray-500 mt-2">{training.commission_date}</p>
                            </div>
                            <div>
                                <h3 className="text-md font-semibold">Date of Retirement</h3>
                                <p className="text-gray-500 mt-2">{training.retirement_date}</p>
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
                    <div className="grid grid-cols-3 gap-2">
                        <div className="space-y-2 flex flex-col">
                            <Label htmlFor="companyName">Company Name</Label>
                            <SelectComponent>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a company" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Company</SelectLabel>
                                        <SelectItem value="companyA" onClick={() => handleSelectChange('companyName', 'companyA')}>Company A</SelectItem>
                                        <SelectItem value="companyB" onClick={() => handleSelectChange('companyName', 'companyB')}>Company B</SelectItem>
                                        <SelectItem value="companyC" onClick={() => handleSelectChange('companyName', 'companyC')}>Company C</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </SelectComponent>
                        </div>

                        <div className="space-y-2 col-span-2 flex flex-col">
                            <Label htmlFor="message" className='text-transparent'>,</Label>
                            <Input id="message" name="message" type="text" onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="space-y-2 flex flex-col">
                        <Label htmlFor="rank">Rank</Label>
                        <SelectComponent>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a rank" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="rankA" onClick={() => handleSelectChange('rank', 'rankA')}>Rank A</SelectItem>
                                    <SelectItem value="rankB" onClick={() => handleSelectChange('rank', 'rankB')}>Rank B</SelectItem>
                                    <SelectItem value="rankC" onClick={() => handleSelectChange('rank', 'rankC')}>Rank C</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </SelectComponent>
                    </div>

                    <div className="space-y-2 flex flex-col">
                        <Label htmlFor="type">Type</Label>
                        <SelectComponent>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="officer" onClick={() => handleSelectChange('type', 'officer')}>Officer</SelectItem>
                                    <SelectItem value="jco" onClick={() => handleSelectChange('type', 'jco')}>JCO</SelectItem>
                                    <SelectItem value="nco" onClick={() => handleSelectChange('type', 'nco')}>NCO</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </SelectComponent>
                    </div>

                    <div className="space-y-2 flex flex-col">
                        <Label htmlFor="arms">Arms</Label>
                        <SelectComponent>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select arms" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="armsA" onClick={() => handleSelectChange('arms', 'armsA')}>Arms A</SelectItem>
                                    <SelectItem value="armsB" onClick={() => handleSelectChange('arms', 'armsB')}>Arms B</SelectItem>
                                    <SelectItem value="armsC" onClick={() => handleSelectChange('arms', 'armsC')}>Arms C</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </SelectComponent>
                    </div>

                    <div className="space-y-2 flex flex-col">
                        <Label htmlFor="trade">Trade</Label>
                        <Input id="trade" name="trade" type="text" defaultValue={currentTraining.trade} onChange={handleInputChange} />
                    </div>

                    <div className="space-y-2 flex flex-col">
                        <Label htmlFor="course">Course</Label>
                        <Input id="course" name="course" type="text" defaultValue={currentTraining.course} onChange={handleInputChange} />
                    </div>

                    <div className="space-y-2 flex flex-col">
                        <Label htmlFor="commission_date">Date of Commission</Label>
                        <DateInput id="commission_date" type={"date"} name="commission_date" defaultValue={currentTraining.commission_date} onChange={handleInputChange} />
                    </div>

                    <div className="space-y-2 flex flex-col">
                        <Label htmlFor="retirement_date">Date of Retirement</Label>
                        <DateInput id="retirement_date" type={"date"} name="retirement_date" defaultValue={currentTraining.retirement_date} onChange={handleInputChange} />
                    </div>

                    <div className="mt-4 flex justify-end">
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </EditModal>
        </div>
    );
};

export default EmploymentHistoryForRetired;
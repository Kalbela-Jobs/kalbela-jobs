import { Button } from '@/components/ui/button';
import { DialogContent, DialogOverlay, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectLabel, SelectItem, SelectValue } from '@/components/ui/select';
import { GraduationCap } from 'lucide-react';
import React, { useState } from 'react';
import { EditModal } from './CommonModal';

interface Education {
    label: string;
    degree: string;
    board: string;
    institute: string;
    result: string;
    year: string;
}

const EducationTraining = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [educations, setEducations] = useState<Education[]>([]);
    const [currentEducation, setCurrentEducation] = useState<Education>({
        label: '',
        degree: '',
        board: '',
        institute: '',
        result: '',
        year: ''
    });

    const handleAddClick = () => {
        setCurrentEducation({
            label: '',
            degree: '',
            board: '',
            institute: '',
            result: '',
            year: ''
        });
        setIsEditMode(false);
        setIsDialogOpen(true);
    };

    const handleEditClick = (education: Education) => {
        setCurrentEducation(education);
        setIsEditMode(true);
        setIsDialogOpen(true);
    };

    const handleDeleteClick = (educationIndex: number) => {
        const updatedEducations = [...educations];
        updatedEducations.splice(educationIndex, 1);
        setEducations(updatedEducations);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCurrentEducation((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setCurrentEducation((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (isEditMode) {
            const updatedEducations = educations.map((education) =>
                education === currentEducation ? currentEducation : education
            );
            setEducations(updatedEducations);
        } else {
            setEducations([...educations, currentEducation]);
        }
        setIsDialogOpen(false);
    };

    return (
        <div className='mb-4 px-4 py-2 w-full space-y-6'>
            {educations.length === 0 ? (
                <div className="text-center text-xl bg-gray-50  py-16 text-gray-500">
                    <GraduationCap size={50} strokeWidth={1} className="mx-auto text-primary" />
                    <p>No educations found.</p>
                </div>
            ) : (
                educations.map((education, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-md p-4 border">
                        <header className="flex items-center justify-between">
                            <h1 className="text-lg font-semibold">{education.label}</h1>
                            <div className="flex items-center gap-3">
                                <Button className="text-sm !bg-primary" onClick={() => handleEditClick(education)}>Edit</Button>
                                <Button className="text-sm !bg-red-600" onClick={() => handleDeleteClick(index)}>Delete</Button>
                            </div>
                        </header>
                        <main className="grid grid-cols-3 gap-8 mt-3">
                            <div className="">
                                <h3 className="text-md font-semibold">Label of education</h3>
                                <p className="text-gray-500 mt-2">{education.label}</p>
                            </div>
                            <div className="">
                                <h3 className="text-md font-semibold">Exam/Degree Title</h3>
                                <p className="text-gray-500 mt-2">{education.degree}</p>
                            </div>
                            <div className="">
                                <h3 className="text-md font-semibold">Board</h3>
                                <p className="text-gray-500 mt-2">{education.board}</p>
                            </div>
                            <div className="">
                                <h3 className="text-md font-semibold">Institute Name</h3>
                                <p className="text-gray-500 mt-2">{education.institute}</p>
                            </div>
                            <div className="">
                                <h3 className="text-md font-semibold">Result</h3>
                                <p className="text-gray-500 mt-2">{education.result}</p>
                            </div>
                            <div className="">
                                <h3 className="text-md font-semibold">Passing Year</h3>
                                <p className="text-gray-500 mt-2">{education.year}</p>
                            </div>
                        </main>
                    </div>
                ))
            )}

            <Button className='px-6' onClick={handleAddClick}>+ Add</Button>

            <EditModal
                open={isDialogOpen}
                onOpenChange={handleDialogClose}
                title={isEditMode ? "Edit Education" : "Add Education"}
            >
                <div className="space-y-4">
                    <div className="space-y-2 flex flex-col">
                        <label className='font-semibold' htmlFor="labelOfEducation">Label of Education</label>
                        <Select value={currentEducation.label} onValueChange={(value) => handleSelectChange('label', value)}>
                            <SelectTrigger className="input">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Labels</SelectLabel>
                                    <SelectItem value="SSC">SSC</SelectItem>
                                    <SelectItem value="HSC">HSC</SelectItem>
                                    <SelectItem value="BSC">BSC</SelectItem>
                                    <SelectItem value="MSC">MSC</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2 flex flex-col">
                        <label className='font-semibold' htmlFor="degree">Exam/Degree Title</label>
                        <Select value={currentEducation.degree} onValueChange={(value) => handleSelectChange('degree', value)}>
                            <SelectTrigger className="input">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Degrees</SelectLabel>
                                    <SelectItem value="SSC">SSC</SelectItem>
                                    <SelectItem value="HSC">HSC</SelectItem>
                                    <SelectItem value="BSC">BSC</SelectItem>
                                    <SelectItem value="MSC">MSC</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2 flex flex-col">
                        <label className='font-semibold' htmlFor="board">Board</label>
                        <Input name="board" value={currentEducation.board} onChange={handleInputChange} type="text" />
                    </div>
                    <div className="space-y-2 flex flex-col">
                        <label className='font-semibold' htmlFor="institute">Institute Name</label>
                        <Input name="institute" value={currentEducation.institute} onChange={handleInputChange} type="text" />
                    </div>
                    <div className="space-y-2 flex flex-col">
                        <label className='font-semibold' htmlFor="result">Result</label>
                        <Input name="result" value={currentEducation.result} onChange={handleInputChange} type="text" />
                    </div>
                    <div className="space-y-2 flex flex-col">
                        <label className='font-semibold' htmlFor="year">Passing Year</label>
                        <Input className='w-full' name="year" value={currentEducation.year} onChange={handleInputChange} type="date" />
                    </div>
                </div>
                <div className="mt-4 flex justify-end">
                    <Button onClick={handleSubmit}>{isEditMode ? 'Update' : 'Add'}</Button>
                </div>
            </EditModal>
        </div>
    );
};

export default EducationTraining;
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const EducationModal = ({ onClose, onSave, education }) => {
    const [formData, setFormData] = useState({
        label: '',
        title: '',
        board: '',
        institute: '',
        result: '',
        year: '',
    });

    useEffect(() => {
        if (education) {
            setFormData(education);
        }
    }, [education]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-md p-4 w-96">
                <header className="flex items-center justify-between mb-4">
                    <h1 className="text-lg font-semibold">{education ? 'Edit Education' : 'Add Education'}</h1>
                    <Button className="text-sm" onClick={onClose}>Close</Button>
                </header>
                <main className="space-y-4">
                    <div>
                        <label className="block text-md font-semibold">Label of education</label>
                        <input
                            type="text"
                            name="label"
                            className="w-full mt-2 p-2 border rounded-md"
                            value={formData.label}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-md font-semibold">Exam/Degree Title</label>
                        <input
                            type="text"
                            name="title"
                            className="w-full mt-2 p-2 border rounded-md"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-md font-semibold">Board</label>
                        <input
                            type="text"
                            name="board"
                            className="w-full mt-2 p-2 border rounded-md"
                            value={formData.board}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-md font-semibold">Institute Name</label>
                        <input
                            type="text"
                            name="institute"
                            className="w-full mt-2 p-2 border rounded-md"
                            value={formData.institute}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-md font-semibold">Result</label>
                        <input
                            type="text"
                            name="result"
                            className="w-full mt-2 p-2 border rounded-md"
                            value={formData.result}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-md font-semibold">Passing Year</label>
                        <input
                            type="text"
                            name="year"
                            className="w-full mt-2 p-2 border rounded-md"
                            value={formData.year}
                            onChange={handleChange}
                        />
                    </div>
                </main>
                <footer className="flex items-center justify-end mt-4">
                    <Button className="text-sm !bg-primary" onClick={handleSubmit}>Save</Button>
                </footer>
            </div>
        </div>
    );
};

export default EducationModal;
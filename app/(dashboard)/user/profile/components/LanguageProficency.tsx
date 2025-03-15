'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
    Select as SelectComponent,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Shield } from "lucide-react";

interface LanguageProficiencyCard {
    id: number;
    language: string;
    reading: string;
    writing: string;
    speaking: string;
}

const LanguageProficiency = () => {
    const [languageCards, setLanguageCards] = useState<LanguageProficiencyCard[]>([]);
    const [nextId, setNextId] = useState<number>(1);

    const handleAddLanguageCard = () => {
        setLanguageCards([...languageCards, { id: nextId, language: '', reading: '', writing: '', speaking: '' }]);
        setNextId(nextId + 1);
    };

    const handleSaveLanguageCard = (id: number, language: string, reading: string, writing: string, speaking: string) => {
        setLanguageCards(languageCards.map(card =>
            card.id === id ? { ...card, language, reading, writing, speaking } : card
        ));
    };

    const handleCancelLanguageCard = (id: number) => {
        setLanguageCards(languageCards.filter(card => card.id !== id));
    };

    const proficiencyOptions = [
        { value: "beginner", label: "Beginner" },
        { value: "intermediate", label: "Intermediate" },
        { value: "advanced", label: "Advanced" },
        { value: "native", label: "Native" },
    ];

    return (
        <div className='mb-4 px-4 py-2 w-full space-y-6'>
            {languageCards.length === 0 ? (
                <div className="text-center text-xl bg-gray-50 py-16 text-gray-500">
                    <Shield size={50} strokeWidth={1} className="mx-auto text-primary" />
                    <p>No data found.</p>
                </div>
            ) : (
                languageCards.map(card => (
                    <LanguageCardComponent
                        key={card.id}
                        card={card}
                        proficiencyOptions={proficiencyOptions}
                        onSave={handleSaveLanguageCard}
                        onCancel={handleCancelLanguageCard}
                    />
                ))
            )}
            <Button className="mt-4 !bg-primary" onClick={handleAddLanguageCard}>Add Language</Button>
        </div>
    );
};

interface LanguageCardComponentProps {
    card: LanguageProficiencyCard;
    proficiencyOptions: { value: string, label: string }[];
    onSave: (id: number, language: string, reading: string, writing: string, speaking: string) => void;
    onCancel: (id: number) => void;
}

const LanguageCardComponent: React.FC<LanguageCardComponentProps> = ({ card, proficiencyOptions, onSave, onCancel }) => {
    const [language, setLanguage] = useState<string>(card.language);
    const [reading, setReading] = useState<string>(card.reading);
    const [writing, setWriting] = useState<string>(card.writing);
    const [speaking, setSpeaking] = useState<string>(card.speaking);
    const [isEditing, setIsEditing] = useState<boolean>(true); // Track if the card is in edit mode

    const handleSave = () => {
        onSave(card.id, language, reading, writing, speaking);
        setIsEditing(false); // Switch to view mode
    };

    return (
        <div className="border">
            <div className="p-4 flex items-center justify-between">
                <h1 className="text-xl font-semibold">Language - {card.id}</h1>
            </div>
            <div className="bg-gray-50 p-4">
                {isEditing ? (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="language">Language</label>
                        <Input
                            id="language"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="mb-4"
                        />

                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="reading">Reading</label>
                        <SelectComponent value={reading} onValueChange={setReading}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Reading</SelectLabel>
                                    {proficiencyOptions.map(option => (
                                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </SelectComponent>

                        <label className="block text-sm font-medium text-gray-700 mb-2 mt-4" htmlFor="writing">Writing</label>
                        <SelectComponent value={writing} onValueChange={setWriting}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Writing</SelectLabel>
                                    {proficiencyOptions.map(option => (
                                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </SelectComponent>

                        <label className="block text-sm font-medium text-gray-700 mb-2 mt-4" htmlFor="speaking">Speaking</label>
                        <SelectComponent value={speaking} onValueChange={setSpeaking}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Speaking</SelectLabel>
                                    {proficiencyOptions.map(option => (
                                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </SelectComponent>
                    </div>
                ) : (
                    <div>
                        <h4 className="font-[500]">Language:</h4>
                        <p>{language}</p>
                        <h4 className="font-[500] mt-4">Proficiency:</h4>
                        <ul className="list-disc list-inside ml-8">
                            <li>Reading: {reading}</li>
                            <li>Writing: {writing}</li>
                            <li>Speaking: {speaking}</li>
                        </ul>
                    </div>
                )}
                <div className="flex items-center gap-2">
                    {isEditing ? (
                        <Button className="mt-4 !py-1 !bg-primary" onClick={handleSave}>Save</Button>
                    ) : (
                        <Button className="mt-4 !py-1 !bg-primary" onClick={() => setIsEditing(true)}>Edit</Button>
                    )}
                    <Button className="mt-4 !py-1 !bg-red-500" onClick={() => onCancel(card.id)}>Delete</Button>
                </div>
            </div>
        </div>
    );
};

export default LanguageProficiency;
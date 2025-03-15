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

interface LinkAccountCard {
    id: number;
    accountType: string;
    url: string;
}

const LinkAccounts = () => {
    const [linkAccountCards, setLinkAccountCards] = useState<LinkAccountCard[]>([]);
    const [nextId, setNextId] = useState<number>(1);

    const handleAddLinkAccountCard = () => {
        setLinkAccountCards([...linkAccountCards, { id: nextId, accountType: '', url: '' }]);
        setNextId(nextId + 1);
    };

    const handleSaveLinkAccountCard = (id: number, accountType: string, url: string) => {
        setLinkAccountCards(linkAccountCards.map(card =>
            card.id === id ? { ...card, accountType, url } : card
        ));
    };

    const handleCancelLinkAccountCard = (id: number) => {
        setLinkAccountCards(linkAccountCards.filter(card => card.id !== id));
    };

    const accountOptions = [
        { value: "facebook", label: "Facebook" },
        { value: "linkedin", label: "LinkedIn" },
        { value: "twitter", label: "Twitter" },
        { value: "github", label: "GitHub" },
        { value: "others", label: "Others" },
    ];

    return (
        <div className='mb-4 px-4 py-2 w-full space-y-6'>
            {linkAccountCards.length === 0 ? (
                <div className="text-center text-xl bg-gray-50 py-16 text-gray-500">
                    <Shield size={50} strokeWidth={1} className="mx-auto text-primary" />
                    <p>No data found.</p>
                </div>
            ) : (
                linkAccountCards.map(card => (
                    <LinkAccountCardComponent
                        key={card.id}
                        card={card}
                        accountOptions={accountOptions}
                        onSave={handleSaveLinkAccountCard}
                        onCancel={handleCancelLinkAccountCard}
                    />
                ))
            )}
            <Button className="mt-4 !bg-primary" onClick={handleAddLinkAccountCard}>Add Account</Button>
        </div>
    );
};

interface LinkAccountCardComponentProps {
    card: LinkAccountCard;
    accountOptions: { value: string, label: string }[];
    onSave: (id: number, accountType: string, url: string) => void;
    onCancel: (id: number) => void;
}

const LinkAccountCardComponent: React.FC<LinkAccountCardComponentProps> = ({ card, accountOptions, onSave, onCancel }) => {
    const [accountType, setAccountType] = useState<string>(card.accountType);
    const [url, setUrl] = useState<string>(card.url);
    const [isEditing, setIsEditing] = useState<boolean>(true); // Track if the card is in edit mode

    const handleSave = () => {
        onSave(card.id, accountType, url);
        setIsEditing(false); // Switch to view mode
    };

    return (
        <div className="border">
            <div className="p-4 flex items-center justify-between">
                <h1 className="text-xl font-semibold uppercase">{accountType}</h1>
            </div>
            <div className="bg-gray-50 p-4">
                {isEditing ? (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="accountType">Choose Account</label>
                        <SelectComponent value={accountType} onValueChange={setAccountType}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Account Type</SelectLabel>
                                    {accountOptions.map(option => (
                                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </SelectComponent>

                        <label className="block text-sm font-medium text-gray-700 mb-2 mt-4" htmlFor="url">URL</label>
                        <Input
                            id="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="mb-4"
                        />
                    </div>
                ) : (
                    <div className="border-b pb-4">
                        <div className="font-[500] flex items-center gap-2">Account Type : <p>{accountType}</p></div>

                        <div className="font-[500] flex items-center gap-2 mt-2">URL: <a target={"_blank"} className="text-blue-500" href={url}>{url}</a></div>

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

export default LinkAccounts;
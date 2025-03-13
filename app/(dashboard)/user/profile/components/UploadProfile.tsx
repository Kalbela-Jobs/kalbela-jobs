import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import React from 'react';

interface UploadProfileProps {
    file: File | null;
    profile_picture: string;
    isDragActive: boolean;
    getRootProps: any;
    getInputProps: any;
    isEditing: boolean;
}

const UploadProfile: React.FC<UploadProfileProps> = ({
    file,
    profile_picture,
    isDragActive,
    getRootProps,
    getInputProps,
    isEditing,
}) => {
    return (
        <div className="flex flex-col items-start mb-6">
            <div
                {...getRootProps()}
                className={`w-24 h-24 ${isDragActive ? 'border-red-500' : 'border-gray-200'} border-2 rounded-md mb-2 flex items-center justify-center cursor-pointer`}
            >
                <input {...getInputProps()} />
                {file ? (
                    <img src={URL.createObjectURL(file)} alt="Profile" className="w-full h-full object-cover rounded-md" />
                ) : profile_picture ? (
                    <img src={profile_picture} alt="Profile" className="w-full h-full object-cover rounded-md" />
                ) : (
                    <User className="h-12 w-12 text-gray-400" />
                )}
            </div>
            <Button variant="outline" size="sm" disabled={!isEditing}>
                Change Photo
            </Button>
        </div>
    );
};

export default UploadProfile;
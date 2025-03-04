'use client';
import useApiRequest from '@/app/hooks/useApiRequest';
import React from 'react';
import Select from 'react-select';

const FilterProfileField: React.FC = () => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    const { data: skills } = useApiRequest<any>("config/skills", "GET")
    const skillOption = skills?.data?.map((skill: any) => ({ value: skill._id, label: skill.name }))
    return (
        <div className='space-y-1'>
            <label className=" text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Profile</label>
            <Select options={skillOption} isMulti={true} />
        </div>
    );
};

export default FilterProfileField;
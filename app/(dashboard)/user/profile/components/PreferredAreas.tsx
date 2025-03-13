import { Button } from '@/components/ui/button';
import { Pencil, Plus, X } from 'lucide-react';
import React, { useState } from 'react';
import Select from 'react-select';

const PreferredAreas: React.FC = () => {
    const locations = [
        "Location 1", "Location 2", "Location 3", "Location 4", "Location 5",
        "Location 6", "Location 7", "Location 8", "Location 9", "Location 10",
        "Location 11", "Location 12", "Location 13", "Location 14", "Location 15",
        "Location 16", "Location 17", "Location 18", "Location 19", "Location 20"
    ];

    const categories = [
        "Category 1", "Category 2", "Category 3", "Category 4", "Category 5",
        "Category 6", "Category 7", "Category 8", "Category 9", "Category 10",
        "Category 11", "Category 12", "Category 13", "Category 14", "Category 15",
        "Category 16", "Category 17", "Category 18", "Category 19", "Category 20"
    ];

    const districts = [
        "District 1", "District 2", "District 3", "District 4", "District 5",
        "District 6", "District 7", "District 8", "District 9", "District 10",
        "District 11", "District 12", "District 13", "District 14", "District 15",
    ];

    const countries = [
        "Country 1", "Country 2", "Country 3", "Country 4", "Country 5",
        "Country 6", "Country 7", "Country 8", "Country 9", "Country 10",
    ];

    const organizationTypes = [
        "Organization Type 1", "Organization Type 2", "Organization Type 3", "Organization Type 4",
        "Organization Type 5", "Organization Type 6", "Organization Type 7", "Organization Type 8",
        "Organization Type 9", "Organization Type 10", "Organization Type 11", "Organization Type 12"
    ];

    const [checkedLocations, setCheckedLocations] = useState<string[]>([]);
    const [checkedCategories, setCheckedCategories] = useState<string[]>([]);
    const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
    const [selectedOrganizationTypes, setSelectedOrganizationTypes] = useState<string[]>([]);
    const [isEditing, setIsEditing] = useState(false);

    const handleLocationChange = (location: string) => {
        if (checkedLocations.includes(location)) {
            setCheckedLocations(prevState => prevState.filter(item => item !== location));
        } else if (checkedLocations.length < 3) {
            setCheckedLocations(prevState => [...prevState, location]);
        }
    };

    const handleCategoryChange = (category: string) => {
        if (checkedCategories.includes(category)) {
            setCheckedCategories(prevState => prevState.filter(item => item !== category));
        } else if (checkedCategories.length < 3) {
            setCheckedCategories(prevState => [...prevState, category]);
        }
    };

    const handleDeleteLocation = (location: string) => {
        setCheckedLocations(prevState => prevState.filter(item => item !== location));
    }

    const handleDeleteCategory = (category: string) => {
        setCheckedCategories(prevState => prevState.filter(item => item !== category));
    }

    const handleDistrictChange = (selectedOptions: any) => {
        const selectedValues = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
        if (selectedValues.length <= 3) {
            setSelectedDistricts(selectedValues);
        }
    }

    const handleCountryChange = (selectedOptions: any) => {
        const selectedValues = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
        if (selectedValues.length <= 3) {
            setSelectedCountries(selectedValues);
        }
    }

    const handleOrganizationTypeChange = (selectedOptions: any) => {
        const selectedValues = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
        if (selectedValues.length <= 3) {
            setSelectedOrganizationTypes(selectedValues);
        }
    }

    const handleSave = () => {
        console.log("Selected Locations:", checkedLocations);
        console.log("Selected Categories:", checkedCategories);
        console.log("Selected Districts:", selectedDistricts);
        console.log("Selected Countries:", selectedCountries);
        console.log("Selected Organization Types:", selectedOrganizationTypes);
        setIsEditing(false);
    }

    const handleCancel = () => {
        setCheckedLocations([]);
        setCheckedCategories([]);
        setSelectedDistricts([]);
        setSelectedCountries([]);
        setSelectedOrganizationTypes([]);
        setIsEditing(false);
    }

    return (
        <div className='mb-4 px-4 py-2 w-full'>
            {isEditing ? (
                <>
                    <div className="mt-4 grid grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Inside Bangladesh - Add Districts (max 3)</h2>
                            <Select
                                options={districts.map(d => ({ value: d, label: d }))}
                                onChange={handleDistrictChange}
                                placeholder="Select districts..."
                                isMulti
                                isClearable
                                value={selectedDistricts.map(d => ({ value: d, label: d }))}
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
                                maxMenuHeight={150}
                                closeMenuOnSelect={false}
                            />
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold mb-2">Outside Bangladesh - Add Countries (max 3)</h2>
                            <Select
                                options={countries.map(c => ({ value: c, label: c }))}
                                onChange={handleCountryChange}
                                placeholder="Select countries..."
                                isMulti
                                isClearable
                                value={selectedCountries.map(c => ({ value: c, label: c }))}
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
                                maxMenuHeight={150}
                                closeMenuOnSelect={false}
                            />
                        </div>
                    </div>

                    <br />
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Add Your Preferred Organization Type (max 3)</h2>
                        <Select
                            options={organizationTypes.map(o => ({ value: o, label: o }))}
                            onChange={handleOrganizationTypeChange}
                            placeholder="Select organization types..."
                            isMulti
                            isClearable
                            value={selectedOrganizationTypes.map(o => ({ value: o, label: o }))}
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
                            maxMenuHeight={150}
                            closeMenuOnSelect={false}
                        />
                    </div>

                    <br />
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <div className="border border-gray-200 bg-gray-50 rounded-md px-4 pt-4 pb-2">
                                <h2 className="text-lg font-semibold mb-4">Select Locations (max 3)</h2>
                                <div className="h-[200px] overflow-y-auto border-t pt-2 chat-box">
                                    <ul className="space-y-2">
                                        {locations.map((location, index) => (
                                            <li key={index} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id={`location-${index}`}
                                                    checked={checkedLocations.includes(location)}
                                                    onChange={() => handleLocationChange(location)}
                                                    className="form-checkbox h-5 w-5 text-blue-900 !accent-blue-900"
                                                    disabled={!checkedLocations.includes(location) && checkedLocations.length >= 3}
                                                />
                                                <label htmlFor={`location-${index}`} className="text-lg">
                                                    {location}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="pt-3">
                                    <ul className="flex flex-wrap gap-1">
                                        {checkedLocations.map((location, index) => (
                                            <li className='bg-primary text-white flex items-center gap-2 px-2 py-1 rounded-md' key={index}>
                                                {location}
                                                <button onClick={() => handleDeleteLocation(location)}>
                                                    <X />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="border border-gray-200 bg-gray-50 rounded-md px-4 pt-4 pb-2">
                                <h2 className="text-lg font-semibold mb-4">Select Categories (max 3)</h2>
                                <div className="h-[200px] overflow-y-auto border-t pt-2 chat-box">
                                    <ul className="space-y-2">
                                        {categories.map((category, index) => (
                                            <li key={index} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id={`category-${index}`}
                                                    checked={checkedCategories.includes(category)}
                                                    onChange={() => handleCategoryChange(category)}
                                                    className="form-checkbox h-5 w-5 text-blue-600 !accent-blue-900"
                                                    disabled={!checkedCategories.includes(category) && checkedCategories.length >= 3}
                                                />
                                                <label htmlFor={`category-${index}`} className="text-lg">
                                                    {category}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="pt-3">
                                    <ul className="flex flex-wrap gap-1">
                                        {checkedCategories.map((category, index) => (
                                            <li className='bg-primary text-white flex items-center gap-2 px-2 py-1 rounded-md' key={index}>
                                                {category}
                                                <button onClick={() => handleDeleteCategory(category)}>
                                                    <X />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <Button className="!bg-primary text-white px-4 py-2 rounded-md" onClick={handleSave}>Save</Button>
                        <Button className="!bg-red-500 text-white px-4 py-2 rounded-md ml-2" onClick={handleCancel}>Cancel</Button>
                    </div>
                </>
            ) : (
                <div className="mt-4">
                    {checkedLocations.length === 0 && checkedCategories.length === 0 && selectedDistricts.length === 0 && selectedCountries.length === 0 && selectedOrganizationTypes.length === 0 ? (
                        <div className='text-center'>
                            <h1 className="text-lg font-semibold">
                                No data selected
                            </h1>
                            <p className="text-gray-500">
                                Please select at least one location, category, district, country, or organization type.
                            </p>
                            <Button className="!bg-primary px-6 text-white mt-3" onClick={() => setIsEditing(true)}> Add</Button>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-8 max-w-3xl">
                                <div>
                                    <h2 className="text-lg font-medium text-gray-700 mb-4">Preferred Job Categories</h2>
                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex flex-wrap gap-2">
                                                {checkedCategories.length > 0 ? (
                                                    checkedCategories.map((category, index) => (
                                                        <span key={index} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm">
                                                            {category}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-gray-500">No categories selected</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-lg font-medium text-gray-700 mb-4">Preferred Job Location</h2>
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-base text-gray-600 mb-3">Inside Bangladesh</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedDistricts.length > 0 ? (
                                                    selectedDistricts.map((district, index) => (
                                                        <span key={index} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm">
                                                            {district}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-gray-500">No districts selected</span>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-base text-gray-600 mb-3">Outside Bangladesh</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedCountries.length > 0 ? (
                                                    selectedCountries.map((country, index) => (
                                                        <span key={index} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm">
                                                            {country}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-gray-500">No countries selected</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Button className="mt-4 !bg-primary  text-white px-4 py-4 rounded-md" onClick={() => setIsEditing(true)}>Edit</Button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default PreferredAreas;
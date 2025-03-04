import React, { Dispatch, SetStateAction, useState } from "react";

interface SalaryRangeProps {
    setSalaryRange: Dispatch<SetStateAction<string>>;
}
const SelaryRange: React.FC<SalaryRangeProps> = ({ setSalaryRange }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value);
        setValue(newValue);

        setSalaryRange(newValue.toString());
        console.log("Selected Value:", newValue);
    };

    return (
        <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Desired minimum monthly stipend (TAKA)
            </label>

            <div className="relative mb-6">
                <label htmlFor="labels-range-input" className="sr-only">
                    Labels range
                </label>
                <input
                    id="labels-range-input"
                    type="range"
                    min={0}
                    max={25000}
                    step={5000} // Step to match given values
                    value={value}
                    onChange={handleChange}
                    className="w-full h-1 bg-[#008BDC] rounded-lg appearance-none cursor-pointer dark:bg-gray-700 custom-range"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>0</span>
                    <span>5K</span>
                    <span>10K</span>
                    <span>15K</span>
                    <span>20K</span>
                    <span>25K</span>
                </div>
            </div>

        </div>
    );
};

export default SelaryRange;

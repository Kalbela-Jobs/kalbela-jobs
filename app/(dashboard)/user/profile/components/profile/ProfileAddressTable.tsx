import React from 'react';

interface Address {
    value: any;
    label: any;
}

// @ts-ignore
interface AddressData {
    presentCountry: Address;
    presentDivision: Address;
    presentCity: Address;
    permanentCountry: Address;
    permanentDivision: Address;
    permanentCity: Address;
}

const ProfileAddressTable: React.FC<{ data: AddressData }> = ({ data }) => {
    return (
        <div className="overflow-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 text-start py-2 border-b">Type</th>
                        <th className="px-4 text-start py-2 border-b">Country</th>
                        <th className="px-4 text-start py-2 border-b">Division</th>
                        <th className="px-4 text-start py-2 border-b">City</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="px-4 py-2 border-b font-semibold">Present</td>
                        <td className="px-4 py-2 border-b">{data?.presentCountry?.label}</td>
                        <td className="px-4 py-2 border-b">{data?.presentDivision?.label}</td>
                        <td className="px-4 py-2 border-b">{data?.presentCity?.label}</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2 border-b font-semibold">Permanent</td>
                        <td className="px-4 py-2 border-b">{data?.permanentCountry?.label}</td>
                        <td className="px-4 py-2 border-b">{data?.permanentDivision?.label}</td>
                        <td className="px-4 py-2 border-b">{data?.permanentCity?.label}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ProfileAddressTable;
import React from 'react';

interface ProfileAddressProps {
    user: any
}
const ProfileAddress: React.FC<ProfileAddressProps> = ({ user }) => {
    return (
        <figure className='mt-8 pb-4 profile-info rounded-xl relative md:mt-6 border'>
            <h1 className="text-xl px-4 py-3 capitalize font-semibold border-b">
                🏠 Address
            </h1>


            <div className="grid md:grid-cols-2 px-4  my-2 ">
                <div className="">
                    <h3 className=" bg-gray-200 border-b rounded-tl w-full h-12 flex items-center px-3 py-0">Present Address</h3>
                    <ul className="space-y-2 border-l border-b px-3 rounded-bl-lg">
                        <li className=" flex   items-center gap-2  py-2">
                            <span className="font-semibold">Country : </span> <span className="!text-gray-500">{user?.address?.presentCountry?.label}</span>
                        </li>
                        <li className=" flex   items-center gap-2  py-2">
                            <span className="font-semibold">City : </span> <span className="!text-gray-500">{user?.address?.presentCity?.label}</span>
                        </li>
                        <li className=" flex   items-center gap-2  py-2">
                            <span className="font-semibold">Division : </span> <span className="!text-gray-500">{user?.address?.presentDivision?.label}</span>
                        </li>
                    </ul>
                </div>
                <div className="">
                    <h3 className="bg-gray-200 border-b rounded-tr w-full h-12 flex items-center px-3 py-0">Permanent Address</h3>
                    <ul className="space-y-2 border-r border-l border-b px-3 rounded-br-lg">
                        <li className=" flex   items-center gap-2  py-2">
                            <span className="font-semibold">Country : </span> <span className="!text-gray-500">{user?.address?.permanentCountry?.label}</span>
                        </li>
                        <li className=" flex   items-center gap-2  py-2">
                            <span className="font-semibold">City : </span> <span className="!text-gray-500">{user?.address?.permanentCity?.label}</span>
                        </li>
                        <li className=" flex   items-center gap-2  py-2">
                            <span className="font-semibold">Division : </span> <span className="!text-gray-500">{user?.address?.permanentDivision?.label}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </figure>
    );
};

export default ProfileAddress;
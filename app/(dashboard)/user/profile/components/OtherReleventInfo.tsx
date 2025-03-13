import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import "react-quill/dist/quill.snow.css"
import { Button } from '@/components/ui/button';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

const OtherReleventInfo: React.FC = () => {
    const [keyword, setKeyword] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [careerSummary, setCareerSummary] = useState('');
    const [specialQualification, setSpecialQualification] = useState('');

    return (
        <div className='mb-4 px-4 py-2 w-full'>
            <div className="mt-4">
                <h5 className=' pb-3'>Keywords</h5>
                {isEditMode ? (
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Enter keyword"
                        className="border focus:border-none focus:outline-gray-100 rounded px-3 p-2 mb-2 w-full"
                    />
                ) : (
                    <p>{keyword ? keyword : 'No keyword found'}</p>
                )}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-4">
                <div className="">
                    <h5 className=' pb-3'>Career Summary</h5>
                    {isEditMode ? (
                        <ReactQuill
                            value={careerSummary}
                            onChange={setCareerSummary}
                            placeholder="Career Summary..."
                        />
                    ) : (
                        <div className="">
                            {
                                careerSummary ?
                                    <div dangerouslySetInnerHTML={{ __html: careerSummary }} />
                                    :
                                    <div>Career summary not found</div>
                            }
                        </div>
                    )}
                </div>

                <div className="">
                    <h5 className=' pb-3'>Special Qualification</h5>
                    {isEditMode ? (
                        <ReactQuill
                            value={specialQualification}
                            onChange={setSpecialQualification}
                            placeholder="Special Qualification..."
                        />
                    ) : (
                        <div className="">
                            {
                                specialQualification ?
                                    <div dangerouslySetInnerHTML={{ __html: specialQualification }} />

                                    :
                                    <div>Career summary not found</div>
                            }
                        </div>
                    )}
                </div>
            </div>

            <div className="flex mt-6 items-center gap-2">
                {isEditMode ? (
                    <>
                        <Button className='!bg-primary px-4' onClick={() => setIsEditMode(false)}>Save</Button>
                        <Button className='!bg-red-500 px-4' onClick={() => setIsEditMode(false)}>Cancel</Button>
                    </>
                ) : (
                    <Button className='!bg-primary px-4' onClick={() => setIsEditMode(true)}>Edit</Button>
                )}
            </div>
        </div>
    );
};

export default OtherReleventInfo;
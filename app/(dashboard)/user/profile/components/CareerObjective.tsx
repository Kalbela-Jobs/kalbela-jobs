import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pencil, Plus, Save } from 'lucide-react';
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface CareerObjectiveProps {
      isEditing: boolean
}
const CareerObjective: React.FC<CareerObjectiveProps> = ({ isEditing }) => {
      const [editing, setEditing] = useState(isEditing);
      const [careerObjective, setCareerObjective] = useState({
            postalCode: '',
            presentSalary: '',
            expectedSalary: '',
            jobLevel: 'entry',  // Set default to the first item
            jobNature: 'fullTime'  // Set default to the first item
      });

      useEffect(() => {
            console.log('Career Objective Data:', careerObjective);
      }, [careerObjective]);

      const handleSave = () => {
            // Save data logic here
            setEditing(false);
            console.log('Saved Data:', careerObjective);
      };

      const handleChange = (field: string, value: any) => {
            setCareerObjective(prev => ({ ...prev, [field]: value }));
      };

      const isDataEmpty = () => {
            return !careerObjective.postalCode && !careerObjective.presentSalary && !careerObjective.expectedSalary;
      };
      return (
            <div className="mb-4 px-4 py-2 w-full">
                  <div className="mt-3">
                        <div className='space-y-2'>
                              <div className="flex items-end pb-2 justify-between">
                                    <h1 className=''>Career Objective</h1>

                                    {!editing ? (
                                          <div>
                                                {!isDataEmpty() ? <Button className="!bg-primary !text-white" onClick={() => setEditing(true)} variant="outline">
                                                      <Pencil className="mr-2 h-4 w-4" />
                                                      Edit
                                                </Button> : ''}

                                          </div>
                                    ) : (
                                          <Button className="!bg-primary !text-white" onClick={handleSave} variant="outline">
                                                <Save className="mr-2 h-4 w-4" />
                                                Save
                                          </Button>
                                    )}
                              </div>
                              <div className="mt-4">
                                    {editing ? (
                                          <ReactQuill
                                                value={careerObjective.postalCode}
                                                onChange={(value: string) => handleChange('postalCode', value)}
                                                placeholder="Postal Code..."
                                          />
                                    ) : (
                                          <div className="">
                                                {!careerObjective?.postalCode &&
                                                      careerObjective?.postalCode === ''
                                                      ? (
                                                            <div className='text-center border py-12 rounded'>
                                                                  <h1 className="text-lg font-semibold">No Postal Code Found 😥</h1>

                                                                  <p className="text-gray-400">
                                                                        Sorry you don't have any postal code. Please add postal code.
                                                                  </p>

                                                                  {isDataEmpty() && (
                                                                        <Button className="!bg-primary mt-6 !text-white" onClick={() => setEditing(true)} variant="outline">
                                                                              <Plus className="  h-4 w-4" />
                                                                              Add
                                                                        </Button>
                                                                  )}
                                                            </div>

                                                      )
                                                      : <div dangerouslySetInnerHTML={{ __html: careerObjective.postalCode }} />
                                                }
                                          </div>
                                    )}
                              </div>
                        </div>
                        <div className={`${editing ? 'mt-6' : 'mt-6'} grid grid-cols-2 gap-4 `}>
                              <div className="space-y-2">
                                    <Label>Present Salary <i className='!text-xs text-gray-500'>(TK per month)</i> </Label>
                                    {editing ? (
                                          <Input
                                                placeholder='10,0000'
                                                className='py-1'
                                                type={"number"}
                                                value={careerObjective?.presentSalary}
                                                onChange={(e) => handleChange('presentSalary', e.target.value)}
                                          />
                                    ) : (
                                          <p>{careerObjective.presentSalary ? `${careerObjective.presentSalary} ৳` : 'N/A'}</p>
                                    )}
                              </div>
                              <div className="space-y-2">
                                    <Label>Expected Salary <i className='!text-xs text-gray-500'>(TK per month)</i> </Label>
                                    {editing ? (
                                          <Input
                                                placeholder='20,0000'
                                                className='py-1'
                                                type={"number"}
                                                value={careerObjective.expectedSalary}
                                                onChange={(e) => handleChange('expectedSalary', e.target.value)}
                                          />
                                    ) : (
                                          <p>{careerObjective.expectedSalary ? `${careerObjective?.expectedSalary} ৳` : 'N/A'}</p>
                                    )}
                              </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                              <div className="space-y-2">
                                    <Label>Job Level</Label>
                                    {editing ? (
                                          <Select defaultValue='entry' value={careerObjective.jobLevel} onValueChange={(value) => handleChange('jobLevel', value)}>
                                                <SelectTrigger>
                                                      <SelectValue placeholder="Mid Level" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                      <SelectItem value="entry">Entry Level</SelectItem>
                                                      <SelectItem value="mid">Mid Level</SelectItem>
                                                      <SelectItem value="senior">Senior Level</SelectItem>
                                                </SelectContent>
                                          </Select>
                                    ) : (
                                          <p>{careerObjective?.jobLevel ? careerObjective?.jobLevel : 'N/A'}</p>
                                    )}
                              </div>
                              <div className="space-y-2">
                                    <Label>Job Nature</Label>
                                    {editing ? (
                                          <Select defaultValue='fullTime' value={careerObjective.jobNature} onValueChange={(value) => handleChange('jobNature', value)}>
                                                <SelectTrigger>
                                                      <SelectValue placeholder="Full Time" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                      <SelectItem value="fullTime">Full time</SelectItem>
                                                      <SelectItem value="partTime">Part time</SelectItem>
                                                      <SelectItem value="intern">Internship</SelectItem>
                                                      <SelectItem value="freelance">Freelance</SelectItem>
                                                </SelectContent>
                                          </Select>
                                    ) : (
                                          <p>{careerObjective.jobNature ? careerObjective.jobNature : 'N/A'}</p>
                                    )}
                              </div>
                        </div>
                  </div>
            </div >
      );
};

export default CareerObjective;
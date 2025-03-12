import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Select } from '@radix-ui/react-select';
import { ChevronLeft, Pencil, Save, X } from 'lucide-react';
import React, { useState } from 'react';

const PersonalDetailsEdit = ({ setActiveSection }: { setActiveSection: (section: string | null) => void }) => {
      const [isEditing, setIsEditing] = useState(false)

      const toggleEditMode = () => setIsEditing(!isEditing)
      const handleSave = () => {
            // Handle save logic here
            setIsEditing(false)
      }

      return (
            <div className="bg-white min-h-screen">
                  <div className="bg-light-theme dark:bg-dark-theme text-black p-4 flex items-center justify-between">
                        <div className="flex items-center">
                              <Button variant="ghost" size="icon" className="text-white" onClick={() => setActiveSection(null)}>
                                    <ChevronLeft className="h-6 w-6" />
                              </Button>
                              <h1 className="text-xl font-medium ml-4">Personal Details</h1>
                        </div>
                        {isEditing ? (
                              <div className="flex items-center space-x-2">
                                    <Button variant="ghost" size="icon" className="text-white" onClick={handleSave}>
                                          <Save className="h-5 w-5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-white" onClick={toggleEditMode}>
                                          <X className="h-5 w-5" />
                                    </Button>
                              </div>
                        ) : (
                              <Button variant="ghost" size="icon" className="text-white" onClick={toggleEditMode}>
                                    <Pencil className="h-5 w-5" />
                              </Button>
                        )}
                  </div>
                  <div className="p-4 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                              <div>
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                          id="firstName"
                                          placeholder="First Name"
                                          readOnly={!isEditing}
                                          className={!isEditing ? "bg-gray-50" : ""}
                                    />
                              </div>
                              <div>
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                          id="lastName"
                                          placeholder="Last Name"
                                          readOnly={!isEditing}
                                          className={!isEditing ? "bg-gray-50" : ""}
                                    />
                              </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                              <div>
                                    <Label htmlFor="fathersName">Father's Name</Label>
                                    <Input
                                          id="fathersName"
                                          placeholder="Father's Name"
                                          readOnly={!isEditing}
                                          className={!isEditing ? "bg-gray-50" : ""}
                                    />
                              </div>
                              <div>
                                    <Label htmlFor="mothersName">Mother's Name</Label>
                                    <Input
                                          id="mothersName"
                                          placeholder="Mother's Name"
                                          readOnly={!isEditing}
                                          className={!isEditing ? "bg-gray-50" : ""}
                                    />
                              </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                              <div>
                                    <Label htmlFor="dob">Date of Birth</Label>
                                    <Input id="dob" type="date" readOnly={!isEditing} className={!isEditing ? "bg-gray-50" : ""} />
                              </div>
                              <div>
                                    <Label htmlFor="gender">Gender</Label>
                                    <Select disabled={!isEditing}>
                                          <SelectTrigger id="gender" className={!isEditing ? "bg-gray-50" : ""}>
                                                <SelectValue placeholder="Select" />
                                          </SelectTrigger>
                                          <SelectContent>
                                                <SelectItem value="male">Male</SelectItem>
                                                <SelectItem value="female">Female</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                          </SelectContent>
                                    </Select>
                              </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                              <div>
                                    <Label htmlFor="religion">Religion</Label>
                                    <Input
                                          id="religion"
                                          placeholder="Religion"
                                          readOnly={!isEditing}
                                          className={!isEditing ? "bg-gray-50" : ""}
                                    />
                              </div>
                              <div>
                                    <Label htmlFor="nationality">Nationality</Label>
                                    <Input
                                          id="nationality"
                                          placeholder="Nationality"
                                          readOnly={!isEditing}
                                          className={!isEditing ? "bg-gray-50" : ""}
                                    />
                              </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                              <div>
                                    <Label htmlFor="passportNumber">Passport Number</Label>
                                    <Input
                                          id="passportNumber"
                                          placeholder="Passport Number"
                                          readOnly={!isEditing}
                                          className={!isEditing ? "bg-gray-50" : ""}
                                    />
                              </div>
                              <div>
                                    <Label htmlFor="passportIssueDate">Passport Issue Date</Label>
                                    <Input
                                          id="passportIssueDate"
                                          type="date"
                                          readOnly={!isEditing}
                                          className={!isEditing ? "bg-gray-50" : ""}
                                    />
                              </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                              <div>
                                    <Label htmlFor="primaryMobile">Primary Mobile</Label>
                                    <Input
                                          id="primaryMobile"
                                          placeholder="Primary Mobile"
                                          readOnly={!isEditing}
                                          className={!isEditing ? "bg-gray-50" : ""}
                                    />
                              </div>
                              <div>
                                    <Label htmlFor="secondaryMobile">Secondary Mobile</Label>
                                    <Input
                                          id="secondaryMobile"
                                          placeholder="Secondary Mobile"
                                          readOnly={!isEditing}
                                          className={!isEditing ? "bg-gray-50" : ""}
                                    />
                              </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                              <div>
                                    <Label htmlFor="alternateEmail">Alternate Email</Label>
                                    <Input
                                          id="alternateEmail"
                                          type="email"
                                          placeholder="Alternate Email"
                                          readOnly={!isEditing}
                                          className={!isEditing ? "bg-gray-50" : ""}
                                    />
                              </div>
                              <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                          id="email"
                                          type="email"
                                          placeholder="Email"
                                          readOnly={!isEditing}
                                          className={!isEditing ? "bg-gray-50" : ""}
                                    />
                              </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                              <div>
                                    <Label htmlFor="height">Height (cm)</Label>
                                    <Input
                                          id="height"
                                          type="number"
                                          placeholder="Height"
                                          readOnly={!isEditing}
                                          className={!isEditing ? "bg-gray-50" : ""}
                                    />
                              </div>
                              <div>
                                    <Label htmlFor="weight">Weight (kg)</Label>
                                    <Input
                                          id="weight"
                                          type="number"
                                          placeholder="Weight"
                                          readOnly={!isEditing}
                                          className={!isEditing ? "bg-gray-50" : ""}
                                    />
                              </div>
                        </div>
                        {isEditing && (
                              <Button className="w-full" onClick={handleSave}>
                                    Save
                              </Button>
                        )}
                  </div>
            </div>
      );
};

export default PersonalDetailsEdit;

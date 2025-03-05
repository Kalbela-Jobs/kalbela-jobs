


import React from "react";
import { Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, Award, Globe, Languages, User } from 'lucide-react';

// Using any type as specified in the requirements
const ClassicTemplate = ({ userData }: { userData: any }) => {
      // Function to safely render HTML content
      const renderHTML = (content: string) => {
            return <div dangerouslySetInnerHTML={{ __html: content }} />;
      };

      // Format date to readable format
      const formatDate = (dateString: string) => {
            if (!dateString) return "";
            try {
                  const date = new Date(dateString);
                  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            } catch (e) {
                  return dateString;
            }
      };

      return (
            <div className="w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none">
                  {/* Header Section */}
                  <header className="px-8 py-6 bg-gray-50 border-b">
                        <h1 className="text-3xl font-bold text-gray-800">{userData.fullName}</h1>
                        <h2 className="text-xl text-gray-600 mt-1">{userData.title}</h2>

                        {/* Contact Information */}
                        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                              {userData.email && (
                                    <div className="flex items-center gap-1">
                                          <Mail className="h-4 w-4" />
                                          <span>{userData.email}</span>
                                    </div>
                              )}
                              {userData.phone_number && (
                                    <div className="flex items-center gap-1">
                                          <Phone className="h-4 w-4" />
                                          <span>{userData.phone_number}</span>
                                    </div>
                              )}
                              {userData.address?.presentCity?.label && (
                                    <div className="flex items-center gap-1">
                                          <MapPin className="h-4 w-4" />
                                          <span>{userData.address.presentCity.label}, {userData.address.presentDivision?.label}, {userData.address.presentCountry?.label}</span>
                                    </div>
                              )}
                              {userData.bloodGroup && (
                                    <div className="flex items-center gap-1">
                                          <User className="h-4 w-4" />
                                          <span>Blood Group: {userData.bloodGroup}</span>
                                    </div>
                              )}
                        </div>

                        {/* Professional Summary */}
                        {userData.description && (
                              <div className="mt-4 text-gray-700 leading-relaxed">
                                    {renderHTML(userData.description)}
                              </div>
                        )}
                  </header>

                  <div className="px-8 py-6">
                        {/* Career Objective Section */}
                        {userData.career_objective && (
                              <section className="mb-8">
                                    <div className="flex items-center mb-4">
                                          <Award className="h-5 w-5 text-gray-700 mr-2" />
                                          <h3 className="text-xl font-bold text-gray-800">Career Objective</h3>
                                    </div>
                                    <div className="text-gray-700">
                                          {renderHTML(userData.career_objective)}
                                    </div>
                              </section>
                        )}

                        {/* Experience Section */}
                        {Array.isArray(userData.experience) && userData.experience.length > 0 && (
                              <section className="mb-8">
                                    <div className="flex items-center mb-4">
                                          <Briefcase className="h-5 w-5 text-gray-700 mr-2" />
                                          <h3 className="text-xl font-bold text-gray-800">Professional Experience</h3>
                                    </div>
                                    <div className="space-y-6">
                                          {userData.experience.map((exp: any) => (
                                                <div key={exp._id} className="border-l-2 border-gray-200 pl-4 py-1">
                                                      <div className="flex justify-between items-start flex-wrap">
                                                            <h4 className="text-lg font-semibold text-gray-800">{exp.title}</h4>
                                                            <div className="flex items-center text-sm text-gray-600">
                                                                  <Calendar className="h-3 w-3 mr-1" />
                                                                  <span>
                                                                        {exp.startDate?.month} {exp.startDate?.year} - {exp.currentlyWorking
                                                                              ? "Present"
                                                                              : `${exp.endDate?.month || ""} ${exp.endDate?.year || ""}`}
                                                                  </span>
                                                            </div>
                                                      </div>
                                                      <p className="text-gray-700 font-medium">{exp.companyName} • {exp.location}</p>
                                                      <p className="mt-2 text-gray-600 text-sm whitespace-pre-line">{exp.description}</p>

                                                      {/* Skills used in this role */}
                                                      {Array.isArray(exp.skills) && exp.skills.length > 0 && (
                                                            <div className="mt-2">
                                                                  <p className="text-sm font-medium text-gray-700">Skills:</p>
                                                                  <div className="flex flex-wrap gap-1 mt-1">
                                                                        {exp.skills.map((skill: string, idx: number) => (
                                                                              <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                                                                                    {skill}
                                                                              </span>
                                                                        ))}
                                                                  </div>
                                                            </div>
                                                      )}
                                                </div>
                                          ))}
                                    </div>
                              </section>
                        )}

                        {/* Education Section */}
                        {Array.isArray(userData.education) && userData.education.length > 0 && (
                              <section className="mb-8">
                                    <div className="flex items-center mb-4">
                                          <GraduationCap className="h-5 w-5 text-gray-700 mr-2" />
                                          <h3 className="text-xl font-bold text-gray-800">Education</h3>
                                    </div>
                                    <div className="space-y-6">
                                          {userData.education.map((edu: any) => (
                                                <div key={edu._id} className="border-l-2 border-gray-200 pl-4 py-1">
                                                      <div className="flex justify-between items-start flex-wrap">
                                                            <h4 className="text-lg font-semibold text-gray-800">{edu.universityName}</h4>
                                                            <span className="text-sm text-gray-600">{edu.graduationYear}</span>
                                                      </div>
                                                      <p className="text-gray-700 font-medium">{edu.degree} in {edu.major}</p>
                                                      <p className="text-gray-600">{edu["location/board"] || edu.location}</p>
                                                      {edu?.grade_show && (edu["gpa/cgpa"] || edu.gpa) && (
                                                            <p className="text-sm text-gray-600 mt-1">
                                                                  GPA: {edu["gpa/cgpa"] || edu.gpa}
                                                            </p>
                                                      )}
                                                </div>
                                          ))}
                                    </div>
                              </section>
                        )}

                        {/* Skills Section */}
                        {userData.skills?.skills && Array.isArray(userData.skills.skills) && userData.skills.skills.length > 0 && (
                              <section className="mb-8">
                                    <div className="flex items-center mb-4">
                                          <Award className="h-5 w-5 text-gray-700 mr-2" />
                                          <h3 className="text-xl font-bold text-gray-800">Skills</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                          {userData.skills.skills.map((skill: string, index: number) => (
                                                <span
                                                      key={index}
                                                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                                >
                                                      {skill}
                                                </span>
                                          ))}
                                    </div>
                              </section>
                        )}

                        {/* Languages Section */}
                        {Array.isArray(userData.languages) && userData.languages.length > 0 && (
                              <section className="mb-8">
                                    <div className="flex items-center mb-4">
                                          <Languages className="h-5 w-5 text-gray-700 mr-2" />
                                          <h3 className="text-xl font-bold text-gray-800">Languages</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                          {userData.languages.map((language: string, index: number) => (
                                                <span
                                                      key={index}
                                                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                                >
                                                      {language}
                                                </span>
                                          ))}
                                    </div>
                              </section>
                        )}

                        {/* Additional Contact Information */}
                        {(userData.emergencyEmail || userData.emergencyPhone) && (
                              <section className="mb-8">
                                    <div className="flex items-center mb-4">
                                          <Phone className="h-5 w-5 text-gray-700 mr-2" />
                                          <h3 className="text-xl font-bold text-gray-800">Additional Contact</h3>
                                    </div>
                                    <div className="space-y-2">
                                          {userData.emergencyEmail && (
                                                <div className="flex items-center gap-2">
                                                      <Mail className="h-4 w-4 text-gray-600" />
                                                      <span className="text-gray-700">{userData.emergencyEmail}</span>
                                                </div>
                                          )}
                                          {userData.emergencyPhone && (
                                                <div className="flex items-center gap-2">
                                                      <Phone className="h-4 w-4 text-gray-600" />
                                                      <span className="text-gray-700">{userData.emergencyPhone}</span>
                                                </div>
                                          )}
                                    </div>
                              </section>
                        )}
                  </div>
            </div>
      );
};

export default ClassicTemplate;

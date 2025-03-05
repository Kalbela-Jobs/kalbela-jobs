import React from "react";
import { Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, Award, Languages, User, Globe, Star, Heart } from 'lucide-react';

const CreativeTemplate = ({ userData }: { userData: any }) => {
      // Function to safely render HTML content
      const renderHTML = (content: string) => {
            return <div dangerouslySetInnerHTML={{ __html: content }} />;
      };

      // Generate a random pastel color
      const getRandomPastelColor = (index: number) => {
            const colors = [
                  'bg-pink-100 text-pink-800 border-pink-300',
                  'bg-purple-100 text-purple-800 border-purple-300',
                  'bg-indigo-100 text-indigo-800 border-indigo-300',
                  'bg-blue-100 text-blue-800 border-blue-300',
                  'bg-green-100 text-green-800 border-green-300',
                  'bg-yellow-100 text-yellow-800 border-yellow-300',
                  'bg-orange-100 text-orange-800 border-orange-300',
                  'bg-red-100 text-red-800 border-red-300',
                  'bg-teal-100 text-teal-800 border-teal-300',
                  'bg-cyan-100 text-cyan-800 border-cyan-300',
            ];
            return colors[index % colors.length];
      };

      return (
            <div className="w-full mx-auto relative">
                  {/* Background decorative elements */}
                  {/* <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full opacity-20 -z-10 transform translate-x-1/4 -translate-y-1/4"></div>
                  <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-300 to-teal-300 rounded-full opacity-20 -z-10 transform -translate-x-1/4 translate-y-1/4"></div> */}

                  <div className="bg-white shadow-xl rounded-xl overflow-hidden">
                        {/* Header Section with creative design */}
                        <header className="relative px-8 py-12 overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 opacity-90"></div>
                              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgxMzUpIj48cGF0aCBkPSJNMjAgMCBMMjAgNDAgTTAgMjAgTDQwIDIwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgZmlsbD0ibm9uZSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')] opacity-30"></div>

                              <div className="relative flex flex-col md:flex-row md:items-end gap-8">
                                    {userData.profile_picture && (
                                          <div className="flex-shrink-0 mx-auto md:mx-0">
                                                <div className="w-36 h-36 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                                                      <img
                                                            src={userData.profile_picture || "/placeholder.svg"}
                                                            alt={userData.fullName}
                                                            className="w-full h-full object-cover"
                                                      />
                                                </div>
                                          </div>
                                    )}

                                    <div className="text-center md:text-left">
                                          <h1 className="text-4xl md:text-5xl font-bold text-white">{userData.fullName}</h1>
                                          <h2 className="text-xl md:text-2xl mt-2 text-white/80 font-light">{userData.title}</h2>

                                          {/* Quick contact info */}
                                          <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4 text-sm text-white">
                                                {userData.email && (
                                                      <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                                                            <Mail className="h-4 w-4" />
                                                            <span>{userData.email}</span>
                                                      </div>
                                                )}
                                                {userData.phone_number && (
                                                      <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                                                            <Phone className="h-4 w-4" />
                                                            <span>{userData.phone_number}</span>
                                                      </div>
                                                )}
                                          </div>
                                    </div>
                              </div>
                        </header>

                        {/* About Me Section */}
                        {userData.description && (
                              <div className="px-8 py-6 bg-gradient-to-r from-purple-50 to-pink-50">
                                    <div className="max-w-3xl mx-auto">
                                          <div className="text-center">
                                                <h3 className="inline-block text-xl font-bold text-purple-800 px-4 py-1 rounded-full bg-purple-100 mb-4">
                                                      About Me
                                                </h3>
                                          </div>
                                          <div className="text-gray-700 leading-relaxed text-center">
                                                {renderHTML(userData.description)}
                                          </div>
                                    </div>
                              </div>
                        )}

                        <div className="p-8">
                              {/* Career Objective Section */}
                              {userData.career_objective && (
                                    <div className="mb-12 px-8 mx-auto">
                                          <div className="text-center mb-6">
                                                <h3 className="inline-block text-xl font-bold text-pink-800 px-4 py-1 rounded-full bg-pink-100">
                                                      Career Objective
                                                </h3>
                                          </div>
                                          <div className="relative">
                                                <div className="absolute top-0 left-0 -ml-4 h-full w-1 bg-gradient-to-b from-purple-300 to-pink-300 rounded-full"></div>
                                                <div className="pl-6 text-gray-700">
                                                      {renderHTML(userData.career_objective)}
                                                </div>
                                          </div>
                                    </div>
                              )}

                              <div className="grid md:grid-cols-2 gap-8">
                                    {/* Left Column */}
                                    <div>
                                          {/* Experience Section */}
                                          {Array.isArray(userData.experience) && userData.experience.length > 0 && (
                                                <div className="mb-10">
                                                      <div className="flex items-center justify-center mb-6">
                                                            <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                                                                  <Briefcase className="h-5 w-5" />
                                                                  <h3 className="text-xl font-bold">Experience</h3>
                                                            </div>
                                                      </div>

                                                      <div className="space-y-8">
                                                            {userData.experience.map((exp: any, index: number) => (
                                                                  <div key={exp._id} className="relative">
                                                                        {/* Decorative elements */}
                                                                        <div className="absolute top-0 left-0 -ml-3 mt-1 w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                                                                              <Star className="h-3 w-3 text-white" />
                                                                        </div>
                                                                        <div className="absolute top-6 left-0 -ml-0.5 h-full w-0.5 bg-gradient-to-b from-blue-400 to-indigo-100"></div>

                                                                        <div className="pl-8">
                                                                              <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-blue-400 hover:shadow-lg transition-shadow">
                                                                                    <div className="flex justify-between items-start flex-wrap gap-2">
                                                                                          <h4 className="text-lg font-semibold text-gray-800">{exp.title}</h4>
                                                                                          <div className="flex items-center text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-full">
                                                                                                <Calendar className="h-3 w-3 mr-1" />
                                                                                                <span>
                                                                                                      {exp.startDate?.month} {exp.startDate?.year} - {exp.currentlyWorking
                                                                                                            ? "Present"
                                                                                                            : `${exp.endDate?.month || ""} ${exp.endDate?.year || ""}`}
                                                                                                </span>
                                                                                          </div>
                                                                                    </div>
                                                                                    <p className="text-gray-700 font-medium mt-1">{exp.companyName} • {exp.location}</p>
                                                                                    <p className="mt-3 text-gray-600 text-sm">{exp.description}</p>

                                                                                    {/* Skills used in this role */}
                                                                                    {Array.isArray(exp.skills) && exp.skills.length > 0 && (
                                                                                          <div className="mt-4">
                                                                                                <p className="text-sm font-medium text-gray-700">Skills:</p>
                                                                                                <div className="flex flex-wrap gap-2 mt-1">
                                                                                                      {exp.skills.map((skill: string, idx: number) => (
                                                                                                            <span
                                                                                                                  key={idx}
                                                                                                                  className={`px-3 py-1 rounded-full text-xs border ${getRandomPastelColor(idx)}`}
                                                                                                            >
                                                                                                                  {skill}
                                                                                                            </span>
                                                                                                      ))}
                                                                                                </div>
                                                                                          </div>
                                                                                    )}
                                                                              </div>
                                                                        </div>
                                                                  </div>
                                                            ))}
                                                      </div>
                                                </div>
                                          )}

                                          {/* Languages Section */}
                                          {Array.isArray(userData.languages) && userData.languages.length > 0 && (
                                                <div className="mb-10">
                                                      <div className="flex items-center justify-center mb-6">
                                                            <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                                                                  <Languages className="h-5 w-5" />
                                                                  <h3 className="text-xl font-bold">Languages</h3>
                                                            </div>
                                                      </div>

                                                      <div className="grid grid-cols-2 gap-4">
                                                            {userData.languages.map((language: string, index: number) => (
                                                                  <div
                                                                        key={index}
                                                                        className="bg-white rounded-xl shadow-sm p-4 text-center border border-green-100 hover:shadow-md transition-shadow"
                                                                  >
                                                                        <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center">
                                                                              <Globe className="h-8 w-8 text-green-600" />
                                                                        </div>
                                                                        <h4 className="font-medium text-gray-800">{language}</h4>
                                                                  </div>
                                                            ))}
                                                      </div>
                                                </div>
                                          )}
                                    </div>

                                    {/* Right Column */}
                                    <div>
                                          {/* Education Section */}
                                          {Array.isArray(userData.education) && userData.education.length > 0 && (
                                                <div className="mb-10">
                                                      <div className="flex items-center justify-center mb-6">
                                                            <div className="flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full">
                                                                  <GraduationCap className="h-5 w-5" />
                                                                  <h3 className="text-xl font-bold">Education</h3>
                                                            </div>
                                                      </div>

                                                      <div className="space-y-8">
                                                            {userData.education.map((edu: any, index: number) => (
                                                                  <div key={edu._id} className="relative">
                                                                        {/* Decorative elements */}
                                                                        <div className="absolute top-0 left-0 -ml-3 mt-1 w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                                                                              <GraduationCap className="h-3 w-3 text-white" />
                                                                        </div>
                                                                        <div className="absolute top-6 left-0 -ml-0.5 h-full w-0.5 bg-gradient-to-b from-purple-400 to-pink-100"></div>

                                                                        <div className="pl-8">
                                                                              <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-purple-400 hover:shadow-lg transition-shadow">
                                                                                    <div className="flex justify-between items-start flex-wrap gap-2">
                                                                                          <h4 className="text-lg font-semibold text-gray-800">{edu.universityName}</h4>
                                                                                          <span className="text-sm text-gray-600 bg-purple-50 px-3 py-1 rounded-full">
                                                                                                {edu.graduationYear}
                                                                                          </span>
                                                                                    </div>
                                                                                    <p className="text-gray-700 font-medium mt-1">{edu.degree} in {edu.major}</p>
                                                                                    <p className="text-gray-600 mt-1">{edu["location/board"] || edu.location}</p>
                                                                                    {(edu["gpa/cgpa"] || edu.gpa) && (
                                                                                          <div className="mt-3 flex items-center">
                                                                                                <span className="text-sm text-gray-600">
                                                                                                      GPA: <span className="font-semibold">{edu["gpa/cgpa"] || edu.gpa}</span>
                                                                                                </span>
                                                                                                <div className="ml-2 flex">
                                                                                                      {[...Array(5)].map((_, i) => (
                                                                                                            <Star
                                                                                                                  key={i}
                                                                                                                  className={`h-4 w-4 ${i < Math.min(Math.round(parseFloat(edu["gpa/cgpa"] || edu.gpa)), 5)
                                                                                                                        ? 'text-yellow-400 fill-yellow-400'
                                                                                                                        : 'text-gray-300'}`}
                                                                                                            />
                                                                                                      ))}
                                                                                                </div>
                                                                                          </div>
                                                                                    )}
                                                                              </div>
                                                                        </div>
                                                                  </div>
                                                            ))}
                                                      </div>
                                                </div>
                                          )}

                                          {/* Skills Section */}
                                          {userData.skills?.skills && Array.isArray(userData.skills.skills) && userData.skills.skills.length > 0 && (
                                                <div className="mb-10">
                                                      <div className="flex items-center justify-center mb-6">
                                                            <div className="flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full">
                                                                  <Award className="h-5 w-5" />
                                                                  <h3 className="text-xl font-bold">Skills</h3>
                                                            </div>
                                                      </div>

                                                      <div className="grid grid-cols-2 gap-4">
                                                            {userData.skills.skills.map((skill: string, index: number) => (
                                                                  <div
                                                                        key={index}
                                                                        className="relative bg-white rounded-xl shadow-sm p-4 border border-red-100 hover:shadow-md transition-shadow overflow-hidden"
                                                                  >
                                                                        {/* Decorative background */}
                                                                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-red-100 to-pink-100 rounded-full -mr-4 -mt-4"></div>

                                                                        <div className="relative">
                                                                              <h4 className="font-medium text-gray-800">{skill}</h4>
                                                                              <div className="mt-2 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                                                                    <div
                                                                                          className="h-full bg-gradient-to-r from-red-400 to-pink-500 rounded-full"
                                                                                          style={{ width: `${85 + (index % 3) * 5}%` }}
                                                                                    ></div>
                                                                              </div>
                                                                        </div>
                                                                  </div>
                                                            ))}
                                                      </div>
                                                </div>
                                          )}

                                          {/* Contact Information */}
                                          <div className="mb-10">
                                                <div className="flex items-center justify-center mb-6">
                                                      <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full">
                                                            <Phone className="h-5 w-5" />
                                                            <h3 className="text-xl font-bold">Contact</h3>
                                                      </div>
                                                </div>

                                                <div className="bg-white rounded-xl shadow-md p-5 border border-yellow-200">
                                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {userData.email && (
                                                                  <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50">
                                                                        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                                                                              <Mail className="h-5 w-5 text-yellow-700" />
                                                                        </div>
                                                                        <div>
                                                                              <p className="text-xs text-yellow-700 font-medium">Email</p>
                                                                              <p className="text-gray-700">{userData.email}</p>
                                                                        </div>
                                                                  </div>
                                                            )}

                                                            {userData.phone_number && (
                                                                  <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50">
                                                                        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                                                                              <Phone className="h-5 w-5 text-yellow-700" />
                                                                        </div>
                                                                        <div>
                                                                              <p className="text-xs text-yellow-700 font-medium">Phone</p>
                                                                              <p className="text-gray-700">{userData.phone_number}</p>
                                                                        </div>
                                                                  </div>
                                                            )}

                                                            {userData.address?.presentCity?.label && (
                                                                  <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50">
                                                                        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                                                                              <MapPin className="h-5 w-5 text-yellow-700" />
                                                                        </div>
                                                                        <div>
                                                                              <p className="text-xs text-yellow-700 font-medium">Location</p>
                                                                              <p className="text-gray-700">{userData.address.presentCity.label}, {userData.address.presentDivision?.label}</p>
                                                                        </div>
                                                                  </div>
                                                            )}

                                                            {userData.bloodGroup && (
                                                                  <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50">
                                                                        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                                                                              <Heart className="h-5 w-5 text-yellow-700" />
                                                                        </div>
                                                                        <div>
                                                                              <p className="text-xs text-yellow-700 font-medium">Blood Group</p>
                                                                              <p className="text-gray-700">{userData.bloodGroup}</p>
                                                                        </div>
                                                                  </div>
                                                            )}

                                                            {userData.emergencyEmail && (
                                                                  <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50">
                                                                        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                                                                              <Mail className="h-5 w-5 text-yellow-700" />
                                                                        </div>
                                                                        <div>
                                                                              <p className="text-xs text-yellow-700 font-medium">Emergency Email</p>
                                                                              <p className="text-gray-700">{userData.emergencyEmail}</p>
                                                                        </div>
                                                                  </div>
                                                            )}

                                                            {userData.emergencyPhone && (
                                                                  <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50">
                                                                        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                                                                              <Phone className="h-5 w-5 text-yellow-700" />
                                                                        </div>
                                                                        <div>
                                                                              <p className="text-xs text-yellow-700 font-medium">Emergency Phone</p>
                                                                              <p className="text-gray-700">{userData.emergencyPhone}</p>
                                                                        </div>
                                                                  </div>
                                                            )}
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default CreativeTemplate;

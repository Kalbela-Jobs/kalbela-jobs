import { Mail, Phone, MapPin, Calendar, Award, Languages, User } from "lucide-react"

const ModernTemplate = ({ userData }: { userData: any }) => {
      // Function to safely render HTML content
      const renderHTML = (content: string) => {
            return <div dangerouslySetInnerHTML={{ __html: content }} />
      }

      // Format date to readable format
      const formatDate = (dateString: string) => {
            if (!dateString) return ""
            try {
                  const date = new Date(dateString)
                  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
            } catch (e) {
                  return dateString
            }
      }

      return (
            <div className="w-full mx-auto bg-white shadow-xl rounded-lg overflow-hidden print:shadow-none">
                  {/* Header Section with gradient background */}
                  <header className="px-8 py-10 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
                              <div>
                                    <h1 className="text-4xl font-bold">{userData.fullName}</h1>
                                    <h2 className="text-xl mt-2 text-blue-100">{userData.title}</h2>
                              </div>

                              {userData.profile_picture && (
                                    <div className="flex-shrink-0">
                                          <img
                                                src={userData.profile_picture || "/placeholder.svg"}
                                                alt={userData.fullName}
                                                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                                          />
                                    </div>
                              )}
                        </div>
                  </header>

                  <div className="flex  md:flex-row">
                        {/* Sidebar */}
                        <aside className="w-full bg-gray-50 p-6 border-r">
                              {/* Contact Information */}
                              <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                                          Contact Information
                                    </h3>
                                    <ul className="space-y-3">
                                          {userData.email && (
                                                <li className="flex items-center gap-3">
                                                      <Mail className="h-5 w-5 text-blue-600" />
                                                      <span className="text-gray-700">{userData.email}</span>
                                                </li>
                                          )}
                                          {userData.phone_number && (
                                                <li className="flex items-center gap-3">
                                                      <Phone className="h-5 w-5 text-blue-600" />
                                                      <span className="text-gray-700">{userData.phone_number}</span>
                                                </li>
                                          )}
                                          {userData.address?.presentCity?.label && (
                                                <li className="flex items-center gap-3">
                                                      <MapPin className="h-5 w-5 text-blue-600" />
                                                      <span className="text-gray-700">
                                                            {userData.address.presentCity.label}, {userData.address.presentDivision?.label}
                                                      </span>
                                                </li>
                                          )}
                                          {userData.bloodGroup && (
                                                <li className="flex items-center gap-3">
                                                      <User className="h-5 w-5 text-blue-600" />
                                                      <span className="text-gray-700">Blood Group: {userData.bloodGroup}</span>
                                                </li>
                                          )}
                                    </ul>
                              </div>

                              {/* Languages Section */}
                              {Array.isArray(userData.languages) && userData.languages.length > 0 && (
                                    <div className="mb-8">
                                          <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
                                                <Languages className="h-5 w-5 mr-2 text-blue-600" />
                                                Languages
                                          </h3>
                                          <div className="space-y-2">
                                                {userData.languages.map((language: string, index: number) => (
                                                      <div key={index} className="flex items-center justify-between">
                                                            <span className="text-gray-700">{language}</span>
                                                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                                  <div className="h-full bg-blue-600 rounded-full" style={{ width: "90%" }}></div>
                                                            </div>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>
                              )}

                              {/* Skills Section */}
                              {userData.skills?.skills && Array.isArray(userData.skills.skills) && userData.skills.skills.length > 0 && (
                                    <div className="mb-8">
                                          <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
                                                <Award className="h-5 w-5 mr-2 text-blue-600" />
                                                Skills
                                          </h3>
                                          <div className="space-y-3">
                                                {userData.skills.skills.map((skill: string, index: number) => (
                                                      <div key={index} className="flex items-center justify-between">
                                                            <span className="text-gray-700">{skill}</span>
                                                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                                  <div
                                                                        className="h-full bg-blue-600 rounded-full"
                                                                        style={{ width: `${85 + (index % 3) * 5}%` }}
                                                                  ></div>
                                                            </div>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>
                              )}

                              {/* Additional Contact Information */}
                              {(userData.emergencyEmail || userData.emergencyPhone) && (
                                    <div className="mb-8">
                                          <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
                                                <Phone className="h-5 w-5 mr-2 text-blue-600" />
                                                Additional Contact
                                          </h3>
                                          <ul className="space-y-3">
                                                {userData.emergencyEmail && (
                                                      <li className="flex items-center gap-3">
                                                            <Mail className="h-5 w-5 text-blue-600" />
                                                            <span className="text-gray-700">{userData.emergencyEmail}</span>
                                                      </li>
                                                )}
                                                {userData.emergencyPhone && (
                                                      <li className="flex items-center gap-3">
                                                            <Phone className="h-5 w-5 text-blue-600" />
                                                            <span className="text-gray-700">{userData.emergencyPhone}</span>
                                                      </li>
                                                )}
                                          </ul>
                                    </div>
                              )}
                        </aside>

                        {/* Main Content */}
                        <main className="w-full md:w-2/3 p-6">
                              {/* Professional Summary */}
                              {userData.description && (
                                    <div className="mb-8">
                                          <h3 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b-2 border-blue-600 inline-block">
                                                About Me
                                          </h3>
                                          <div className="text-gray-700 leading-relaxed mt-3">{renderHTML(userData.description)}</div>
                                    </div>
                              )}

                              {/* Career Objective Section */}
                              {userData.career_objective && (
                                    <div className="mb-8">
                                          <h3 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b-2 border-blue-600 inline-block">
                                                Career Objective
                                          </h3>
                                          <div className="text-gray-700 mt-3">{renderHTML(userData.career_objective)}</div>
                                    </div>
                              )}

                              {/* Experience Section */}
                              {Array.isArray(userData.experience) && userData.experience.length > 0 && (
                                    <div className="mb-8">
                                          <h3 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b-2 border-blue-600 inline-block">
                                                Professional Experience
                                          </h3>
                                          <div className="space-y-6 mt-4">
                                                {userData.experience.map((exp: any) => (
                                                      <div key={exp._id} className="relative pl-6 border-l-2 border-blue-200">
                                                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600"></div>
                                                            <div className="mb-1">
                                                                  <div className="flex justify-between items-start flex-wrap">
                                                                        <h4 className="text-lg font-semibold text-gray-800">{exp.title}</h4>
                                                                        <div className="flex items-center text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-full">
                                                                              <Calendar className="h-3 w-3 mr-1" />
                                                                              <span>
                                                                                    {exp.startDate?.month} {exp.startDate?.year} -{" "}
                                                                                    {exp.currentlyWorking
                                                                                          ? "Present"
                                                                                          : `${exp.endDate?.month || ""} ${exp.endDate?.year || ""}`}
                                                                              </span>
                                                                        </div>
                                                                  </div>
                                                                  <p className="text-gray-700 font-medium">
                                                                        {exp.companyName} • {exp.location}
                                                                  </p>
                                                            </div>
                                                            <p className="mt-2 text-gray-600 text-sm">{exp.description}</p>

                                                            {/* Skills used in this role */}
                                                            {Array.isArray(exp.skills) && exp.skills.length > 0 && (
                                                                  <div className="mt-3">
                                                                        <p className="text-sm font-medium text-gray-700">Skills:</p>
                                                                        <div className="flex flex-wrap gap-2 mt-1">
                                                                              {exp.skills.map((skill: string, idx: number) => (
                                                                                    <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                                                                                          {skill}
                                                                                    </span>
                                                                              ))}
                                                                        </div>
                                                                  </div>
                                                            )}
                                                      </div>
                                                ))}
                                          </div>
                                    </div>
                              )}

                              {/* Education Section */}
                              {Array.isArray(userData.education) && userData.education.length > 0 && (
                                    <div className="mb-8">
                                          <h3 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b-2 border-blue-600 inline-block">
                                                Education
                                          </h3>
                                          <div className="space-y-6 mt-4">
                                                {userData.education.map((edu: any) => (
                                                      <div key={edu._id} className="relative pl-6 border-l-2 border-blue-200">
                                                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600"></div>
                                                            <div className="mb-1">
                                                                  <div className="flex justify-between items-start flex-wrap">
                                                                        <h4 className="text-lg font-semibold text-gray-800">{edu.universityName}</h4>
                                                                        <span className="text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-full">
                                                                              {edu.graduationYear}
                                                                        </span>
                                                                  </div>
                                                                  <p className="text-gray-700 font-medium">
                                                                        {edu.degree} in {edu.major}
                                                                  </p>
                                                                  <p className="text-gray-600">{edu["location/board"] || edu.location}</p>
                                                                  {(edu["gpa/cgpa"] || edu.gpa) && (
                                                                        <p className="text-sm text-gray-600 mt-1">
                                                                              GPA: <span className="font-semibold">{edu["gpa/cgpa"] || edu.gpa}</span>
                                                                              {edu.grade_show && " (shown)"}
                                                                        </p>
                                                                  )}
                                                            </div>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>
                              )}
                        </main>
                  </div>
            </div>
      )
}

export default ModernTemplate

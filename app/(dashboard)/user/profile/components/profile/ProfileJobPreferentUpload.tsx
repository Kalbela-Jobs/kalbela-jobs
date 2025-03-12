import useApiForPost from "@/app/hooks/useApiForPost";
import uploadImage from "@/app/hooks/useUploadImage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserData } from "@/utils/encript_decript";
import { useQuery } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { EditModal } from "../CommonModal";
import Select from 'react-select';

const ProfileJobPreferenceUpload = () => {
    const [user, setUserData] = useUserData()
    const [description, setDescription] = useState(user?.career_objective)
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [desError, setDesError] = useState(null)
    const { apiRequest } = useApiForPost()

    // ------------------- resume ------------------//
    const [editResumeOpen, setEditResumeOpen] = useState(false)
    const [resumeData, setResumeData] = useState<any>(null)
    const [resumeName, setResumeName] = useState("")
    const [previewResume, setPreviewResume] = useState<any>(null)

    // ------------------- extracurricular activities ------------------//
    const [extracurricularActivities, setExtracurricularActivities] = useState([])

    // ------------------- skills ------------------//
    const [skills, setSkills] = useState([])

    // ------------------- job categories ------------------//
    const [jobCategories, setJobCategories] = useState([])

    // ------------------- job locations ------------------//
    const [jobLocations, setJobLocations] = useState([])

    // ------------------- job type ------------------//
    const [jobType, setJobType] = useState("")

    // ------------------- present salary ------------------//
    const [presentSalary, setPresentSalary] = useState("")

    // ------------------- expected salary ------------------//
    const [expectedSalary, setExpectedSalary] = useState("")

    useEffect(() => {
        if (user?.career_objective) {
            setDescription(user?.career_objective)
        }

    }, [user]);

    const handleChange = (value: string) => {
        setDescription(value)
    }

    const handleActivitiesChange = (selectedOptions: any) => {
        setExtracurricularActivities(selectedOptions)
    }

    const handleSkillsChange = (selectedOptions: any) => {
        setSkills(selectedOptions)
    }

    const handleJobCategoriesChange = (selectedOptions: any) => {
        setJobCategories(selectedOptions)
    }

    const handleJobLocationsChange = (selectedOptions: any) => {
        setJobLocations(selectedOptions)
    }

    // main update handler
    const handleUpdate = async () => {
        console.log({
            career_objective: description,
            extracurricular_activities: extracurricularActivities.map((activity: any) => activity.value),
            skills: skills.map((skill: any) => skill.value),
            job_categories: jobCategories.map((category: any) => category.value),
            job_locations: jobLocations.map((location: any) => location.value),
            job_type: jobType,
            present_salary: presentSalary,
            expected_salary: expectedSalary,
        });

        update_contact();

        if (resumeData) {
            const resume_url = await uploadImage(resumeData)
            if (resume_url) {
                const { data, error } = await apiRequest<any>(
                    `api/v1/user/upload-resume`,
                    "POST",
                    {
                        resume_url,
                        resume_name: resumeName,
                        user_id: user?._id,
                    }
                )

                if (data) {
                    refetch()
                }
            }
        }
    }

    const update_contact = async () => {
        setLoading(true)
        const { data, error } = await apiRequest<any>(
            `api/v1/user/update-profile?id=${user?._id}`,
            "PUT",
            {
                career_objective: description,
                extracurricular_activities: extracurricularActivities.map((activity: any) => activity.value),
                skills: skills.map((skill: any) => skill.value),
                job_categories: jobCategories.map((category: any) => category.value),
                job_locations: jobLocations.map((location: any) => location.value),
                job_type: jobType,
                present_salary: presentSalary,
                expected_salary: expectedSalary,
            }
        )

        setLoading(false)
        if (error) {
            setDesError(error.message)
            return
        }
        if (data) {
            setUserData(data.data)
            setDesError(null)
        }
    }

    //-------------------- resume fun --------------------//

    const {
        data: resumes = [],
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["resumes", user?._id],
        queryFn: async () => {
            if (!user?._id) return []
            const res = await fetch(
                `${process.env.NEXT_APP_BASE_URL}/api/v1/user/get-resume?user_id=${user._id}`
            )

            if (!res.ok) {
                throw new Error("Failed to fetch workspace jobs")
            }

            const data = await res.json()
            return data.data
        },
        enabled: !!user?._id,
    })

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setResumeData(file)
        }
    }

    const activityOptions = [
        { value: 'Debating', label: 'Debating' },
        { value: 'Easy & Article Writing', label: 'Easy & Article Writing' },
        { value: 'Digital Marketing', label: 'Digital Marketing' },
        { value: 'Volunteering', label: 'Volunteering' },
        { value: 'Other', label: 'Other' },
    ]

    const skillsOptions = [
        { value: 'JavaScript', label: 'JavaScript' },
        { value: 'Python', label: 'Python' },
        { value: 'Java', label: 'Java' },
        { value: 'React', label: 'React' },
        { value: 'Node.js', label: 'Node.js' },
    ]

    const jobCategoriesOptions = [
        { value: 'Software Development', label: 'Software Development' },
        { value: 'Data Science', label: 'Data Science' },
        { value: 'Product Management', label: 'Product Management' },
        { value: 'Design', label: 'Design' },
        { value: 'Marketing', label: 'Marketing' },
        { value: 'Sales', label: 'Sales' },
        { value: 'Finance', label: 'Finance' },
        { value: 'Human Resources', label: 'Human Resources' },
        { value: 'Customer Support', label: 'Customer Support' },
        { value: 'Operations', label: 'Operations' },
    ]

    const jobLocationsOptions = [
        { value: 'New York, USA', label: 'New York, USA' },
        { value: 'San Francisco, USA', label: 'San Francisco, USA' },
        { value: 'London, UK', label: 'London, UK' },
        { value: 'Berlin, Germany', label: 'Berlin, Germany' },
        { value: 'Tokyo, Japan', label: 'Tokyo, Japan' },
    ]

    const customStyles = {
        multiValue: (styles: any) => ({
            ...styles,
            backgroundColor: '#001968',
        }),
        multiValueLabel: (styles: any) => ({
            ...styles,
            color: 'white',
        }),
        multiValueRemove: (styles: any) => ({
            ...styles,
            color: 'white',
            ':hover': {
                backgroundColor: 'darkred',
                color: 'white',
            },
        }),
        control: (styles: any, state: any) => ({
            ...styles,
            borderColor: state.isFocused ? '#94a3b8' : styles.borderColor,
            boxShadow: state.isFocused ? 'none' : styles.boxShadow,
            '&:hover': {
                borderColor: state.isFocused ? '#94a3b8' : styles['&:hover'].borderColor,
            },
        }),
    };

    return (
        <div>
            <Button
                variant="destructive"
                className="gap-2 mt-3 !bg-primary"
                onClick={() => setIsOpen(true)}
            >
                <Pencil className="h-4 w-4" />
                Edit
            </Button>

            <EditModal
                title="Job Preference"
                description=""
                open={isOpen}
                onOpenChange={() => setIsOpen(false)} >

                <div className="grid gap-4 py-4">
                    <div className="mb-8 grid gap-2">
                        <Label htmlFor="description">Career Objective</Label>
                        <ReactQuill
                            value={description}
                            onChange={handleChange}
                            placeholder="Write a brief description about your career objective..."
                            className="custom-quill"
                        />
                    </div>
                </div>

                {/* resume */}
                <div className="grid gap-4 py-4 md:!mt-0 !mt-6">
                    <div className="grid gap-2">
                        <Label htmlFor="resumeName">Resume Name</Label>
                        <Input
                            id="resumeName"
                            onChange={(e) => setResumeName(e.target.value)}
                            type="text"
                            placeholder="e.g., Software Engineer 2023"
                            className="custom-input"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="resumeFile">Resume File</Label>
                        <Input
                            id="resumeFile"
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="custom-input"
                        />
                    </div>
                </div>

                {/* extracurricular activities */}
                <div className="grid gap-4 ">
                    <div className="grid gap-2">
                        <Label htmlFor="activities">Extracurricular Activities</Label>
                        <Select
                            id="activities"
                            isMulti
                            options={activityOptions}
                            onChange={handleActivitiesChange}
                            placeholder="Select your extracurricular activities..."
                            styles={customStyles}
                        />
                    </div>
                </div>

                {/* skills */}
                <div className="grid gap-4 mt-4">
                    <div className="grid gap-2">
                        <Label htmlFor="skills">Skills</Label>
                        <Select
                            id="skills"
                            isMulti
                            options={skillsOptions}
                            onChange={handleSkillsChange}
                            placeholder="Select your skills..."
                            styles={customStyles}
                        />
                    </div>
                </div>

                {/* job categories */}
                <div className="grid gap-4 mt-4">
                    <div className="grid gap-2">
                        <Label htmlFor="jobCategories">Preferred Job Categories</Label>
                        <Select
                            id="jobCategories"
                            isMulti
                            options={jobCategoriesOptions}
                            onChange={handleJobCategoriesChange}
                            placeholder="Select your preferred job categories..."
                            isOptionDisabled={() => jobCategories.length >= 10}
                            styles={customStyles}
                        />
                    </div>
                </div>

                {/* job locations */}
                <div className="grid gap-4 mt-4">
                    <div className="grid gap-2">
                        <Label htmlFor="jobLocations">Job Location Preferences</Label>
                        <Select
                            id="jobLocations"
                            isMulti
                            options={jobLocationsOptions}
                            onChange={handleJobLocationsChange}
                            placeholder="Select your job location preferences..."
                            styles={customStyles}
                        />
                    </div>
                </div>

                {/* job type */}
                <div className="grid gap-4 mt-4">
                    <div className="grid gap-2">
                        <Label htmlFor="jobType">Job Type</Label>
                        <Input
                            id="jobType"
                            onChange={(e) => setJobType(e.target.value)}
                            type="text"
                            placeholder="e.g., Full-time, Part-time"
                            className="custom-input"
                        />
                    </div>
                </div>

                {/* present salary */}
                <div className="grid gap-4 mt-4">
                    <div className="grid gap-2">
                        <Label htmlFor="presentSalary">Present Salary</Label>
                        <Input
                            id="presentSalary"
                            onChange={(e) => setPresentSalary(e.target.value)}
                            type="text"
                            placeholder="e.g., $50,000"
                            className="custom-input"
                        />
                    </div>
                </div>

                {/* expected salary */}
                <div className="grid gap-4 mt-4">
                    <div className="grid gap-2">
                        <Label htmlFor="expectedSalary">Expected Salary</Label>
                        <Input
                            id="expectedSalary"
                            onChange={(e) => setExpectedSalary(e.target.value)}
                            type="text"
                            placeholder="e.g., $70,000"
                            className="custom-input"
                        />
                    </div>
                </div>

                <br />
                <div>
                    <Button onClick={handleUpdate} type="submit">
                        Update
                    </Button>
                </div>

            </EditModal>
        </div>
    );
};

export default ProfileJobPreferenceUpload;
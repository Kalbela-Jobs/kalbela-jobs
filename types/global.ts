export type User = {
  id: string
  accessToken?: string
  name: string
  email: string
  phone?: string
  user_type?: string
  profile_image: string | null
}

export type CategoryType = {
  id: number
  name: string
  slug: string
  details: string
  subcategories?: {
    id: number
    name: string
    details: string
    slug: string
  }[]
}

export type DashboardSidebarNavItem = {
  id: number
  icon: React.ComponentType<any>
  label: string
  url: string
  subItems?: DashboardSidebarSubNavItem[]
}

export type DashboardSidebarSubNavItem = {
  id: number
  label: string
  url: string
  icon: React.ComponentType<any>
}

export type Job = {
  id: number // Matches the integer ID
  company: {
    id: number
    name: string
    email: string
    phone: string | null
    userType: string
    emailVerifiedAt: string | null
    profileImage: string | null
    createdAt: string
    updatedAt: string
  }
  title: string // Job title
  slug: string // Slug for URL
  experience_year_start: string // Years of experience start
  experience_year_end: string // Years of experience end
  salary_start: string // Starting salary
  salary_end: string // Ending salary
  description: string // HTML string for description
  applicationDeadline: string // ISO date string for deadline
  jobType: {
    id: number
    name: string
    description: string
    createdAt: string
    updatedAt: string
  }
  workMode: {
    id: number
    name: string
    description: string
    createdAt: string
    updatedAt: string
  }
  experience: {
    id: number
    name: string
    description: string
    createdAt: string
    updatedAt: string
  }
  location: {
    id: number
    name: string
    description: string
    createdAt: string
    updatedAt: string
  }
  education: {
    id: number
    name: string
    description: string
    createdAt: string
    updatedAt: string
  }
  skills: string[] // Array of skills as strings
  benefits: string // HTML string for benefits
  status: string // Status of the job
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
}

// use appliedjobs and application page
export type Application = {
  company: string
  profile: string
  appliedOn: string
  applicants: number
  status: "Applied"
}

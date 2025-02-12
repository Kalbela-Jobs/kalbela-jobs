export const siteConfig = {
  name: "Kalbela Jobs",
  description:
    "Discover the perfect job for you with KalbelaJob - Your trusted job search platform",
  url: "https://kalbelajobs.com",
  ogImage: "/logo.png",
  links: {
    twitter: "https://twitter.com/kalbelajob",
    github: "https://github.com/kalbelajob",
  },
  author: "KalbelaJob Team",
  authorUrl: "https://kalbelajobs.com/team",
  twitterHandle: "@kalbelajob",
  keywords: [
    "job search",
    "career",
    "employment",
    "hiring",
    "job listings",
    "recruitment",
  ],
  navItems: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Jobs",
      href: "/jobs",
    },
    {
      title: "Companies",
      href: "/companies",
    },
    {
      title: "Resources",
      href: "/resources",
    },
    {
      title: "About",
      href: "/about",
    },
  ],
  footerLinks: [
    {
      title: "Company",
      links: [
        { title: "About Us", href: "/about" },
        { title: "Careers", href: "/careers" },
        { title: "Press", href: "/press" },
      ],
    },
    {
      title: "Resources",
      links: [
        { title: "Blog", href: "/blog" },
        { title: "FAQ", href: "/faq" },
        { title: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { title: "Privacy Policy", href: "/privacy" },
        { title: "Terms of Service", href: "/terms" },
        { title: "Cookie Policy", href: "/cookies" },
      ],
    },
  ],
  features: [
    {
      title: "Advanced Job Search",
      description: "Find the ideal job using our advanced search filters",
    },
    {
      title: "Company Profiles",
      description:
        "Explore detailed profiles of companies you're interested in",
    },
    {
      title: "Career Resources",
      description:
        "Benefit from expert guides, tips, and resources to boost your career",
    },
    {
      title: "Job Alerts",
      description: "Receive alerts for jobs that match your criteria",
    },
  ],
}

export type SiteConfig = typeof siteConfig

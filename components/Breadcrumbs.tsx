import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

const Breadcrumbs = () => {
    const pathname = usePathname() // Get current path
    const pathSegments = pathname.split("/").filter(Boolean)

    return (
        <nav className="mb-4 flex items-center text-md text-gray-500">
            <Link href="/" className="text-blue-500 hover:underline">
                Home
            </Link>
            {pathSegments.map((segment, index) => {
                const href = `/${pathSegments.slice(0, index + 1).join("/")}`
                const isLast = index === pathSegments.length - 1

                return (
                    <span key={href} className="flex items-center">
                        {/* Use ChevronRight as the divider */}
                        <ChevronRight className="mx-2 size-4" />

                        {isLast ? (
                            <span className="text-gray-700">{decodeURIComponent(segment)}</span>
                        ) : (
                            <Link href={href} className="text-blue-500 hover:underline">
                                {decodeURIComponent(segment)}
                            </Link>
                        )}
                    </span>
                )
            })}
        </nav>
    )
}

export default Breadcrumbs

import { Loader2 } from "lucide-react"

const LoadingSpinner = ({
      size = "medium",
      className = "",
}: { size?: "small" | "medium" | "large"; className?: string }) => {
      const sizeClasses = {
            small: "h-4 w-4",
            medium: "h-6 w-6",
            large: "h-8 w-8",
      }

      return <Loader2 className={`animate-spin ${sizeClasses[size]} ${className}`} />
}

export default LoadingSpinner

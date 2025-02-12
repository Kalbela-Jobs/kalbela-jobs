import { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

interface SecondaryBtnProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const SecondaryBtn: React.FC<SecondaryBtnProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        "whitespace-normal rounded-sm border px-5 py-1 text-center text-sm font-medium shadow-none transition-colors duration-200 hover:shadow-lg",
        "bg-white text-[#001968] hover:bg-slate-100 dark:border-slate-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default SecondaryBtn

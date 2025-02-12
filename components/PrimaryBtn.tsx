import { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

interface PrimaryBtnProps extends HTMLAttributes<HTMLButtonElement> {
  type?: "submit" | "reset" | "button" | undefined
  children: React.ReactNode
  disabled?: boolean
}

const PrimaryBtn: React.FC<PrimaryBtnProps> = ({
  type,
  disabled,
  children,
  className,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        "whitespace-normal rounded border px-5 py-1 text-center text-sm font-medium shadow-none transition-colors duration-200 hover:shadow-xl",
        "bg-[#001968] text-white dark:bg-white dark:text-gray-900 dark:hover:bg-slate-100",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default PrimaryBtn

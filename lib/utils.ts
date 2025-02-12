import { clsx, type ClassValue } from "clsx"
import { format } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const selectCustomStyles = (theme: string) => ({
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: theme === "dark" ? "#1E293B" : "#FFFFFF",
    color: theme === "dark" ? "#FFFFFF" : "#000000",
    borderColor: theme === "dark" ? "#f2f2f2" : "#cbd5e1",
    boxShadow: state.isFocused
      ? theme === "dark"
        ? "0 0 0 1px #f2f2f2"
        : "0 0 0 1px #001968"
      : "none",
    padding: 0,
    minHeight: "38px",
    "&:hover": {
      borderColor: theme === "dark" ? "#f2f2f2" : "#001968",
    },
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    padding: "0 8px",
    display: "flex",
    alignItems: "center",
    height: "100%",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: theme === "dark" ? "#FFFFFF" : "#000000",
    display: "flex",
    alignItems: "center",
    margin: 0,
  }),
  indicatorsContainer: (provided: any) => ({
    ...provided,
    height: "100%",
  }),
  menu: (provided: any) => ({
    ...provided,
    border: theme === "dark" ? "1px solid #FFFFFF" : provided.border,
    backgroundColor: theme === "dark" ? "#1E293B" : "#FFFFFF",
    color: theme === "dark" ? "#FFFFFF" : "#000000",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? theme === "dark"
        ? "#FFFFFF"
        : "#E2E8F0"
      : state.isFocused
        ? theme === "dark"
          ? "#334155"
          : "#f8fafc"
        : theme === "dark"
          ? "#1E293B"
          : "#FFFFFF",
    color: state.isSelected
      ? theme === "dark"
        ? "#000000"
        : "#000000"
      : theme === "dark"
        ? "#FFFFFF"
        : "#000000",
    "&:active": {
      backgroundColor: theme === "dark" ? "#475569" : "#f8fafc",
      color: theme === "dark" ? "#ffff" : "#000000",
    },
  }),
  menuPortal: (base: any) => ({
    ...base,
    zIndex: 9999,
    pointerEvents: "auto",
  }),
})

export const formatDate = (dateString: string) => {
  return format(new Date(dateString), "dd MMM, yyyy")
}

export const stripHtml = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, "text/html")
  return doc.body.textContent || ""
}

export const truncateText = (text: string, maxLength: number): string => {
  const plainText = stripHtml(text)
  return plainText.length > maxLength
    ? plainText.substring(0, maxLength) + "..."
    : plainText
}

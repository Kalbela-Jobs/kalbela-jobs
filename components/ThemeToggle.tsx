"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  React.useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.remove("dark")
    } else if (theme === "system") {
      setTheme("light")
    } else {
      document.documentElement.classList.add("dark")
    }
  }, [theme, setTheme])

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="h-8 w-8 rounded-full border !bg-gray-100 dark:text-black"
    >
      <Sun className="h-[1.5rem] w-[1.3rem] dark:hidden" />
      <Moon className="hidden h-5 w-5 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

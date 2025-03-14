"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { logout } from "@/utils/encript_decript"
import {
      BookmarkPlus,
      Briefcase,
      FileText,
      LayoutDashboard,
      LogOut,
      MessageSquare,
      ShoppingCart,
      Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import SecondaryBtn from "@/components/SecondaryBtn"


const sidebarItems = [
      { name: "Dashboard", href: "/user", icon: LayoutDashboard },
      { name: "Saved Jobs", href: "/user/saved-jobs", icon: BookmarkPlus },
      { name: "Applied Jobs", href: "/user/applied-jobs", icon: Briefcase },
      { name: "Profile", href: "/user/profile?tab=basic_info", icon: Users },
      { name: "Products", href: "/user/products", icon: ShoppingCart },
      { name: "Reports", href: "/user/reports", icon: FileText },
      // { name: "Chats", href: "/user/chats", icon: MessageSquare },
      { name: "Resume Builder", href: "/user/resume_builder", icon: FileText },
]

export function Sidebar({
      setIsDashboardSidebarOpen,
}: {
      setIsDashboardSidebarOpen?: React.Dispatch<React.SetStateAction<boolean>>
}) {
      const pathname = usePathname()

      const router = useRouter()


      return (
            <ScrollArea className="h-full flex flex-col justify-between  pt-4 pb-6">
                  <div className="space-y-4 ">
                        <div className="px- py-2">
                              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                                    Menu
                              </h2>
                              <div className="space-y-1">
                                    {sidebarItems.map((item) => (
                                          <Button
                                                onClick={() =>
                                                      setIsDashboardSidebarOpen && setIsDashboardSidebarOpen(false)
                                                }
                                                key={item.name}
                                                variant={pathname === item.href ? "secondary" : "ghost"}
                                                className="w-full justify-start rounded-sm"
                                                asChild
                                          >
                                                <Link href={item.href}>
                                                      <item.icon className="mr-2 h-4 w-4" />
                                                      {item.name}
                                                </Link>
                                          </Button>
                                    ))}
                              </div>
                        </div>
                  </div>
                  <div className="mt-auto p-4">
                        <SecondaryBtn
                              className="mt-2 flex w-full items-center justify-center space-x-4 py-2 text-red-500 hover:text-red-600"
                              onClick={() => {
                                    logout()
                                    router.push('/login')
                              }}
                        >
                              <LogOut className="mr-2 h-4 w-4" />
                              Logout
                        </SecondaryBtn>
                  </div>
            </ScrollArea>
      )
}

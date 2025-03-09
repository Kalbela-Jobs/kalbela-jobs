"use client"

import React, { Fragment, useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { logout, useUserData } from "@/utils/encript_decript"
import { Briefcase, Home, LayoutDashboardIcon, LogIn, LogOut, Menu, Search, Settings, User, UserPlus } from "lucide-react"

import { cn } from "@/lib/utils"
import {
      Sheet,
      SheetContent,
      SheetDescription,
      SheetHeader,
      SheetTitle,
      SheetTrigger,
} from "@/components/ui/sheet"
import {
      Tooltip,
      TooltipContent,
      TooltipProvider,
      TooltipTrigger,
} from "@/components/ui/tooltip"

import { Sidebar } from "../app/(dashboard)/user/components/Sideber"
import MobileNav from "./navbar/MobileNav"
import BottomSearch from "./BottomSearch"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import ShortCutMenu from "./ShortCutMenu"
import { 
      DropdownMenu,
       DropdownMenuContent,
        DropdownMenuGroup,
         DropdownMenuItem,
       DropdownMenuLabel,
      DropdownMenuSeparator,
       DropdownMenuShortcut,
        DropdownMenuSubTrigger,
         DropdownMenuTrigger 
      } from "./ui/dropdown-menu"
import UserNav from "./navbar/UserNav"
import Cookies from "js-cookie"
import { toast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import BottomNavProfile from "./navbar/BottomNavUserProfile"

const BottomNav: React.FC = () => {
      const [isDashboardSidebarOpen, setIsDashboardSidebarOpen] = useState(false)
      const pathname = usePathname()
      const [user] = useUserData()
      const router = useRouter();

      const [alignment, setAlignment] = useState("start");
      useEffect(() => {
            const handleResize = () => {
                  setAlignment(window.innerWidth >= 1024 ? "end" : "start");
            };

            window.addEventListener("resize", handleResize);
            handleResize(); // Set initial alignment
            return () => window.removeEventListener("resize", handleResize);
      }, []);

      const handleLogout = () => {
            logout()
            // router.push("/login")

            setTimeout(() => {
                  const get_user = Cookies.get("kalbelajobs_user");
                  console.log("get_user::::::::::::", get_user);
                  if (!get_user) {
                        toast({
                              title: "Successfully logged out",
                        })
                        router.push('/login');
                  }
            }, 500);
      }


      return (
            <div>
                  <Fragment>
                        <div className="fixed bottom-0 left-1/2 z-50 h-16 w-full max-w-lg -translate-x-1/2 rounded-t-xl border-2 border-b-0 bg-white/30 backdrop-blur-md lg:hidden">
                              <div className="mx-auto grid h-full max-w-lg grid-cols-5">
                                    {/* All menu */}
                                    <div className="flex items-center justify-center">
                                          <div
                                                onClick={() => setIsDashboardSidebarOpen(true)}
                                                data-tooltip-target="tooltip-home"
                                                className="group inline-flex h-10 w-10 flex-col items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 dark:text-black"
                                          >
                                                <TooltipProvider>
                                                      <Tooltip>
                                                            <TooltipTrigger>
                                                                  <Menu className="h-5 w-5" />
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                  <p>All Menu</p>
                                                            </TooltipContent>
                                                      </Tooltip>
                                                </TooltipProvider>
                                          </div>
                                    </div>

                                    {/* Dashboard */}
                                    <ShortCutMenu />

                                    {/* home */}
                                    <div className="flex items-center justify-center">
                                          <Link href="/">
                                                <div
                                                      data-tooltip-target="tooltip-new"
                                                      className={cn(
                                                            "group inline-flex h-10 w-10 flex-col items-center justify-center rounded-full",
                                                            pathname === "/"
                                                                  ? "bg-blue-600 text-white"
                                                                  : "bg-gray-200 hover:bg-gray-300 dark:text-black"
                                                      )}
                                                >
                                                      <TooltipProvider>
                                                            <Tooltip>
                                                                  <TooltipTrigger>
                                                                        <Home className="h-5 w-5" />
                                                                  </TooltipTrigger>
                                                                  <TooltipContent>
                                                                        <p>Home</p>
                                                                  </TooltipContent>
                                                            </Tooltip>
                                                      </TooltipProvider>
                                                </div>
                                          </Link>
                                    </div>

                                    {/* Search */}
                                    <BottomSearch />
                                    {/* Profile */}
                                    <div className="flex items-center justify-center">
                                    <BottomNavProfile user={user} />
                                         {/* <Link href={"/user/profile"}>
                                                <div
                                                      data-tooltip-target="tooltip-profile"
                                                      className={cn(
                                                            "group inline-flex h-10 w-10 flex-col items-center justify-center rounded-full",
                                                            pathname === "/user/profile"
                                                                  ? "bg-blue-600 text-white"
                                                                  : "bg-gray-200 hover:bg-gray-300 dark:text-black"
                                                      )}
                                                >
                                                      <TooltipProvider>
                                                            <Tooltip>
                                                                  <TooltipTrigger>
                                                                        <User className="h-5 w-5" />
                                                                  </TooltipTrigger>
                                                                  <TooltipContent>
                                                                        <p>Profile</p>
                                                                  </TooltipContent>
                                                            </Tooltip>
                                                      </TooltipProvider>
                                                </div>
                                          </Link> */}
                                          
                                    </div>
                              </div>
                        </div>

                        {/* Dashboard sidebar */}
                        <div className="md:hidden">
                              <Sheet
                                    open={isDashboardSidebarOpen}
                                    onOpenChange={setIsDashboardSidebarOpen}
                              >
                                    <SheetTrigger asChild>
                                          <div />
                                    </SheetTrigger>

                                    <SheetContent
                                          side="left"
                                          className={`h-full w-[73%] overflow-y-auto bg-white pt-[14px] text-gray-800 dark:bg-gray-900 dark:text-slate-200`}
                                    >
                                          <SheetHeader>
                                                <SheetTitle className="text-start">
                                                      <Link href="/">
                                                            <img className="h-auto w-48" src="/logo.png" alt="logo" />
                                                      </Link>
                                                </SheetTitle>
                                                <SheetDescription className="sr-only">
                                                      Dasboard Didebar Navigations
                                                </SheetDescription>
                                          </SheetHeader>
                                          {

                                                !user
                                                      ? <MobileNav setIsMobileNavOpen={setIsDashboardSidebarOpen} />
                                                      : <Sidebar
                                                            setIsDashboardSidebarOpen={setIsDashboardSidebarOpen}
                                                      />
                                          }

                                    </SheetContent>
                              </Sheet>
                        </div>
                  </Fragment>
            </div>
      )
}

export default BottomNav

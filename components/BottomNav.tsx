"use client"

import React, { Fragment, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useUserData } from "@/utils/encript_decript"
import { Home, LayoutDashboardIcon, Menu, Search, Settings, User } from "lucide-react"

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

const BottomNav: React.FC = () => {
      const [isDashboardSidebarOpen, setIsDashboardSidebarOpen] = useState(false)
      const pathname = usePathname()
      const [user] = useUserData()

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
                                    <BottomSearch pathname={pathname} />
                                    {/* <div className="flex items-center justify-center">
                                          <Link href="/user/reports">
                                                <div
                                                      data-tooltip-target="tooltip-settings"
                                                      className={cn(
                                                            "group inline-flex h-10 w-10 flex-col items-center justify-center rounded-full",
                                                            pathname === "/user/reports"
                                                                  ? "bg-blue-600 text-white"
                                                                  : "bg-gray-200 hover:bg-gray-300 dark:text-black"
                                                      )}
                                                >
                                                      <TooltipProvider>
                                                            <Tooltip>
                                                                  <TooltipTrigger>
                                                                        <Search className="h-5 w-5" />
                                                                  </TooltipTrigger>
                                                                  <TooltipContent>
                                                                        <p>Notifications</p>
                                                                  </TooltipContent>
                                                            </Tooltip>
                                                      </TooltipProvider>
                                                </div>
                                          </Link>
                                    </div> */}

                                    {/* Profile */}
                                    <div className="flex items-center justify-center">
                                          <Link href="/user/profile">
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
                                          </Link>
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
                                          className={`h-full w-80 overflow-y-auto bg-white pt-[14px] text-gray-800 dark:bg-gray-900 dark:text-slate-200`}
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

"use client"

import { useState } from "react"
import { Bell, UserPlus, AlertTriangle, Info, Check, X, BellIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import useApiRequest from "@/app/hooks/useApiRequest"
import Link from "next/link"

type NotificationType = "message" | "friend" | "alert" | "info"

interface Notification {
      _id: string
      type: NotificationType
      content: string
      time: string
      read: boolean
}

const initialNotifications: Notification[] = [
      {
            _id: "1",
            type: "message",
            content: "New message from Alice",
            time: "5 min ago",
            read: false,
      },
      {
            _id: "2",
            type: "friend",
            content: "Bob sent you a friend request",
            time: "10 min ago",
            read: false,
      },
      {
            _id: "3",
            type: "alert",
            content: "Your subscription is expiring soon",
            time: "1 hour ago",
            read: false,
      },
      {
            _id: "4",
            type: "info",
            content: "System maintenance scheduled for tonight",
            time: "2 hours ago",
            read: true,
      },
      {
            _id: "5",
            type: "message",
            content: "New message from Charlie",
            time: "3 hours ago",
            read: true,
      },
      {
            _id: "6",
            type: "friend",
            content: "Diana accepted your friend request",
            time: "5 hours ago",
            read: true,
      },
      {
            _id: "7",
            type: "alert",
            content: "Unusual login attempt detected",
            time: "1 day ago",
            read: true,
      },
      {
            _id: "8",
            type: "info",
            content: "New feature: Dark mode now available",
            time: "2 days ago",
            read: true,
      },
      {
            _id: "9",
            type: "message",
            content: "New message from Eve",
            time: "3 days ago",
            read: true,
      },
      {
            _id: "10",
            type: "friend",
            content: "Frank wants to connect",
            time: "4 days ago",
            read: true,
      },
      {
            _id: "11",
            type: "alert",
            content: "Your account password was changed",
            time: "5 days ago",
            read: true,
      },
      {
            _id: "12",
            type: "info",
            content: "Weekly newsletter: Top stories",
            time: "1 week ago",
            read: true,
      },
]

const getIcon = (type: NotificationType) => {
      switch (type) {
            case "message":
                  return <Bell className="h-4 w-4" />
            case "friend":
                  return <UserPlus className="h-4 w-4" />
            case "alert":
                  return <AlertTriangle className="h-4 w-4" />
            case "info":
                  return <Info className="h-4 w-4" />
      }
}

const UserActivity = () => {
      const [notifications, setNotifications] = useState(initialNotifications)

      const markAsRead = (id: string) => {
            setNotifications(notifications.map((notif) => (notif._id === id ? { ...notif, read: true } : notif)))
      }

      const deleteNotification = (id: string) => {
            setNotifications(notifications.filter((notif) => notif._id !== id))
      }

      const { data, loading, error } = useApiRequest<any>(
            "jobs/get-featured-jobs",
            "GET"
      )

      return (
            <div className="">
                  <Card className="overflow-hidden rounded-xl border border-gray-200 ">
                        <CardHeader>
                              <CardTitle className="flex justify-between items-center">
                                    Latest Jobs
                                    {/* <Badge variant="secondary">{unreadCount} unread</Badge> */}
                              </CardTitle>
                        </CardHeader>
                        <CardContent>
                              <ScrollArea className="">
                                    {data?.data.slice(0, 5)?.map((job: any) => (
                                          <div
                                                key={job._id}
                                                className={`mb-4 py-2 rounded-lg flex items-start justify-between `}
                                          >
                                                <Link
                                                      href={`/jobs/${job?.job_title}`}
                                                      className="flex items-start space-x-3">
                                                      <div className={`p-2 rounded-full bg-primary text-white`}>
                                                            <BellIcon />
                                                      </div>
                                                      <div>
                                                            <p className={`text-sm font-semibold`}>
                                                                  {job?.job_title}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">{job?.company_info?.name}</p>
                                                      </div>
                                                </Link>

                                          </div>
                                    ))}
                              </ScrollArea>
                        </CardContent>
                  </Card>
            </div>
      )
}

export default UserActivity

"use client"

import { useState } from "react"
import { Bell, UserPlus, AlertTriangle, Info, Check, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

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

      const unreadCount = notifications.filter((notif) => !notif.read).length

      return (
            <Card className="overflow-hidden rounded-xl border border-gray-200 lg:col-span-2 max-h-[500px]">
                  <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                              User Activity
                              <Badge variant="secondary">{unreadCount} unread</Badge>
                        </CardTitle>
                  </CardHeader>
                  <CardContent>
                        <ScrollArea className="h-[400px] pr-4">
                              {notifications.map((notification) => (
                                    <div
                                          key={notification._id}
                                          className={`mb-4 p-3 rounded-lg flex items-start justify-between ${notification.read ? "" : ""
                                                }`}
                                    >
                                          <div className="flex items-start space-x-3">
                                                <div className={`p-2 rounded-full ${notification.read ? "bg-secondary-foreground/20" : "bg-primary text-white"}`}>
                                                      {getIcon(notification.type)}
                                                </div>
                                                <div>
                                                      <p className={`text-sm ${notification.read ? "text-secondary-foreground" : "font-semibold"}`}>
                                                            {notification.content}
                                                      </p>
                                                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                                                </div>
                                          </div>
                                          <div className="flex space-x-1">
                                                {!notification.read && (
                                                      <Button variant="ghost" size="icon" onClick={() => markAsRead(notification._id)}>
                                                            <Check className="h-4 w-4" />
                                                      </Button>
                                                )}
                                                <Button variant="ghost" size="icon" onClick={() => deleteNotification(notification._id)}>
                                                      <X className="h-4 w-4" />
                                                </Button>
                                          </div>
                                    </div>
                              ))}
                        </ScrollArea>
                  </CardContent>
            </Card>
      )
}

export default UserActivity

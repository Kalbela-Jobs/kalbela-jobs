"use client"

import { useState } from "react"
import {
  AlertCircle,
  Bell,
  Check,
  Filter,
  MessageSquare,
  MoreVertical,
  Search,
  UserPlus,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type NotificationType = "message" | "friend" | "alert" | "info"

interface Notification {
  id: string
  type: NotificationType
  content: string
  time: string
  read: boolean
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "message",
    content: "New message from Alice",
    time: "5 min ago",
    read: false,
  },
  {
    id: "2",
    type: "friend",
    content: "Bob sent you a friend request",
    time: "10 min ago",
    read: false,
  },
  {
    id: "3",
    type: "alert",
    content: "Your subscription is expiring soon",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "4",
    type: "info",
    content: "System maintenance scheduled for tonight",
    time: "2 hours ago",
    read: true,
  },
  {
    id: "5",
    type: "message",
    content: "New message from Charlie",
    time: "3 hours ago",
    read: true,
  },
  {
    id: "6",
    type: "friend",
    content: "Diana accepted your friend request",
    time: "5 hours ago",
    read: true,
  },
  {
    id: "7",
    type: "alert",
    content: "Unusual login attempt detected",
    time: "1 day ago",
    read: true,
  },
  {
    id: "8",
    type: "info",
    content: "New feature: Dark mode now available",
    time: "2 days ago",
    read: true,
  },
  {
    id: "9",
    type: "message",
    content: "New message from Eve",
    time: "3 days ago",
    read: true,
  },
  {
    id: "10",
    type: "friend",
    content: "Frank wants to connect",
    time: "4 days ago",
    read: true,
  },
  {
    id: "11",
    type: "alert",
    content: "Your account password was changed",
    time: "5 days ago",
    read: true,
  },
  {
    id: "12",
    type: "info",
    content: "Weekly newsletter: Top stories",
    time: "1 week ago",
    read: true,
  },
]

export default function NotificationCenter() {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications)
  const [filter, setFilter] = useState<NotificationType | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-4 w-4" />
      case "friend":
        return <UserPlus className="h-4 w-4" />
      case "alert":
        return <AlertCircle className="h-4 w-4" />
      case "info":
        return <Bell className="h-4 w-4" />
    }
  }

  const filteredNotifications = notifications
    .filter((n) => filter === "all" || n.type === filter)
    .filter((n) => n.content.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="container mx-auto mb-14 space-y-4 p-4 lg:mb-0">
      <div className="flex flex-wrap items-center justify-between">
        <h1 className="text-3xl font-bold">Notification Center</h1>
        <Button
          variant="outline"
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
        >
          Mark all as read
        </Button>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search notifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <Select
          value={filter}
          onValueChange={(value: NotificationType | "all") => setFilter(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All notifications</SelectItem>
            <SelectItem value="message">Messages</SelectItem>
            <SelectItem value="friend">Friend requests</SelectItem>
            <SelectItem value="alert">Alerts</SelectItem>
            <SelectItem value="info">Information</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <NotificationList
            notifications={filteredNotifications}
            removeNotification={removeNotification}
          />
        </TabsContent>
        <TabsContent value="unread">
          <NotificationList
            notifications={filteredNotifications.filter((n) => !n.read)}
            removeNotification={removeNotification}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface NotificationListProps {
  notifications: Notification[]
  removeNotification: (id: string) => void
}

function NotificationList({
  notifications,
  removeNotification,
}: NotificationListProps) {
  return (
    <Card>
      <CardContent>
        <ScrollArea className="h-[600px] p-4">
          {notifications.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              No notifications to display.
            </p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "my-2 flex items-start space-x-4 rounded rounded-md px-3 py-2 transition-all hover:bg-accent",
                  notification.read ? "opacity-60" : "bg-accent"
                )}
              >
                <div
                  className={cn("mt-1 rounded-full p-1", {
                    "bg-blue-100 text-blue-600":
                      notification.type === "message",
                    "bg-green-100 text-green-600":
                      notification.type === "friend",
                    "bg-red-100 text-red-600": notification.type === "alert",
                    "bg-yellow-100 text-yellow-600":
                      notification.type === "info",
                  })}
                >
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {notification.content}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {notification.time}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => removeNotification(notification.id)}
                    >
                      Dismiss
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Mark as {notification.read ? "unread" : "read"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

function getIcon(type: NotificationType) {
  switch (type) {
    case "message":
      return <MessageSquare className="h-4 w-4" />
    case "friend":
      return <UserPlus className="h-4 w-4" />
    case "alert":
      return <AlertCircle className="h-4 w-4" />
    case "info":
      return <Bell className="h-4 w-4" />
  }
}

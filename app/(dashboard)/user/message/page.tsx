"use client"

import { useState } from "react"
import { Menu, Search, Send } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface Message {
  id: number
  sender: "user" | "seller"
  content: string
  timestamp: string
}

interface Conversation {
  id: number
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unread: boolean
}

export default function FiverrLikeMessaging() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "seller",
      content: "Hi there! How can I help you today?",
      timestamp: "10:00 AM",
    },
    {
      id: 2,
      sender: "user",
      content: "Hello! I'm interested in your web design services.",
      timestamp: "10:05 AM",
    },
    {
      id: 3,
      sender: "seller",
      content:
        "Great! I'd be happy to discuss that with you. What kind of website are you looking to create?",
      timestamp: "10:07 AM",
    },
    {
      id: 4,
      sender: "user",
      content: "I need a portfolio website for my photography business.",
      timestamp: "10:10 AM",
    },
    {
      id: 5,
      sender: "seller",
      content:
        "Sounds exciting! I have experience creating portfolio websites for photographers. Do you have any specific features in mind?",
      timestamp: "10:12 AM",
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Sounds exciting! I have experience...",
      timestamp: "10:12 AM",
      unread: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "That would be great! When can we...",
      timestamp: "Yesterday",
      unread: false,
    },
    {
      id: 3,
      name: "Alice Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "I've sent you the revised logo...",
      timestamp: "2 days ago",
      unread: false,
    },
  ])

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMsg: Message = {
        id: messages.length + 1,
        sender: "user",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }
      setMessages([...messages, newMsg])
      setNewMessage("")
    }
  }

  return (
    <div className="mx-auto flex h-[600px] max-w-4xl overflow-hidden rounded-lg border">
      {/* Sidebar for larger screens */}
      <aside className="hidden w-80 border-r md:block">
        <Sidebar conversations={conversations} />
      </aside>

      {/* Main chat area */}
      <main className="flex flex-1 flex-col">
        <CardHeader className="flex-shrink-0">
          <CardTitle className="flex items-center gap-2">
            {/* Mobile menu trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <Sidebar conversations={conversations} />
              </SheetContent>
            </Sheet>
            <Avatar>
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="Seller"
              />
              <AvatarFallback>S</AvatarFallback>
            </Avatar>
            <span>Chat with Seller</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
          <ScrollArea className="h-full pr-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-4`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="mt-1 text-xs opacity-70">{message.timestamp}</p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex-shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
            className="flex w-full items-center space-x-2"
          >
            <Input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </CardFooter>
      </main>
    </div>
  )
}

function Sidebar({ conversations }: { conversations: Conversation[] }) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4">
        <form className="flex items-center space-x-2">
          <Input type="search" placeholder="Search conversations..." />
          <Button type="submit" size="icon" variant="ghost">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </form>
      </div>
      <ScrollArea className="flex-1">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className="flex cursor-pointer items-center gap-3 p-4 hover:bg-muted"
          >
            <Avatar>
              <AvatarImage src={conversation.avatar} alt={conversation.name} />
              <AvatarFallback>{conversation.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <div className="flex items-baseline justify-between">
                <h3 className="truncate font-semibold">{conversation.name}</h3>
                <span className="text-xs text-muted-foreground">
                  {conversation.timestamp}
                </span>
              </div>
              <p className="truncate text-sm text-muted-foreground">
                {conversation.lastMessage}
              </p>
            </div>
            {conversation.unread && (
              <div className="h-2 w-2 rounded-full bg-primary"></div>
            )}
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}

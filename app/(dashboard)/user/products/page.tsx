import Link from "next/link"
import { CheckSquare, StickyNote } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="container mx-auto flex items-center justify-center p-4">
      <div className="grid w-full max-w-4xl gap-8 md:grid-cols-2">
        <ProductCard
          title="Sticky Note"
          description="Capture your thoughts and ideas instantly"
          icon={<StickyNote className="h-12 w-12" />}
          href="/user/products/sticky-note"
          color="bg-yellow-100 hover:bg-yellow-200"
        />
        <ProductCard
          title="Todo Manager"
          description="Organize your tasks and boost productivity"
          icon={<CheckSquare className="h-12 w-12" />}
          href="/user/products/todo"
          color="bg-blue-100 hover:bg-blue-200"
        />
      </div>
    </main>
  )
}

interface ProductCardProps {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  color: string
}

function ProductCard({
  title,
  description,
  icon,
  href,
  color,
}: ProductCardProps) {
  return (
    <Card
      className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${color}`}
    >
      <CardContent className="p-6">
        <Link
          href={href}
          className="group flex flex-col items-center text-center"
        >
          <div className="mb-4 rounded-full bg-white p-4 shadow-md transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
          <h2 className="mb-2 text-2xl font-bold">{title}</h2>
          <p className="mb-4 text-gray-600">{description}</p>
          <Button className="w-full">Get Started</Button>
        </Link>
      </CardContent>
    </Card>
  )
}

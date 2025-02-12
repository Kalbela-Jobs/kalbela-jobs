import { useState } from "react"
import { motion } from "framer-motion"
import { Palette, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"

interface Note {
  id: string
  content: string
  color: string
  position: { x: number; y: number }
}

interface StickyNoteProps {
  note: Note
  onUpdate: (id: string, updates: Partial<Note>) => void
  onDelete: (id: string) => void
}

const colors = [
  "bg-yellow-200",
  "bg-green-200",
  "bg-blue-200",
  "bg-red-200",
  "bg-purple-200",
  "bg-pink-200",
]

export default function StickyNote({
  note,
  onUpdate,
  onDelete,
}: StickyNoteProps) {
  const [isEditing, setIsEditing] = useState(false)

  const handleDragEnd = (event: any, info: any) => {
    onUpdate(note.id, { position: info.point })
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      style={{ x: note.position.x, y: note.position.y }}
    >
      <Card
        className={`${note.color} overflow-hidden transition-all duration-300 hover:shadow-lg`}
      >
        <CardContent className="relative flex min-h-[200px] flex-col p-4">
          <div className="mb-2 flex items-center justify-between">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-50 hover:opacity-100"
                >
                  <Palette className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <div className="grid grid-cols-3 gap-2 p-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className={`h-8 w-8 rounded-full ${color}`}
                      onClick={() => onUpdate(note.id, { color })}
                    />
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-50 hover:opacity-100"
              onClick={() => onDelete(note.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {isEditing ? (
            <Textarea
              className="flex-grow resize-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              value={note.content}
              onChange={(e) => onUpdate(note.id, { content: e.target.value })}
              onBlur={() => setIsEditing(false)}
              autoFocus
            />
          ) : (
            <div
              className="flex-grow cursor-text whitespace-pre-wrap"
              onClick={() => setIsEditing(true)}
            >
              {note.content || "Click to add note"}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

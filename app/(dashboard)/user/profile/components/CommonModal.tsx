"use client"

import { Button } from "@/components/ui/button"
import {
      Dialog,
      DialogContent,
      DialogDescription,
      DialogFooter,
      DialogHeader,
      DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface EditModalProps {
      open: boolean
      onOpenChange: (open: boolean) => void
      title: string
      description?: string
      children: React.ReactNode
      className?: string
}

export function EditModal({
      open,
      onOpenChange,
      title,
      description,
      children,
      className,
}: EditModalProps) {
      return (
            <div className="">
                  <Dialog open={open} onOpenChange={onOpenChange}>
                        <form >
                              <DialogContent
                                    className={className}
                                    onOpenAutoFocus={(e) => e.preventDefault()}
                              >
                                    <DialogHeader>
                                          <DialogTitle className="text-start">{title}</DialogTitle>
                                          {description && (
                                                <DialogDescription className="text-start">{description}</DialogDescription>
                                          )}
                                    </DialogHeader>
                                    <div
                                          className="z-50 max-h-[500px] overflow-y-auto px-1"
                                          style={{ scrollbarWidth: "none" }}
                                    >
                                          {children}
                                    </div>
                              </DialogContent>
                        </form>
                  </Dialog>
            </div>
      )
}

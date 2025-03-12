"use client"

import * as React from "react"
import { Calendar } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface AccomplishmentDialogProps {
      type: "portfolio" | "publication" | "award" | "project" | "other"
      open: boolean
      onOpenChange: (open: boolean) => void
      onSave: (data: AccomplishmentData) => void
}

interface AccomplishmentData {
      title: string
      issuedOn: string
      url: string
      description: string
}

const MAX_COUNTS = {
      portfolio: 2,
      publication: 5,
      award: 5,
      project: 5,
      other: 5,
}

const TITLES = {
      portfolio: "Portfolio",
      publication: "Publication",
      award: "Award/Honor",
      project: "Project",
      other: "Other",
}

export function AccomplishmentDialog({ type, open, onOpenChange, onSave }: AccomplishmentDialogProps) {
      const [data, setData] = React.useState<AccomplishmentData>({
            title: "",
            issuedOn: "",
            url: "",
            description: "",
      })

      const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault()
            onSave(data)
            onOpenChange(false)
            setData({ title: "", issuedOn: "", url: "", description: "" })
      }

      return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                  <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                              <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
                                    {TITLES[type]}
                                    <span className="text-sm font-normal text-muted-foreground">
                                          (Max {MAX_COUNTS[type]})
                                    </span>
                              </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                              <div className="space-y-2">
                                    <Label htmlFor="title" className="required">
                                          Title
                                    </Label>
                                    <Input
                                          id="title"
                                          value={data.title}
                                          onChange={(e) => setData({ ...data, title: e.target.value })}
                                          required
                                    />
                              </div>
                              <div className="space-y-2">
                                    <Label htmlFor="issuedOn">Issued On</Label>
                                    <div className="relative">
                                          <Input
                                                id="issuedOn"
                                                type="date"
                                                value={data.issuedOn}
                                                onChange={(e) => setData({ ...data, issuedOn: e.target.value })}
                                                className="pr-10"
                                          />
                                          <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                    </div>
                              </div>
                              <div className="space-y-2">
                                    <Label htmlFor="url">URL</Label>
                                    <Input
                                          id="url"
                                          type="url"
                                          value={data.url}
                                          onChange={(e) => setData({ ...data, url: e.target.value })}
                                          placeholder="https://"
                                    />
                              </div>
                              <div className="space-y-2">
                                    <Label htmlFor="description" className="required">
                                          Description
                                    </Label>
                                    <Textarea
                                          id="description"
                                          value={data.description}
                                          onChange={(e) => setData({ ...data, description: e.target.value })}
                                          placeholder="Maximum 300 characters"
                                          maxLength={300}
                                          required
                                          className="h-32"
                                    />
                                    <div className="text-xs text-muted-foreground text-right">
                                          {data.description.length}/300
                                    </div>
                              </div>
                              <DialogFooter className="gap-2">
                                    <Button
                                          type="button"
                                          variant="outline"
                                          onClick={() => onOpenChange(false)}
                                    >
                                          Close
                                    </Button>
                                    <Button type="submit" className="bg-[#001968] hover:bg-[#001968]/90">
                                          Save
                                    </Button>
                              </DialogFooter>
                        </form>
                  </DialogContent>
            </Dialog>
      )
}

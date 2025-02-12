"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

// Overlay: Dims the background
const DialogOverlay = React.forwardRef<
      React.ElementRef<typeof DialogPrimitive.Overlay>,
      React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
      <DialogPrimitive.Overlay
            ref={ref}
            className={cn(
                  "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out",
                  className
            )}
            {...props}
      />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

// Content: Appears at the bottom of the screen
const DialogContent = React.forwardRef<
      React.ElementRef<typeof DialogPrimitive.Content>,
      React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
      <DialogPortal>
            <DialogOverlay />
            <DialogPrimitive.Content
                  ref={ref}
                  className={cn(
                        "fixed w-full text-start z-50 max-w-lg bg-white p-6 shadow-lg transition-all duration-300",
                        "sm:rounded-lg", // Rounded corners on larger screens
                        "bottom-0 z-50 left-1/2 -translate-x-1/2 rounded-t-[20px] lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2" // Bottom for mobile, centered for larger screens
                  )}
                  {...props}
            >
                  {children}

                  {/* Close Button */}
                  <DialogPrimitive.Close className="absolute right-4 top-4 rounded-full bg-gray-200 p-1 hover:bg-gray-300 transition">
                        <X className="h-5 w-5 text-gray-600" />
                  </DialogPrimitive.Close>
            </DialogPrimitive.Content>
      </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

// Header
const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div className={cn("text-center", className)} {...props} />
)
DialogHeader.displayName = "DialogHeader"

// Footer
const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div className={cn("flex justify-start gap-4 mt-4", className)} {...props} />
)
DialogFooter.displayName = "DialogFooter"

// Title
const DialogTitle = React.forwardRef<
      React.ElementRef<typeof DialogPrimitive.Title>,
      React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
      <DialogPrimitive.Title ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

// Description
const DialogDescription = React.forwardRef<
      React.ElementRef<typeof DialogPrimitive.Description>,
      React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
      <DialogPrimitive.Description ref={ref} className={cn("text-sm text-gray-500", className)} {...props} />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
      Dialog,
      DialogPortal,
      DialogOverlay,
      DialogClose,
      DialogTrigger,
      DialogContent,
      DialogHeader,
      DialogFooter,
      DialogTitle,
      DialogDescription,
}

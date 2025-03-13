"use client"

import { useState } from "react"
import { Printer, FileText, Share2, X } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface GovJobData {
      _id: { $oid: string }
      title: string
      pdf_url: string
      organization: {
            name: string
      }
      [key: string]: any
}

const GovJobShareActions = ({ data }: { data: GovJobData }) => {
      const [pdfModalOpen, setPdfModalOpen] = useState(false)

      const handlePrint = () => {
            // Open the PDF in a new window and print it
            const printWindow = window.open(data.pdf_url, "_blank")
            if (printWindow) {
                  printWindow.addEventListener("load", () => {
                        printWindow.print()
                  })
            } else {
                  // Fallback if popup is blocked
                  alert("Please allow popups to print the PDF")
            }
      }

      const handleShare = async () => {
            if (navigator.share) {
                  try {
                        await navigator.share({
                              title: data.title,
                              text: `${data.title} - ${data.organization.name}`,
                              url: window.location.href,
                        })
                  } catch (error) {
                        console.error("Error sharing:", error)
                  }
            } else {
                  // Fallback for browsers that don't support the Web Share API
                  navigator.clipboard.writeText(window.location.href)
                  alert("Link copied to clipboard!")
            }
      }

      return (
            <>
                  <ul className="flex items-center gap-2 absolute right-2 top-2">
                        <li>
                              <button
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-colors"
                                    onClick={handleShare}
                                    aria-label="Share"
                              >
                                    <Share2 size={18} />
                              </button>
                        </li>

                        <li>
                              <button
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                                    onClick={() => setPdfModalOpen(true)}
                                    aria-label="View PDF"
                              >
                                    <FileText size={18} />
                              </button>
                        </li>

                        <li>
                              <button
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-500 text-white hover:bg-gray-600 transition-colors"
                                    onClick={handlePrint}
                                    aria-label="Print"
                              >
                                    <Printer size={18} />
                              </button>
                        </li>
                  </ul>

                  <Dialog open={pdfModalOpen} onOpenChange={setPdfModalOpen}>
                        <DialogContent className="max-w-4xl w-[90vw] h-[90vh] p-0">
                              <div className="relative h-full w-full">
                                    <button
                                          onClick={() => setPdfModalOpen(false)}
                                          className="absolute right-2 top-2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 text-gray-800 hover:bg-gray-200 transition-colors"
                                          aria-label="Close"
                                    >
                                          <X size={18} />
                                    </button>
                                    <iframe src={`${data.pdf_url}#toolbar=0`} className="w-full h-full" title={`${data.title} PDF`} />
                              </div>
                        </DialogContent>
                  </Dialog>
            </>
      )
}

export default GovJobShareActions

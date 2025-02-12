import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { FileText } from "lucide-react"
import { toast } from "react-toastify"

import {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTrigger,
} from "@/components/ui/dialog"

import DailogForm from "./DialogForm"
import PrimaryBtn from "./PrimaryBtn"

interface ApplyModalProps {
      slug: string
      company: string
      user: any
}

const ApplyModal: React.FC<ApplyModalProps> = ({ slug, company, user }) => {
      const navigation = useRouter()

      const [open, setOpen] = useState(false)

      const handleClose = () => {
            setOpen(false)
      }


      return (
            <div className="">
                  <Dialog open={open} onOpenChange={setOpen}>
                        <div className="">
                              {user ? (
                                    <DialogTrigger asChild>
                                          <PrimaryBtn className="px-10 w-full py-2">
                                                Apply
                                          </PrimaryBtn>
                                    </DialogTrigger>
                              ) : (
                                    <PrimaryBtn
                                          onClick={() => {
                                                toast.error("Please login first"), navigation.push("/login")
                                          }}
                                          className="px-10 w-full py-2"
                                    >
                                          Apply
                                    </PrimaryBtn>
                              )}
                        </div>

                        <DialogContent className=" sm:w-[400px] md:w-[600px] lg:w-[744px]">
                              <DialogHeader>
                                    <DailogForm slug={slug} company={company} user={user} onClose={() => handleClose()} />
                              </DialogHeader>
                        </DialogContent>
                  </Dialog>
            </div>
      )
}

export default ApplyModal

import { Printer } from "lucide-react"
import { FileText } from "lucide-react"
import { Share2 } from "lucide-react"

const GovJobShareActions = () => {
    return (
        <ul className="flex items-center gap-2 absolute right-2 top-2">
    <li className="">
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-teal-500 text-white">
        <Share2 size={18} />
        </button>
    </li>

    <li className="">
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white">
        <FileText size={18} />
        </button>
    </li>

    <li className="">
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-500 text-white">
        <Printer size={18} />
        </button>
    </li>
</ul>
    )
}

export default GovJobShareActions
    
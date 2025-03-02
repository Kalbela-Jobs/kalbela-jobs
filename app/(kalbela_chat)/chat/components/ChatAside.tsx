import { Button } from "@/components/ui/button";
import ChatUsersList from "./ChatUsersList";
import { X } from "lucide-react";

interface ChatAsideProps {
    isSidebarOpen: boolean;
    closeSidebar: () => void;
}

const ChatAside = ({ isSidebarOpen, closeSidebar }: ChatAsideProps) => {
    return (
        <aside
            className={`md:relative chat-aside fixed left-0 top-0 h-screen overflow-y-auto md:w-[320px] w-64 bg-white p-4 border-r transition-transform duration-300 ease-in-out z-10 ${isSidebarOpen ? "md:translate-x-full translate-x-0" : "md:-translate-x-0 -translate-x-full"}`}
        >
            <header className="flex items-center justify-between pb-3">
                <h2 className="text-lg font-semibold uppercase">Kalbela Chats</h2>
                <Button className="!p-0 md:hidden flex !border-none !rounded-xl" onClick={closeSidebar} variant="outline" size="icon">
                    <X size={44} />
                </Button>
            </header>

            <ChatUsersList />
            {/* <div className=" bg-[white] p-2">
                asdfjasdhfiuh
            </div> */}
        </aside>
    );
};

export default ChatAside;

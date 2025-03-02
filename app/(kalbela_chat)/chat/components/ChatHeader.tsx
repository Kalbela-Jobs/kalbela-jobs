import { Menu, Video } from "lucide-react";

interface ChatHeaderProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (isOpen: boolean) => void;
}

const ChatHeader = ({ isSidebarOpen, setIsSidebarOpen }: ChatHeaderProps) => {
    return (
        <header className="flex items-center justify-between p-4 bg-white shadow">
            <button
                className="md:hidden"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                <Menu size={24} />
            </button>
            <h2 className="text-lg font-semibold">John Doe</h2>
            <Video size={24} />
        </header>
    );
};

export default ChatHeader;

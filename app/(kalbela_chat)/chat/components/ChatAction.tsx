import { Send } from "lucide-react";

interface ChatActionProps {
    input: string;
    setInput: (input: string) => void;
    sendMessage: () => void;
}

const ChatAction = ({ input, setInput, sendMessage }: ChatActionProps) => {
    return (
        <footer className="p-4 bg-white shadow flex items-center">
            <input
                type="text"
                className="flex-1 p-2 border rounded-lg outline-none"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button className="ml-2 p-2 bg-primary text-white rounded-lg" onClick={sendMessage}>
                <Send size={20} />
            </button>
        </footer>
    );
};

export default ChatAction;
interface Message {
    id: number;
    text: string;
    sender: "me" | "other";
}

const ChatBox = ({ messages }: { messages: Message[] }) => {
    return (
        <div className="chat-box flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
                <div
                    key={msg.id}
                    className={`max-w-xs p-3 rounded-lg ${msg.sender === "me" ? "ml-auto bg-primary text-white" : "bg-gray-300"
                        }`}
                >
                    {msg.text}
                </div>
            ))}
        </div>
    );
};

export default ChatBox;
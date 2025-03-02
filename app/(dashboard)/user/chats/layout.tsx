export default function ChatLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="message-layout">
            {children}
        </div>
    );
}

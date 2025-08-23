import { useState } from "react";
import { Loader2, SendHorizonal } from "lucide-react";
import { useChat } from "../context/ChatContext";

export default function ChatInput() {
    const [value, setValue] = useState("");
    const { sendMessage, sending } = useChat();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!value.trim()) return;
        console.log("Starts here");
        sendMessage(value);
        setValue("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center gap-3 p-4 border-t border-white/10 bg-zinc-900/90 backdrop-blur-md"
        >
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-white/5 text-gray-100 rounded-2xl px-4 py-3 outline-none placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
            />
            <button
                type="submit"
                disabled={sending}
                className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 rounded-2xl text-white transition shadow-lg"
            >
                {sending ? (
                    <Loader2 size={20} className="animate-spin" />
                ) : (
                    <SendHorizonal size={20} />
                )}
            </button>
        </form>
    );
}

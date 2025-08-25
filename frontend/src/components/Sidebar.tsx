import { BrainIcon, MessageSquare, Plus, Settings } from "lucide-react";
import { useChat } from "../context/ChatContext";

interface SidebarProps {
    collapsed: boolean;
}

export default function Sidebar({ collapsed }: SidebarProps) {
    const { chats, selectedChatId, selectChat, addChat, setShowSettings } =
        useChat();

    return (
        <aside
            className={`h-screen bg-gray-900/40 border-r border-white/10 flex flex-col p-4 space-y-6 transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
      `}
        >
            <h1
                className={`text-2xl mx-auto font-bold text-white tracking-tight transition-opacity duration-200 flex`}
            >
                🧠
                <text
                    className={`ml-4 font-thin ${collapsed ? "hidden" : "-1"}`}
                >
                    VectorMind
                </text>
            </h1>

            {/* Conversations */}
            <nav className="flex-1 flex flex-col gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-500/80 scrollbar-track-gray-900/30">
                {/* New Chat Button */}
                <div className="flex">
                    {!collapsed ? (
                        <h3 className="text-white font-medium ml-2 w-full my-auto">
                            Chats
                        </h3>
                    ) : (
                        ""
                    )}
                    <button
                        onClick={() => addChat()}
                        className={`${collapsed ? "mx-auto" : ""} flex items-center gap-3 px-2 py-2 rounded-xl border-white/10 border-2 text-gray-200 hover:bg-white/10 transition`}
                    >
                        <Plus size={14} />
                    </button>
                </div>

                {/* List of chats from context */}
                {chats.map((chat) => (
                    <button
                        key={chat.id}
                        onClick={() => selectChat(chat.id)}
                        className={`flex items-center gap-1 px-3 py-2 rounded-lg transition w-full text-left ${
                            selectedChatId === chat.id
                                ? "bg-indigo-600 text-white"
                                : "text-gray-200 hover:bg-white/10"
                        }`}
                    >
                        <MessageSquare
                            className={collapsed ? "" : "mr-2"}
                            size={24}
                        />
                        {!collapsed && <span>{chat.title}</span>}
                    </button>
                ))}
            </nav>

            {/* Footer */}
            <div className="space-y-2 mt-auto">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 text-gray-200 hover:bg-white/10 transition">
                    <BrainIcon size={18} />
                    {!collapsed && <span>Knowledge Base</span>}
                </button>
                <button
                    onClick={() => setShowSettings(true)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 text-gray-200 hover:bg-white/10 transition"
                >
                    <Settings size={18} />
                    {!collapsed && <span>Settings</span>}
                </button>
            </div>
        </aside>
    );
}

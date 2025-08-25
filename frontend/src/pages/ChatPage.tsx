import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components//Topbar";
import ChatApp from "../components/Chat";
import { useChat } from "../context/ChatContext";
import { Settings } from "../components/Settings";

export default function ChatLayout() {
    const { showSettings } = useChat();

    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="flex h-screen w-screen bg-gradient-to-br from-zinc-900/90 via-blue-950 to-zinc-900/60">
            {showSettings && <Settings />}
            <Sidebar collapsed={collapsed} />
            <div className="flex flex-col flex-1">
                <Topbar onToggleSidebar={() => setCollapsed((prev) => !prev)} />
                <div className="h-full overflow-hidden">
                    <ChatApp />
                </div>
            </div>
        </div>
    );
}

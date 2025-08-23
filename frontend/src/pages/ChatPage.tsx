import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components//Topbar";
import ChatApp from "../components/Chat";

export default function ChatLayout() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="flex h-screen w-screen bg-gradient-to-br from-emerald-900/90 via-blue-950 to-zinc-900/60">
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

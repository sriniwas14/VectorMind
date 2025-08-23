import { Menu } from "lucide-react";

interface TopbarProps {
    onToggleSidebar: () => void;
}

export default function Topbar({ onToggleSidebar }: TopbarProps) {
    return (
        <header className="h-16 flex items-center justify-between p-6 bg-zinc-900/90 backdrop-blur-md border-b border-white/10">
            <div className="flex items-center gap-3">
                <button
                    onClick={onToggleSidebar}
                    className="p-2 rounded-xl bg-white/5 text-gray-300 hover:bg-white/10"
                >
                    <Menu size={20} />
                </button>
                <h2 className="text-lg font-semibold text-gray-100">
                    Current Chat
                </h2>
            </div>
        </header>
    );
}

import { useEffect, useRef } from "react";

export default function ChatContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    const container = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (container.current)
            container.current.scrollTo({
                top: container.current.scrollHeight,
            });
    }, [children]);

    return (
        <div
            ref={container}
            className="flex overflow-y-scroll flex-col h-full bg-gradient-to-br from-gray-900 via-zinc-800/90 to-gray-700/90 text-gray-900/90 relative"
        >
            <div className="flex-1 overflow-y-none px-6 py-10 space-y-8 scrollbar-thin scrollbar-thumb-gray-800">
                {children}
            </div>
        </div>
    );
}

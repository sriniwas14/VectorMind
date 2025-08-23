import { motion } from "framer-motion";
import { MarkdownRenderer } from "./MarkdownRenderer";

interface MessageBubbleProps {
    role: "human" | "ai";
    text: string;
}

export default function MessageBubble({ role, text }: MessageBubbleProps) {
    const isUser = role === "human";
    return (
        <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`w-fit max-w-[75%] px-3 py-2 rounded-xl backdrop-blur-md text-base leading-relaxed relative
        ${
            isUser
                ? "ml-auto bg-gradient-to-r from-blue-500/90 to-indigo-600/90 text-white rounded-br-none"
                : "mr-auto text-gray-100 border border-transparent rounded-bl-none"
        }`}
        >
		{
			!isUser ?
		<MarkdownRenderer>
            {text}
		</MarkdownRenderer>
		: text

		}
            <span
                className={`absolute w-3 h-3 bottom-0 ${
                    isUser
                        ? "right-[-6px] bg-indigo-600"
                        : "left-[-6px] bg-white/10"
                } rounded-full blur-sm`}
            />
        </motion.div>
    );
}

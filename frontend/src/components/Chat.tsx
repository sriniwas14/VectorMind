import ChatContainer from "../components/ChatContainer";
import MessageBubble from "../components/MessageBubble";
import ChatInput from "../components/ChatInput";
import { useChat } from "../context/ChatContext";

export default function ChatApp() {
    const { chats, selectedChatId } = useChat();
    const currentChat = chats.find((c) => c.id === selectedChatId);

    return (
        <div className="flex flex-col h-full">
            <ChatContainer>
                {currentChat?.messages.map((m, i) => (
                    <MessageBubble key={i} role={m.msg_from} text={m.content} />
                ))}
            </ChatContainer>
            <ChatInput />
        </div>
    );
}

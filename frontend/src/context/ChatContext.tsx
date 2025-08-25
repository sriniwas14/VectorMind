import axios from "axios";
import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";

export interface Message {
    id: string;
    msg_from: "human" | "ai";
    content: string;
    createdAt: Date;
}

export interface Chat {
    id: string | null;
    title: string;
    createdAt: Date;
    lastUpdated: Date;
    messages: Message[];
}

interface ChatContextType {
    chats: Chat[];
    selectedChatId: string | null;
    selectChat: (id: string | null) => void;
    addMessages: (chatId: string, message: Message[]) => void;
    sendMessage: (message: string) => void;
    reloadChats: () => Promise<void>;
    addChat: () => Chat;
    sending: boolean;
    setSending: (v: boolean) => void;
    showSettings: boolean;
    setShowSettings: (v: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
    const ctx = useContext(ChatContext);
    if (!ctx) throw new Error("useChat must be used inside ChatProvider");
    return ctx;
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
    const [sending, setSending] = useState<boolean>(false);
    const [showSettings, setShowSettings] = useState<boolean>(false);

    const selectChat = (id: string | null) => setSelectedChatId(id);

    useEffect(() => {
        if (!selectedChatId) return;

        const selectedChat = chats.find((c) => c.id === selectedChatId);
        if (selectedChat?.messages.length == 0) {
            loadMessages(selectedChatId);
        }
    }, [selectedChatId]);

    const loadMessages = async (chatId: string) => {
        try {
            const res = await axios.get(
                `http://localhost:8000/chats/${chatId}/messages`,
            );
            addMessages(chatId, res.data.messages);
        } catch (error) {
            console.log(error);
        }
    };

    const addMessages = (chatId: string | null, messages: Message[]) => {
        setChats((oldChats) =>
            oldChats.map((c) =>
                c.id === chatId
                    ? { ...c, messages: [...c.messages, ...messages] }
                    : c,
            ),
        );
    };

    const sendMessage = async (msg: string) => {
        try {
            setSending(true);
            addMessages(selectedChatId, [
                {
                    msg_from: "human",
                    content: msg,
                    id: new Date().getTime().toString(),
                    createdAt: new Date(),
                },
            ]);
            let url = `http://localhost:8000/chats/${selectedChatId}`;
            if (!selectedChatId) url = `http://localhost:8000/chats`;
            const res = await axios.post(url, { message: msg });

            if (!selectedChatId) {
                setSelectedChatId(res.data.chat_id);
                addMessages(selectedChatId, [
                    {
                        msg_from: "ai",
                        content: res.data.message,
                        id: res.data.chat_id,
                        createdAt: new Date(),
                    },
                ]);

                setChats((oldChats) =>
                    oldChats.map((c) => {
                        if (c.id === null) {
                            c.id = res.data.chat_id;
                            c.messages = [];
                            c.title = res.data.title;
                        }

                        return c;
                    }),
                );
            } else {
                addMessages(selectedChatId, [
                    {
                        msg_from: "ai",
                        content: res.data.message,
                        id: new Date().getTime().toString(),
                        createdAt: new Date(),
                    },
                ]);
            }

            setSending(false);
        } catch (error) {
            setSending(false);
            console.error(error);
        }
    };

    const reloadChats = async () => {
        try {
            const res = await axios.get("http://localhost:8000/chats");

            const data: {
                chats: {
                    id: string;
                    title: string;
                    created_at: string;
                    last_updated: string;
                }[];
            } = res.data;

            const mapped: Chat[] = data.chats.map((c) => ({
                id: c.id,
                title: c.title,
                createdAt: new Date(c.created_at),
                lastUpdated: new Date(c.last_updated),
                messages: [], // initially empty, can be loaded separately
            }));

            setChats(mapped);

            // Select first chat if none selected
            if (!selectedChatId && mapped.length > 0)
                setSelectedChatId(mapped[0].id);
        } catch (err) {
            console.error("Failed to load chats:", err);
        }
    };

    useEffect(() => {
        reloadChats();
    }, []);

    const addChat = () => {
        const newChat: Chat = {
            id: null,
            title: `New Chat`,
            createdAt: new Date(),
            lastUpdated: new Date(),
            messages: [],
        };

        setChats((prev) => [newChat, ...prev]);
        setSelectedChatId(null);
        return newChat;
    };

    return (
        <ChatContext.Provider
            value={{
                chats,
                selectedChatId,
                selectChat,
                sendMessage,
                addMessages,
                reloadChats,
                addChat,
                sending,
                setSending,
                showSettings,
                setShowSettings,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

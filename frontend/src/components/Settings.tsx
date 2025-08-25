import { useState } from "react";
import { useChat } from "../context/ChatContext";
import Modal from "./Modal";
import Select from "./Select";

const categories = ["General", "Chat Service"];

export const Settings = () => {
    const { setShowSettings } = useChat();
    const [activeCat, setActiveCat] = useState(categories[0]);
    const [modelProvider, setModelProvider] = useState("ollama");

    return (
        <Modal title="Settings" onClose={() => setShowSettings(false)}>
            <div>
                <div className="bg-zinc-800 rounded-lg overflow-none p-1 flex w-fit">
                    {categories.map((c) => (
                        <div
                            onClick={() => setActiveCat(c)}
                            className={`${activeCat === c && "bg-blue-500"} transition-all px-6 py-1 rounded-lg cursor-pointer`}
                        >
                            {c}
                        </div>
                    ))}
                </div>
                <div className="w-3/4">
                    <Select
                        onChange={setModelProvider}
                        label="Model Provider"
                        value={modelProvider}
                        options={[
                            { value: "ollama", label: "Ollama" },
                            { value: "openai", label: "OpenAI" },
                            { value: "groq", label: "Groq" },
                        ]}
                    />
                </div>
            </div>
        </Modal>
    );
};

import { X } from "lucide-react";
import type { ReactNode } from "react";

export default function Modal({
    children,
    title,
    onClose,
}: {
    children: ReactNode;
    title: string;
    onClose: () => void;
}) {
    return (
        <div className="bg-black/50 inset-0 fixed z-10 flex">
            <div className="bg-zinc-900 w-2/3 p-4 rounded-lg m-auto text-white">
                <div className="flex mb-4">
                    <h1 className="text-xl w-full">{title}</h1>
                    <X onClick={onClose} />
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
}

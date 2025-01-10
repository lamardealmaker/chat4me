import { Button } from "@/components/ui/button";
import { FaCaretDown } from "react-icons/fa";
import { useToggle } from "react-use";
import { cn } from "@/lib/utils";

interface WorkspaceSectionProps {
    children: React.ReactNode;
    label: string;
    hint: string;
    onNew: () => void;
}

export const WorkspaceSection: React.FC<WorkspaceSectionProps> = ({ children, label, hint, onNew }) => {
    const [on, toggle] = useToggle(true);

    return <div className="flex flex-col mt-3 px-2">
        <div className="flex items-center px-3.5 group">
            <Button variant="transparent" className="p-0.5 text-sm text-[#e0ffe0] shrink-0 size-6" onClick={toggle}>
                <FaCaretDown className={cn("size-2.5", on && "-rotate-90")}  />
            </Button>
            <Button
            variant="transparent"
            size="sm"
            className="group px-1.5 text-sm text-[#e0ffe0] h-[28px] justify-start overflow-hidden items-center"
            >
                <span className="truncate">{label}</span>
            </Button>
        </div>
        {on && children}
    </div>
}
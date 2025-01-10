"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const COMMON_EMOJIS = [
  { code: "thumbs_up", emoji: "👍" },
  { code: "heart", emoji: "❤️" },
  { code: "smile", emoji: "😊" },
  { code: "party", emoji: "🎉" },
  { code: "fire", emoji: "🔥" },
  { code: "eyes", emoji: "👀" },
  { code: "100", emoji: "💯" },
  { code: "sparkles", emoji: "✨" },
  { code: "raised_hands", emoji: "🙌" },
  { code: "clap", emoji: "👏" },
];

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  trigger: React.ReactNode;
}

export function EmojiPicker({ onEmojiSelect, trigger }: EmojiPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {trigger}
      </PopoverTrigger>
      <PopoverContent className="w-fit p-2" side="top">
        <div className="flex flex-wrap gap-2">
          {COMMON_EMOJIS.map(({ code, emoji }) => (
            <button
              key={code}
              onClick={() => onEmojiSelect(code)}
              className="hover:scale-125 transition-transform p-1"
            >
              {emoji}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
} 
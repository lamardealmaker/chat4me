"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useCallback, useEffect, useState } from "react";
import { Search, Loader2, MessageSquare, Image, Hash, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { api } from "../../../convex/_generated/api";
import { useAction } from "convex/react";
import { Id } from "../../../convex/_generated/dataModel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { debounce } from "lodash";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workspaceId: Id<"workspaces">;
}

interface SearchResult {
  _id: Id<"messages">;
  text: string;
  userName: string;
  channelName: string;
  channelId: Id<"channels">;
  createdAt: number;
  format?: "text" | "dalle" | "markdown";
  _score: number;
  isAI?: boolean;
  relevanceExplanation?: string;
}

export function SearchDialog({ open, onOpenChange, workspaceId }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cursor, setCursor] = useState<string>();
  const [error, setError] = useState<string>();
  const searchMessages = useAction(api.embeddings.searchMessages);
  const router = useRouter();

  const handleSearch = useCallback(async () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(undefined);
    try {
      const response = await searchMessages({
        workspaceId,
        query: query.trim(),
        cursor,
        limit: 10
      });
      
      setResults(response.results);
      setCursor(response.nextCursor);
    } catch (error) {
      console.error("Search failed:", error);
      setError("Failed to perform search. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [query, workspaceId, cursor, searchMessages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleClose = useCallback(() => {
    onOpenChange(false);
    setQuery("");
    setResults([]);
    setCursor(undefined);
  }, [onOpenChange]);

  const handleResultClick = (result: SearchResult) => {
    onOpenChange(false);
    router.push(`/workspace/${workspaceId}/channel/${result.channelId}?messageId=${result._id}`);
  };

  const highlightText = (text: string, searchQuery: string) => {
    if (!searchQuery.trim()) return text;
    
    const regex = new RegExp(`(${searchQuery.trim()})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, i) => 
      regex.test(part) ? (
        <span key={i} className="bg-emerald-200 text-emerald-950 px-1 rounded font-medium">{part}</span>
      ) : part
    );
  };

  const truncateText = (text: string, maxLength: number = 280) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[850px] p-0 gap-0 bg-white shadow-xl">
        <div className="flex flex-col w-full">
          <div className="pt-6 px-4 pb-3">
            <DialogTitle className="text-lg font-semibold text-emerald-900 mb-3">
              Search Messages
            </DialogTitle>
            <div className="flex items-center gap-3">
              <div className="relative flex-1 group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Search className="h-4 w-4 text-emerald-400" />
                </div>
                <Input
                  placeholder="Search messages..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="rounded-full bg-gray-100 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 pl-10 pr-4"
                  autoFocus
                />
              </div>
              <Button 
                onClick={handleSearch}
                disabled={isLoading || !query.trim()}
                className="bg-emerald-600 hover:bg-emerald-700 shrink-0"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Search"
                )}
              </Button>
            </div>
          </div>
          <div className="h-px bg-emerald-200" />
          <div className="p-2 max-h-[70vh] overflow-y-auto custom-scrollbar bg-white">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <div className="relative">
                  <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
                  <div className="absolute inset-0 animate-pulse opacity-50">
                    <Search className="h-8 w-8 text-emerald-400" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-emerald-900">
                    Searching with AI...
                  </p>
                  <p className="text-xs text-emerald-600">
                    This may take a moment as we analyze the meaning of your search
                  </p>
                </div>
              </div>
            ) : results.length > 0 ? (
              <div className="flex flex-col gap-2 px-2">
                {results.map((result) => (
                  <div
                    key={result._id}
                    onClick={() => handleResultClick(result)}
                    className="group flex flex-col gap-1.5 p-4 rounded-lg hover:bg-emerald-50 border border-emerald-100 hover:border-emerald-200 cursor-pointer transition-all duration-200"
                  >
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold text-emerald-950">{result.userName}</span>
                      {result.isAI && (
                        <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center gap-1 font-medium">
                          <span>🤖</span>
                          <span>AI</span>
                        </span>
                      )}
                      {result._score > 0.8 && (
                        <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center gap-1 font-medium">
                          <span>✨</span>
                          <span>High relevance</span>
                        </span>
                      )}
                      <span className="text-emerald-700">in</span>
                      <span className="font-medium text-emerald-800 flex items-center gap-1">
                        {result.channelName.startsWith("@") ? (
                          <>
                            <Circle className="h-2 w-2" />
                            {result.channelName}
                          </>
                        ) : (
                          <>
                            <Hash className="h-3 w-3" />
                            {result.channelName}
                          </>
                        )}
                      </span>
                      <span className="ml-auto text-xs text-emerald-600 group-hover:text-emerald-700">
                        {format(result.createdAt, "MMM d, yyyy 'at' h:mm a")}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      {result.format === "dalle" ? (
                        <Image className="h-4 w-4 mt-1 shrink-0 text-emerald-600" />
                      ) : (
                        <MessageSquare className="h-4 w-4 mt-1 shrink-0 text-emerald-600" />
                      )}
                      <p className="text-sm text-emerald-950 line-clamp-3 leading-relaxed">
                        {highlightText(truncateText(result.text), query)}
                      </p>
                    </div>
                    {result.text.length > 280 && (
                      <div className="mt-1">
                        <span className="text-xs text-emerald-600 group-hover:text-emerald-700 font-medium">
                          Click to view full message
                        </span>
                      </div>
                    )}
                    {result.relevanceExplanation && (
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className="size-1 bg-emerald-400 rounded-full"></span>
                        <span className="text-xs text-emerald-600 group-hover:text-emerald-700 font-medium">
                          {result.relevanceExplanation}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : query && !isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="p-3 bg-emerald-100 rounded-full mb-3">
                  <Search className="h-6 w-6 text-emerald-700" />
                </div>
                <p className="text-sm font-medium text-emerald-900">
                  No messages found
                </p>
                <p className="text-xs text-emerald-600 mt-1">
                  Try different keywords or check your spelling
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="p-3 bg-emerald-100 rounded-full mb-3">
                  <Search className="h-6 w-6 text-emerald-700" />
                </div>
                <p className="text-sm font-medium text-emerald-900">
                  Search messages in this workspace
                </p>
                <p className="text-xs text-emerald-600 mt-1">
                  Enter your search and press Enter
                </p>
              </div>
            )}
          </div>
          {cursor && results.length > 0 && (
            <div className="p-3 border-t border-emerald-200 bg-white">
              <Button
                variant="outline"
                className="w-full border-emerald-200 text-emerald-800 hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-300 font-medium"
                onClick={handleSearch}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Loading more results...
                  </>
                ) : (
                  "Load more results"
                )}
              </Button>
            </div>
          )}
          {error && (
            <div className="flex items-center justify-center py-4 px-3 bg-red-50 border-t border-red-200">
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

const globalStyles = `
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #10B981 #F0FDF4;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #F0FDF4;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #10B981;
  border-radius: 3px;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
`; 
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCallback, useEffect, useState } from "react";
import { Loader2, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { api } from "../../../convex/_generated/api";
import { useAction } from "convex/react";
import { Id } from "../../../convex/_generated/dataModel";
import ReactMarkdown from 'react-markdown';
import { Button } from "@/components/ui/button";

interface SummaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  summaryType: "channel" | "dm" | "thread";
  channelId: string;
  threadId?: string;
}

const loadingSteps = {
  channel: ["Fetching recent messages...", "Analyzing channel activity...", "Generating summary..."],
  dm: ["Loading conversation history...", "Analyzing chat patterns...", "Generating summary..."],
  thread: ["Loading thread messages...", "Analyzing discussion context...", "Generating summary..."]
};

export const SummaryDialog = ({ 
  open, 
  onOpenChange, 
  summaryType,
  channelId,
  threadId 
}: SummaryDialogProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [summary, setSummary] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const generateSummary = useAction(api.ai.generateSummary);

  const steps = loadingSteps[summaryType];

  const handleCopy = useCallback(() => {
    if (summary) {
      navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [summary]);

  const handleGenerate = useCallback(async () => {
    if (!open) return;
    
    setSummary(null);
    setCurrentStep(0);

    try {
      // Simulate step progression
      const stepDuration = 1000;
      for (let i = 1; i < steps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, stepDuration));
        setCurrentStep(i);
      }

      console.log('Calling generateSummary with:', {
        channelId,
        threadId,
        type: summaryType
      });

      const result = await generateSummary({
        channelId: channelId as Id<"channels">,
        threadId: threadId as Id<"messages"> | undefined,
        type: summaryType
      });

      if (!result) {
        throw new Error("No summary generated");
      }

      console.log('Summary result:', result);
      setSummary(result);
    } catch (error) {
      console.error("Failed to generate summary:", error);
      if (error instanceof Error) {
        setSummary(`Error: ${error.message}. Please try again.`);
      } else {
        setSummary("Failed to generate summary. Please try again.");
      }
    }
  }, [open, channelId, threadId, summaryType, generateSummary, steps]);

  useEffect(() => {
    if (open) {
      handleGenerate();
    } else {
      setSummary(null);
      setCurrentStep(0);
    }
  }, [open, handleGenerate]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>
            {summaryType === "channel" && "Channel Summary"}
            {summaryType === "dm" && "Conversation Summary"}
            {summaryType === "thread" && "Thread Summary"}
          </DialogTitle>
          {summary && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="ml-2">{copied ? 'Copied!' : 'Copy'}</span>
            </Button>
          )}
        </DialogHeader>

        <div className="mt-4">
          {!summary ? (
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className={cn(
                    "flex items-center gap-3 text-sm transition-opacity duration-200",
                    index > currentStep ? "opacity-40" : "opacity-100"
                  )}
                >
                  {index === currentStep ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <div className="h-4 w-4" />
                  )}
                  {step}
                </div>
              ))}
            </div>
          ) : (
            <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              <ReactMarkdown 
                className="prose prose-emerald prose-sm max-w-none"
                components={{
                  h1: ({node, ...props}) => <h1 className="text-lg font-bold text-emerald-950 mb-2" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-base font-semibold text-emerald-900 mb-2" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-sm font-medium text-emerald-900 mb-1" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-4 space-y-1 mb-3" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-4 space-y-1 mb-3" {...props} />,
                  li: ({node, ...props}) => <li className="text-emerald-900" {...props} />,
                  p: ({node, ...props}) => <p className="text-emerald-900 mb-3 leading-relaxed" {...props} />,
                  strong: ({node, ...props}) => <strong className="font-semibold text-emerald-950" {...props} />,
                  blockquote: ({node, ...props}) => (
                    <blockquote className="border-l-2 border-emerald-200 pl-4 italic text-emerald-900 my-2" {...props} />
                  ),
                }}
              >
                {summary}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}; 

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
`; 
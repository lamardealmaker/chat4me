"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCallback, useEffect, useState, useRef } from "react";
import { Loader2, Copy, Check, Play, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import { api } from "../../../convex/_generated/api";
import { useAction } from "convex/react";
import { Id } from "../../../convex/_generated/dataModel";
import ReactMarkdown from 'react-markdown';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SummaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  summaryType: "channel" | "dm" | "thread";
  channelId: string;
  threadId?: string;
}

const loadingSteps = {
  channel: [
    "Fetching recent messages...",
    "Analyzing channel activity...",
    "Generating summary...",
    "Creating audio version..."
  ],
  dm: [
    "Loading conversation history...",
    "Analyzing chat patterns...",
    "Generating summary...",
    "Creating audio version..."
  ],
  thread: [
    "Loading thread messages...",
    "Analyzing discussion context...",
    "Generating summary...",
    "Creating audio version..."
  ]
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
  const [audioBase64, setAudioBase64] = useState<string | null>(null);
  const [voiceName, setVoiceName] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const generateSummary = useAction(api.ai.generateSummary);
  const generateSpeech = useAction(api.actions.generateSpeech.default);

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
    setAudioBase64(null);
    setVoiceName(null);
    setAudioError(null);
    setCurrentStep(0);
    setIsGeneratingAudio(false);

    try {
      // Simulate step progression for first three steps
      const stepDuration = 1000;
      for (let i = 1; i < steps.length - 1; i++) {
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

      // Set last step for audio generation
      setCurrentStep(steps.length - 1);

      // Generate audio
      try {
        setIsGeneratingAudio(true);
        const { audio, voiceName: voice } = await generateSpeech({ text: result });
        setAudioBase64(audio);
        setVoiceName(voice);
        // Only show summary after both text and audio are ready
        setSummary(result);
      } catch (error) {
        console.error("Failed to generate audio:", error);
        setAudioError("Failed to generate audio");
        // Still show summary even if audio fails
        setSummary(result);
      } finally {
        setIsGeneratingAudio(false);
      }
    } catch (error) {
      console.error("Failed to generate summary:", error);
      if (error instanceof Error) {
        setSummary(`Error: ${error.message}. Please try again.`);
      } else {
        setSummary("Failed to generate summary. Please try again.");
      }
    }
  }, [open, channelId, threadId, summaryType, generateSummary, generateSpeech, steps]);

  const handlePlayPause = useCallback(() => {
    if (!audioRef.current || !audioBase64) return;

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset playback position
      setIsPlaying(false);
    } else {
      // Always set the source before playing
      audioRef.current.src = `data:audio/mpeg;base64,${audioBase64}`;
      audioRef.current.load(); // Ensure audio is loaded
      audioRef.current.play().catch(error => {
        console.error("Failed to play audio:", error);
        setAudioError("Failed to play audio");
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  }, [audioBase64, isPlaying]);

  // Set up audio event listeners
  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;

      // Reset playing state when audio ends
      audio.onended = () => {
        setIsPlaying(false);
        audio.currentTime = 0;
      };

      // Handle any errors during playback
      audio.onerror = () => {
        console.error("Audio playback error");
        setAudioError("Audio playback failed");
        setIsPlaying(false);
      };

      // Clean up event listeners
      return () => {
        audio.onended = null;
        audio.onerror = null;
      };
    }
  }, []);

  // Initialize audio when source changes
  useEffect(() => {
    if (audioRef.current && audioBase64) {
      audioRef.current.src = `data:audio/mpeg;base64,${audioBase64}`;
      audioRef.current.load();
    }
  }, [audioBase64]);

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
        <DialogHeader className="flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between">
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
          </div>

          {summary && (
            <>
              <div className="flex items-center gap-2 w-full">
                {isGeneratingAudio ? (
                  <div className="flex items-center gap-2 text-emerald-700">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Generating audio...</span>
                  </div>
                ) : audioBase64 ? (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handlePlayPause}
                        className="text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50"
                      >
                        {isPlaying ? (
                          <Square className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                        <span className="ml-2">{isPlaying ? 'Stop' : 'Play'} Summary</span>
                      </Button>
                      <span className="text-sm text-emerald-700">• By: {voiceName}</span>
                    </div>
                  </div>
                ) : audioError ? (
                  <div className="text-red-500 text-sm">Audio failed</div>
                ) : null}
              </div>
              <Separator className="bg-emerald-100" />
            </>
          )}
        </DialogHeader>

        <div className="mt-4">
          {audioError && (
            <div className="text-red-500 text-sm mb-2">{audioError}</div>
          )}
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
        <audio ref={audioRef} className="hidden" />
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
"use client";

import { api } from "../../../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

export default function TestPage() {
  const testAI = useMutation(api.ai.testAIResponse);
  const debugResults = useQuery(api.ai.debugFullFlow);

  const formatData = (data: any) => {
    try {
      return JSON.stringify(data, null, 2);
    } catch (e) {
      return "Error formatting data";
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">AI Test Page</h1>
      
      <button 
        onClick={() => testAI({})} 
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Run AI Test
      </button>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Tasks</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
            {debugResults?.tasks ? formatData(debugResults.tasks) : "No tasks"}
          </pre>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Messages</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
            {debugResults?.messages ? formatData(debugResults.messages) : "No messages"}
          </pre>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Status</h2>
          <div className="bg-gray-100 p-4 rounded">
            {debugResults?.status || "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
} 
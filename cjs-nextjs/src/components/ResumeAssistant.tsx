"use client";

import { useState } from "react";
import { config } from '@/config'; // Import structured resume data
import { Bot } from 'lucide-react';

const ResumeAssistant = () => {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || ""; // Secure API key access

  const systemMessage = {
    role: "system",
    content: `You are an AI assistant that answers questions based on Chris Stevens' resume. Here is the resume data: ${JSON.stringify(config)}`
  };

  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm an AI assistant created by Chris. Feel free to ask me anything about him but go easy because he had to pay £5 for the API token." }
  ]); // Initial message
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4-1106-preview",
          messages: [systemMessage, ...newMessages], // System message included but not displayed
          max_tokens: 200
        })
      });

      const data = await response.json();
      const botMessage = { role: "assistant", content: data.choices[0].message.content.replace(/\bresume\b/gi, "CV") };
      setMessages([...newMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
    setLoading(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="max-w-md p-4 border rounded-lg shadow-lg bg-white text-black">
      <div className="h-64 overflow-y-auto p-2 border-b">
        {messages.map((msg, index) => (
          <div key={index} className={`my-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
            <p className={`${msg.role === "user" ? "bg-blue-200" : "bg-gray-200"} p-2 rounded-lg inline-block`}>{msg.content}</p>
          </div>
        ))}
      </div>
      <div className="mt-2 flex">
        <input
          className="flex-1 border p-2 rounded-l-lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask a question..."
        />
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg disabled:opacity-50"
          onClick={sendMessage} 
          disabled={loading}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
      <div className="mt-2 flex items-center">
        <Bot className="w-4 h-4 mr-1" />
        <p>Stuck for ideas? Try 'What motivates him?'</p>
      </div>
    </div>
  );
};

export default ResumeAssistant;
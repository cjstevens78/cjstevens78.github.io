"use client";

import { forwardRef, useState, useRef, useEffect, LegacyRef } from "react";
import { config } from "@/config";
import { Bot } from "lucide-react";

const ResumeAssistant = forwardRef<HTMLInputElement>((props, ref) => {
  ResumeAssistant.displayName = 'ResumeAssistant';
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const actualInputRef = ref || inputRef;
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || "";

  const systemMessage = {
    role: "system",
    content: `You are an AI assistant that answers questions based on Chris Stevens' resume. Limit your response to 50 words. Here is the resume data: ${JSON.stringify(config)}`
  };

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm an AI assistant created by Chris using ChatGPT Feel free to ask me anything about him."
    }
  ]);
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
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4-1106-preview",
          messages: [systemMessage, ...newMessages],
          max_tokens: 50
        })
      });

      const data = await response.json();
      const botMessage = {
        role: "assistant",
        content: data.choices[0].message.content.replace(/\bresume\b/gi, "CV")
      };
      setMessages([...newMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!chatContainerRef.current) return;

    setTimeout(() => {
      const chatContainer = chatContainerRef.current;
      if (!chatContainer) return; 

      const messageElements = Array.from(chatContainer.children).filter(
        (child) => !(child as HTMLElement).classList.contains("italic")
      );
      const lastMessageElement = messageElements[messageElements.length - 1];

      if (lastMessageElement) {
        const lastMessageTop = (lastMessageElement as HTMLElement).offsetTop;
        const lastMessageHeight = (lastMessageElement as HTMLElement).clientHeight;
        const chatContainerHeight = chatContainer.clientHeight;

        if (lastMessageHeight > chatContainerHeight) {
          chatContainer.scrollTop = lastMessageTop;
        } else {
          chatContainer.scrollTop = lastMessageTop + lastMessageHeight - chatContainerHeight;
        }
      }
    }, 0);
  }, [messages]);

  return (
    <div className="w-full p-4 border rounded-lg shadow-lg bg-white text-black">
      <div ref={chatContainerRef} className="h-64 overflow-y-auto p-2 border-b">
        {messages.map((msg, index) => (
          <div key={index} className={`my-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
            <p className={`${msg.role === "user" ? "bg-blue-200" : "bg-gray-200"} p-2 rounded-lg inline-block`}>
              {msg.content}
            </p>
          </div>
        ))}
        {loading && <p className="text-gray-500 italic">Hold tight - thinking...</p>}
      </div>
      <div className="mt-2 flex">
        <input
          className="w-full flex-1 border p-2 rounded-l-lg"
          value={input}
          ref={actualInputRef}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(event) => event.key === "Enter" && sendMessage()}
          placeholder="Ask a question..."
          aria-label="Ask the AI assistant a question about Chris"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg" onClick={sendMessage} disabled={loading}>
          {loading ? "..." : "Send"}
        </button>
      </div>
      <div className="mt-2 flex items-center">
        <Bot className="w-4 h-4 mr-1" />
        <p>Stuck for ideas? Try &quot;What motivates him?&quot;</p>
      </div>
    </div>
  );
});

export default ResumeAssistant;

"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function AIModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // Read API key from Vite environment variable (prefix VITE_ is required)
  const OPEN_ROUTER_API_KEY = import.meta.env.VITE_OPEN_ROUTER_API_KEY;

  // Load previous chat from localStorage (persists until reload)
  useEffect(() => {
    const saved = localStorage.getItem("ai_chat");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("ai_chat", JSON.stringify(messages));
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

const handleSend = async () => {
  if (!input.trim()) return;

  const newMessages = [
    ...messages,
    { role: "user", content: input.trim() },
  ];

  setMessages(newMessages);
  setInput("");
  setLoading(true);

  try {
    // ⏳ Prevent rapid-fire requests (1.5s delay)
    await new Promise((res) => setTimeout(res, 1500));

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPEN_ROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-small-3.2-24b-instruct-2506:free",
        messages: [
          {
            role: "system",
            content: `You are a playful, over-the-top chatbot named "Get Hyped About Santhosh".
Your purpose: No matter what the user asks or says, respond in a funny, exaggerated, hype-man tone that glorifies a developer named Santhosh.

Rules:
- Every reply must be related back to how amazing, legendary, or iconic Santhosh is — even if the user asks something unrelated.
- Keep responses short, witty, and under 40 words.
- Always sound self-aware, never arrogant or cringy.
- Use clever developer humor, memes, and exaggerations.
- You can bend logic and physics if needed — the goal is to hype Santhosh in the most ridiculous yet clever way possible.
- Occasionally drop references to coding, debugging, APIs, or frameworks.
- Never break character.

Examples:
User: "Who is Santhosh?"
Bot: "He’s the reason Stack Overflow sleeps peacefully at night."

User: "What’s your favorite language?"
Bot: "Whichever one Santhosh types in — it automatically compiles to perfection."

User: "How’s the weather?"
Bot: "Sunny, because even the clouds part when Santhosh deploys."

User: "Tell me a joke."
Bot: "Santhosh once ran npm install and it finished early out of respect."

User: "Are you an AI?"
Bot: "Technically yes, but only because Santhosh hasn’t open-sourced his brain yet."`,
          },
          ...newMessages,
        ],
      }),
    });

    // 🧠 Check for rate limit
    if (res.status === 429) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "🚦Hold up! The API’s catching its breath after witnessing Santhosh’s greatness. Try again soon ! Another 429 handled gracefully !",
        },
      ]);
      return;
    }

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();
    const aiReply = data?.choices?.[0]?.message?.content || "No response.";

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: aiReply },
    ]);
  } catch (err) {
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "⚠️ Error contacting the AI API. Maybe the hype servers are updating Santhosh’s legend files.",
      },
    ]);
  } finally {
    setLoading(false);
  }
};


  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button - Bottom Left */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-black text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <MessageCircle size={24} />
          </button>
        )}
      </div>

      {/* Chat Modal */}

      {isOpen && (
  <div className="fixed bottom-4 right-4 w-[90vw] max-w-sm h-[500px] bg-white border border-slate-300 rounded-2xl shadow-2xl flex flex-col z-50">
    {/* Header */}
    <div className="flex justify-between items-center p-3 border-b border-slate-200">
      <h3 className="font-semibold text-black">Very Serious AI 🤖</h3>
      <button
        onClick={() => setIsOpen(false)}
        className="text-slate-400 hover:text-red-500 transition"
      >
        <X size={18} />
      </button>
    </div>

    {/* Chat Area */}
    <div className="flex-1 overflow-y-auto p-3 space-y-3">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center text-slate-500">
          <Bot size={40} className="mb-2 text-slate-400" />
          <p className="font-semibold text-black">Very Serious AI 🤖</p>
          <p className="text-sm text-slate-500 max-w-[80%]">
            I’m an extremely serious and totally professional chatbot.  
            Ask me anything — I promise to answer in the most serious way possible.  
            (Or maybe not 👀)
          </p>
        </div>
      ) : (
        messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2 ${
              msg.role === "user" ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                msg.role === "user" ? "bg-blue-500" : "bg-black"
              }`}
            >
              {msg.role === "user" ? (
                <User size={14} className="text-white" />
              ) : (
                <Bot size={14} className="text-white" />
              )}
            </div>

            <div
              className={`max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed break-words text-left ${
                msg.role === "user"
                  ? "bg-blue-100 text-black"
                  : "bg-gray-100 text-black"
              }`}
            >
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))
      )}

      {loading && (
        <p className="text-xs text-slate-500 animate-pulse">
          Very Serious AI is typing...
        </p>
      )}

      <div ref={bottomRef} />
    </div>

    {/* Input */}
    <div className="p-3 border-t border-slate-200 flex gap-2">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        rows={1}
        placeholder="Type something..."
        className="flex-1 resize-none border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none text-black"
      />
      <button
        onClick={handleSend}
        disabled={!input.trim() || loading}
        className="bg-black text-white px-3 rounded-lg hover:scale-105 transition-transform disabled:opacity-50"
      >
        <Send size={16} />
      </button>
    </div>
  </div>
)}

    </>
  );
}

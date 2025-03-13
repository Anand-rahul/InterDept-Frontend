"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  HelpCircle,
  Maximize2,
  Minimize2,
  MessageSquare,
} from "lucide-react";
import { FAQ } from "@/models/solution";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatBubbleProps {
  title?: string;
  faqs?: FAQ[];
  solutionId: string;
}

interface ChatResponse {
  response: string;
  guid?: string;
}

const title = "Chat to know more";
export function ChatBubble({
  title = "Chat to know more",
  faqs = [],
  solutionId,
}: ChatBubbleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "faq">(
    faqs.length > 0 ? "faq" : "chat"
  );
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! How can I help you with this solution today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationGuid, setConversationGuid] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasFaqs = faqs.length > 0;

  const toggleChat = () => {
    setIsOpen(!isOpen);
    // Reset expanded state when closing
    if (isOpen && isExpanded) {
      setIsExpanded(false);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Build URL with query parameters instead of using request body
      let url = `/api/solutions/${solutionId}/chat?query=${encodeURIComponent(
        userMessage.text
      )}`;

      // Add guid parameter if available
      if (conversationGuid) {
        url += `&guid=${encodeURIComponent(conversationGuid)}`;
      }

      // Send message to API with params in URL
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Empty body since we're using URL parameters
        body: JSON.stringify({}),
      });

      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to get response from server");
      }

      const data: ChatResponse = await response.json();

      // Save conversation GUID for future messages
      if (data.guid) {
        setConversationGuid(data.guid);
      }

      // Add bot response
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text:
          data.response ||
          "Sorry, I couldn't process your request at this time.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);

      // Add error message
      const errorMessage: Message = {
        id: `bot-error-${Date.now()}`,
        text: "Sorry, there was an error processing your request. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && activeTab === "chat" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, activeTab]);

  // Prevent body scrolling when chat is expanded
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isExpanded]);

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-5 right-5 p-3 rounded-full shadow-md z-50 transition-all duration-300 ${
          isOpen ? "bg-gray-700" : "bg-blue-600"
        } text-white ${isExpanded ? "hidden" : "block"}`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div
          className={`
            fixed bg-white rounded-lg shadow-md z-40 flex flex-col overflow-hidden 
            transition-all duration-300 ease-in-out border border-gray-200
            ${
              isExpanded
                ? "inset-0 m-0 rounded-none"
                : "bottom-20 right-5 w-80 sm:w-120 max-h-[70vh]"
            }
          `}
        >
          {/* Header */}
          <div className="bg-blue-600 hover:bg-blue-700 border-b border-gray-200 px-4 py-3 flex justify-between items-center">
            <h3 className="font-medium text-white text-sm">{title}</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleExpand}
                className="text-white hover:text-black"
                aria-label={isExpanded ? "Minimize chat" : "Expand chat"}
              >
                {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
              <button
                onClick={toggleChat}
                className="text-white hover:text-black"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Tabs */}
          {hasFaqs && (
            <div className="flex border-b border-gray-200">
              <button
                className={`flex-1 py-2 px-4 text-xs font-medium ${
                  activeTab === "chat"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-600 hover:text-blue-500"
                }`}
                onClick={() => setActiveTab("chat")}
              >
                <MessageSquare size={14} className="inline mr-1" /> Chat
              </button>
              <button
                className={`flex-1 py-2 px-4 text-xs font-medium ${
                  activeTab === "faq"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-600 hover:text-blue-500"
                }`}
                onClick={() => setActiveTab("faq")}
              >
                <HelpCircle size={14} className="inline mr-1" /> FAQs
              </button>
            </div>
          )}

          {/* Content Area */}
          <div
            className={`flex-1 overflow-y-auto p-3 bg-white ${
              isExpanded ? "h-[calc(100vh-120px)]" : ""
            }`}
          >
            {activeTab === "chat" ? (
              // Chat Messages
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-3 py-2 ${
                        message.sender === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <div className="text-sm markdown-content">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {message.text}
                        </ReactMarkdown>
                      </div>
                      <p className="text-[10px] opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            ) : (
              // FAQ Section
              <div className="space-y-2">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-md p-3 text-xs"
                  >
                    <div className="font-medium text-gray-800 mb-1">
                      {faq.question}
                    </div>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Input Area (only shown in chat tab) */}
          {activeTab === "chat" && (
            <div className="p-2 border-t border-gray-200 bg-white">
              <div className="flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-200 rounded-l-md py-1.5 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-blue-600 text-white rounded-r-md px-3 py-1.5 hover:bg-blue-700 disabled:bg-blue-300"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Send size={14} />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

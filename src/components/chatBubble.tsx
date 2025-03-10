"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, HelpCircle } from "lucide-react"
import { FAQ, FAQItem } from "./faqItem"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

interface ChatBubbleProps {
  title?: string
  faqs?: FAQ[]
}

const title = "Chat to know more"
export function ChatBubble({faqs = [] }: ChatBubbleProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"chat" | "faq">(faqs.length > 0 ? "faq" : "chat")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! How can I help you with this solution today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const hasFaqs = faqs.length > 0

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: "Thanks for your message. Our team will review your question and get back to you soon.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && activeTab === "chat" && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, activeTab])

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-5 right-5 p-4 rounded-full shadow-lg z-50 transition-colors duration-300 ${
          isOpen ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-700"
        } text-white`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 w-80 sm:w-96 bg-white rounded-lg shadow-xl z-40 flex flex-col overflow-hidden transition-all duration-300 ease-in-out max-h-[70vh]">
          {/* Header */}
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
            <h3 className="font-semibold">{title}</h3>
            <button onClick={toggleChat} className="text-white hover:text-gray-200" aria-label="Close chat">
              <X size={18} />
            </button>
          </div>

          {/* Tabs - Only show if FAQs are available */}
          {hasFaqs && (
            <div className="flex border-b">
              <button
                className={`flex-1 py-2 px-4 text-sm font-medium ${
                  activeTab === "chat"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-600 hover:text-blue-500"
                }`}
                onClick={() => setActiveTab("chat")}
              >
                <MessageCircle size={16} className="inline mr-1" /> Chat
              </button>
              <button
                className={`flex-1 py-2 px-4 text-sm font-medium ${
                  activeTab === "faq" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600 hover:text-blue-500"
                }`}
                onClick={() => setActiveTab("faq")}
              >
                <HelpCircle size={16} className="inline mr-1" /> FAQs
              </button>
            </div>
          )}

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-3 bg-gray-50">
            {activeTab === "chat" ? (
              // Chat Messages
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-3 py-2 ${
                        message.sender === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-800 border border-gray-200"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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
                  <FAQItem key={index} id ={faq.id} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            )}
          </div>

          {/* Input Area (always shown in chat tab) */}
          {activeTab === "chat" && (
            <div className="p-3 border-t bg-white">
              <div className="flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 border rounded-l-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-blue-500 text-white rounded-r-md px-3 py-2 hover:bg-blue-600 disabled:bg-blue-300"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}


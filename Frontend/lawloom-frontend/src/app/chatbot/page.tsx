// app/chatbot/page.tsx
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Send, ArrowRight, BookText } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: {
    content: string;
    metadata: {
      source: string;
      article?: string;
      section?: string;
    };
  }[];
}

const Chatbot = () => {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample initial prompt
  const initialPrompt = "Hello! I'm your Indian Legal Assistant. Ask me anything about Indian laws, constitution, or your rights.";

  useEffect(() => {
    setMessages([{ role: 'assistant', content: initialPrompt }]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Simulate API call - replace with your actual API call
      const response = await fetch('http://127.0.0.1:5000/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: input }),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.answer,
        sources: data.sources
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I encountered an error processing your request. Please try again."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatAnswer = (text: string) => {
    return text
      .replace(/(Article\s\d+[A-Z]*)/g, '<span class="text-blue-600 font-medium">$1</span>')
      .replace(/(Section\s\d+)/g, '<span class="text-purple-600 font-medium">$1</span>');
  };

  const suggestedQuestions = [
    "What are my fundamental rights?",
    "Explain Article 21 in simple terms",
    "How to file an RTI application?",
    "What is the procedure for voter ID registration?"
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6 border-b">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <BookText className="h-6 w-6 text-blue-600" />
          </div>
          <h1 className="text-xl font-semibold text-gray-800">Legal Assistant</h1>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-3xl rounded-lg px-4 py-3 ${message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 shadow-xs text-black'}`}>
              {message.role === 'assistant' ? (
                <div dangerouslySetInnerHTML={{ __html: formatAnswer(message.content) }} />
              ) : (
                <p>{message.content}</p>
              )}

              {message.role === 'assistant' && message.sources && message.sources.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs font-medium text-gray-700 mb-2 ">References:</p>
                  <div className="space-y-2">
                    {message.sources.slice(0, 3).map((source, i) => (
                      <div key={i} className="text-xs p-2 bg-gray-50 rounded border border-gray-100">
                        <p className="font-medium text-gray-700">
                          {source.metadata.source}
                          {source.metadata.article && ` • ${source.metadata.article}`}
                        </p>
                        <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce">
                        <p className="text-gray-500 line-clamp-2">{source.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 max-w-xs">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t p-4">
        {messages.length === 1 && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            {suggestedQuestions.map((question, i) => (
              <button
                key={i}
                onClick={() => {
                  setInput(question);
                  setTimeout(() => document.getElementById('chat-input')?.focus(), 0);
                }}
                className="text-left text-sm p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            id="chat-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Indian laws..."
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            autoFocus
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2 text-center">
          This assistant provides general information only, not legal advice.
        </p>
      </div>
    </div>
  );
};

export default Chatbot;
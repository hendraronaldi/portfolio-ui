import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Paperclip, Image, ThumbsUp, ThumbsDown } from 'lucide-react';
import axios from 'axios';
import initialMessages from '../data/chat-messages.json';

type MessageType = 'text' | 'image' | 'file';

interface Message {
  id: number;
  sender: 'user' | 'bot';
  content: string;
  timestamp: string;
  type: MessageType;
  fileName?: string;
  previousUserMessage?: string;
}

interface APIResponse {
  message: string;
  type: MessageType;
  error?: string;
}

const ChatPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasShownInitialMessages, setHasShownInitialMessages] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<Record<number, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && !hasShownInitialMessages) {
      setHasShownInitialMessages(true);
      setIsTyping(true);

      setTimeout(() => {
        setMessages([initialMessages[0]]);
        
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setMessages(prev => [...prev, initialMessages[1]]);
            setIsTyping(false);
          }, 1500);
        }, 500);
      }, 1000);
    }
  }, [isOpen, hasShownInitialMessages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setError(null);
  };

  const formatTimestamp = () => {
    const now = new Date();
    return now.toISOString();
  };

  const sendMessageToAPI = async (content: string, type: MessageType = 'text', file?: File): Promise<APIResponse> => {
    try {
      setIsTyping(true);
      // const formData = new FormData();
      // formData.append('message', content);
      // formData.append('type', type);
      // if (file) {
      //   formData.append('file', file);
      // }

      const payload = {"query": content}

      const response = await axios.post<APIResponse>('http://localhost:8000/query-resume', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to send message. Please try again.');
      }
      throw new Error('An unexpected error occurred. Please try again.');
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async () => {
    if ((!newMessage.trim() && !selectedFile) || isTyping) return;

    setError(null);
    const nextId = messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1;
    
    try {
      if (selectedFile) {
        const fileType = selectedFile.type.startsWith('image/') ? 'image' : 'file';
        const fileMessage: Message = {
          id: nextId,
          sender: 'user',
          content: URL.createObjectURL(selectedFile),
          timestamp: formatTimestamp(),
          type: fileType,
          fileName: selectedFile.name
        };
        
        setMessages(prev => [...prev, fileMessage]);
        const response = await sendMessageToAPI(selectedFile.name, fileType, selectedFile);
        
        const botMessage: Message = {
          id: nextId + 1,
          sender: 'bot',
          content: response.message,
          timestamp: formatTimestamp(),
          type: 'text'
        };
        
        setMessages(prev => [...prev, botMessage]);
        setSelectedFile(null);
      }
      
      if (newMessage.trim()) {
        const userMessage = newMessage.trim();
        const textMessage: Message = {
          id: nextId + (selectedFile ? 2 : 0),
          sender: 'user',
          content: newMessage,
          timestamp: formatTimestamp(),
          type: 'text'
        };
        
        setMessages(prev => [...prev, textMessage]);
        const response = await sendMessageToAPI(newMessage);
        
        const botMessage: Message = {
          id: nextId + (selectedFile ? 3 : 1),
          sender: 'bot',
          content: response.message,
          timestamp: formatTimestamp(),
          type: 'text',
          previousUserMessage: userMessage
        };
        
        setMessages(prev => [...prev, botMessage]);
        setNewMessage('');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    }
  };

  const handleFeedback = async (messageId: number, isPositive: boolean) => {
    if (feedbackSubmitted[messageId]) return;

    const message = messages.find(m => m.id === messageId);
    if (!message || !message.previousUserMessage) return;

    try {
      await axios.post('http://localhost:8000/feedback', {
        userMessage: message.previousUserMessage,
        botResponse: message.content,
        isPositive
      });

      setFeedbackSubmitted(prev => ({ ...prev, [messageId]: true }));
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setError(null);
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-full shadow-lg hover:opacity-90 transition-all z-50"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      <div
        className={`fixed bottom-24 right-6 w-80 md:w-96 h-[500px] bg-gray-900 rounded-lg shadow-xl border border-gray-700 flex flex-col z-40 transition-all duration-300 ease-in-out transform ${
          isOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
              <MessageCircle size={20} />
            </div>
            <div>
              <h3 className="font-semibold">Chat with Hendra</h3>
              <p className="text-xs text-gray-200">Usually replies within an hour</p>
            </div>
          </div>
          <button onClick={toggleChat} className="text-white hover:text-gray-200">
            <X size={20} />
          </button>
        </div>

        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'bg-gray-800 text-white'
                }`}
              >
                {message.type === 'text' && <p>{message.content}</p>}
                
                {message.type === 'image' && (
                  <div className="mb-2">
                    <img 
                      src={message.content} 
                      alt="User uploaded" 
                      className="rounded-lg max-w-full max-h-48 object-contain"
                    />
                    {message.fileName && (
                      <p className="text-xs mt-1 text-gray-300">{message.fileName}</p>
                    )}
                  </div>
                )}
                
                {message.type === 'file' && (
                  <div className="flex items-center bg-gray-700/50 p-2 rounded">
                    <Paperclip size={16} className="mr-2" />
                    <span className="text-sm truncate">{message.fileName}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs opacity-70">
                    {formatMessageTime(message.timestamp)}
                  </span>
                  
                  {message.sender === 'bot' && (
                    <div className="flex space-x-2 ml-4">
                      {!feedbackSubmitted[message.id] ? (
                        <>
                          <button
                            onClick={() => handleFeedback(message.id, true)}
                            className="p-1 hover:border hover:border-green-500 rounded transition-all"
                            title="Helpful"
                          >
                            <ThumbsUp size={14} />
                          </button>
                          <button
                            onClick={() => handleFeedback(message.id, false)}
                            className="p-1 hover:border hover:border-red-500 rounded transition-all"
                            title="Not helpful"
                          >
                            <ThumbsDown size={14} />
                          </button>
                        </>
                      ) : (
                        <span className="text-xs text-gray-400">Thanks for your feedback!</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start animate-fadeIn">
              <div className="bg-gray-800 rounded-lg p-3 flex items-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="ml-2 text-sm text-gray-400">Hendra is typing...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center animate-fadeIn">
              <div className="bg-red-900/30 text-red-300 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {selectedFile && (
          <div className="px-4 pb-2">
            <div className="relative inline-block">
              {selectedFile.type.startsWith('image/') ? (
                <div className="bg-gray-800 p-2 rounded border border-gray-700">
                  <img 
                    src={URL.createObjectURL(selectedFile)} 
                    alt="Preview" 
                    className="h-20 object-contain rounded"
                  />
                </div>
              ) : (
                <div className="bg-gray-800 p-2 rounded border border-gray-700 flex items-center">
                  <Paperclip size={16} className="mr-2" />
                  <span className="text-sm truncate max-w-[200px]">{selectedFile.name}</span>
                </div>
              )}
              <button 
                onClick={removeSelectedFile}
                className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 w-5 h-5 flex items-center justify-center"
              >
                <X size={12} />
              </button>
            </div>
          </div>
        )}

        <div className="p-3 border-t border-gray-800">
          <div className="flex items-center bg-gray-800 rounded-lg px-3 py-2">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 bg-transparent border-none focus:outline-none text-white resize-none max-h-20"
              rows={1}
            />
            <div className="flex space-x-2 ml-2">
              <button 
                onClick={triggerFileInput}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Paperclip size={18} />
              </button>
              <button 
                onClick={triggerFileInput}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Image size={18} />
              </button>
              <button 
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-full"
                disabled={isTyping}
              >
                <Send size={18} />
              </button>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
              accept="image/*,.pdf,.doc,.docx,.txt"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPopup;
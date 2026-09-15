import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, ThumbsUp, ThumbsDown } from 'lucide-react';
import axios from 'axios';
import initialMessages from '../data/chat-messages.json';

// Access the environment variables
const backendProxyUrl = import.meta.env.VITE_BE_PROXY_URL;
const apiKey = import.meta.env.VITE_FE_API_KEY;

type MessageType = 'text' | 'image' | 'file';

interface Message {
  id: number;
  sender: 'user' | 'bot';
  content: string;
  timestamp: string;
  type: MessageType;
  traceId?: string;
}

interface APIResponse {
  message: string;
  type: MessageType;
  error?: string;
  trace_id?: string;
  answer?: string;
  intent?: string;
  index_build_date?: string;
  session_id?: string;
}

type Vote = 'up' | 'down';

interface FeedbackEvent {
  trace_id: string;
  vote: Vote;
  text?: string;
}

// Canonical feedback contract (mirrors feedback.py / backend tracing.py):
// a feedback event is exactly {trace_id, vote: 'up'|'down', text?},
// free text capped at 2000 chars — overlong text is rejected, never truncated.
const MAX_FEEDBACK_TEXT_CHARS = 2000;
// Optional conversation history emitted with each query; the backend keeps
// its own memory fallback, so either side can evolve without breaking.
const MAX_HISTORY_MESSAGES = 20;

const USER_ID_STORAGE_KEY = 'portfolio_user_id';
const SESSION_ID_STORAGE_KEY = 'portfolio_session_id';

function getOrCreateUserId(): string {
  try {
    const existing = localStorage.getItem(USER_ID_STORAGE_KEY);
    if (existing) return existing;
    let id: string;
    if (typeof crypto !== 'undefined' && typeof (crypto as Crypto).randomUUID === 'function') {
      id = (crypto as Crypto).randomUUID();
    } else {
      id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.floor(Math.random() * 16);
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
    localStorage.setItem(USER_ID_STORAGE_KEY, id);
    return id;
  } catch {
    return '';
  }
}

function readStoredSessionId(): string | null {
  try {
    return sessionStorage.getItem(SESSION_ID_STORAGE_KEY);
  } catch {
    return null;
  }
}

function storeSessionId(id: string | null | undefined): void {
  if (!id) return;
  try {
    sessionStorage.setItem(SESSION_ID_STORAGE_KEY, id);
  } catch {
    // ignore storage errors
  }
}

const ChatPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasShownInitialMessages, setHasShownInitialMessages] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<Record<number, boolean>>({});
  const [downvoteOpenId, setDownvoteOpenId] = useState<number | null>(null);
  const [downvoteText, setDownvoteText] = useState('');
  const [downvoteError, setDownvoteError] = useState<string | null>(null);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    getOrCreateUserId();
    setSessionId(readStoredSessionId());
  }, []);

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
    
    // Clear retry timeout if chat is closed
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
    
    // Reset rate limiting state when closing chat
    if (!isOpen) {
      setIsRateLimited(false);
    }
  };

  const formatTimestamp = () => {
    const now = new Date();
    return now.toISOString();
  };

  const makeBotMessage = (id: number, content: string, traceId?: string): Message => ({
    id,
    sender: 'bot',
    content,
    timestamp: formatTimestamp(),
    type: 'text',
    traceId
  });

  const isUsableResponse = (response: unknown): response is APIResponse => {
    if (typeof response !== 'object' || response === null) return false;
    const message = (response as APIResponse).message;
    return typeof message === 'string' && message.trim().length > 0;
  };

  const buildHeaders = (): Record<string, string> => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-API-Key': apiKey,
      'X-User-Id': getOrCreateUserId(),
    };
    const sid = sessionId ?? readStoredSessionId();
    if (sid) {
      headers['X-Session-Id'] = sid;
    }
    return headers;
  };

  const captureSessionId = (responseHeaders: unknown, bodySessionId?: string | null) => {
    const headerId =
      (responseHeaders as Record<string, string | undefined> | undefined)?.['x-session-id'];
    const id = headerId ?? bodySessionId ?? undefined;
    if (id) {
      storeSessionId(id);
      setSessionId(id);
    }
  };

  const sendMessageToAPI = async (content: string): Promise<APIResponse> => {
    try {
      setIsTyping(true);

      const payload: { query: string; history?: string[] } = { query: content };
      const seedContents = new Set(initialMessages.map((m) => m.content));
      const history = messages
        .filter(m => m.type === 'text' && !seedContents.has(m.content))
        .map(m => `${m.sender}: ${m.content}`)
        .slice(-MAX_HISTORY_MESSAGES);
      if (history.length > 0) {
        payload.history = history;
      }

      const response = await axios.post<APIResponse>(
        backendProxyUrl + '/api/agent/resume', 
        payload,
        {
          headers: buildHeaders(),
        }
      );

      captureSessionId(response.headers, response.data?.session_id);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Check for rate limiting (429 status)
        if (error.response?.status === 429) {
          const rateLimitError = new Error('RATE_LIMITED');
          rateLimitError.name = 'RateLimitError';
          throw rateLimitError;
        }
        throw new Error(error.response?.data?.message || 'Failed to send message. Please try again.');
      }
      throw new Error('An unexpected error occurred. Please try again.');
    } finally {
      setIsTyping(false);
    }
  };

  const handleRateLimit = async (userMessage: string) => {
    setIsRateLimited(true);
    setError(null);
    
    // Add polite busy message
    const nextId = messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1;
    const busyMessage: Message = {
      id: nextId,
      sender: 'bot',
      content: "I'm currently experiencing high traffic and am a bit busy at the moment. Please give me a minute to process your request. 🤖",
      timestamp: formatTimestamp(),
      type: 'text'
    };
    
    setMessages(prev => [...prev, busyMessage]);
    
    // Set retry timeout for 1 minute
    retryTimeoutRef.current = setTimeout(async () => {
      try {
        setIsTyping(true);
        const response = await sendMessageToAPI(userMessage);

        if (!isUsableResponse(response)) {
          const emptyRetry = new Error('Empty reply on retry');
          emptyRetry.name = 'RateLimitError';
          throw emptyRetry;
        }
        setMessages(prev => [...prev, makeBotMessage(nextId + 1, response.message, response.trace_id)]);
        setIsRateLimited(false);
      } catch (retryError) {
        if (retryError instanceof Error && retryError.name === 'RateLimitError') {
          // Second rate limit - show apology and unlock input
          const apologyMessage: Message = {
            id: nextId + 1,
            sender: 'bot',
            content: "I apologize, but I'm unable to process your request at the moment due to high demand. Please wait a moment and try chatting again. Thank you for your patience! 🙏",
            timestamp: formatTimestamp(),
            type: 'text'
          };
          
          setMessages(prev => [...prev, apologyMessage]);
          setIsRateLimited(false);
        } else {
          // Other error during retry
          setError(retryError instanceof Error ? retryError.message : 'An unexpected error occurred during retry');
          setIsRateLimited(false);
        }
      } finally {
        setIsTyping(false);
      }
    }, 60000); // 1 minute
  };
  const handleSendMessage = async () => {
    if (!newMessage.trim() || isTyping || isRateLimited) return;

    setError(null);
    const nextId = messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1;
    
    try {
      if (newMessage.trim()) {
        const textMessage: Message = {
          id: nextId,
          sender: 'user',
          content: newMessage,
          timestamp: formatTimestamp(),
          type: 'text'
        };
        
        setMessages(prev => [...prev, textMessage]);
        
        try {
          const response = await sendMessageToAPI(newMessage);

          if (!isUsableResponse(response)) {
            await handleRateLimit(newMessage);
          } else {
            setMessages(prev => [...prev, makeBotMessage(nextId + 1, response.message, response.trace_id)]);
          }
        } catch (error) {
          if (error instanceof Error && error.name === 'RateLimitError') {
            await handleRateLimit(newMessage);
          } else {
            throw error;
          }
        }
        
        setNewMessage('');
      }
    } catch (err) {
      if (!(err instanceof Error && err.name === 'RateLimitError')) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      }
    }
  };

  const submitVote = async (messageId: number, vote: Vote, text?: string) => {
    const message = messages.find(m => m.id === messageId);
    if (!message || !message.traceId) return;

    const event: FeedbackEvent = {
      trace_id: message.traceId,
      vote
    };
    if (typeof text === 'string' && text.trim()) {
      event.text = text;
    }

    try {
      const response = await axios.post(backendProxyUrl + '/api/agent/feedback', event, {
        headers: buildHeaders(),
      });
      captureSessionId(response.headers);

      setFeedbackSubmitted(prev => ({ ...prev, [messageId]: true }));
      setDownvoteOpenId(null);
      setDownvoteText('');
      setDownvoteError(null);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
  };

  const handleFeedback = async (messageId: number, isPositive: boolean) => {
    if (feedbackSubmitted[messageId]) return;

    if (isPositive) {
      await submitVote(messageId, 'up');
      return;
    }

    setDownvoteError(null);
    setDownvoteText('');
    setDownvoteOpenId(messageId);
  };

  const handleDownvoteSubmit = async (messageId: number) => {
    if (downvoteText.length > MAX_FEEDBACK_TEXT_CHARS) {
      setDownvoteError(`Please keep your explanation to ${MAX_FEEDBACK_TEXT_CHARS} characters or fewer.`);
      return;
    }
    await submitVote(messageId, 'down', downvoteText);
  };

  const handleDownvoteCancel = () => {
    setDownvoteOpenId(null);
    setDownvoteText('');
    setDownvoteError(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
   // Allow space key to work normally in textarea
   if (e.key === ' ') {
     e.stopPropagation();
   }
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
                {message.type === 'text' && (
                  <p className="whitespace-pre-wrap">{message.content}</p>
                )}
                
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs opacity-70">
                    {formatMessageTime(message.timestamp)}
                  </span>
                  
                  {message.sender === 'bot' && message.traceId && !message.content.includes("Hi there!") &&
                  !message.content.includes("I can help you with") && !message.content.includes("How can I help you today?") && (
                    <div className="flex flex-col ml-4">
                      <div className="flex space-x-2">
                        {!feedbackSubmitted[message.id] ? (
                          <>
                            <button
                              onClick={() => handleFeedback(message.id, true)}
                              className="p-1 hover:text-green-500 hover:border hover:border-green-500 rounded transition-all"
                              title="Helpful"
                            >
                              <ThumbsUp size={14} />
                            </button>
                            <button
                              onClick={() => handleFeedback(message.id, false)}
                              className="p-1 hover:text-red-500 hover:border hover:border-red-500 rounded transition-all"
                              title="Not helpful"
                            >
                              <ThumbsDown size={14} />
                            </button>
                          </>
                        ) : (
                          <span className="text-xs text-gray-400">Thanks for your feedback!</span>
                        )}
                      </div>
                      {downvoteOpenId === message.id && !feedbackSubmitted[message.id] && (
                        <div className="mt-2 w-48">
                          <textarea
                            value={downvoteText}
                            onChange={(e) => setDownvoteText(e.target.value)}
                            placeholder="What went wrong? (optional)"
                            className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-xs text-white resize-none focus:outline-none"
                            rows={2}
                            maxLength={MAX_FEEDBACK_TEXT_CHARS}
                          />
                          {downvoteError && (
                            <p className="text-xs text-red-400 mt-1">{downvoteError}</p>
                          )}
                          <div className="flex space-x-2 mt-1">
                            <button
                              onClick={() => handleDownvoteSubmit(message.id)}
                              className="text-xs bg-gradient-to-r from-purple-600 to-blue-600 px-2 py-1 rounded"
                            >
                              Send
                            </button>
                            <button
                              onClick={handleDownvoteCancel}
                              className="text-xs px-2 py-1 rounded border border-gray-600 text-gray-300"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
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

        <div className="p-3 border-t border-gray-800">
          <div className="flex items-center bg-gray-800 rounded-lg px-3 py-2">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={isRateLimited ? "Please wait, processing your request..." : "Type a message..."}
              className={`flex-1 bg-transparent border-none focus:outline-none text-white resize-none max-h-20 ${isRateLimited ? 'opacity-50' : ''}`}
              rows={1}
              disabled={isRateLimited}
            />
            <div className="flex space-x-2 ml-2">
              <button 
                onClick={handleSendMessage}
                className={`bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-full ${(isTyping || isRateLimited) ? 'opacity-50' : ''}`}
                disabled={isTyping || isRateLimited}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPopup;
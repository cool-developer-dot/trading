'use client';

import { memo, useState, useCallback, useRef, useEffect } from 'react';

interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: Date;
  agentName?: string;
  agentAvatar?: string;
}

const quickReplies = [
  'How do I deposit funds?',
  'Reset my password',
  'Trading fees information',
  'Withdrawal time',
  'Enable 2FA',
  'Account verification'
];

const ChatPage = memo(() => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'agent',
      text: 'Hello! 👋 Welcome to Binance Support. I\'m Sarah, your customer support agent. How can I help you today?',
      timestamp: new Date(),
      agentName: 'Sarah Johnson',
      agentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate agent response
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const responses: { [key: string]: string } = {
      'deposit': 'To deposit funds, go to Wallet > Deposit, select your currency, and follow the instructions. Crypto deposits usually arrive within 30 minutes. Do you need help with a specific currency?',
      'password': 'To reset your password: 1) Click "Forgot Password" on the login page 2) Enter your email 3) Check your inbox for reset link 4) Create a new strong password. Let me know if you need further assistance!',
      'fee': 'Our trading fees are: Spot Trading: 0.1% per trade, Futures: 0.02% maker / 0.04% taker. VIP users get discounted rates. Would you like to know about VIP benefits?',
      'withdrawal': 'Cryptocurrency withdrawals process within 30 minutes. Bank transfers take 1-5 business days. What currency are you withdrawing?',
      '2fa': 'To enable 2FA: Security Settings > Enable 2FA > Download Google Authenticator > Scan QR code > Save backup codes. This greatly improves your account security!',
      'verification': 'Account verification (KYC): Upload ID > Take selfie > Proof of address > Usually completes in 24 hours. This unlocks higher withdrawal limits. Need help with a specific step?'
    };

    let responseText = 'I understand you\'re asking about that. Let me help you! Could you please provide more details so I can assist you better? Or try one of our quick reply options below.';
    
    const lowerText = text.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (lowerText.includes(key)) {
        responseText = response;
        break;
      }
    }

    const agentMessage: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'agent',
      text: responseText,
      timestamp: new Date(),
      agentName: 'Sarah Johnson',
      agentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    };

    setIsTyping(false);
    setMessages(prev => [...prev, agentMessage]);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputMessage);
  }, [inputMessage, sendMessage]);

  const handleQuickReply = useCallback((reply: string) => {
    sendMessage(reply);
  }, [sendMessage]);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="bg-zinc-900 border-b border-zinc-800 px-4 py-4 md:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
              </div>
              {isOnline && (
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-zinc-900 rounded-full" />
              )}
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Live Chat Support</h1>
              <p className="text-sm text-zinc-400 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-zinc-500'}`} />
                {isOnline ? 'Online - Average response time: 30 seconds' : 'Offline'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors" aria-label="Voice call">
              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors" aria-label="Video call">
              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors" aria-label="Settings">
              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <main className="flex-1 overflow-y-auto px-4 py-6 md:px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex items-end gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {message.sender === 'agent' && (
                <img
                  src={message.agentAvatar}
                  alt={message.agentName}
                  className="w-10 h-10 rounded-full ring-2 ring-zinc-800 flex-shrink-0"
                />
              )}

              <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'} max-w-xl`}>
                {message.sender === 'agent' && (
                  <span className="text-xs text-zinc-500 mb-1 ml-3">{message.agentName}</span>
                )}
                
                <div
                  className={`px-5 py-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-yellow-500 text-black rounded-br-sm'
                      : 'bg-zinc-900 text-white border border-zinc-800 rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>

                <span className="text-xs text-zinc-600 mt-1 mx-3">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              {message.sender === 'user' && (
                <div className="w-10 h-10 bg-gradient-to-br from-zinc-700 to-zinc-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-end gap-3">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                alt="Agent typing"
                className="w-10 h-10 rounded-full ring-2 ring-zinc-800"
              />
              <div className="px-5 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl rounded-bl-sm">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-zinc-600 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-zinc-600 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-zinc-600 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Quick Replies */}
      <div className="px-4 pb-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <span className="text-xs text-zinc-500 whitespace-nowrap">Quick replies:</span>
            {quickReplies.map(reply => (
              <button
                key={reply}
                onClick={() => handleQuickReply(reply)}
                className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-yellow-500/50 rounded-full text-sm text-zinc-300 hover:text-white transition-all whitespace-nowrap"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <footer className="bg-zinc-900 border-t border-zinc-800 px-4 py-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="flex items-end gap-3">
            <button
              type="button"
              className="p-3 hover:bg-zinc-800 rounded-xl transition-colors flex-shrink-0"
              aria-label="Attach file"
            >
              <svg className="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>

            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full px-5 py-4 bg-zinc-800 border border-zinc-700 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all pr-12"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-zinc-700 rounded-lg transition-colors"
                aria-label="Emoji"
              >
                <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>

            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-4 bg-yellow-500 hover:bg-yellow-600 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex-shrink-0"
              aria-label="Send message"
            >
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>

          <p className="text-xs text-zinc-600 mt-3 text-center">
            Messages are encrypted and secure. Our agents are available 24/7.
          </p>
        </div>
      </footer>
    </div>
  );
});

ChatPage.displayName = 'ChatPage';

export default ChatPage;


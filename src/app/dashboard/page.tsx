
'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { useRouter } from 'next/navigation';

const EfoyChatLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={props.width || '140'}
    height={props.height || '140'}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="chat-gradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4A90E2" />
        <stop offset="100%" stopColor="#50E3C2" />
      </linearGradient>
      <linearGradient id="text-gradient" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#7B68EE" />
        <stop offset="100%" stopColor="#50E3C2" />
      </linearGradient>
      <filter
        id="shadow"
        x="-10%"
        y="-10%"
        width="130%"
        height="130%"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feDropShadow
          dx="0"
          dy="2"
          stdDeviation="3"
          floodColor="#000"
          floodOpacity="0.25"
        />
      </filter>
      <filter
        id="text-shadow"
        x="-20%"
        y="-20%"
        width="160%"
        height="160%"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feDropShadow
          dx="0"
          dy="1"
          stdDeviation="1"
          floodColor="#000"
          floodOpacity="0.3"
        />
      </filter>
    </defs>

    {/* Chat bubble */}
    <path
      d="M48 8H16C10.477 8 6 12.477 6 18v20c0 5.523 4.477 10 10 10h22l10 8V18c0-5.523-4.477-10-10-10z"
      fill="url(#chat-gradient)"
      filter="url(#shadow)"
    />

    {/* Tail of chat bubble */}
    <path
      d="M48 38l10 8V18"
      stroke="#3CAFA9"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Three chat dots */}
    <circle cx="22" cy="28" r="4" fill="white" />
    <circle cx="32" cy="28" r="4" fill="white" />
    <circle cx="42" cy="28" r="4" fill="white" />

    {/* Text "Efoy Chat" with enhanced style */}
    <text
      x="32"
      y="58"
      textAnchor="middle"
      fontFamily="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      fontSize="12"
      fontWeight="700"
      fill="url(#text-gradient)"
      letterSpacing="0.1em"
      transform="uppercase"
      filter="url(#text-shadow)"
    >
      Efoy Chat
    </text>
  </svg>
);

export default function Chat() {
  const { messages: initialMessages, input, handleInputChange: setInput, handleSubmit: dummySubmit } = useChat();
  const router = useRouter();

  // We handle messages in local state to modify AI response streaming
  const [messages, setMessages] = useState(initialMessages);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages change
  const bottomRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Our own submit handler, to enable streaming response
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    // Append user message locally
    const userMessage = {
      id: String(Date.now()),
      role: 'user',
      parts: [{ type: 'text', text: input.trim() }],
    };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let aiText = '';
      // Append empty AI message first
      setMessages(prev => [
        ...prev,
        { id: String(Date.now()), role: 'ai', parts: [{ type: 'text', text: '' }] },
      ]);

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          aiText += decoder.decode(value, { stream: true });
          // Update last AI message with streamed text
          setMessages(prev => {
            const msgs = [...prev];
            const lastMsg = msgs[msgs.length -1];
            if (lastMsg.role === 'ai') {
              lastMsg.parts[0].text = aiText;
            }
            return msgs;
          });
        }
      }
    } catch (error) {
      console.error('Error streaming AI response:', error);
      // Optionally show error message in chat or as alert
      setMessages(prev => [
        ...prev,
        {
          id: String(Date.now()),
          role: 'ai',
          parts: [{ type: 'text', text: '[Error receiving AI response]' }],
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50 px-4'>
      <div className='flex flex-col w-full max-w-md max-h-[90vh] bg-white rounded-2xl shadow-xl p-6'>
        {/* Header */}
        <h1
          className='text-3xl font-extrabold text-center mb-4'
          style={{
            fontFamily: "'Poppins', sans-serif",
            background:
              'linear-gradient(90deg, #4A90E2, #50E3C2, #7B68EE)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Welcome to Efoy Chat, here to help
        </h1>

        {/* Logo */}
        <div className='flex justify-center mb-6'>
          <EfoyChatLogo width={100} height={100} />
        </div>

        {/* Messages */}
        <div className='flex-grow overflow-y-auto p-2 space-y-4 mb-4'>
          {messages.map(message => (
            <div
              key={message.id}
              className={`whitespace-pre-wrap p-3 rounded-lg max-w-[80%] ${
                message.role === 'user'
                  ? 'bg-blue-100 text-blue-900 self-end'
                  : 'bg-gray-200 text-gray-900 self-start'
              }`}
              style={{ wordBreak: 'break-word' }}
            >
              <strong>{message.role === 'user' ? 'User: ' : 'AI: '}</strong>
              {message.parts.map((part, i) => {
                if (part.type === 'text')
                  return <span key={`${message.id}-${i}`}>{part.text}</span>;
                return null;
              })}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className='flex mb-4'>
          <input
            ref={inputRef}
            type='text'
            className='flex-grow border border-gray-300 rounded-l-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Say something...'
            value={input}
            onChange={e => setInput(e)}
            disabled={loading}
          />
          <button
            type='submit'
            className={`bg-blue-600 text-white font-semibold px-6 rounded-r-xl hover:bg-blue-700 transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>

        {/* Log Out Button */}
        <button
          onClick={handleLogout}
          className='w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition'
          aria-label='Log Out'
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

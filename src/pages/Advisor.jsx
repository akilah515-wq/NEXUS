import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Lightbulb } from 'lucide-react'

const suggestedQuestions = [
  'How do I open a bank account in Jamaica?',
  'What is the JSE and how do I invest?',
  'How can I save more money each month?',
  'What is the difference between a savings and chequing account?',
  'How do I build a good credit history?',
  'What are treasury bills and how do I buy them?',
]

const initialMessages = [
  {
    role: 'assistant',
    text: "Hello! Mi name is NEXUS Advisor 👋 Mi here to help you with anything financial — from opening your first bank account to investing on the JSE. What can I help you with today?",
  },
]

export default function Advisor() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const getResponse = (question) => {
    const q = question.toLowerCase()
    if (q.includes('open') && q.includes('account')) {
      return "To open a bank account in Jamaica, you will need: \n\n1. Your TRN (Taxpayer Registration Number)\n2. A valid Government-issued ID (passport or driver's licence)\n3. Proof of address (utility bill, max 3 months old)\n4. A minimum deposit (as low as J$500 at JN Bank)\n\nThe easiest option for first-timers is JN Bank's EasyAccount — you can apply online in under 45 minutes with no monthly fees! Would you like me to walk you through the steps?"
    }
    if (q.includes('jse') || q.includes('invest') || q.includes('stock')) {
      return "The JSE (Jamaica Stock Exchange) is where you can buy shares in Jamaican companies like NCB, Seprod, and GraceKennedy. \n\nTo get started:\n1. Open a bank account first\n2. Register with a broker — JMMB, Barita, or NCB Capital Markets\n3. Start with as little as J$1,000\n4. Consider unit trusts first if you are new — they spread your risk across many stocks automatically\n\nWould you like to know more about unit trusts vs direct stocks?"
    }
    if (q.includes('save') || q.includes('saving')) {
      return "Here are 3 proven ways to save more in Jamaica:\n\n1. Use NEXUS Round-Up — every transaction gets rounded up and saved automatically. J$1,340 at Hi-Lo becomes J$1,400, saving J$60 without thinking.\n\n2. The 50/30/20 rule — 50% on needs, 30% on wants, 20% saved. On J$25,000 a week, that is J$5,000 saved every week.\n\n3. Open a separate savings account — keeping savings separate from your spending account makes it harder to dip into.\n\nWould you like help setting up a savings plan?"
    }
    if (q.includes('credit') || q.includes('credit history')) {
      return "Building credit in Jamaica takes time but here is how to start:\n\n1. Open a bank account — this is step one. No account means no credit history.\n2. Apply for a secured credit card — you deposit money as collateral, use the card, and pay it back on time.\n3. Pay ALL bills on time — JPS, NWC, phone bills — these get reported to CRIF (Jamaica's credit bureau).\n4. Keep your credit utilisation below 30%.\n\nWith 6 months of consistent behaviour, you will start building a positive credit score. Want to know more about CRIF?"
    }
    if (q.includes('treasury') || q.includes('t-bill')) {
      return "Treasury bills (T-bills) are short-term loans you make to the Jamaican Government. They are one of the safest investments available.\n\nKey facts:\n- Issued by the Bank of Jamaica\n- Terms of 30, 60, 90, or 180 days\n- Returns typically 6-9% annually\n- Minimum investment around J$100,000\n- Available through your bank or broker\n\nThey are perfect if you want safety over high returns. Would you like to compare T-bills vs unit trusts?"
    }
    if (q.includes('savings') && q.includes('chequing')) {
      return "Great question! Here is the difference:\n\nSavings Account:\n- Earns interest on your balance\n- Designed for storing money\n- Limited withdrawals per month\n- Best for your emergency fund or savings goals\n\nChequing Account:\n- No or low interest\n- Designed for daily spending\n- Unlimited transactions\n- Comes with a debit card\n\nMost people need both — chequing for daily use, savings for building wealth. JN Bank's EasyAccount works as both for beginners!"
    }
    return "That is a great question! As your NEXUS financial advisor, I recommend starting with the basics — make sure you have a bank account, then build an emergency fund of 3 months expenses, then look at investing. \n\nCan you tell me more about what you are trying to achieve financially? I can give you more specific guidance based on your situation."
  }

  const sendMessage = (text) => {
    const messageText = text || input.trim()
    if (!messageText) return

    setMessages(prev => [...prev, { role: 'user', text: messageText }])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: getResponse(messageText),
      }])
    }, 1200)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-screen pb-20 pt-4">

      {/* Header */}
      <div className="flex items-center gap-3 mb-4 px-1">
        <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
          <Bot size={20} className="text-gray-900" />
        </div>
        <div>
          <h1 className="text-white font-bold">NEXUS Advisor</h1>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-emerald-400 rounded-full" />
            <span className="text-emerald-400 text-xs">Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 pb-3">

        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1 ${
              msg.role === 'user' ? 'bg-yellow-400' : 'bg-gray-700'
            }`}>
              {msg.role === 'user'
                ? <User size={14} className="text-gray-900" />
                : <Bot size={14} className="text-yellow-400" />
              }
            </div>
            <div className={`max-w-xs rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
              msg.role === 'user'
                ? 'bg-yellow-400 text-gray-900 rounded-tr-sm'
                : 'bg-gray-900 border border-gray-800 text-gray-200 rounded-tl-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center shrink-0">
              <Bot size={14} className="text-yellow-400" />
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1 items-center h-4">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        {/* Suggested questions (only show at start) */}
        {messages.length === 1 && !isTyping && (
          <div className="space-y-2 mt-2">
            <div className="flex items-center gap-2">
              <Lightbulb size={14} className="text-yellow-400" />
              <span className="text-gray-500 text-xs">Suggested questions</span>
            </div>
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(q)}
                className="w-full text-left bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-gray-300 text-xs hover:border-yellow-400/50 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="flex gap-2 items-end mt-2">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything about banking or investing..."
          rows={1}
          className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 resize-none focus:outline-none focus:border-yellow-400/50"
        />
        <button
          onClick={() => sendMessage()}
          disabled={!input.trim()}
          className="w-11 h-11 bg-yellow-400 rounded-xl flex items-center justify-center disabled:opacity-40 transition-opacity shrink-0"
        >
          <Send size={18} className="text-gray-900" />
        </button>
      </div>

    </div>
  )
}
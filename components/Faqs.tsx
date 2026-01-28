
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ShieldQuestion, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "What is Multi-Factor Authentication (MFA)?",
    answer: "MFA is a security system that requires more than one method of authentication from independent categories of credentials to verify the user's identity for a login or other transaction."
  },
  {
    question: "How do I recognize a Phishing email?",
    answer: "Look for urgent or threatening language, requests for sensitive information, mismatched URL links (hover over them!), and generic greetings like 'Dear Customer' instead of your name."
  },
  {
    question: "Is public Wi-Fi safe to use?",
    answer: "Generally, no. Public Wi-Fi is often unencrypted, meaning attackers can intercept your data. If you must use it, always use a reputable VPN to encrypt your connection."
  },
  {
    question: "What makes a password truly 'strong'?",
    answer: "A strong password is long (12+ characters), unique to every account, and includes a mix of uppercase, lowercase, numbers, and special symbols. Using a passphrase of random words is even better."
  },
  {
    question: "How often should I update my software?",
    answer: "As soon as updates are available. Updates often include critical 'security patches' that fix vulnerabilities being actively exploited by hackers."
  }
];

const Faqs: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-500/20">
          <ShieldQuestion size={32} />
        </div>
        <h2 className="text-3xl font-bold text-white tracking-tight">Security Intelligence Base</h2>
        <p className="text-gray-400">Essential answers for staying safe in a digital world.</p>
      </div>

      <div className="space-y-4">
        {faqData.map((item, idx) => (
          <div 
            key={idx} 
            className={`border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === idx ? 'bg-gray-900 border-indigo-500/30 ring-1 ring-indigo-500/20' : 'bg-gray-900/50'}`}
          >
            <button 
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <div className="flex items-center gap-4">
                <HelpCircle size={20} className={openIndex === idx ? 'text-indigo-400' : 'text-gray-500'} />
                <span className={`font-semibold text-lg ${openIndex === idx ? 'text-white' : 'text-gray-300'}`}>{item.question}</span>
              </div>
              {openIndex === idx ? <ChevronUp className="text-indigo-400" /> : <ChevronDown className="text-gray-500" />}
            </button>
            <div className={`transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-96 opacity-100 p-6 pt-0' : 'max-h-0 opacity-0 pointer-events-none'}`}>
              <div className="h-px bg-gray-800 mb-6" />
              <p className="text-gray-400 leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;

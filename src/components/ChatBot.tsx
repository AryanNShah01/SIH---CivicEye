import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { X, Send, Bot, User, HelpCircle, Zap, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface ChatBotProps {
  onClose: () => void;
}

export function ChatBot({ onClose }: ChatBotProps) {
  const { t, language } = useLanguage();

  const quickQuestions = language === 'hi' ? [
    "मुद्दा कैसे रिपोर्ट करें?",
    "रिपोर्ट के बाद क्या होता है?",
    "अपनी रिपोर्ट कैसे ट्रैक करें?",
    "पॉइंट्स कैसे कमाएं?",
    "विभिन्न श्रेणियां क्या हैं?"
  ] : [
    "How to report an issue?",
    "What happens after reporting?",
    "How to track my reports?",
    "How to earn points?",
    "What are the categories?"
  ];

  const botResponses: Record<string, { content: string; suggestions?: string[] }> = language === 'hi' ? {
    "मुद्दा कैसे रिपोर्ट करें": {
      content: "मुद्दा रिपोर्ट करने के लिए: 1) 'रिपोर्ट' टैब पर क्लिक करें, 2) बुनियादी जानकारी भरें, 3) श्रेणी और प्राथमिकता चुनें, 4) स्थान और तस्वीरें जोड़ें, 5) समीक्षा करें और सबमिट करें। हर वैध रिपोर्ट के लिए आपको पॉइंट्स मिलेंगे! 🏆",
      suggestions: ["कौन सी श्रेणियां उपलब्ध हैं?", "समीक्षा में कितना समय लगता है?", "क्या मैं रिपोर्ट संपादित कर सकता हूं?"]
    },
    "रिपोर्ट के बाद क्या होता है": {
      content: "सबमिशन के बाद: 1) आपकी रिपोर्ट को एक यूनीक ID मिलती है, 2) सरकारी अधिकारी 24-48 घंटों में इसकी समीक्षा करते हैं, 3) इसे संबंधित विभागों को सौंपा जाता है, 4) आपको प्रगति की अपडेट मिलेगी, 5) समाधान पर आपको पॉइंट्स मिलते हैं! ✨",
      suggestions: ["स्थिति कैसे ट्रैक करें?", "मेरी रिपोर्ट की समीक्षा कौन करता है?", "अगर कुछ नहीं होता तो?"]
    },
    "अपनी रिपोर्ट कैसे ट्रैक करें": {
      content: "अपनी रिपोर्ट ट्रैक करने के लिए: 1) 'मेरी रिपोर्ट्स' सेक्शन पर जाएं, 2) सभी सबमिट की गई रिपोर्ट्स की सूची देखें, 3) प्रत्येक रिपोर्ट की वर्तमान स्थिति (रिव्यू, प्रोग्रेस, रिजॉल्व्ड) देखें, 4) अपडेट्स के लिए नोटिफिकेशन चेक करें, 5) रिजॉल्व्ड रिपोर्ट्स के लिए पॉइंट्स क्लेम करें! 📊",
      suggestions: ["क्या मैं रिपोर्ट एडिट कर सकता हूं?", "रिपोर्ट कितने समय में रिजॉल्व होती है?", "अगर रिपोर्ट रिजेक्ट हो जाए तो?"]
    },
    "पॉइंट्स कैसे कमाएं": {
      content: "पॉइंट्स कमाने के तरीके: 1) मुद्दा रिपोर्ट करने पर 10 पॉइंट्स, 2) रिपोर्ट रिजॉल्व होने पर 25 पॉइंट्स, 3) अन्य यूजर्स की रिपोर्ट्स को वोट करने पर 2 पॉइंट्स, 4) कम्यूनिटी में सक्रिय भागीदारी पर 5 पॉइंट्स! 🎯",
      suggestions: ["पॉइंट्स का क्या उपयोग है?", "लीडरबोर्ड क्या है?", "क्या पॉइंट्स एक्सपायर होते हैं?"]
    },
    "विभिन्न श्रेणियां क्या हैं": {
      content: "हमारी मुख्य श्रेणियां: 1) सड़क और इंफ्रास्ट्रक्चर, 2) स्वच्छता और कचरा प्रबंधन, 3) जल आपूर्ति और नालियां, 4) बिजली और स्ट्रीट लाइट, 5) पार्क और हरित स्थान, 6) सार्वजनिक सुरक्षा! 🗂️",
      suggestions: ["कौन सी श्रेणी सबसे ज्यादा पॉइंट्स देती है?", "गलत श्रेणी चुनने पर क्या होगा?", "नई श्रेणी सुझाव कैसे दें?"]
    }
  } : {
    "how to report an issue": {
      content: "To report an issue: 1) Click 'Report Issue' tab, 2) Fill basic information, 3) Select category and priority, 4) Add location and photos, 5) Review and submit. You'll earn points for every valid report! 🏆",
      suggestions: ["What categories are available?", "How long does review take?", "Can I edit my report?"]
    },
    "what happens after reporting": {
      content: "After submission: 1) Your report gets a unique ID, 2) Government officials review it within 24-48 hours, 3) It's assigned to relevant departments, 4) You receive progress updates, 5) You earn points when resolved! ✨",
      suggestions: ["How to track status?", "Who reviews my report?", "What if nothing happens?"]
    },
    "how to track my reports": {
      content: "To track your reports: 1) Go to 'My Reports' section, 2) View list of all submitted reports, 3) See current status of each report (Review, Progress, Resolved), 4) Check notifications for updates, 5) Claim points for resolved reports! 📊",
      suggestions: ["Can I edit my report?", "How long until resolution?", "What if my report gets rejected?"]
    },
    "how to earn points": {
      content: "Ways to earn points: 1) 10 points for reporting an issue, 2) 25 points when your report is resolved, 3) 2 points for voting on other reports, 4) 5 points for active community participation! 🎯",
      suggestions: ["What are points used for?", "What is the leaderboard?", "Do points expire?"]
    },
    "what are the categories": {
      content: "Our main categories: 1) Roads & Infrastructure, 2) Sanitation & Waste Management, 3) Water Supply & Drains, 4) Electricity & Street Lights, 5) Parks & Green Spaces, 6) Public Safety! 🗂️",
      suggestions: ["Which category gives the most points?", "What if I choose the wrong category?", "How to suggest a new category?"]
    }
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: t.howCanIHelp || (language === 'hi' ? 'मैं आपकी कैसे मदद कर सकता हूं?' : 'How can I help you?'),
      timestamp: new Date(),
      suggestions: quickQuestions.slice(0, 3)
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getBotResponse = (userMessage: string): { content: string; suggestions?: string[] } => {
    const normalizedMessage = userMessage.toLowerCase().trim();
    
    // Remove question marks and other punctuation for better matching
    const cleanMessage = normalizedMessage.replace(/[?.,]/g, '');
    
    // Check for exact matches first
    for (const [key, response] of Object.entries(botResponses)) {
      const cleanKey = key.toLowerCase().replace(/[?.,]/g, '');
      if (cleanMessage === cleanKey) {
        return response;
      }
    }
    
    // Check for partial matches
    for (const [key, response] of Object.entries(botResponses)) {
      const cleanKey = key.toLowerCase().replace(/[?.,]/g, '');
      if (cleanMessage.includes(cleanKey) || cleanKey.includes(cleanMessage)) {
        return response;
      }
    }
    
    // Check for keyword matches
    const keywords = language === 'hi' 
      ? ['रिपोर्ट', 'ट्रैक', 'पॉइंट', 'श्रेणी', 'मदद'] 
      : ['report', 'track', 'point', 'category', 'help'];
    
    for (const keyword of keywords) {
      if (cleanMessage.includes(keyword)) {
        // Return a relevant response based on the keyword
        if (keyword === 'report' || keyword === 'रिपोर्ट') {
          return botResponses[language === 'hi' ? 'मुद्दा कैसे रिपोर्ट करें' : 'how to report an issue'];
        } else if (keyword === 'track' || keyword === 'ट्रैक') {
          return botResponses[language === 'hi' ? 'अपनी रिपोर्ट कैसे ट्रैक करें' : 'how to track my reports'];
        } else if (keyword === 'point' || keyword === 'पॉइंट') {
          return botResponses[language === 'hi' ? 'पॉइंट्स कैसे कमाएं' : 'how to earn points'];
        } else if (keyword === 'category' || keyword === 'श्रेणी') {
          return botResponses[language === 'hi' ? 'विभिन्न श्रेणियां क्या हैं' : 'what are the categories'];
        }
      }
    }
    
    // Default response if no match found
    return {
      content: language === 'hi'
        ? "मैं आपकी मदद के लिए यहां हूं! यहां कुछ सामान्य प्रश्न हैं जिनका मैं जवाब दे सकता हूं, या CivicEye के उपयोग के बारे में कुछ भी पूछने के लिए स्वतंत्र महसूस करें। 🙋‍♂️"
        : "I'm here to help! Here are some common questions I can answer, or feel free to ask anything about using CivicEye. 🙋‍♂️",
      suggestions: quickQuestions.slice(0, 4)
    };
  };

  const sendMessage = (messageContent?: string) => {
    const content = messageContent || currentMessage.trim();
    if (!content) return;

    const userMessage: Message = { 
      id: Date.now(), 
      type: 'user', 
      content, 
      timestamp: new Date() 
    };
    
    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(content);
      const botMessage: Message = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse.content,
        timestamp: new Date(),
        suggestions: botResponse.suggestions
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setCurrentMessage(''); // Clear input field
    sendMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="fixed bottom-16 right-4 sm:bottom-20 sm:right-6 w-[350px] sm:w-96 h-[500px] flex flex-col glass-card neon-glow-hover z-50 animate-in slide-in-from-bottom-4 duration-300">
      <CardHeader className="pb-3 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div>
        <div className="flex items-center justify-between relative z-10">
          <CardTitle className="text-white flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-2 neon-blue animate-pulse">
              <Bot className="h-4 w-4 text-white animate-bounce" />
            </div>
            <div>
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {t.chatBot || (language === 'hi' ? 'चैट सहायक' : 'Chat Assistant')}
              </span>
              <div className="text-xs text-gray-400 font-normal">
                {language === 'hi' ? 'मुंबई AI सहायक' : 'Mumbai AI Assistant'}
              </div>
            </div>
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose} 
            className="text-gray-400 hover:text-white hover:bg-white/10 h-8 w-8 p-0 neon-glow-hover"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2 relative z-10 mt-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse neon-glow-hover"></div>
          <span className="text-sm text-gray-400">
            {language === 'hi' ? 'ऑनलाइन और मदद के लिए तैयार' : 'Online and ready to help'}
          </span>
          <Sparkles className="h-3 w-3 text-yellow-400 animate-pulse" />
        </div>
      </CardHeader>

      <CardContent className="p-0 flex flex-col flex-1">
        <ScrollArea className="flex-1 p-4 overflow-auto">
          <div className="flex flex-col space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="max-w-[85%]">
                  <div className={`p-3 rounded-lg break-words whitespace-normal ${msg.type === 'user' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white neon-blue hover:scale-105' : 'glass-card text-gray-100'}`}>
                    <p className="text-sm whitespace-normal break-words">{msg.content}</p>
                  </div>
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {msg.suggestions.map((s, i) => (
                        <Button 
                          key={i} 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleQuickQuestion(s)}
                          className="text-xs glass-card border-white/20 text-gray-300 hover:glass-card-hover hover:text-white break-words whitespace-normal min-h-[32px] max-w-full flex items-center gap-1"
                        >
                          <HelpCircle className="h-3 w-3 flex-shrink-0" /> 
                          {s}
                        </Button>
                      ))}
                    </div>
                  )}
                  <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    {msg.type === 'user' ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="glass-card p-3 rounded-lg max-w-[85%] flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce neon-blue"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce neon-purple" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <span className="text-sm text-gray-400">
                    {language === 'hi' ? 'सहायक टाइप कर रहा है...' : 'Assistant is typing...'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="px-4 py-2 border-t border-white/10 flex flex-col gap-2 glass-card">
          <div className="flex flex-wrap gap-1">
            {quickQuestions.slice(0, 2).map((q, i) => (
              <Badge 
                key={i} 
                variant="secondary" 
                onClick={() => handleQuickQuestion(q)}
                className="cursor-pointer text-xs bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30 neon-glow-hover break-words whitespace-normal max-w-full px-2 py-1 flex items-center gap-1"
              >
                <Zap className="h-3 w-3 animate-pulse flex-shrink-0" /> 
                {q}
              </Badge>
            ))}
          </div>
          <div className="flex space-x-2">
            <Input
              value={currentMessage}
              onChange={e => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t.typeMessage || (language === 'hi' ? 'संदेश टाइप करें...' : 'Type a message...')}
              disabled={isTyping}
              className="glass-card border-white/20 text-white placeholder-gray-400 focus:border-blue-500 focus:neon-blue break-words flex-1"
            />
            <Button 
              onClick={() => sendMessage()} 
              disabled={!currentMessage.trim() || isTyping}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 neon-glow-hover hover:scale-105"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
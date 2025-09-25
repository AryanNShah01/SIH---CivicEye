import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Building2, Users, Eye, Shield, MapPin, Moon, Sun, Zap, Sparkles, Cpu, Wifi, Lock, Smartphone, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageToggle } from './LanguageToggle';

interface LoginPageProps {
  onLogin: (userType: 'user' | 'government') => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function LoginPage({ onLogin, isDarkMode, onToggleDarkMode }: LoginPageProps) {
  const { language } = useLanguage();
  const [userLoginData, setUserLoginData] = useState({ email: '', password: '' });
  const [govLoginData, setGovLoginData] = useState({ govId: '', password: '' });
  const [activeTab, setActiveTab] = useState('user');
  const [showOTP, setShowOTP] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpUserType, setOtpUserType] = useState<'user' | 'government'>('user');
  const [otpStep, setOtpStep] = useState<'phone' | 'otp'>('phone');
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  // Generate floating particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 4,
      }));
      setParticles(newParticles);
    };
    generateParticles();
  }, []);

  const translations = {
    welcome: {
      en: 'Welcome to CivicEye',
      hi: 'सिविकआई में आपका स्वागत है'
    },
    subtitle: {
      en: 'Smart India Hackathon 2024 - Mumbai Smart City Initiative',
      hi: 'स्मार्ट इंडिया हैकथॉन 2024 - मुंबई स्मार्ट सिटी पहल'
    },
    userLogin: {
      en: 'Citizen Portal',
      hi: 'नागरिक पोर्टल'
    },
    govLogin: {
      en: 'Government Access',
      hi: 'सरकारी पहुंच'
    },
    userDesc: {
      en: 'Join Mumbai\'s digital transformation journey',
      hi: 'मुंबई की डिजिटल परिवर्तन यात्रा में शामिल हों'
    },
    govDesc: {
      en: 'Secure administrative access for officials',
      hi: 'अधिकारियों के लिए सुरक्षित प्रशासनिक पहुंच'
    },
    email: {
      en: 'Email / Username',
      hi: 'ईमेल / उपयोगकर्ता नाम'
    },
    govId: {
      en: 'Government ID',
      hi: 'सरकारी आईडी'
    },
    password: {
      en: 'Password',
      hi: 'पासवर्ड'
    },
    loginBtn: {
      en: 'Access Dashboard',
      hi: 'डैशबोर्ड तक पहुंचें'
    },
    poweredBy: {
      en: 'Powered by Mumbai Municipal Corporation',
      hi: 'मुंबई महानगर पालिका द्वारा संचालित'
    },
    secureLogin: {
      en: 'Secure Authentication',
      hi: 'सुरक्षित प्रमाणीकरण'
    },
    connecting: {
      en: 'Connecting to Smart City Network...',
      hi: 'स्मार्ट सिटी नेटवर्क से जुड़ रहे हैं...'
    },
    otpLogin: {
      en: 'Login with OTP',
      hi: 'OTP से लॉगिन करें'
    },
    phoneNumber: {
      en: 'Mobile Number',
      hi: 'मोबाइल नंबर'
    },
    sendOTP: {
      en: 'Send OTP',
      hi: 'OTP भेजें'
    },
    enterOTP: {
      en: 'Enter OTP',
      hi: 'OTP दर्ज करें'
    },
    otpSent: {
      en: 'OTP sent to your mobile',
      hi: 'आपके मोबाइल पर OTP भेजा गया'
    },
    verifyOTP: {
      en: 'Verify OTP',
      hi: 'OTP सत्यापित करें'
    },
    backToLogin: {
      en: 'Back to Login',
      hi: 'लॉगिन पर वापस'
    }
  };

  const handleUserLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userLoginData.email && userLoginData.password) {
      onLogin('user');
    }
  };

  const handleGovLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (govLoginData.govId && govLoginData.password) {
      onLogin('government');
    }
  };

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber) {
      setOtpStep('otp');
      // Here you would integrate with actual OTP service
    }
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length === 6) {
      onLogin(otpUserType);
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900'
        : 'bg-gradient-to-br from-blue-50 via-orange-50/30 to-green-50'
    }`}>
      {/* Indian Government Themed Background */}
      <div className="absolute inset-0">
        {/* Indian Tricolor inspired gradient orbs */}
        <div className={`absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl animate-pulse-neon ${
          isDarkMode
            ? 'bg-gradient-to-r from-orange-500/25 to-yellow-500/20'
            : 'bg-gradient-to-r from-orange-400/40 to-yellow-400/30'
        }`}></div>
        <div className={`absolute bottom-20 right-20 w-[500px] h-[500px] rounded-full blur-3xl animate-float ${
          isDarkMode
            ? 'bg-gradient-to-r from-blue-600/20 to-indigo-600/15'
            : 'bg-gradient-to-r from-blue-500/30 to-indigo-500/25'
        }`}></div>
        <div className={`absolute top-1/2 left-1/2 w-80 h-80 rounded-full blur-3xl animate-drift ${
          isDarkMode
            ? 'bg-gradient-to-r from-green-600/15 to-emerald-600/10'
            : 'bg-gradient-to-r from-green-500/25 to-emerald-500/20'
        }`}></div>
        
        {/* Government themed accent orbs */}
        <div className={`absolute top-1/4 right-1/4 w-64 h-64 rounded-full blur-2xl animate-float ${
          isDarkMode
            ? 'bg-gradient-to-r from-orange-400/20 to-amber-500/15'
            : 'bg-gradient-to-r from-orange-300/35 to-amber-400/25'
        }`} style={{ animationDelay: '2s' }}></div>
        <div className={`absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full blur-2xl animate-drift ${
          isDarkMode
            ? 'bg-gradient-to-r from-blue-700/15 to-indigo-700/10'
            : 'bg-gradient-to-r from-blue-400/25 to-indigo-400/20'
        }`} style={{ animationDelay: '1s' }}></div>
        
        {/* Additional patriotic colors */}
        <div className={`absolute top-10 right-1/3 w-48 h-48 rounded-full blur-2xl animate-float ${
          isDarkMode
            ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/15'
            : 'bg-gradient-to-r from-green-400/30 to-emerald-400/25'
        }`} style={{ animationDelay: '3s' }}></div>
        <div className={`absolute bottom-10 left-1/3 w-56 h-56 rounded-full blur-2xl animate-drift ${
          isDarkMode
            ? 'bg-gradient-to-r from-orange-600/15 to-yellow-600/10'
            : 'bg-gradient-to-r from-orange-400/30 to-yellow-400/20'
        }`} style={{ animationDelay: '4s' }}></div>
        <div className={`absolute top-1/3 left-10 w-40 h-40 rounded-full blur-xl animate-pulse-neon ${
          isDarkMode
            ? 'bg-gradient-to-r from-blue-500/25 to-indigo-500/20'
            : 'bg-gradient-to-r from-blue-400/35 to-indigo-400/30'
        }`} style={{ animationDelay: '1.5s' }}></div>
        <div className={`absolute bottom-1/3 right-10 w-44 h-44 rounded-full blur-xl animate-float ${
          isDarkMode
            ? 'bg-gradient-to-r from-green-700/20 to-teal-700/15'
            : 'bg-gradient-to-r from-green-500/30 to-teal-500/25'
        }`} style={{ animationDelay: '2.5s' }}></div>
      </div>

      {/* Ashoka Chakra inspired decorative elements */}
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${
        isDarkMode ? 'opacity-5' : 'opacity-8'
      }`}>
        <div className={`absolute top-1/4 left-1/4 w-32 h-32 border-4 rounded-full animate-spin ${
          isDarkMode ? 'border-blue-600' : 'border-blue-700'
        }`} style={{ animationDuration: '20s' }}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-24 h-24 border-2 rounded-full animate-spin ${
          isDarkMode ? 'border-orange-500' : 'border-orange-600'
        }`} style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
        <div className={`absolute top-1/2 right-1/3 w-16 h-16 border-2 rounded-full animate-spin ${
          isDarkMode ? 'border-green-600' : 'border-green-700'
        }`} style={{ animationDuration: '25s' }}></div>
      </div>

      {/* Recognizable Indian Monuments Silhouettes */}
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${
        isDarkMode ? 'opacity-20' : 'opacity-35'
      }`}>
        {/* Taj Mahal - Center background (most iconic) */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 scale-75 opacity-90">
          <svg width="280" height="200" viewBox="0 0 280 200" className={
            isDarkMode ? 'fill-white/25' : 'fill-slate-800/40'
          }>
            {/* Main dome */}
            <circle cx="140" cy="70" r="50"/>
            {/* Main building */}
            <rect x="90" y="110" width="100" height="90"/>
            {/* Central arch */}
            <path d="M115 110 Q115 90 140 90 Q165 90 165 110 Z" className={
              isDarkMode ? 'fill-slate-900/30' : 'fill-white/60'
            }/>
            {/* Spire on top */}
            <polygon points="140,20 135,50 145,50"/>
            <circle cx="140" cy="18" r="3"/>
            
            {/* Four corner minarets */}
            <rect x="60" y="80" width="12" height="120"/>
            <rect x="208" y="80" width="12" height="120"/>
            <rect x="30" y="95" width="12" height="105"/>
            <rect x="238" y="95" width="12" height="105"/>
            
            {/* Minaret tops */}
            <circle cx="66" cy="75" r="8"/>
            <circle cx="214" cy="75" r="8"/>
            <circle cx="36" cy="90" r="6"/>
            <circle cx="244" cy="90" r="6"/>
            
            {/* Side buildings */}
            <rect x="40" y="130" width="40" height="70"/>
            <rect x="200" y="130" width="40" height="70"/>
            
            {/* Decorative elements */}
            <rect x="110" y="140" width="60" height="3" className={
              isDarkMode ? 'fill-white/40' : 'fill-slate-700/50'
            }/>
            <rect x="115" y="150" width="50" height="2" className={
              isDarkMode ? 'fill-white/30' : 'fill-slate-600/40'
            }/>
            <circle cx="140" cy="130" r="8" className={
              isDarkMode ? 'fill-blue-400/50' : 'fill-blue-600/60'
            }/>
          </svg>
        </div>

        {/* Gateway of India (Mumbai) - Left side */}
        <div className="absolute bottom-0 left-12 transform scale-90 opacity-80">
          <svg width="140" height="180" viewBox="0 0 140 180" className={
            isDarkMode ? 'fill-orange-400/40' : 'fill-orange-700/50'
          }>
            {/* Main arch structure */}
            <rect x="20" y="180" width="100" height="20" className={
              isDarkMode ? 'fill-slate-800/30' : 'fill-slate-900/50'
            }/>
            <rect x="15" y="50" width="110" height="130"/>
            
            {/* Central arch */}
            <path d="M35 50 Q35 25 70 25 Q105 25 105 50 L105 180 L35 180 Z"/>
            <path d="M45 55 Q45 35 70 35 Q95 35 95 55 L95 175 L45 175 Z" className={
              isDarkMode ? 'fill-slate-900/40' : 'fill-white/70'
            }/>
            
            {/* Side towers */}
            <rect x="5" y="70" width="15" height="110"/>
            <rect x="120" y="70" width="15" height="110"/>
            
            {/* Decorative elements */}
            <rect x="25" y="90" width="90" height="4" className={
              isDarkMode ? 'fill-white/40' : 'fill-slate-700/50'
            }/>
            <rect x="30" y="100" width="80" height="3" className={
              isDarkMode ? 'fill-white/30' : 'fill-slate-600/40'
            }/>
            <rect x="35" y="110" width="70" height="2" className={
              isDarkMode ? 'fill-white/25' : 'fill-slate-500/30'
            }/>
            
            {/* Top details */}
            <polygon points="70,15 60,30 80,30"/>
            <circle cx="70" cy="65" r="12" className={
              isDarkMode ? 'fill-blue-500/50' : 'fill-blue-700/60'
            }/>
          </svg>
        </div>

        {/* India Gate - Right side */}
        <div className="absolute bottom-0 right-12 transform scale-85 opacity-80">
          <svg width="120" height="160" viewBox="0 0 120 160" className={
            isDarkMode ? 'fill-green-500/40' : 'fill-green-700/50'
          }>
            {/* Base */}
            <rect x="10" y="160" width="100" height="15" className={
              isDarkMode ? 'fill-slate-800/40' : 'fill-slate-900/50'
            }/>
            
            {/* Main structure */}
            <rect x="20" y="50" width="80" height="110"/>
            
            {/* Central arch */}
            <path d="M40 50 Q40 30 60 30 Q80 30 80 50 L80 160 L40 160 Z"/>
            <path d="M45 55 Q45 40 60 40 Q75 40 75 55 L75 155 L45 155 Z" className={
              isDarkMode ? 'fill-slate-900/40' : 'fill-white/70'
            }/>
            
            {/* Top structure */}
            <polygon points="60,15 35,50 85,50"/>
            <rect x="50" y="20" width="20" height="30"/>
            
            {/* Memorial flame */}
            <circle cx="60" cy="35" r="4" className={
              isDarkMode ? 'fill-orange-400/80' : 'fill-orange-600/90'
            }/>
            
            {/* Decorative bands */}
            <rect x="25" y="80" width="70" height="3" className={
              isDarkMode ? 'fill-white/40' : 'fill-slate-700/50'
            }/>
            <rect x="30" y="90" width="60" height="2" className={
              isDarkMode ? 'fill-white/30' : 'fill-slate-600/40'
            }/>
            <rect x="35" y="100" width="50" height="2" className={
              isDarkMode ? 'fill-white/25' : 'fill-slate-500/30'
            }/>
          </svg>
        </div>

        {/* Red Fort - Far right */}
        <div className="absolute bottom-0 right-2 transform scale-70 opacity-70">
          <svg width="110" height="140" viewBox="0 0 110 140" className={
            isDarkMode ? 'fill-red-500/45' : 'fill-red-700/55'
          }>
            {/* Main wall */}
            <rect x="10" y="70" width="90" height="70"/>
            
            {/* Ramparts and towers */}
            <rect x="15" y="50" width="20" height="90"/>
            <rect x="40" y="45" width="15" height="95"/>
            <rect x="60" y="40" width="20" height="100"/>
            <rect x="85" y="50" width="15" height="90"/>
            
            {/* Merlons (crenellations) */}
            <rect x="12" y="45" width="4" height="10"/>
            <rect x="18" y="45" width="4" height="10"/>
            <rect x="24" y="45" width="4" height="10"/>
            <rect x="30" y="45" width="4" height="10"/>
            
            {/* Arched doorway */}
            <path d="M45 70 Q45 55 55 55 Q65 55 65 70 L65 140 L45 140 Z" className={
              isDarkMode ? 'fill-slate-900/50' : 'fill-white/80'
            }/>
            
            {/* Decorative elements */}
            <rect x="20" y="80" width="70" height="3" className={
              isDarkMode ? 'fill-white/40' : 'fill-slate-700/50'
            }/>
            <rect x="25" y="90" width="60" height="2" className={
              isDarkMode ? 'fill-white/30' : 'fill-slate-600/40'
            }/>
          </svg>
        </div>

        {/* Lotus Temple - Far left */}
        <div className="absolute bottom-0 left-2 transform scale-65 opacity-65">
          <svg width="100" height="120" viewBox="0 0 100 120" className={
            isDarkMode ? 'fill-pink-400/35' : 'fill-pink-600/45'
          }>
            {/* Main lotus petals */}
            <path d="M50 30 Q25 35 15 70 Q25 90 50 100 Q75 90 85 70 Q75 35 50 30 Z"/>
            <path d="M50 35 Q30 40 25 65 Q30 80 50 90 Q70 80 75 65 Q70 40 50 35 Z" className={
              isDarkMode ? 'fill-white/25' : 'fill-slate-700/40'
            }/>
            <path d="M50 40 Q35 43 32 60 Q35 72 50 80 Q65 72 68 60 Q65 43 50 40 Z" className={
              isDarkMode ? 'fill-pink-300/30' : 'fill-pink-400/40'
            }/>
            
            {/* Outer petals */}
            <path d="M20 75 Q15 60 25 50 Q35 60 30 75 Z" className={
              isDarkMode ? 'fill-white/20' : 'fill-slate-600/30'
            }/>
            <path d="M80 75 Q85 60 75 50 Q65 60 70 75 Z" className={
              isDarkMode ? 'fill-white/20' : 'fill-slate-600/30'
            }/>
            <path d="M35 95 Q25 85 30 75 Q40 85 35 95 Z" className={
              isDarkMode ? 'fill-white/15' : 'fill-slate-500/25'
            }/>
            <path d="M65 95 Q75 85 70 75 Q60 85 65 95 Z" className={
              isDarkMode ? 'fill-white/15' : 'fill-slate-500/25'
            }/>
            
            {/* Base */}
            <rect x="30" y="100" width="40" height="20"/>
          </svg>
        </div>

        {/* Qutub Minar - Left center */}
        <div className="absolute bottom-0 left-1/3 transform scale-60 opacity-60">
          <svg width="50" height="140" viewBox="0 0 50 140" className={
            isDarkMode ? 'fill-amber-400/40' : 'fill-amber-600/50'
          }>
            {/* Main tower (tapered) */}
            <polygon points="20,140 15,20 35,20 30,140"/>
            
            {/* Horizontal bands */}
            <rect x="15" y="30" width="20" height="2" className={
              isDarkMode ? 'fill-white/30' : 'fill-slate-700/50'
            }/>
            <rect x="16" y="50" width="18" height="2" className={
              isDarkMode ? 'fill-white/30' : 'fill-slate-700/50'
            }/>
            <rect x="17" y="70" width="16" height="2" className={
              isDarkMode ? 'fill-white/30' : 'fill-slate-700/50'
            }/>
            <rect x="18" y="90" width="14" height="2" className={
              isDarkMode ? 'fill-white/30' : 'fill-slate-700/50'
            }/>
            <rect x="19" y="110" width="12" height="2" className={
              isDarkMode ? 'fill-white/30' : 'fill-slate-700/50'
            }/>
            <rect x="20" y="130" width="10" height="2" className={
              isDarkMode ? 'fill-white/30' : 'fill-slate-700/50'
            }/>
            
            {/* Top dome */}
            <circle cx="25" cy="18" r="8"/>
            <polygon points="25,10 23,18 27,18"/>
          </svg>
        </div>
      </div>

      {/* Indian architectural patterns */}
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${
        isDarkMode ? 'opacity-5' : 'opacity-8'
      }`}>
        {/* Mandala-inspired pattern - top left */}
        <div className="absolute top-20 left-20">
          <svg width="100" height="100" viewBox="0 0 100 100" className={
            isDarkMode ? 'fill-none stroke-orange-400 stroke-1' : 'fill-none stroke-orange-600 stroke-1'
          }>
            <circle cx="50" cy="50" r="40"/>
            <circle cx="50" cy="50" r="25"/>
            <circle cx="50" cy="50" r="10"/>
            <path d="M50 10 L50 90 M10 50 L90 50 M25 25 L75 75 M75 25 L25 75"/>
          </svg>
        </div>

        {/* Traditional Indian arch pattern - top right */}
        <div className="absolute top-16 right-24">
          <svg width="80" height="60" viewBox="0 0 80 60" className={
            isDarkMode ? 'fill-none stroke-green-500 stroke-1' : 'fill-none stroke-green-700 stroke-1'
          }>
            <path d="M10 60 Q10 20 40 20 Q70 20 70 60"/>
            <path d="M15 55 Q15 25 40 25 Q65 25 65 55"/>
            <circle cx="40" cy="35" r="3" className={
              isDarkMode ? 'fill-blue-400/60' : 'fill-blue-600/80'
            }/>
          </svg>
        </div>

        {/* Paisley pattern - bottom left */}
        <div className="absolute bottom-32 left-16">
          <svg width="60" height="80" viewBox="0 0 60 80" className={
            isDarkMode ? 'fill-blue-400/20' : 'fill-blue-600/30'
          }>
            <path d="M30 10 Q50 20 50 40 Q50 60 30 70 Q10 60 10 40 Q10 20 30 10 Z"/>
            <path d="M30 20 Q40 25 40 40 Q40 55 30 60 Q20 55 20 40 Q20 25 30 20 Z" className={
              isDarkMode ? 'fill-white/10' : 'fill-slate-700/20'
            }/>
          </svg>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`absolute w-1 h-1 rounded-full opacity-70 animate-float ${
              isDarkMode 
                ? 'bg-gradient-to-r from-blue-400 to-cyan-400' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600'
            }`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Geometric Grid Pattern */}
      <div className={`absolute inset-0 ${isDarkMode ? 'opacity-5' : 'opacity-8'}`}>
        <div className="absolute inset-0" style={{
          backgroundImage: isDarkMode ? `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          ` : `
            linear-gradient(rgba(71, 85, 105, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(71, 85, 105, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Header with Controls */}
<div className="absolute top-6 right-6 flex items-center gap-3 z-50">
  <LanguageToggle isDarkMode={isDarkMode} />
  <Button
    variant="outline"
    size="icon"
    onClick={onToggleDarkMode}
    className="glass-card border-white/20 hover:glass-card-hover transition-all duration-300"
  >
    {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
  </Button>
</div>

      {/* Indian Government Base - Tricolor foundation */}
      <div className="absolute bottom-0 left-0 right-0 h-3 overflow-hidden pointer-events-none z-5">
        <div className="h-full flex">
          <div className="flex-1 bg-gradient-to-r from-orange-500/70 to-orange-400/50"></div>
          <div className="flex-1 bg-gradient-to-r from-white/40 to-white/30"></div>
          <div className="flex-1 bg-gradient-to-r from-green-600/70 to-green-500/50"></div>
        </div>
        {/* Ashoka Chakra in center */}
        <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-3 h-3 border border-blue-600/60 rounded-full bg-white/20"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative">
              <h1 className="text-4xl mb-6 font-bold relative">
                <span className={`font-semibold tracking-wide ${
                  isDarkMode 
                    ? 'text-white drop-shadow-2xl' 
                    : 'text-slate-800 drop-shadow-lg'
                }`}>
                  {translations.welcome[language]}
                </span>
              </h1>
            </div>
          </div>

          {/* Enhanced Login Card with Multi-layer Glass Effect */}
          <Card className="glass-card border-white/20 backdrop-blur-xl relative overflow-hidden group">
            {/* Animated border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
            
            <CardHeader className="text-center relative z-10">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Lock className="h-5 w-5 text-green-400 animate-pulse" />
                <CardTitle className={`text-lg ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'
                    : 'text-slate-800'
                }`}>
                  {translations.secureLogin[language]}
                </CardTitle>
                <Lock className="h-5 w-5 text-green-400 animate-pulse" />
              </div>
            </CardHeader>
            
            <CardContent className="relative z-10">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 glass-card border-white/10 mb-6 relative overflow-hidden">
                  {/* Sliding indicator */}
                  <div 
                    className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-r transition-all duration-300 rounded-md ${
                      activeTab === 'user' 
                        ? 'left-1 from-blue-500/30 to-cyan-500/30' 
                        : 'left-[calc(50%+2px)] from-purple-500/30 to-pink-500/30'
                    }`}
                  />
                  
                  <TabsTrigger 
                    value="user" 
                    className="relative z-10 data-[state=active]:bg-transparent data-[state=active]:text-blue-300 transition-all duration-300"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    {translations.userLogin[language]}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="government"
                    className={`relative z-10 data-[state=active]:bg-transparent transition-all duration-300 ${
                      isDarkMode 
                        ? 'data-[state=active]:text-orange-300' 
                        : 'data-[state=active]:text-orange-600'
                    }`}
                  >
                    <Building2 className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">{translations.govLogin[language]}</span>
                    <span className="sm:hidden">Gov</span>
                  </TabsTrigger>
                </TabsList>

                {/* User Login */}
                <TabsContent value="user" className="space-y-4 animate-in fade-in slide-in-from-left duration-300">
                  <div className={`text-center mb-4 p-3 glass-card rounded-lg border ${
                    isDarkMode ? 'border-blue-500/20' : 'border-blue-600/30'
                  }`}>
                    <CardDescription className={`flex items-center justify-center gap-2 ${
                      isDarkMode ? 'text-blue-300' : 'text-blue-700'
                    }`}>
                      <Users className="h-4 w-4" />
                      {translations.userDesc[language]}
                    </CardDescription>
                  </div>
                  
                  {/* Login method toggle */}
                  <div className="flex gap-2 mb-4">
                    <Button
                      type="button"
                      variant={!showOTP ? "default" : "outline"}
                      size="sm"
                      onClick={() => { setShowOTP(false); setOtpUserType('user'); setOtpStep('phone'); }}
                      className="flex-1 transition-all duration-300"
                    >
                      <Lock className="h-4 w-4 mr-1" />
                      Password
                    </Button>
                    <Button
                      type="button"
                      variant={showOTP ? "default" : "outline"}
                      size="sm"
                      onClick={() => { setShowOTP(true); setOtpUserType('user'); setOtpStep('phone'); }}
                      className="flex-1 transition-all duration-300"
                    >
                      <Smartphone className="h-4 w-4 mr-1" />
                      OTP
                    </Button>
                  </div>

                  {!showOTP || otpUserType !== 'user' ? (
                    <form onSubmit={handleUserLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="user-email" className="text-sm flex items-center gap-2">
                          <Users className="h-4 w-4 text-blue-400" />
                          {translations.email[language]}
                        </Label>
                        <Input
                          id="user-email"
                          type="email"
                          placeholder="rahul.sharma@gmail.com"
                          value={userLoginData.email}
                          onChange={(e) => setUserLoginData(prev => ({ ...prev, email: e.target.value }))}
                          className="glass-card border-white/20 focus:border-blue-400 focus:ring-blue-400/50 backdrop-blur-sm transition-all duration-300 hover:border-blue-300/50"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="user-password" className="text-sm flex items-center gap-2">
                          <Lock className="h-4 w-4 text-blue-400" />
                          {translations.password[language]}
                        </Label>
                        <Input
                          id="user-password"
                          type="password"
                          placeholder="••••••••"
                          value={userLoginData.password}
                          onChange={(e) => setUserLoginData(prev => ({ ...prev, password: e.target.value }))}
                          className="glass-card border-white/20 focus:border-blue-400 focus:ring-blue-400/50 backdrop-blur-sm transition-all duration-300 hover:border-blue-300/50"
                          required
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 transition-all duration-300 hover:scale-105 relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        <Users className="h-4 w-4 mr-2" />
                        {translations.loginBtn[language]}
                      </Button>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      {otpStep === 'phone' ? (
                        <form onSubmit={handleSendOTP} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="user-phone" className="text-sm flex items-center gap-2">
                              <Smartphone className="h-4 w-4 text-blue-400" />
                              {translations.phoneNumber[language]}
                            </Label>
                            <Input
                              id="user-phone"
                              type="tel"
                              placeholder="+91 98765 43210"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              className="glass-card border-white/20 focus:border-blue-400 focus:ring-blue-400/50 backdrop-blur-sm transition-all duration-300 hover:border-blue-300/50"
                              required
                            />
                          </div>
                          <Button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 transition-all duration-300 hover:scale-105"
                          >
                            <Smartphone className="h-4 w-4 mr-2" />
                            {translations.sendOTP[language]}
                          </Button>
                        </form>
                      ) : (
                        <form onSubmit={(e) => { e.preventDefault(); if (otpCode.length === 6) onLogin('user'); }} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="user-otp" className="text-sm flex items-center gap-2">
                              <Lock className="h-4 w-4 text-blue-400" />
                              {translations.enterOTP[language]}
                            </Label>
                            <Input
                              id="user-otp"
                              type="text"
                              placeholder="123456"
                              value={otpCode}
                              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                              className="glass-card border-white/20 focus:border-blue-400 focus:ring-blue-400/50 backdrop-blur-sm transition-all duration-300 text-center text-lg tracking-widest"
                              required
                              maxLength={6}
                            />
                            <p className="text-xs text-muted-foreground text-center">
                              OTP sent to +91 {phoneNumber.slice(-4).padStart(10, '*')}
                            </p>
                          </div>
                          <div className="flex gap-3">
                            <Button 
                              type="button"
                              variant="outline"
                              onClick={() => setOtpStep('phone')}
                              className="flex-1 glass-card border-white/20"
                            >
                              Back
                            </Button>
                            <Button 
                              type="submit" 
                              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                              disabled={otpCode.length !== 6}
                            >
                              Verify & Login
                            </Button>
                          </div>
                        </form>
                      )}
                    </div>
                  )}
                </TabsContent>

                {/* Government Login */}
                <TabsContent value="government" className="space-y-4 animate-in fade-in slide-in-from-right duration-300">
                  <div className={`text-center mb-4 p-3 glass-card rounded-lg border ${
                    isDarkMode ? 'border-orange-500/20' : 'border-orange-600/30'
                  }`}>
                    <CardDescription className={`flex items-center justify-center gap-2 ${
                      isDarkMode ? 'text-orange-300' : 'text-orange-700'
                    }`}>
                      <Building2 className="h-4 w-4" />
                      {translations.govDesc[language]}
                    </CardDescription>
                  </div>
                  
                  {/* Login method toggle */}
                  <div className="flex gap-2 mb-4">
                    <Button
                      type="button"
                      variant={!showOTP ? "default" : "outline"}
                      size="sm"
                      onClick={() => { setShowOTP(false); setOtpUserType('government'); setOtpStep('phone'); }}
                      className="flex-1 transition-all duration-300"
                    >
                      <Shield className="h-4 w-4 mr-1" />
                      Credentials
                    </Button>
                    <Button
                      type="button"
                      variant={showOTP ? "default" : "outline"}
                      size="sm"
                      onClick={() => { setShowOTP(true); setOtpUserType('government'); setOtpStep('phone'); }}
                      className="flex-1 transition-all duration-300"
                    >
                      <Smartphone className="h-4 w-4 mr-1" />
                      OTP
                    </Button>
                  </div>

                  {!showOTP || otpUserType !== 'government' ? (
                    <form onSubmit={handleGovLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="gov-id" className="text-sm flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-purple-400" />
                          {translations.govId[language]}
                        </Label>
                        <Input
                          id="gov-id"
                          type="text"
                          placeholder="BMC2024001"
                          value={govLoginData.govId}
                          onChange={(e) => setGovLoginData(prev => ({ ...prev, govId: e.target.value }))}
                          className="glass-card border-white/20 focus:border-purple-400 focus:ring-purple-400/50 backdrop-blur-sm transition-all duration-300 hover:border-purple-300/50"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gov-password" className="text-sm flex items-center gap-2">
                          <Lock className="h-4 w-4 text-purple-400" />
                          {translations.password[language]}
                        </Label>
                        <Input
                          id="gov-password"
                          type="password"
                          placeholder="••••••••"
                          value={govLoginData.password}
                          onChange={(e) => setGovLoginData(prev => ({ ...prev, password: e.target.value }))}
                          className="glass-card border-white/20 focus:border-purple-400 focus:ring-purple-400/50 backdrop-blur-sm transition-all duration-300 hover:border-purple-300/50"
                          required
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 transition-all duration-300 hover:scale-105 relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        <Building2 className="h-4 w-4 mr-2" />
                        {translations.loginBtn[language]}
                      </Button>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      {otpStep === 'phone' ? (
                        <form onSubmit={handleSendOTP} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="gov-phone" className="text-sm flex items-center gap-2">
                              <Smartphone className="h-4 w-4 text-purple-400" />
                              Government Mobile Number
                            </Label>
                            <Input
                              id="gov-phone"
                              type="tel"
                              placeholder="+91 98765 43210 (Govt Registered)"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              className="glass-card border-white/20 focus:border-purple-400 focus:ring-purple-400/50 backdrop-blur-sm transition-all duration-300 hover:border-purple-300/50"
                              required
                            />
                          </div>
                          <Button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 transition-all duration-300 hover:scale-105"
                          >
                            <Smartphone className="h-4 w-4 mr-2" />
                            Send Government OTP
                          </Button>
                        </form>
                      ) : (
                        <form onSubmit={(e) => { e.preventDefault(); if (otpCode.length === 6) onLogin('government'); }} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="gov-otp" className="text-sm flex items-center gap-2">
                              <Lock className="h-4 w-4 text-purple-400" />
                              Government OTP Code
                            </Label>
                            <Input
                              id="gov-otp"
                              type="text"
                              placeholder="123456"
                              value={otpCode}
                              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                              className="glass-card border-white/20 focus:border-purple-400 focus:ring-purple-400/50 backdrop-blur-sm transition-all duration-300 text-center text-lg tracking-widest"
                              required
                              maxLength={6}
                            />
                            <p className="text-xs text-muted-foreground text-center">
                              Government OTP sent to +91 {phoneNumber.slice(-4).padStart(10, '*')}
                            </p>
                          </div>
                          <div className="flex gap-3">
                            <Button 
                              type="button"
                              variant="outline"
                              onClick={() => setOtpStep('phone')}
                              className="flex-1 glass-card border-white/20"
                            >
                              Back
                            </Button>
                            <Button 
                              type="submit" 
                              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                              disabled={otpCode.length !== 6}
                            >
                              Verify & Login
                            </Button>
                          </div>
                        </form>
                      )}
                    </div>
                  )}
                </TabsContent>


              </Tabs>
            </CardContent>
          </Card>

          {/* Enhanced Footer with Mumbai Pride */}
          <div className="text-center mt-6 space-y-3">
            <div className="flex items-center justify-center gap-2 glass-card p-3 rounded-lg">
              <MapPin className="h-4 w-4 text-orange-400" />
              <p className="text-xs text-muted-foreground">
                {translations.poweredBy[language]}
              </p>
            </div>
            
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Mumbai, Maharashtra</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>भारत</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
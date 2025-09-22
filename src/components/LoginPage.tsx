import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Building2, Users, Lock, Smartphone, Moon, Sun, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageToggle } from './LanguageToggle';

interface LoginPageProps {
  onLogin: (userType: 'user' | 'government') => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function LoginPage({ onLogin, isDarkMode, onToggleDarkMode }: LoginPageProps) {
  const { language } = useLanguage();

  const [activeTab, setActiveTab] = useState<'user' | 'government'>('user');
  const [showOTP, setShowOTP] = useState(false);
  const [otpStep, setOtpStep] = useState<'phone' | 'otp'>('phone');

  const [userLoginData, setUserLoginData] = useState({ email: '', password: '' });
  const [govLoginData, setGovLoginData] = useState({ govId: '', password: '' });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');

  // Particles (optional)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  useEffect(() => {
    setParticles(Array.from({ length: 50 }, (_, i) => ({ id: i, x: Math.random() * 100, y: Math.random() * 100, delay: Math.random() * 4 })));
  }, []);

  const translations = {
    welcome: { en: 'Welcome to CivicEye', hi: 'सिविकआई में आपका स्वागत है' },
    userLogin: { en: 'Citizen Portal', hi: 'नागरिक पोर्टल' },
    govLogin: { en: 'Government Access', hi: 'सरकारी पहुंच' },
    userDesc: { en: "Join Mumbai's digital transformation journey", hi: 'मुंबई की डिजिटल परिवर्तन यात्रा में शामिल हों' },
    govDesc: { en: 'Secure administrative access for officials', hi: 'अधिकारियों के लिए सुरक्षित प्रशासनिक पहुंच' },
    email: { en: 'Email / Username', hi: 'ईमेल / उपयोगकर्ता नाम' },
    govId: { en: 'Government ID', hi: 'सरकारी आईडी' },
    password: { en: 'Password', hi: 'पासवर्ड' },
    loginBtn: { en: 'Access Dashboard', hi: 'डैशबोर्ड तक पहुंचें' },
    poweredBy: { en: 'Powered by Mumbai Municipal Corporation', hi: 'मुंबई महानगर पालिका द्वारा संचालित' },
    phoneNumber: { en: 'Mobile Number', hi: 'मोबाइल नंबर' },
    sendOTP: { en: 'Send OTP', hi: 'OTP भेजें' },
    enterOTP: { en: 'Enter OTP', hi: 'OTP दर्ज करें' },
  };

  const handleUserLogin = (e: React.FormEvent) => { e.preventDefault(); if (userLoginData.email && userLoginData.password) onLogin('user'); };
  const handleGovLogin = (e: React.FormEvent) => { e.preventDefault(); if (govLoginData.govId && govLoginData.password) onLogin('government'); };
  const handleSendOTP = (e: React.FormEvent) => { e.preventDefault(); if (phoneNumber) setOtpStep('otp'); };
  const handleVerifyOTP = (e: React.FormEvent) => { e.preventDefault(); if (otpCode.length === 6) onLogin(activeTab); };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      
      {/* Floating Particles */}
      {particles.map(p => (
        <div key={p.id} className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-70 animate-float"
          style={{ left: `${p.x}%`, top: `${p.y}%`, animationDelay: `${p.delay}s`, animationDuration: `${4 + Math.random() * 2}s` }} />
      ))}

      {/* Header */}
      <div className="absolute top-6 right-6 flex items-center gap-3 z-50">
        <LanguageToggle />
        <Button variant="outline" size="icon" onClick={onToggleDarkMode}>
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>

      {/* Main Login Card */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto text-center space-y-6">
          <h1 className="text-4xl font-bold text-white">{translations.welcome[language]}</h1>

          <Card className="glass-card border-white/20 backdrop-blur-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-lg text-white">Secure Login</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                {/* <TabsList className="flex justify-center mb-4 space-x-6 w-full">
                        <TabsTrigger
                            value="user"
                            className="text-center hover:bg-purple-600 hover:text-white transition-colors duration-200 rounded-lg"
                        >
                            {translations.userLogin[language]}
                        </TabsTrigger>
                        <TabsTrigger
                            value="government"
                            className="text-center hover:bg-purple-600 hover:text-white transition-colors duration-200 rounded-lg"
                        >
                            {translations.govLogin[language]}
                        </TabsTrigger>
                </TabsList> */}

                <TabsList className="flex justify-center mb-4 space-x-6 w-full bg-white p-2 rounded-lg">
                    <TabsTrigger
                        value="user"
                        className="text-center text-gray-800 rounded-lg px-4 py-2 hover:bg-purple-600 hover:text-white data-[state=active]:bg-purple-600 data-[state=active]:text-white transition-colors duration-200"
                    >
                        {translations.userLogin[language]}
                    </TabsTrigger>
                    <TabsTrigger
                        value="government"
                        className="text-center text-gray-800 rounded-lg px-4 py-2 hover:bg-purple-600 hover:text-white data-[state=active]:bg-purple-600 data-[state=active]:text-white transition-colors duration-200"
                    >
                        {translations.govLogin[language]}
                    </TabsTrigger>
                </TabsList>
                    



                {/* User Tab */}
                <TabsContent value="user" className="space-y-4">
                  <p className="text-blue-300">{translations.userDesc[language]}</p>

                  {/* Toggle password / OTP */}
                  <div className="flex gap-2">
                    <Button variant={!showOTP ? "default" : "outline"} onClick={() => { setShowOTP(false); setOtpStep('phone'); }}>Password</Button>
                    <Button variant={showOTP ? "default" : "outline"} onClick={() => { setShowOTP(true); setOtpStep('phone'); }}>OTP</Button>
                  </div>

                  {!showOTP ? (
                    <form onSubmit={handleUserLogin} className="space-y-4">
                      <div>
                        <Label htmlFor="email">{translations.email[language]}</Label>
                        <Input
                            id="email"
                            type="email"
                            className="text-black"
                            value={userLoginData.email}
                            onChange={e => setUserLoginData({ ...userLoginData, email: e.target.value })}
                            required
                        />
                      </div>
                      <div>
                        <Label htmlFor="password">{translations.password[language]}</Label>
                        <Input id="password" type="password" className = "passwordinput" value={userLoginData.password} onChange={e => setUserLoginData({ ...userLoginData, password: e.target.value })} required />
                      </div>
                      <Button type="submit">{translations.loginBtn[language]}</Button>
                    </form>
                  ) : otpStep === 'phone' ? (
                    <form onSubmit={handleSendOTP}>
                      <Label htmlFor="phone">{translations.phoneNumber[language]}</Label>
                      <Input id="phone" type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required />
                      <Button type="submit">{translations.sendOTP[language]}</Button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyOTP}>
                      <Label htmlFor="otp">{translations.enterOTP[language]}</Label>
                      <Input id="otp" type="text" value={otpCode} onChange={e => setOtpCode(e.target.value.replace(/\D/g,'').slice(0,6))} required maxLength={6} />
                      <Button type="submit" disabled={otpCode.length !== 6}>Verify & Login</Button>
                    </form>
                  )}
                </TabsContent>

                {/* Government Tab */}
                <TabsContent value="government" className="space-y-4">
                  <p className="text-purple-300">{translations.govDesc[language]}</p>
                  <div className="flex gap-2">
                    <Button variant={!showOTP ? "default" : "outline"} onClick={() => { setShowOTP(false); setOtpStep('phone'); }}>Credentials</Button>
                    <Button variant={showOTP ? "default" : "outline"} onClick={() => { setShowOTP(true); setOtpStep('phone'); }}>OTP</Button>
                  </div>

                  {!showOTP ? (
                    <form onSubmit={handleGovLogin} className="space-y-4">
                      <Label htmlFor="govId">{translations.govId[language]}</Label>
                       <Input
                            id="govId"
                            type="text"
                            className="text-black"
                            value={govLoginData.govId}
                            onChange={e => setGovLoginData({ ...govLoginData, govId: e.target.value })}
                            required
                        />
                      <Label htmlFor="govPassword">{translations.password[language]}</Label>
                       <Input
                            id="govPassword"
                            type="password"
                            className="password-input text-black"
                            value={govLoginData.password}
                            onChange={e => setGovLoginData({ ...govLoginData, password: e.target.value })}
                            required
                        />
                      <Button type="submit">{translations.loginBtn[language]}</Button>
                    </form>
                  ) : otpStep === 'phone' ? (
                    <form onSubmit={handleSendOTP}>
                      <Label htmlFor="govPhone">Government Mobile Number</Label>
                      <Input id="govPhone" type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required />
                      <Button type="submit">Send OTP</Button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyOTP}>
                      <Label htmlFor="govOtp">OTP Code</Label>
                      <Input id="govOtp" type="text" value={otpCode} onChange={e => setOtpCode(e.target.value.replace(/\D/g,'').slice(0,6))} required maxLength={6} />
                      <Button type="submit" disabled={otpCode.length !== 6}>Verify & Login</Button>
                    </form>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-6 text-xs text-muted-foreground">
            <MapPin className="inline-block mr-1 h-4 w-4 text-orange-400" />
            {translations.poweredBy[language]}
          </div>
        </div>
      </div>
    </div>
  );
}
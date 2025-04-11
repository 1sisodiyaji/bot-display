import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Ratio,
  Sunset,
  Zap,
  AudioLines,
  FileCheck2,
  Phone,
  UserCheck,
  VideoIcon,
  PartyPopper,
  Sparkle,
  Star,
  CalendarDays,
} from 'lucide-react';
import ReactDOM from 'react-dom';

// Theming constants
const theme = {
  background: 'bg-gradient-to-br from-white via-blue-300 to-amber-300',
  card: 'bg-white/70',
  primaryCard: 'bg-gradient-to-br from-white via-blue-50 to-cyan-100/30',
  secondaryCard: 'bg-gradient-to-r from-white to-blue-50/50',
  border: 'border border-cyan-100',
  borderAccent: 'border-l border-t border-cyan-200',
  textPrimary: 'text-slate-700',
  textSecondary: 'text-slate-500',
  accent: 'text-cyan-600',
  accentSecondary: 'text-blue-500',
  glow: 'shadow-[0_0_20px_rgba(6,182,212,0.25)]',
  glass: 'backdrop-blur-lg',
  cardShadow: 'shadow-[0_10px_30px_rgba(0,0,0,0.08)]',
  cardHover: 'hover:shadow-[0_15px_35px_rgba(6,182,212,0.15)]',
  buttonGlow: 'shadow-[0_0_15px_rgba(6,182,212,0.3)]',
};

const SurveyModal2 = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ q1: 0, q2: 0, q3: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [animation, setAnimation] = useState('fadeIn');
  const formRef = useRef(null);

  const questions = [
    'How would you rate your experience with RADIUS at the booth?',
    'How helpful was our Demo / Walkthrough?',
    'Would you like to explore RADIUS further after this event?',
  ];

  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-10px); }
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const goToNextQuestion = () => {
    setAnimation('fadeOut');

    setTimeout(() => {
      if (step < questions.length - 1) {
        setStep(step + 1);
      } else {
        handleSubmit();
      }
      setAnimation('fadeIn');
    }, 400);
  };

  const formatTime = date => {
    const pad = n => n.toString().padStart(2, '0');
    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  };

  const handleStarClick = rating => {
    const key = `q${step + 1}`;
    const updatedFormData = { ...formData, [key]: rating };
    setFormData(updatedFormData);
    if (step === questions.length - 1) {
      setAnimation('fadeOut');
      setTimeout(() => {
        handleSubmit(updatedFormData);
      }, 400);
    } else {
      goToNextQuestion();
    }
  };

  const handleSubmit = async (finalData = null) => {
    try {
      setIsSubmitting(true);
      const dataToUse = finalData || formData;

      const formDataToSubmit = new FormData();
      formDataToSubmit.append('TimeStamp', formatTime(new Date()));
      formDataToSubmit.append('question1', dataToUse.q1);
      formDataToSubmit.append('question2', dataToUse.q2);
      formDataToSubmit.append('question3', dataToUse.q3);

      await fetch(
        'https://script.google.com/macros/s/AKfycbzM2_sLX1dsf3hcjO3FvsbkUJrqIX4WO4b5Ml9eYOQdCYfkLD_aQGkXtyWNMZt2AF1j/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          body: formDataToSubmit,
        }
      );

      setSubmitted(true);
      setTimeout(onClose, 1500);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = value => {
    return Array(5)
      .fill()
      .map((_, i) => (
        <Star
          key={i}
          size={45}
          className={`cursor-pointer transition-all hover:scale-125 ${
            i < value ? 'fill-cyan-500 text-cyan-500' : 'text-gray-300 hover:text-cyan-300'
          }`}
          onClick={() => handleStarClick(i + 1)}
        />
      ));
  };

  const animationStyle = {
    animation: `${animation} 0.4s ease-in-out forwards`,
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className={`${theme.primaryCard} ${theme.border} ${theme.glass} ${theme.cardShadow} rounded-2xl p-6 w-[600px] min-h-72 flex flex-col justify-between items-center transition-all duration-300`}
        style={{ animation: 'fadeIn 0.3s ease-in-out' }}
      >
        <div
          className={`relative ${theme.secondaryCard} ${theme.border} ${theme.textPrimary} ${theme.glass} ${theme.cardShadow} 
          rounded-2xl p-8 w-full z-10
          flex flex-col justify-between items-center transition-transform duration-300 hover:scale-105`}
          style={{
            boxShadow:
              '0 5px 20px rgba(6, 182, 212, 0.15), inset 0 0 15px rgba(255, 255, 255, 0.8)',
            animation: 'fadeIn 0.5s ease-in-out',
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Top decorative element */}
          <div className="absolute top-0 right-0 w-full h-2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70 rounded-t-2xl"></div>

          {/* Progress Bar */}
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-8 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-500"
              style={{ width: `${((step + 1) / questions.length) * 100}%` }}
            />
          </div>

          {!submitted ? (
            <>
              <div className="flex flex-col items-center w-full" style={animationStyle}>
                <h2
                  className={`text-2xl font-light ${theme.accent} mb-8 text-center tracking-wide`}
                >
                  {questions[step]}
                </h2>

                <div className="flex justify-center gap-3 mb-8 transition-all">
                  {renderStars(formData[`q${step + 1}`])}
                </div>

                <div className={`text-sm ${theme.textSecondary} mt-4`}>
                  Question {step + 1} of {questions.length}
                </div>
              </div>

              {isSubmitting && (
                <div className="flex items-center gap-2 text-cyan-500 mt-4">
                  <svg
                    className="animate-spin h-5 w-5 text-cyan-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </div>
              )}
            </>
          ) : (
            <div
              className="flex flex-col items-center justify-center gap-6 text-cyan-600 text-center py-6"
              style={{ animation: 'fadeIn 0.5s ease-in-out' }}
            >
              <h2 className="text-3xl font-light tracking-wide">Thank you for your feedback!</h2>
              <p className="text-xl text-slate-500 font-light">
                Enjoy the rest of the experience 🚀
              </p>
              <div className="flex gap-6 items-center mt-4">
                <PartyPopper
                  className="text-orange-400"
                  style={{ animation: 'bounce 1s infinite' }}
                  size={50}
                />
                <Sparkle
                  className="text-cyan-400"
                  style={{ animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite' }}
                  size={40}
                />
                <PartyPopper
                  className="text-yellow-400 rotate-180"
                  style={{ animation: 'bounce 1s infinite' }}
                  size={50}
                />
              </div>
            </div>
          )}

          {/* Hidden form for backup traditional submission */}
          <form
            ref={formRef}
            method="POST"
            action="https://script.google.com/macros/s/AKfycbzM2_sLX1dsf3hcjO3FvsbkUJrqIX4WO4b5Ml9eYOQdCYfkLD_aQGkXtyWNMZt2AF1j/exec"
            style={{ display: 'none' }}
            onSubmit={e => e.preventDefault()}
          >
            <input type="hidden" name="question1" value={formData.q1} />
            <input type="hidden" name="question2" value={formData.q2} />
            <input type="hidden" name="question3" value={formData.q3} />
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
};

const Second = () => {
  const [glowIntensity, setGlowIntensity] = useState(0.6);
  const [activeSection, setActiveSection] = useState(null);
  const [showSurvey, setShowSurvey] = useState(false);

  const handleOpenSurvey = () => setShowSurvey(true);
  const handleCloseSurvey = () => setShowSurvey(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(prev => {
        const newValue = prev + (Math.random() * 0.05 - 0.025);
        return Math.max(0.5, Math.min(0.8, newValue));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleHover = section => {
    setActiveSection(section);
  };

  const handleLeave = () => {
    setActiveSection(null);
  };

  const handleRedirectToMeeting = () => {
    window.open('https://calendly.com/radius-ois/radius-ois-product-demonstration', '_blank');
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen ${theme.background} font-sans relative overflow-hidden`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50" />
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-16 bg-gradient-to-r from-cyan-100/40 via-white/80 to-blue-100/40"
          style={{ transform: 'skewY(-5deg)', top: '20%' }}
        />
        <div
          className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-100/40 via-white/80 to-cyan-100/40"
          style={{ transform: 'skewY(3deg)', top: '60%' }}
        />
      </div>

      <div className="w-full h-screen max-h-screen relative z-10 p-8">
        {/* Main asymmetric layout */}
        <div className="grid grid-cols-12 grid-rows-6 gap-4 h-full">
          {/* Left tall panel - System Status */}
          <div
            className={`col-span-3 row-span-6 rounded-2xl p-6 flex flex-col ${theme.glass} transition-all duration-300 ${
              activeSection === 'status' ? theme.primaryCard : theme.secondaryCard
            } ${theme.border} ${theme.cardShadow} ${theme.cardHover}`}
            style={{
              boxShadow: `0 5px ${15 + glowIntensity * 10}px rgba(6, 182, 212, ${glowIntensity * 0.2})`,
            }}
            onMouseEnter={() => handleHover('status')}
            onMouseLeave={handleLeave}
          >
            <div className={`${theme.accent} font-medium text-lg tracking-wider mb-6`}>
              <a
                href="https://radius-ois.ai"
                target="_blank"
                className="hover:text-blue-500 transition-colors"
              >
                VISIT RADIUS
              </a>
            </div>

            <div className="flex-1 flex flex-col justify-around">
              <div className="grid grid-cols-1 gap-2 w-full">
                {[
                  {
                    label: 'MULTICHANNEL SUPPORT',
                    data: '24X7',
                    icon: <MessageSquare size={20} />,
                  },
                  { label: 'INTEGRATED SOLUTIONS', data: '45+', icon: <Ratio size={20} /> },
                  { label: 'YEARS OF TECHNOLOGY', data: '10+', icon: <Sunset size={20} /> },
                  { label: 'FEATURES WE OFFER', data: '500+', icon: <Zap size={20} /> },
                  { label: 'AVG TEAM EXPERIENCE', data: '100+', icon: <Zap size={20} /> },
                  { label: 'BESPOKE SOLUTIONS DEVELOPED', data: '10+', icon: <Zap size={20} /> },
                ].map((metric, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col items-start justify-center rounded-xl p-2 ${theme.glass} bg-white/50 shadow-md transition-transform hover:scale-105 mb-2 border border-cyan-50`}
                  >
                    <div className={`${theme.accent} text-xl font-medium mb-2`}>{metric.data}</div>
                    <div className="flex items-center gap-2">
                      <span className={`${theme.textSecondary} font-medium text-xs text-center`}>
                        {metric.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right top large section - Primary Controls */}
          <div
            className={`col-span-9 row-span-4 rounded-2xl relative overflow-hidden flex transition-all duration-300 ${theme.glass} ${theme.border} ${theme.cardShadow} ${theme.cardHover} ${
              activeSection === 'primary' ? theme.primaryCard : theme.secondaryCard
            }`}
            style={{
              boxShadow: `0 5px ${15 + glowIntensity * 10}px rgba(6, 182, 212, ${glowIntensity * 0.2})`,
            }}
            onMouseEnter={() => handleHover('primary')}
            onMouseLeave={handleLeave}
          >
            <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden pointer-events-none">
              <div className="w-full h-full bg-gradient-to-br from-blue-50/50 to-cyan-50/50" />
              <div className="absolute top-0 left-0 w-full h-full">
                <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
                  <path
                    d="M0,50 Q25,0 50,50 T100,50"
                    stroke="rgba(6, 182, 212, 0.2)"
                    strokeWidth="0.2"
                    fill="none"
                  />
                  <path
                    d="M0,60 Q25,10 50,60 T100,60"
                    stroke="rgba(6, 182, 212, 0.15)"
                    strokeWidth="0.2"
                    fill="none"
                  />
                  <path
                    d="M0,70 Q25,20 50,70 T100,70"
                    stroke="rgba(6, 182, 212, 0.1)"
                    strokeWidth="0.2"
                    fill="none"
                  />
                  <path
                    d="M0,40 Q25,90 50,40 T100,40"
                    stroke="rgba(59, 130, 246, 0.2)"
                    strokeWidth="0.2"
                    fill="none"
                  />
                  <path
                    d="M0,30 Q25,80 50,30 T100,30"
                    stroke="rgba(59, 130, 246, 0.15)"
                    strokeWidth="0.2"
                    fill="none"
                  />
                </svg>
              </div>
            </div>

            {/* Controls content */}
            <div className="flex-1 p-6 flex flex-col">
              <div className={`${theme.textPrimary} font-medium text-lg tracking-wider mb-6`}>
                LIVE COMMUNICATION WITH AGENT
              </div>

              <div className="flex-1 grid grid-cols-3 gap-6">
                {[
                  { name: 'Video', icon: <VideoIcon size={32} />, color: 'primary' },
                  { name: 'Call', icon: <Phone size={32} />, color: 'secondary' },
                  { name: 'Chat', icon: <MessageSquare size={32} />, color: 'primary' },
                  {
                    name: 'Agent Console',
                    subheading: 'Interactive Demo',
                    icon: <UserCheck size={32} />,
                    color: 'secondary',
                  },
                  {
                    name: 'Reporting Tool',
                    subheading: 'Interactive Demo',
                    icon: <FileCheck2 size={32} />,
                    color: 'primary',
                  },
                  {
                    name: 'Playback and QA Tool',
                    subheading: 'Interactive Demo',
                    icon: <AudioLines size={32} />,
                    color: 'secondary',
                  },
                ].map((control, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl flex flex-col justify-center items-center p-4 cursor-pointer group hover:scale-105 transition-transform duration-300 ${theme.glass} ${theme.border} ${theme.cardShadow}`}
                    style={{
                      background: 'rgba(255,255,255,0.85)',
                      boxShadow:
                        control.color === 'primary'
                          ? `0 5px 15px rgba(6, 182, 212, ${glowIntensity * 0.2})`
                          : `0 5px 15px rgba(59, 130, 246, ${glowIntensity * 0.2})`,
                      borderColor:
                        control.color === 'primary'
                          ? 'rgba(6, 182, 212, 0.3)'
                          : 'rgba(59, 130, 246, 0.3)',
                    }}
                  >
                    <div
                      className={`mb-4 ${control.color === 'primary' ? theme.accent : theme.accentSecondary} group-hover:scale-110 transition-transform duration-300`}
                    >
                      {control.icon}
                    </div>
                    <div
                      className={`text-sm font-medium ${control.color === 'primary' ? theme.accent : theme.accentSecondary} tracking-wider uppercase text-nowrap`}
                    >
                      {control.name}
                    </div>
                    <div
                      className={`text-xs font-light ${theme.textSecondary} tracking-wider uppercase text-nowrap`}
                    >
                      {control.subheading}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom right sections - Book a Meeting */}
          <div
            className={`col-span-4 row-span-2 rounded-2xl p-6 transition-all duration-300 ${theme.glass} ${theme.border} ${theme.cardShadow} ${theme.cardHover} ${
              activeSection === 'specs' ? theme.primaryCard : theme.secondaryCard
            }`}
            style={{
              boxShadow: `0 5px ${15 + glowIntensity * 10}px rgba(6, 182, 212, ${glowIntensity * 0.2})`,
            }}
            onMouseEnter={() => handleHover('specs')}
            onMouseLeave={handleLeave}
          >
            <div
              className="h-full flex flex-col items-center justify-between cursor-pointer"
              onClick={handleRedirectToMeeting}
            >
              <div
                className={`${theme.textPrimary} font-medium text-lg tracking-wider mb-3 text-center`}
              >
                BOOK A DEMO
              </div>
              <CalendarDays
                className={`w-24 h-24 ${theme.accent} mx-auto hover:scale-110 transition-transform`}
              />
            </div>
          </div>

          {/* Bottom right sections - our capabilites */}
          <div
            className={`col-span-5 row-span-2 rounded-2xl p-6 transition-all duration-300 ${theme.glass} ${theme.border} ${theme.cardShadow} ${theme.cardHover} ${
              activeSection === 'features' ? theme.primaryCard : theme.secondaryCard
            }`}
            style={{
              boxShadow: `0 5px ${15 + glowIntensity * 10}px rgba(6, 182, 212, ${glowIntensity * 0.2})`,
            }}
            onMouseEnter={() => handleHover('features')}
            onMouseLeave={handleLeave}
          >
            <div
              className={`rounded-lg bg-gradient-to-br from-cyan-50 to-blue-50 h-full overflow-hidden cursor-pointer ${theme.border} ${theme.glass}`}
              onClick={handleOpenSurvey}
            >
              <div className={`${theme.textPrimary} font-medium text-lg mb-2 pl-4 pt-2`}>
                SURVEY
              </div>
              <div className="flex flex-col justify-between h-4/5 px-4">
                <div className={`text-xs ${theme.accent} font-medium pulse-animation`}>
                  &gt; TAKE A SHORT SURVEY
                </div>
                <div className="flex justify-end items-end">
                  <img src="/dashboard.svg" className="w-72 h-32" />
                </div>
              </div>
            </div>
            {showSurvey && <SurveyModal2 onClose={handleCloseSurvey} />}
          </div>
        </div>
      </div>

      {/* Background subtle glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          border: `1px solid rgba(6, 182, 212, ${glowIntensity * 0.3})`,
          boxShadow: `inset 0 0 ${80 * glowIntensity}px rgba(6, 182, 212, ${glowIntensity * 0.2})`,
        }}
      />
    </div>
  );
};

export default Second;

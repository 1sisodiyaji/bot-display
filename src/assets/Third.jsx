import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Ratio,
  Sunset,
  Zap,
  Phone,
  UserCheck,
  VideoIcon,
  CalendarArrowUp,
  PartyPopper,
  Sparkle,
  Star,
  Rocket,
  ChevronRight,
  BarChart,
  Activity,
  Users,
  Layers,
  Box,
  Cpu,
} from 'lucide-react';
import ReactDOM from 'react-dom';

const SurveyModal2 = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ q1: 0, q2: 0, q3: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [animation, setAnimation] = useState('slideIn');
  const formRef = useRef(null);

  const questions = [
    'How would you rate your experience with RADIUS at the booth?',
    'How helpful was our Demo / Walkthrough?',
    'Would you like to explore RADIUS further after this event?',
  ];

  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes slideIn {
        from { opacity: 0; transform: translateX(-30px); }
        to { opacity: 1; transform: translateX(0); }
      }
      
      @keyframes slideOut {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(30px); }
      }

      @keyframes pulseGlow {
        0% { box-shadow: 0 0 15px rgba(255, 86, 246, 0.4); }
        50% { box-shadow: 0 0 25px rgba(255, 86, 246, 0.7); }
        100% { box-shadow: 0 0 15px rgba(255, 86, 246, 0.4); }
      }

      @keyframes rotate3D {
        0% { transform: perspective(1000px) rotateY(0deg); }
        100% { transform: perspective(1000px) rotateY(360deg); }
      }

      @keyframes floatAnimation {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }

      .modal-container {
        perspective: 1000px;
      }

      .floating {
        animation: floatAnimation 3s ease-in-out infinite;
      }

      .rotate-on-hover:hover {
        animation: rotate3D 3s linear;
      }

      .pulse-glow {
        animation: pulseGlow 2s infinite;
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const goToNextQuestion = () => {
    setAnimation('slideOut');

    setTimeout(() => {
      if (step < questions.length - 1) {
        setStep(step + 1);
      } else {
        handleSubmit();
      }
      setAnimation('slideIn');
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
      setAnimation('slideOut');
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
        <div
          key={i}
          className={`h-12 w-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-125 ${
            i < value
              ? 'bg-gradient-to-r from-fuchsia-500 to-violet-500 shadow-lg shadow-fuchsia-500/50'
              : 'bg-gray-200/20 hover:bg-fuchsia-500/20'
          }`}
          onClick={() => handleStarClick(i + 1)}
        >
          <Star
            size={24}
            className={i < value ? 'text-white' : 'text-gray-400'}
            fill={i < value ? 'white' : 'none'}
          />
        </div>
      ));
  };

  const animationStyle = {
    animation: `${animation} 0.4s ease-in-out forwards`,
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex justify-center items-center modal-container"
      onClick={onClose}
    >
      <div
        className="w-[650px] rounded-3xl p-1 overflow-hidden pulse-glow bg-gradient-to-br from-purple-600 via-fuchsia-500 to-pink-500"
        style={{
          animation: 'fadeIn 0.3s ease-in-out',
          boxShadow: '0 0 30px rgba(255, 86, 246, 0.5)',
        }}
      >
        <div
          className="relative bg-gray-900 rounded-3xl p-8 w-full z-10 backdrop-blur-xl backdrop-filter"
          style={{
            backgroundImage:
              'radial-gradient(circle at top right, rgba(255, 86, 246, 0.15), transparent 60%), radial-gradient(circle at bottom left, rgba(120, 119, 198, 0.1), transparent 60%)',
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Decorative elements */}
          <div className="absolute top-6 right-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-fuchsia-500/10 to-violet-500/10 floating"></div>
          </div>
          <div className="absolute bottom-6 left-6">
            <div
              className="w-14 h-14 rounded-full bg-gradient-to-r from-fuchsia-500/10 to-violet-500/10 floating"
              style={{ animationDelay: '1s' }}
            ></div>
          </div>

          {/* Progress Bar */}
          <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden mb-8">
            <div
              className="h-full bg-gradient-to-r from-fuchsia-500 to-purple-500 transition-all duration-500"
              style={{ width: `${((step + 1) / questions.length) * 100}%` }}
            />
          </div>

          {!submitted ? (
            <>
              <div className="flex flex-col items-center w-full" style={animationStyle}>
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400 mb-8 text-center">
                  {questions[step]}
                </h2>

                <div className="flex justify-center gap-4 mb-8 transition-all">
                  {renderStars(formData[`q${step + 1}`])}
                </div>

                <div className="text-sm text-fuchsia-300/70 mt-4 font-medium">
                  Question {step + 1} of {questions.length}
                </div>
              </div>

              {isSubmitting && (
                <div className="flex items-center gap-2 text-fuchsia-400 mt-6 justify-center">
                  <svg
                    className="animate-spin h-5 w-5 text-fuchsia-400"
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
                  <span className="font-medium">Processing your feedback...</span>
                </div>
              )}
            </>
          ) : (
            <div
              className="flex flex-col items-center justify-center gap-6 text-center py-6"
              style={{ animation: 'fadeIn 0.5s ease-in-out' }}
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500 flex items-center justify-center mb-4">
                <Sparkle className="text-white w-12 h-12 animate-pulse" />
              </div>
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400">
                Thank you for your feedback!
              </h2>
              <p className="text-xl text-gray-300 font-light">
                Enjoy the rest of the experience 🚀
              </p>
              <div className="flex gap-6 items-center mt-4">
                <PartyPopper
                  className="text-yellow-400"
                  style={{ animation: 'bounce 1s infinite' }}
                  size={40}
                />
                <PartyPopper
                  className="text-fuchsia-400 rotate-45"
                  style={{ animation: 'bounce 1s infinite', animationDelay: '0.3s' }}
                  size={40}
                />
                <PartyPopper
                  className="text-cyan-400 rotate-90"
                  style={{ animation: 'bounce 1s infinite', animationDelay: '0.6s' }}
                  size={40}
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

const Third = () => {
  const [showSurvey, setShowSurvey] = useState(false);
  const [currentView, setCurrentView] = useState('main');

  const handleOpenSurvey = () => setShowSurvey(true);
  const handleCloseSurvey = () => setShowSurvey(false);

  const handleRedirectToMeeting = () => {
    window.open('https://calendly.com/radius-ois/radius-ois-product-demonstration', '_blank');
  };

  // Animated particle background setup
  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes floatUp {
        0% { transform: translateY(100vh); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100px); opacity: 0; }
      }
      
      @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
        100% { transform: scale(1); opacity: 1; }
      }

      @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      
      @keyframes glowPulse {
        0% { box-shadow: 0 0 10px rgba(147, 51, 234, 0.5); }
        50% { box-shadow: 0 0 25px rgba(147, 51, 234, 0.8); }
        100% { box-shadow: 0 0 10px rgba(147, 51, 234, 0.5); }
      }

      .particle {
        position: absolute;
        border-radius: 50%;
        background: linear-gradient(to right, #9333ea, #ec4899);
        opacity: 0.3;
        animation: floatUp 15s linear infinite;
      }

      .glow-effect {
        animation: glowPulse 3s infinite;
      }

      .pulse-anim {
        animation: pulse 3s infinite;
      }

      .rotate-anim {
        animation: rotate 8s linear infinite;
      }
    `;
    document.head.appendChild(styleSheet);

    // Generate floating particles
    const container = document.getElementById('particle-container');
    if (container) {
      for (let i = 0; i < 20; i++) {
        const size = Math.random() * 40 + 10;
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(particle);
      }
    }

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 font-sans relative overflow-hidden">
      {/* Animated particle background */}
      <div
        id="particle-container"
        className="absolute inset-0 pointer-events-none overflow-hidden"
      ></div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-black/40"></div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen container mx-auto px-6 py-12">
        {/* Header with brand */}
        <header className="flex items-center justify-between mb-12">
          <h1 className="ml-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400">
            RADIUS OIS
          </h1>

          <div className="flex items-center gap-6">
            <button
              className="px-4 py-2 rounded-full border border-fuchsia-500/30 text-fuchsia-400 hover:bg-fuchsia-500/10 transition-all"
              onClick={() => window.open('https://radius-ois.ai', '_blank')}
            >
              Visit Website
            </button>
            <button
              className="px-6 py-2 rounded-full bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all"
              onClick={handleRedirectToMeeting}
            >
              Book Demo
            </button>
          </div>
        </header>

        {currentView === 'main' && (
          <>
            {/* Hero section */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
              {/* Left panel - Stats */}
              <div className="lg:col-span-2 rounded-3xl overflow-hidden relative">
                {/* Background with gradient border */}
                <div className="absolute inset-0 p-0.5 rounded-3xl bg-gradient-to-br from-fuchsia-500 via-purple-500 to-pink-500 glow-effect"></div>

                <div className="relative h-full rounded-3xl bg-gray-900/95 backdrop-blur-xl p-6 flex flex-col">
                  <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400 mb-6">
                    Performance Metrics
                  </h2>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        label: 'MULTICHANNEL SUPPORT',
                        data: '24X7',
                        icon: <MessageSquare size={20} className="text-fuchsia-400" />,
                      },
                      {
                        label: 'INTEGRATED SOLUTIONS',
                        data: '45+',
                        icon: <Ratio size={20} className="text-purple-400" />,
                      },
                      {
                        label: 'YEARS OF TECHNOLOGY',
                        data: '10+',
                        icon: <Sunset size={20} className="text-fuchsia-400" />,
                      },
                      {
                        label: 'FEATURES WE OFFER',
                        data: '500+',
                        icon: <Zap size={20} className="text-purple-400" />,
                      },
                      {
                        label: 'AVG TEAM EXPERIENCE',
                        data: '100+',
                        icon: <Users size={20} className="text-fuchsia-400" />,
                      },
                      {
                        label: 'BESPOKE SOLUTIONS',
                        data: '10+',
                        icon: <Layers size={20} className="text-purple-400" />,
                      },
                    ].map((metric, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl p-4 bg-gray-800/50 border border-purple-500/20 hover:border-purple-500/40 hover:bg-gray-800/80 transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          {metric.icon}
                          <span className="text-xs font-medium text-gray-400">{metric.label}</span>
                        </div>
                        <div className="text-2xl font-bold text-white">{metric.data}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-6">
                    <button
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-2"
                      onClick={handleOpenSurvey}
                    >
                      Take Survey <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right panel - Communication Hub */}
              <div className="lg:col-span-3">
                <div className="rounded-3xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 border border-purple-500/20 h-full">
                  <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400 mb-6">
                    Communication Hub
                  </h2>

                  <div className="grid grid-cols-3 gap-4">
                    {[
                      {
                        name: 'Video Conference',
                        icon: <VideoIcon size={30} className="text-purple-400" />,
                        color: 'purple',
                      },
                      {
                        name: 'Voice Call',
                        icon: <Phone size={30} className="text-fuchsia-400" />,
                        color: 'fuchsia',
                      },
                      {
                        name: 'Live Chat',
                        icon: <MessageSquare size={30} className="text-purple-400" />,
                        color: 'purple',
                      },
                      {
                        name: 'Agent Console',
                        icon: <UserCheck size={30} className="text-fuchsia-400" />,
                        color: 'fuchsia',
                      },
                      {
                        name: 'Analytics',
                        icon: <BarChart size={30} className="text-purple-400" />,
                        color: 'purple',
                      },
                      {
                        name: 'Quality Control',
                        icon: <Activity size={30} className="text-fuchsia-400" />,
                        color: 'fuchsia',
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl px-4 py-6 border border-gray-700 hover:border-fuchsia-500/40 flex flex-col items-center justify-center gap-4 hover:bg-gray-800/70 transition-all cursor-pointer"
                      >
                        <div
                          className={`h-16 w-16 rounded-full flex items-center justify-center bg-${item.color}-500/10`}
                        >
                          {item.icon}
                        </div>
                        <span className="text-gray-300 font-medium text-center text-sm">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature spotlight */}
              <div className="rounded-3xl bg-gradient-to-br from-purple-900/50 to-fuchsia-900/50 backdrop-blur-sm p-6 border border-fuchsia-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 rounded-full filter blur-xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full filter blur-xl"></div>

                <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400 mb-4">
                  Feature Spotlight
                </h3>

                <div className="flex items-start gap-4 mb-6">
                  <div className="h-12 w-12 rounded-xl bg-fuchsia-500/20 flex items-center justify-center flex-shrink-0">
                    <Cpu className="text-fuchsia-400" size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">AI-Powered Assistant</h4>
                    <p className="text-gray-400 text-sm mt-1">
                      Intelligent routing and real-time analytics for optimal customer experiences
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Box className="text-purple-400" size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Integration Hub</h4>
                    <p className="text-gray-400 text-sm mt-1">
                      Connect with 45+ platforms seamlessly for unified communication
                    </p>
                  </div>
                </div>
              </div>

              {/* Schedule demo */}
              <div className="rounded-3xl bg-gradient-to-br from-fuchsia-600/20 to-purple-600/20 backdrop-blur-sm p-6 border border-fuchsia-500/20 flex flex-col">
                <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400 mb-4">
                  Schedule a Personalized Demo
                </h3>

                <p className="text-gray-300 text-sm mb-6">
                  See how RADIUS can transform your customer service experience with a tailored
                  demonstration.
                </p>

                <div className="flex-1 flex items-center justify-center">
                  <div
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-500 flex items-center justify-center pulse-anim cursor-pointer"
                    onClick={handleRedirectToMeeting}
                  >
                    <CalendarArrowUp className="text-white" size={40} />
                  </div>
                </div>

                <button
                  className="mt-6 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                  onClick={handleRedirectToMeeting}
                >
                  Book Your Demo
                </button>
              </div>

              {/* Survey card */}
              <div className="rounded-3xl bg-gradient-to-br from-gray-800/80 to-purple-900/30 backdrop-blur-sm p-6 border border-purple-500/20 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-pink-500"></div>

                <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400 mb-4">
                  Feedback Survey
                </h3>

                <p className="text-gray-300 text-sm mb-6">
                  We value your insights! Share your experience with our product and help us
                  improve.
                </p>

                <div className="flex items-center gap-2 text-gray-400 text-sm mb-8">
                  <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-500"></span>
                  <span>Quick 3-question survey</span>
                </div>

                <button
                  className="w-full py-3 px-4 rounded-xl bg-fuchsia-500/20 border border-fuchsia-500/40 text-fuchsia-300 font-medium hover:bg-fuchsia-500/30 transition-all flex items-center justify-center gap-2"
                  onClick={handleOpenSurvey}
                >
                  Start Survey <Rocket size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {showSurvey && <SurveyModal2 onClose={handleCloseSurvey} />}
    </div>
  );
};

export default Third;

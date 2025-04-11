import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Ratio,
  Sunset,
  Zap,
  Phone,
  UserCheck,
  VideoIcon,
  CalendarArrowUp,
  Rocket,
  ChevronRight,
  BarChart,
  Activity,
  Users,
  Layers,
  Box,
  Cpu,
} from 'lucide-react';
import SurveyModal2 from '../components/Survey';

const Fifth = () => {
  const [showSurvey, setShowSurvey] = useState(false);
  const [currentView, setCurrentView] = useState('main');

  const handleOpenSurvey = () => setShowSurvey(true);
  const handleCloseSurvey = () => setShowSurvey(false);

  const handleRedirectToMeeting = () => {
    window.open('https://calendly.com/radius-ois/radius-ois-product-demonstration', '_blank');
  };

  // Prismatic refraction animation
  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes prismShift {
        0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
        20% { opacity: 0.6; }
        80% { opacity: 0.8; }
        100% { transform: translate(50px, -50px) rotate(45deg); opacity: 0; }
      }

      @keyframes prismGlow {
        0% { box-shadow: 0 0 5px rgba(227, 178, 84, 0.2); }
        50% { box-shadow: 0 0 15px rgba(227, 178, 84, 0.5); }
        100% { box-shadow: 0 0 5px rgba(227, 178, 84, 0.2); }
      }

      .prism-beam {
        position: absolute;
        width: 100px;
        height: 100px;
        border: 2px solid red;
        background: linear-gradient(135deg, rgba(220, 242, 251, 0.9), rgba(227, 178, 84, 0.9));
        clip-path: polygon(0 0, 70% 0, 100% 100%, 30% 100%);
        animation: prismShift 12s linear infinite;
        pointer-events: none;
        z-index: 10;
      }

      .prism-beam:nth-child(2) {
        width: 80px;
        height: 80px;
        animation-delay: -4s;
        clip-path: polygon(20% 0, 100% 0, 80% 100%, 0 100%);
      }

      .prism-beam:nth-child(3) {
        width: 120px;
        height: 120px;
        animation-delay: -8s;
        clip-path: polygon(0 20%, 100% 0, 100% 80%, 0 100%);
      }

      .glow-effect {
        animation: prismGlow 2.5s infinite;
      }

      .hover-lift {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .hover-lift:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(227, 178, 84, 0.3);
      }
    `;
    document.head.appendChild(styleSheet);

    // Generate prism beams
    const container = document.getElementById('prism-container');
    if (container) {
      for (let i = 0; i < 3; i++) {
        const beam = document.createElement('div');
        beam.className = 'prism-beam';
        beam.style.left = `${Math.random() * 100}%`;
        beam.style.top = `${Math.random() * 100}%`;
        beam.style.animationDuration = `${12 + Math.random() * 4}s`;
        container.appendChild(beam);
      }
    }

    return () => {
      document.head.removeChild(styleSheet);
      if (container) container.innerHTML = '';
    };
  }, []);

  return (
    <div className="h-screen bg-[#DCF2FB] font-sans relative overflow-hidden">
      {/* Prismatic refraction background */}
      <div id="prism-container" className="absolute inset-0 pointer-events-none"></div>

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#DCF2FB]/20 to-transparent"></div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen container mx-auto px-6 py-12">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <h1 className="text-3xl font-bold text-[#E3B254]">RADIUS OIS</h1>
          <div className="flex items-center gap-6">
            <button
              className="px-4 py-2 rounded-lg border border-[#E3B254]/50 text-[#E3B254] hover:bg-[#E3B254]/10 transition-all"
              onClick={() => window.open('https://radius-ois.ai', '_blank')}
            >
              Visit Website
            </button>
            <button
              className="px-6 py-2 rounded-lg bg-[#E3B254] text-[#DCF2FB] font-medium hover:shadow-lg hover:shadow-[#E3B254]/50 transition-all glow-effect"
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
              <div className="lg:col-span-2 rounded-2xl bg-white/95 backdrop-blur-md p-6 border border-[#E3B254]/20 hover-lift">
                <h2 className="text-xl font-bold text-[#E3B254] mb-6">Performance Metrics</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      label: 'MULTICHANNEL SUPPORT',
                      data: '24X7',
                      icon: <MessageSquare size={20} className="text-[#E3B254]" />,
                    },
                    {
                      label: 'INTEGRATED SOLUTIONS',
                      data: '45+',
                      icon: <Ratio size={20} className="text-[#E3B254]" />,
                    },
                    {
                      label: 'YEARS OF TECHNOLOGY',
                      data: '10+',
                      icon: <Sunset size={20} className="text-[#E3B254]" />,
                    },
                    {
                      label: 'FEATURES WE OFFER',
                      data: '500+',
                      icon: <Zap size={20} className="text-[#E3B254]" />,
                    },
                    {
                      label: 'AVG TEAM EXPERIENCE',
                      data: '100+',
                      icon: <Users size={20} className="text-[#E3B254]" />,
                    },
                    {
                      label: 'BESPOKE SOLUTIONS',
                      data: '10+',
                      icon: <Layers size={20} className="text-[#E3B254]" />,
                    },
                  ].map((metric, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg p-4 bg-[#DCF2FB]/20 border border-[#E3B254]/10 hover:border-[#E3B254]/40 hover:bg-[#DCF2FB]/30 transition-all"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {metric.icon}
                        <span className="text-xs font-medium text-gray-700">{metric.label}</span>
                      </div>
                      <div className="text-2xl font-bold text-[#E3B254]">{metric.data}</div>
                    </div>
                  ))}
                </div>
                <button
                  className="w-full py-3 mt-6 rounded-lg bg-[#E3B254] text-[#DCF2FB] font-medium hover:shadow-lg hover:shadow-[#E3B254]/50 transition-all flex items-center justify-center gap-2 glow-effect"
                  onClick={handleOpenSurvey}
                >
                  Take Survey <ChevronRight size={18} />
                </button>
              </div>

              {/* Right panel - Communication Hub */}
              <div className="lg:col-span-3 rounded-2xl bg-white/95 backdrop-blur-md p-8 border border-[#E3B254]/20 hover-lift">
                <h2 className="text-xl font-bold text-[#E3B254] mb-6">Communication Hub</h2>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    {
                      name: 'Video Conference',
                      icon: <VideoIcon size={30} className="text-[#E3B254]" />,
                      color: 'bg-[#E3B254]/10',
                    },
                    {
                      name: 'Voice Call',
                      icon: <Phone size={30} className="text-[#E3B254]" />,
                      color: 'bg-[#DCF2FB]/10',
                    },
                    {
                      name: 'Live Chat',
                      icon: <MessageSquare size={30} className="text-[#E3B254]" />,
                      color: 'bg-[#E3B254]/10',
                    },
                    {
                      name: 'Agent Console',
                      icon: <UserCheck size={30} className="text-[#E3B254]" />,
                      color: 'bg-[#DCF2FB]/10',
                    },
                    {
                      name: 'Analytics',
                      icon: <BarChart size={30} className="text-[#E3B254]" />,
                      color: 'bg-[#E3B254]/10',
                    },
                    {
                      name: 'Quality Control',
                      icon: <Activity size={30} className="text-[#E3B254]" />,
                      color: 'bg-[#DCF2FB]/10',
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`rounded-lg px-4 py-6 border border-[#E3B254]/10 hover:border-[#E3B254]/40 flex flex-col items-center justify-center gap-4 hover:${item.color} transition-all`}
                    >
                      <div
                        className={`h-16 w-16 rounded-full flex items-center justify-center ${item.color}`}
                      >
                        {item.icon}
                      </div>
                      <span className="text-gray-700 font-medium text-center text-sm">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature spotlight */}
              <div className="rounded-2xl bg-white/95 backdrop-blur-md p-6 border border-[#E3B254]/20 hover-lift">
                <h3 className="text-lg font-bold text-[#E3B254] mb-4">Feature Spotlight</h3>
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-12 w-12 rounded-lg bg-[#E3B254]/10 flex items-center justify-center flex-shrink-0">
                    <Cpu className="text-[#E3B254]" size={24} />
                  </div>
                  <div>
                    <h4 className="text-gray-800 font-medium">AI-Powered Assistant</h4>
                    <p className="text-gray-600 text-sm mt-1">
                      Intelligent routing and real-time analytics for optimal customer experiences
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-[#DCF2FB]/10 flex items-center justify-center flex-shrink-0">
                    <Box className="text-[#E3B254]" size={24} />
                  </div>
                  <div>
                    <h4 className="text-gray-800 font-medium">Integration Hub</h4>
                    <p className="text-gray-600 text-sm mt-1">
                      Connect with 45+ platforms seamlessly for unified communication
                    </p>
                  </div>
                </div>
              </div>

              {/* Schedule demo */}
              <div className="rounded-2xl bg-white/95 backdrop-blur-md p-6 border border-[#E3B254]/20 hover-lift flex flex-col">
                <h3 className="text-lg font-bold text-[#E3B254] mb-4">
                  Schedule a Personalized Demo
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  See how RADIUS can transform your customer service experience with a tailored
                  demonstration.
                </p>
                <div className="flex-1 flex items-center justify-center">
                  <div
                    className="w-24 h-24 rounded-full bg-[#E3B254] flex items-center justify-center cursor-pointer hover:scale-110 transition-transform glow-effect"
                    onClick={handleRedirectToMeeting}
                  >
                    <CalendarArrowUp className="text-[#DCF2FB]" size={40} />
                  </div>
                </div>
                <button
                  className="mt-6 w-full py-3 rounded-lg bg-[#E3B254] text-[#DCF2FB] font-medium hover:shadow-lg hover:shadow-[#E3B254]/50 transition-all glow-effect"
                  onClick={handleRedirectToMeeting}
                >
                  Book Your Demo
                </button>
              </div>

              {/* Survey card */}
              <div className="rounded-2xl bg-white/95 backdrop-blur-md p-6 border border-[#E3B254]/20 hover-lift relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#E3B254]"></div>
                <h3 className="text-lg font-bold text-[#E3B254] mb-4">Feedback Survey</h3>
                <p className="text-gray-600 text-sm mb-6">
                  We value your insights! Share your experience with our product and help us
                  improve.
                </p>
                <div className="flex items-center gap-2 text-gray-600 text-sm mb-8">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#E3B254]"></span>
                  <span>Quick 3-question survey</span>
                </div>
                <button
                  className="w-full py-3 rounded-lg bg-[#E3B254]/10 border border-[#E3B254]/30 text-[#E3B254] font-medium hover:bg-[#E3B254]/20 transition-all flex items-center justify-center gap-2"
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

export default Fifth;

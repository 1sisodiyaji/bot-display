import React, { useState, useEffect } from 'react';
import LeftSide from './components/LeftSide';
import BookAMeeting from './components/BookAMeeting';
import SurveyBox from './components/SurveyBox';
import { AudioLines, Computer, FileCheck2, MessageSquare, Phone, RadioIcon, UserCheck, VideoIcon, X } from 'lucide-react';
import Modal from './components/Modal';
import InteractiveDemo from './components/InteractiveDemo';

const App = () => {
  const [glowIntensity, setGlowIntensity] = useState(0.6);
  const [activeSection, setActiveSection] = useState(null);
  const [showcall, setShowCall] = useState(false);
  const [showchat, setShowChat] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [InteractiveDemo1, setInteractiveDemo1] = useState(false);
  const [InteractiveDemo2, setInteractiveDemo2] = useState(false);
  const [InteractiveDemo3, setInteractiveDemo3] = useState(false);

  const handleOpenCallOperation = () => {
    setShowCall(true);
    setTimeout(() => {
      if (typeof window.callSubmit === 'function') {
        window.callSubmit();
      } else {
        console.warn('callSubmit is not ready');
      }
    }, 1000);
  }; 

  const handleOpenChatOperation = () => {
    setShowChat(true);
    window.chatSubmit?.();
  }; 

  const handleOpenVideoOperation = () => {
    setShowVideo(true);
    window.videoSubmit?.();
  }; 

  const handleInteractiveDemo1 = () => setInteractiveDemo1(true);
  const handleInteractiveDemo1Close = () => setInteractiveDemo1(false);

  const handleInteractiveDemo2 = () => setInteractiveDemo2(true);
  const handleInteractiveDemo2Close = () => setInteractiveDemo2(false);

  const handleInteractiveDemo3 = () => setInteractiveDemo3(true);
  const handleInteractiveDemo3Close = () => setInteractiveDemo3(false);
  const handleHover = section => {
    setActiveSection(section);
  };

  const handleLeave = () => {
    setActiveSection(null);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(prev => {
        const newValue = prev + (Math.random() * 0.05 - 0.025);
        return Math.max(0.5, Math.min(0.8, newValue));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  return (
    <>
      <div className="flex justify-center items-center  bg-black font-roboto relative overflow-hidden">

        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-blue-950/20 to-black" />
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-16 bg-gradient-to-r from-cyan-500/5 via-green-400/10 to-blue-500/5"
            style={{ transform: 'skewY(-5deg)', top: '20%' }}
          />
          <div
            className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-cyan-500/5 via-green-400/10 to-blue-500/5"
            style={{ transform: 'skewY(3deg)', top: '60%' }}
          />
        </div>

        <div className="w-full h-screen relative z-10 p-8">
          {/* Main asymmetric layout */}
          <div className="grid grid-cols-12 grid-rows-6 gap-4 h-full">
            <div
              className={`col-span-3 row-span-6 rounded-2xl p-6 flex flex-col transition-all backdrop-blur-3xl duration-300 bg-transparent `}
              style={{
                backdropFilter: 'blur(10px)',
                boxShadow: `0 0 ${20 + glowIntensity * 20}px rgba(6, 182, 212, ${glowIntensity * 0.5})`,
                borderLeft: '1px solid rgba(6, 182, 212, 0.3)',
                borderTop: '1px solid rgba(6, 182, 212, 0.3)',
              }}
              onMouseEnter={() => handleHover('status')}
              onMouseLeave={handleLeave}
            >
              <LeftSide />
            </div>

            {/* Right top large section - Primary Controls */}
            <div
              className={`col-span-9 row-span-4 rounded-2xl relative overflow-hidden flex transition-all duration-300 ${activeSection === 'primary' ? 'bg-black/80' : 'bg-black/60'}`}
              style={{
                backdropFilter: 'blur(10px)',
                boxShadow: `0 0 ${20 + glowIntensity * 20}px rgba(52, 211, 153, ${glowIntensity * 0.5})`,
                borderLeft: '1px solid rgba(52, 211, 153, 0.3)',
                borderTop: '1px solid rgba(52, 211, 153, 0.3)',
              }}
              onMouseEnter={() => handleHover('primary')}
              onMouseLeave={handleLeave}
            >
              <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden pointer-events-none">
                <div className="w-full h-full bg-gradient-to-br from-green-500/5 to-cyan-500/5" />
                <div className="absolute top-0 left-0 w-full h-full">
                  <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
                    <path d="M0,50 Q25,0 50,50 T100,50" stroke="rgba(52, 211, 153, 0.2)" strokeWidth="0.2" fill="none" />
                    <path d="M0,60 Q25,10 50,60 T100,60" stroke="rgba(52, 211, 153, 0.15)" strokeWidth="0.2" fill="none" />
                    <path d="M0,70 Q25,20 50,70 T100,70" stroke="rgba(52, 211, 153, 0.1)" strokeWidth="0.2" fill="none" />
                    <path d="M0,40 Q25,90 50,40 T100,40" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="0.2" fill="none" />
                    <path d="M0,30 Q25,80 50,30 T100,30" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="0.2" fill="none" />
                  </svg>
                </div>
              </div>

              {/* Controls content */}
              <div className="flex-1 p-6 flex flex-col">
                <div className="text-white font-semibold text-lg tracking-wider mb-6">LIVE COMMUNICATION WITH AGENT</div>

                <div className="flex-1 grid grid-cols-3 gap-6">
                  {[
                    {
                      name: 'Video',
                      Extra: <RadioIcon size={16} className="text-red-500 animate-pulse" />,
                      ExtraText: 'LIVE',
                      icon: <VideoIcon size={48} />,
                      color: 'green',
                      onclickValue: handleOpenVideoOperation,
                    },
                    {
                      name: 'Call',
                      Extra: <RadioIcon size={16} className="text-red-500 animate-pulse" />,
                      ExtraText: 'LIVE',
                      icon: <Phone size={48} />,
                      color: 'cyan',
                      onclickValue: handleOpenCallOperation,
                    },
                    {

                      name: 'Chat',
                      Extra: <RadioIcon size={16} className="text-red-500 animate-pulse" />,
                      ExtraText: 'LIVE',
                      icon: <MessageSquare size={48} />,
                      color: 'green',
                      onclickValue: handleOpenChatOperation,
                    },
                    {
                      Extra: <Computer size={16} className="text-amber-500 animate-pulse" />,
                      ExtraText: 'DEMO',
                      name: 'Agent Console',
                      icon: <UserCheck size={48} />,
                      color: 'cyan',
                      onclickValue: handleInteractiveDemo1,
                    },
                    {
                      Extra: <Computer size={16} className="text-amber-500 animate-pulse" />,
                      ExtraText: 'DEMO',
                      name: 'Reporting Tool',
                      icon: <FileCheck2 size={48} />,
                      color: 'green',
                      onclickValue: handleInteractiveDemo2,
                    },
                    {
                      Extra: <Computer size={16} className="text-amber-500 animate-pulse" />,
                      ExtraText: 'DEMO',
                      name: 'Playback and QA Tool',
                      icon: <AudioLines size={48} />,
                      color: 'cyan',
                      onclickValue: handleInteractiveDemo3,
                    },
                  ].map((control, idx) => (
                    <div
                      key={idx}
                      className={`rounded-xl flex flex-col justify-center items-center space-y-4 p-4 cursor-pointer group active:scale-105 transition-transform duration-300 ease-in-out shadow-lg active:shadow-inner`}
                      style={{
                        background: 'rgba(0,0,0,0.6)',
                        boxShadow:
                          control.color === 'green'
                            ? `0 0 15px rgba(52, 211, 153, ${glowIntensity * 0.4})`
                            : `0 0 15px rgba(6, 182, 212, ${glowIntensity * 0.4})`,
                        borderLeft:
                          control.color === 'green' ? '1px solid rgba(52, 211, 153, 0.3)' : '1px solid rgba(6, 182, 212, 0.3)',
                        borderTop:
                          control.color === 'green' ? '1px solid rgba(52, 211, 153, 0.3)' : '1px solid rgba(6, 182, 212, 0.3)',
                      }}
                      onClick={control.onclickValue}
                    >
                      <div className="w-full flex justify-center items-center gap-4">
                        {control.Extra}
                        <span className="text-white/90 text-sm">{control.ExtraText}</span>
                      </div>

                      <div className={`${control.color === 'green' ? 'text-green-400' : 'text-cyan-400'} group-hover:scale-110 transition-transform duration-300`} >
                        {control.icon}
                      </div>
                      <div
                        className={`text-sm font-light ${control.color === 'green' ? 'text-green-300' : 'text-cyan-300'} tracking-wider uppercase text-nowrap`}
                      >
                        {control.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div> 
            </div>

            {/* Bottom right sections - Book a Meeting */}
            <div
              className={`col-span-4 row-span-2 rounded-2xl  p-6 transition-all duration-300 ${activeSection === 'specs' ? 'bg-black/80' : 'bg-black/60'}`}
              style={{
                backdropFilter: 'blur(10px)',
                boxShadow: `0 0 ${20 + glowIntensity * 20}px rgba(6, 182, 212, ${glowIntensity * 0.5})`,
                borderLeft: '1px solid rgba(6, 182, 212, 0.3)',
                borderTop: '1px solid rgba(6, 182, 212, 0.3)',
              }}
              onMouseEnter={() => handleHover('specs')}
              onMouseLeave={handleLeave}
            >
              <BookAMeeting />
            </div>

            {/* Bottom right sections - our capabilites */}
            <div
              className={`col-span-5 row-span-2 rounded-2xl p-6 transition-all duration-300 ${activeSection === 'features' ? 'bg-black/80' : 'bg-black/60'}`}
              style={{
                backdropFilter: 'blur(10px)',
                boxShadow: `0 0 ${20 + glowIntensity * 20}px rgba(52, 211, 153, ${glowIntensity * 0.5})`,
                borderLeft: '1px solid rgba(52, 211, 153, 0.3)',
                borderTop: '1px solid rgba(52, 211, 153, 0.3)',
              }}
              onMouseEnter={() => handleHover('features')}
              onMouseLeave={handleLeave}
            >
              <SurveyBox glowIntensity={glowIntensity} />
            </div>
          </div>
        </div>

        {/* Background */}
        <div  className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            border: `1px solid rgba(52, 211, 153, ${glowIntensity})`,
            boxShadow: `inset 0 0 ${100 * glowIntensity}px rgba(52, 211, 153, ${glowIntensity * 0.5})`,
          }}
        />
      </div>


      <Modal  tag={showcall} id={'call-container'} />
      <Modal  tag={showchat} id={'vis-chat'} />
      <Modal  tag={showVideo} id={'video-chat'} />
      {InteractiveDemo1 && (<InteractiveDemo url={'https://app.supademo.com/embed/cm9837e26009t1o0ieyhu6asm?embed_v=2'} onClose={handleInteractiveDemo1Close} text={'Welcome to Agent Console'} />)}
      {InteractiveDemo2 && (<InteractiveDemo url={'https://app.supademo.com/embed/cm9816bor003q3r0i2j33ooe9?embed_v=2'} onClose={handleInteractiveDemo2Close} text={'Get An Overview of reports'} />)}
      {InteractiveDemo3 && (<InteractiveDemo url={'https://app.supademo.com/embed/cm982foyc004n1o0ihxdb4jyo?embed_v=2'} onClose={handleInteractiveDemo3Close} text={'Get an Quick overview of quality assurance'} />)}
    </>
  );
};

export default App;

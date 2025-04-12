import { AudioLines, Computer, FileCheck2, MessageSquare, Phone, RadioIcon, UserCheck, VideoIcon, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import InteractiveDemo from './InteractiveDemo';
import Modal from './CallModal';

const RightSideTop = ({ glowIntensity }) => {
  const [showcall, setShowCall] = useState(false);
  const [showchat, setShowChat] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [InteractiveDemo1, setInteractiveDemo1] = useState(false);
  const [InteractiveDemo2, setInteractiveDemo2] = useState(false);
  const [InteractiveDemo3, setInteractiveDemo3] = useState(false);

  const handleOpenCallOperation = () => {
    setShowCall(true);
    setTimeout(() => {
      window.callSubmit?.();
    }, [1000]);
  };
  const handleCloseCall = () => {
    window.location.reload();
    setShowCall(false);
  };

  const handleOpenChatOperation = () => {
    setShowChat(true);
    window.chatSubmit?.();
  };

  const handleCloseChat = () => {
    setShowChat(false);
    window.location.reload();
  };

  const handleOpenVideoOperation = () => {
    setShowVideo(true);
    window.videoSubmit?.();
  };
  const handleCloseVideo = () => {
    setShowVideo(false);
    window.location.reload();
  };

  const handleInteractiveDemo1 = () => setInteractiveDemo1(true);
  const handleInteractiveDemo1Close = () => setInteractiveDemo1(false);

  const handleInteractiveDemo2 = () => setInteractiveDemo2(true);
  const handleInteractiveDemo2Close = () => setInteractiveDemo2(false);

  const handleInteractiveDemo3 = () => setInteractiveDemo3(true);
  const handleInteractiveDemo3Close = () => setInteractiveDemo3(false);

  useEffect(() => {
    const existingScript = document.getElementById('chat_now');

    if (!existingScript) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.id = 'chat_now';

      script.text = `
        window.$EsyCht || (function (d, s) {
        var _e = $EsyCht = function (c) {
        _e._.push(c)
        }, $ = _e.s =
        d.createElement(s), e = d.getElementsByTagName(s)[0];
        _e.set = function (o) {_e.set._.push(o)
        };
        _e._ = [];
        _e.set._ = [];
        $.async = !0;
        $.setAttribute("charset", "utf-8");
        $.setAttribute("id", "cd");
        $.src = "https://demo.radius-ois.ai/robowebtools/assets/js/vis435net.js?8de1cacdcda71da3aa79";

        _e.t = +new Date;
        $.type = "text/javascript";
        e.parentNode.insertBefore($, e)
        })(document, "script");
      `;

      document.body.appendChild(script);
    } else {
      setIsLoaded(true);
    }

    const handleLoad = () => setIsLoaded(true);
    const handleError = () => setHasError(true);

    window.addEventListener('callScriptLoaded', handleLoad);
    window.addEventListener('callScriptFailed', handleError);

    return () => {
      window.removeEventListener('callScriptLoaded', handleLoad);
      window.removeEventListener('callScriptFailed', handleError);
    };
  }, [showchat]);

  useEffect(() => {
    const existingScript = document.getElementById('call_now');

    if (!existingScript) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.id = 'call_now';

      script.text = `
       window.$CallNow || (function (doc_Call, scr_Call) {
        var _e_CallNow = $CallNow = function (Ruvo_c) {
        _e_CallNow._.push(Ruvo_c)
        }, $ = _e_CallNow.s =
        doc_Call.createElement(scr_Call), e = doc_Call.getElementsByTagName(scr_Call)[0];
        _e_CallNow.set = function (o) {_e_CallNow.set._.push(o)
        };
        _e_CallNow._ = [];
        _e_CallNow.set._ = [];
        $.async = !0;
        $.setAttribute("charset", "utf-8");
        $.setAttribute("id", "call_now");
        $.src = "https://demo.radius-ois.ai/robowebtoolscall/assets/js/call_ui.js?e87274b76f0d82e1ffcf";

        _e_CallNow.t = +new Date;
        $.type = "text/javascript";
        e.parentNode.insertBefore($, e)
        })(document, "script");
      `;

      document.body.appendChild(script);
    } else {
      setIsLoaded(true);
    }

    const handleLoad = () => setIsLoaded(true);
    const handleError = () => setHasError(true);

    window.addEventListener('callScriptLoaded', handleLoad);
    window.addEventListener('callScriptFailed', handleError);

    return () => {
      window.removeEventListener('callScriptLoaded', handleLoad);
      window.removeEventListener('callScriptFailed', handleError);
    };
  }, [showcall]);

  useEffect(() => {
    const existingScript = document.getElementById('Video_Now');
    if (!existingScript) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.id = 'Video_Now';

      script.text = `
        window.$RuvoChat || (function (doc_RuvoChat, scr_RuvoChat) {
        var _e_RuvoChat = $RuvoChat = function (Ruvo_c) {
        _e_RuvoChat._.push(Ruvo_c)
        }, $ = _e_RuvoChat.s =
        doc_RuvoChat.createElement(scr_RuvoChat), e = doc_RuvoChat.getElementsByTagName(scr_RuvoChat)[0];
        _e_RuvoChat.set = function (o) {_e_RuvoChat.set._.push(o)
        };
        _e_RuvoChat._ = [];
        _e_RuvoChat.set._ = [];
        $.async = !0;
        $.setAttribute("charset", "utf-8");
        $.setAttribute("id", "vd");
        $.src = "https://demo.radius-ois.ai/robowebtools/assets/js/ruvo_ui.js?8de1cacdcda71da3aa79";

        _e_RuvoChat.t = +new Date;
        $.type = "text/javascript";
        e.parentNode.insertBefore($, e)
        })(document, "script");
      `;

      document.body.appendChild(script);
    } else {
      setIsLoaded(true);
    }

    const handleLoad = () => setIsLoaded(true);
    const handleError = () => setHasError(true);
    window.addEventListener('callScriptLoaded', handleLoad);
    window.addEventListener('callScriptFailed', handleError);
    return () => {
      window.removeEventListener('callScriptLoaded', handleLoad);
      window.removeEventListener('callScriptFailed', handleError);
    };
  }, [showVideo]);
  return (
    <>
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
              Extra: <Computer size={16} className="text-red-500 animate-pulse" />,
              ExtraText: 'DEMO',
              name: 'Agent Console',
              icon: <UserCheck size={48} />,
              color: 'cyan',
              onclickValue: handleInteractiveDemo1,
            },
            {
              Extra: <Computer size={16} className="text-red-500 animate-pulse" />,
              ExtraText: 'DEMO',
              name: 'Reporting Tool',
              icon: <FileCheck2 size={48} />,
              color: 'green',
              onclickValue: handleInteractiveDemo2,
            },
            {
              Extra: <Computer size={16} className="text-red-500 animate-pulse" />,
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
      <div className="" id='vis-chat'></div>
      <Modal id={'call-container'} hasError={hasError} onclose={handleCloseCall} tag={showcall} isLoaded={isLoaded} text={'Call'} />
      <Modal id={'vis-chat2'} hasError={hasError} onclose={handleCloseChat} tag={showchat} isLoaded={isLoaded} text={'Chat'} />
      <Modal id={'video-chat'} hasError={hasError} onclose={handleCloseVideo} tag={showVideo} isLoaded={isLoaded} text={'Video'} />
      {InteractiveDemo1 && (<InteractiveDemo url={'https://app.supademo.com/embed/cm9837e26009t1o0ieyhu6asm?embed_v=2'} onClose={handleInteractiveDemo1Close} text={'Welcome to Agent Console'} />)}
      {InteractiveDemo2 && (<InteractiveDemo url={'https://app.supademo.com/embed/cm9816bor003q3r0i2j33ooe9?embed_v=2'} onClose={handleInteractiveDemo2Close} text={'Get An Overview of reports'} />)}
      {InteractiveDemo3 && (<InteractiveDemo url={'https://app.supademo.com/embed/cm982foyc004n1o0ihxdb4jyo?embed_v=2'} onClose={handleInteractiveDemo3Close} text={'Get an Quick overview of quality assurance'} />)}
    </>
  );
};

export default RightSideTop;

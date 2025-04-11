import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const CallModal = ({ onClose }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
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
        $.src = "https://192.168.60.161:4432/webtools/assets/js/call_ui.js?efc7b9590bc790c0ec8f";

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
  }, []);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-center items-center">
      <div
        className="bg-gradient-to-br from-green-500/5 to-cyan-500/5 border border-green-600 text-green-200 rounded-2xl p-6 w-[900px] min-h-72 shadow-[0_0_6px_#00ff88] flex flex-col justify-between items-center"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-full flex justify-end mb-2">
          <X onClick={onClose} className="cursor-pointer" />
        </div>

        <div className="w-full flex justify-center items-center min-h-[200px]">
          {hasError ? (
            <div className="text-red-400 text-center text-sm">
              Failed to load Call UI. Please try again later.
            </div>
          ) : !isLoaded ? (
            <div className="text-green-300 animate-pulse text-center">Loading Call UI...</div>
          ) : (
            <div id="call-container" className="w-full" />
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CallModal;

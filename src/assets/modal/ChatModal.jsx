import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const ChatModal = ({ showchat, onClose }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

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
  }, []);

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-center items-center ${showchat ? '' : 'hidden'}`}
    >
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
            <div id="vis-chat" className="w-full" />
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ChatModal;

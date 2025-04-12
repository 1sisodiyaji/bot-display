import { X } from 'lucide-react';
import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ id, hasError, onclose, isLoaded, tag , text }) => {
  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-center items-center ${tag ? '' : 'hidden'}`}
    >
      <div
        className="bg-gradient-to-br from-green-500/5 to-cyan-500/5 border border-green-600 text-green-200 rounded-2xl p-1 w-4/5 min-h-4/5 shadow-[0_0_6px_#00ff88] flex flex-col justify-between items-center relative scrollbar-hide"
        onClick={e => e.stopPropagation()}
      >
        <div className="mb-2 absolute -top-6 -right-4  bg-red-200 inline rounded-full p-2 z-20 active:scale-85">
          <X onClick={onclose} className="cursor-pointer text-red-400" />
        </div>

        <div className="w-full flex justify-center items-center min-h-[200px]">
          {hasError ? (
            <div className="text-red-400 text-center text-sm">Failed to load {text} UI. Please try again later.</div>
          ) : !isLoaded ? (
            <div className="text-green-300 animate-pulse text-center">Loading {text} UI...</div>
          ) : (
            <div id={id} className="w-full min-h-96 h-[79vh] rounded-md" />
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;

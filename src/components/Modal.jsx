import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ id,tag }) => {
  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-center items-center ${tag ? '' : 'hidden'}`}
    >
      <div
        className="bg-gradient-to-br from-green-500/5 to-cyan-500/5 border border-green-600 text-green-200  p-1 w-11/12 h-11/12 m-1 min-h-72 shadow-[0_0_6px_#00ff88] flex flex-col justify-between items-center relative scrollbar-hide"
        onClick={e => e.stopPropagation()}
      > 
        <div className="w-full flex justify-center items-center min-h-[90vh]">
          <div id={id} className="w-full min-h-96 h-full rounded-md m-auto " />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;

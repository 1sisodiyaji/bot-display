import { LoaderCircle, X } from 'lucide-react';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const InteractiveDemo = ({ onClose, url ,text}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-center items-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="bg-gradient-to-br from-green-500/5 to-cyan-500/5 border border-green-600 text-green-200 rounded-2xl p-1 w-11/12 min-h-72 shadow-[0_0_6px_#00ff88] flex flex-col justify-between items-center relative scrollbar-hide"
          onClick={e => e.stopPropagation()}
        >
          <div className="mb-2 absolute -top-6 -right-4  bg-red-200 inline rounded-full p-2 z-20 active:scale-85">
            <X onClick={onClose} className="cursor-pointer text-red-400" />
          </div>

          {!isLoaded && (
            <div className="absolute inset-0 flex flex-col justify-center items-center space-y-12 bg-black/70 rounded-2xl z-10">
              <LoaderCircle size={65} className="text-green-300  animate-spin" />
              <p className="text-2xl capitalize">{text}</p>
            </div>
          )}

          <div className="iframeBox w-full h-full">
            <iframe
              src={url}
              loading="lazy"
              title="RADIUS Reporting & Analytics Tool"
              allow="clipboard-write"
              frameBorder="0"
              webkitallowfullscreen="true"
              mozallowfullscreen="true"
              allowFullScreen
              className="iframeInner w-full h-[600px] rounded-xl"
              onLoad={() => setIsLoaded(true)}
            ></iframe>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default InteractiveDemo;

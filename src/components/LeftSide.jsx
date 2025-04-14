import { Cable, Flame, MessageSquare, Ratio, Sunset, Zap } from 'lucide-react';
import React from 'react';

const LeftSide = () => {
  return (
    <>
      <div className="text-white font-semibold text-lg tracking-wider mb-6">
        <a href="https://radius-ois.ai" target="_blank">
          RADIUS
        </a>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="grid grid-cols-1 gap-2 w-full">
          {[
            
            { label: 'INTEGRATED SOLUTIONS', stats: 45, data: '45+', icon: <Cable size={20} /> },
            {
              label: 'MULTICHANNEL SUPPORT',
              stats: 90,
              data: '24X7',
              icon: <MessageSquare size={20} />,
            },
            { label: 'YEARS OF TECHNOLOGY', stats: 60, data: '10+', icon: <Sunset size={20} /> },
            { label: 'FEATURES WE OFFER', stats: 100, data: '500+', icon: <Zap size={20} /> },
            {
              label: 'BESPOKE SOLUTIONS DEVELOPED',
              stats: 85,
              data: '40+',
              icon: <Flame size={20} />,
            },
          ].map((metric, idx) => (
            <div
              key={idx}
              className={`p-1 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.05)] hover:scale-[1.03] transition-transform duration-300 mb-4`}
            >
               <div className="flex items-center gap-3">
            <div className={` p-3 text-white bg-gradient-to-bl from-gray-600 to bg-green-300 rounded-full`}>
              {metric.icon}
            </div>
            <div className="flex flex-col">
            <span className="text-2xl font-bold text-cyan-600">{metric.data}</span>
              <span className="text-xs font-medium text-white">{metric.label}</span> 
            </div>
          </div>
            </div>
          ))}
        </div>
        <div className="mt-4 border border-green-900/30 rounded-lg p-3 bg-black/50 h-1/6 overflow-hidden text-cyan-200">
         <a href='https://radius-ois.ai' target='blank'>
          <img
            src="https://radius-ois.ai/wp-content/uploads/2025/04/white-final.png"
            className="w-full h-full object-contain"
            alt="radius logo white"
            loading="lazy"
          />
          </a>
        </div>
      </div>
    </>
  );
};

export default LeftSide;

import { MessageSquare, Ratio, Sunset, Zap } from 'lucide-react';
import React from 'react';

const LeftSide = () => {
  return (
    <>
      <div className="text-white font-semibold text-lg tracking-wider mb-6">
        <a href="https://radius-ois.ai" target="_blank">
          ABOUT RADIUS
        </a>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="grid grid-cols-1 gap-2 w-full">
          {[
            {
              label: 'MULTICHANNEL SUPPORT',
              stats: 70,
              data: '24X7',
              icon: <MessageSquare size={20} />,
            },
            { label: 'INTEGRATED SOLUTIONS', stats: 90, data: '45+', icon: <Ratio size={20} /> },
            { label: 'YEARS OF TECHNOLOGY', stats: 60, data: '10+', icon: <Sunset size={20} /> },
            { label: 'FEATURES WE OFFER', stats: 100, data: '500+', icon: <Zap size={20} /> },
            {
              label: 'BESPOKE SOLUTIONS DEVELOPED',
              stats: 85,
              data: '40+',
              icon: <Zap size={20} />,
            },
          ].map((metric, idx) => (
            <div
              key={idx}
              className={`p-1 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.05)] hover:scale-[1.03] transition-transform duration-300`}
            >
              <div className="flex justify-between items-center gap-2 mb-2">
                <span className={`font-mono text-xs text-white`}>{metric.label}</span>
                <span className={`text-2xl font-semibold text-cyan-600 mb-2`}>{metric.data}</span>
              </div>

              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-bl from-green-400 to-cyan-300 transition-all duration-500 ease-in-out rounded-md"
                  style={{ width: `${metric.stats}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 border border-green-900/30 rounded-lg p-3 bg-black/50 h-1/6 overflow-hidden text-cyan-200">
          <img
            src="https://radius-ois.ai/wp-content/uploads/2025/04/white-final.png"
            className="w-full h-full object-contain"
            alt="radius logo white"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
};

export default LeftSide;

import React, { useState } from 'react';
import SurveyModal from './Survey';
import { HeartHandshake } from 'lucide-react';

const SurveyBox = () => {
  const [showSurvey, setShowSurvey] = useState(false);
  const handleOpenSurvey = () => setShowSurvey(true);
  const handleCloseSurvey = () => setShowSurvey(false);
  return (
    <>
      <div className="rounded-lg  bg-black/50 h-full cursor-pointer" onClick={handleOpenSurvey}>
        <div className="flex flex-col justify-between h-full items-start">
          <div className="text-green-400/80 text-xs font-roboto">
            <div className="text-white font-semibold text-lg mb-2">SURVEY</div>
            <div className="text-xs text-cyan-300/80 animate-pulse font-light">&gt; TAKE A SURVEY</div>
          </div>
          <HeartHandshake className="w-24 h-24 animate-pulse place-self-end text-green-400/80" />
        </div>
      </div>
      {showSurvey && <SurveyModal onClose={handleCloseSurvey} />}
    </>
  );
};

export default SurveyBox;

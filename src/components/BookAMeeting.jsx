import { CalendarArrowUp, CircleDot } from 'lucide-react';
import { useState } from 'react';
import InteractiveDemo from './InteractiveDemo';

const BookAMeeting = () => {
  const [showMeeting, setShowMeeting] = useState(false);

  const handleOpenMeeting = () => {
    setShowMeeting(true);
  };

  const handleCloseMeeting = () => {
    setShowMeeting(false);
  };
  return (
    <>
      <div className="h-full flex flex-col items-start justify-between cursor-pointer p-2" onClick={handleOpenMeeting}>
        <div className="text-white font-semibold text-lg tracking-wider mb-3">
          BOOK A DEMO
          <div className="flex gap-2 items-center">
            <CircleDot className="w-4 text-green-400" />{' '}
            <p className="text-xs text-cyan-300/80 animate-pulse">12 SLOTS AVAILABLE </p>
          </div>
        </div>
        <CalendarArrowUp className="w-24 h-24 text-green-400/80 animate-pulse place-self-end" />
      </div>
      {showMeeting && (
        <InteractiveDemo
          onClose={handleCloseMeeting}
          url={'https://calendly.com/radius-ois/radius-ois-product-demonstration'}
          text={'Schedule Your Meeting'}
        />
      )}
    </>
  );
};

export default BookAMeeting;

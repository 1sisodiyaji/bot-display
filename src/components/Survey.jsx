import React, { useState, useRef } from 'react';
import { PartyPopper, Sparkle, Star } from 'lucide-react';
import ReactDOM from 'react-dom';

const SurveyModal = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ q1: 0, q2: 0, q3: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [animation, setAnimation] = useState('effect-fadeIn');
  const formRef = useRef(null);

  const questions = [
    'How would you rate your experience with RADIUS at the booth?',
    'How helpful was our Demo / Walkthrough?',
    'Would you like to explore RADIUS further after this event?',
  ];

  const goToNextQuestion = () => {
    setAnimation('effect-fadeOut');
    setTimeout(() => {
      if (step < questions.length - 1) {
        setStep(step + 1);
      } else {
        handleSubmit();
      }
      setAnimation('effect-fadeIn');
    }, 400);
  };

  const formatTime = date => {
    const pad = n => n.toString().padStart(2, '0');
    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  };

  const handleStarClick = rating => {
    const key = `q${step + 1}`;
    const updatedFormData = { ...formData, [key]: rating };
    setFormData(updatedFormData);

    goToNextQuestion();
  };

  const handleYesNoClick = answer => {
    const updatedFormData = { ...formData, q3: answer };
    setFormData(updatedFormData);
    
    if (answer === 'No') {
      // If answer is No, directly submit the form
      setAnimation('effect-fadeOut');
      setTimeout(() => handleSubmit(updatedFormData), 400);
    } else {
      // If answer is Yes, show email input screen
      setAnimation('effect-fadeOut');
      setTimeout(() => {
        setStep(3); // Move to an additional step for email collection
        setAnimation('effect-fadeIn');
      }, 400);
    }
  };

  const handleEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setAnimation('effect-fadeOut');
    setTimeout(() => handleSubmit(), 400);
  };

  const handleSubmit = async (finalData = null) => {
    try {
      setIsSubmitting(true);
      const dataToUse = finalData || formData;

      const formDataToSubmit = new FormData();
      formDataToSubmit.append('TimeStamp', formatTime(new Date()));
      formDataToSubmit.append('question1', dataToUse.q1);
      formDataToSubmit.append('question2', dataToUse.q2);
      formDataToSubmit.append('question3', dataToUse.q3);
      formDataToSubmit.append('email', dataToUse.email);

      await fetch(
        'https://script.google.com/macros/s/AKfycbzM2_sLX1dsf3hcjO3FvsbkUJrqIX4WO4b5Ml9eYOQdCYfkLD_aQGkXtyWNMZt2AF1j/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          body: formDataToSubmit,
        }
      );

      setSubmitted(true);
      setTimeout(onClose, 1500);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = value => {
    return Array(5)
      .fill()
      .map((_, i) => (
        <Star
          key={i}
          size={45}
          className={`cursor-pointer transition-all hover:scale-125 ${i < value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-500 hover:text-yellow-300'
            }`}
          onClick={() => handleStarClick(i + 1)}
        />
      ));
  };

  // Calculate progress percentage based on total steps (now including email step when needed)
  const totalSteps = formData.q3 === 'Yes' ? 4 : 3;
  const currentProgress = Math.min(step + 1, totalSteps);
  const progressPercentage = (currentProgress / totalSteps) * 100;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-center items-center" onClick={onClose}>
      <div className="bg-gradient-to-br from-green-500/5 to-cyan-500/5 border border-green-600 text-green-200 rounded-2xl p-6 w-[600px] min-h-72 shadow-[0_0_6px_#00ff88] flex flex-col justify-between items-center">
        <div
          className="relative bg-gradient-to-br from-green-900/20 to-cyan-900/20 border border-green-600/60 text-green-200 
                  rounded-2xl p-8 w-full z-10
                  flex flex-col justify-between items-center transition-transform hover:scale-105"
          style={{
            boxShadow: '0 0 25px rgba(0, 255, 136, 0.3), inset 0 0 15px rgba(0, 255, 136, 0.1)',
          }}
          onClick={e => e.stopPropagation()}
        >
          <div className="absolute top-0 right-0 w-full h-2 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-70 rounded-t-2xl"></div>

          <div className="h-2 w-full bg-gray-800/60 rounded-full overflow-hidden mb-8">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-cyan-400 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {!submitted ? (
            <>
              <div className={`flex flex-col items-center w-full ${animation}`}>
                {step < 3 ? (
                  <>
                    <h2 className="text-2xl font-roboto text-cyan-300 mb-8 text-center">{questions[step]}</h2>
                    
                    {step < 2 ? (
                      <div className="flex justify-center gap-3 mb-8 transition-all">
                        {renderStars(formData[`q${step + 1}`])}
                      </div>
                    ) : (
                      <div className="flex justify-center gap-6 mb-8 transition-all">
                        <button
                          onClick={() => handleYesNoClick('Yes')}
                          className="px-6 py-2 bg-green-600/30 border border-green-400 text-green-200 rounded-xl hover:bg-green-500/40 transition-all hover:scale-110"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => handleYesNoClick('No')}
                          className="px-6 py-2 bg-red-600/30 border border-red-400 text-red-200 rounded-xl hover:bg-red-500/40 transition-all hover:scale-110"
                        >
                          No
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  // Email collection form
                  <>
                    <h2 className="text-2xl font-roboto text-cyan-300 mb-8 text-center">
                      Please provide your email for further information
                    </h2>
                    <form onSubmit={handleEmailSubmit} className="w-full max-w-md">
                      <div className="flex flex-col gap-4 w-full">
                        <input
                          type="email"
                          value={formData.email}
                          onChange={handleEmailChange}
                          placeholder="Your email address"
                          required
                          className="w-full px-4 py-3 bg-black/20 border border-green-500/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-green-100 placeholder-green-300/50"
                        />
                        <button
                          type="submit"
                          className="px-6 py-3 bg-green-600/30 border border-green-400 text-green-200 rounded-xl hover:bg-green-500/40 transition-all hover:scale-105 mt-2"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </>
                )}

                <div className="text-sm text-cyan-300/70 mt-4">
                  {step < 3 ? (
                    <>Question {step + 1} of {questions.length}</>
                  ) : (
                    <>Final Step</>
                  )}
                </div>
              </div>

              {isSubmitting && (
                <div className="flex items-center gap-2 text-cyan-400 mt-4">
                  <svg className="animate-spin h-5 w-5 text-cyan-400" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting...
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-6 text-green-400 text-center py-6 animate-fadeIn">
              <h2 className="text-3xl font-bold">Thank you for your feedback!</h2>
              <p className="text-xl text-green-300/80">Enjoy the rest of the experience 🚀</p>
              <div className="flex gap-6 items-center mt-4">
                <PartyPopper className="text-orange-400 animate-bounce" size={50} />
                <Sparkle className="text-green-200 animate-ping" size={40} />
                <PartyPopper className="text-yellow-400 rotate-180 animate-bounce" size={50} />
              </div>
            </div>
          )}

          <form
            ref={formRef}
            method="POST"
            action="https://script.google.com/macros/s/AKfycbzM2_sLX1dsf3hcjO3FvsbkUJrqIX4WO4b5Ml9eYOQdCYfkLD_aQGkXtyWNMZt2AF1j/exec"
            style={{ display: 'none' }}
            onSubmit={e => e.preventDefault()}
          >
            <input type="hidden" name="question1" value={formData.q1} />
            <input type="hidden" name="question2" value={formData.q2} />
            <input type="hidden" name="question3" value={formData.q3} />
            <input type="hidden" name="email" value={formData.email} />
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SurveyModal;
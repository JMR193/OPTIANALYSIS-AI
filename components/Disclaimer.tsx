
import React from 'react';

const Disclaimer: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-12 p-4 text-center bg-gray-200 rounded-lg">
      <p className="text-xs text-gray-600">
        <strong>Disclaimer:</strong> This AI Eye Health Assistant is an informational tool and not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this application.
      </p>
    </div>
  );
};

export default Disclaimer;

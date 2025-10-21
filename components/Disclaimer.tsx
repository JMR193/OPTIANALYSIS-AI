import React from 'react';

const Disclaimer: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-12 p-4 text-center bg-gray-200 rounded-lg">
      <p className="text-xs text-gray-600">
        <strong>Disclaimer:</strong> This AI assistant is an informational tool and not a substitute for professional medical advice, diagnosis, or treatment. It is intended to support, not replace, the judgment of qualified healthcare professionals. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
      </p>
    </div>
  );
};

export default Disclaimer;

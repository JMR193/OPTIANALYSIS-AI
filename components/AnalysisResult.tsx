
import React from 'react';
import type { EyeAnalysis } from '../types';

interface AnalysisResultProps {
  data: EyeAnalysis;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ data }) => {
  return (
    <div className="w-full max-w-lg mx-auto mt-8 bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{data.potentialCondition}</h2>
        <p className="text-sm text-yellow-600 bg-yellow-100 p-3 rounded-lg mb-4">{data.disclaimer}</p>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-700">Description</h3>
            <p className="text-gray-600 mt-1">{data.description}</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-700">Common Symptoms</h3>
            <ul className="list-disc list-inside mt-1 text-gray-600 space-y-1">
              {data.commonSymptoms.map((symptom, index) => (
                <li key={index}>{symptom}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">Recommendation</h3>
            <p className="text-gray-600 mt-1">{data.recommendation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;

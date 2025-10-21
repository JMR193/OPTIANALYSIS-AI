import React, { useState, useCallback } from 'react';
import { analyzeEyeImage, analyzeReport } from './services/geminiService';
import type { EyeAnalysis, ReportAnalysis } from './types';
import ImageUploader from './components/ImageUploader';
import AnalysisResult from './components/AnalysisResult';
import Spinner from './components/Spinner';
import Disclaimer from './components/Disclaimer';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<EyeAnalysis | ReportAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisType, setAnalysisType] = useState<'image' | 'report'>('image');

  const handleImageUpload = useCallback((file: File) => {
    setImageFile(file);
    setAnalysisResult(null);
    setError(null);
    if (file.type.startsWith("image/")) {
        setImageUrl(URL.createObjectURL(file));
    } else {
        setImageUrl(null); // It's not an image, so no URL preview
    }
  }, []);
  
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // remove the `data:*/*;base64,` part
        resolve(result.split(',')[1]);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleAnalyze = async () => {
    if (!imageFile) {
      setError("Please upload an image or report first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const base64Data = await fileToBase64(imageFile);
      let result;
      if (analysisType === 'image') {
        result = await analyzeEyeImage(base64Data, imageFile.type);
      } else {
        result = await analyzeReport(base64Data, imageFile.type);
      }
      setAnalysisResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAnalysisTypeChange = (type: 'image' | 'report') => {
      setAnalysisType(type);
      setImageFile(null);
      setImageUrl(null);
      setAnalysisResult(null);
      setError(null);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl mx-auto text-center">
        <header className="my-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 tracking-tight">
                AI Clinical Eye Assistant
            </h1>
            <p className="mt-3 text-lg text-gray-600">
                Analyze an eye photo for potential conditions or summarize a clinical report for key insights.
            </p>
        </header>

        <main className="flex flex-col items-center gap-6">
            <div className="w-full max-w-lg mx-auto bg-gray-200 rounded-xl p-1 flex space-x-1">
                <button onClick={() => handleAnalysisTypeChange('image')} className={`w-full py-2.5 text-sm font-medium leading-5 rounded-lg transition-all duration-300 ${analysisType === 'image' ? 'bg-white text-blue-700 shadow' : 'text-gray-700 hover:bg-white/[0.5]'}`}>
                    Analyze Eye Photo
                </button>
                <button onClick={() => handleAnalysisTypeChange('report')} className={`w-full py-2.5 text-sm font-medium leading-5 rounded-lg transition-all duration-300 ${analysisType === 'report' ? 'bg-white text-blue-700 shadow' : 'text-gray-700 hover:bg-white/[0.5]'}`}>
                    Summarize Report/Scan
                </button>
            </div>
            
            <ImageUploader onImageUpload={handleImageUpload} imageUrl={imageUrl} imageFile={imageFile} analysisType={analysisType} />
            
            <button
                onClick={handleAnalyze}
                disabled={!imageFile || isLoading}
                className="w-full max-w-lg h-14 px-6 text-white font-semibold bg-blue-600 rounded-xl shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 flex items-center justify-center"
            >
                {isLoading ? <Spinner /> : analysisType === 'image' ? 'Analyze Eye Image' : 'Summarize Report'}
            </button>

            {error && (
                <div className="w-full max-w-lg p-4 mt-4 text-center text-red-700 bg-red-100 rounded-xl">
                    <p>{error}</p>
                </div>
            )}

            {analysisResult && <AnalysisResult data={analysisResult} />}
            
            <Disclaimer />
        </main>
      </div>
    </div>
  );
};

export default App;

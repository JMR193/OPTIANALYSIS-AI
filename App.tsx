
import React, { useState, useCallback } from 'react';
import { analyzeEyeImage } from './services/geminiService';
import type { EyeAnalysis } from './types';
import ImageUploader from './components/ImageUploader';
import AnalysisResult from './components/AnalysisResult';
import Spinner from './components/Spinner';
import Disclaimer from './components/Disclaimer';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<EyeAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback((file: File) => {
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
    setAnalysisResult(null);
    setError(null);
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
      setError("Please upload an image first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const base64Image = await fileToBase64(imageFile);
      const result = await analyzeEyeImage(base64Image, imageFile.type);
      setAnalysisResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl mx-auto text-center">
        <header className="my-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 tracking-tight">
                AI Eye Health Assistant
            </h1>
            <p className="mt-3 text-lg text-gray-600">
                Upload a clear photo of your eye for an AI-powered preliminary analysis.
            </p>
        </header>

        <main className="flex flex-col items-center gap-6">
            <ImageUploader onImageUpload={handleImageUpload} imageUrl={imageUrl} />
            
            <button
                onClick={handleAnalyze}
                disabled={!imageFile || isLoading}
                className="w-full max-w-lg h-14 px-6 text-white font-semibold bg-blue-600 rounded-xl shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 flex items-center justify-center"
            >
                {isLoading ? <Spinner /> : 'Analyze Eye Image'}
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

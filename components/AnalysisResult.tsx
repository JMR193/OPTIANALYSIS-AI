import React from 'react';
import type { EyeAnalysis, ReportAnalysis } from '../types';

// Type guard to differentiate between analysis types
function isReportAnalysis(data: EyeAnalysis | ReportAnalysis): data is ReportAnalysis {
  return 'summary' in data;
}

// Helper component for list sections to avoid repetition
const InfoSection: React.FC<{ title: string; items?: string[]; children?: React.ReactNode; icon: React.ReactNode }> = ({ title, items, children, icon }) => {
  if (!items && !children) return null;
  if (items && items.length === 0) return null;

  return (
    <div className="border-t border-gray-200 pt-4">
      <h3 className="font-semibold text-gray-800 flex items-center text-lg">
        <span className="mr-3 text-blue-600">{icon}</span>
        {title}
      </h3>
      {items && (
        <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1 pl-4">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
      {children && <div className="mt-2 text-gray-600 pl-4">{children}</div>}
    </div>
  );
};

// --- SVG Icons for Eye Analysis ---
const DescriptionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" /></svg>;
const SymptomsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
const EarlyDetectionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
const RiskFactorsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const TestsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>;
const TreatmentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" /></svg>;
const MultiDisciplinaryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const PreventionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const QuestionsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const RecommendationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;

// --- SVG Icons for Report Analysis ---
const SummaryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const FindingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const DiagnosisIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const AlertIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;


const EyeImageResult: React.FC<{ data: EyeAnalysis }> = ({ data }) => (
    <div className="w-full max-w-2xl mx-auto mt-8 bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in">
        <div className="p-6 md:p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{data.potentialCondition}</h2>
            <p className="text-sm text-yellow-800 bg-yellow-100 p-3 rounded-lg mb-6 border border-yellow-200">{data.disclaimer}</p>

            <div className="space-y-5">
                <InfoSection title="Description" icon={<DescriptionIcon />}><p>{data.description}</p></InfoSection>
                <InfoSection title="Common Symptoms" items={data.commonSymptoms} icon={<SymptomsIcon />} />
                <InfoSection title="Early Detection Signs" items={data.earlyDetectionSigns} icon={<EarlyDetectionIcon />} />
                <InfoSection title="Potential Risk Factors" items={data.riskFactors} icon={<RiskFactorsIcon />} />
                <InfoSection title="Recommended Tests" items={data.recommendedTests} icon={<TestsIcon />} />
                <InfoSection title="Common Treatment Options" icon={<TreatmentIcon />}><p>{data.treatmentOptions}</p></InfoSection>
                <InfoSection title="Multidisciplinary Approach" icon={<MultiDisciplinaryIcon />}><p>{data.multidisciplinaryApproach}</p></InfoSection>
                <InfoSection title="Prevention Tips" items={data.preventionTips} icon={<PreventionIcon />} />
                <InfoSection title="Questions to Ask Your Doctor" items={data.followUpQuestions} icon={<QuestionsIcon />} />

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mt-6">
                    <h3 className="font-semibold text-blue-800 flex items-center text-lg">
                        <span className="mr-3"><RecommendationIcon /></span>
                        Final Recommendation
                    </h3>
                    <p className="text-blue-700 mt-2">{data.recommendation}</p>
                </div>
            </div>
        </div>
    </div>
);

const ReportResult: React.FC<{ data: ReportAnalysis }> = ({ data }) => (
    <div className="w-full max-w-2xl mx-auto mt-8 bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in">
      <div className="p-6 md:p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Clinical Report Summary</h2>
        <p className="text-md font-medium text-gray-500 mb-4">{data.reportType}</p>
        <p className="text-sm text-yellow-800 bg-yellow-100 p-3 rounded-lg mb-6 border border-yellow-200">{data.disclaimer}</p>
        
        <div className="space-y-5">
            {data.criticalAlerts && data.criticalAlerts.length > 0 && (
                 <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                    <h3 className="font-semibold text-red-800 flex items-center text-lg">
                        <span className="mr-3"><AlertIcon /></span>
                        Critical Alerts
                    </h3>
                    <ul className="list-disc list-inside mt-2 text-red-700 space-y-1 pl-4">
                        {data.criticalAlerts.map((item, index) => ( <li key={index}>{item}</li> ))}
                    </ul>
                </div>
            )}

            <InfoSection title="Summary" icon={<SummaryIcon />}><p>{data.summary}</p></InfoSection>
            <InfoSection title="Key Findings" items={data.keyFindings} icon={<FindingsIcon />} />
            <InfoSection title="Differential Diagnosis" items={data.differentialDiagnosis} icon={<DiagnosisIcon />} />
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mt-6">
                <h3 className="font-semibold text-blue-800 flex items-center text-lg">
                    <span className="mr-3"><RecommendationIcon /></span>
                    Recommendations for Clinician
                </h3>
                 <ul className="list-disc list-inside mt-2 text-blue-700 space-y-1 pl-4">
                    {data.recommendationsForClinician.map((item, index) => ( <li key={index}>{item}</li> ))}
                </ul>
            </div>
        </div>
      </div>
    </div>
);


const AnalysisResult: React.FC<{ data: EyeAnalysis | ReportAnalysis }> = ({ data }) => {
  if (isReportAnalysis(data)) {
    return <ReportResult data={data} />;
  }
  return <EyeImageResult data={data} />;
};

export default AnalysisResult;

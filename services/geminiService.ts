import { GoogleGenAI, Type } from "@google/genai";
import type { EyeAnalysis, ReportAnalysis } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const analysisSchema = {
    type: Type.OBJECT,
    properties: {
        disclaimer: {
            type: Type.STRING,
            description: "A mandatory disclaimer stating this is not a medical diagnosis and is for informational purposes only."
        },
        potentialCondition: {
            type: Type.STRING,
            description: "The name of the most likely potential eye condition. If none, state 'No immediate concerns detected'."
        },
        description: {
            type: Type.STRING,
            description: "A detailed description of the potential condition."
        },
        commonSymptoms: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of common symptoms associated with the condition."
        },
        earlyDetectionSigns: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of early warning signs or subtle symptoms for the condition."
        },
        riskFactors: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Common risk factors associated with the condition (e.g., age, genetics, lifestyle)."
        },
        recommendedTests: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of specific diagnostic tests an ophthalmologist might recommend."
        },
        treatmentOptions: {
            type: Type.STRING,
            description: "A brief overview of common treatment pathways or management strategies."
        },
        multidisciplinaryApproach: {
            type: Type.STRING,
            description: "Mention if managing this condition often requires collaboration with other medical specialists (e.g., endocrinologist for diabetic retinopathy) and why. If not applicable, state 'Typically managed by an ophthalmologist alone'."
        },
        preventionTips: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Actionable tips for eye health and prevention related to the condition."
        },
        followUpQuestions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of pertinent questions the user can ask their doctor to better understand their situation."
        },
        recommendation: {
            type: Type.STRING,
            description: "A clear, concluding recommendation, usually advising to consult a professional ophthalmologist for a definitive diagnosis and treatment plan."
        },
    },
    required: [
        "disclaimer", 
        "potentialCondition", 
        "description", 
        "commonSymptoms", 
        "earlyDetectionSigns",
        "riskFactors",
        "recommendedTests",
        "treatmentOptions",
        "multidisciplinaryApproach",
        "preventionTips",
        "followUpQuestions",
        "recommendation"
    ]
};

const reportAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        disclaimer: {
            type: Type.STRING,
            description: "A mandatory disclaimer stating this is an AI-generated summary for clinical support and must be verified by a qualified professional."
        },
        summary: {
            type: Type.STRING,
            description: "A concise, high-level summary of the entire report in 2-3 sentences."
        },
        reportType: {
            type: Type.STRING,
            description: "The identified type of the report (e.g., 'OCT Scan of Macula', 'Fundus Photography', 'Visual Field Test'). If unknown, state 'General Ophthalmic Report'."
        },
        keyFindings: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A bulleted list of the most important clinical findings and measurements from the report."
        },
        differentialDiagnosis: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of potential differential diagnoses based on the report's findings, ranked from most to least likely."
        },
        recommendationsForClinician: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of actionable recommendations or next steps for the clinician (e.g., 'Consider anti-VEGF therapy', 'Schedule follow-up in 3 months', 'Correlate with patient's history')."
        },
        criticalAlerts: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of any critical findings that require immediate attention (e.g., 'Signs suggestive of retinal detachment', 'Intraocular pressure > 30 mmHg'). If none, this should be an empty array."
        },
    },
    required: [
        "disclaimer",
        "summary",
        "reportType",
        "keyFindings",
        "differentialDiagnosis",
        "recommendationsForClinician",
        "criticalAlerts"
    ]
};


export const analyzeEyeImage = async (base64Image: string, mimeType: string): Promise<EyeAnalysis> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
          parts: [
              {
                  inlineData: {
                      data: base64Image,
                      mimeType: mimeType,
                  },
              },
              {
                  text: "You are an AI medical assistant specializing in ophthalmology. Analyze this image of an eye. Provide a comprehensive report in the specified JSON format. The report should cover: a potential condition, its description, common symptoms, early detection signs, risk factors, recommended diagnostic tests, common treatment options, any multidisciplinary approach needed, prevention tips, questions to ask a doctor, and a final recommendation. Do not diagnose, but suggest possibilities. If the image is not of an eye or is unclear, state that in the `potentialCondition` field and recommend uploading a clearer image, filling other fields with relevant 'not applicable' messages."
              },
          ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);
    return parsedJson as EyeAnalysis;
  } catch (error) {
    console.error("Error analyzing eye image:", error);
    throw new Error("Failed to analyze image. The Gemini API may be experiencing issues.");
  }
};


export const analyzeReport = async (base64Data: string, mimeType: string): Promise<ReportAnalysis> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro', // Using a more advanced model for complex document analysis
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64Data,
                            mimeType: mimeType,
                        },
                    },
                    {
                        text: "You are an expert AI assistant for ophthalmologists. Analyze the provided medical document (which could be a scan, report, or image of a report). Extract and summarize the key information in the specified JSON format. Your audience is a busy clinician, so be concise and clinically relevant. Focus on significant findings, differential diagnoses, actionable recommendations, and critical alerts. If the document is not a recognizable medical report or is unreadable, state that clearly in the summary and fill other fields appropriately."
                    },
                ],
            },
            config: {
                responseMimeType: "application/json",
                responseSchema: reportAnalysisSchema,
            },
        });

        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);
        return parsedJson as ReportAnalysis;
    } catch (error) {
        console.error("Error analyzing report:", error);
        throw new Error("Failed to analyze report. The Gemini API may be experiencing issues or the document format is unsupported.");
    }
};

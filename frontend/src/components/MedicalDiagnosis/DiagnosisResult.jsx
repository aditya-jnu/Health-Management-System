import React from "react";
import { 
  AlertTriangle, 
  Activity, 
  Heart, 
  Clock, 
  BookOpen, 
  Link as LinkIcon,
  ChevronDown,
  AlertCircle,
  BookMarked,
  Brain
} from "lucide-react";

const DiagnosisResult = ({ result }) => {
  if (!result) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center space-y-4 text-gray-500 p-8 border-2 border-dashed border-gray-200 rounded-xl">
        <Activity className="w-12 h-12 animate-pulse" />
        <p className="text-lg font-medium">Fill out the form above to get your diagnosis</p>
      </div>
    );
  }

  return (
    <div className="mt-12 space-y-8 animate-fadeIn">
      {/* Disclaimer Banner */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg flex items-start space-x-3">
        <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-700">{result.disclaimer}</p>
      </div>

      {result.result?.analysis?.possibleConditions?.length > 0 && (
        <div className="space-y-8">
          {/* Possible Conditions Section */}
          <div className="animate-slideIn">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <Brain className="w-6 h-6 text-blue-600" />
              <span>Diagnosis Analysis</span>
            </h3>
            
            <div className="grid gap-6 md:grid-cols-1">
              {result.result.analysis.possibleConditions.map((condition, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-bold text-blue-600">
                        {condition.condition}
                      </h4>
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-medium ${
                          condition.riskLevel.toLowerCase() === "low"
                            ? "bg-green-100 text-green-700"
                            : condition.riskLevel.toLowerCase() === "medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {condition.riskLevel} Risk
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4">{condition.description}</p>

                    <div className="space-y-4">
                      {/* Symptoms Comparison */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h5 className="font-semibold text-gray-700 mb-2">Common Symptoms</h5>
                          <div className="flex flex-wrap gap-2">
                            {condition.commonSymptoms?.map((symptom, idx) => (
                              <span key={idx} className="bg-white px-3 py-1 rounded-full text-sm text-gray-600">
                                {symptom}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h5 className="font-semibold text-blue-700 mb-2">Matching Symptoms</h5>
                          <div className="flex flex-wrap gap-2">
                            {condition.matchingSymptoms?.map((symptom, idx) => (
                              <span key={idx} className="bg-white px-3 py-1 rounded-full text-sm text-blue-600">
                                {symptom}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h5 className="font-semibold text-gray-700 mb-2">Additional Information</h5>
                        <p className="text-gray-600">{condition.additionalInfo}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-slideIn">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
              <Heart className="w-6 h-6 text-rose-600" />
              <span>Recommendations</span>
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* General Advice */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-blue-500" />
                  <span>General Advice</span>
                </h4>
                <ul className="space-y-2">
                  {result.result.analysis.generalAdvice?.recommendedActions?.map((action, index) => (
                    <li key={index} className="flex items-center space-x-2 text-gray-600">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lifestyle Considerations */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-green-500" />
                  <span>Lifestyle Considerations</span>
                </h4>
                <ul className="space-y-2">
                  {result.result.analysis.generalAdvice?.lifestyleConsiderations?.map(
                    (consideration, index) => (
                      <li key={index} className="flex items-center space-x-2 text-gray-600">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>{consideration}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            {/* Medical Attention Section */}
            <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-100">
              <h4 className="text-lg font-semibold text-red-800 flex items-center space-x-2 mb-3">
                <Clock className="w-5 h-5" />
                <span>When to Seek Medical Attention</span>
              </h4>
              <ul className="space-y-2">
                {result.result.analysis.generalAdvice?.whenToSeekMedicalAttention?.map(
                  (attention, index) => (
                    <li key={index} className="flex items-center space-x-2 text-red-700">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                      <span>{attention}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Educational Resources */}
          {result?.result?.educationalResources && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-slideIn">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                <BookOpen className="w-6 h-6 text-indigo-600" />
                <span>Educational Resources</span>
              </h3>

              <div className="space-y-6">
                {/* Medical Terminology */}
                {Object.keys(result.result.educationalResources.medicalTerminology || {}).length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                      <BookMarked className="w-5 h-5 text-indigo-500" />
                      <span>Medical Terminology</span>
                    </h4>
                    <div className="grid gap-3">
                      {Object.entries(result.result.educationalResources.medicalTerminology).map(
                        ([term, definition], index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <span className="font-semibold text-indigo-600">{term}:</span>
                            <span className="text-gray-600 ml-2">{definition}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Reliable Sources */}
                {result.result.educationalResources.reliableSources?.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                      <LinkIcon className="w-5 h-5 text-indigo-500" />
                      <span>Reliable Sources</span>
                    </h4>
                    <div className="grid gap-2">
                      {result.result.educationalResources.reliableSources.map((source, index) => (
                        <a
                          key={index}
                          href={source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors p-2 rounded-lg hover:bg-gray-50"
                        >
                          <LinkIcon className="w-4 h-4" />
                          <span>{source}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DiagnosisResult;
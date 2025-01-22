import React, { useState } from "react";
import Button from "../UI/Button";
import DiagnosisResult from "./DiagnosisResult";
import { Stethoscope, AlertCircle, Activity, UserCircle2 } from "lucide-react";
const mockResult = {
  status: "success",
  result: {
    analysis: {
      possibleConditions: [
        {
          condition: "Migraine",
          description: "A primary headache disorder...",
          commonSymptoms: [
            "Severe headache",
            "Sensitivity to light",
            "Nausea",
            "Fatigue",
          ],
          matchingSymptoms: [
            "severe headache",
            "sensitivity to light",
            "fatigue",
          ],
          riskLevel: "Medium",
          additionalInfo: "Migraine can be triggered by various factors...",
        },
      ],
      generalAdvice: {
        recommendedActions: [
          "Hydrate adequately",
          "Rest and avoid strenuous activities",
        ],
        lifestyleConsiderations: [
          "Maintain a balanced diet",
          "Monitor blood pressure",
        ],
        whenToSeekMedicalAttention: ["If symptoms worsen or do not improve"],
      },
    },
    educationalResources: {
      medicalTerminology: { migraine: "A type of headache..." },
      preventiveMeasures: [
        "Keep a headache diary",
        "Practice relaxation techniques",
      ],
      reliableSources: [
        "Mayo Clinic (www.mayoclinic.org)",
        "CDC (www.cdc.gov)",
      ],
    },
    disclaimer: "This analysis is for educational purposes only...",
  },
};



const MedicalDiagnosisForm = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    symptoms: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    medicalHistory: "",
    currentMedications: "",
    allergies: "",
    smoking: false,
    alcohol: "none",
    exercise: "moderate",
    diet: "balanced",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const fetchResult = async (queueId) => {
    try {
      const url = `https://ai-medical-diagnosis-api-symptoms-to-results.p.rapidapi.com/getResult/${queueId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          'x-rapidapi-key': '356f91d6cdmsh5903b45f861ec51p178dfcjsn3228785bad00',
		      'x-rapidapi-host': 'ai-medical-diagnosis-api-symptoms-to-results.p.rapidapi.com',

        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status !== "pending") {
        setResult(data);
        setLoading(false);
      } else {
        setTimeout(() => fetchResult(queueId), 2000);
      }
    } catch (error) {
      console.error("Error fetching result:", error);
      setResult({ error: error.message });
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setResult(mockResult);
      setLoading(false);
    }, 2000);

    try {
      const url = 'https://ai-medical-diagnosis-api-symptoms-to-results.p.rapidapi.com/analyzeSymptomsAndDiagnose?noqueue=1';

      const requestBody = {
        symptoms: formData.symptoms.split(',').map((s) => s.trim()),
        patientInfo: {
          age: parseInt(formData.age),
          gender: formData.gender,
          height: parseInt(formData.height),
          weight: parseInt(formData.weight),
          medicalHistory: formData.medicalHistory.split(',').map((s) => s.trim()),
          currentMedications: formData.currentMedications.split(',').map((s) => s.trim()),
          allergies: formData.allergies.split(',').map((s) => s.trim()),
          lifestyle: {
            smoking: formData.smoking,
            alcohol: formData.alcohol,
            exercise: formData.exercise,
            diet: formData.diet,
          },
        },
        lang: 'en',
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
        'x-rapidapi-key': '356f91d6cdmsh5903b45f861ec51p178dfcjsn3228785bad00',
		    'x-rapidapi-host': 'ai-medical-diagnosis-api-symptoms-to-results.p.rapidapi.com',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === 'pending') {
        fetchResult(data.queueId);
      } else {
        setResult(data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error getting diagnosis:', error);
      setResult({ error: error.message });
      setLoading(false);
    }
  };

  const formSteps = [
    {
      title: "Basic Information",
      icon: UserCircle2,
      fields: ["age", "gender"],
    },
    {
      title: "Symptoms",
      icon: Activity,
      fields: ["symptoms"],
    },
    {
      title: "Medical Details",
      icon: Stethoscope,
      fields: ["height", "weight", "medicalHistory"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white border rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Stethoscope className="w-16 h-16 text-blue-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            AI Medical Diagnosis
          </h2>
          <p className="text-gray-600">Get an instant preliminary health assessment</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {formSteps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-1/3"
              onClick={() => setActiveStep(index)}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                  index === activeStep
                    ? "bg-blue-600 text-white"
                    : index < activeStep
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                <step.icon className="w-6 h-6" />
              </div>
              <span
                className={`text-sm font-medium ${
                  index === activeStep ? "text-blue-600" : "text-gray-600"
                }`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className={`space-y-6 ${activeStep === 0 ? "block" : "hidden"}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className={`space-y-6 ${activeStep === 1 ? "block" : "hidden"}`}>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                What symptoms are you experiencing?
              </label>
              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={handleInputChange}
                placeholder="e.g., headache, fever, fatigue (separate with commas)"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[120px]"
                required
              />
            </div>
          </div>

          <div className={`space-y-6 ${activeStep === 2 ? "block" : "hidden"}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-6">
            <Button
              type="button"
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              disabled={activeStep === 0}
            >
              Previous
            </Button>
            {activeStep === formSteps.length - 1 ? (
              <Button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  "Get Diagnosis"
                )}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={() => setActiveStep(Math.min(formSteps.length - 1, activeStep + 1))}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next
              </Button>
            )}
          </div>
        </form>

        {/* Display Results */}
        {result && <DiagnosisResult result={result} />}

        {/* Error Display */}
        {result?.error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-red-600 font-medium">Error: {result.error}</p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p className="flex items-center justify-center space-x-1">
            <AlertCircle className="w-4 h-4" />
            <span>This is not a substitute for professional medical advice</span>
          </p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default MedicalDiagnosisForm;

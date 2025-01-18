import React, { useState } from "react";
import Button from "./UI/Button";
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
          "x-rapidapi-key":
            "d70556d7cbmsh2b8642b7ec2bf60p1606ecjsn28684336dff1",
          "x-rapidapi-host":
            "ai-medical-diagnosis-api-symptoms-to-results.p.rapidapi.com",
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

    // try {
    //   const url = 'https://ai-medical-diagnosis-api-symptoms-to-results.p.rapidapi.com/analyzeSymptomsAndDiagnose?noqueue=1';

    //   const requestBody = {
    //     symptoms: formData.symptoms.split(',').map((s) => s.trim()),
    //     patientInfo: {
    //       age: parseInt(formData.age),
    //       gender: formData.gender,
    //       height: parseInt(formData.height),
    //       weight: parseInt(formData.weight),
    //       medicalHistory: formData.medicalHistory.split(',').map((s) => s.trim()),
    //       currentMedications: formData.currentMedications.split(',').map((s) => s.trim()),
    //       allergies: formData.allergies.split(',').map((s) => s.trim()),
    //       lifestyle: {
    //         smoking: formData.smoking,
    //         alcohol: formData.alcohol,
    //         exercise: formData.exercise,
    //         diet: formData.diet,
    //       },
    //     },
    //     lang: 'en',
    //   };

    //   const response = await fetch(url, {
    //     method: 'POST',
    //     headers: {
    //      'x-rapidapi-key': 'd70556d7cbmsh2b8642b7ec2bf60p1606ecjsn28684336dff1',
    //       'x-rapidapi-host': 'ai-medical-diagnosis-api-symptoms-to-results.p.rapidapi.com',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(requestBody),
    //   });

    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }

    //   const data = await response.json();

    //   if (data.status === 'pending') {
    //     fetchResult(data.queueId);
    //   } else {
    //     setResult(data);
    //     setLoading(false);
    //   }
    // } catch (error) {
    //   console.error('Error getting diagnosis:', error);
    //   setResult({ error: error.message });
    //   setLoading(false);
    // }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white border rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            Medical Diagnosis Form
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="symptoms"
                className="block text-sm font-semibold text-gray-700"
              >
                Symptoms (comma-separated)
              </label>
              <input
                id="symptoms"
                name="symptoms"
                value={formData.symptoms}
                onChange={handleInputChange}
                placeholder="e.g., headache, fever, fatigue"
                required
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="age"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Age
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="gender"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Gender
                </label>
                <input
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  placeholder="male/female"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              {loading ? "Getting Diagnosis..." : "Get Diagnosis"}
            </Button>
          </form>

          {result && (
            <div className="mt-8 space-y-6">
              <h3 className="text-xl font-bold text-gray-800">
                Diagnosis Result:
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Disclaimer:
                  </h4>
                  <p className="text-gray-600">{result.disclaimer}</p>
                </div>

                {result.result?.analysis?.possibleConditions?.length > 0 && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">
                        Possible Conditions:
                      </h4>
                      <ul className="space-y-4">
                        {result.result.analysis.possibleConditions.map(
                          (condition, index) => (
                            <li
                              key={index}
                              className="bg-white p-4 rounded-lg border border-gray-200"
                            >
                              <h5 className="text-lg font-semibold text-blue-600 mb-2">
                                {condition.condition}
                              </h5>
                              <p className="text-gray-600 mb-3">
                                {condition.description}
                              </p>
                              <ul className="space-y-2 text-gray-600">
                                <li className="flex gap-2">
                                  <span className="font-semibold">
                                    Common Symptoms:
                                  </span>
                                  <span>
                                    {condition.commonSymptoms?.join(", ")}
                                  </span>
                                </li>
                                <li className="flex gap-2">
                                  <span className="font-semibold">
                                    Matching Symptoms:
                                  </span>
                                  <span>
                                    {condition.matchingSymptoms?.join(", ")}
                                  </span>
                                </li>
                                <li className="flex gap-2">
                                  <span className="font-semibold">
                                    Risk Level:
                                  </span>
                                  <span
                                    className={`px-3 py-1 rounded-full text-sm ${
                                      condition.riskLevel.toLowerCase() ===
                                      "low"
                                        ? "bg-green-100 text-green-800"
                                        : condition.riskLevel.toLowerCase() ===
                                          "medium"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {condition.riskLevel}
                                  </span>
                                </li>
                                <li className="flex gap-2">
                                  <span className="font-semibold">
                                    Additional Info:
                                  </span>
                                  <span>{condition.additionalInfo}</span>
                                </li>
                              </ul>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      {/* General Advice */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">
                          General Advice:
                        </h4>
                        <ul className="list-disc ml-5 space-y-2 text-gray-600">
                          {result.result.analysis.generalAdvice?.recommendedActions?.map(
                            (action, index) => (
                              <li key={index}>{action}</li>
                            )
                          )}
                        </ul>
                      </div>
                      {/* Lifestyle Considerations */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">
                          Lifestyle Considerations:
                        </h4>
                        <ul className="list-disc ml-5 space-y-2 text-gray-600">
                          {result.result.analysis.generalAdvice?.lifestyleConsiderations?.map(
                            (consideration, index) => (
                              <li key={index}>{consideration}</li>
                            )
                          )}
                        </ul>
                      </div>
                      {/* When to Seek Medical Attention */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">
                          When to Seek Medical Attention:
                        </h4>
                        <ul className="list-disc ml-5 space-y-2 text-gray-600">
                          {result.result.analysis.generalAdvice?.whenToSeekMedicalAttention?.map(
                            (attention, index) => (
                              <li key={index}>{attention}</li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>

                    {/* Educational Resources & Preventive Measures */}
                    <div className="space-y-4">
                      {/* Educational Resources Section */}
                      {result?.result?.educationalResources && (
                        <div className="space-y-4">
                          {/* Medical Terminology */}
                          {Object.keys(
                            result.result.educationalResources
                              .medicalTerminology || {}
                          ).length > 0 && (
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                                Medical Terminology:
                              </h4>
                              <ul className="space-y-2 text-gray-600">
                                {Object.entries(
                                  result.result.educationalResources
                                    .medicalTerminology
                                ).map(([term, definition], index) => (
                                  <li
                                    key={index}
                                    className="bg-white p-3 rounded-lg border border-gray-200"
                                  >
                                    <span className="font-semibold">
                                      {term}:
                                    </span>{" "}
                                    {definition}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Preventive Measures */}
                          {result.result.educationalResources.preventiveMeasures
                            ?.length > 0 && (
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                                Preventive Measures:
                              </h4>
                              <ul className="list-disc ml-5 space-y-2 text-gray-600">
                                {result.result.educationalResources.preventiveMeasures.map(
                                  (measure, index) => (
                                    <li key={index}>{measure}</li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}

                          {/* Reliable Sources */}
                          {result.result.educationalResources.reliableSources
                            ?.length > 0 && (
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                                Reliable Sources:
                              </h4>
                              <ul className="list-disc ml-5 space-y-2">
                                {result.result.educationalResources.reliableSources.map(
                                  (source, index) => (
                                    <li key={index}>
                                      <a
                                        href={source}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 transition-colors"
                                      >
                                        {source}
                                      </a>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {!result && (
            <div className="mt-8 text-center text-gray-500">
              Fill out the form above to get your diagnosis.
            </div>
          )}

          {result?.error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 font-semibold">
                Error: {result.error}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalDiagnosisForm;

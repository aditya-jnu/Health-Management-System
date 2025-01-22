import React, { useState, useEffect } from 'react';
import { AlertTriangle, Heart, Activity, CheckCircle , UserCircle2, Clipboard, Settings} from 'lucide-react';

export default function HealthRecommend() {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    bmi: '', // kg/m^2
    activityLevel: 'sedentary',
    medicalConditions: '',
    smoking: false,
    alcohol: 'none',
    diet: 'mixed',
    sleepHours: '',
    stressLevel: 'low',
    exerciseFrequency: 'none',
    bloodPressure: '',
    restingHeartRate: '',
    bloodSugar: '',
  });

  const [healthRecommendations, setHealthRecommendations] = useState(null); // Store recommendations data
  const [loading, setLoading] = useState(false); // State to manage loading
  const [activeStep, setActiveStep] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const formSteps = [
    { title: 'Personal Info', icon: UserCircle2 },
    { title: 'Health Data', icon: Clipboard },
    { title: 'Lifestyle', icon: Activity },
    { title: 'Review', icon: Settings }
  ];
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  const nextStep = () => {
    setActiveStep(prev => Math.min(prev + 1, formSteps.length - 1));
  };
  
  const prevStep = () => {
    setActiveStep(prev => Math.max(prev - 1, 0));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setLoading(true); // Set loading to true when the request starts

    const healthProfile = {
      age: Number(formData.age),
      gender: formData.gender,
      weight: Number(formData.weight),
      height: Number(formData.height),
      bmi: Number(formData.bmi),
      activityLevel: formData.activityLevel,
      medicalConditions: formData.medicalConditions.split(',').map((item) => item.trim()),
      lifestyle: {
        smoking: formData.smoking,
        alcohol: formData.alcohol,
        diet: formData.diet,
        sleepHours: Number(formData.sleepHours),
        stressLevel: formData.stressLevel,
        exerciseFrequency: formData.exerciseFrequency,
      },
      vitals: {
        bloodPressure: formData.bloodPressure,
        restingHeartRate: Number(formData.restingHeartRate),
        bloodSugar: Number(formData.bloodSugar),
      },
    };

    const requestBody = {
      healthProfile,
      goals: {
        weightManagement: true,
        stressReduction: true,
        improveBloodPressure: true,
        preventDiabetes: true,
        increaseFitness: true,
      },
      lang: 'en',
    };

    try {
      const response = await fetch(
        'https://ai-medical-diagnosis-api-symptoms-to-results.p.rapidapi.com/getHealthRecommendations?noqueue=1',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-rapidapi-host': 'ai-medical-diagnosis-api-symptoms-to-results.p.rapidapi.com',
            'x-rapidapi-key': '5b8827fa98msh0c39c2348ce50a1p1a0ee3jsnf8c822c36be3',
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();
      setHealthRecommendations(data.result); // Set fetched data to state
    } catch (error) {
      console.error('Error fetching health recommendations:', error);
    } finally {
      setLoading(false); // Set loading to false after the fetch is complete
    }
  };

  // Automatically calculate BMI whenever weight or height changes
  useEffect(() => {
    if (formData.weight && formData.height) {
      const heightInMeters = formData.height / 100; // Convert height to meters
      const calculatedBMI = formData.weight / (heightInMeters * heightInMeters);
      setFormData((prevData) => ({
        ...prevData,
        bmi: calculatedBMI.toFixed(2), // Round BMI to 2 decimal places
      }));
    }
  }, [formData.weight, formData.height]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Health Recommendations
              </span>
            </h2>
            <p className="text-gray-600">Get personalized health insights and recommendations</p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between mb-12">
            {formSteps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center w-1/4 cursor-pointer transition-all duration-300"
                onClick={() => !formSubmitted && setActiveStep(index)}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-500 transform
                    ${index === activeStep ? 'bg-blue-600 text-white scale-110' : 
                      index < activeStep ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  <step.icon className="w-6 h-6" />
                </div>
                <span className={`text-sm font-medium transition-colors duration-300
                  ${index === activeStep ? 'text-blue-600' : 'text-gray-600'}`}>
                  {step.title}
                </span>
                <div className={`h-1 w-full mt-2 transition-all duration-300
                  ${index === activeStep ? 'bg-blue-600' : 
                    index < activeStep ? 'bg-green-500' : 'bg-gray-200'}`} />
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info Step */}
            <div className={`transition-all duration-500 transform 
              ${activeStep === 0 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 hidden'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Health Data Step */}
            <div className={`transition-all duration-500 transform 
              ${activeStep === 1 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 hidden'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
                <div>
            <label className="block text-gray-600 font-medium">Medical Conditions (comma-separated)</label>
            <input type="text" name="medicalConditions" value={formData.medicalConditions}
              onChange={handleChange} className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>
              </div>
            </div>

            {/* Lifestyle Step */}
            <div className={`transition-all duration-500 transform 
              ${activeStep === 2 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 hidden'}`}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Activity Level</label>
                    <select
                      name="activityLevel"
                      value={formData.activityLevel}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    >
                      <option value="sedentary">Sedentary</option>
                      <option value="lightly active">Lightly Active</option>
                      <option value="moderately active">Moderately Active</option>
                      <option value="very active">Very Active</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Sleep Hours</label>
                    <input
                      type="number"
                      name="sleepHours"
                      value={formData.sleepHours}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium">Sleep Hours</label>
                    <input type="number" name="sleepHours" value={formData.sleepHours} onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-lg" required
                    />
                </div>
                <div>
                    <label className="block text-gray-600 font-medium">Exercise Frequency</label>
                    <select name="exerciseFrequency" value={formData.exerciseFrequency} onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-lg"
                    >
                        <option value="none">None</option>
                        <option value="1-2 times per week">1-2 times per week</option>
                        <option value="3-4 times per week">3-4 times per week</option>
                        <option value="daily">Daily</option>
                    </select>
                </div>
                </div>
              </div>
            </div>

            {/* Review Step */}
            <div className={`transition-all duration-500 transform 
              ${activeStep === 3 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 hidden'}`}>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Review Your Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Age</dt>
                      <dd className="mt-1 text-sm text-gray-900">{formData.age}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Gender</dt>
                      <dd className="mt-1 text-sm text-gray-900">{formData.gender}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">BMI</dt>
                      <dd className="mt-1 text-sm text-gray-900">{formData.bmi}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Activity Level</dt>
                      <dd className="mt-1 text-sm text-gray-900">{formData.activityLevel}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Sleep Hours</dt>
                      <dd className="mt-1 text-sm text-gray-900">{formData.sleepHours}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Exercise Frequency</dt>
                      <dd className="mt-1 text-sm text-gray-900">{formData.exerciseFrequency}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Stress Level</dt>
                      <dd className="mt-1 text-sm text-gray-900">{formData.stressLevel}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Medical Conditions</dt>
                      <dd className="mt-1 text-sm text-gray-900">{formData.medicalConditions}</dd>
                    </div>

                    
                  </dl>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={prevStep}
                className={`px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-300
                  ${activeStep === 0 ? 'opacity-0 cursor-not-allowed' : 'opacity-100'}`}
                disabled={activeStep === 0}
              >
                Previous
              </button>
              {activeStep === formSteps.length - 1 ? (
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Get Recommendations'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
                >
                  Next
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Show loading indicator when data is being fetched */}
        {loading && (
          <div className="mt-8 p-4 bg-gray-200 rounded-lg text-center text-gray-600">
            Loading...
          </div>
        )}

        {/* Display health recommendations in JSON format */}
        {healthRecommendations && !loading && (
              <div className="mt-12 space-y-8 animate-fadeIn">
                {/* Health Assessment Overview */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Health Assessment</h3>
                  <p className="text-gray-600 mb-4">{healthRecommendations.healthAssessment.overview}</p>
                  
                  {/* Key Areas */}
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold text-gray-800">Key Areas</h4>
                    <ul className="space-y-1">
                      {healthRecommendations.healthAssessment.keyAreas.map((area, index) => (
                        <li key={index} className="flex items-center space-x-2 text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
          
                  {/* Risk Factors */}
                  <div className="mt-4 space-y-2">
                    <h4 className="text-lg font-semibold text-gray-800">Risk Factors</h4>
                    <ul className="space-y-1">
                      {healthRecommendations.healthAssessment.riskFactors.map((factor, index) => (
                        <li key={index} className="flex items-center space-x-2 text-red-600">
                          <AlertTriangle className="w-4 h-4" />
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
          
                {/* Recommendations */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                    <Heart className="w-6 h-6 text-rose-600" />
                    <span>Recommendations</span>
                  </h3>
          
                  {/* Lifestyle Recommendations */}
                  <div className="space-y-6">
                    {Object.entries(healthRecommendations.recommendations.lifestyle).map(([key, value]) => (
                      <div key={key} className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-800 capitalize">{key}</h4>
                        <ul className="space-y-1">
                          {value.map((item, index) => (
                            <li key={index} className="flex space-x-2 text-gray-600 items-start">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
          
                {/* Preventive Care */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                    <Activity className="w-6 h-6 text-green-500" />
                    <span>Preventive Care</span>
                  </h3>
          
                  {Object.entries(healthRecommendations.recommendations.preventiveCare).map(([section, items]) => (
                    <div key={section} className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-800 capitalize">{section}</h4>
                      <ul className="space-y-1">
                        {items.map((item, index) => (
                          <li key={index} className="flex items-start space-x-2 text-gray-600">
                            <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
          
                {/* Animations and Styling */}
                <style jsx>{`
                  @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                  }
          
                  .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                  }
                `}</style>
              </div>
          
        )}
      </div>
    </div>
  );
}

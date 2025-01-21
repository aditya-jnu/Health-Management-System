import React, { useState, useEffect } from 'react';
import { AlertTriangle, Heart, Activity, CheckCircle } from 'lucide-react';

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Health Recommendations Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
           {/* part 1 till activity level */}
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input placeholder='enter your age' type="number" name="age" value={formData.age}
                onChange={handleChange} className="w-full mt-1 p-2 border rounded-lg" required
              />
            </div>
            <div>
              <select name="gender" value={formData.gender} onChange={handleChange} 
              className="w-full mt-1 p-2 border rounded-lg cursor-pointer">
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>
            <div>
              <input placeholder='enter your weight(Kg)' type="number" name="weight" value={formData.weight}
                onChange={handleChange} className="w-full mt-1 p-2 border rounded-lg" required
              />
            </div>
            <div>
              <input placeholder='enter your height(Cm)' type="number" name="height" value={formData.height}
                onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" required
              />
            </div>
            <div>
                <label className="block text-gray-600 font-medium">BMI</label>
                <input type="number" name="bmi" value={formData.bmi} onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg cursor-pointer" required
                />
            </div>
            <div>
                <label className="block text-gray-600 font-medium">Activity Level</label>
                <select name="activityLevel" value={formData.activityLevel} onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg cursor-pointer"
                >
                    <option value="sedentary">Sedentary</option>
                    <option value="lightly active">Lightly Active</option>
                    <option value="moderately active">Moderately Active</option>
                    <option value="very active">Very Active</option>
                </select>
            </div>
          </div>

          {/* part 2 till medical condition */}
          <div>
            <label className="block text-gray-600 font-medium">Medical Conditions (comma-separated)</label>
            <input type="text" name="medicalConditions" value={formData.medicalConditions}
              onChange={handleChange} className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>

          {/* part 3 of lifestyle */}
          <fieldset className="border p-4 rounded-lg">
            <legend className="text-lg font-semibold ">Lifestyle Information</legend>
            <div className="flex flex-col gap-4">
                <div className="flex items-center">
                    <label htmlFor="smoking" className="text-gray-600 font-medium mr-2 cursor-pointer">Smoking</label>
                    <input id='smoking' type="checkbox" name="smoking" checked={formData.smoking}
                    onChange={handleChange} className="h-5 w-5"
                    />
                </div>
                {/* legend */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                    <label className="block text-gray-600 font-medium">Alcohol</label>
                    <select name="alcohol" value={formData.alcohol} onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-lg cursor-pointer"
                    >
                        <option value="none">None</option>
                        <option value="occasional">Occasional</option>
                        <option value="frequent">Frequent</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-600 font-medium">Diet</label>
                    <select name="diet" value={formData.diet} onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-lg cursor-pointer"
                    >
                        <option value="mixed">Mixed</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="vegan">Vegan</option>
                    </select>
                </div>
                {/* Sleep Hours */}
                <div>
                    <label className="block text-gray-600 font-medium">Sleep Hours</label>
                    <input type="number" name="sleepHours" value={formData.sleepHours} onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-lg" required
                    />
                </div>
                {/* Stress Level */}
                <div>
                    <label className="block text-gray-600 font-medium">Stress Level</label>
                    <select name="stressLevel" value={formData.stressLevel} onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-md"
                    >
                     <option value="low">Low</option>
                     <option value="moderate">Moderate</option>
                     <option value="high">High</option>
                    </select>
                </div>
                </div>
                {/* Exercise Frequency */}
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
          </fieldset>   
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Get Recommendations
          </button>
        </form>

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

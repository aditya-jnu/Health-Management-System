import axios from "axios";
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Loader2 } from "lucide-react";
import testData from "../testData";
import HospitalDetails from "./Hospitaldetails";

export default function NearByHosp() {
  const { loc } = useContext(AppContext);
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiUrl = "https://maps.gomaps.pro/maps/api/place/nearbysearch/json";
  const params = {
    location: `${loc.latitude},${loc.longitude}`,
    radius: 5000,
    name: "hospital",
    key: "AlzaSy1MLzhGZDb9umqvm7c5XTNFSjDcHTVDKNz",
  };

  async function fetchHosp() {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(apiUrl, { params });
      const apiHospitals = response.data.results || [];

      // Combine API results with predefined hospitals
      const combinedHospitals = [...testData, ...apiHospitals];
      setHospitals(combinedHospitals);
    } catch (err) {
      setError("Failed to fetch hospitals. Please try again.");
      setHospitals(testData);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Section: List of Hospitals */}
      <div className="w-1/3 border-r border-gray-200 p-6 overflow-y-auto">
        <button
          className="w-full px-6 py-3 mb-6 rounded-xl bg-blue-600 text-white font-semibold 
                             hover:bg-blue-700 transform transition-all duration-200 
                             active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                             flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          onClick={fetchHosp}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            "Find Nearby Hospitals"
          )}
        </button>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {hospitals.map((hospital) => (
            <div
              key={hospital.place_id}
              onClick={() => setSelectedHospital(hospital)}
              className={`p-5 bg-white rounded-xl shadow-sm hover:shadow-md 
                                      transition-all duration-200 cursor-pointer
                                      ${
                                        selectedHospital?.place_id ===
                                        hospital.place_id
                                          ? "ring-2 ring-blue-500 shadow-md"
                                          : "hover:scale-102"
                                      }`}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <img
                    src={hospital.icon}
                    alt="Hospital Icon"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {hospital.name}
                </h3>
              </div>

              <div className="space-y-2 text-sm">
                <p className="text-gray-600 flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {hospital.vicinity}
                </p>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.round(hospital.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600">
                    {hospital.rating || "N/A"} (
                    {hospital.user_ratings_total || 0})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      hospital.opening_hours?.open_now
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  />
                  <span
                    className={`${
                      hospital.opening_hours?.open_now
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {hospital.opening_hours?.open_now ? "Open now" : "Closed"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right section becomes the new component */}
      <HospitalDetails selectedHospital={selectedHospital} />
    </div>
  );
}

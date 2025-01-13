import { useState } from "react";

const HospitalDetails = ({ selectedHospital }) => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
  };

  return (
    <div className="w-2/3 p-8 bg-white">
      {/* Right Section: Details of Selected Hospital */}
      {selectedHospital ? (
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
              <img
                src={selectedHospital.icon || "/placeholder-icon.png"}
                alt="Hospital Icon"
                className="w-10 h-10 object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {selectedHospital.name}
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">Location</h3>
              <p className="text-gray-600">{selectedHospital.vicinity}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">
                Rating & Reviews
              </h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(selectedHospital.rating)
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
                  {selectedHospital.rating || "N/A"} (
                  {selectedHospital.user_ratings_total || 0} reviews)
                </span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">Departments</h3>
              {/* Departments Horizontal List */}
              <div className="flex gap-6 overflow-x-auto">
                {selectedHospital.departments?.map((department, index) => (
                  <button
                    key={index}
                    onClick={() => handleDepartmentSelect(department)}
                    className={`p-2 bg-gray-200 rounded-lg text-gray-700 font-semibold ${
                      selectedDepartment?.name === department.name
                        ? "bg-green-400 text-black"
                        : "hover:bg-gray-300"
                    }`}
                  >
                    {department.name}
                  </button>
                ))}
              </div>

              <div className="space-y-4 mt-4">
                {/* Doctors List */}
                {(selectedDepartment ? [selectedDepartment] : selectedHospital.departments).map((department, index) => (
                  <div key={index} className="border-b pb-4">
                    <h4 className="font-medium text-gray-800">
                      {department.name}
                    </h4>
                    {department.doctors?.map((doctor, idx) => (
                      <div key={idx} className="ml-4 mt-2">
                        <p className="text-gray-700">
                          <strong>Doctor:</strong> {doctor.name}
                        </p>
                        <p className="text-gray-600">
                          <strong>Availability:</strong>{" "}
                          {doctor.available ? "Available" : "Not Available"}
                        </p>
                        {doctor.availability && (
                          <div className="ml-4">
                            <p className="text-gray-600">
                              <strong>Offline:</strong>{" "}
                              {doctor.availability.offline.join(", ")}
                            </p>
                            <p className="text-gray-600">
                              <strong>Online:</strong>{" "}
                              {doctor.availability.online.join(", ")}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full flex items-center justify-center">
          <div className="text-center text-gray-500">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
              />
            </svg>
            <p className="text-xl font-medium">
              Select a hospital to view details
            </p>
            <p className="mt-2">
              Click on any hospital from the list to see more information
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalDetails;

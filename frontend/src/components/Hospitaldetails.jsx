import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const HospitalDetails = ({ selectedHospital }) => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [appointmentType, setAppointmentType] = useState(null);
  const [bookingStatus, setBookingStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkSupabaseConnection = async () => {
      try {
        const { error } = await supabase.from("appointments").select("id").limit(1);
        if (error) console.error("Supabase connection error:", error);
      } catch (err) {
        console.error("Failed to connect to Supabase:", err);
      }
    };

    checkSupabaseConnection();
  }, []);

  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
    setSelectedDoctor(null);
    setSelectedTimeSlot(null);
    setAppointmentType(null);
    setBookingStatus("");
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedTimeSlot(null);
    setAppointmentType(null);
    setBookingStatus("");
  };

  const handleTimeSlotSelect = (slot, type) => {
    setAppointmentType(type);
    setSelectedTimeSlot(slot);
    setBookingStatus("");
  };

  const handleBookAppointment = async () => {
    if (!selectedDoctor || !selectedTimeSlot || !appointmentType) {
      setBookingStatus("Please select a doctor, appointment type, and time slot.");
      return;
    }

    setIsLoading(true);
    setBookingStatus("");

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) {
        setBookingStatus("Please log in to book an appointment.");
        return;
      }

      const appointment = {
        auth_id: user.id,
        hospital_name: selectedHospital.name,
        hospital_location: selectedHospital.vicinity,
        department: selectedDepartment.name,
        doctor_name: selectedDoctor.name,
        doctor_email: selectedDoctor.gmail,
        appointment_type: appointmentType,
        time_slot: selectedTimeSlot,
        created_at: new Date().toISOString(),
        status: "scheduled",
      };

      const { error } = await supabase.from("appointments").insert([appointment]);
      if (error) throw error;

      setBookingStatus("Appointment booked successfully!");
      setSelectedTimeSlot(null);
      setAppointmentType(null);
    } catch (err) {
      setBookingStatus(`Failed to book appointment: ${err.message || "Please try again."}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-lg">
      {selectedHospital ? (
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center md:text-left">
            {selectedHospital.name}
          </h2>
          <p className="text-sm md:text-base text-gray-500 mb-6 text-center md:text-left">
            {selectedHospital.vicinity}
          </p>

          {/* Departments */}
          <div className="mb-8 md:mb-10">
            <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">Select Department</h3>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {selectedHospital.departments?.map((department) => (
                <button
                  key={department.name}
                  onClick={() => handleDepartmentSelect(department)}
                  className={`px-4 py-2 md:px-5 md:py-2 rounded-lg font-medium shadow-sm transition-all w-full md:w-auto text-center ${
                    selectedDepartment?.name === department.name
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-blue-100 text-gray-800"
                  }`}
                >
                  {department.name}
                </button>
              ))}
            </div>
          </div>

          {/* Doctors */}
          {selectedDepartment && (
            <div className="mb-8 md:mb-10">
              <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">Select Doctor</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {selectedDepartment.doctors?.map((doctor) => (
                  <div
                    key={doctor.name}
                    className={`p-4 md:p-5 border rounded-lg cursor-pointer shadow-md transition-all ${
                      selectedDoctor?.name === doctor.name
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:shadow-lg"
                    }`}
                    onClick={() => handleDoctorSelect(doctor)}
                  >
                    <h4 className="font-medium text-gray-800">{doctor.name}</h4>
                    <p
                      className={`text-sm font-medium ${
                        doctor.available ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {doctor.available ? "Available" : "Not Available"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Time Slots */}
          {selectedDoctor && (
            <div className="mb-8 md:mb-10">
              <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">Select Time Slot</h3>
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-2">Offline Appointments</h4>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  {selectedDoctor.availability.offline.map((slot, idx) => (
                    <button
                      key={`offline-${idx}`}
                      onClick={() => handleTimeSlotSelect(slot, "offline")}
                      className={`px-3 py-2 md:px-4 md:py-2 rounded-lg shadow-sm transition-all ${
                        selectedTimeSlot === slot && appointmentType === "offline"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 hover:bg-blue-100"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Online Appointments</h4>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  {selectedDoctor.availability.online.map((slot, idx) => (
                    <button
                      key={`online-${idx}`}
                      onClick={() => handleTimeSlotSelect(slot, "online")}
                      className={`px-3 py-2 md:px-4 md:py-2 rounded-lg shadow-sm transition-all ${
                        selectedTimeSlot === slot && appointmentType === "online"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 hover:bg-blue-100"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Book Appointment */}
          {selectedDoctor && selectedTimeSlot && (
            <div className="mt-6 md:mt-8 text-center md:text-left">
              <button
                onClick={handleBookAppointment}
                disabled={isLoading}
                className={`w-full md:w-auto px-6 py-3 font-semibold rounded-lg shadow-md transition-all ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                {isLoading ? "Booking..." : "Book Appointment"}
              </button>
              {bookingStatus && (
                <p
                  className={`mt-4 font-medium ${
                    bookingStatus.includes("success") ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {bookingStatus}
                </p>
              )}
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-600 text-center">Select a hospital to view details.</p>
      )}
    </div>
  );
};

export default HospitalDetails;

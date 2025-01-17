import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const HospitalDetails = ({ selectedHospital }) => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [appointmentType, setAppointmentType] = useState(null);
  const [bookingStatus, setBookingStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check Supabase connection on component mount and fetch departments for the selected hospital
  useEffect(() => {
    const checkSupabaseConnection = async () => {
      try {
        // Check if we can query the appointments table
        const { data, error } = await supabase
          .from('appointments')
          .select('id')
          .limit(1);

        if (error) {
          console.error('Supabase connection error:', error);
        }
      } catch (err) {
        console.error('Failed to connect to Supabase:', err);
      }
    };

    checkSupabaseConnection();
  }, []);

  //now i'm adding state management 

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
    setSelectedTimeSlot(slot);
    setAppointmentType(type);
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
        setBookingStatus("Please login to book an appointment.");
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
        status: 'scheduled'
      };
  
      const { data, error } = await supabase
        .from("appointments")
        .insert([appointment])
        .select();
  
      if (error) throw error;
  
      if (data) {
        setBookingStatus("Appointment booked successfully!");
        setSelectedTimeSlot(null);
        setAppointmentType(null);
      }
    } catch (err) {
      console.error("Error booking appointment:", err);
      setBookingStatus(
        `Failed to book appointment: ${err.message || 'Please check your connection and try again.'}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md">
      {selectedHospital ? (
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{selectedHospital.name}</h2>
          <p className="text-gray-600 mb-6">{selectedHospital.vicinity}</p>

          {/* Departments */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Department</h3>
            <div className="flex flex-wrap gap-4">
              {selectedHospital.departments?.map((department) => (
                <button
                  key={department.name}
                  onClick={() => handleDepartmentSelect(department)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedDepartment?.name === department.name
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {department.name}
                </button>
              ))}
            </div>
          </div>

          {/* Doctors Selection */}
          {selectedDepartment && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Doctor</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedDepartment.doctors?.map((doctor) => (
                  <div
                    key={doctor.name}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedDoctor?.name === doctor.name
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => handleDoctorSelect(doctor)}
                  >
                    <h4 className="font-medium text-gray-800">{doctor.name}</h4>
                    <p className={`text-sm ${doctor.available ? "text-green-600" : "text-red-600"}`}>
                      {doctor.available ? "Available" : "Not Available"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Time Slots */}
          {selectedDoctor && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Time Slot</h3>
              
              {/* Offline Slots */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-2">Offline Appointments</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDoctor.availability.offline.map((slot, idx) => (
                    <button
                      key={`offline-${idx}`}
                      onClick={() => handleTimeSlotSelect(slot, 'offline')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        selectedTimeSlot === slot && appointmentType === 'offline'
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Online Slots */}
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Online Appointments</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDoctor.availability.online.map((slot, idx) => (
                    <button
                      key={`online-${idx}`}
                      onClick={() => handleTimeSlotSelect(slot, 'online')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        selectedTimeSlot === slot && appointmentType === 'online'
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Book Appointment Button */}
          {selectedDoctor && selectedTimeSlot && (
            <div className="mt-8">
              <button
                onClick={handleBookAppointment}
                disabled={isLoading}
                className={`w-full md:w-auto px-6 py-3 font-semibold rounded-lg shadow-md transition-colors ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                {isLoading ? "Booking..." : "Book Appointment"}
              </button>
              {bookingStatus && (
                <p className={`mt-4 ${
                  bookingStatus.includes("success") ? "text-green-600" : "text-red-600"
                }`}>
                  {bookingStatus}
                </p>
              )}
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-600">Select a hospital to view details.</p>
      )}
    </div>
  );
};

export default HospitalDetails;
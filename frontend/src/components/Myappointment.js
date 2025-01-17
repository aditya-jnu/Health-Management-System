import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import Card from "./UI/Card";
import Modal from "./UI/Modal";

const MyAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [formData, setFormData] = useState({
    symptoms: "",
    medications: "",
    allergies: "",
    medicalHistory: "",
    medicineHistory: "",
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      if (!user) {
        setError("Please log in to view appointments.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("appointments")
        .select("*, doctor_email")
        .eq("auth_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setAppointments(data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Failed to load appointments. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handlePreAppointment = (doctor) => {
    setCurrentDoctor(doctor);
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const emailData = {
      service_id: "service_bv3i6qp", // Replace with your actual service ID
      template_id: "template_1f6thm8", // Replace with your actual template ID
      user_id: "1Fyyfib7XghQqEtKM", // Replace with your actual user ID
      template_params: {
        to_email: currentDoctor.doctor_email,
        patient_symptoms: formData.symptoms,
        patient_medications: formData.medications,
        patient_allergies: formData.allergies,
        patient_medical_history: formData.medicalHistory,
        patient_medicine_history: formData.medicineHistory,
      },
    };

    try {
      const response = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        }
      );

      if (response.ok) {
        alert("Pre-appointment details sent to the doctor successfully!");
        setShowForm(false);
        setFormData({
          symptoms: "",
          medications: "",
          allergies: "",
          medicalHistory: "",
          medicineHistory: "",
        });
      } else {
        const errorResponse = await response.json();
        console.error("Error response:", errorResponse);
        alert("Failed to send email. Please check your inputs and try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading appointments...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Appointments</h1>

      {appointments.length === 0 ? (
        <div className="text-gray-600">No appointments found.</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="p-6 bg-white shadow-sm">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {appointment.hospital_name}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      appointment.status === "scheduled"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </div>

                <div className="space-y-1 text-gray-600">
                  <p>
                    <span className="font-medium">Doctor:</span>{" "}
                    {appointment.doctor_name}
                  </p>
                  <p>
                    <span className="font-medium">Department:</span>{" "}
                    {appointment.department}
                  </p>
                  <p>
                    <span className="font-medium">Type:</span>{" "}
                    {appointment.appointment_type}
                  </p>
                  <p>
                    <span className="font-medium">Time:</span>{" "}
                    {appointment.time_slot}
                  </p>
                  <p>
                    <span className="font-medium">Location:</span>{" "}
                    {appointment.hospital_location}
                  </p>
                  <p className="text-sm text-gray-500">
                    Booked on:{" "}
                    {new Date(appointment.created_at).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handlePreAppointment(appointment)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Pre-Appointment Check
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {showForm && (
        <Modal
          setShowForm={setShowForm}
          formData={formData}
          handleFormChange={handleFormChange}
          handleSubmitForm={handleSubmitForm}
        />
      )}
    </div>
  );
};

export default MyAppointment;

import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import Card from "./UI/Card";
import Modal from "./UI/Modal";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, User, Hospital, Activity, Calendar as CalendarIcon } from "lucide-react";
import {useNavigate} from 'react-router-dom'

const MyAppointment = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
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
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) {
        setError("Please log in to view appointments.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("appointments")
        .select("*, doctor_email,appointment_date")
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

  const handleVideoCall = (appointment)=>{
    const uniqueCode = Math.random().toString(36).substr(2, 9);
    console.log(appointment)
    navigate(`/room/${uniqueCode}`, { state: { appointment } });
  }

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
      service_id: "service_bv3i6qp",
      template_id: "template_1f6thm8",
      user_id: "1Fyyfib7XghQqEtKM",
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
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailData),
      });

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="animate-pulse flex space-x-4">
          <div className="h-12 w-12 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="h-12 w-12 bg-blue-600 rounded-full animate-bounce delay-100"></div>
          <div className="h-12 w-12 bg-blue-800 rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
        <div className="text-lg text-red-600 bg-red-100 px-6 py-4 rounded-lg shadow-md">
          <Activity className="inline-block mr-2 h-6 w-6" />
          {error}
        </div>
      </div>
    );
  }

  const filteredAppointments = appointments.filter(appointment => {
    if (selectedFilter === 'all') return true;
    return appointment.status === selectedFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
            My Appointments
          </h1>
          <div className="flex space-x-4">
            {['all', 'scheduled', 'completed', 'cancelled'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedFilter === filter
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-blue-50'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {appointments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-600 text-center py-12 bg-white rounded-lg shadow-sm"
          >
            <CalendarIcon className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <p className="text-xl">No appointments found.</p>
          </motion.div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAppointments.map((appointment, index) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xl text-gray-800">
                        {appointment.hospital_name}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          appointment.status === "scheduled"
                            ? "bg-green-100 text-green-800"
                            : appointment.status === "completed"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </div>

                    <div className="space-y-3 text-gray-600">
                      <div className="flex items-center">
                        <User className="h-5 w-5 mr-2 text-blue-600" />
                        <p>{appointment.doctor_name}</p>
                      </div>
                      <div className="flex items-center">
                        <Hospital className="h-5 w-5 mr-2 text-blue-600" />
                        <p>{appointment.department}</p>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                        <p>{new Date(appointment.appointment_date).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-blue-600" />
                        <p>{appointment.time_slot}</p>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                        <p>{appointment.hospital_location}</p>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleVideoCall(appointment)}
                      className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-green-600 to-green-900 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
                    >
                      <Calendar className="h-5 w-5 mr-2" />
                      Schedule a Video Call
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePreAppointment(appointment)}
                      className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
                    >
                      <Activity className="h-5 w-5 mr-2" />
                      Pre-Appointment Check
                    </motion.button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

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
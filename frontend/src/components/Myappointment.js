import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import Card from "./UI/Card";

const MyAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError) throw userError;

      if (!user) {
        setError("Please login to view appointments");
        setLoading(false);
        return;
      }

      
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .eq("auth_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setAppointments(data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Failed to load appointments");
    } finally {
      setLoading(false);
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
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    appointment.status === 'scheduled' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {appointment.status}
                  </span>
                </div>

                <div className="space-y-1 text-gray-600">
                  <p><span className="font-medium">Doctor:</span> {appointment.doctor_name}</p>
                  <p><span className="font-medium">Department:</span> {appointment.department}</p>
                  <p><span className="font-medium">Type:</span> {appointment.appointment_type}</p>
                  <p><span className="font-medium">Time:</span> {appointment.time_slot}</p>
                  <p><span className="font-medium">Location:</span> {appointment.hospital_location}</p>
                  <p className="text-sm text-gray-500">
                    Booked on: {new Date(appointment.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointment;
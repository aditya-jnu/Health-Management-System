import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const uploadProfilePicture = async (file, userId) => {
  const fileName = `${userId}-profile-${file.name}`;
  const filePath = `profile-pictures/${fileName}`;

  const { data, error } = await supabase.storage
      .from('avatars') // 'avatars' is the name of the bucket; replace with your bucket name
      .upload(filePath, file);

  if (error) {
      throw new Error('Error uploading profile picture: ' + error.message);
  }

  // Get the public URL for the uploaded file
  const { publicURL, error: urlError } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

  if (urlError) {
      throw new Error('Error getting public URL for the file: ' + urlError.message);
  }

  return publicURL;
};

const uploadReportFile = async (file, userId) => {
  const fileName = `${userId}-report-${file.name}`;
  const filePath = `report-files/${fileName}`;

  const { data, error } = await supabase.storage
      .from('reports')
      .upload(filePath, file);

  if (error) {
      throw new Error('Error uploading report file: ' + error.message);
  }

  const { publicURL, error: urlError } = supabase.storage
      .from('reports')
      .getPublicUrl(filePath);

  if (urlError) {
      throw new Error('Error getting public URL for the file: ' + urlError.message);
  }

  return publicURL;
};


const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [patientDetails, setPatientDetails] = useState({
        name: '',
        age: '',
        bloodGroup: '', // New blood group field
        medicalHistory: '',
        allergies: '',
        profilePicture: null
    });
    const [reports, setReports] = useState([]);
    const [newReport, setNewReport] = useState({
        title: '',
        description: '',
        file: null,
        fileUrl: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [uploadStatus, setUploadStatus] = useState('');
    const [profilePicFile, setProfilePicFile] = useState(null);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (session?.user) {
                    await fetchPatientData(session.user.id);
                }
            } catch (error) {
                console.error('Error checking auth session:', error);
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const fetchPatientData = async (userId) => {
        try {
            const { data: existingUser, error } = await supabase
                .from('patients')
                .select('*')
                .eq('auth_id', userId)
                .single();

            if (error) throw error;

            setPatientDetails(existingUser.patient_details || { 
                name: '',
                age: '', 
                bloodGroup: '', // Default blood group
                medicalHistory: '', 
                allergies: '',
                profilePicture: null
            });
            setReports(existingUser.reports || []);
        } catch (error) {
            console.error('Error fetching patient data:', error);
        }
    };

    const handleProfilePicChange = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfilePicFile(file);
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (!session?.user) {
                    throw new Error('No authenticated user found');
                }

                const profileUrl = await uploadProfilePicture(file, session.user.id);
                setPatientDetails(prev => ({
                    ...prev,
                    profilePicture: profileUrl
                }));

                const { error: updateError } = await supabase
                    .from('patients')
                    .update({
                        patient_details: {
                            ...patientDetails,
                            profilePicture: profileUrl
                        }
                    })
                    .eq('auth_id', session.user.id);

                if (updateError) throw updateError;
                setUploadStatus('Profile picture updated successfully!');
            } catch (error) {
                console.error('Error updating profile picture:', error);
                setUploadStatus('Error updating profile picture: ' + error.message);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReport((prevReport) => ({ ...prevReport, [name]: value }));
    };

    const handlePatientDetailsChange = (e) => {
        const { name, value } = e.target;
        setPatientDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    const handleSaveDetails = async (e) => {
        e.preventDefault();

        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user) {
                throw new Error('No authenticated user found');
            }

            const userId = session.user.id;
            let fileUrl = '';
            if (newReport.file) {
                try {
                    fileUrl = await uploadReportFile(newReport.file, userId);
                } catch (error) {
                    alert(`File upload failed: ${error.message}`);
                    return;
                }
            }

            const newReports = newReport.title || newReport.description ? [
                ...reports,
                {
                    title: newReport.title,
                    description: newReport.description,
                    date: new Date().toISOString(),
                    fileUrl,
                }
            ] : reports;

            const { error: updateError } = await supabase
                .from('patients')
                .update({
                    patient_details: patientDetails,
                    reports: newReports,
                })
                .eq('auth_id', userId);

            if (updateError) throw updateError;

            setPatientDetails((prevDetails) => ({
                ...prevDetails,
                name: patientDetails.name,
                age: patientDetails.age,
                bloodGroup: patientDetails.bloodGroup, // Save blood group as well
                medicalHistory: patientDetails.medicalHistory,
                allergies: patientDetails.allergies,
            }));

            setReports(newReports);
            setNewReport({
                title: '',
                description: '',
                file: null,
                fileUrl: '',
                date: '',
            });

            alert('Details and report saved successfully!');
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving details:', error);
            alert('Error saving details: ' + error.message);
        }
    };

    const handleDeleteReport = async (indexToDelete) => {
        try {
            const updatedReports = reports.filter((_, index) => index !== indexToDelete);

            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user) throw new Error('No authenticated user found');

            const userId = session.user.id;

            await supabase.from('patients').update({
                reports: updatedReports,
            }).eq('auth_id', userId);

            setReports(updatedReports);
            setUploadStatus('Report deleted successfully!');
        } catch (error) {
            console.error('Error deleting report:', error);
            setUploadStatus(`Error deleting report: ${error.message}`);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-4xl">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-700">Patient Dashboard</h1>

            {/* Patient Details Section */}
            <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Patient Details</h2>
                <div className="flex items-center">
                    {patientDetails.profilePicture ? (
                        <img src={patientDetails.profilePicture} alt="Profile" className="w-24 h-24 rounded-full mr-4" />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-300 mr-4"></div>
                    )}
                    <input type="file" onChange={handleProfilePicChange} className="border rounded-md p-2" />
                </div>

                {isEditing ? (
                    <form onSubmit={handleSaveDetails} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={patientDetails.name || ''}
                                onChange={handlePatientDetailsChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={patientDetails.age || ''}
                                onChange={handlePatientDetailsChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                                min="0"
                                step="1"
                            />
                        </div>
                        <div>
                            <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700">Blood Group</label>
                            <input
                                type="text"
                                id="bloodGroup"
                                name="bloodGroup"
                                value={patientDetails.bloodGroup || ''}
                                onChange={handlePatientDetailsChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="medicalHistory" className="block text-sm font-medium text-gray-700">Medical History</label>
                            <textarea
                                id="medicalHistory"
                                name="medicalHistory"
                                value={patientDetails.medicalHistory || ''}
                                onChange={handlePatientDetailsChange}
                                className="w-full p-2 border border-gray-300 rounded-md h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">Allergies</label>
                            <textarea
                                id="allergies"
                                name="allergies"
                                value={patientDetails.allergies || ''}
                                onChange={handlePatientDetailsChange}
                                className="w-full p-2 border border-gray-300 rounded-md h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="flex space-x-4 pt-4">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-3">
                        <p className="border-b pb-2"><strong>Name:</strong> {patientDetails.name || 'N/A'}</p>
                        <p className="border-b pb-2"><strong>Age:</strong> {patientDetails.age || 'N/A'}</p>
                        <p className="border-b pb-2"><strong>Blood Group:</strong> {patientDetails.bloodGroup || 'N/A'}</p>
                        <p className="border-b pb-2"><strong>Medical History:</strong> {patientDetails.medicalHistory || 'N/A'}</p>
                        <p className="border-b pb-2"><strong>Allergies:</strong> {patientDetails.allergies || 'N/A'}</p>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
                        >
                            Edit Details
                        </button>
                    </div>
                )}
            </div>

            {/* Reports Section */}
            <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Upload Report</h2>
                    <button
                        onClick={() => setShowUploadForm(!showUploadForm)}
                        className={`px-4 py-2 ${showUploadForm ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-md transition duration-200`}
                    >
                        {showUploadForm ? 'Cancel' : 'Upload New Report'}
                    </button>
                </div>

                {showUploadForm && (
                    <form onSubmit={handleSaveDetails} className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={newReport.title || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={newReport.description || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="file" className="block text-sm font-medium text-gray-700">File</label>
                            <input
                                type="file"
                                id="file"
                                name="file"
                                onChange={(e) => setNewReport({ ...newReport, file: e.target.files[0] })}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                        >
                            Save Report
                        </button>
                    </form>
                )}

                {/* Reports List */}
                <div className="mt-6 space-y-4">
                    {reports.map((report, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg shadow-sm">
                            <h3 className="font-semibold">{report.title}</h3>
                            <p>{report.description}</p>
                            {report.fileUrl && (
                                <a href={report.fileUrl} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Download File</a>
                            )}
                            <button
                                onClick={() => handleDeleteReport(index)}
                                className="mt-2 text-red-500 hover:text-red-700"
                            >
                                Delete Report
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

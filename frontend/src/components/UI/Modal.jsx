 export default function Modal ({ setShowForm, formData, handleFormChange, handleSubmitForm }) {
    return  (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
      <h2 className="text-lg font-bold mb-4 text-center">Pre-Appointment Check</h2>
      <form onSubmit={handleSubmitForm} className="space-y-4">
        <div>
          <label className="block font-medium">Symptoms</label>
          <textarea
            name="symptoms"
            value={formData.symptoms}
            onChange={handleFormChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>
        </div>
        <div>
          <label className="block font-medium">Medications</label>
          <textarea
            name="medications"
            value={formData.medications}
            onChange={handleFormChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>
        </div>
        <div>
          <label className="block font-medium">Allergies</label>
          <textarea
            name="allergies"
            value={formData.allergies}
            onChange={handleFormChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>
        </div>
        <div>
          <label className="block font-medium">Medical History</label>
          <textarea
            name="medicalHistory"
            value={formData.medicalHistory}
            onChange={handleFormChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>
        </div>
        <div>
          <label className="block font-medium">Medicine History</label>
          <textarea
            name="medicineHistory"
            value={formData.medicineHistory}
            onChange={handleFormChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>
        </div>
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
    );
 }
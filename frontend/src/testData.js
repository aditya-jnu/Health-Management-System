const hospitals = [
  {
    name: "Max Multi Speciality Centre, Panchsheel Park",
    vicinity: "Panchsheel Park, New Delhi",
    rating: 4.5,
    user_ratings_total: 120,
    departments: [
      {
        name: "Dermatology",
        doctors: [
          {
            name: "Dr. Aditi Sharma",
            available: true,
            availability: {
              offline: ["10:00 AM - 11:00 AM", "4:00 PM - 5:00 PM"],
              online: ["11:30 AM - 12:00 PM", "5:30 PM - 6:00 PM"],
            },
          },
        ],
      },
      {
        name: "Neurosuregeon",
        doctors: [
          {
            name: "Dr. Satyam Laheri",
            available: true,
            availability: {
              offline: ["10:00 AM - 11:00 AM", "4:00 PM - 5:00 PM"],
              online: ["11:30 AM - 12:00 PM", "5:30 PM - 6:00 PM"],
            },
          },
        ],
      },
    ],
  },
  {
    name: "Fortis Flt Lt Rajan Dhall Hospital, Vasant Kunj, New Delhi",
    vicinity: "Vasant Kunj, New Delhi",
    rating: 4.2,
    user_ratings_total: 200,
    departments: [
      {
        name: "Cardiology",
        doctors: [
          {
            name: "Dr. Sameer Verma",
            available: true,
            availability: {
              offline: ["2:00 PM - 3:00 PM", "6:00 PM - 7:00 PM"],
              online: ["3:30 PM - 4:00 PM"],
            },
          },
        ],
      },
    ],
  },
  {
    name: "Sukhmani Hospital | Best Hospital in South Delhi | Multispeciality Hospital in Delhi",
    vicinity: "South Delhi",
    rating: 4.0,
    user_ratings_total: 150,
    departments: [
      {
        name: "Neurology",
        doctors: [
          {
            name: "Dr. Kavita Menon",
            available: true,
            availability: {
              offline: ["9:00 AM - 10:00 AM", "1:00 PM - 2:00 PM"],
              online: ["10:30 AM - 11:00 AM"],
            },
          },
        ],
      },
    ],
  },
  {
    name: "VMMC & Safdarjung Hospital",
    departments: [
      {
        name: "Orthopedics",
        doctors: [
          {
            name: "Dr. Arun Mehta",
            available: false,
          },
        ],
      },
    ],
  },
  {
    name: "Aakash Hospital",
    departments: [
      {
        name: "Pediatrics",
        doctors: [
          {
            name: "Dr. Ritu Malhotra",
            available: true,
            availability: {
              offline: ["10:00 AM - 11:30 AM"],
              online: ["3:00 PM - 3:30 PM"],
            },
          },
        ],
      },
    ],
  },
  {
    name: "Apex Multispeciality Hospital and Skin Clinic",
    departments: [
      {
        name: "Dermatology",
        doctors: [
          {
            name: "Dr. Sneha Kapoor",
            available: true,
            availability: {
              offline: ["11:00 AM - 12:00 PM"],
              online: ["4:00 PM - 4:30 PM"],
            },
          },
        ],
      },
    ],
  },
  {
    name: "Daya Memorial Hospital / Hygiea Hospital",
    departments: [
      {
        name: "General Medicine",
        doctors: [
          {
            name: "Dr. Karan Singh",
            available: false,
          },
        ],
      },
    ],
  },
  {
    name: "Vidya Sagar Health Centre",
    departments: [
      {
        name: "Gynecology",
        doctors: [
          {
            name: "Dr. Priya Sethi",
            available: true,
            availability: {
              offline: ["9:00 AM - 10:00 AM"],
              online: ["12:00 PM - 12:30 PM"],
            },
          },
        ],
      },
    ],
  },
  {
    name: "Ilbs Hospital",
    departments: [
      {
        name: "Hepatology",
        doctors: [
          {
            name: "Dr. Aman Chopra",
            available: true,
            availability: {
              offline: ["10:00 AM - 11:00 AM"],
              online: ["2:00 PM - 2:30 PM"],
            },
          },
        ],
      },
    ],
  },
  {
    name: "Aashlok Hospital",
    departments: [
      {
        name: "Oncology",
        doctors: [
          {
            name: "Dr. Rohit Gupta",
            available: false,
          },
        ],
      },
    ],
  },
];

export default hospitals;

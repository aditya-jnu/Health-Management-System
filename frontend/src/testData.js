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
              gmail: "29adityamishra@gmail.com",
              available: true,
              availability: {
                offline: [
                  { date: "2025-01-27", time: "10:00 AM - 11:00 AM" },
                  { date: "2025-01-28", time: "4:00 PM - 5:00 PM" },
                ],
                online: [
                  { date: "2025-01-27", time: "11:30 AM - 12:00 PM" },
                  { date: "2025-01-24", time: "5:30 PM - 6:00 PM" },
                ],
              },
            },
          ],
        },
        {
          name: "Neurosurgeon",
          doctors: [
            {
              name: "Dr. Satyam Laheri",
              gmail: "satyamlaheri3@gmail.com",
              available: true,
              availability: {
                offline: [
                  { date: "2025-01-30", time: "10:00 AM - 11:00 AM" },
                  { date: "2025-01-28", time: "4:00 PM - 5:00 PM" },
                ],
                online: [
                  { date: "2025-01-26", time: "11:30 AM - 12:00 PM" },
                  { date: "2025-01-29", time: "5:30 PM - 6:00 PM" },
                ],
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
              gmail: "satyamlaheri3@gmail.com",
              available: true,
              availability: {
                offline: [
                  { date: "2025-01-28", time: "2:00 PM - 3:00 PM" },
                  { date: "2025-01-24", time: "6:00 PM - 7:00 PM" },
                ],
                online: [
                  { date: "2025-01-21", time: "3:30 PM - 4:00 PM" },
                  { date: "2025-01-25", time: "3:30 PM - 4:00 PM" },
                ],
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
              gmail: "kartik59_soe@jnu.ac.in",
              available: true,
              availability: {
                offline: [
                  { date: "2025-01-22", time: "9:00 AM - 10:00 AM" },
                  { date: "2025-01-22", time: "1:00 PM - 2:00 PM" },
                ],
                online: [
                  { date: "2025-01-22", time: "10:30 AM - 11:00 AM" },
                ],
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
  ];
  
  export default hospitals;
  
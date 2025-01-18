import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const sliderData = [
    {
      title: "Box 1",
      description: "This is the first box",
      image: "/assets/1.png",
      link: "/getHealthRecommendation"
    },
    {
      title: "Box 2",
      description: "This is the second box",
      image: "/assets/2.png",
      link:"/medicalDiagnosis"
    },
    {
      title: "Box 3",
      description: "This is the third box",
      image: "/assets/3.png",
      link:"/Myappointment"
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Inline CSS to style react-slick */}
      <style>
        {`
          .slider-container .slick-slide {
            padding: 0 10px; /* Space between slides */
          }
          .slider-container .slick-list {
            margin: 0 -10px; /* Align slides properly */
          }
        `}
      </style>

      {/* Image Section with Text Overlay */}
      <div className="relative w-full h-[30rem]">
        <img
          src="/assets/homeComp1.png"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-6 mr-60">
            <h2 className="text-4xl font-bold mb-4">Book your first appointment</h2>
            <p className="text-lg ">
              Find the best doctors, clinics and hospitals in the city nearest to you.
            </p>
            <button className="bg-logocolor rounded-lg p-4 mt-10 font-semibold" onClick={() => navigate("/Bookappointment")}>Book Appointment</button>
          </div>
        </div>
      </div>

      {/* Slider Section */}
      <div className="mx-auto max-w-5xl pt-16">
        <Slider
          {...settings}
          className="slider-container" // Custom class for styling
        >
          {sliderData.map((item, index) => (
            <div
              key={index}
              className="p-3 bg-blue-50 shadow-md rounded-md flex flex-col items-center mb-16 hover:bg-blue-200 transition duration-300 cursor-pointer"
              onClick={() => navigate(item.link)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-100 object-cover rounded-t-md"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const sliderData = [
    {
      title: "Box 1",
      description: "This is the first box",
      image: "/assets/dr1.avif",
    },
    {
      title: "Box 2",
      description: "This is the second box",
      image: "/assets/dr2.avif",
    },
    {
      title: "Box 3",
      description: "This is the third box",
      image: "/assets/dr3.avif",
    },
    {
      title: "Box 4",
      description: "This is the fourth box",
      image: "/assets/dr4.jpg",
    },
    {
      title: "Box 5",
      description: "This is the fifth box",
      image: "/assets/dr5.jpg",
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
          src="/assets/medi1st.webp"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h2 className="text-4xl font-bold mb-4">Welcome to Our Platform</h2>
            <p className="text-lg">
              Discover amazing content and features tailored just for you.
            </p>
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
              className="p-6 bg-white shadow-md rounded-md flex flex-col items-center mb-16"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-cover rounded-t-md"
              />
              <h2 className="text-xl font-semibold mt-4">{item.title}</h2>
              <p className="text-gray-600 text-center">{item.description}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Home;

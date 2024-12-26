import NearByHosp from "./NearByHosp";

const Home = () => {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Welcome to Your Dashboard</h2>
          <p>Your health records and more...</p>
        </div>

        <div><NearByHosp/></div>
      </div>
    );
  };
  
  export default Home;
  
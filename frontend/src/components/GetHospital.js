import NearByHosp from "./NearByHosp";
import Navbar from "./Navbar";
const GetHospital = () => {
    return (
      <div className="min-h-screen bg-gray-100">
        <div><Navbar/></div>        
        <div><NearByHosp/></div>
      </div>
    );
  };
  
  export default GetHospital;
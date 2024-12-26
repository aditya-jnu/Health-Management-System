import axios from 'axios'
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function NearByHosp() {
    let{NearByHospital, loc}=useContext(AppContext);
    const apiUrl = 'https://maps.gomaps.pro/maps/api/place/nearbysearch/json';
    const params = {
        location : `${loc.latitude},${loc.longitude}`,
        radius : 5000,
        name: 'hospital',
        key: 'AlzaSy1MLzhGZDb9umqvm7c5XTNFSjDcHTVDKNz',
    };

    async function fetchHosp(){
        try{
                const response = await axios.get(apiUrl, { params });
                console.log(response.data.results);
           } catch(error){ 
                console.error('Error fetching hospitals:', error) 
           }
    }

    
    return (
        <div>
            <button className='p-2 border rounded-xl mt-5 bg-red-300' onClick={fetchHosp}>Nearby Hospital</button>
            <p>Check the result on console,(limited API requests)</p>
        </div>
    )
}

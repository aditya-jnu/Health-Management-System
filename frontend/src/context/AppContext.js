import { createContext, useState } from "react"

export const AppContext=createContext();

export default function AppContextProvider({children}){

    const [nearByHospital, setNearByHospital] = useState(null);
    const [loc, setLoc] = useState({ latitude: null, longitude: null });
    let value = {nearByHospital,setNearByHospital,loc,setLoc};
    
    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
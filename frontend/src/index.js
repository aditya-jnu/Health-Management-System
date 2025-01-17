import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AppContextProvider from './context/AppContext';
import { GoogleOAuthProvider } from '@react-oauth/google'

const client_id = "630270940170-1906g52af3c2gad8gen8edr389fa038v.apps.googleusercontent.com";
console.log(client_id)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<GoogleOAuthProvider clientId={client_id}>
 <AppContextProvider>
        <App />
 </AppContextProvider>
 </GoogleOAuthProvider>
    
);


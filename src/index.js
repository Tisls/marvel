import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './components/app/App';
import MarvelService from './services/MarvelService';
import './style/style.scss';



const root = createRoot(document.getElementById('root')); // Use createRoot from react-dom/client

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);




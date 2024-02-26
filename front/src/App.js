import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Accueil from './pages/Accueil';
import Error from './components/Error/Error'; 

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/user/:userId" element={<Accueil />} />
                <Route path="/" element={<Navigate replace to="/user/18" />} />
                <Route path="*" element={<Error />} /> 
            </Routes>
        </Router>
    );
};
export default App;

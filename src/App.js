// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NormalDashboard from './components/NormalDashboard';
import MyProjects from './components/MyProyects';
import { useAuth } from './hooks/useAuth';

function App() {
    const { user, loading } = useAuth(); // Obtén el usuario y el estado de carga desde el hook

    if (loading) {
        return <div>Loading...</div>; // Opcional: Muestra un mensaje de carga mientras se obtiene el estado del usuario
    }

    return (
        <Router>
            <Routes>
                {/* Ruta de inicio */}
                <Route path="/" element={<Navigate to="/login" />} />

                {/* Ruta para el login */}
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />

                {/* Ruta para el registro */}
                <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />

                {/* Ruta para el dashboard */}
                <Route path="/normalDashboard" element={user ? <NormalDashboard /> : <Navigate to="/login" />} />

                {/* Ruta para ver los proyectos del usuario */}
                <Route path="/my-projects" element={user ? <MyProjects /> : <Navigate to="/login" />} />

                {/* Ruta para cualquier ruta no encontrada */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;

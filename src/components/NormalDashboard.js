// components/NormalDashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MyProjects from './MyProyects';

function NormalDashboard() {
    const [user, setUser] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateData, setUpdateData] = useState({ nombre: '', correo_electronico: '', password: '' });

    // Obtener información del usuario al montar el componente
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/auth/me', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setUser(response.data);
            } catch (err) {
                console.error('Error fetching user:', err);
            }
        };

        fetchUser();
    }, []);

    const handleUpdateChange = (e) => {
        setUpdateData({
            ...updateData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('/api/auth/update', updateData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            alert('Datos actualizados con éxito');
            setUpdateData({ nombre: '', correo_electronico: '', password: '' });
            setIsUpdating(false);
        } catch (err) {
            console.error('Error updating user data:', err);
            alert('Error al actualizar los datos');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <div>
            <h1>Bienvenido {user?.nombre || 'Usuario'}</h1>
            <h2>Mi Dashboard</h2>
            <button onClick={handleLogout}>Cerrar sesión</button>

            <div>
                <h3>Actualizar Datos</h3>
                <button onClick={() => setIsUpdating(!isUpdating)}>
                    {isUpdating ? 'Cancelar' : 'Actualizar Datos'}
                </button>

                {isUpdating && (
                    <form onSubmit={handleUpdateSubmit}>
                        <div>
                            <label>Nombre:</label>
                            <input
                                type="text"
                                name="nombre"
                                value={updateData.nombre}
                                onChange={handleUpdateChange}
                            />
                        </div>
                        <div>
                            <label>Correo Electrónico:</label>
                            <input
                                type="email"
                                name="correo_electronico"
                                value={updateData.correo_electronico}
                                onChange={handleUpdateChange}
                            />
                        </div>
                        <div>
                            <label>Contraseña:</label>
                            <input
                                type="password"
                                name="password"
                                value={updateData.password}
                                onChange={handleUpdateChange}
                            />
                        </div>
                        <button type="submit">Actualizar</button>
                    </form>
                )}
            </div>

            <MyProjects />
        </div>
    );
}

export default NormalDashboard;

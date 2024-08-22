import React, { useState } from 'react';
import axios from 'axios';

const UpdateProfile = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${process.env.REACT_APP_API_URL}/api/users/actualizarUsuario`, {
        nombre,
        correo_electronico: correo,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Perfil actualizado');
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      alert('Error al actualizar el perfil');
    }
  };

  return (
    <div>
      <h2>Actualizar Perfil</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default UpdateProfile;

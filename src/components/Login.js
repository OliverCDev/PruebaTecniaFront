import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [correo_electronico, setCorreo_electronico] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', {
                correo_electronico,
                password
            });
            
            // Almacenar el token en localStorage
            localStorage.setItem('token', response.data.token);
            if(response.status===200){
                console.log("Ingreso exitoso");
                alert("Se ingreso correctamente")
                navigate('/normal-Dashboard');
            }else if(response.status===401){ 
                console.log("Contraseña Incorrecta");
                alert(response.message);
            }
            
        } catch (err) {
            console.error('Error al intentar ingresar:', err.response ? err.response.data : err.message);
            setError('Error al intentar ingresar');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="correo_electronico">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="correo_electronico"
                        value={correo_electronico}
                        onChange={(e) => setCorreo_electronico(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Iniciar Sesión</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default Login;

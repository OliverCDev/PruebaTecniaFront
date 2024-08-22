import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/proyectos/mis-proyectos`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <h2>Mis Proyectos</h2>
      {projects.length === 0 ? (
        <p>No tienes proyectos asociados.</p>
      ) : (
        <ul>
          {projects.map(project => (
            <li key={project.id_proyecto} style={{ marginBottom: '20px' }}>
              <h3>{project.nombre_proyecto}</h3>
              <p><strong>Fecha de Inicio:</strong> {new Date(project.fecha_inicio).toLocaleDateString()}</p>
              <p><strong>Fecha de Fin:</strong> {new Date(project.fecha_fin).toLocaleDateString()}</p>
              <p><strong>Descripción:</strong> {project.descripcion}</p>
              <p><strong>Objetivos:</strong> {project.objetivos}</p>
              <p><strong>Departamento de Ejecución:</strong> {project.departamento_ejecucion}</p>
              <p><strong>Monto de Ejecución:</strong> ${project.monto_ejecucion.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyProjects;

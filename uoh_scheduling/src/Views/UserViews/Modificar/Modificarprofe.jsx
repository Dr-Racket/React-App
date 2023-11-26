import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../../css/Profesores.css'

function ModificarProfe() {

  const navigate = useNavigate();

  // Barra de búsqueda Hooks
  const [search, setSearch] = useState("");

  // Obtener los profesores del localStorage al cargar la página
  useEffect(() => {
    const storedTeachers = JSON.parse(localStorage.getItem('selectedTeachers')) || [];
    setProfesores(storedTeachers);
  }, []);

  const [profesores, setProfesores] = useState([]);

  const handleModificarClick = (nombre) => {
    navigate(`/EditarprefP/${nombre}`);
  };

  // Filtrar los profesores según la búsqueda y eliminar duplicados
  const filteredProfes = profesores.filter((profesor) => {
    return profesor.teacher.toLowerCase().includes(search.toLowerCase());
  });

  const handleAgregarPreferenciaClick = () => {
    // Redirigir a la ruta de agregar cursos
    navigate('/addTeacherAlgorithm');
  };

  // Mensaje en caso de que no hayan cursos
  const noCoursesMessage = (
    <div style={{ textAlign: 'center'}}>
      <p style={{ fontSize: '1.3vw' }}>No se han añadido preferencias de horario al algoritmo.</p>
      <button style={{backgroundColor: '#3498db', color:'#fff'}}  onClick={handleAgregarPreferenciaClick}>
        Agregar Preferencias
      </button> 
    </div>
  );

  // Crear un mapa de profesores por nombre único
  const teachersMap = filteredProfes.reduce((map, profesor) => {
    const teacherName = profesor.teacher;
    if (!map.has(teacherName)) {
      map.set(teacherName, []);
    }
    map.get(teacherName).push(profesor);
    return map;
  }, new Map());

  // Renderizar la lista de profesores únicos con un botón "Modificar" por nombre
  const renderProfes = () => {
    return Array.from(teachersMap).map(([teacher, profesoresConEsteNombre], index) => (
      <li key={index} className='curso-item' style={{ color: 'black' }}>
        {teacher}
        <button
          className='aplicar-button3'
          onClick={() => handleModificarClick(profesoresConEsteNombre[0].teacher)}
        >
          Modificar
        </button>
      </li>
    ));
  };

  return (
    <div className="agregar-estilo-container">
      <h2>Modificar Profesores</h2>
      <div className="container-mprofe">
      <div className="Container-Cursos-Search">
        <input
          type="text"
          placeholder="Buscar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="Container-Scroll">
        <div className="Content-Cursos">
            {profesores.length === 0 ? noCoursesMessage : (
                <ul>
                  {renderCursos()}
                </ul>
            )}
        </div>
      </div>
      </div>
    </div>
  );
}

export default ModificarProfe;

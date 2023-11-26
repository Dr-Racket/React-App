import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../../../css/DeleteCourseAlgorithm.css'



function DeleteTeacherAlgorithm() {
    const [search, setSearch] = useState("");
    const [NProfes, setNProfes] = useState([]);
    const navigate = useNavigate()

  // Función para realizar la solicitud a la API
  useEffect(() => {
    const storedTeachers= localStorage.getItem("selectedTeachers")
    setNProfes((storedTeachers) ? JSON.parse(storedTeachers) : [])

  }, []); // El segundo argumento vacío [] asegura que la solicitud se realice solo una vez
  const handleEliminarTeacher= (profesor) => {
    const confirmar = window.confirm(`¿Estás seguro de que deseas eliminar a ${profesor.teacher}?`);

    const currentTeacher = JSON.parse(localStorage.getItem("selectedTeachers")) || []
    const index = currentTeacher.findIndex(pro => pro.id === profesor.id)

    if (index !==-1 && confirmar){
      currentTeacher.splice(index, 1)
      localStorage.setItem("selectedTeachers", JSON.stringify(currentTeacher))
      setNProfes(currentTeacher)
      toast.success(`${profesor.teacher} ${profesor.name} ha sido eliminado`, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000, // 3 segundos
      });
    }
  } 

  const filteredTeachers = NProfes.filter((profes, index) => {
    if(search){
      return profes.teacher.toLowerCase().includes(String(search).toLowerCase());
    }else{ return profes.teacher}
    });

  const [horario, setHorario] = useState([
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
  ]);


  const horas = [
    '08:30 - 10:00',
    '10:15 - 11:45',
    '12:00 - 13:30',
    '14:30 - 16:00',
    '16:15 - 17:45',
    '18:00 - 19:30',
  ];
  const dias = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes'
  ]
 const showHorario = (teacher) => {
  const currentHorario = horario.map((fila) => [...fila]);
  teacher.blocks.map((block) => {
    currentHorario[block[0]][block[1]] = true;
  });

  return currentHorario;
 }
  const blockDisplay = (profe) => {
    return (
      <div className="horario-container">
        <div className="horario-wrapper">
        <div className="horario-horas">
            {horas.map((hora, index) => (
            <div key={index} className="hora-nombre" style={{position:'relative', color:'black', right:'2vw', width: '9vw'}}>
                {hora}
            </div>
            ))}
        </div>
        <table className="horario-table" >
            <thead>
            <tr>
                <th style={{color:'black'}}>Lunes</th>
                <th style={{color:'black'}}>Martes</th>
                <th style={{color:'black'}}>Miércoles</th>
                <th style={{color:'black'}}>Jueves</th>
                <th style={{color:'black'}}>Viernes</th>
            </tr>
            </thead>
            <tbody>

            {/* MAPEO Horarios profesor */}
            {showHorario(profe).map((fila, filaIndex) => (
              <tr key={filaIndex}>
                {fila.map((bloque, bloqueIndex) => (
                  <td key={bloqueIndex}
                  className={bloque ? 'seleccionado' : ''}
                  >
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
        </table>
        </div>
      </div>
  );};
  
  const renderProfes= () => {
    return filteredTeachers.map((profes, index) => (
      <div className="Container-NACU" key={index}> 
        <div  style= {{color:'black'}}>
          <div className='Container-cursoprofe'>
            <div className='Container-profe-algoritmo'>
              <div>
                  Profesor: {profes.teacher}
              </div>
              <div>
                  Curso: {profes.name} 
              </div>
            </div>
            <div className='Container-curso-algoritmo'>
                {blockDisplay(profes)}
            </div>
          </div>
        </div>
        <button className='aplicar-button' onClick={() => handleEliminarTeacher(profes)}>
            Eliminar
          </button>
      </div>
    ));
  };

  const handleAgregarTeacherClick = () => {
    // Redirigir a la ruta de agregar cursos
    navigate('/AddTeacherAlgorithm');
  };

  // Mensaje en caso de que no hayan profesores
  const noTeacherMessage = (
    <div style={{ textAlign: 'center'}}>
      <p >No se han añadido profesores al algoritmo.</p>
      <button style={{backgroundColor: '#3498db', color:'#fff'}}  onClick={handleAgregarTeacherClick}>
        Agregar Profesores
      </button> 
    </div>
  );


  return(
    <div className="agregar-estilo-container">
      <div className="container-mprofe">
        <h2 className='title'>Elimina Profesores del algoritmo</h2>
          <div className="Container-Cursos-Search">
            <input
              type='text'
              placeholder='Buscar'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            </div>
              <div className="Container-Scroll">
                  <div className="Content-Cursos">
                    {NProfes.length === 0 ? (
                       <div>{noTeacherMessage}</div>
                      ) : (
                      <ul>
                        {renderProfes()}
                      </ul>
                    )}
                      <ToastContainer />
                  </div>
              </div>
        </div>
      </div>

  );
}


export default DeleteTeacherAlgorithm;


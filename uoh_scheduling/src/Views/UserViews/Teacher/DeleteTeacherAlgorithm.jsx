import React, { useState, useEffect } from 'react';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../../../css/DeleteCourseAlgorithm.css'



function DeleteTeacherAlgorithm() {
    const [search, setSearch] = useState("");
    const [NProfes, setNProfes] = useState([]);

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

  const blockDisplay = (blocks) => {
    return blocks.map((bloque) => (
        <li>
         Dia: {dias[bloque[1]]} | Hora: {horas[bloque[0]]}
        </li>
  ))};
  
  const renderProfes= () => {
    return filteredTeachers.map((profes, index) => (
      <div className="Container-NACU"> 
        <div key={index} style= {{color:'black'}}>
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
                {blockDisplay(profes.blocks)}
            </div>
          </div>
        </div>
        <button className='aplicar-button' onClick={() => handleEliminarTeacher(profes)}>
            Eliminar
          </button>
      </div>
    ));
  };



  return(
    <div className="agregar-estilo-container">
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
                    <ul>
                        {renderProfes()}
                    </ul>
                    <ToastContainer />
                </div>
            </div>
        </div>

  );
}


export default DeleteTeacherAlgorithm;


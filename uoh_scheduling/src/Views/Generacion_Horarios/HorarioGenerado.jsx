import React, { useState, useEffect } from 'react';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import generarCSV from './generarCSV';

import '../../css/DeleteCourseAlgorithm.css'


function HorarioGenerado() {
  const [search, setSearch] = useState("");
  const [NProfes, setNProfes] = useState([]);
  const [NCursos, setNCursos] = useState([]);
  const [sentData, setSentData] = useState([]);
  const [done, setDone] = useState(false);

  // Función para realizar la solicitud a la API
  useEffect(() => {
    const storedTeachers = localStorage.getItem("selectedTeachers")
    setNProfes((storedTeachers) ? JSON.parse(storedTeachers) : [])
  }, []); // El segundo argumento vacío [] asegura que la solicitud se realice solo una vez
  

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

  const buttons = () => {

    if(done){
    return (
      <div style={{position:'relative', display:'flex',marginLeft:'53.3vw', justifyContent:'space-evenly'}}>
        <button style={{backgroundColor: '#007bff', marginBottom: '1vw', top:'-2vw'}} onClick={() => generarCSV(NProfes)}> Descargar Datos</button>
      </div>
    );
    }else{
      return (
        <div style={{position:'relative', display:'flex',marginLeft:'53.3vw', justifyContent:'space-evenly'}}>
          <button style={{backgroundColor: '#007bff', marginBottom: '1vw', top:'-2vw'}} onClick={sendDataToAPI}>Enviar Datos a la API</button>
        </div>
      );
    }
  }

  const sendDataToAPI = () => {
    // Obtener los datos del localStorage que deseas enviar
    const selectedTeachers = JSON.parse(localStorage.getItem('selectedTeachers'));
    const selectedCourses = JSON.parse(localStorage.getItem('selectedCourses'));

    // Crear un objeto con los datos a enviar
    const dataToSend = {
      selectedTeachers,
      selectedCourses,
    };

    // Realizar una solicitud POST a la API para enviar los datos
    axios
      .post('http://127.0.0.1:8000/api/postAlgorithm', selectedTeachers)
      .then((response) => {
        // Manejar la respuesta de la API si es necesario
        console.log('Datos enviados con éxito:', response.data);
        setNProfes(response.data);
        setDone(true);
      })
      .catch((error) => {
        // Manejar los errores de la solicitud
        console.error('Error al enviar datos a la API:', error);
      });
  };


 // Creacion de horario propio del profe
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
  );
  };
  
  const renderProfes= () => {
    return filteredTeachers.map((profe, index) => (
      <div className="Container-NACU" key={index}> 
        <div  style= {{color:'black'}}>
          <div className='Container-cursoprofe'>
            <div className='Container-profe-algoritmo'>
              <div>
                  Profesor: {profe.teacher}
              </div>
              <div>
                  Curso: {profe.name} 
              </div>
            </div>
            <div className='Container-curso-algoritmo'>
              {blockDisplay(profe)}
            </div>
          </div>
        </div>
      </div>
    ));
  };



  return(
    <div className="agregar-estilo-container" >
      <div className="container-mprofe" style={{height: '56%'}}>
        <h2 className='title' style={{position:'relative', top:'-2vw'}}>Vista previa de profesores creados</h2>
          <div className="Container-Cursos-Search" style={{position:'relative', top:'-2vw'}}>
            <input
              type='text'
              placeholder='Buscar'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            </div>
              <div className="Container-Scroll" style={{position:'relative',height:'20vw', top:'-2vw'}}>
                  <div className="Content-Cursos">
                      <ul>
                          {renderProfes()}
                      </ul>
                      <ToastContainer />
                  </div>
            </div>
            <>
             {buttons()} 
            </>

      </div>
    </div>

    

  );
}


export default HorarioGenerado;
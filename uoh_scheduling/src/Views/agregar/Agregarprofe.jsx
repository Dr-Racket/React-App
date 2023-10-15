import React, { useState ,useEffect} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios'
import '../../css/Estilosvistas.css'

function Agregarprofe() {
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
 
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [search_courses, setSearchCourses] = useState("");
  const [NCursos, setNCursos] = useState([]);

  const [mensaje, setMensaje] = useState(''); // Estado para el mensaje

   
  const [search_teachers, setSearchTeachers] = useState("");
  const [profesores, setProfesores] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');

  // Función para realizar la solicitud a la AP
  const handleAddCourse = (curso) => {
    console.log(curso.id)
    // Copiar el estado actual de los cursos seleccionados
    const updatedSelectedCourses = [...selectedCourses];
  
    // Comprobar si el curso ya está en la lista de cursos seleccionados
    const index = updatedSelectedCourses.findIndex(obj => obj.name === curso.name);
    console.log(index)
    if (index === -1) {
      // Si no está en la lista, agrégalo
      updatedSelectedCourses.push(curso);
    } else {
      // Si ya está en la lista, quítalo
      updatedSelectedCourses.splice(index, 1);
    }
  
    // Actualizar el estado de los cursos seleccionados
    setSelectedCourses(updatedSelectedCourses);
  };
  const filteredCursos = NCursos.filter((curso, index) => {
    if(search_courses){
      return curso.name.toLowerCase().includes(String(search_courses).toLowerCase());
    }else{ return curso.name }
    });
  

const renderCursos = () => {
  return filteredCursos.map((curso, index) => (
    <li key={index} className='render-li-courses-style'>
      <div className='div-li-courses-name'>
        {curso.name} {curso.code} \ semestre {curso.semester}
      </div>
      <div className='div-li-courses-button'>
        <input
          type='checkbox'
          onChange={() => handleAddCourse(curso)}
          checked={selectedCourses.includes(curso)}
        />
      </div>
    </li>
  ));
};

useEffect(() => {
  cargarprofes();
  const storedCourses = localStorage.getItem("selectedCourses")
  setNCursos((storedCourses) ? JSON.parse(storedCourses) : [])
}, []); // El segundo argumento vacío [] asegura que la solicitud se realice solo una vez

const cargarprofes = () => {
  // URL de la API que devuelve la lista de profesores
  const apiUrl = 'http://localhost:8000/api/getTeachers/';
  // Realizar la solicitud GET utilizando Axios
  axios.get(apiUrl).then((response) => {
      // Actualizar el estado con los datos de los profesores
      setProfesores(response.data);
      console.log(response)
    }).catch((error) => {
      // Manejar errores si la solicitud falla
      console.error('Error al obtener la lista de profesores:', error);
    });
}

const filteredProfes = profesores.filter((profesor, index) => {
    if(search_teachers){
        return profesor.name.toLowerCase().includes(String(search_teachers).toLowerCase());
    }else{ return profesor.name}
});

const renderProfes = () => {
  return filteredProfes.map((profesor, index) => (
    <li key={index} className='render-li-courses-style'>
    <div className='div-li-courses-name'>
      {profesor.name} 
    </div>
    <div className='div-li-courses-button'>
      <input
        type='radio'
        value = {profesor.name}
        onChange={() => handleAddTeacher(profesor)}
        checked={selectedTeacher === profesor.name}
      />
    </div>
  </li>
    ));
};
function obtainTrueIndex(matriz) {
  const trueidx = [];

  for (let fila = 0; fila < matriz.length; fila++) {
    for (let columna = 0; columna < matriz[fila].length; columna++) {
      if (matriz[fila][columna] === true) {
        trueidx.push([fila, columna]);
      }
    }
  }

  return trueidx;
}
  const aplicarCambios = () => {
    if (!selectedTeacher && !selectedCourses) {
      // Si no se proporciona nombre o curso, muestra el mensaje de error
      setMensaje('Por favor, ingrese un nombre y un curso');
    }
    else if (!selectedCourses) {
      // Si no se proporciona nombre o curso, muestra el mensaje de error
      setMensaje('Por favor, ingrese un curso');
    }
    else if (!selectedTeacher) {
      // Si no se proporciona nombre o curso, muestra el mensaje de error
      setMensaje('Por favor, ingrese un nombre');
    }
    else {
      // Aquí puedes agregar la lógica para aplicar los cambios al profesor
      // Por ahora, simplemente establecemos el mensaje de éxito
      
      const positions = obtainTrueIndex(horario);
    const dict = selectedCourses.map((course) =>{
      return {id: course.id, name: course.name, teacher: selectedTeacher, blocks: positions}
    })
    //localStorage.setItem("selectedTeachers", JSON.stringify(currentCourses))
    console.log(dict)
    
    setMensaje('Aplicado exitosamente');
      
    }
  };
  const handleAddTeacher = (teacher) => {
    console.log(teacher.name)
    // Copiar el estado actual de los cursos seleccionados
   
  
    // Actualizar el estado de los cursos seleccionados
    setSelectedTeacher(teacher.name);
  };


  return (
    
    <div className="agregar-estilo-container container-scroll2">
      <h2>Agregar Profesor</h2>
      <div className="container-mprofe">
      <div className="container-search">
        <input
          type="text"
          placeholder="Buscar"
          value={search_teachers}
          onChange={(e) => setSearchTeachers(e.target.value)}
        />
      </div>
      <div className="container-scroll">
        <div className="content">
          <ul>
            {renderProfes()}
          </ul>
          <ToastContainer />
        </div>
      </div>
    </div>
      <div className="horario-container">
        <h2>Seleccione las Preferencias de los horarios del profesor:</h2>
        <div className="horario-wrapper">
          <div className="horario-horas">
            {horas.map((hora, index) => (
              <div key={index} className="hora-nombre">
                {hora}
              </div>
            ))}
          </div>
          <table className="horario-table">
            <thead>
              <tr>
                <th>Lunes</th>
                <th>Martes</th>
                <th>Miércoles</th>
                <th>Jueves</th>
                <th>Viernes</th>
              </tr>
            </thead>
            <tbody>
              {horario.map((fila, filaIndex) => (
                <tr key={filaIndex}>
                  {fila.map((casilla, casillaIndex) => (
                    <td
                      key={casillaIndex}
                      className={casilla ? 'seleccionado' : ''}
                      onClick={() => {
                        const nuevoHorario = [...horario];
                        nuevoHorario[filaIndex][casillaIndex] = !casilla;
                        setHorario(nuevoHorario);
                      }}
                    ></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        <div className="Container-Cursos-Search">
          <input
            type='text'
            placeholder='Buscar'
            value={search_courses}
            onChange={(e) => setSearchCourses(e.target.value)}
          />
          </div>
            <div className="Container-Scroll">
                <div className="Content-Cursos">
                    <ul>
                        {renderCursos()}
                    </ul>
                    <ToastContainer />
                </div>
            </div>
            <div className='conten-button'>
        <button className="aplicar-button" onClick={aplicarCambios}>
          Aplicar
        </button>
        {mensaje && <div className="mensaje">{mensaje}</div>}
      </div>
        </div>
      

  );
}

export default Agregarprofe;

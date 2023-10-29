import React, { useState ,useEffect} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios'
import '../../../css/Estilosvistas.css'


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


function AddTeacherAlgorithm() {
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

      //Agregar Toast con mensaje de confirmacion
      updatedSelectedCourses.push(curso);
    } else {
      // Si ya está en la lista, quítalo

      //Agregar Toast con mensaje de confirmacion
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
      <li key={index} className='render-li-style'>
        <div className='div-li-name'>
          {curso.name} {curso.code} \ semestre {curso.semester}
        </div>
        <div className='div-li-button'>
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
      <li key={index} className='render-li-style'>
      <div className='div-li-name'>
        {profesor.name} 
      </div>
      <div className='div-li-button'>
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

  const aplicarCambios = () => {

    let checkHorario = 0;
    const positions = obtainTrueIndex(horario);
    const storedTeachers = JSON.parse(localStorage.getItem('selectedTeachers')) || [];

    console.log(localStorage.getItem("selectedTeachers"))

    //Si desea puede implentar esto de otra forma más optima
    horario.forEach(element => {
      element.forEach(e => {
        if(e){
          checkHorario = 1
        }
      })
    });

    if (!selectedTeacher) {
      // Si no se proporciona nombre , muestra el mensaje de error
      toast.warning('Por favor, ingrese un nombre', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, // 3 segundos
      });
    }
    else if (checkHorario == 0) {
      //Si no se proporciona preferencias, muestra el mensaje de error
      toast.warning('Por favor, ingrese las preferencias del profesor', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, //3 segundos
      });
    }
    else if (selectedCourses == 0) {
      // Si no se proporciona curso, muestra el mensaje de error
      toast.warning('Por favor, ingrese un curso', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, // 3 segundos
      });
    }
    else {
      // Aquí puedes agregar la lógica para aplicar los cambios al profesor
      // Por ahora, simplemente establecemos el mensaje de éxito

      const teacherDict= selectedCourses.map((course) => {
        return {id: course.id, name: course.name, teacher: selectedTeacher, blocks: positions};
      });

      const updatedCourses = [...storedTeachers, ...teacherDict];

      // Almacena los cursos actualizados en localStorage
      localStorage.setItem('selectedTeachers', JSON.stringify(updatedCourses));
      toast.success(`Datos agregados con éxito`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, // 3 segundos
      });

      console.log(updatedCourses)
      
      //Limpiar ventana
      setSelectedCourses([]);
      setSelectedTeacher('');
      setHorario([
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
      ]);

      
    // localStorage.setItem("selectedTeachers", JSON.stringify(dict))
    console.log(updatedCourses)
      
    }
  };
  const handleAddTeacher = (teacher) => {
    console.log(teacher.name)

    // Actualizar el estado de los cursos seleccionados
    setSelectedTeacher(teacher.name);
  };


  return (
    
    <div className="agregar-estilo-container-scroll">
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
      <div className="Container-Scroll">
        <div className="Content-Profesores">
          <ul>
            {renderProfes()}
          </ul>
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
      </div>
        </div>
      

  );
}

export default AddTeacherAlgorithm;

import React, { useStatem, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import '../../css/Estilosvistas.css'

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

function setHorariosProtegidos() {
  const navigate = useNavigate()
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
 
  const opciones = ["Horario Protegido Global", "Horario Protegido Semestral"];
  const semestres = Array.from({ length: 10 }, (_, i) => `Semestre ${i + 1}`); // Crear array de semestres

  const [opcionSeleccionada, setOpcionSeleccionada] = useState(''); // Estado para la opción seleccionada
  const [semestreSeleccionado, setSemestreSeleccionado] = useState(''); // Estado para el semestre seleccionado
  const [selectedCourse, setSelectedCourse] = useState(''); //Estado para el curso seleccionado
  const [showHorario, setShowHorario] = useState(false); //Estado para ver el bloque de los horarios protegidos semestrales 

  const [ultimoHorarioGlobal, setUltimoHorarioGlobal] = useState([]);

  useEffect(() => {
    const ultimoHorario = JSON.parse(localStorage.getItem('HorariosProtegidosGlobales')) || [];
    setUltimoHorarioGlobal(ultimoHorario);
  }, []);

  //Manejo de las opciones de Horario Protegido Global o Semestral
  const handleOpcionChange = (event) => {
    const nuevaOpcion = event.target.value;
    setOpcionSeleccionada(nuevaOpcion);
  };


  const handleAgregarCursosClick = () => {
    // Redirigir a la ruta de agregar cursos
    navigate('/addCourseAlgorithm');
  };

  //Obtención y filtrado de los cursos del localStorage (si requiere lo pueden cambiar por una consulta a la base de datos en vez del LocalStorage)
  const renderCursosPorSemestre = () => {
    const storedCourse = JSON.parse(localStorage.getItem('selectedCourses')) || [];
    if (semestreSeleccionado === '') {
      return <div style={{fontSize :'1.3vw',marginTop:'1.3vw'}}>Selecciona un semestre para ver los cursos.</div>;
    }
    const semestreNumero = parseInt(semestreSeleccionado.split(" ")[1]); //Pasamos el String de Semestre Número que guarda el semestreSeleccionado a solamente un número para compararlo
    const cursosFiltrados = storedCourse.filter((curso) => curso.semesterincareer === semestreNumero);
  
    if (cursosFiltrados.length === 0) {
      return <div style={{fontSize :'1.3vw',marginTop:'1.3vw'}}>
        <h2>Cursos {semestreSeleccionado}</h2>
        No hay cursos ingresados para el semestre seleccionado.
        <div>
        <button style={{backgroundColor:'#007bff', margin: '1vw'}}   onClick={handleAgregarCursosClick}>
            Agregar Cursos
        </button>
        </div>
        </div>;
    }
  
    return (
      <div>
        <h2>Cursos {semestreSeleccionado}</h2>
          <div className='Container-Scroll'>
            <div className='Content-Cursos'>
              {cursosFiltrados.map((curso, index) => (
                <li className='curso-item' key={index}>
                  {curso.name}
                  <button className='aplicar-button3' onClick={() => handleAgregar(curso.name)}>
                    Añadir
                  </button>
                </li>
              ))}
            </div>
          </div>
      </div>
    );
  };

  //Cambiar los semestres en la combobox
  const handleSemestreChange = (event) => {
    const nuevoSemestre = event.target.value;
    setSemestreSeleccionado(nuevoSemestre);
  };

  const getHorarioCursoSeleccionado = (curso) => {
    const horariosProtegidosSemestrales = JSON.parse(localStorage.getItem('HorariosProtegidosSemestrales')) || [];
    const cursoHorarios = horariosProtegidosSemestrales.find(item => item.curso === curso);
    return cursoHorarios ? cursoHorarios.horarios : [];
  };

  //Boton para mostrar los horarios
  const handleAgregar = (curso) => {
    setSelectedCourse(curso);
    setShowHorario(true);
  
    // Obtener los horarios del curso seleccionado desde el localStorage
    const horariosCursoSeleccionado = getHorarioCursoSeleccionado(curso);
  
    // Crear una matriz de horarios predeterminados
    const horariosPredeterminados = [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
    ];
  
    // Actualizar el estado de los horarios para mostrarlos en la vista
    if (horariosCursoSeleccionado.length > 0) {
      const nuevoHorario = [...horariosPredeterminados];
      horariosCursoSeleccionado.forEach(([fila, columna]) => {
        nuevoHorario[fila][columna] = true;
      });
      setHorario(nuevoHorario);
    } else {
      setHorario(horariosPredeterminados);
    }
  };

  //boton para aplicar cambios de los horarios globales
  const aplicarCambios = () => {
    //Obtenemos los horarios protegidos globales
    const positions = obtainTrueIndex(horario);

    //En el caso de que no se hayan seleccionado, mostramos mensaje de error
    if(positions.length === 0){
        toast.error(`Por favor, selecciona al menos un bloque protegido.`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000, // 3 segundos
          });
    }else{
        //En el caso contrario guardamos en el localstorage
        localStorage.setItem('HorariosProtegidosGlobales', JSON.stringify(positions));
        toast.success(`Horarios protegidos globales agregados con éxito`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000, // 3 segundos
        });


        // Actualizamos el estado de ultimoHorarioGlobal
        setUltimoHorarioGlobal(positions);

        //Limpiar ventana


        
        setHorario([
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
        ]);
    }

    console.log(positions)
  };

  //Boton para aplicar cambios semestrales
  const aplicarCambios2 = () => {
    const positions = obtainTrueIndex(horario);

    //En el caso de que no se hayan seleccionado, mostramos mensaje de error
    if(positions.length === 0){
        toast.error(`Por favor, selecciona al menos un bloque protegido.`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000, // 3 segundos
          });
    }else{
        //ACA GUARDAR LOS CURSOS Y SUS PREFERENCIAS EN EL LOCALSTORAGE
        const cursoHorarios = {
          curso: selectedCourse,
          horarios: positions,
        };

        const horariosProtegidosSemestrales = JSON.parse(localStorage.getItem('HorariosProtegidosSemestrales')) || [];
        const existingIndex = horariosProtegidosSemestrales.findIndex(item => item.curso === selectedCourse);

        if (existingIndex !== -1) {
          // Si el curso ya existe, actualiza sus horarios
          horariosProtegidosSemestrales[existingIndex].horarios = positions;
        } else {
          // Si es un curso nuevo, agrégalo a la lista
          horariosProtegidosSemestrales.push(cursoHorarios);
        }

        // Guardar el objeto actualizado en el localStorage
        localStorage.setItem('HorariosProtegidosSemestrales', JSON.stringify(horariosProtegidosSemestrales));

        toast.success(`Horarios protegidos del ramo ${selectedCourse} agregados con éxito`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000, // 3 segundos
      });

        setShowHorario(false);

        setHorario([
          [false, false, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, false],
        ]);
      }

    console.log(positions)
  };


  return (
    <div className='agregar-estilo-container'>
      <h1>Asignación de horarios protegidos</h1>
      <div className='input-container-column'>
        <div className='input-container-fila' style= {{padding: "1vw",}}>
          <label style= {{marginRight:'13vw',fontSize: '1.3vw' }}>Selecciona una opción:</label>
          <select 
            id="opcionComboBox"
            value={opcionSeleccionada}
            onChange={handleOpcionChange}
            className="comboBox" 
            
          >
            <option value="">-- Selecciona una opción --</option>
            {opciones.map((opcion, index) => (
              <option key={index} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
        </div>
      
      

      {opcionSeleccionada === "Horario Protegido Semestral" && (
        <div className='input-container-column2'>
          <div className='input-container-fila' >
            <label style= {{marginRight:'20vw',fontSize: '1.3vw' }}> <div style= {{marginRight:'-6.5vw'}}> Selecciona un semestre:</div></label>
            <select
              id="semestreComboBox"
              value={semestreSeleccionado}
              onChange={handleSemestreChange}
              className="comboBox"
              
              
            >
              <option value="">-- Selecciona un semestre --</option>
              {semestres.map((semestre, index) => (
                <option key={index} value={semestre}>
                  {semestre}
                </option>
              ))}
            </select>
            </div>
            {renderCursosPorSemestre()}
        </div>
      )}
      </div>

      {opcionSeleccionada === "Horario Protegido Global" && (
        <div className="horario-container">
        <h2>Seleccione los horarios protegidos GLOBALES:</h2>
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
            <button className="aplicar-button" onClick={aplicarCambios}>
            Aplicar
            </button>
      </div>
      )}

      {showHorario && (
        <div className="horario-container">
        <h2>Seleccione los horarios protegidos del ramo {selectedCourse}:</h2>
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
            <button className="aplicar-button" onClick={aplicarCambios2}>
            Aplicar
            </button>
      </div>
      )}

{ultimoHorarioGlobal.length > 0 && (
  <div className="horario-container">
    <h2>Último horario global asignado</h2>
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
              {fila.map((casilla, casillaIndex) => {
                const casillaMarcada = ultimoHorarioGlobal.some(([fila, columna]) => fila === filaIndex && columna === casillaIndex);
                return (
                  <td
                    key={casillaIndex}
                    className={casillaMarcada ? 'seleccionado' : ''}
                    onClick={() => {
                      const nuevoHorario = [...horario];
                      nuevoHorario[filaIndex][casillaIndex] = !casilla;
                      setHorario(nuevoHorario);
                    }}
                  ></td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}
      <ToastContainer />
    </div>
  );
}

export default setHorariosProtegidos;
import React, { useStatem, useEffect, useState } from 'react';
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

  const [ultimoHorarioGlobal, setUltimoHorarioGlobal] = useState([]);
  const [horariosPorSemestre, setHorariosPorSemestre] = useState({});

  useEffect(() => {
    const ultimoHorario = JSON.parse(localStorage.getItem('HorariosProtegidosGlobales')) || [];
    setUltimoHorarioGlobal(ultimoHorario);
    const horariosGuardados = JSON.parse(localStorage.getItem('HorariosPorSemestre')) || {};
    setHorariosPorSemestre(horariosGuardados);
  }, []);

  //Manejo de las opciones de Horario Protegido Global o Semestral
  const handleOpcionChange = (event) => {
    const nuevaOpcion = event.target.value;
    setOpcionSeleccionada(nuevaOpcion);
  };

  //boton para aplicar cambios de los horarios semestrales
  const GuardarHorariosSemestrales = () => {
    //Obtenemos los horarios protegidos semestrales
    const positions = obtainTrueIndex(horario);

    //En el caso de que no se hayan seleccionado, mostramos mensaje de error
    if(positions.length === 0){
      const horariosGuardados = {
        ...horariosPorSemestre,
        [semestreSeleccionado]: [],
      };
      localStorage.setItem('HorariosPorSemestre', JSON.stringify(horariosGuardados));
      setHorariosPorSemestre(horariosGuardados);
      toast.success(`Horario protegido agregado con éxito`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, // 3 segundos
      });
      // Actualizamos el estado de HorariosPorSemestre
      setHorariosPorSemestre(horariosGuardados);
    }else{

      const horariosGuardados = {
        ...horariosPorSemestre,
        [semestreSeleccionado]: positions,
      };
      //En el caso contrario guardamos en el localstorage
      localStorage.setItem('HorariosPorSemestre', JSON.stringify(horariosGuardados));
      toast.success(`Horario protegido agregado con éxito`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, // 3 segundos
      });


      // Actualizamos el estado de HorariosPorSemestre
      setHorariosPorSemestre(horariosGuardados);
    }
    console.log(positions)
  };

  
  const renderCursosPorSemestre = () => {
    if (semestreSeleccionado === '') {
      return <div style={{fontSize :'1.3vw',marginTop:'1.3vw'}}>Selecciona un semestre para asignar un horario protido semestral.</div>;
    }
  
    return (
      <div className="horario-container">
        <h2>Seleccione los horarios protegidos semestrales: {semestreSeleccionado}</h2>
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
            <button className="aplicar-button" onClick={GuardarHorariosSemestrales}>
            Aplicar
            </button>
      </div>
    );
  };

  //Cambiar los semestres en la combobox
  const handleSemestreChange = (event) => {
    const nuevoSemestre = event.target.value;
    setSemestreSeleccionado(nuevoSemestre);

    // Verifica si hay un horario guardado para el semestre seleccionado
    const horarioGuardado = horariosPorSemestre[nuevoSemestre] || null;


    if (horarioGuardado) {
      // Actualiza el estado del horario para reflejar el horario guardado
      const horarioActualizado = [
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
      ];

      // Marca las celdas del horario guardado en el estado del horario
      horarioGuardado.forEach(([fila, columna]) => {
        horarioActualizado[fila][columna] = true;
      });

      // Actualiza el estado del horario para mostrar el horario guardado
      setHorario(horarioActualizado);
    } else {
      // Si no hay un horario guardado para el semestre seleccionado, mostrar un horario vacío
      setHorario([
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
      ]);
    }
  };


  //boton para aplicar cambios de los horarios globales
  const GuardarHorariosGlobales = () => {
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
            <button className="aplicar-button" onClick={GuardarHorariosGlobales}>
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
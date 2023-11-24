import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../../css/Profesores.css';

function Editarpreferenciaprofe() {
    const { nombre } = useParams();
    const navigate = useNavigate();
    const [cursosAsignados, setCursosAsignados] = useState([]);
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

    useEffect(() => {
        // Recuperar los datos del horario guardado para el profesor desde localStorage
        const storedTeachers = JSON.parse(localStorage.getItem('selectedTeachers')) || [];
        const teacherSchedule = storedTeachers.find(teacher => teacher.teacher === nombre);

        // Si se encuentra el horario del profesor, actualizar el estado 'horario'
        if (teacherSchedule && teacherSchedule.blocks) {
            const newHorario = [...horario];
            teacherSchedule.blocks.forEach(block => {
                const [filaIndex, casillaIndex] = block;
                newHorario[filaIndex][casillaIndex] = true;
            });
            setHorario(newHorario);
        }

        // Recuperar los cursos asignados al profesor
        const teacherCourses = storedTeachers.filter(teacher => teacher.teacher === nombre);
        console.log(teacherCourses);

        // Recuperar los cursos del localStorage 'selectedCourses' por su nombre
        const cursosGuardados = JSON.parse(localStorage.getItem('selectedCourses')) || [];
        const cursosAsignados = teacherCourses.map(course => {
            const cursoEnLocalStorage = cursosGuardados.find(curso => curso.name === course.name);
            return {
                id: course.id,
                name: course.name,
                code: cursoEnLocalStorage ? cursoEnLocalStorage.code : 'Sin código',
                semesterincareer: cursoEnLocalStorage ? cursoEnLocalStorage.semesterincareer : 'Sin semestre en carrera'
            };
    });

    // Guardar los cursos en un estado para mostrarlos en la interfaz
    setCursosAsignados(cursosAsignados);

    }, [nombre]);

    const guardarHorario = () => {
        const confirmacion = window.confirm('¿Estás seguro de modificar los horarios?');
        if (confirmacion) {
            // Sobrescribir el horario solo si el usuario confirma
            const storedTeachers = JSON.parse(localStorage.getItem('selectedTeachers')) || [];
            const updatedTeachers = storedTeachers.map(teacher => {
                if (teacher.teacher === nombre) {
                    return { ...teacher, blocks: obtenerBloquesActualizados() };
                }
                return teacher;
            });
            localStorage.setItem('selectedTeachers', JSON.stringify(updatedTeachers));

            // Mensaje de confirmación
            toast.success(`Datos modificados con éxito`, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000, // 3 segundos
            });
        }
    };

    const obtenerBloquesActualizados = () => {
        const bloques = [];
        horario.forEach((fila, filaIndex) => {
            fila.forEach((casilla, casillaIndex) => {
                if (casilla) {
                    bloques.push([filaIndex, casillaIndex]);
                }
            });
        });
        return bloques;
    };

    return(
        <div className="agregar-estilo-container">
            <h1>Preferencia Horario: { nombre }</h1>
            {/*Reutilizo el css de modificar profesor*/}
            <h3 className="texto-mostrar">Modificar las preferencias del profesor</h3>
            <div className="horario-container">
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
            {/*SCROLL BAR */}
            {/* Aquí renderizamos la lista de cursos asignados */}
            <div className='container-mprofe' >  
                <div className="cursos-asignados">
                    <h3>Cursos Asignados</h3>
                        <div className="Content-Cursos">
                            <ul>
                                {cursosAsignados.map(curso => (
                                <li className = "curso-item" key={curso.id} style= {{color:'black'}}>
                                    {curso.name}-{curso.code} / Semestre en la carrera {curso.semesterincareer}
                                </li>
                                ))}
                            </ul>
                        </div>
                </div>
            </div>
        
            {/*BOTON*/}
            <button type="submit" className="aplicar-buttonmd" onClick={guardarHorario}>
                Aplicar
            </button>
            <ToastContainer />

        </div>

    );
}

export default Editarpreferenciaprofe;
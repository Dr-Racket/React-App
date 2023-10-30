import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
//Vista en la cuál se modifican los profes

import '../../css/Profesores.css'

function Editarprefprofe() {

    // PARAMETRO NOMBRE PROFESOR
    const { nombre } = useParams();

    const [search, setSearch] = useState("");
    const [Profe, setProfe] = useState([]);
    const [Curso, setCurso] = useState([]);

    const [Lista, setLista] = useState([]);

    const [NProfes, setNProfes] = useState([]);
    const [NCursos, setNCursos] = useState([]);

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
        var mHorario = [
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
        ];

        const storedTeachers = localStorage.getItem("selectedTeachers")
        const storedCourses = localStorage.getItem("selectedCourses")

        setNProfes((storedTeachers) ? JSON.parse(storedTeachers) : [])
        setNCursos((storedCourses) ? JSON.parse(storedCourses) : [])

        const matchingProfes = NProfes.filter((profe) => profe.teacher === nombre);

        setProfe(matchingProfes); // Set the state with the filtered array
        
        matchingProfes.map(profe => {
            profe.blocks.map(block => {
                mHorario[block[0]][block[1]] = true
            })
        })

        setHorario(mHorario)

        console.log(Profe)

    }, [])

    const apply = () => {
        const confirmar = window.confirm(`¿Está seguro de que desea modificar a ${Profe.teacher}?`);

        if (confirmar) {
            // You can find the index of the teacher you want to remove
            const index = NProfes.findIndex((profe) => profe.teacher === Profe.teacher);

            if (index !== -1) {
                // Create a copy of the current teachers array and remove the teacher at the found index
                const updatedTeachers = [...NProfes];
                updatedTeachers.splice(index, 1);

                // Update the local storage and state with the modified teacher list
                localStorage.setItem("selectedTeachers", JSON.stringify(updatedTeachers));
                setNProfes(updatedTeachers);

                toast.success(`${Profe.teacher} ${Profe.name} ha sido modificado`, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000, // 3 seconds
                });
            }
        }
    }


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
            
            <h2>Cursos a impartir</h2>
            <div className="container-scroll-mp">
                <div className="content">
                    <ul className="Lista">
                        {Profe.map((profe, index) => (
                            <li key={index}>
                                {profe.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            
            {/*BOTON*/}
            <button type="submit" className="aplicar-buttonmd" onClick={apply}>
                Aplicar
            </button>

        </div>

    );
}

export default Editarprefprofe;

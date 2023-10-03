import React, { useState } from 'react';
//Vista en la cuál se modifican los profes

import '../css/modificarprofe.css'

function CambiarProfe() {
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

    const [cursos, setCursos] = useState([
        //agregar más de ser necesarios (tengo esos de ejemplo), cambiar url de ser necesario
        {nombre: "Computación Gráfica", codigo:"C1", semestre:"1" , select: false},
        {nombre: "Teoria de la Computación", codigo:"C2", semestre:"2" ,select: false},
        {nombre: "Matematicas Discretas", codigo:"C3", semestre:"1" ,select: false},
        {nombre: "Ciencias e Ingenieria Computacional", codigo:"C4", semestre:"4" ,select: false},
    ])

    return(
        <div className="container-cprofe">
            <h1>Editar Profesor</h1>
            <h3 className="texto-mostrar">Nombre: Ejemplo</h3> {/*<-- ACA EL NOMBRE DEBERIA VENIR DE LA BASE DE DATOS*/}
            {/*Reutilizo el css de modificar profesor*/}
            <div className="container-search">
            <input
                    type='text'
                    placeholder='Nuevo Nombre'
                />
                <button className="aplicar-button" type="submit">Cambiar</button>
            </div>
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
            
            <div className="container-scroll-mp">
                <div className="content">
                    <h2>Cursos a impartir</h2>
                    <ul className="Lista">
                        {cursos.map((elemento, index) => (
                            <li>
                                {elemento.nombre} - {elemento.codigo}-{elemento.semestre}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            
            {/*BOTON*/}
            <button type="submit" className="aplicar-buttonmd">
                Aplicar
            </button>

        </div>

    );
}

export default CambiarProfe;
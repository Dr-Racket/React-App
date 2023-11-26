import React, {useState, useEffect} from "react";

function convertToCSV(data) {
    // Convierte la matriz de datos a una cadena CSV
    const csvContent = data.map(row => row.join(',')).join('\n');
    return 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
}                
function downloadCSV(data, filename) {
    // Crea un elemento <a> invisible para descargar el archivo
    const link = document.createElement('a');
    link.href = convertToCSV(data);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function generarCSV (profesores) {

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
    let data = [
        ['id',
        'curso',
        'profesor',
        'semestre de carrera',
        'bloques'],
    ];

    const makeCSV = () => {
        profesores.map((profesor, index) => {
            let bloques = []
            let profe = [
                profesor.id,
                profesor.name,
                profesor.teacher,
                profesor.semesterincareer
            ]

            profesor.blocks.map((bloque, index) => {
                let hora = bloque[0];
                let dia = bloque[1]

                bloques.push(`${dias[dia]}-${horas[hora]}`);
            })
            profe.push(bloques.join(' | '));
            data.push(profe)
        })
    };
    console.log(data)
    
    makeCSV();

    downloadCSV(data, 'horariosGenerados.csv')
}

export default generarCSV;
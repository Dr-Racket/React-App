import React,{ useState } from 'react';

import '../css/modificarcurso.css'

function ModificarCurso() {
    const [search, setSearch] = useState("");
    const [button, setButton] = useState(false);


    const NCursos =[
        //agregar más de ser necesarios (tengo esos de ejemplo), cambiar url de ser necesario
        {nombre: "Computación Gráfica", codigo:"C1", semestre:"1" ,url: "/"},
        {nombre: "Teoria de la Computación", codigo:"C2", semestre:"2" ,url: "/"},
        {nombre: "Matematicas Discretas", codigo:"C3", semestre:"1" ,url: "/"},
        {nombre: "Ciencias e Ingenieria Computacional", codigo:"C4", semestre:"4" ,url: "/"},
    ]

    const handleButton = () => {
        if (search) {
            setButton(true);
        }else {
            setButton(false);
        }
    };

      const filteredCursos = NCursos.filter((curso, index) => {
          if(button){
            return curso.nombre.toLowerCase().includes(String(search).toLowerCase());
          }else{ return curso.nombre }
      });
      const renderCursos = () => {
          return filteredCursos.map((curso, index) => (
            <li key={index}>
                <a href={curso.url}>{curso.nombre}</a>
              </li>
            ));
      };

    return(
        <div className="Container-Cursos">
            <h2>Modificar Cursos</h2>
            <div className="Container-Cursos-Search">
                <input
                    type='text'
                    placeholder='Buscar'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={handleButton} className="aplicar-button" type="submit">Buscar</button>
            </div>
            <div className="Container-Scroll">
                <div className="Content-Cursos">
                    <ul>
                        {renderCursos()}
                    </ul>
                </div>
            </div>
        </div>

    );
}


export default ModificarCurso;

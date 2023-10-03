import React,{ useState, ErrorBoundary } from 'react';

function EliminarProfesor() {
    const [search, setSearch] = useState("");
    const [button, setButton] = useState(false);

    const NProfes = [
        //agregar más de ser necesarios (tengo esos de ejemplo), cambiar url de ser necesario
        {nombre: "Gonzalo", url: "www.google.com"},
        {nombre: "Paula", url: "/"},
        {nombre: "Paula", url: "/"},
        {nombre: "Paula", url: "/"},
        {nombre: "Paula", url: "/"},
     
    ]

    const handleButton = () => {
        if (search) {
              setButton(true);
        }else {
        setButton(false);
        }
    };

      const filteredProfes = NProfes.filter((profesor, index) => {
          if(button){
            return profesor.nombre.toLowerCase().includes(String(search).toLowerCase());
          }else{ return profesor.nombre }
      });
      const renderProfes = () => {
          return filteredProfes.map((profesor, index) => (
            <li key={index}>
                <a href={profesor.url}>{profesor.nombre}</a>
              </li>
            ));
      };

      return (
        <div className="container-mprofe">
          <h2>Eliminar Profesores</h2>
          <div className="container-search">
            <input
              type="text"
              placeholder="Buscar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleButton} className="aplicar-button" type="submit">Buscar</button>
          </div>
          <div className="container-scroll">
            <div className="content">
              <ul>
                    {renderProfes()}
              </ul>
            </div>
          </div>
        </div>
      );
    }
export default EliminarProfesor;

import React from 'react';
import img from "./0417221512.jpg";


function view404()
{
    return (
        <div style={{position: 'fixed',top: '8vw', left: '30vw'}}>
            <img src={img}/>
        </div>
    );
}


export default view404;

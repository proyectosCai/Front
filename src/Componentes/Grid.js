import React from 'react';
import { Link } from 'react-router-dom';
import '../Grid.css';

function Grid() {
  const boxes = [
    { nombre: 'Desarrollo de prototipos de sistemas embebidos para pequeños y microproductores, integrados con fuentes de generación energética renovable.', Ficha: '1'},
    { nombre: 'Control de calidad en procesos industriales adecuando visión artificial en la modernización del ambiente de formación FMS', Ficha: '2'},
    { nombre: 'Tecnificación de una microempresa en uso de tecnologías 4.0 para la vigilancia y control del proceso', Ficha: '3'},
    { nombre: 'Creación de maquina de impresión 3D de 5 ejes diseño SENA', Ficha: '4'},
    { nombre: 'Desarrollo de aplicaciones a la medida que faciliten la unificación de herramientas tecnológicas de apoyo a procesos administrativos en diferentes sectores productivos', Ficha: '5'},
    
  ]

  return (
    <div className="grid">
          {boxes.map(boxItem=> (
        <Link 
          key={boxItem.Ficha} 
          to={`/box/${boxItem.Ficha}`} 
          className="grid-box"
        >
            <div className="box-content">
            <span className="nombre">{boxItem.nombre}</span>
            <span className="ficha">{boxItem.Ficha}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Grid;
import React from 'react';
import { Link } from 'react-router-dom';
import '../Grid.css';

function Grid() {
  const boxes = [
    { nombre: 'IMPLEMENTACION DE INFRAESTRUCTURA DE TECNOLOGIAS DE LA INFORMACION Y LAS COMUNICACIONES', Ficha: '2901432'},
    { nombre: 'MODELADO DIGITAL DE PRODUCTOS INDUSTRIALES', Ficha: '2931657'},
    { nombre: 'DISEÑO E INTEGRACIÓN DE AUTOMATISMOS MECATRÓNICOS', Ficha: '2673191'},
    { nombre: 'DISEÑO E INTEGRACIÓN DE AUTOMATISMOS MECATRÓNICOS', Ficha: '2697737'},
    
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
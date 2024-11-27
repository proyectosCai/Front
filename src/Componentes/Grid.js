import React from 'react';
import { Link } from 'react-router-dom';
import '../Grid.css';

function Grid() {
  const boxes = [
    { nombre: 'CENTRO PARA LA FORMACIÓN CAFETERA', Ficha: '9112'},
    { nombre: 'CENTRO DE AUTOMATIZACIÓN INDUSTRIAL', Ficha: '9219'},
    { nombre: 'CENTRO PECUARIO Y AGROEMPRESARIAL', Ficha: '9515'},
    
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
import React from 'react';
import { Link } from 'react-router-dom';
import '../Grid.css';

function Grid() {
  const boxes = [
    { nombre: 'TPM - GPI', Ficha: 'JORNADA I'},
    { nombre: 'TPM - GPI', Ficha: 'JORNADA II'},
    
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

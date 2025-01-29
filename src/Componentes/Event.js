import React from 'react'
import ideacion from '../ideacion.png'
import { Link } from 'react-router-dom';

function Event() {
  return (
    <div className="flex justify-center items-center n pt-9">
    <Link to="/rate-project">
      <img
        src={ideacion}
        alt="Evento Científico Regional Caldas"
        style={{maxHeight:"480px"}}
      />
    </Link>
  </div>
  )
}

export default Event
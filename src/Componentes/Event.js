import React from 'react'
import poster from '../poster.png'
import { Link } from 'react-router-dom';

function Event() {
  return (
    <div className="flex justify-center items-center n">
    <Link to="/rate-project">
      <img
        src={poster}
        alt="Evento Científico Regional Caldas"
        style={{maxHeight:"480px"}}
      />
    </Link>
  </div>
  )
}

export default Event
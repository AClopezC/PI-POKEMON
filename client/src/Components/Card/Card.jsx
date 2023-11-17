import React from 'react'
import { Link } from 'react-router-dom';

export const Card = ({id, imagen, nombre, tipo}) => {
  return (
     <div>
        <h1>Pokemon: {nombre}</h1>
        <Link to={`/detail/${id}`}>
        <img src={imagen} alt={nombre} />
        </Link>
        <h3>Tipo: {tipo.join(', ')}</h3>
        <Link to={`/detail/${id}`}>
        <button>Detalle</button>
        </Link>
    </div>
  )
}

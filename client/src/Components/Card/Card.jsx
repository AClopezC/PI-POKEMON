import React from 'react'
import { Link } from 'react-router-dom';
import style from './card.module.css';

export const Card = ({id, imagen, nombre, tipo}) => {
  return (
     <div className={style.card}>
        <h1 className={style.h1}>Pokemon: {nombre}</h1>
        <Link to={`/detail/${id}`}>
        <img className={style.img} src={imagen} alt={nombre} />
        </Link>
        <h3 className={style.h3}>Tipo: {tipo && tipo.join(', ')}</h3>
        <Link to={`/detail/${id}`}>
        <button className={style.button}>Detalle</button>
        </Link>
    </div>
  )
}

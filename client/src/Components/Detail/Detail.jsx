import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {searchById} from '../../Redux/actions'
import { useParams } from 'react-router-dom';
import { NavBar } from '../NavBar/NavBar';
import { Link } from 'react-router-dom';
import style from './detail.module.css';
   
export const Detail = () => {

   const dispatch = useDispatch();
   const detail = useSelector((state) => state.pokemonsDetail);
   const { id } = useParams();

   useEffect(() => {
      dispatch(searchById(id));
   }, [dispatch, id]);

   return (
      <div className={style.card}>
         <NavBar />
         <h2 className={style.h2}>ID: {detail?.id}</h2>
         <h1 className={style.h1}>Pokemon: {detail?.nombre}</h1>
         <img className={style.img}src={detail?.imagen} alt={detail?.nombre || ''} />
         <h2 className={style.h2}>{'Habilidades del pokemon'}</h2>
         <h3 className={style.h3}>Vida: {detail?.vida}</h3>
         <h3 className={style.h3}>Poder de ataque: {detail?.ataque}</h3>
         <h3 className={style.h3}>Nivel de defensa: {detail?.defensa}</h3>
         <h3 className={style.h3}>Velocidad: {detail?.velocidad}</h3>
         <h3 className={style.h3}>Altura: {detail?.altura}</h3>
         <h3 className={style.h3}>Peso: {detail?.peso}</h3>
         <h3 className={style.h3}>Tipo: {detail?.tipo && detail.tipo.join(', ')}</h3>
         <Link to={'/home'}>
         <button>Back to Home</button>
         </Link>
      </div>
   )
};

import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllPokemons, searchByName } from '../../Redux/actions';
import style from './searchBar.module.css'

export const SearchBar = () => {

   const dispatch = useDispatch();

   const [toSearch, setToSearch] = useState('');

   const handleChange = (event) => {
      setToSearch(event.target.value)
   };

   const handleSearchByName = () => {
      if (toSearch) {
         dispatch(searchByName(toSearch))
      }
   };

   const handleClean = () => {
      dispatch(getAllPokemons());
      alert('Pantalla fresca y lista para explorar');
   };

   return (
      <div className={style.search}>
         <label className={style.label}>Busca un pokemon por nombre </label>
         <input className={style.input} onChange={handleChange} type="text" />
         <button className={style.button} onClick={handleSearchByName}>Search</button>
         <button className={style.button} onClick={handleClean}>Clean home</button>
      </div>
   )
};

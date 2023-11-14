import React, { useEffect, useState } from 'react'
import { Card } from '../Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons, getAllTypes, filterByType, filterByOrigin, sorting } from '../../Redux/actions';

export const Cards = () => {

   const dispatch = useDispatch();
   const pokemons = useSelector(state => state.pokemons);
   const tipos = useSelector(state => state.tipos);

   useEffect(() => {
      dispatch(getAllPokemons());
      dispatch(getAllTypes());
   }, [dispatch]);

   //*FILTRO POR TEMPERAMENTO.
   const [type, setType] = useState('');
   
   const handleChangeType = (event) => {
      if (event) {
         setType(event.target.value);
      }
   };
   
   const handleFilterByType = () => {
      if (type) {
         dispatch(filterByType(type))
      }
   };

   //*FILTRO POR ORIGEN.
   const [origin, setOrigin] = useState('');

   const handleChangeOrigin = (event) => {
      if (event) {
         setOrigin(event.target.value);
      }
   };

   const handleFilterByOrigin = () => {
      if (origin) {
         dispatch(filterByOrigin(origin));
      }
   };

   //*ORDENAMIENTOS.
   const [sort, setSort] = useState('');

   const handleChangeSorting = (event) => {
      if (event) {
         setSort(event.target.value)
      }
   };

   const handleSorting = () => {
      if (sort) {
         dispatch(sorting(sort))
      }
   };

   //*PAGINATION.

   const [currentPage, setCurrentPage] = useState(1);
   const pokemonsXpage = 12;

   const nextPage = () => {
      setCurrentPage(currentPage + 1);
   };

   const prevPage = () => {
      setCurrentPage(currentPage - 1);
   };

   const handleFirstPage = () => {
      setCurrentPage(1);
   };



   const indexOfLastPokemon = currentPage * pokemonsXpage;
   const indexOfFirstPokemon = indexOfLastPokemon - pokemonsXpage;
   const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

   return (
      <div>
         <div>
            <label htmlFor="">Current page = {currentPage} </label>
            <button onClick={prevPage} disabled={currentPage===1}>Prev</button>
            <button onClick={nextPage} disabled={indexOfLastPokemon >= pokemons.length}>Next</button>
            <button onClick={handleFirstPage} disabled={currentPage === 1}>Ir a la página 1</button>
         </div>
         <div>
            <h2>Filtros</h2>
            <label htmlFor="">Filtrar pokemons por tipo: </label>
            <select name="" id="" onChange={handleChangeType}>
               <option value="">Despliega y selecciona un temperamento</option>
                     {tipos.map((tip) => (
                              <option key={tip.id} value={tip.name} >
                                 {tip.name}
                              </option>
                     ))}
               </select>
            <button onClick={handleFilterByType}>Filtrar</button>
            <br />
            <label htmlFor="">Filtrar pokemons por origen: </label>
            <select name="" id="" onChange={handleChangeOrigin}>
               <option value="">Despliega y selecciona un origen</option>
               <option value="API">API</option>
               <option value="DB">Base de datos</option>
            </select>
            <button onClick={handleFilterByOrigin}>Filtrar</button>
            
            <h2>Ordenamientos</h2>
            <label htmlFor="">Ordenar alfabéticamente: </label>
            <select name="" id="" onChange={handleChangeSorting}>
               <option value="">Selecciona el orden según tu preferencia</option>
               <option value="AscABC">ASC</option>
               <option value="DescABC">DESC</option>
            </select>
            <button onClick={handleSorting}>Ordenar</button>
            <br />
            <label htmlFor="">Ordenar por capacidad de ataque: </label>
            <select name="" id="" onChange={handleChangeSorting}>
               <option value="">Selecciona el orden de ataque</option>
               <option value="AscAtq">De menor a mayor</option>
               <option value="DescAtq">De mayor a menor</option>
            </select>
            <button onClick={handleSorting}>Ordenar</button>
         </div>
         <div>
            {
               currentPokemons.map((pokemon) => {
                  return (
                     <Card
                        key={pokemon.id}
                        id={pokemon.id}
                        imagen={pokemon.imagen}
                        nombre={pokemon.nombre}
                        tipo={pokemon.tipo}
                     />
                  );
               })
            }
         </div>
      </div>
   )
};

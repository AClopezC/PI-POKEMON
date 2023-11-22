import React, { useEffect, useState } from 'react';
import { Card } from '../Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllPokemons,
  getAllTypes,
  filterByType,
  filterByOrigin,
  sorting,
  cleanDetail,
} from '../../Redux/actions';
import style from './cards.module.css';

export const Cards = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const tipos = useSelector((state) => state.tipos);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        await dispatch(getAllPokemons());
        await dispatch(getAllTypes());
      } catch (error) {
        // Manejo de errores
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => dispatch(cleanDetail());
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
      dispatch(filterByType(type));
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
      setSort(event.target.value);
    }
  };

  const handleSorting = () => {
    if (sort) {
      dispatch(sorting(sort));
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
  const currentPokemons = pokemons ? pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon) : [];

  return (
    <div className={style.page}>
      <div>
        <label className={style.label} htmlFor="">
          Current page = {currentPage}{' '}
        </label>
        <button className={style.button} onClick={prevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <button className={style.button} onClick={nextPage} disabled={indexOfLastPokemon >= pokemons.length}>
          Next
        </button>
        <button className={style.button} onClick={handleFirstPage} disabled={currentPage === 1}>
          Ir a la página 1
        </button>
      </div>
      <div>
        <h2>Filtros</h2>
        <label className={style.label} htmlFor="">
          Filtrar pokemons por tipo:{' '}
        </label>
        <select className={style.select} name="" id="" onChange={handleChangeType}>
          <option value="">Despliega y selecciona un temperamento</option>
          {tipos.map((tip) => (
            <option key={tip.id} value={tip.name}>
              {tip.name}
            </option>
          ))}
        </select>
        <button className={style.button} onClick={handleFilterByType}>
          Filtrar
        </button>
        <br />
        <label className={style.label} htmlFor="">
          Filtrar pokemons por origen:{' '}
        </label>
        <select className={style.select} name="" id="" onChange={handleChangeOrigin}>
          <option value="">Despliega y selecciona un origen</option>
          <option value="API">API</option>
          <option value="DB">Base de datos</option>
        </select>
        <button className={style.button} onClick={handleFilterByOrigin}>
          Filtrar
        </button>

        <h2>Ordenamientos</h2>
        <label className={style.label} htmlFor="">
          Ordenar alfabéticamente:{' '}
        </label>
        <select className={style.select} name="" id="" onChange={handleChangeSorting}>
          <option value="">Selecciona el orden según tu preferencia</option>
          <option value="AscABC">ASC</option>
          <option value="DescABC">DESC</option>
        </select>
        <button className={style.button} onClick={handleSorting}>
          Ordenar
        </button>
        <br />
        <label className={style.label} htmlFor="">
          Ordenar por capacidad de ataque:{' '}
        </label>
        <select className={style.select} name="" id="" onChange={handleChangeSorting}>
          <option value="">Selecciona el orden de ataque</option>
          <option value="AscAtq">De menor a mayor</option>
          <option value="DescAtq">De mayor a menor</option>
        </select>
        <button className={style.button} onClick={handleSorting}>
          Ordenar
        </button>
      </div>
      <div className={style.cards}>
        {isLoading && <div>Cargando...</div>}
        {!isLoading &&
          currentPokemons &&
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
          })}
      </div>
    </div>
  );
};

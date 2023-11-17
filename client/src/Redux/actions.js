import axios from 'axios';
import {
   GET_ALL_POKEMONS,
   SEARCH_BY_NAME,
   SEARCH_BY_ID,
   GET_ALL_TYPES,
   FILTER_BY_TYPE,
   FILTER_BY_ORIGIN,
   SORTING,
   CREATE_POKEMON,
   CLEAN_DETAIL
} from './actionTypes.js'



export const getAllPokemons = () => {
   return async (dispatch) => {
      try {
         const { data } = await axios.get('http://localhost:3001/pokemons');
         return dispatch({type: GET_ALL_POKEMONS, payload: data})
      } catch (error) {
         throw new Error(error.message)
      }
   }
};

export const searchByName = (name) => {
   return async (dispatch) => {
      try {
         const { data } = await axios.get(`http://localhost:3001/name?name=${name}`);
         return dispatch({type: SEARCH_BY_NAME, payload: data})
      } catch (error) {
         throw new Error(error.message)
      }
   }
};

export const searchById = (id) => {
   return async (dispatch) => {
      try {
         const { data } = await axios.get(`http://localhost:3001/pokemons/${id}`);
         return dispatch({type: SEARCH_BY_ID, payload: data})
      } catch (error) {
         throw new Error(error.message)
      }
   }
};

export const getAllTypes = () => {
   return async (dispatch) => {
      try {
         const { data } = await axios.get('http://localhost:3001/types');
         return dispatch({ type: GET_ALL_TYPES, payload: data })
      } catch (error) {
         throw new Error(error.message)
      }
   }
};

export const filterByType = (type) => {
   return async (dispatch) => {
      try {
         const { payload: allPokemons } = await dispatch(getAllPokemons());
         const data = allPokemons.filter((pokemon) => pokemon.tipo.includes(type))
         return dispatch({ type: FILTER_BY_TYPE, payload: data })
      } catch (error) {
         throw new Error(error.message)
      }
   }
};

export const filterByOrigin = (origin) => {
   return async (dispatch) => {
      try {
         const { payload: allPokemons } = await dispatch(getAllPokemons());
         let data;
         if (origin === 'API') {
            data = allPokemons.filter(pokemon => typeof pokemon.id === 'number');
         }
         else {
            data = allPokemons.filter(pokemon => typeof pokemon.id === 'string');
         }
         if (data.length > 0) {
            return dispatch({ type: FILTER_BY_ORIGIN, payload: data })
         }
         else {
            return window.alert('No se encontró ningún elemento')
         }
      } catch (error) {
         throw new Error(error.message)
      }
   }
};

export const sorting = (sort) => {
   return async (dispatch) => {
      try {
         const { payload: allPokemons } = await dispatch(getAllPokemons());
         let data;
         switch (sort) {
            case 'AscABC':
               data = [...allPokemons].sort((a, b) => a.nombre.localeCompare(b.nombre));
               break;
            case 'DescABC':
               data = [...allPokemons].sort((a, b) => b.nombre.localeCompare(a.nombre));
               break;
            case 'AscAtq':
               data = [...allPokemons].sort((a, b) => a.ataque - b.ataque);
               break;
            case 'DescAtq':
               data = [...allPokemons].sort((a, b) => b.ataque - a.ataque);
               break;
            default:
               data = allPokemons;
         }
         return dispatch({ type: SORTING, payload: data })
 
      } catch (error) {
         throw new Error(error.message)
      }
   }
};

export const createPokemon = (state) => {
   return async (dispatch) => {
      try {
         const { data } = await axios.post('http://localhost:3001/create', state);
         return dispatch({ type: CREATE_POKEMON, payload: data })
      } catch (error) {
         console.log(error);
         throw new Error(error.message)
      }
   }
};

export const cleanDetail = () => {
   return { type: CLEAN_DETAIL }
};
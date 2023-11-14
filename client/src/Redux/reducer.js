import {
   GET_ALL_POKEMONS,
   SEARCH_BY_ID,
   SEARCH_BY_NAME,
   GET_ALL_TYPES,
   FILTER_BY_TYPE,
   FILTER_BY_ORIGIN,
   SORTING,
} from './actionTypes';


const initialState = {
   pokemons: [],
   pokemonsDetail: {},
   tipos: []
}

export default function reducer(state = initialState, { type, payload }) {
   switch (type) {
      case GET_ALL_POKEMONS:
         return {
            ...state,
            pokemons: payload
         };
      case SEARCH_BY_NAME:
         return {
            ...state,
            pokemons: payload
         };
      case SEARCH_BY_ID:
         return {
            ...state,
            pokemonsDetail: payload
         };
      case GET_ALL_TYPES:
         return {
            ...state,
            tipos: payload
         };
      case FILTER_BY_TYPE:
         return {
            ...state,
            pokemons: payload
         };
      case FILTER_BY_ORIGIN:
         return {
            ...state,
            pokemons: payload
         };
      case SORTING:
         return {
            ...state,
            pokemons: payload
         };
      default:
         return {
            ...state
         }
   }
}
const { Router } = require('express');
const {
   getPokemonsHandler,
   getPokemonsByIdHandler,
   getPokemonsByNameHandler,
} = require('../handlers/getHandler');
const {
   postPokemonHandler
} = require('../handlers/postHandler');

const pokemonRouter = Router();

pokemonRouter.get('/pokemons', getPokemonsHandler);
pokemonRouter.get('/pokemons/:id', getPokemonsByIdHandler);
pokemonRouter.get('/name', getPokemonsByNameHandler);

pokemonRouter.post('/create', postPokemonHandler)



module.exports = pokemonRouter;
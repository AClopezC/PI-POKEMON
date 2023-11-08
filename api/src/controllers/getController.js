const axios = require('axios');
const { Pokemon, Type } = require('../db');
const api = 'https://pokeapi.co/api/v2/pokemon';

const getApiPokemons = async () => {
   try {
      let pokemonsApiA = [];
      let nextUrl = api;

      do {
         const response = await axios.get(nextUrl);
         const pokemonsData = response.data.results;
         
         const pokemonsApi = pokemonsData.map(async (obj) => {
            const pokemonResponse = await axios.get(obj.url);
            const pokemonData = pokemonResponse.data;
            return {
               id: pokemonData.id,
               nombre: pokemonData.name,
               imagen: pokemonData.sprites.other.home.front_default,
               vida: pokemonData.stats.find((stat) => stat.stat.name === 'hp')?.base_stat || 0,
               ataque: pokemonData.stats.find((stat) => stat.stat.name === 'attack')?.base_stat || 0,
               defensa: pokemonData.stats.find((stat) => stat.stat.name === 'defense')?.base_stat || 0,
               velocidad: pokemonData.stats.find((stat) => stat.stat.name === 'speed')?.base_stat || 0,
               altura: pokemonData.height,
               peso: pokemonData.weight,
               tipo: pokemonData.types.map((t) => t.type.name)
            };
         });
         pokemonsApiA.push(...await Promise.all(pokemonsApi));
         nextUrl = response.data.next;
      }
      while (nextUrl && pokemonsApiA.length < 120);
      return pokemonsApiA;
      
   } catch (error) {
      throw new Error('Error en getApiPokemons');
   }
};

const getDbPokemons = async () => {
   try {
      const pokemonsFound = await Pokemon.findAll({include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },});
      const pokemonsDb = pokemonsFound.map((pokemon) => {
         return {
            id: pokemon.id,
            nombre: pokemon.name,
            imagen: pokemon.imagen,
            vida: pokemon.vida,
            ataque: pokemon.ataque,
            defensa: pokemon.defensa,
            velocidad: pokemon.velocidad,
            altura: pokemon.altura,
            peso: pokemon.peso,
            tipo: pokemon.Types.map((typ)=>typ.name)
         };
      });
      return pokemonsDb;
   } catch (error) {
      throw new Error('Error en getDbPokemons ' + error.message);
   }
   
};

const getAllPokemons = async () => {
   try {
      const pokemonsApi = await getApiPokemons();
      const pokemonsDb = await getDbPokemons();
      const allPokemons = [...pokemonsApi, ...pokemonsDb];

      return allPokemons;
   } catch (error) {
      throw new Error('Error en getAllPokemons ' + error.message);
   }
};

const getPokemonById = async (id) => {
   try {
      const pokemons = await getAllPokemons();
      const pokemonFound = await pokemons.find((pokemon) => pokemon.id == id);
      if (pokemonFound) {
         return pokemonFound;
      }
      else {
         return `Pokemon by id ${id} was not found`
      }
   } catch (error) {
      throw new Error('Error en getPokemonsById')
   }
};

const getPokemonsByName = async (name) => {
   try {
      const receivedName = name.toLowerCase() 
      const pokemons = await getAllPokemons();
      const pokemonsFound = pokemons.filter((pokemon) => pokemon.nombre.toLowerCase().includes(receivedName));
      if (pokemonsFound.length > 0) {
         return pokemonsFound;
      }
      else {
         return `Pokemon by name ${name} was not found`
      }
   } catch (error) {
      throw new Error('Error en getPokemonsByName')
   }
};

const getTypes = async () => {
   try {
      const typesDbFirst = await Type.findAll();

      if (typesDbFirst.length > 0) {
         return typesDbFirst
      }
      else {
         const pokemons = await getAllPokemons();
         const typesFromApi = Array.from(new Set(pokemons.flatMap((pokemon)=> pokemon.tipo)));
         //? flatMap() =>  permite sacar todos los datos a un solo array plano.
         //? new Set() => crea un nuevo array sin duplicados.
         //? Array.from() => convierte el conjunto que sale de las anteriores operaciones a un array.
         
         const typesFinal = await Type.bulkCreate(typesFromApi.map((tipo) => ({ name: tipo })));

         return typesFinal
      }

   } catch (error) {
      throw new Error('Error en getTypes')
   }
}



module.exports = {
   getAllPokemons,
   getPokemonById,
   getPokemonsByName,
   getTypes
}
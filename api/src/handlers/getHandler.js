const {
   getAllPokemons,
   getPokemonById,
   getPokemonsByName,
   getTypes
} = require('../controllers/getController');


const getPokemonsHandler = async (req, res) => {
   try {
      const pokemons = await getAllPokemons();
      return res.status(200).json(pokemons)
   } catch (error) {
      return res.status(500).json({error: error.message})
   }
};

const getPokemonsByIdHandler = async (req, res) => {
   try {
      const { id } = req.params;
      if (id) {
         const pokemonFound = await getPokemonById(id);
         return res.status(200).json(pokemonFound);
      }
      else {
         return res.status(404).json('Please provide a valid ID')
      }
   } catch (error) {
      return res.status(500).json({error: error.message})
   }
};

const getPokemonsByNameHandler = async (req, res) => {
   try {
      const { name } = req.query;
      if (!name) {
         return res.status(404).json('Please provide a valid name')
      }
      else {
         const pokemonsFound = await getPokemonsByName(name);
         if (!pokemonsFound) {
            return res.status(404).json({ error: `Pokemon by the name ${name} wasnt found` })
         }
         return res.status(200).json(pokemonsFound)
      }
      
   } catch (error) {
      return res.status(500).json({ error: error.message })
   }
};

const getTypesHandler = async (req, res) => {
   try {
      const types = await getTypes();
      return res.status(200).json(types);
   } catch (error) {
      return res.status(500).json({error: error.message})
   }
}





module.exports = {
   getPokemonsHandler,
   getPokemonsByIdHandler,
   getPokemonsByNameHandler,
   getTypesHandler
};
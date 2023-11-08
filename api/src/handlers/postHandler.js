const { postPokemon } = require('../controllers/postController');

const postPokemonHandler = async (req, res) => {
   try {
      const {nombre, imagen, vida, ataque, defensa, velocidad, altura, peso, tipo} = req.body;
      if (!nombre || !imagen || !vida || !ataque || !defensa || !velocidad || !altura || !peso || !tipo) {
         return res.status(404).json({ error: 'Please provide the complete information' });
      }
      else {
         const createPokemon = await postPokemon(nombre, imagen, vida, ataque, defensa, velocidad, altura, peso, tipo);
         return res.status(201).json(createPokemon);
      }
   } catch (error) {
      return res.status(500).json({error: error.message})
   }
};

module.exports = {
   postPokemonHandler
}
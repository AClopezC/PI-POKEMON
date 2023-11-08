const { Pokemon, Type } = require('../db');

const postPokemon = async (nombre, imagen, vida, ataque, defensa, velocidad, altura, peso, tipo) => {
   try {
      const tiposRecibidos = tipo.map(async (tipoNombre) => {
         const tipoExists = await Type.findOne({
            where: { name: tipoNombre }
         });

         if (!tipoExists) {
            throw new Error(`El tipo ${tipoNombre} no existe en la base de datos, seleccione un tipo de pokemon válido`);
         }
         return tipoExists;
      });
         const tiposObtenidos = await Promise.all(tiposRecibidos);
      
         const [pokemon, created] = await Pokemon.findOrCreate({
            where: { nombre: nombre },
            defaults: {
               nombre: nombre,
               imagen: imagen,
               vida: vida,
               ataque: ataque,
               defensa: defensa,
               velocidad: velocidad,
               altura: altura,
               peso: peso,
            }
         });
         if (created) {
            await pokemon.addType(tiposObtenidos);
            return { pokemon, tipo: tipo, message: '¡Pokemon creado con éxito!' };
         } else {
            return { message: `El pokemon ${nombre} ya existe en la base de datos, elije otro nombre` }
         }

   } catch (error) {
      throw new Error('Error en el postPokemon: ' + error.message);
   }
};

module.exports = {
   postPokemon
}


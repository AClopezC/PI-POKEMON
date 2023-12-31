const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const pokemonRouter = require('./pokemonRouter');
const typesRouter = require('./typesRouter');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/', pokemonRouter);
router.use('/types', typesRouter);


module.exports = router;

//? shift + alt y barra arriba o abajo para duplicar una línea.
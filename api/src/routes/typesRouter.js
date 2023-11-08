const { Router } = require('express');
const {getTypesHandler} = require('../handlers/getHandler');

const typesRouter = Router();

typesRouter.use('/', getTypesHandler);


module.exports = typesRouter;








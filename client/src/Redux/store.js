import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer'; //? Si está exportado por default, no debo hacer destructuring.
import thunkMiddleware from 'redux-thunk';

const composeEnhacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //? Esta línea es para conectar con la extensión del navegador => Redux devtools.

const store = createStore(
   reducer,
   composeEnhacer(applyMiddleware(thunkMiddleware)) //? Esta línea es para hacer peticiones a un server.
)

export default store;

//? Middleware => Intermediario entre cliente y servidor. lo que permite es hacer operaciones asíncronas, en nuestro caso las peticiones a la api. 

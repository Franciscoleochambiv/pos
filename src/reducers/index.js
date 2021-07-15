import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer'; 
import postReducer from './postReducer'; 
import shopingfileReducer from "./shopingfileReducer.js";

import categoriafileReducer from "./categoriafileReducer.js";
import tipofileReducer from "./tipofileReducer.js";
import seriefileReducer from "./seriefileReducer.js";
import umedidafileReducer from "./umedidafileReducer.js";
import almacenfileReducer from "./almacenfileReducer.js";
import clientefileReducer from "./clientefileReducer.js";

import articulofileReducer from "./articulofileReducer.js";

import lineafileReducer from "./lineafileReducer.js";

import ventafileReducer from "./ventafileReducer.js";
import sunatfileReducer from "./sunatfileReducer.js";
import dnifileReducer from "./dnifileReducer.js";
import ndocufileReducer from "./ndocufileReducer.js";
import ventaseriefileReducer from "./ventaseriefileReducer.js";

import productofileReducer from "./productofileReducer.js";
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer,
  shopingfile:shopingfileReducer,
  categoriafile: categoriafileReducer,
  tipofile: tipofileReducer,
  seriefile: seriefileReducer,
  umedidafile: umedidafileReducer,
  lineafile: lineafileReducer,
  almacenfile: almacenfileReducer,
  clientefile: clientefileReducer,
  articulofile: articulofileReducer,
  productofile: productofileReducer,
  sunatfile: sunatfileReducer,
  dnifile: dnifileReducer,
  ndocufile:ndocufileReducer,
  cartItem:ventafileReducer,
  ventaserie:ventaseriefileReducer,


});

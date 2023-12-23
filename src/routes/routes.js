const express = require('express');
const listarProdutos = require('../controllers/listarProdutos');
const cadastrarProd = require('../controllers/cadastrarProd');
const routes = express();

routes.get('/produtos', listarProdutos);
routes.post('/cadastrarProduto', cadastrarProd);

module.exports = routes;
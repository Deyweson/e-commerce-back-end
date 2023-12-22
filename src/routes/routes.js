const express = require('express');
const listarProdutos = require('../controllers/listarProdutos');
const routes = express();

routes.get('/produtos', listarProdutos);

module.exports = routes;
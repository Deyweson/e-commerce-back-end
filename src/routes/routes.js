const express = require('express');
const listarProdutos = require('../controllers/public/listarProdutos');
const cadastrarProd = require('../controllers/private/cadastrarProd');
const login = require('../controllers/private/login');
const autenticador = require('../../src/middleware/autenticador');
const editarProd = require('../controllers/private/editarProd');
const removerProd = require('../controllers/private/removerProd');
const routes = express();

routes.get('/produtos', listarProdutos);


routes.post('/login', login);
routes.use(autenticador);
routes.post('/cadastrarProduto', cadastrarProd);
routes.put('/editarProduto', editarProd);
routes.delete('/removerProduto/:id', removerProd)


module.exports = routes;
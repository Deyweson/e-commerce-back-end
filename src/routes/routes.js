const express = require('express');

const { listarProdutos, pesquisarProduto } = require('../controllers/public/buscarProdutos');

const login = require('../controllers/private/login');
const { cadastrarProd, editarProd, produtos, removerProd } = require('../../src/controllers/private/gerenciadorProdutos')
const autenticador = require('../../src/middleware/autenticador');

const routes = express();

routes.get('/produtos', listarProdutos);
routes.get('/pesquisarProdutos', pesquisarProduto);

routes.post('/login', login);
routes.use(autenticador);
routes.get('/listarProdutos', produtos)
routes.post('/cadastrarProduto', cadastrarProd);
routes.put('/editarProduto', editarProd);
routes.delete('/removerProduto/:id', removerProd)


module.exports = routes;
const pool = require('../../config/conexaoDB');

const listarProdutos = async (request, response) => {
    const query = 'select nome_produto, valor, descricao from produtos where em_estoque = true';

    const produtos = await pool.query(query);

    return response.status(200).json(produtos.rows);
};

module.exports = listarProdutos;
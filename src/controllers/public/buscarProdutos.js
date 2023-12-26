const pool = require('../../config/conexaoDB');

const listarProdutos = async (request, response) => {
    const query = 'select nome_produto, valor, descricao from produtos where em_estoque = true';

    const produtos = await pool.query(query);

    return response.status(200).json(produtos.rows);
};

const pesquisarProduto = async (request, response) => {
    const { busca } = request.query

    const query = `
        select nome_produto, valor, descricao 
        from produtos 
        where nome_produto like '%$1%'
        or descricao like '%$2%';
    `;
    
    const produtos = await pool.query(query.replace('$1',busca).replace('$2',busca));
    
    return response.status(200).json(produtos.rows);
};

module.exports = {
    listarProdutos,
    pesquisarProduto
};
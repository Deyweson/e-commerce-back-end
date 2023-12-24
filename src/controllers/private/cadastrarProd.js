const pool = require('../../config/conexaoDB');

const cadastrarProd = async (request, response) => {
    const { nome_produto, valor, descricao, em_estoque } = request.body;

    const query = (`
        insert into produtos
        (nome_produto, valor, descricao, em_estoque)
        values
        ($1,$2,$3,$4) returning *
    `);

    const values = [nome_produto, valor, descricao, em_estoque];

    const novoProduto = await pool.query(query, values);

    return response.status(200).json({
        mensagem: "produto cadastrado com sucesso", 
        produto: novoProduto.rows
    });
};

module.exports = cadastrarProd;
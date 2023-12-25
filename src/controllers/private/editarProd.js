const pool = require('../../../src/config/conexaoDB');

const editarProd = async (request, response) => {
    const { id, nome_produto, valor, descricao, em_estoque } = request.body

    const produto = await pool.query('select * from produtos where id = $1', [id])

    if(produto === undefined){
        return response.status(404).json({mensagem: "produto não encontrado!"});
    }

    const query = `
        update produtos 
        set (nome_produto, valor, descricao, em_estoque)
        = ($1,$2,$3,$4)
        where id = $5
        returning *
    `;
    const values = [nome_produto, valor, descricao, em_estoque, id]
    const atualizar = await pool.query(query, values)

    return response.json(atualizar.rows[0])
};

module.exports = editarProd;
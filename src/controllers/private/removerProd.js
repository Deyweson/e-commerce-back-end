const pool = require('../../../src/config/conexaoDB');

const removerProd = async (request, response) => {
    const { id } = request.params;

    const produto = await pool.query('select * from produtos where id = $1',[id]);

    if(produto === undefined){
        return response.status(404).json({mensagem: 'Produto não encontrado!'});
    };

    const query = `
        delete from produtos
        where id = $1
        returning *
    `;
    const values = [id];

    const remover = await pool.query(query, values);

    return response.status(200).json({mensagem: 'Produto removido com sucesso!'});
};

module.exports = removerProd;
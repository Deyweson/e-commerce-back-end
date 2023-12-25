const pool = require('../../config/conexaoDB');

const produtos = async (request, response) => {
    const query = 'select * from produtos order by id asc';

    const produtos = await pool.query(query);

    return response.status(200).json(produtos.rows);
};

module.exports = produtos;
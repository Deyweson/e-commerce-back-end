const pool = require('../../../src/config/conexaoDB')

const buscarProduto = async (id) => {
    return await pool.query('select * from produtos where id = $1',[id]);
}

const produtos = async (request, response) => {
    const query = 'select * from produtos order by id asc';

    const produtos = await pool.query(query);

    return response.status(200).json(produtos.rows);
};

const cadastrarProd = async (request, response) => {
    const { nome_produto, valor, descricao, em_estoque } = request.body;

		const podeCasdastrar = await pool.query('select qtd, qtdmax from loja_info')
		
		if(podeCasdastrar.rows[0].qtd >= podeCasdastrar.rows[0].qtdmax){
			return response.status(404).json({mensagem: 'Limite de cadastro de produtos exedido!'})
		}

    const query = (`
        insert into produtos
        (nome_produto, valor, descricao, em_estoque)
        values
        ($1,$2,$3,$4) returning *
    `);

    const values = [nome_produto, valor, descricao, em_estoque];

    const novoProduto = await pool.query(query, values);
		const atualizarQTD = await pool.query(
			`update loja_info set qtd = $1`, [podeCasdastrar.rows[0].qtd+1]);

    return response.status(200).json({
        mensagem: "produto cadastrado com sucesso", 
        produto: novoProduto.rows[0]
    });
};

const editarProd = async (request, response) => {
    const { id, nome_produto, valor, descricao, em_estoque } = request.body;

    const produto = buscarProduto(id);

    if(produto === undefined){
        return response.status(404).json({mensagem: "produto não encontrado!"});
    };

    const query = `
        update produtos 
        set (nome_produto, valor, descricao, em_estoque)
        = ($1,$2,$3,$4)
        where id = $5
        returning *
    `;
    const values = [nome_produto, valor, descricao, em_estoque, id];
    const atualizar = await pool.query(query, values);

    return response.json(atualizar.rows[0]);
};

const removerProd = async (request, response) => {
    const { id } = request.params;

    const produto = buscarProduto(id);

    if(produto === undefined){
        return response.status(404).json({mensagem: 'Produto não encontrado!'});
    };

    const query = `
        delete from produtos
        where id = $1
        returning *
    `;
    const values = [id];

    await pool.query(query, values);

		const qtd = await pool.query('select qtd from loja_info')
		const atulizarQTD = await pool.query(`update loja_info set qtd = $1`, [qtd.rows[0].qtd-1])


    return response.status(200).json({mensagem: 'Produto removido com sucesso!'});
};

module.exports = {
    removerProd,
    produtos,
    editarProd,
    cadastrarProd
};
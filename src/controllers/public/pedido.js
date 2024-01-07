const { text } = require('express');
const pool = require('../../config/conexaoDB');

const pedido = async (request, response) => {
  const { itens } = request.body;

  let texto = '';
  let valorTotal = 0;

  for (let i = 0; i < itens.length; i++) {
    const item = await pool.query(
      'select nome_produto, valor from produtos where id = $1',
      [itens[i]]
    )
    texto += '%0A' + `${item.rows[0].nome_produto}%20---%20R$${item.rows[0].valor / 100}`
    valorTotal += item.rows[0].valor
  };

  const mensagem = 'Ola%20gostaria%20de%20efetuar%20o%20seguinte%20pedido:%0A'

  texto = texto + `%0A-----%0AValor%20total:%20R$${valorTotal / 100}`

  while (texto.includes(' ')) {
    texto = texto.replace(' ', '%20')
  }

  const numero = await pool.query('select whatsapp from loja_info')

  texto = `https://wa.me/55${numero.rows[0].whatsapp}?text=` + mensagem + texto

  return response.json(texto);
};
module.exports = pedido;
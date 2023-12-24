const jwt = require('jsonwebtoken');
const senhaJWT = process.env.JWTPASS;
const pool = require('../../src/config/conexaoDB');

const autenticador = async (request, response, next) => {
    const { authorization } = request.headers;
    if (!authorization) {
        return response.status(401).json({ mensagem: 'Não autorizado!' });
    };

    const token = authorization.split(' ')[1]
    
    try {
        const { id } = jwt.verify(token, senhaJWT);
        
        const { rowCount } = await pool.query('select * from loja_info where id = $1', [id])

        if (rowCount < 0) {
            return response.status(401).json({ mensagem: 'Necessário um token valido para acessar!' });
        };
 
        next()
    } catch (error) {
        return response.json(error)
    }
};

module.exports = autenticador;
const jwt = require('jsonwebtoken');
const pool = require('../../config/conexaoDB');
const jwtPass = process.env.JWTPASS;


const login = async (request, response) => {
    const { usuario, senha } = request.body;

    const query = 'select usuario, senha from loja_info where usuario = $1 and senha = $2;'
    const where = [usuario, senha]

    const user = await pool.query(query, where);
    if(user.rowCount < 1){
        return response.status(400).json({mensagem: 'Usuário e/ou senha inválido(s)'});
    };

    const senhaJWT = process.env.JWTPASS
    const token = jwt.sign({id: 1}, senhaJWT,{expiresIn: '10h'});


    response.status(200).json({usuario, token});
};

module.exports = login;
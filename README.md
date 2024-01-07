# API PedeAQUi
## Descrição
### Objetivos
Api para uma loja, poder exibir seus produtos para seus clientes, permitindo realizar pedidos via whatsapp, realizando uma mensagem dinamica com varios itens no pedido. Permite a loja poder criar novos produtos, atualizar e remover seus produtos.

Inicialmente criada para utilização de apenas uma loja, futuramente penso em fazer implementações para poder ser utilizada por multiplas lojas

### Tecnologias utilizadas
- nodejs
- postgresql
- Jason Web Token
- Express

## Testando online

Permitido o teste por qualquer pessoa, os produtos são limitados a 15 itens para não sobrecarregar o banco de dados.

### Informações para login
 - usuario: teste
 - senha : 123



## Pré-requisitos para testar localmente

Certifique-se de que você possui os seguintes pré-requisitos instalados em seu sistema:

- Node.js: Acesse o site oficial (__https://nodejs.org/__) para baixar e instalar a versão LTS (Long Term Support) mais recente do Node.js.

- PostgreSQL: Instale o servidor PostgreSQL em seu sistema ou utilize um servidor remoto. Lembre-se de anotar as credenciais de acesso ao banco de dados (host, usuário, senha, nome do banco de dados, porta do banco de dados) para a configuração posterior.

## Clonar o repositório

Clone o repositório do projeto para o seu ambiente local. Você pode usar o comando git clone no terminal.

``` bash
git clone https://github.com/Deyweson/pede-aqui-back-end.git
```

## Instalar as dependências

Navegue até o diretório do projeto no terminal e instale as dependências. Use o seguinte comando:

``` bash
npm install
```
### Lista das dependencias
``` JS
	"bcrypt": "",
    "dotenv": "",
    "express": "",
    "jsonwebtoken": "",
    "pg": ""
```

Isso instalará todas as dependências necessárias para executar o projeto.

## Configuração do Banco de Dados

Certifique-se de incluir o host, usuário, senha e nome do seu banco de dados ao arquivo ```.env-exemplo```. Exemplo:

``` bash
DB_HOST = host
DB_USER = seu_usuario
DB_PASS = sua_senha
DB_NAME = nome_do_banco_de_dados
PORTDB = porta_do_banco_de_dados
```

Para criação das tabela utilizar as informações do arquivo dump.sql

## Inicialização do Servidor

Agora, você pode iniciar o servidor para testar a API com o seguinte comando:

``` bash
npm start
```

# Documentação API

## Endpoints Publicos

### Listar Produtos

Endpoint destinado a listar os produtos publicamente, todos os produtos que estiverem com o valor true no campo em_estoque serão exibidos, caso contrario eles não serão exibidos

	POST /produtos

#### Endpoint:

	https://pede-aqui.cyclic.app/produtos


#### Retorno:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `nome_produto` | `string`| Nome do produto |
| `valor` | `int`| Valor do produto |
| `descricao` | `string`| Descrição do produto |


### Buscar Produtos
Endpoint destinado a buscar produtos utilizando um trecho de texto passado no query da url de requisição, 

	POST /pesquisarProdutos?busca=

#### Endpoint:

	https://pede-aqui.cyclic.app/pesquisarProdutos?buscar=


#### Retorno:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `nome_produto` | `string`| Nome do produto |
| `valor` | `int`| Valor do produto |
| `descricao` | `string`| Descrição do produto |


### Realizar Pedido

Endpoint destinado a realizar um pedido via whatsapp, a requisição pode ser feita com apenas um id no itens ou com um array de ids, assim gerando um link que leva ao whatsapp para envio do pedido

	POST /pedido

#### Endpoint:

	https://pede-aqui.cyclic.app/pedido

#### Corpo da requisição:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `id_loja` | `int`| Id da loja dos produtos |
| `itens` | `int`| Id dos produtos do pedido |

#### Retorno:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `link` | `string`| Link do pedido no Whatsapp |




## Endpoints Privados



### Login

Rota destinada para login da loja, que retorna um token para autorizar o cadastro, vizualização, atualização e remoção dos produtos

	POST /login
	


#### Endpoint:

	https://pede-aqui.cyclic.app/login

#### Corpo da requisição:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `usuario` | `string` | Nome do usuario para realizar o login |
| `senha` | `string`| Senha do usuario para realizar o login |
#### Retorno:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `usuario` | `string` | Usuario que fez o login |
| `token` | `string`| Token para utilizar na autenticação do usuario |



### Listar Produtos

Endpoint destinado para vizualização dos produtos pelo administrador da loja, com informações a mais do que o endpoint publico

	POST /listarProdutos

#### Endpoint:

	https://pede-aqui.cyclic.app/listarProdutos

#### Retorno:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `id` | `int` | Id do produto |
| `nome_produto` | `string`| Nome do produto |
| `valor` | `int`| Valor do produto |
| `descricao` | `string`| Descrição do produto |
| `em_estoque` | `boolean`| Se o produto está em estoque |


### Cadastrar Produto

Endpoint destinado ao cadastro de produtos, inserindo o nome, valor descrição e se o produto está em estoque

	POST /cadastrarProduto

#### Endpoint:

	https://pede-aqui.cyclic.app/cadastrarProduto

#### Corpo da requisição:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `nome_produto` | `string`| Nome do produto |
| `valor` | `int`| Valor do produto |
| `descricao` | `string`| Descrição do produto |
| `em_estoque` | `boolean`| Se o produto está em estoque |
#### Retorno:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `mensagem` | `string` | Mensagem que o produto foi cadastrado com sucesso |
| `id` | `int` | Id do produto |
| `nome_produto` | `string`| Nome do produto |
| `valor` | `int`| Valor do produto |
| `descricao` | `string`| Descrição do produto |
| `em_estoque` | `boolean`| Se o produto está em estoque |



### Editar Produto

Endpoint destinado a atualização do produto.

	POST /editarProduto

#### Endpoint:

	https://pede-aqui.cyclic.app/editarProduto

#### Corpo da requisição:
| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `id` | `int` | Id do produto a ser atualizado |
| `nome_produto` | `string`| Novo nome para o produto |
| `valor` | `int`| Novo valor para o produto |
| `descricao` | `string`| Nova descrição para o produto |
| `em_estoque` | `boolean`| Novo status do produto se está em estoque |
#### Retorno:
| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `id` | `int` | Id do produto |
| `nome_produto` | `string`| Nome do produto |
| `valor` | `int`| Valor do produto |
| `descricao` | `string`| Descrição do produto |
| `em_estoque` | `boolean`| Se o produto está em estoque |


### Remover Produto

Endpoint destinado a remover produto da loja. É passado o id do produto que sera removido no parametro da url

	POST /removerProduto/:id

#### Endpoint:

	https://pede-aqui.cyclic.app/removerProduto/:id

#### Retorno:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `mensagem` | `string`|	Mensagem que o produto foi removido com sucesso |




create table produtos(
    id serial primary key,
    nome_produto varchar (255) not null,
    valor int not null,
    descricao varchar (255),
    em_estoque boolean default true
);

create table loja_info(
    nome_loja varchar (255) not null,
    whatsapp varchar (255) not null,
    telefone varchar (255),
    url_insta varchar (255)
);
create table produtos(
    id serial primary key,
    nome_produto varchar (255) not null,
    valor int not null,
    descricao varchar (255),
    em_estoque boolean default true
);

create table loja_info(
    id serial primary key not null,
    nome_loja varchar (255) not null,
    whatsapp varchar (255) not null,
    url_insta varchar (255),
    usuario varchar(255) not null,
    senha varchar (255) not null,
		qtd int not null,
		qtdmax int not null
);
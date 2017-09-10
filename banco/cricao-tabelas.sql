create table estado
(
    id_estado integer auto_increment,
    nome varchar(255) not null,
    uf varchar(2) not null,
    primary key (id_estado)
);

create table cidade 
(
    id_cidade integer auto_increment,
    nome varchar(255) not null,
    id_estado integer not null,
    primary key (id_cidade),
    foreign key (id_estado) references estado (id_estado)
);

create table cliente
(
    id_cliente integer auto_increment,
    logotipo longtext,
    nome_fantasia varchar(255) not null,
    razao_social varchar(255) not null,
    endereco text not null,
    bairro varchar(255) not null,
    cep varchar(10) not null,
    celular varchar(15),
    website varchar(255),
    responsavel varchar(255),
    id_cidade integer not null,
    telefone varchar(15) not null,
    primary key (id_cliente),
    foreign key (id_cidade) references cidade (id_cidade)
);

alter table cliente add column cpf_cnpj varchar(25) not null;
alter table cliente add unique(cpf_cnpj);

create table tipo_usuario
(
    id_tipo_usuario integer,
    descricao varchar(255) not null,
    primary key (id_tipo_usuario)
);

create table usuario
(
    id_usuario integer auto_increment,
    nome varchar(255) not null,
    login varchar(255) not null,
    senha varchar(255) not null,
    id_cliente integer,
    id_tipo_usuario integer,
    primary key (id_usuario),
    foreign key (id_cliente) references cliente (id_cliente),
    foreign key (id_tipo_usuario) references tipo_usuario (id_tipo_usuario)
);

create table beacon
(
    id_beacon integer auto_increment,
    uiid varchar(45) not null unique,
    identificacao varchar(255) not null,
    periodo_maximo_bateria integer not null,
    dias_alerta_bateria integer not null,
    data_compra date not null,
    latitude varchar(45) not null,
    longitude varchar(45) not null,
    id_cliente integer not null,
    primary key (id_beacon),
    foreign key (id_cliente) references cliente (id_cliente)
);
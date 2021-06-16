create table Usuarios(
  nome      varchar(20) primary key,
  email     varchar(20) not null,
  senha     varchar(15) not null
)

create table Animais(
  id   INT IDENTITY (1, 1) NOT NULL,
  nome       varchar(20)   not null,
  raca       varchar(20)   not null,
  descricao  varchar(300)  null    ,
  urlFoto    varchar(1000) not null,
  nomeDono   varchar(20)   not null,
  PRIMARY KEY CLUSTERED ([id] ASC),
  constraint fkDono     foreign key(nomeDono)     references Usuarios(nome)
)
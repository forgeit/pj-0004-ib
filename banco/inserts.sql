insert into tipo_usuario 
values
(1, 'Administrador do Sistema'),
(2, 'Cliente');

insert into usuario 
(nome, login, senha, id_tipo_usuario)
values
('Juliano Bastos', 'jbastos', '81dc9bdb52d04dc20036dbd8313ed055', 1);
<?php

class UsuarioModel extends MY_Model {

    function __construct() {
        parent::__construct();
        $this->table = 'usuario';
    }

    function verificarLogin($login, $senha) {
        $sql = "SELECT 
                u.id_usuario, u.nome, u.id_cliente, u.id_tipo_usuario, tu.descricao AS tipo
                FROM usuario u
                JOIN tipo_usuario tu ON tu.id_tipo_usuario = u.id_tipo_usuario
                WHERE login = ? AND senha = ?";

        $query = $this->db->query($sql, array($login, $senha));

        if ($query->num_rows() > 0) {
            return $query->row_array();
        } else {
            return null;
        }
    }

}

<?php

class ClienteModel extends MY_Model {

    function __construct() {
        parent::__construct();
        $this->table = 'cliente';
    }

    function buscarCombo () {   
        $this->db->select('id_cliente, nome_fantasia');
        $this->db->from('cliente');
        $this->db->order_by('nome_fantasia', 'asc');
        
        $query = $this->db->get();
        
        if ($query->num_rows() > 0) {
            return $query->result_array();
        } else {
            return null;
        }
    }
    
}
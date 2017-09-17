<?php

class BeaconModel extends MY_Model {

    function __construct() {
        parent::__construct();
        $this->table = 'beacon';
    }

    function buscarCombo ($coluna = null, $id = null) {   
        $this->db->select("id_beacon, concat(nome_fantasia, ' - ', uiid) AS uiid");
        $this->db->from('beacon b');
        $this->db->join('cliente c', 'c.id_cliente = b.id_cliente');
        $this->db->order_by('uiid', 'asc');

        if (!is_null($id) && !is_null($coluna)) {
            $coluna = 'c.' . $coluna;
            $this->db->where($coluna, $id);
        }
        
        $query = $this->db->get();
        
        if ($query->num_rows() > 0) {
            return $query->result_array();
        } else {
            return null;
        }
    }
    
}
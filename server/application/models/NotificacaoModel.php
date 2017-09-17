<?php

class NotificacaoModel extends MY_Model {

    function __construct() {
        parent::__construct();
        $this->table = 'item_notificacao';
    }

    function buscarTodosPermissao($dadosDataTable, $coluna = null, $id = null, $sort = 'id', $order = 'asc') {   
        if ($sort == 'id') {
            $sort .= '_' . $this->table;
        }

        $colunaOrdem = $dadosDataTable->order[0]->column;
        $dirOrdem = $dadosDataTable->order[0]->dir;
        $colunaOrdem = $dadosDataTable->columns[$colunaOrdem]->data;
        
        $this->db->select('b.uiid, i.titulo, c.nome_fantasia, i.id_item_notificacao, i.ativo');
        $this->db->from('item_notificacao i');
        $this->db->join('beacon b', 'b.id_beacon = i.id_beacon');
        $this->db->join('cliente c', 'c.id_cliente = b.id_cliente');
        $this->db->order_by($colunaOrdem, $dirOrdem);
        
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

    function buscarTotalPermissaoNaoAdmin($coluna = null, $id = null) {
        $this->db->select('count(*)');
        $this->db->from('item_notificacao i');
        $this->db->join('beacon b', 'b.id_beacon = i.id_beacon');
        $this->db->join('cliente c', 'c.id_cliente = b.id_cliente');

        if (!is_null($id) && !is_null($coluna)) {
            $this->db->where($coluna, $id);
        }

        $num_rows = $this->db->count_all_results();
        return $num_rows;
    }
    
}
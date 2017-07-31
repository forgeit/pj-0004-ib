<?php

if (!defined('BASEPATH')) exit('No direct script access allowed');

class MY_Model extends CI_Model {
    var $table = "";
    
    function __construct() {
        parent::__construct();
    }
    
    function inserir($data) {
        if (!isset($data)) {
            return false;
        }
        return $this->db->insert($this->table, $data);
    }

    function inserirRetornaId($data){

        if (!isset($data)) {
            return 0;
        }

        $this->db->insert($this->table, $data);
        $insert_id = $this->db->insert_id();
        
        return  $insert_id;
    }
    
    function buscarPorId($id, $coluna = 'id') {
        if(is_null($id)) {
            return false;
        }

        $this->db->where($coluna, $id);

        $query = $this->db->get($this->table);

        if ($query->num_rows() > 0) {
            return $query->row_array();
        } else {
            return null;
        }
    }
    
    function buscarTodos($sort = 'id', $order = 'asc') {
        $this->db->order_by($sort, $order);

        $query = $this->db->get($this->table);

        if ($query->num_rows() > 0) {
            return $query->result_array();
        } else {
            return null;
        }
    }
    
    function atualizar($id, $data, $idNome) {
        if(is_null($id) || !isset($data)) {
            return false;
        }

        $this->db->where($idNome, $id);
        return $this->db->update($this->table, $data);
    }
    
    function excluir($id, $coluna = 'id') {
        if(is_null($id)) {
            return false;
        }

        $this->db->where($coluna, $id);
        return $this->db->delete($this->table);
    }
    
    function buscarTotalPorValorEColuna($coluna = null, $valor = null) {
        $this->db->where($coluna, $valor);
        $num_rows = $this->db->count_all_results($this->table);
        return $num_rows;
    }
    
    function buscarPorIdPermissao($idWhere = null, $coluna = null, $id = null, $where = null) {

        if (is_null($where)) {
            $where = 'id_' . $this->table;
        }
        
        if (!is_null($id) && !is_null($coluna)) {
            $this->db->where($coluna, $id);
        }
        
        if (is_null($idWhere)) {
            return null;
        }
        
        $this->db->where($where, $idWhere);
        
        $query = $this->db->get($this->table);
        
        if ($query->num_rows() > 0) {
            return $query->row_array();
        } else {
            return null;
        }
    }
    
    function buscarTodosPermissao($coluna = null, $id = null, $sort = 'id', $order = 'asc') {
        
        if ($sort == 'id') {
            $sort .= '_' . $this->table;
        }
        
        $this->db->order_by($sort, $order);
        
        if (!is_null($id) && !is_null($coluna)) {
            $this->db->where($coluna, $id);
        }
        
        $query = $this->db->get($this->table);
        
        if ($query->num_rows() > 0) {
            return $query->result_array();
        } else {
            return null;
        }
    }
}
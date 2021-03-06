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
    
    function buscarTotalPorValorEColuna($coluna = null, $valor = null, $colunaId = null, $valorId = null) {
        $this->db->where($coluna, $valor);

        if (!is_null($colunaId)) {
            $this->db->where($colunaId . " <>", $valorId);
        }
        
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
    
    function buscarTodosPermissao($dadosDataTable, $coluna = null, $id = null, $sort = 'id', $order = 'asc') {
        
        if ($sort == 'id') {
            $sort .= '_' . $this->table;
        }

        $colunaOrdem = $dadosDataTable->order[0]->column;
        $dirOrdem = $dadosDataTable->order[0]->dir;
        $colunaOrdem = $dadosDataTable->columns[$colunaOrdem]->data;
        
        $this->db->order_by($colunaOrdem, $dirOrdem);
        
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

    function buscarTotalPermissao($coluna = null, $id = null) {
        if (!is_null($id) && !is_null($coluna)) {
            $this->db->where($coluna, $id);
        }

        $num_rows = $this->db->count_all_results($this->table);
        return $num_rows;
    }
}
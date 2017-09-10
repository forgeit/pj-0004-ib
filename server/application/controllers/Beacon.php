<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Beacon extends MY_Controller {

    public function buscarTodos() {
        $data = $this->security->xss_clean($this->input->raw_input_stream);
        $dadosTabela = json_decode($data);

        $lista = array();

        // if ($this->ehAdmin) {
        //     $lista = $this->ClienteModel->buscarTodosPermissao($dadosTabela);
        //     $total = $this->ClienteModel->buscarTotalPermissao();
        // } else {
        //     $lista = $this->ClienteModel->buscarTodosPermissao($dadosTabela, $this->nomeColunaCliente, $this->meuTokenAtual->id_cliente);
        //     $total = $this->ClienteModel->buscarTotalPermissao($this->nomeColunaCliente, $this->meuTokenAtual->id_cliente);
        // }

        $lista = $this->BeaconModel->buscarTodosPermissao($dadosTabela);
        $total = $this->BeaconModel->buscarTotalPermissao();

        $this->gerarRetornoDatatable($lista == null ? array() : $lista, $dadosTabela->draw, $total);
    }

}

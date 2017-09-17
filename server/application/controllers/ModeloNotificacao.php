<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class ModeloNotificacao extends MY_Controller {

    public function buscarTodos() {
        $lista = array();
        $lista = $this->ModeloNotificacaoModel->buscarTodos('descricao');
        $this->gerarRetorno($lista);
    }

}

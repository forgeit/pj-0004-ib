<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Cidade extends MY_Controller implements I_Controller {

    public function atualizar() {
        
    }

    public function buscar() {
        
    }
    
    public function buscarTodos() {
        $this->gerarRetorno($this->CidadeModel->buscarTodos('nome'));
    }

    public function remover() {
        
    }

    public function salvar() {
        
    }

}
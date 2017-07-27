<?php
defined('BASEPATH') OR exit('No direct script access allowed');

interface I_Controller {
    
    public function atualizar();
    
    public function buscarTodos();
    
    public function buscar();
    
    public function remover();
    
    public function salvar();
    
}
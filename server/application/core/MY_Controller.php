<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require_once __DIR__ . '/I_Controller.php';

class MY_Controller extends CI_Controller {

    protected $meuTokenAtual = null;
    protected $senha = "sistema_revendas_2016";
    protected $administrador = 1;
    protected $cliente = 2;
    protected $ehAdmin = false;
    protected $nomeColunaCliente = 'id_cliente';

    public function __construct() {
        parent::__construct();
        $this->checarLogin();
    }

    private function checarLogin() {
        $seguro = true;

        if ($this->uri->uri_string == 'login/entrar') {
            $seguro = false;
        }

        if ($seguro) {
            if ($this->input->get_request_header('Authorization')) {
                $code = str_replace("Bearer ", "", $this->input->get_request_header('Authorization'));
                $this->load->library("JWT");

                try {
                    $retorno = $this->lerToken($code);
                    if ($retorno && $this->verificarValidadeToken($retorno)) {
                        $this->retornar401();
                    }

                    $this->meuTokenAtual = $retorno;
                    $this->ehAdmin = $this->ehAdministrador();
                } catch (Exception $ex) {
                    $this->retornar401($ex);
                }
            } else {
                $this->retornar401();
            }
        }
    }

    private function lerToken($code) {
        return $this->jwt->decode($code, $this->senha, true);
    }

    private function verificarValidadeToken($retorno) {
        $diff = abs(strtotime("now") - $retorno->dtBegin);
        return $diff > $retorno->ttl;
    }

    private function retornar401() {
        header('HTTP/1.1 401 Unauthorized', true, 401);
        die();
    }
    
    protected function gerarRetorno($data = null, $exec = true, $message = "Sucesso ao efetuar operação.", $print = true) {
        $retorno = array(
            'exec' => $exec,
            'message' => $message,
            'data' => $data
        );
        
        if ($print) {
            print_r(json_encode($retorno));
        }
        
        return $retorno;
    }
    
    protected function ehAdministrador() {
        return $this->meuTokenAtual->id_usuario == $this->administrador;
    }
    
    protected function validarEntrada($objeto, $coluna, $message) {
        
        if (!$objeto) {
            $this->gerarRetorno(null, false, $message);
            die();
        }
        
        if (property_exists($objeto, $coluna)) {
            
            if (strlen($objeto->{$coluna}) == 0) {
                $this->gerarRetorno(null, false, $message);
                die();
            }
            
            return true;
        } else {
            $this->gerarRetorno(null, false, $message);
            die();
        }
        
    }
    
    protected function validarValorUnico($total, $atributo) {
        if ($total > 0) {
            $this->gerarRetorno(null, false, 'O atributo ' . $atributo . ' já foi registrado na base de dados.');
            die();
        }    
    }

}

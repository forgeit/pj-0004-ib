<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require_once __DIR__ . '/I_Controller.php';

class MY_Controller extends CI_Controller {
    
    protected $meuTokenAtual = null;

    public function __construct() {
        parent::__construct();
        $this->checarLogin();
    }

    private function checarLogin() {
        $seguro = true;
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
                } catch (Exception $ex) {
                    $this->retornar401($ex);
                }
            } else {
                $this->retornar401();
            }
        }
    }

    private function lerToken($code) {
        $CONSUMER_SECRET = 'sistema_revendas_2016';
        return $this->jwt->decode($code, $CONSUMER_SECRET, true);
    }

    private function verificarValidadeToken($retorno) {
        $diff = abs(strtotime("now") - $retorno->dtBegin);
        return $diff > $retorno->ttl;
    }

    private function retornar401() {
        header('HTTP/1.1 401 Unauthorized', true, 401);
        die();
    }

}

<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends MY_Controller {
    
    public function entrar() {
        $data = $this->security->xss_clean($this->input->raw_input_stream);
        $usuario = json_decode($data);
        $this->gerarRetorno($this->buscarUsuario($usuario));
    }
    
    private function buscarUsuario($usuario) {
        return $this->gerarToken(
                $this->UsuarioModel->verificarLogin(
                        base64_decode($usuario->login),
                        md5(base64_decode($usuario->senha))));
    }
    
    private function gerarToken($usuario) {
        $this->load->library('JWT');
        return $this->jwt->encode(array(
            'id_usuario' => $usuario['id_usuario'],
            'nome' => $usuario['nome'],
            'id_cliente' => $usuario['id_cliente'],
            'id_tipo_usuario' => $usuario['id_tipo_usuario'],
            'issuedAt'=> date(DATE_ISO8601, strtotime("now")),
            'dtBegin' => strtotime("now"),
            'ttl'=> 1800
        ), $this->senha);
        
    }
}
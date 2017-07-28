<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Cliente extends MY_Controller implements I_Controller {

    public function atualizar() {
        
    }

    public function buscar() {
        
    }

    public function buscarTodos() {

        $lista = array();

        if ($this->ehAdmin) {
            $lista = $this->ClienteModel->buscarTodosPermissao();
        } else {
            $lista = $this->ClienteModel->buscarTodosPermissao($this->nomeColunaCliente, $this->meuTokenAtual->id_cliente);
        }

        $this->gerarRetorno($lista);
    }

    public function remover() {
        
    }

    public function salvar() {
        if (!$this->ehAdmin) {
            $this->gerarRetorno(null, false, 'Você não tem permissão para registrar novos clientes.');
            die();
        }

        $data = $this->security->xss_clean($this->input->raw_input_stream);
        $entrada = json_decode($data);

        $this->validarEntradaFormulario($entrada);

        $this->db->trans_begin();

        $id = $this->ClienteModel->inserirRetornaId($entrada);

        $this->UsuarioModel->inserir($this->criarUsuarioDoCliente($entrada), $id);

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $this->gerarRetorno(null, false, 'Não foi possível registrar o cliente.');
        } else {
            $this->db->trans_commit();
            $this->gerarRetorno();
        }
    }
    
    private function validarEntradaFormulario ($entrada) {
        $this->validarEntrada($entrada, 'nome_fantasia', 'O atributo nome fantasia é obrigatório');
        $this->validarEntrada($entrada, 'razao_social', 'O atributo razão social é obrigatório');
        $this->validarEntrada($entrada, 'endereco', 'O atributo endereço é obrigatório');
        $this->validarEntrada($entrada, 'bairro', 'O atributo bairro é obrigatório');
        $this->validarEntrada($entrada, 'id_cidade', 'O atributo cidade é obrigatório');
        $this->validarEntrada($entrada, 'telefone', 'O atributo telefone é obrigatório');
        $this->validarEntrada($entrada, 'cpf_cnpj', 'O atributo CPF/CNPJ é obrigatório');
        $this->validarValorUnico($this->ClienteModel->buscarTotalPorValorEColuna('cpf_cnpj', $entrada->cpf_cnpj), 'CPF/CNPJ');
    }
    
    private function criarUsuarioDoCliente($entrada, $id) {
        return array(
            'nome' => $entrada->nome_fantasia,
            'login' => $entrada->cpf_cnpj,
            'senha' => md5($entrada->cpf_cnpj),
            'id_cliente' => $id,
            'id_tipo_usuario' => $this->cliente
        );
    }

}

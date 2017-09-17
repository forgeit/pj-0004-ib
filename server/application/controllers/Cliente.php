<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Cliente extends MY_Controller implements I_Controller {

    public function atualizar() {
        if (!$this->ehAdmin) {
            if ($this->meuTokenAtual->id_cliente != $this->uri->segment(3)) {
                $this->gerarRetorno(null, false, 'Você não tem permissão para registrar novos clientes.');
                die();
            }
        }

        $data = $this->security->xss_clean($this->input->raw_input_stream);
        $entrada = json_decode($data);

        $this->validarEntradaFormularioAtualizar($entrada);

        $this->db->trans_begin();

        $this->ClienteModel->atualizar($this->uri->segment(3), $entrada, 'id_cliente');

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $this->gerarRetorno(null, false, 'Não foi possível atualizar o cliente.');
        } else {
            $this->db->trans_commit();
            $this->gerarRetorno(null, true, 'Sucesso ao atualizar o cliente.');
        }
    }

    public function buscarCombo() {
        $retorno = null;
        $retorno = $this->ClienteModel->buscarCombo();
        $this->gerarRetorno($retorno);
    }

    public function buscar() {
        $retorno = null;

        if ($this->ehAdmin) {
            $retorno = $this->ClienteModel->buscarPorIdPermissao($this->uri->segment(3));
        } else {
            if ($this->meuTokenAtual->id_cliente == $this->uri->segment(3)) {
                $retorno = $this->ClienteModel->buscarPorIdPermissao($this->meuTokenAtual->id_cliente, $this->nomeColunaCliente);
            } else {
                $this->gerarRetorno(null, false, 'Você não pode acessar os desse cliente.');
                die();
            }
        }        

        if ($retorno && $retorno['logotipo']) {
            $retorno['logotipo'] = $this->convertStringToFileObject($retorno['logotipo']);
        }

        $this->gerarRetorno($retorno);

    }

    public function buscarTodos() {
        $data = $this->security->xss_clean($this->input->raw_input_stream);
        $dadosTabela = json_decode($data);

        $lista = array();

        if ($this->ehAdmin) {
            $lista = $this->ClienteModel->buscarTodosPermissao($dadosTabela);
            $total = $this->ClienteModel->buscarTotalPermissao();
        } else {
            $lista = $this->ClienteModel->buscarTodosPermissao($dadosTabela, $this->nomeColunaCliente, $this->meuTokenAtual->id_cliente);
            $total = $this->ClienteModel->buscarTotalPermissao($this->nomeColunaCliente, $this->meuTokenAtual->id_cliente);
        }

        $this->gerarRetornoDatatable($lista == null ? array() : $lista, $dadosTabela->draw, $total);
    }

    public function remover() {
        if (!$this->ehAdmin) {
            $this->gerarRetorno(null, false, 'Você não tem permissão para remover clientes.');
            die();
        } else {
            $this->db->trans_begin();

            $retorno = $this->UsuarioModel->excluir($this->uri->segment(3), 'id_cliente');
            $retorno = $this->ClienteModel->excluir($this->uri->segment(3), 'id_cliente');

            if ($this->db->trans_status() === FALSE) {
                $this->db->trans_rollback();
                $this->gerarRetorno(null, false, 'Não foi possível remover o cliente.');
            } else {
                $this->db->trans_commit();
                $this->gerarRetorno();
            }
        }
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

        $this->UsuarioModel->inserir($this->criarUsuarioDoCliente($entrada, $id));

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

        if ($this->valorExiste($entrada, 'logotipo')) {
            if (!$this->validarTipoImagem($entrada->logotipo)) {
                $this->gerarRetorno(null, false, 'O arquivo de logo é inválido.');
            }
            $entrada->logotipo = 'data:' . $entrada->logotipo->filetype . ';base64,' . $entrada->logotipo->base64;
        }
    }

    private function validarEntradaFormularioAtualizar ($entrada) {
        $this->validarEntrada($entrada, 'nome_fantasia', 'O atributo nome fantasia é obrigatório');
        $this->validarEntrada($entrada, 'razao_social', 'O atributo razão social é obrigatório');
        $this->validarEntrada($entrada, 'endereco', 'O atributo endereço é obrigatório');
        $this->validarEntrada($entrada, 'bairro', 'O atributo bairro é obrigatório');
        $this->validarEntrada($entrada, 'id_cidade', 'O atributo cidade é obrigatório');
        $this->validarEntrada($entrada, 'telefone', 'O atributo telefone é obrigatório');
        
        if ($this->valorExiste($entrada, 'logotipo')) {

            if (!is_null($entrada->logotipo)) {
                if (!$this->validarTipoImagem($entrada->logotipo)) {
                    $this->gerarRetorno(null, false, 'O arquivo de logo é inválido.');
                }

                $entrada->logotipo = 'data:' . $entrada->logotipo->filetype . ';base64,' . $entrada->logotipo->base64;
            }
            
        }
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

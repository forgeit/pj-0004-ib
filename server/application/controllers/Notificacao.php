<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Notificacao extends MY_Controller implements I_Controller {

    public function atualizar() {
        $data = $this->security->xss_clean($this->input->raw_input_stream);
        $entrada = json_decode($data);

        $entrada = json_decode($data);
        $imagemBase64 = $entrada->imagem->base64;

        $this->validarEntradaFormulario($entrada);

        $imagem = getimagesizefromstring(base64_decode($imagemBase64));
        $modelo = $this->ModeloNotificacaoModel->buscarPorId(1, 'id_modelo_notificacao');

        if ($modelo['max_width'] < $imagem[0]) {
            $this->gerarRetorno(null, false, 'A largura da imagem deve ser menor ou igual a ' . $modelo['max_width'] . 'px.');
            die();
        }

        if ($modelo['max_height'] < $imagem[1]) {
            $this->gerarRetorno(null, false, 'A altura da imagem deve ser menor ou igual a ' . $modelo['max_height'] . 'px.');
            die();
        }

        $this->db->trans_begin();

        $this->NotificacaoModel->atualizar($this->uri->segment(3), $entrada, 'id_item_notificacao');

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $this->gerarRetorno(null, false, 'Não foi possível atualizar a notificação.');
        } else {
            $this->db->trans_commit();
            $this->gerarRetorno(null, true, 'Sucesso ao atualizar a notificação.');
        }
    }

    public function buscar() {
        $retorno = null;

        $retorno = $this->NotificacaoModel->buscarPorId($this->uri->segment(3), 'id_item_notificacao');
        $retorno['imagem'] = $this->convertStringToFileObject($retorno['imagem']);

        $this->gerarRetorno($retorno);

    }

    public function buscarTodosAtivos() {
        $retorno = array();
        $retorno = $this->NotificacaoModel->buscarTodosAtivos();
        print json_encode($retorno);
    }

    public function buscarTodos() {
        $data = $this->security->xss_clean($this->input->raw_input_stream);
        $dadosTabela = json_decode($data);

        $lista = array();

        if ($this->ehAdmin) {
            $lista = $this->NotificacaoModel->buscarTodosPermissao($dadosTabela);
            $total = $this->NotificacaoModel->buscarTotalPermissao();
        } else {
            $lista = $this->NotificacaoModel->buscarTodosPermissao($dadosTabela, $this->nomeColunaCliente, $this->meuTokenAtual->id_cliente);
            $total = $this->NotificacaoModel->buscarTotalPermissaoNaoAdmin('c.' . $this->nomeColunaCliente, $this->meuTokenAtual->id_cliente);
        }

        $this->gerarRetornoDatatable($lista == null ? array() : $lista, $dadosTabela->draw, $total);
    }

    public function remover() {
        $this->db->trans_begin();

        $retorno = $this->NotificacaoModel->excluir($this->uri->segment(3), 'id_item_notificacao');

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $this->gerarRetorno(null, false, 'Não foi possível remover a notificação.');
        } else {
            $this->db->trans_commit();
            $this->gerarRetorno();
        }
    }

    public function salvar() {
        $data = $this->security->xss_clean($this->input->raw_input_stream);
    
        $entrada = json_decode($data);
        $imagemBase64 = $entrada->imagem->base64;

        $this->validarEntradaFormulario($entrada);

        $imagem = getimagesizefromstring(base64_decode($imagemBase64));
        $modelo = $this->ModeloNotificacaoModel->buscarPorId(1, 'id_modelo_notificacao');

        if ($modelo['max_width'] < $imagem[0]) {
            $this->gerarRetorno(null, false, 'A largura da imagem deve ser menor ou igual a ' . $modelo['max_width'] . 'px.');
            die();
        }

        if ($modelo['max_height'] < $imagem[1]) {
            $this->gerarRetorno(null, false, 'A altura da imagem deve ser menor ou igual a ' . $modelo['max_height'] . 'px.');
            die();
        }

        $entrada->ts_registro = date('Y-m-d H:i:s');

        $this->db->trans_begin();

        $this->NotificacaoModel->inserir($entrada);

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $this->gerarRetorno(null, false, 'Não foi possível registrar a notificação.');
        } else {
            $this->db->trans_commit();
            $this->gerarRetorno();
        }
    }

    private function validarEntradaFormulario ($entrada) {
        $this->validarEntrada($entrada, 'titulo', 'O atributo título é obrigatório');
        $this->validarEntrada($entrada, 'descricao', 'O atributo descrição é obrigatório');
        $this->validarEntrada($entrada, 'item_destaque', 'O atributo item destaque é obrigatório');
        $this->validarEntrada($entrada, 'id_beacon', 'O atributo beacon é obrigatório');
        
        if (!$this->valorExiste($entrada, 'ativo')) {
            $entrada->ativo = false;
        }

        if ($this->valorExiste($entrada, 'imagem')) {
            if (!$this->validarTipoImagem($entrada->imagem)) {
                $this->gerarRetorno(null, false, 'O imagem é inválida.');
            }
            $entrada->imagem = 'data:' . $entrada->imagem->filetype . ';base64,' . $entrada->imagem->base64;
        } else {
            $this->gerarRetorno(null, false, 'O informe a imagem da notificação');
        }
    }
}

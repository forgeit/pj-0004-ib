<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Beacon extends MY_Controller {

    public function atualizar() {
        $data = $this->security->xss_clean($this->input->raw_input_stream);
        $entrada = json_decode($data);

        $this->validarEntradaFormularioAtualizar($entrada);

        // $entrada->data_compra = substr($entrada->data_compra, 8, 2 ) 
        //     . '/' . substr($entrada->data_compra, 5, 2) 
        //     . '/' . substr($entrada->data_compra, 0, 4);

        $this->db->trans_begin();

        $this->BeaconModel->atualizar($this->uri->segment(4), $entrada, 'id_beacon');

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $this->gerarRetorno(null, false, 'Não foi possível atualizar o beacon.');
        } else {
            $this->db->trans_commit();
            $this->gerarRetorno(null, true, 'Sucesso ao atualizar o beacon.');
        }
    }


    public function buscar() {
        $retorno = null;

        if ($this->ehAdmin) {
            $retorno = $this->BeaconModel->buscarPorIdPermissao($this->uri->segment(3));
        } else {
            $retorno = $this->BeaconModel->buscarPorIdPermissao(
                $this->uri->segment(3),
                $this->nomeColunaCliente,
                $this->meuTokenAtual->id_cliente);
        }        

        $retorno['dias_alerta_bateria'] = (int) $retorno['dias_alerta_bateria'];
        $retorno['periodo_maximo_bateria'] = (int) $retorno['periodo_maximo_bateria'];
        $retorno['longitude'] = (double) $retorno['longitude'];
        $retorno['latitude'] = (double) $retorno['latitude'];
        // $retorno['data_compra'] = substr($retorno['data_compra'], 8, 2 ) . '/' . substr($retorno['data_compra'], 5, 2) . '/' . substr($retorno['data_compra'], 0, 4);

        $this->gerarRetorno($retorno);
    }

    public function remover() {
        if (!$this->ehAdmin) {
            $this->gerarRetorno(null, false, 'Você não tem permissão para remover clientes.');
            die();
        } else {
            $this->db->trans_begin();

            $retorno = $this->BeaconModel->excluir($this->uri->segment(3), 'id_beacon');

            if ($this->db->trans_status() === FALSE) {
                $this->db->trans_rollback();
                $this->gerarRetorno(null, false, 'Não foi possível remover o beacon.');
            } else {
                $this->db->trans_commit();
                $this->gerarRetorno();
            }
        }
    }

    public function buscarTodos() {
        $data = $this->security->xss_clean($this->input->raw_input_stream);
        $dadosTabela = json_decode($data);
        $lista = array();
        $lista = $this->BeaconModel->buscarTodosPermissao($dadosTabela, $this->nomeColunaCliente, $this->uri->segment(3));
        $total = $this->BeaconModel->buscarTotalPermissao($this->nomeColunaCliente, $this->uri->segment(3));
        $this->gerarRetornoDatatable($lista == null ? array() : $lista, $dadosTabela->draw, $total);
    }

    public function salvar() {
        if (!$this->ehAdmin) {
            $this->gerarRetorno(null, false, 'Você não tem permissão para registrar novos beacons.');
            die();
        }

        $data = $this->security->xss_clean($this->input->raw_input_stream);
        $entrada = json_decode($data);
        $entrada->id_cliente = $this->uri->segment(3);

        $this->validarEntradaFormulario($entrada);

        // $entrada->data_compra = substr($entrada->data_compra, 8, 2 ) 
        //     . '/' . substr($entrada->data_compra, 5, 2) 
        //     . '/' . substr($entrada->data_compra, 0, 4);

        $this->db->trans_begin();

        $this->BeaconModel->inserir($entrada);

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $this->gerarRetorno(null, false, 'Não foi possível registrar o beacon.');
        } else {
            $this->db->trans_commit();
            $this->gerarRetorno();
        }
    }

    private function validarEntradaFormulario ($entrada) {
        $this->validarEntrada($entrada, 'uiid', 'O atributo UIID é obrigatório');
        $this->validarEntrada($entrada, 'identificacao', 'O atributo identificação é obrigatório');
        $this->validarEntrada($entrada, 'periodo_maximo_bateria', 'O atributo período máximo da bateria é obrigatório');
        $this->validarEntrada($entrada, 'dias_alerta_bateria', 'O atributo dias para receber alerta é obrigatório');
        $this->validarEntrada($entrada, 'data_compra', 'O atributo data de compra é obrigatório');
        $this->validarEntrada($entrada, 'latitude', 'O atributo latitude é obrigatório');
        $this->validarEntrada($entrada, 'longitude', 'O atributo longitude é obrigatório');
        $this->validarValorUnico($this->BeaconModel->buscarTotalPorValorEColuna('uiid', $entrada->uiid), 'UIID');
    }

    private function validarEntradaFormularioAtualizar ($entrada) {
        $this->validarEntrada($entrada, 'uiid', 'O atributo UIID é obrigatório');
        $this->validarEntrada($entrada, 'identificacao', 'O atributo identificação é obrigatório');
        $this->validarEntrada($entrada, 'periodo_maximo_bateria', 'O atributo período máximo da bateria é obrigatório');
        $this->validarEntrada($entrada, 'dias_alerta_bateria', 'O atributo dias para receber alerta é obrigatório');
        $this->validarEntrada($entrada, 'data_compra', 'O atributo data de compra é obrigatório');
        $this->validarEntrada($entrada, 'latitude', 'O atributo latitude é obrigatório');
        $this->validarEntrada($entrada, 'longitude', 'O atributo longitude é obrigatório');
    }

}

(function () {
	'use strict';

	angular
		.module('admin.layout')
		.controller('MenuTopo', MenuTopoController);

	MenuTopoController.$inject = ['AuthToken', 'jwtHelper', '$rootScope', '$location'];

	function MenuTopoController(AuthToken, jwtHelper, $rootScope, $location) {
		var vm = this;
		vm.isLogged = isLogged;
		vm.sair = sair;

		carregar();

		function carregar() {
			if (AuthToken.ler()) {
				var payload = jwtHelper.decodeToken(AuthToken.ler());

				$rootScope.usuarioLogado = {};
				$rootScope.usuarioLogado.nome = payload.nome;
				$rootScope.usuarioLogado.tipo = payload.tipo;
				$rootScope.usuarioLogado.id_cliente = payload.id_cliente;
				$rootScope.usuarioLogado.admin = payload.id_tipo_usuario == 1;
			}
		}

		function isLogged() {
			return !!AuthToken.ler();
		}

		function sair() {
			AuthToken.remover();
			$location.path('/login');
		}
	}
	
})();
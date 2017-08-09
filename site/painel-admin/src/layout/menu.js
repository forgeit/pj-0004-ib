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
(function () {

	'use strict';

	angular.module('admin.login')
		.controller('Login', Login);

	Login.$inject = ['$rootScope', 'loginRest', 'jwtHelper', 'AuthToken', '$location'];

	function Login($rootScope, loginRest, jwtHelper, AuthToken, $location) {
		var vm = this;

		vm.logar = logar;
		vm.usuario = {};

		function logar(formulario) {
			$rootScope.usuarioLogado = {};
			loginRest.logar(vm.usuario).then(success).catch(error);

			function error(response) {
				toastr['error']('Ocorreu um erro ao logar.');
			}

			function success(response) {
				if (response.data.exec) {
					toastr['success']('Sucesso ao entrar, redirecionando...');
					AuthToken.setar(response.data.data);
					var payload = jwtHelper.decodeToken(response.data.data);
					$rootScope.usuarioLogado.nome = payload.nome;
					$rootScope.usuarioLogado.tipo = payload.tipo;
					$rootScope.usuarioLogado.id_cliente = payload.id_cliente;
					$rootScope.usuarioLogado.admin = payload.id_tipo_usuario == 1;
					$location.path('/');
				} else {
					toastr['error']('Dados informados não foram encontrados na base de dados.');
				}
			}
		}

	}

})();
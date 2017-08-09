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
				//erro
				console.log(response);
			}

			function success(response) {
				if (response.data.exec) {

					AuthToken.setar(response.data.data);

					var payload = jwtHelper.decodeToken(response.data.data);
					$rootScope.usuarioLogado.nome = payload.nome;
					$rootScope.usuarioLogado.cargo = payload.cargo;
					$rootScope.usuarioLogado.imagem = payload.imagem;

					$location.path('/');
				}
			}
		}

	}

})();
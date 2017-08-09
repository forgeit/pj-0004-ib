(function () {

	'use strict';

	angular
		.module('admin')
		.config(routes);

	routes.$inject = ['$routeProvider', '$locationProvider'];

	function routes($routeProvider, $locationProvider) {
		$routeProvider
			.when('/login', {
				templateUrl: 'src/login/login.html?' + new Date().getTime(),
				controller: 'Login',
				controllerAs: 'vm',
				titulo: 'Acesso Restrito',
				cabecalho: {
					h1: 'Acesso Restrito',
					breadcrumbs: [
						{
							nome: 'Acesso Restrito',
							link: '/',
							ativo: true
						}
					]
				}
			})
			.otherwise({
				redirectTo: '/'
			});

		$locationProvider.html5Mode(true);
	}

})();
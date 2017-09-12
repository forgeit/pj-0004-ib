(function () {

	'use strict';

	angular
		.module('admin')
		.config(routes);

	routes.$inject = ['$routeProvider', '$locationProvider'];

	function routes($routeProvider, $locationProvider) {
		$routeProvider
			.when('/cliente', {
				templateUrl: 'src/cliente/cliente.list.html?' + new Date().getTime(),
				controller: 'ClienteLista',
				controllerAs: 'vm'
			})
			.when('/novo-cliente', {
				templateUrl: 'src/cliente-completo/cliente-completo.html?' + new Date().getTime(),
				controller: 'ClienteCompleto',
				controllerAs: 'vm'
			})
			.when('/novo-cliente/:id', {
				templateUrl: 'src/cliente-completo/cliente-completo.html?' + new Date().getTime(),
				controller: 'ClienteCompleto',
				controllerAs: 'vm'
			})
			.when('/novo-cliente/:id/beacon/:idBeacon', {
				templateUrl: 'src/cliente-completo/cliente-completo.html?' + new Date().getTime(),
				controller: 'ClienteCompleto',
				controllerAs: 'vm'
			})
			.otherwise({
				redirectTo: '/'
			});

		$locationProvider.html5Mode(true);
	}

})();
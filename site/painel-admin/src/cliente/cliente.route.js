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
				templateUrl: 'src/cliente/cliente.html?' + new Date().getTime(),
				controller: 'Cliente',
				controllerAs: 'vm'
			})
			.when('/novo-cliente/:id', {
				templateUrl: 'src/cliente/cliente.html?' + new Date().getTime(),
				controller: 'Cliente',
				controllerAs: 'vm'
			})
			.otherwise({
				redirectTo: '/'
			});

		$locationProvider.html5Mode(true);
	}

})();
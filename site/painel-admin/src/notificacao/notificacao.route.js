(function () {

	'use strict';

	angular
		.module('admin')
		.config(routes);

	routes.$inject = ['$routeProvider', '$locationProvider'];

	function routes($routeProvider, $locationProvider) {
		$routeProvider
			.when('/notificacao', {
				templateUrl: 'src/notificacao/notificacao.list.html?' + new Date().getTime(),
				controller: 'NotificacaoLista',
				controllerAs: 'vm'
			})
			.when('/novo-notificacao', {
				templateUrl: 'src/notificacao/notificacao.html?' + new Date().getTime(),
				controller: 'Notificacao',
				controllerAs: 'vm'
			})
			.when('/novo-notificacao/:id', {
				templateUrl: 'src/notificacao/notificacao.html?' + new Date().getTime(),
				controller: 'Notificacao',
				controllerAs: 'vm'
			})
			.otherwise({
				redirectTo: '/'
			});

		$locationProvider.html5Mode(true);
	}

})();
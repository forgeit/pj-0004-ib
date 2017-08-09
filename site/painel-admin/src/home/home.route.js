(function () {

	'use strict';

	angular
		.module('admin')
		.config(routes);

	routes.$inject = ['$routeProvider', '$locationProvider'];

	function routes($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'src/home/home.html?' + new Date().getTime(),
				controller: 'Home',
				controllerAs: 'vm',
			})
			.otherwise({
				redirectTo: '/'
			});

		$locationProvider.html5Mode(true);
	}

})();
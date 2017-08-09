(function () {

	'use strict';

	angular
		.module('admin')
		.run(run);

	run.$inject = ['$rootScope', '$location', '$route', 'AuthToken'];

	function run($rootScope, $location, $route, AuthToken) {
		setRouteEvents();

		function routeChangeError() {
	   		console.log('Route Change Error');
	   	}

	   	function routeChangeStart(event, next, current) {

	   		if (!next.notSecured) {
	   			if (!AuthToken.ler()) {
	   				$rootScope.$evalAsync(function () {
	   					$location.path('/login');
	   				});
	   			}
	   		}
	   	}

	   	function routeChangeSuccess(event, current) {
	   		console.log('Route Change Success');
	   	}

		function setRouteEvents() {
	   		$rootScope.$on('$routeChangeError', routeChangeError);
			$rootScope.$on('$routeChangeStart', routeChangeStart);
			$rootScope.$on('$routeChangeSuccess', routeChangeSuccess);	
	   	}
	}

})();
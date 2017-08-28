(function () {

	'use strict';

	angular
		.module('admin')
		.run(run)
		.config(loading);

	run.$inject = ['$rootScope', '$location', '$route', 'AuthToken'];
	loading.$inject = ['cfpLoadingBarProvider'];

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

	function loading(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
        cfpLoadingBarProvider.spinnerTemplate = '<div id="loader-wrapper"><h4><img style="width: 100px; heigth: 100px;" src="src/layout/core/logo.png" /><br/><img src="src/layout/core/loader.gif"/></h4></div>';
	}


})();
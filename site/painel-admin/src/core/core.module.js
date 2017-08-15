(function () {

    'use strict';

    angular.module('admin.core', [
    	'ngRoute',
    	'angular-jwt',
    	'ngStorage',
    	'ui.utils.masks',
    	'naif.base64',
    	'datatables', 
		'datatables.bootstrap', 
    	'core.auth']);

})();
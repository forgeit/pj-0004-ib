(function () {

	'use strict';

	angular.module('admin.cliente')
		.controller('ClienteCompleto', ctrl);

	ctrl.$inject = ['$routeParams'];

	function ctrl($routeParams) {
		var vm = this;

		if ($routeParams.id) {
			vm.editar = true;
			vm.tabAtual = 1;
		} else {
			vm.tabAtual = 0;
		}
	}

})();
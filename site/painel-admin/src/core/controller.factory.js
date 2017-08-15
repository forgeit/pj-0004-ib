(function () {

	angular
		.module('admin.core')
		.factory('controller', controller);

	controller.$inject = [
		'$routeParams',
		'$location',
		'$q',
		'configuracaoREST'];

	function controller(
		$routeParams, 
		$location, 
		$q, 
		configuracaoREST) {

		var service = {
			configuracaoREST: configuracaoREST,
			$location: $location,
			stringToDate: stringToDate,
			$routeParams: $routeParams,
			$q: $q
		};

		return service;

		function ler(data, value) {
			if (value === undefined) {
				return data.data.data;
			}

			return data.data.data[value];
		}

		function stringToDate(valor) {
			return valor == null ? null : moment(valor).toDate();
		}
	}
})();

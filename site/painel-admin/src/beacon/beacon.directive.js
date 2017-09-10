(function () {

	'use strict';

	angular
		.module('admin.beacon')
		.directive('dadosBeacon', dadosBeacon);

	function dadosBeacon() {
		var directive = {
			restrict: 'E',
			templateUrl: 'src/beacon/beacon.html'
		};

		return directive;
	}

})();
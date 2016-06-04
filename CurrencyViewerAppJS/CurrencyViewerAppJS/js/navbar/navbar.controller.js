(function () {
    'use strict';

    angular.module('currencyViewerApp')
        .controller('NavbarCtrl', NavbarCtrl);

    NavbarCtrl.$inject = [
        '$scope',
        '$rootScope'
    ];

    function NavbarCtrl($scope, $rootScope) {
        $scope.loadLast = loadLast;
        $scope.exit = exit;

        function loadLast() {
            $rootScope.$broadcast('loadLastEvent');
        }

        function exit() {
            window.close();
        }
    }
})();
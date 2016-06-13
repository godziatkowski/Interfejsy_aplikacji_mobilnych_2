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
        $scope.goBack = goBack;

        function loadLast() {
            $rootScope.$broadcast('loadLastEvent');
        }

        function goBack(){
            $scope.back();
        }

        function exit() {
            window.close();
        }
    }
})();
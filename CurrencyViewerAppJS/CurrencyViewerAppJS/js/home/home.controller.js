(function () {
    'use strict';

    angular.module('currencyViewerApp')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = [
        '$scope'
    ];

    function HomeCtrl($scope) {
        $scope.text = 'sasasasasasa';
        $scope.array = ['a','b','c','d'];
    }
})();
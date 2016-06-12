(function () {
    'use strict';

    angular.module('currencyViewerApp')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = [
        '$scope',
        '$state',
        '$timeout',
        'file',
        'fileLoadingService',
        'xmlDownloader'
    ];

    function HomeCtrl($scope, $state, $timeout, file, fileLoadingService, xmlDownloader) {
        $scope.showDetailsOf = showDetailsOf;
        if (file) {
            loadData(file);
        } else {
            loadData();
        }

        $scope.$on('loadLastEvent', function () {
            loadData();
        });

        function loadData(fileName) {
            $scope.loading = true;
            if (fileName) {
                fileLoadingService.getFile(fileName)
                    .then(function (result) {                    
                        $scope.data = result;
                        $scope.loading = false;
                        $timeout(function () {
                            $scope.$digest();
                        });
                    });
            } else {
                xmlDownloader.download('lastA')
                    .then(function (result) {
                        $scope.data = result;
                        $scope.loading = false;
                    });
            }
        }

        function showDetailsOf(currency) {
            $state.go('currencyDetails', { currency: currency });
        }
    }
})();
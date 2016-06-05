(function () {
    'use strict';

    angular.module('currencyViewerApp')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = [
        '$scope',
        '$state',
        'file',
        'fileLoadingService',
        'xmlDownloader'
    ];

    function HomeCtrl($scope, $state, file, fileLoadingService, xmlDownloader) {
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
            if (fileName) {
                fileLoadingService.getFile(fileName)
                    .then(function (result) {
                        $scope.data = result;
                    });
            } else {
                xmlDownloader.download('lastA')
                    .then(function (result) {
                        $scope.data = result;
                    });
            }
        }

        function showDetailsOf(currency) {
            $state.go('currencyDetails', { currency: currency });
        }
    }
})();
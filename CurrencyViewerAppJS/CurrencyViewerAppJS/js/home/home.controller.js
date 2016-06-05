(function () {
    'use strict';

    angular.module('currencyViewerApp')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = [
        '$scope',
        'file',
        'fileLoadingService',
        'xmlDownloader'
    ];

    function HomeCtrl($scope, file, fileLoadingService, xmlDownloader) {
        if (file) {
            loadData(file);
        } else {
            loadData();
        }

        $scope.$on('loadLastEvent', function () {
            loadData();
        });

        function loadData(fileName) {
            console.log(fileName);
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
    }
})();
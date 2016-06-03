(function () {
    'use strict';

    angular.module('currencyViewerApp')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = [
        '$scope',
        'xmlDownloader',
        'file'
    ];

    function HomeCtrl($scope, xmlDownloader, file) {
        if (file) {
            loadData(file);
        } else {
            loadData();
        }

        $scope.$on('loadLastEvent', function () {
            loadData();
        });

        function loadData(fileName) {
            if (!fileName) {
                fileName = 'lastA';
            }
            xmlDownloader.download(fileName).then(function (result) {
                $scope.data = result;                
            });
        }
    }
})();
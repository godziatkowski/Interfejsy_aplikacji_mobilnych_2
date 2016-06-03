(function () {
    'use strict';

    angular.module('currencyViewerApp')
        .controller('FileListCtrl', FileListCtrl);

    FileListCtrl.$inject = [
        '$scope',
        '$state',
        'fallback',
        'fileListDownloader'
    ];

    function FileListCtrl($scope, $state, fallback, fileListDownloader) {
        $scope.years = fillYears();
        $scope.year = moment().year();
        $scope.files = [];
        $scope.loadCurrencyFromFile = loadCurrencyFromFile;
        $scope.loadFiles = loadFiles;
        loadFiles();

        function loadCurrencyFromFile(file) {
            $state.go('home', { 'fileName': file.fileName });
        }

        function loadFiles(year) {
            $scope.files = [];
            $scope.loading = true;
            if (year && year !== moment().year()) {
                fileListDownloader.download('dir' + year).then(function (result) {
                    $scope.files = result;
                    $scope.loading = false;
                });
            } else {
                fileListDownloader.download('dir').then(function (result) {
                    $scope.files = result;
                    $scope.loading = false;
                });
            }
        }

        function fillYears() {
            var years = [];
            var currentYear = moment().year();
            for (var year = 2002; year <= currentYear; year++) {
                years.push(year);
            }
            return years;
        }

    }
})();
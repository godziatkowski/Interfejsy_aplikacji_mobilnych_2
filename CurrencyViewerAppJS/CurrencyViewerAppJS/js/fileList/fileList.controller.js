(function () {
    'use strict';

    angular.module('currencyViewerApp')
        .controller('FileListCtrl', FileListCtrl);

    FileListCtrl.$inject = [
        '$scope',
        '$state',
        '$timeout',
        'fileListDownloader',
        'fileLoadingService'
    ];

    function FileListCtrl($scope, $state, $timeout, fileListDownloader, fileLoadingService) {
        $scope.years = fillYears();
        $scope.year = moment().year();
        $scope.files = [];
        $scope.loadCurrencyFromFile = loadCurrencyFromFile;
        $scope.loadFiles = loadFiles;
        loadFiles();

        function loadCurrencyFromFile(file) {
            $state.go('home', { 'fileName': file.fileName });
        }

        $scope.$watch( 'online', function(){
            loadFiles();
        });

        function loadFiles(year) {
            $scope.files = [];
            $scope.loading = true;
            if ($scope.online) {
                if (year && year !== moment().year()) {
                    fileListDownloader.download(year).then(function (result) {
                        $scope.files = result;
                        $scope.loading = false;
                    });
                } else {
                    fileListDownloader.download('').then(function (result) {
                        $scope.files = result;
                        $scope.loading = false;
                    });
                }
            } else {
                fileLoadingService.getStoredFiles().then(function (files) {
                    $scope.files = files;
                    $scope.loading = false;
                    $timeout(function () {
                        $scope.$digest();
                    });
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
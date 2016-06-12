(function () {
    'use strict';

    angular.module('currencyViewerApp')
        .controller('CurrencyDetailsCtrl', CurrencyDetailsCtrl);

    CurrencyDetailsCtrl.$inject = [
        '$scope',
        '$timeout',
        'currency',
        'fileListDownloader',
        'fileLoadingService'
    ];

    function CurrencyDetailsCtrl($scope, $timeout, currency, fileListDownloader, fileLoadingService) {
        $scope.currency = currency;
        $scope.fromDate = moment().startOf('year').toDate();
        $scope.toDate = moment().endOf('day').toDate();
        $scope.today = moment().endOf('day').toDate();
        $scope.firstRecord = moment("02 01 2002", 'dd MM YYYY').toDate();
        $scope.series = [currency.kod_waluty + ' as PLN'];
        $scope.fromDatePickerOpen = false;
        $scope.toDatePickerOpen = false;
        $scope.incorrectDates = false;
        $scope.loading = false;
        $scope.show = show;
        $scope.openFromDatePicker = openFromDatePicker;
        $scope.openToDatePicker = openToDatePicker;
        $scope.dateOptions = {
            minDate : $scope.firstRecord,
            maxDate : $scope.today
        }

        show();

        function openFromDatePicker() {
            $scope.fromDatePickerOpen = true;
        }
        function openToDatePicker() {
            $scope.toDatePickerOpen = true;
        }

        function show() {
            $scope.loading = true;
            var fromDate = moment($scope.fromDate);
            var toDate = moment($scope.toDate);
            if (toDate.isBefore(fromDate)) {
                $scope.incorrectDates = true;
                $scope.loading = false;
                return;
            }
            $scope.incorrectDates = false;
            if ($scope.online) {
                var years = getYears(fromDate, toDate);
                fileListDownloader.downloadMany(years).then(function (files) {
                    var filesToDownload = findFilesToLoad(files, fromDate, toDate);
                    fileLoadingService.getFiles(filesToDownload)
                        .then(function (data) {
                            extractCurrencyDataFromFiles(data);
                            $scope.loading = false;
                            $timeout(function () {
                                $scope.$digest();
                            });
                        });
                });
            } else {
                fileLoadingService.getStoredFiles().then(function (files) {
                    var filesToDownload = findFilesToLoad(files, fromDate, toDate);
                    fileLoadingService.getFiles(filesToDownload)
                        .then(function (data) {
                            extractCurrencyDataFromFiles(data);
                            $scope.loading = false;
                            $timeout(function () {
                                $scope.$digest();
                            });

                        });
                });
            }
        }

        function findFilesToLoad(files, fromDate, toDate) {
            var filesToDownload = [];
            for (var fileIndex = 0; fileIndex < files.length; fileIndex++) {
                var publicationDate = moment(files[fileIndex].publishedAt, 'dddd, MMMM Do YYYY');
                if (publicationDate.isBetween(fromDate, toDate)) {
                    filesToDownload.push(files[fileIndex].fileName);
                }
            }
            return filesToDownload;
        }

        function getYears(fromDate, toDate) {
            var years = [];

            for (var year = fromDate.year() ; year <= toDate.year() ; year++) {
                years.push(year);
            }

            return years;
        }

        function extractCurrencyDataFromFiles(files) {
            $scope.labels = [];
            $scope.data = [];
            var data = [];

            for( var fileIndex = 0; fileIndex < files.length; fileIndex++){
                var currencyData = findDataOfCurrency(files[fileIndex].pozycja);
                if (currencyData) {
                    $scope.labels.push(moment(files[fileIndex].data_publikacji, 'dddd, MMMM Do YYYY').format('DD.MM.YY'));
                    data.push(currencyData.kurs_sredni);
                }
            }
            $scope.data[0] = data;
        }

        function findDataOfCurrency(currencyData) {
            for (var currencyIndex = 0; currencyIndex < currencyData.length; currencyIndex++) {
                if (currencyData[currencyIndex].kod_waluty === $scope.currency.kod_waluty) {
                    return currencyData[currencyIndex];
                }
            }
            return undefined;
        }

    }
})();
(function () {
    'use strict';

    angular.module('currencyViewerApp')
    .service('fileListDownloader', fileListDownloader);

    fileListDownloader.$inject = ['$http', '$q'];

    function fileListDownloader($http, $q) {
        var url = 'http://www.nbp.pl/kursy/xml/dir';

        return {
            download: load,
            downloadMany: loadMany
        }

        function load(year) {
            return $http({
                method: 'GET',
                url: url + year +'.txt',
                headers: {
                    'Content-Type': 'text/plain'
                },

            }).then(function (result) {
                var data = [];
                var allFiles = result.data.split('\n');
                for (var index = 0; index < allFiles.length; index++) {
                    if (allFiles[index].startsWith('a')) {
                        var stringDate = allFiles[index].trim().slice(-6);
                        var publishedAt = moment( stringDate, 'YYMMDD').format('dddd, MMMM Do YYYY')
                        data.push({ fileName: allFiles[index].trim(), publishedAt: publishedAt })
                    }
                }
                return data;

            });

        }

        function loadMany(years) {
            var currentYear = moment().year();
            var promises = [];
            for (var index = 0; index < years.length; index++) {
                if(years[index] !== currentYear){
                    promises.push(load(years[index]));
                } else {
                    promises.push(load(''));
                }
            }

            return $q.all(promises).then(function (data) {
                var fileNames = [];
                for (var indexOfArray = 0; indexOfArray < data.length; indexOfArray++) {
                    fileNames = fileNames.concat(fileNames, data[indexOfArray]);
                }
                return fileNames;
            })

        }

    }

})();
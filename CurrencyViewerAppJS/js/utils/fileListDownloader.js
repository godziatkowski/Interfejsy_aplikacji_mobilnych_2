(function () {
    'use strict';

    angular.module('currencyViewerApp')
    .service('fileListDownloader', fileListDownloader);

    fileListDownloader.$inject = ['$http'];

    function fileListDownloader($http) {
        var url = 'http://www.nbp.pl/kursy/xml/';

        return {
            download: load
        }

        function load(fileName) {
            return $http({
                method: 'GET',
                url: url + fileName +'.txt',
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
                        data.push({ fileName: allFiles[index], publishedAt: publishedAt })
                    }
                }
                return data;

            });

        }

    }

})();
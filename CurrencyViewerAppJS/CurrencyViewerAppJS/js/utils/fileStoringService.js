(function () {
    'use strict';

    angular.module('currencyViewerApp')
    .service('fileStorageService', fileStorageService);

    fileStorageService.$inject = [];

    function fileStorageService() {
        var appLocal = WinJS.Application.local;
        var jsonExtension = '.json';

        return {
            store: store,
            load: load
        }


        function store(fileName, fileContent) {
            appLocal.writeText(fileName + jsonExtension, JSON.stringify(fileContent));
        }

        function load(fileName) {
            return appLocal.readText(fileName + jsonExtension).then(function (data) {
                return JSON.parse(data);
            });
        }
    }

})();
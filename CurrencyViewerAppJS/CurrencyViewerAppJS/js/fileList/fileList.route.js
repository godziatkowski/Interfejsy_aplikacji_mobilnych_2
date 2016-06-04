(function () {
    'use strict';

    angular
            .module('currencyViewerApp')
            .config(FileListRouteProvider);

    FileListRouteProvider.$inject = ['$stateProvider'];

    function FileListRouteProvider($stateProvider) {
        $stateProvider.state('fileList', {
            parent: 'root',
            url: '/fileList',
            templateUrl: 'views/fileList/fileList.html',
            controller: 'FileListCtrl',
            resolve: {
                fallback: function () {
                    return undefined;
                }
            }
        });
    }
})();
(function () {
    'use strict';

    angular
            .module('currencyViewerApp')
            .config(HomeRouteProvider);

    HomeRouteProvider.$inject = ['$stateProvider'];

    function HomeRouteProvider($stateProvider) {
        $stateProvider.state('home', {
            parent: 'root',
            url: '/home?fileName',
            templateUrl: 'views/home/home.html',
            controller: 'HomeCtrl',
            resolve: {
                file: ['$stateParams', function ($stateParams) {
                    return $stateParams.fileName;
                }]
            }
        });
    }
})();
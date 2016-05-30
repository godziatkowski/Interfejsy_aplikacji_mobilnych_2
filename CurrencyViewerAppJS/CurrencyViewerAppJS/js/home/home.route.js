(function () {
    'use strict';

    angular
            .module('currencyViewerApp')
            .config(HomeRouteProvider);

    HomeRouteProvider.$inject = ['$stateProvider'];

    function HomeRouteProvider($stateProvider) {
        $stateProvider.state('home', {
            parent: 'root',
            url: '/home',
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl'
        });
    }
})();
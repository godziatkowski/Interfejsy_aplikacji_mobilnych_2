(function () {
    'use strict';

    angular
            .module('currencyViewerApp')
            .config(LoadingViewRouteProvider);

    LoadingViewRouteProvider.$inject = ['$stateProvider'];

    function LoadingViewRouteProvider($stateProvider) {
        $stateProvider.state('loadingView', {
            parent: 'root',
            url: '/loadingView',
            templateUrl: 'views/loadingView/loadingView.html',
            controller: 'LoadingViewCtrl'
        });
    }
})();
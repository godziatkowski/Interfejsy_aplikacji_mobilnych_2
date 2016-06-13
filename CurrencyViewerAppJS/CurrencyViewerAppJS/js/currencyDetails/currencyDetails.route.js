(function () {
    'use strict';

    angular
            .module('currencyViewerApp')
            .config(CurrencyDetailsRouteProvider);

    CurrencyDetailsRouteProvider.$inject = ['$stateProvider'];

    function CurrencyDetailsRouteProvider($stateProvider) {
        $stateProvider.state('currencyDetails', {
            parent: 'root',
            url: '/currencyDetails?wentBack',
            templateUrl: 'views/currencyDetails/currencyDetails.html',
            controller: 'CurrencyDetailsCtrl',
            params: {currency: null},
            resolve: {
                currency: ['$stateParams', function ($stateParams) {
                    return $stateParams.currency;
                }]
            }
        });
    }
})();
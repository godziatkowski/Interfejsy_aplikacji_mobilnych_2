(function () {
    'use strict';

    var config = {
        apiUrl: 'http://localhost:8080/currencyViewerApp/api'
    };



    angular
            .module('currencyViewerApp')
            .constant('config', config)
            .run(['$rootScope', '$state',
                function ($rootScope, $state) {
                    $state.go('home')
                    $rootScope.$on('$stateChangeStart', function (event, toState,
                            toStateParams) {
                        $rootScope.toState = toState;
                        $rootScope.toStateParams = toStateParams;                        

                    });

                    $rootScope.back = function () {
                        if ($state.get($rootScope.previousStateName) === null) {
                            $state.go('home');
                        } else {
                            $state.go($rootScope.previousStateName, $rootScope.previousStateParams);
                        }
                    };

                }])
            .config(configure);

    configure.$inject = [
        '$urlRouterProvider',
        '$stateProvider',
    ];

    function configure($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('root', {
            abstract: true,
            views: {
                'content@': {
                    template: '<ui-view />'
                },
                'navbar@': {
                    templateUrl: 'views/navbar/navbar.html',
                    controller: 'NavbarController'
                }
            }            
        });
    }
})();
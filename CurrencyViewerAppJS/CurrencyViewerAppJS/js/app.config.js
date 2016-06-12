(function () {
    'use strict';

    var config = {
    };

    angular
            .module('currencyViewerApp')
            .constant('config', config)
            .run(['$rootScope', '$state', '$window',
                function ($rootScope, $state, $window) {
                    $('#content').height($('#app').height() - 70);
                    $state.go('home');
                    $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
                        $rootScope.toState = toState;
                        $rootScope.toStateParams = toStateParams;
                        
                    });

                    $rootScope.back = function () {
                        if ($state.get($rootScope.previousStateName)) {
                            $state.go($rootScope.previousStateName, $rootScope.previousStateParams);
                        } else {
                            $state.go('home');
                        }
                    };

                    $rootScope.online = navigator.onLine;
                    $window.addEventListener("offline", function () {
                        $rootScope.$apply(function () {
                            $rootScope.online = false;
                            $('#content').height($('#app').height() - 146);
                        });
                    }, false);

                    $window.addEventListener("online", function () {
                        $rootScope.$apply(function () {
                            $rootScope.online = true;
                            $('#content').height($('#app').height() - 70);
                        });
                    }, false);

                    $(window).on('resize', function ($rootScope) {
                        if ($rootScope.online) {
                            $('#content').height($('#app').height() - 70);
                        } else {
                            $('#content').height($('#app').height() - 146);
                        }
                    }).trigger('resize');
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
                    controller: 'NavbarCtrl'
                }
            }            
        });
    }
})();
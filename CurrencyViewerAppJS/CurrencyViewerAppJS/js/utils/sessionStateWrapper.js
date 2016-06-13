(function () {
    'use strict';

    angular.module('currencyViewerApp')
    .service('sessionStateWrapper', sessionStateWrapper);

    sessionStateWrapper.$inject = [];

    function sessionStateWrapper() {
        var sessionState = WinJS.Application.sessionState;

        return {
            putState: put,
            getState: get
        }

        function put(state, stateParams) {
            sessionState.state = state;
            sessionState.stateParams = stateParams;
            console.log(sessionState)
        }

        function get() {
            console.log(sessionState)
            return { state: sessionState.state, stateParams: sessionState.stateParams };
        }
    }

})();
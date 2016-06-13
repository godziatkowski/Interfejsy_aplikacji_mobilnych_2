(function () {
    'use strict';

    angular.module('currencyViewerApp')
    .service('stateHistoryService', stateHistoryService);

    stateHistoryService.$inject = [];

    function stateHistoryService() {
        var states = [];
        return {
            push: push,
            pop: pop
        }


        function push(stateName, stateParams) {
            states.push({ state: stateName, params: stateParams });
        }

        function pop() {
            return states.pop();
        }
    }

})();
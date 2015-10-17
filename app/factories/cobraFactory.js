'use strict';

var cobraFactory = angular.module('cobraFactory', []);

cobraFactory.factory('connect', function() {
    return {
        result: 'connect to Cobra'
    };
});

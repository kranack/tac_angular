'use strict';

var connectController = angular.module('connectController', []);

connectController.controller('connectCtrl', ['$scope',
    function($scope) {
        $scope.send = function() {
            console.log('send');
        };
    }
]);
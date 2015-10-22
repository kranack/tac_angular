'use strict';

var connectController = angular.module('connectController', ['cobraModule']);

connectController.controller('connectCtrl', ['$scope', '$location', 'cobraService',
    function($scope, $location, cobraService) {
        $scope.user = {username: "", list: ""};

        $scope.send = function() {
           if ($scope.user.username.trim() != ""
                && $scope.user.list.trim() != "") {
               var res = cobraService.connect($scope.user.username, $scope.user.list);
               if (res) {$location.path('/list');}
           }
        };
    }
]);
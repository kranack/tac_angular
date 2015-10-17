'use strict';

var connectController = angular.module('connectController', ['cobraFactory']);

connectController.controller('connectCtrl', ['$scope', 'connect',
    function($scope, connect) {

        $scope.user = {username: "", list: ""};

        $scope.send = function() {
           if ($scope.user.username.trim() != ""
                && $scope.user.list.trim() != "") {
               var res = connect;
               console.log(res);
           }
        };
    }
]);
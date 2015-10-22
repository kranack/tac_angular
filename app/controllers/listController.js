
var listController = angular.module('listController', ['cobraModule']);

listController.controller('listCtrl', ['$scope', 'cobraService',
    function($scope, cobraService) {
        console.log(cobraService.isConnected());
    }
]);
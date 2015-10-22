
var listController = angular.module('listController', ['cobraModule']);

listController.controller('listCtrl', ['$scope', '$rootScope', '$location', 'cobraService',
    function($scope, $rootScope, $location, cobraService) {
        if (!cobraService.isConnected()) {$location.path('/list')};
        $scope.list = [];
        $scope.listName = cobraService.getList();

        $scope.getEvents = function() {
            var list = [];
            cobraService.getActions().then(function(messages) {
                angular.forEach(messages, function(message) {
                    console.log(message);
                    message.content = JSON.parse(message.content);
                    this.push(message);
                }, list);
            });
            return list;
        };

        $scope.list = $scope.getEvents();

        $scope.getContent = function(message) {
            return message.content;
        };

        $rootScope.$on('refresh', function(event, args) {
            $scope.list = $scope.getEvents();
        });
    }
]);
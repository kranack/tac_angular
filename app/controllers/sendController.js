
var sendController = angular.module('sendController', ['cobraModule']);

sendController.controller('sendCtrl', ['$scope', '$rootScope', '$location', 'cobraService',
    function($scope, $rootScope, $location, cobraService) {
        if (!cobraService.isConnected()) {$location.path('/list')};
        $scope.message = "";

        $scope.send = function () {
            if ($scope.message.trim() != "") {
                cobraService.send($scope.message);
                $rootScope.$broadcast('refresh', {message:
                    {user: cobraService.getUser(), message: $scope.message}
                });
                $scope.message = "";
            }
        }
    }
]);
'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('app', [
    'ngRoute',
    'ngMaterial',
    'mainController',
    'connectController'
]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'views/main.html',
        controller: 'mainCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);

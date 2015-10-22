'use strict';

var cobraModule = angular.module('cobraModule', []);

cobraModule.service("cobraService", ['$http', function($http) {

        var cobra = CobraHelper;
        var url = "http://cobra-framework.com:8080";
        var apiUrl = "http://cobra-framework.com:3000/api/events/";
        var socketId = null;
        var user = null;
        var users = [];
        var connected = false;

        this.getUser = function() {
            return user.username;
        };

        this.connect = function(username, list){
            user = {};
            user.username = username;
            user.list = list;
            socketId = cobra.connection(username, list);
            connected = (socketId !== null) ? true : false;
            return this.isConnected();
        };

        this.isConnected = function() {
            return cobra.connected;
        };

        this.getList = function() {
            return cobra.roomName;
        };

        this.getActions = function() {
            return $http({method: "GET", url: cobra.apiUrl + cobra.roomName}).then(function(result) {
                console.log(result.data);
                return result.data.Events;
            });
        };

        this.send = function(message) {
            cobra.sendAnEntry(message);
        };
    }
]);
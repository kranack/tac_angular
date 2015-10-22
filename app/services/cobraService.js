'use strict';

var cobraModule = angular.module('cobraModule', []);

cobraModule.service("cobraService", ['$http', function($http) {

        var cobra = new Cobra();
        var url = "http://cobra-framework.com:8080";
        var apiUrl = "http://cobra-framework.com:3000/api/events/";
        var socketId = null;
        var user = null;
        var users = [];

        this.connect = function(username, list){
            console.log(username, list);
            socketId = cobra.connect(url);
            return this.isConnected();
        };

        this.isConnected = function() {
            return cobra.connected;
        };
    }
]);
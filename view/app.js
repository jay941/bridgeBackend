'use strict';

var myApp = angular.module('myApp', []); // Taking Angular Application in Javascript Variable

// Below is the code to allow cross domain request from web server through angular.js
myApp.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);
'use strict';

let app = angular.module("capstone", ['ngRoute', 'firebase', 'angular.filter'])
.constant('firebaseURL', "https://bonnaroo-mock-api.firebaseio.com/");

let isAuth = (authenticate) => new Promise((resolve, reject) => {
  if(authenticate.isAuthenticated()) {
    console.log("User is authenticated, resolve route promise");
    resolve();
  } else {
    console.log("User is not authenticated, reject route promise");
    reject();
  }
});

app.config(['$routeProvider',
  ($routeProvider) => {
    $routeProvider.
      when('/lineup', {
        templateUrl: 'partials/lineup-view.html',
        controller: 'LineupCtrl',
        resolve: { isAuth }
      }).
      when('/welcome', {
        templateUrl: 'partials/landing.html',
        controller: 'LandingCtrl',
        resolve: { isAuth }
      }).
      when('/user', {
        templateUrl: 'partials/user-view.html',
        controller: 'UserCtrl',
        resolve: { isAuth }
      }).
      when('/login', {
        templateUrl: 'partials/login-view.html',
        controller: 'LoginCtrl'
      }).
      otherwise({
        redirectTo: '/login'
      });
  }]);
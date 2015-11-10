var app = angular.module('pipeline', [
  'ui.router',
])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home/home.html',
      controller: 'homeCtrl',
    })
    .state('about', {
      url: '/about',
      templateUrl: 'about/about.html',
      controller: 'aboutCtrl',
    })
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'dashboard/dashboard',
      controller: 'dashboardCtrl',
    })
    .state('entrepreneur', {
      url: '/entrepreneur/:id/profile',
      templateUrl: 'entrepreneur-profile/profile.html',
      controller: 'entrepreneurCtrl',
    })
    .state('startup', {
      url: '/startup/:id/profile',
      templateUrl: 'startup-profile/profile.html',
      controller: 'startupCtrl',
    })
    .state('new', {
      url: '/new',
      templateUrl: 'new/new.html',
      controller: 'formCtrl',
    })
    .state('login', {
      url: '/login',
      templateUrl: 'auth/login.html',
      controller: 'authCtrl',
      /*
      onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function() {
            $state.go('home');
          });
        },
        ],
        */
    })
    .state('register', {
      url: '/register',
      templateUrl: 'auth/register.html',
      contrller: 'authCtrl',
      /*
      onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function() {
            $state.go('home');
          });
        },
        ],
        */
    });
    $urlRouterProvider.otherwise('home');
  },
]);

var app = angular.module('pipeline', [
  'home',
  'about',
  'dashboard',
  'entrepreneur',
  'startup',
  'addEntry',
  // 'auth',
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
        templateUrl: 'dashboard/dashboard.html',
        controller: 'dashboardCtrl',
      })
      .state('entrepreneur', {
        url: '/entrepreneur/:id/profile',
        templateUrl: 'profileEntrep/profileEntrep.html',
        controller: 'profileEntrepCtrl',
      })
      .state('startup', {
        url: '/startup/:id/profile',
        templateUrl: 'profileStartup/profileStartup.html',
        controller: 'profileStartupCtrl',
      })
      .state('addEntry', {
        url: '/new',
        templateUrl: 'addEntry/addEntry.html',
        controller: 'addEntryCtrl',
      })
      
      //!!! we should combine these bc login & register will be the same page

      // .state('login', {
      //   url: '/login',
      //   templateUrl: 'auth/login.html',
      //   controller: 'authCtrl',
      //   onEnter: ['$state', 'Auth', function($state, Auth) {
      //       Auth.currentUser().then(function() {
      //         $state.go('home');
      //       });
      //   }]
      // })
      // .state('register', {
      //   url: '/register',
      //   templateUrl: 'auth/register.html',
      //   controller: 'authCtrl',
      //   onEnter: ['$state', 'Auth', function($state, Auth) {
      //       Auth.currentUser().then(function() {
      //         $state.go('home');
      //       });
      //   }]
      // });
    $urlRouterProvider.otherwise('/');
  },
]);

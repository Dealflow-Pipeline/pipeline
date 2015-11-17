var app = angular.module('pipeline', [
  'home',
  'about',
  'dashboard',
  'founder',
  'startup',
  'addEntry',
  'addNote',
  // 'auth',
  'ui.router',
  'ui.bootstrap',
  'firebase'
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
      .state('note', {
        url: '/note',
        templateUrl: 'note/addNote.html',
        controller: 'addNoteCtrl',
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'dashboard/dashboard.html',
        controller: 'dashboardCtrl',
      })
      .state('founder', {
        url: '/founder/:id/profile',
        templateUrl: 'profileFounder/profileFounder.html',
        controller: 'profileFounderCtrl',
      })
      .state('startup', {
        url: '/startup/:startupId/profile',
        templateUrl: 'profileStartup/profileStartup.html',
        controller: 'profileStartupCtrl',
        resolve: {
          loadProfile: ['$stateParams', 'profileFactory', function($stateParams, profileFactory) {
              return profileFactory.getStartup($stateParams.startupId);
            },
          ],
        },
      })
      .state('addEntry', {
        url: '/new',
        templateUrl: 'addEntry/addEntry.html',
        controller: 'addEntryCtrl',
      });

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
